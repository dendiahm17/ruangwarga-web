import React, { useState } from 'react';
import type { OfficerAccount } from '../core/types/user.types';
import { mockOfficerAccounts } from '../services/mock/mockUserData';
import { CreateOfficerModal } from '../components/users/CreateOfficerModal';
import {
  UserCheck,
  Search,
  Plus,
  Shield,
  Phone,
  Mail,
  Calendar,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const PengurusPage: React.FC = () => {
  const [officers, setOfficers] = useState<OfficerAccount[]>(mockOfficerAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('Semua');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredOfficers = officers.filter((off) => {
    const matchSearch = off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.assignedScope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.phone.includes(searchQuery);
    const matchTier = selectedTier === 'Semua' || off.tierLevel === selectedTier;
    return matchSearch && matchTier;
  });

  const handleSaveOfficer = (newOff: OfficerAccount) => {
    setOfficers([newOff, ...officers]);
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
            <UserCheck size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Manajemen Pengurus & Aparatur Wilayah
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Daftar pejabat pembina & aparatur tata kelola lintas tingkatan (RT, RW, Desa, Kecamatan, Kab/Kota)
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0, 229, 255, 0.15)',
            border: '1px solid #00e5ff',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#00e5ff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 12px rgba(0, 229, 255, 0.25)'
          }}
        >
          <Plus size={15} />
          <span>Registrasi Pengurus Baru</span>
        </button>
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
            placeholder="Cari nama pengurus, jabatan, atau scope..."
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

        {/* Tier Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#94a3b8' }}>
          <span>Tingkatan:</span>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            style={{
              backgroundColor: '#060b13',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '11.5px',
              color: '#ffffff',
              outline: 'none'
            }}
          >
            <option value="Semua">Semua Tingkat</option>
            <option value="Kabupaten/Kota">Kabupaten/Kota</option>
            <option value="Kecamatan">Kecamatan</option>
            <option value="Desa/Kelurahan">Desa/Kelurahan</option>
            <option value="RW">RW</option>
            <option value="RT">RT</option>
          </select>
        </div>
      </div>

      {/* Officers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {filteredOfficers.map((off) => (
          <div
            key={off.id}
            className="futuristic-card"
            style={{
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            {/* Header: Name, Role & Tier */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: '#38bdf8',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '2px 7px',
                  borderRadius: '4px'
                }}>
                  {off.tierLevel.toUpperCase()}
                </span>

                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  AKTIF
                </span>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                {off.name}
              </h3>
              <div style={{ fontSize: '11.5px', color: '#00e5ff', fontWeight: 700, marginTop: '2px' }}>
                {off.roleTitle}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>
                Scope: <strong style={{ color: '#ffffff' }}>{off.assignedScope}</strong>
              </div>
            </div>

            {/* Info Grid */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              backgroundColor: '#060b13',
              border: '1px solid rgba(56, 189, 248, 0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '11px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>No. SK:</span>
                <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>{off.skNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Masa Bakti:</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{off.periodStart} - {off.periodEnd}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>WhatsApp:</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>{off.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Officer Modal */}
      <CreateOfficerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveOfficer}
      />
    </div>
  );
};
