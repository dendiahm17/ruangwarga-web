import React, { useState } from 'react';
import type { TerritoryItem } from '../core/types/territory.types';
import { mockTerritoryHierarchy } from '../services/mock/mockTerritoryData';
import { TerritoryTreeNode } from '../components/territory/TerritoryTreeNode';
import { CreateTerritoryModal } from '../components/territory/CreateTerritoryModal';
import { EditTerritoryModal } from '../components/territory/EditTerritoryModal';
import { useScope } from '../context/ScopeContext';
import { 
  Network, 
  Search, 
  Plus, 
  Users, 
  Layers, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  AlertTriangle,
  ArrowRight,
  Edit3,
  Globe2,
  CheckCircle2,
  ListTree,
  UserCheck
} from 'lucide-react';

interface WilayahPageProps {
  onNavigateWorkspace?: () => void;
}

export const WilayahPage: React.FC<WilayahPageProps> = ({ onNavigateWorkspace }) => {
  const { setScopeById } = useScope();
  const [rootData, setRootData] = useState<TerritoryItem>(mockTerritoryHierarchy);
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryItem>(mockTerritoryHierarchy);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('Semua');
  const [activeTab, setActiveTab] = useState<'sub' | 'pengurus'>('sub');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [parentTarget, setParentTarget] = useState<TerritoryItem | null>(null);

  // Set territory as active scope in the whole platform
  const handleSetActiveScope = () => {
    setScopeById(selectedTerritory.id);
  };

  const handleAddSubTerritory = (parent: TerritoryItem) => {
    setParentTarget(parent);
    setIsCreateModalOpen(true);
  };

  const handleSaveSubTerritory = (newTerritory: Partial<TerritoryItem>) => {
    const newItem: TerritoryItem = {
      id: `t-${Date.now()}`,
      name: newTerritory.name!,
      level: newTerritory.level!,
      code: newTerritory.code!,
      parentId: newTerritory.parentId,
      status: 'optimal',
      citizensCount: 0,
      workspacesCount: 0,
      childrenCount: 0,
      leaderName: newTerritory.leaderName || 'Belum Ditetapkan',
      leaderPhone: newTerritory.leaderPhone || '-'
    };

    const insertRecursive = (node: TerritoryItem): TerritoryItem => {
      if (node.id === newItem.parentId) {
        return {
          ...node,
          childrenCount: (node.childrenCount || 0) + 1,
          children: [...(node.children || []), newItem]
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(insertRecursive)
        };
      }
      return node;
    };

    const updatedRoot = insertRecursive(rootData);
    setRootData(updatedRoot);
    setSelectedTerritory(newItem);
  };

  const handleSaveEditTerritory = (updated: Partial<TerritoryItem>) => {
    const updateRecursive = (node: TerritoryItem): TerritoryItem => {
      if (node.id === updated.id) {
        return {
          ...node,
          ...updated
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateRecursive)
        };
      }
      return node;
    };

    const updatedRoot = updateRecursive(rootData);
    setRootData(updatedRoot);
    setSelectedTerritory(prev => ({ ...prev, ...updated }));
  };

  const tiersList = ['Semua', 'Provinsi', 'Kab/Kota', 'Kecamatan', 'Desa/Kel', 'RW', 'RT'];

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
      {/* Top Banner & Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Network size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Hierarki Wilayah 7 Tingkat
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Struktur administrasi tata kelola nasional: Negara → Provinsi → Kab/Kota → Kecamatan → Desa/Kelurahan → RW → RT
          </p>
        </div>

        {/* Global Action */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleAddSubTerritory(selectedTerritory)}
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
            <span>Tambah Sub-Wilayah</span>
          </button>
        </div>
      </div>

      {/* 2-Column Layout: Territory Tree (Left) + Territory Detail (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1.1fr)',
        gap: '20px'
      }}>
        {/* Left Column: Interactive Tree Explorer */}
        <div className="futuristic-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '640px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="futuristic-card-title">POHON HIERARKI WILAYAH</span>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>
              Aktif: {selectedTerritory.name}
            </span>
          </div>

          {/* Search Box */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder="Cari wilayah berdasarkan nama atau kode..."
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

          {/* Level Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {tiersList.map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: tierFilter === t ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: tierFilter === t ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                  color: tierFilter === t ? '#00e5ff' : '#94a3b8',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tree View Scroll Area */}
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', marginTop: '4px' }}>
            <TerritoryTreeNode
              item={rootData}
              selectedId={selectedTerritory.id}
              onSelect={(item) => setSelectedTerritory(item)}
              onAddSubTerritory={handleAddSubTerritory}
            />
          </div>
        </div>

        {/* Right Column: Selected Territory Detail Card & Sub-tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Detail Card */}
          <div className="futuristic-card" style={{ padding: '20px' }}>
            {/* Header with Edit Button & Set as Scope */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: '#00e5ff',
                  backgroundColor: 'rgba(0, 229, 255, 0.12)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Tingkat: {selectedTerritory.level}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
                  {selectedTerritory.name}
                </h2>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace', marginTop: '2px' }}>
                  Kode Administrasi: {selectedTerritory.code}
                </div>
              </div>

              {/* Edit & Set Scope buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  title="Edit Data Wilayah"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#0a1220',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    color: '#38bdf8',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={handleSetActiveScope}
                  title="Jadikan Scope Aktif Platform"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    color: '#10b981',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <Globe2 size={13} />
                  <span>Set Sebagai Scope</span>
                </button>
              </div>
            </div>

            {/* 3 Metric Summary Boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Total Warga</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {selectedTerritory.citizensCount.toLocaleString('id-ID')}
                </div>
              </div>

              <div style={{
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Sub-Wilayah</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
                  {selectedTerritory.childrenCount} Unit
                </div>
              </div>

              <div style={{
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Workspace</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#a855f7', marginTop: '2px' }}>
                  {selectedTerritory.workspacesCount.toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* Governance Details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '12px 14px',
              fontSize: '11.5px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>Penanggung Jawab / Pejabat</span>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>{selectedTerritory.leaderName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>Kontak Resmi Pembina</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{selectedTerritory.leaderPhone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>Status Wilayah</span>
                <span style={{
                  color: selectedTerritory.status === 'optimal' ? '#10b981' : '#f59e0b',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {selectedTerritory.status}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleAddSubTerritory(selectedTerritory)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(0, 229, 255, 0.15)',
                  border: '1px solid #00e5ff',
                  borderRadius: '6px',
                  color: '#00e5ff',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} />
                <span>Tambah Sub-Wilayah</span>
              </button>

              <button
                onClick={onNavigateWorkspace}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid #a855f7',
                  borderRadius: '6px',
                  color: '#c084fc',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Layers size={14} />
                <span>Buka Workspace</span>
              </button>
            </div>
          </div>

          {/* Sub-Territories List / Table */}
          <div className="futuristic-card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', marginBottom: '12px' }}>
              <button
                onClick={() => setActiveTab('sub')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'sub' ? '#00e5ff' : '#94a3b8',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ListTree size={14} />
                <span>Daftar Sub-Wilayah ({selectedTerritory.children?.length || 0})</span>
              </button>
            </div>

            {/* List */}
            {selectedTerritory.children && selectedTerritory.children.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                {selectedTerritory.children.map((child) => (
                  <div
                    key={child.id}
                    onClick={() => setSelectedTerritory(child)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      backgroundColor: '#060b13',
                      border: '1px solid rgba(56, 189, 248, 0.1)',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#ffffff' }}>
                        {child.name}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>
                        {child.code} • {child.citizensCount.toLocaleString('id-ID')} Warga
                      </div>
                    </div>

                    <span style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: child.status === 'optimal' ? '#10b981' : '#f59e0b'
                    }}>
                      {child.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px', color: '#64748b', fontSize: '11.5px' }}>
                Tidak ada sub-wilayah di bawah naungan {selectedTerritory.name}.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Sub-Territory Modal */}
      <CreateTerritoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        parentTerritory={parentTarget}
        onSave={handleSaveSubTerritory}
      />

      {/* Edit Territory Modal */}
      <EditTerritoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        territory={selectedTerritory}
        onSave={handleSaveEditTerritory}
      />
    </div>
  );
};
