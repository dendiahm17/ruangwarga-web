import React from 'react';
import type { EmergencyAlarm } from '../../core/types/report.types';
import { X, AlertOctagon, Phone, MapPin, ShieldAlert, CheckCircle, Radio, Clock } from 'lucide-react';

interface AlarmDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  alarm: EmergencyAlarm | null;
  onResolve?: (id: string) => void;
  onEscalate?: (id: string) => void;
}

export const AlarmDetailModal: React.FC<AlarmDetailModalProps> = ({
  isOpen,
  onClose,
  alarm,
  onResolve,
  onEscalate
}) => {
  if (!isOpen || !alarm) return null;

  const isCritical = alarm.status === 'critical';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(3, 7, 18, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        backgroundColor: '#0a1220',
        border: `1px solid ${isCritical ? 'rgba(239, 68, 68, 0.5)' : 'rgba(56, 189, 248, 0.3)'}`,
        boxShadow: isCritical ? '0 0 30px rgba(239, 68, 68, 0.3)' : '0 0 20px rgba(0, 229, 255, 0.2)',
        width: '560px',
        maxWidth: '90vw',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={20} color={isCritical ? '#ef4444' : '#f59e0b'} />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                Respon Kedaruratan & Panic Button
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                Sinyal SOS Realtime dari Aplikasi Android Warga
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Status & Title Card */}
          <div style={{
            backgroundColor: '#060b13',
            border: `1px solid ${isCritical ? 'rgba(239, 68, 68, 0.3)' : 'rgba(56, 189, 248, 0.2)'}`,
            borderRadius: '8px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{
                fontSize: '9.5px',
                fontWeight: 800,
                color: isCritical ? '#ef4444' : '#f59e0b',
                backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                border: `1px solid ${isCritical ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                JENIS: {alarm.type.toUpperCase()}
              </span>

              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                <span>{alarm.timestamp}</span>
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
              {alarm.title}
            </h3>
            <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.4 }}>
              {alarm.description}
            </p>
          </div>

          {/* Location & Reporter Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '12px 14px',
            fontSize: '11.5px'
          }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Pelapor / Korban</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>{alarm.reporterName}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Kontak Darurat</span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>{alarm.reporterPhone}</span>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Lokasi Titik Kejadian</span>
              <span style={{ color: '#00e5ff', fontWeight: 600 }}>{alarm.locationScope}</span>
              {alarm.coordinates && (
                <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', display: 'block', marginTop: '2px' }}>
                  GPS: {alarm.coordinates}
                </span>
              )}
            </div>
          </div>

          {/* Responded by info if any */}
          {alarm.respondedBy && (
            <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={14} />
              <span>Petugas Tanggap: <strong>{alarm.respondedBy}</strong></span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              onClick={() => {
                onEscalate?.(alarm.id);
                onClose();
              }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #ef4444',
                borderRadius: '6px',
                color: '#ef4444',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(239, 68, 68, 0.25)'
              }}
            >
              <Radio size={14} />
              <span>Eskalasi ke Posko / Bhabinkamtibmas</span>
            </button>

            <button
              onClick={() => {
                onResolve?.(alarm.id);
                onClose();
              }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1px solid #10b981',
                borderRadius: '6px',
                color: '#10b981',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.2)'
              }}
            >
              <CheckCircle size={14} />
              <span>Tandai Selesai / Teratasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
