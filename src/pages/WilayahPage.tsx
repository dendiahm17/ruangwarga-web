import React, { useState } from 'react';
import type { TerritoryItem } from '../core/types/territory.types';
import { mockTerritoryHierarchy } from '../services/mock/mockTerritoryData';
import { TerritoryTreeNode } from '../components/territory/TerritoryTreeNode';
import { CreateTerritoryModal } from '../components/territory/CreateTerritoryModal';
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
  ArrowRight
} from 'lucide-react';

interface WilayahPageProps {
  onNavigateWorkspace?: () => void;
}

export const WilayahPage: React.FC<WilayahPageProps> = ({ onNavigateWorkspace }) => {
  const [rootData, setRootData] = useState<TerritoryItem>(mockTerritoryHierarchy);
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryItem>(mockTerritoryHierarchy);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [parentTarget, setParentTarget] = useState<TerritoryItem | null>(null);

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
      leaderName: newTerritory.leaderName || '-',
      leaderPhone: newTerritory.leaderPhone || '-'
    };

    // Deep clone and insert recursively
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
            Struktur administrasi nasional berbasis wilayah: Negara → Provinsi → Kab/Kota → Kecamatan → Desa/Kelurahan → RW → RT
          </p>
        </div>

        {/* Global Action */}
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

      {/* 2-Column Layout: Territory Tree (Left) + Territory Detail (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: '20px'
      }}>
        {/* Left Column: Interactive Tree Explorer */}
        <div className="futuristic-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '600px' }}>
          {/* Header & Search */}
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

          {/* Tree View Scroll Area */}
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', marginTop: '6px' }}>
            <TerritoryTreeNode
              item={rootData}
              selectedId={selectedTerritory.id}
              onSelect={(item) => setSelectedTerritory(item)}
              onAddSubTerritory={handleAddSubTerritory}
            />
          </div>
        </div>

        {/* Right Column: Selected Territory Detail Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Detail Card */}
          <div className="futuristic-card" style={{ padding: '20px' }}>
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
                  Kode Wilayah: {selectedTerritory.code}
                </div>
              </div>

              {/* Status Badge */}
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: selectedTerritory.status === 'optimal' ? '#10b981' : '#f59e0b',
                backgroundColor: selectedTerritory.status === 'optimal' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                border: `1px solid ${selectedTerritory.status === 'optimal' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                Status: {selectedTerritory.status.toUpperCase()}
              </span>
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

            {/* Administration & Governance Info */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
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
                <span style={{ color: '#94a3b8' }}>ID Scope Sistem</span>
                <span style={{ fontFamily: 'monospace', color: '#64748b' }}>{selectedTerritory.id}</span>
              </div>
            </div>

            {/* Actions for this Territory */}
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
                <span>Lihat Workspace</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Territory Modal */}
      <CreateTerritoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        parentTerritory={parentTarget}
        onSave={handleSaveSubTerritory}
      />
    </div>
  );
};
