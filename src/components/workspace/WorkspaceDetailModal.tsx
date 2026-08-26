import React, { useState } from 'react';
import type { WorkspaceItem, WorkspaceMember } from '../../core/types/territory.types';
import {
  X,
  Layers,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  FileText,
  DollarSign,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Globe2,
  Radio
} from 'lucide-react';

interface WorkspaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspace: WorkspaceItem | null;
  onSetScope?: (workspaceId: string) => void;
  onToggleStatus?: (workspaceId: string, currentStatus: WorkspaceItem['status']) => void;
}

export const WorkspaceDetailModal: React.FC<WorkspaceDetailModalProps> = ({
  isOpen,
  onClose,
  workspace,
  onSetScope,
  onToggleStatus
}) => {
  const [activeTab, setActiveTab] = useState<'operasional' | 'pengurus' | 'keamanan'>('operasional');

  if (!isOpen || !workspace) return null;

  const isActive = workspace.status === 'active';
  const metrics = workspace.metrics || {
    verifiedCitizens: Math.round(workspace.citizensCount * 0.85),
    pendingCitizens: Math.round(workspace.citizensCount * 0.15),
    activeAlarmsCount: 1,
    openReportsCount: 2,
    issuedLettersCount: 45,
    collectionIuranRate: 90
  };

  const members = workspace.members || [
    {
      id: 'm-def',
      name: workspace.leadAdminName,
      role: `Admin Utama (${workspace.tier})`,
      phone: '+62 812-3456-7890',
      email: 'admin@ruangwarga.id',
      avatarInitials: 'AU'
    }
  ];

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
        border: '1px solid rgba(0, 229, 255, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 229, 255, 0.2)',
        width: '680px',
        maxWidth: '92vw',
        borderRadius: '14px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '9.5px',
                fontWeight: 700,
                color: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '2px 7px',
                borderRadius: '4px'
              }}>
                {workspace.tier.toUpperCase()} WORKSPACE
              </span>

              <span style={{
                fontSize: '9.5px',
                fontWeight: 700,
                color: isActive ? '#10b981' : '#f59e0b',
                backgroundColor: isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                {isActive ? 'STATUS: AKTIF' : 'STATUS: PENDING'}
              </span>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              {workspace.name}
            </h2>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Scope: <strong style={{ color: '#00e5ff' }}>{workspace.scopePath}</strong>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 22px 0 22px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {[
            { id: 'operasional', label: 'Dashboard Operasional', icon: <Layers size={13} /> },
            { id: 'pengurus', label: `Pengurus & Operator (${members.length})`, icon: <Users size={13} /> },
            { id: 'keamanan', label: 'Konfigurasi & Akses', icon: <ShieldCheck size={13} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px 6px 0 0',
                borderBottom: activeTab === tab.id ? '2px solid #00e5ff' : '2px solid transparent',
                backgroundColor: activeTab === tab.id ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#00e5ff' : '#94a3b8',
                fontSize: '11.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scroll Body */}
        <div style={{ padding: '20px 22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* TAB 1: OPERASIONAL */}
          {activeTab === 'operasional' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 4 Quick Stat Tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div style={{
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>Warga Terdata</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    {workspace.citizensCount.toLocaleString('id-ID')}
                  </div>
                  <div style={{ fontSize: '9px', color: '#10b981', marginTop: '2px' }}>
                    {metrics.verifiedCitizens} Terverifikasi
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>Surat Terbit</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#00e5ff', marginTop: '2px' }}>
                    {metrics.issuedLettersCount} Dokumen
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>
                    Ber-QR Code Sah
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>Aduan Masuk</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#f59e0b', marginTop: '2px' }}>
                    {metrics.openReportsCount} Laporan
                  </div>
                  <div style={{ fontSize: '9px', color: '#f59e0b', marginTop: '2px' }}>
                    Perlu Tindak Lanjut
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>Cakupan Wilayah</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                    {workspace.coveragePercentage}%
                  </div>
                  <div style={{ fontSize: '9px', color: '#10b981', marginTop: '2px' }}>
                    Adopsi Sangat Baik
                  </div>
                </div>
              </div>

              {/* Workspace Operational Highlights */}
              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '11.5px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94a3b8' }}>Administrator Penanggung Jawab:</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{workspace.leadAdminName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94a3b8' }}>Paket Layanan Wilayah:</span>
                  <span style={{ color: '#00e5ff', fontWeight: 700 }}>{workspace.packageType || 'Standar Enterprise'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94a3b8' }}>Aktivitas Sistem Terakhir:</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{workspace.lastActivityTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94a3b8' }}>Tanggal Diresmikan:</span>
                  <span style={{ color: '#cbd5e1' }}>{workspace.createdAt}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PENGURUS & OPERATOR */}
          {activeTab === 'pengurus' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: '#060b13',
                    border: '1px solid rgba(56, 189, 248, 0.15)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 229, 255, 0.15)',
                      border: '1px solid #00e5ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      color: '#00e5ff'
                    }}>
                      {m.avatarInitials}
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                        {m.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#38bdf8' }}>
                        {m.role}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#94a3b8' }}>
                    <div>{m.phone}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{m.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: KEAMANAN & AKSES */}
          {activeTab === 'keamanan' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                padding: '14px',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff' }}>Status Akses Ruang Kerja</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    {isActive ? 'Workspace aktif dan dapat diakses oleh warga & aparatur.' : 'Workspace nonaktif/pending verifikasi.'}
                  </div>
                </div>

                <button
                  onClick={() => onToggleStatus?.(workspace.id, workspace.status)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: isActive ? '1px solid #ef4444' : '1px solid #10b981',
                    backgroundColor: isActive ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: isActive ? '#ef4444' : '#10b981',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {isActive ? 'Nonaktifkan Workspace' : 'Aktifkan Workspace'}
                </button>
              </div>

              <div style={{
                padding: '14px',
                backgroundColor: 'rgba(0, 229, 255, 0.06)',
                border: '1px solid rgba(0, 229, 255, 0.25)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#00e5ff' }}>Jadikan Current Scope Platform</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    Beralih seluruh pengawasan dashboard ke lingkup wilayah {workspace.name}.
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSetScope?.(workspace.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '6px',
                    border: '1px solid #00e5ff',
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                    color: '#00e5ff',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0, 229, 255, 0.25)'
                  }}
                >
                  <Globe2 size={13} />
                  <span>Set As Scope</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '14px 22px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#060b13'
        }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            ID Workspace: <span style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{workspace.id}</span>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#cbd5e1',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
