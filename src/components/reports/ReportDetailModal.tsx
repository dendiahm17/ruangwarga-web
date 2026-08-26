import React, { useState } from 'react';
import type { CitizenReport } from '../../core/types/report.types';
import { X, FileText, CheckCircle2, User, Phone, MapPin, Tag, ArrowRight, ShieldCheck } from 'lucide-react';

interface ReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: CitizenReport | null;
  onUpdateStatus?: (id: string, newStatus: CitizenReport['status'], assignedTo?: string) => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  isOpen,
  onClose,
  report,
  onUpdateStatus
}) => {
  const [assignedToInput, setAssignedToInput] = useState('');

  if (!isOpen || !report) return null;

  const handleStatusChange = (status: CitizenReport['status']) => {
    onUpdateStatus?.(report.id, status, assignedToInput || report.assignedTo);
    onClose();
  };

  const getStatusBadge = (status: CitizenReport['status']) => {
    switch (status) {
      case 'received': return { label: 'DITERIMA', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' };
      case 'dispositioned': return { label: 'DISPOSISI', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'in_progress': return { label: 'SEDANG DIKERJAKAN', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)' };
      case 'completed': return { label: 'SELESAI', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    }
  };

  const badge = getStatusBadge(report.status);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(3, 7, 18, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        backgroundColor: '#0a1220',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.2)',
        width: '560px',
        maxWidth: '90vw',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#00e5ff" />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                Investigasi Laporan Pengaduan Warga
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                Tiket: {report.ticketNumber}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Status & Priority Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: '9.5px',
              fontWeight: 800,
              color: badge.color,
              backgroundColor: badge.bg,
              border: `1px solid ${badge.color}40`,
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              STATUS: {badge.label}
            </span>

            <span style={{
              fontSize: '9.5px',
              fontWeight: 700,
              color: report.priority === 'high' ? '#ef4444' : '#f59e0b',
              backgroundColor: report.priority === 'high' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)',
              border: `1px solid ${report.priority === 'high' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              URGENSI: {report.priority}
            </span>
          </div>

          {/* Title & Description */}
          <div style={{
            backgroundColor: '#060b13',
            border: '1px solid rgba(56, 189, 248, 0.15)',
            borderRadius: '8px',
            padding: '12px 14px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
              {report.title}
            </h3>
            <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.4 }}>
              {report.description}
            </p>
          </div>

          {/* Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            borderRadius: '8px',
            padding: '12px 14px',
            fontSize: '11.5px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Warga Pelapor</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>{report.reporterName}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Kontak WhatsApp</span>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>{report.reporterPhone}</span>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Wilayah Laporan</span>
              <span style={{ color: '#00e5ff', fontWeight: 600 }}>{report.locationScope}</span>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Penanggung Jawab / Tim Disposisi</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>{report.assignedTo || 'Belum didisposisi'}</span>
            </div>
          </div>

          {/* Disposition input */}
          {report.status !== 'completed' && (
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Tugaskan / Disposisi Ke Seksi Wilayah
              </label>
              <input
                type="text"
                value={assignedToInput}
                onChange={(e) => setAssignedToInput(e.target.value)}
                placeholder="Contoh: Seksi Pembangunan RT 01 / Linmas RW 02"
                style={{
                  width: '100%',
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '6px',
                  padding: '7px 12px',
                  fontSize: '11.5px',
                  color: '#ffffff',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Workflow Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            {report.status === 'received' && (
              <button
                onClick={() => handleStatusChange('dispositioned')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid #f59e0b',
                  borderRadius: '6px',
                  color: '#f59e0b',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Disposisikan Laporan
              </button>
            )}

            {report.status === 'dispositioned' && (
              <button
                onClick={() => handleStatusChange('in_progress')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid #a855f7',
                  borderRadius: '6px',
                  color: '#c084fc',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Mulai Pengerjaan
              </button>
            )}

            {report.status !== 'completed' && (
              <button
                onClick={() => handleStatusChange('completed')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.18)',
                  border: '1px solid #10b981',
                  borderRadius: '6px',
                  color: '#10b981',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)'
                }}
              >
                Tandai Selesai & Ditindaklanjuti
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
