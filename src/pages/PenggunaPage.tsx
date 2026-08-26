import React, { useState } from 'react';
import type { CitizenUser } from '../core/types/user.types';
import { mockCitizenUsers } from '../services/mock/mockUserData';
import { UserDetailModal } from '../components/users/UserDetailModal';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export const PenggunaPage: React.FC = () => {
  const [users, setUsers] = useState<CitizenUser[]>(mockCitizenUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all');
  const [selectedUser, setSelectedUser] = useState<CitizenUser | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.nik.includes(searchQuery) ||
      u.territoryPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || u.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, verificationStatus: 'verified' } : u));
  };

  const handleReject = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, verificationStatus: 'rejected' } : u));
  };

  const pendingCount = users.filter(u => u.verificationStatus === 'pending').length;
  const verifiedCount = users.filter(u => u.verificationStatus === 'verified').length;

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
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Manajemen Pengguna & Warga
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Database kependudukan & verifikasi akun pengguna aplikasi Android RuangWarga
          </p>
        </div>

        {/* Quick KPI stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#0a1220',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={14} color="#10b981" />
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Terverifikasi:</span>
            <strong style={{ fontSize: '13px', color: '#10b981' }}>{verifiedCount}</strong>
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
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Menunggu:</span>
            <strong style={{ fontSize: '13px', color: '#f59e0b' }}>{pendingCount}</strong>
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
        {/* Search */}
        <div style={{
          position: 'relative',
          width: '320px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
          <input
            type="text"
            placeholder="Cari NIK, nama warga, atau wilayah..."
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
            { id: 'verified', label: 'Terverifikasi' },
            { id: 'pending', label: `Menunggu (${pendingCount})` },
            { id: 'rejected', label: 'Ditolak' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id as any)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: statusFilter === btn.id ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: statusFilter === btn.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                color: statusFilter === btn.id ? '#00e5ff' : '#94a3b8',
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

      {/* Users Table Card */}
      <div className="futuristic-card" style={{ padding: '16px 20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Nama Lengkap</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>NIK</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Wilayah (RT/RW/Kel)</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Kontak</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Status Verifikasi</th>
              <th style={{ padding: '8px 10px', fontWeight: 700, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const isVerified = u.verificationStatus === 'verified';
              const isPending = u.verificationStatus === 'pending';
              return (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  {/* Name & Gender */}
                  <td style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#38bdf8'
                      }}>
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#ffffff' }}>
                          {u.name}
                        </div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>
                          {u.gender} {u.isHeadOfFamily && '• KK'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* NIK */}
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#94a3b8' }}>
                    {u.nik.slice(0, 6)}******{u.nik.slice(12)}
                  </td>

                  {/* Territory */}
                  <td style={{ padding: '10px' }}>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>{u.kelurahan}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{u.rw} / {u.rt}</div>
                  </td>

                  {/* Contact */}
                  <td style={{ padding: '10px', color: '#38bdf8' }}>
                    {u.phone}
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: isVerified ? '#10b981' : isPending ? '#f59e0b' : '#ef4444',
                      backgroundColor: isVerified ? 'rgba(16, 185, 129, 0.12)' : isPending ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                      border: `1px solid ${isVerified ? 'rgba(16, 185, 129, 0.3)' : isPending ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                    }}>
                      {isVerified ? 'TERVERIFIKASI' : isPending ? 'MENUNGGU' : 'DITOLAK'}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setIsDetailModalOpen(true);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#0a1220',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        color: '#38bdf8',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <Eye size={12} />
                      <span>Detail</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
        onVerify={handleVerify}
        onReject={handleReject}
      />
    </div>
  );
};
