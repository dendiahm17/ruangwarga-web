import React, { useState } from 'react';
import type { EmergencyAlarm } from '../core/types/report.types';
import { mockEmergencyAlarms } from '../services/mock/mockReportData';
import { AlarmDetailModal } from '../components/reports/AlarmDetailModal';
import {
  AlertOctagon,
  Search,
  Radio,
  Clock,
  CheckCircle2,
  Phone,
  ShieldAlert,
  Flame,
  HeartPulse,
  Shield,
  Eye
} from 'lucide-react';

export const AlarmPage: React.FC = () => {
  const [alarms, setAlarms] = useState<EmergencyAlarm[]>(mockEmergencyAlarms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'critical' | 'investigating' | 'resolved'>('all');
  const [selectedAlarm, setSelectedAlarm] = useState<EmergencyAlarm | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredAlarms = alarms.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.locationScope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.reporterName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || a.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleResolve = (id: string) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const handleEscalate = (id: string) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, status: 'investigating', respondedBy: 'Posko Keamanan & Tim Bantuan' } : a));
  };

  const criticalCount = alarms.filter(a => a.status === 'critical').length;
  const investigatingCount = alarms.filter(a => a.status === 'investigating').length;

  const getAlarmIcon = (type: EmergencyAlarm['type']) => {
    switch (type) {
      case 'medis': return <HeartPulse size={16} color="#ef4444" />;
      case 'kebakaran': return <Flame size={16} color="#f97316" />;
      case 'kriminalitas': return <ShieldAlert size={16} color="#eab308" />;
      case 'bencana': return <AlertOctagon size={16} color="#38bdf8" />;
      default: return <Shield size={16} color="#a855f7" />;
    }
  };

  return (
    <div style={{
      padding: '24px',
      maxWidth: '1720px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Top Banner & Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={22} color="#ef4444" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Pusat Alarm Kedaruratan & SOS
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Monitoring sinyal darurat (Panic Button) warga secara realtime dengan respon instan
          </p>
        </div>

        {/* Counter KPI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 12px rgba(239, 68, 68, 0.2)'
          }}>
            <Radio size={14} color="#ef4444" style={{ animation: 'pulse 1.2s infinite' }} />
            <span style={{ fontSize: '11.5px', color: '#fca5a5' }}>Sinyal Kritis Aktif:</span>
            <strong style={{ fontSize: '14px', color: '#ef4444' }}>{criticalCount}</strong>
          </div>

          <div style={{
            backgroundColor: '#0a1220',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Clock size={14} color="#f59e0b" />
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Investigasi:</span>
            <strong style={{ fontSize: '13px', color: '#f59e0b' }}>{investigatingCount}</strong>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="futuristic-card" style={{
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{
          position: 'relative',
          width: '320px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
          <input
            type="text"
            placeholder="Cari jenis alarm, lokasi, atau pelapor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#060b13',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '6px',
              padding: '6px 12px 6px 30px',
              fontSize: '11.5px',
              color: '#ffffff',
              outline: 'none'
            }}
          />
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { id: 'all', label: 'Semua Status' },
            { id: 'critical', label: `Kritis Aktif (${criticalCount})` },
            { id: 'investigating', label: 'Dalam Penanganan' },
            { id: 'resolved', label: 'Selesai' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedStatus(btn.id as any)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: selectedStatus === btn.id ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: selectedStatus === btn.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                color: selectedStatus === btn.id ? '#00e5ff' : '#94a3b8',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alarm Incidents Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredAlarms.map((a) => {
          const isCritical = a.status === 'critical';
          const isInvestigating = a.status === 'investigating';
          return (
            <div
              key={a.id}
              className="futuristic-card"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                border: isCritical ? '1px solid rgba(239, 68, 68, 0.4)' : undefined,
                backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.05)' : undefined
              }}
            >
              {/* Left Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.15)' : 'rgba(56, 189, 248, 0.1)',
                  border: `1px solid ${isCritical ? 'rgba(239, 68, 68, 0.3)' : 'rgba(56, 189, 248, 0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getAlarmIcon(a.type)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                      {a.title}
                    </span>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      color: isCritical ? '#ef4444' : isInvestigating ? '#f59e0b' : '#10b981',
                      backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.15)' : isInvestigating ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}>
                      {isCritical ? 'KRITIS (SOS)' : isInvestigating ? 'INVESTIGASI' : 'TERATASI'}
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>
                    Lokasi: <strong style={{ color: '#00e5ff' }}>{a.locationScope}</strong> • Pelapor: {a.reporterName} ({a.reporterPhone})
                  </div>
                </div>
              </div>

              {/* Right Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {a.timestamp}
                </span>

                <button
                  onClick={() => {
                    setSelectedAlarm(a);
                    setIsDetailModalOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.15)' : '#0a1220',
                    border: `1px solid ${isCritical ? '#ef4444' : 'rgba(56, 189, 248, 0.25)'}`,
                    borderRadius: '6px',
                    color: isCritical ? '#ef4444' : '#38bdf8',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Eye size={13} />
                  <span>Respon Cepat</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alarm Detail Modal */}
      <AlarmDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        alarm={selectedAlarm}
        onResolve={handleResolve}
        onEscalate={handleEscalate}
      />
    </div>
  );
};
