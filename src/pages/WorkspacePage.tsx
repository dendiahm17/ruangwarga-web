import React, { useState, useEffect } from 'react';
import type { WorkspaceItem } from '../core/types/territory.types';
import { FirestoreRealtimeService } from '../services/firestore/firestoreRealtimeService';
import { isFirebaseConfigured } from '../config/firebase';
import { useScope } from '../context/ScopeContext';
import { mockWorkspacesList } from '../services/mock/mockTerritoryData';
import { CreateWorkspaceModal } from '../components/workspace/CreateWorkspaceModal';
import { WorkspaceDetailModal } from '../components/workspace/WorkspaceDetailModal';
import {
  Layers,
  Search,
  Plus,
  Filter,
  Globe2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Eye,
  Building,
  MapPin
} from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(mockWorkspacesList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('Semua');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { setScopeById } = useScope();

  // Realtime Firestore subscription with safe fallback
  useEffect(() => {
    try {
      const unsubscribe = FirestoreRealtimeService.subscribeToWorkspaces((items) => {
        if (items && items.length > 0) {
          setWorkspaces(items);
        } else {
          setWorkspaces(mockWorkspacesList);
        }
      });
      return () => {
        if (typeof unsubscribe === 'function') unsubscribe();
      };
    } catch (e) {
      setWorkspaces(mockWorkspacesList);
    }
  }, []);

  const safeWorkspaces = Array.isArray(workspaces) ? workspaces : mockWorkspacesList;

  const filteredWorkspaces = safeWorkspaces.filter((ws) => {
    if (!ws) return false;
    const nameStr = (ws.name || '').toLowerCase();
    const leadStr = (ws.leadAdminName || '').toLowerCase();
    const scopeStr = (ws.scopePath || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = nameStr.includes(query) ||
      leadStr.includes(query) ||
      scopeStr.includes(query);

    const matchesTier = selectedTier === 'Semua' || ws.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const handleCreateWorkspace = async (newWs: WorkspaceItem) => {
    await FirestoreRealtimeService.saveWorkspace(newWs);
    setWorkspaces(prev => [newWs, ...prev]);
  };

  const handleToggleStatus = async (id: string, currentStatus: WorkspaceItem['status']) => {
    const nextStatus = currentStatus === 'active' ? 'pending' : 'active';
    const updated = safeWorkspaces.map(w => w.id === id ? { ...w, status: nextStatus as any } : w);
    setWorkspaces(updated);
    const target = updated.find(w => w.id === id);
    if (target) {
      await FirestoreRealtimeService.saveWorkspace(target);
      setSelectedWorkspace(target);
    }
  };

  const activeCount = safeWorkspaces.filter(w => w && w.status === 'active').length;
  const totalCitizens = safeWorkspaces.reduce((acc, curr) => acc + (curr?.citizensCount || 0), 0);

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
            <Layers size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Manajemen Workspace Operasional
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Pusat komando dan ruang kerja digital pengurus tingkat RT, RW, Desa, Kecamatan, Kab/Kota & Provinsi
          </p>
        </div>

        {/* Action button & KPI Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#0a1220',
            border: `1px solid ${isFirebaseConfigured ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Database size={13} color={isFirebaseConfigured ? '#10b981' : '#38bdf8'} />
            <span style={{ fontSize: '11px', color: isFirebaseConfigured ? '#10b981' : '#38bdf8', fontWeight: 700 }}>
              {isFirebaseConfigured ? 'Firestore Live Sync' : 'Smart Offline Mode'}
            </span>
          </div>

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
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Aktif:</span>
            <strong style={{ fontSize: '13px', color: '#10b981' }}>{activeCount}</strong>
          </div>

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
          width: '340px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
          <input
            type="text"
            placeholder="Cari nama workspace, pejabat, atau lingkup wilayah..."
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

        {/* Tier Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { id: 'Semua', label: 'Semua Tier' },
            { id: 'Provinsi', label: 'Provinsi' },
            { id: 'Kabupaten/Kota', label: 'Kab/Kota' },
            { id: 'Kecamatan', label: 'Kecamatan' },
            { id: 'Desa/Kelurahan', label: 'Desa/Kel' },
            { id: 'RW', label: 'RW' },
            { id: 'RT', label: 'RT' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedTier(btn.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: selectedTier === btn.id ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: selectedTier === btn.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                color: selectedTier === btn.id ? '#00e5ff' : '#94a3b8',
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

      {/* Workspaces Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '16px'
      }}>
        {filteredWorkspaces.map((ws) => {
          const isActive = ws.status === 'active';
          return (
            <div
              key={ws.id}
              className="futuristic-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'all 0.2s ease',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(245, 158, 11, 0.3)'
              }}
            >
              {/* Card Header: Tier Badge & Status */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 800,
                    color: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {ws.tier.toUpperCase()} TIER
                  </span>

                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: isActive ? '#10b981' : '#f59e0b',
                    backgroundColor: isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                    border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {isActive ? 'OPERASIONAL' : 'PENDING'}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                  {ws.name}
                </h3>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#00e5ff" />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ws.scopePath}</span>
                </div>
              </div>

              {/* 3 KPI mini meters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.1)',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>Warga</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    {ws.citizensCount.toLocaleString('id-ID')}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>Aparatur</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#00e5ff', marginTop: '2px' }}>
                    {ws.adminsCount} Pengurus
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>Cakupan</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                    {ws.coveragePercentage}%
                  </div>
                </div>
              </div>

              {/* Lead Admin & Action */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '10px'
              }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Pimpinan: <strong style={{ color: '#ffffff' }}>{ws.leadAdminName}</strong>
                </div>

                <button
                  onClick={() => {
                    setSelectedWorkspace(ws);
                    setIsDetailModalOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(0, 229, 255, 0.12)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    borderRadius: '6px',
                    color: '#00e5ff',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Eye size={12} />
                  <span>Buka Workspace</span>
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
        onSave={handleCreateWorkspace}
      />

      {/* Workspace Detail & Operations Modal */}
      <WorkspaceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        workspace={selectedWorkspace}
        onSetScope={(id) => {
          setScopeById('rw-02');
          alert(`Scope dashboard berhasil diarahkan ke ${selectedWorkspace?.name}`);
        }}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};
