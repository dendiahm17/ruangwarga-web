import React, { useState } from 'react';
import type { WorkspaceItem } from '../core/types/territory.types';
import { mockWorkspacesList } from '../services/mock/mockTerritoryData';
import { CreateWorkspaceModal } from '../components/workspace/CreateWorkspaceModal';
import {
  Layers,
  Search,
  Plus,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter
} from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(mockWorkspacesList);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const filteredWorkspaces = workspaces.filter((ws) => {
    const matchQuery = ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.scopePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.leadAdminName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTier = selectedTier === 'Semua' || ws.tier === selectedTier;
    const matchStatus = selectedStatus === 'Semua' || ws.status === selectedStatus;
    return matchQuery && matchTier && matchStatus;
  });

  const handleSaveWorkspace = (newWs: Partial<WorkspaceItem>) => {
    const item: WorkspaceItem = {
      id: `ws-${Date.now()}`,
      name: newWs.name!,
      tier: newWs.tier!,
      scopePath: newWs.scopePath!,
      leadAdminName: newWs.leadAdminName || '-',
      status: newWs.status || 'active',
      citizensCount: 0,
      adminsCount: 1,
      lastActivityTime: 'Baru saja',
      coveragePercentage: 10,
      createdAt: 'Hari ini'
    };
    setWorkspaces([item, ...workspaces]);
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
            <Layers size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Manajemen Workspace Wilayah
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Kelola ruang kerja operasional pengurus RT/RW, Desa/Kelurahan, dan Kecamatan berbasis Scope
          </p>
        </div>

        {/* Global Action */}
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
          <span>Inisiasi Workspace Baru</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
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
            placeholder="Cari workspace atau pengurus..."
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

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Tier filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#94a3b8' }}>
            <span>Tingkat:</span>
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
              <option value="Provinsi">Provinsi</option>
              <option value="Kabupaten/Kota">Kabupaten/Kota</option>
              <option value="Kecamatan">Kecamatan</option>
              <option value="Desa/Kelurahan">Desa/Kelurahan</option>
              <option value="RW">RW</option>
              <option value="RT">RT</option>
            </select>
          </div>

          {/* Status filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#94a3b8' }}>
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
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
              <option value="Semua">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="pending">Menunggu Verifikasi</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workspace Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {filteredWorkspaces.map((ws) => {
          const isActive = ws.status === 'active';
          return (
            <div
              key={ws.id}
              className="futuristic-card"
              style={{
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Header: Title & Tier Badge */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '2px 7px',
                    borderRadius: '4px'
                  }}>
                    {ws.tier.toUpperCase()}
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
                    {isActive ? 'AKTIF' : 'PENDING'}
                  </span>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                  {ws.name}
                </h3>
                <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '4px', lineHeight: 1.3 }}>
                  {ws.scopePath}
                </div>
              </div>

              {/* Metrics Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.1)',
                borderRadius: '8px',
                padding: '8px 10px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#94a3b8' }}>Warga</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginTop: '1px' }}>
                    {ws.citizensCount.toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#94a3b8' }}>Pengurus</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#38bdf8', marginTop: '1px' }}>
                    {ws.adminsCount} Orang
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#94a3b8' }}>Cakupan</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#10b981', marginTop: '1px' }}>
                    {ws.coveragePercentage}%
                  </div>
                </div>
              </div>

              {/* Footer Admin info & button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                  Admin: <strong style={{ color: '#ffffff' }}>{ws.leadAdminName}</strong>
                </div>

                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(0, 229, 255, 0.12)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: '#00e5ff',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <span>Buka</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveWorkspace}
      />
    </div>
  );
};
