import React from 'react';
import type { CitizenUser } from '../../core/types/user.types';
import { X, CheckCircle, XCircle, Shield, Smartphone, Calendar, Phone, Mail, MapPin } from 'lucide-react';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: CitizenUser | null;
  onVerify?: (userId: string) => void;
  onReject?: (userId: string) => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({
  isOpen,
  onClose,
  user,
  onVerify,
  onReject
}) => {
  if (!isOpen || !user) return null;

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
        width: '540px',
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
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Detail Identitas & Akun Warga
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              Sinkronisasi Data Aplikasi Android RuangWarga
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Main User Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            backgroundColor: '#060b13',
            border: '1px solid rgba(56, 189, 248, 0.15)',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 229, 255, 0.15)',
              border: '2px solid #00e5ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 800,
              color: '#00e5ff'
            }}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>{user.name}</span>
                {user.isHeadOfFamily && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.15)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    padding: '1px 5px',
                    borderRadius: '4px'
                  }}>
                    Kepala Keluarga
                  </span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace', marginTop: '2px' }}>
                NIK: {user.nik}
              </div>
            </div>

            <span style={{
              fontSize: '9.5px',
              fontWeight: 700,
              color: user.verificationStatus === 'verified' ? '#10b981' : user.verificationStatus === 'pending' ? '#f59e0b' : '#ef4444',
              backgroundColor: user.verificationStatus === 'verified' ? 'rgba(16, 185, 129, 0.12)' : user.verificationStatus === 'pending' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${user.verificationStatus === 'verified' ? 'rgba(16, 185, 129, 0.3)' : user.verificationStatus === 'pending' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              {user.verificationStatus === 'verified' ? 'TERVERIFIKASI' : user.verificationStatus === 'pending' ? 'MENUNGGU VERIFIKASI' : 'DITOLAK'}
            </span>
          </div>

          {/* Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            fontSize: '11.5px',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Wilayah Domisili</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{user.kelurahan}, {user.rw} / {user.rt}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Jenis Kelamin</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{user.gender}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Nomor Kontak WhatsApp</span>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>{user.phone}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Email Akun</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{user.email}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Terdaftar di Aplikasi</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{user.appRegisteredAt}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Keaktifan Terakhir</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>{user.lastActive}</span>
            </div>
          </div>

          {/* KTP Verification Mock Card */}
          <div style={{
            backgroundColor: '#060b13',
            border: '1px dashed rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '10.5px', color: '#94a3b8', marginBottom: '6px' }}>
              Dokumen e-KTP & Swafoto Terunggah
            </div>
            <div style={{
              height: '80px',
              backgroundColor: '#0a1220',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              fontSize: '11px',
              gap: '6px'
            }}>
              <Shield size={16} />
              <span>Dokumen e-KTP Terenkripsi Sistem</span>
            </div>
          </div>

          {/* Verification Action Bar (If Pending) */}
          {user.verificationStatus === 'pending' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => {
                  onReject?.(user.id);
                  onClose();
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '6px',
                  color: '#ef4444',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <XCircle size={14} />
                <span>Tolak Verifikasi</span>
              </button>

              <button
                onClick={() => {
                  onVerify?.(user.id);
                  onClose();
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.18)',
                  border: '1px solid #10b981',
                  borderRadius: '6px',
                  color: '#10b981',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.25)'
                }}
              >
                <CheckCircle size={14} />
                <span>Setujui & Verifikasi</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
