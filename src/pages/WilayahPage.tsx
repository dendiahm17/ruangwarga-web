import React, { useState } from 'react';
import type { TerritoryItem, TerritoryOfficer } from '../core/types/territory.types';
import { mockTerritoryHierarchy } from '../services/mock/mockTerritoryData';
import { TerritoryTreeNode } from '../components/territory/TerritoryTreeNode';
import { CreateTerritoryModal } from '../components/territory/CreateTerritoryModal';
import { EditTerritoryModal } from '../components/territory/EditTerritoryModal';
import { AddOfficerModal } from '../components/territory/AddOfficerModal';
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
  UserCheck,
  Smartphone,
  Home,
  Trash2,
  UserPlus,
  Mail
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
  const [activeTab, setActiveTab] = useState<'sub' | 'pengurus' | 'demografi'>('sub');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddOfficerModalOpen, setIsAddOfficerModalOpen] = useState<boolean>(false);
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
      leaderPhone: newTerritory.leaderPhone || '-',
      demographics: {
        totalKK: 0,
        maleCount: 0,
        femaleCount: 0,
        appAdoptionPercentage: 0,
        verifiedWargaCount: 0
      },
      officers: []
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

  // Add Officer Handler
  const handleSaveOfficer = (officer: TerritoryOfficer) => {
    const updatedOfficers = [...(selectedTerritory.officers || []), officer];
    const updateRecursive = (node: TerritoryItem): TerritoryItem => {
      if (node.id === selectedTerritory.id) {
        return {
          ...node,
          officers: updatedOfficers
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
    setSelectedTerritory(prev => ({ ...prev, officers: updatedOfficers }));
  };

  // Delete / Deactivate Territory Handler with Safety Protection
  const handleDeleteTerritory = () => {
    if (selectedTerritory.children && selectedTerritory.children.length > 0) {
      alert(`⚠️ Peringatan Keamanan: Wilayah "${selectedTerritory.name}" tidak dapat dihapus karena masih memiliki ${selectedTerritory.children.length} sub-wilayah aktif di bawahnya. Hapus atau pindahkan sub-wilayah terlebih dahulu.`);
      return;
    }

    if (selectedTerritory.id === 'indonesia') {
      alert('Wilayah Pusat Nasional tidak dapat dihapus.');
      return;
    }

    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus wilayah "${selectedTerritory.name}" (${selectedTerritory.code}) dari hierarki sistem?`);
    if (!confirmed) return;

    const deleteRecursive = (node: TerritoryItem): TerritoryItem => {
      if (node.children) {
        return {
          ...node,
          children: node.children
            .filter(c => c.id !== selectedTerritory.id)
            .map(deleteRecursive)
        };
      }
      return node;
    };

    const updatedRoot = deleteRecursive(rootData);
    setRootData(updatedRoot);
    setSelectedTerritory(rootData);
  };

  const tiersList = ['Semua', 'Provinsi', 'Kab/Kota', 'Kecamatan', 'Desa/Kel', 'RW', 'RT'];

  const demo = selectedTerritory.demographics || {
    totalKK: Math.round(selectedTerritory.citizensCount / 4),
    maleCount: Math.round(selectedTerritory.citizensCount * 0.49),
    femaleCount: Math.round(selectedTerritory.citizensCount * 0.51),
    appAdoptionPercentage: 72,
    verifiedWargaCount: Math.round(selectedTerritory.citizensCount * 0.85)
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
        gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1.15fr)',
        gap: '20px'
      }}>
        {/* Left Column: Interactive Tree Explorer */}
        <div className="futuristic-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '660px' }}>
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
            {/* Header with Edit, Set Scope & Delete button */}
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

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    padding: '5px 8px',
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
                    padding: '5px 8px',
                    color: '#10b981',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <Globe2 size={13} />
                  <span>Set Scope</span>
                </button>

                {selectedTerritory.id !== 'indonesia' && (
                  <button
                    onClick={handleDeleteTerritory}
                    title="Hapus Wilayah"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: '6px',
                      padding: '5px 7px',
                      color: '#ef4444',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* 3 Metric Summary Boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
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
              gap: '8px',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '11px',
              marginBottom: '14px'
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

          {/* 3-Tab Bottom Card: Sub-Wilayah, Pengurus & Demografi */}
          <div className="futuristic-card" style={{ padding: '16px 20px' }}>
            {/* Tabs Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => setActiveTab('sub')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'sub' ? '#00e5ff' : '#94a3b8',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ListTree size={14} />
                  <span>Sub-Wilayah ({selectedTerritory.children?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab('pengurus')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'pengurus' ? '#00e5ff' : '#94a3b8',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <UserCheck size={14} />
                  <span>Pengurus ({selectedTerritory.officers?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab('demografi')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'demografi' ? '#00e5ff' : '#94a3b8',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Smartphone size={14} />
                  <span>Demografi & Warga</span>
                </button>
              </div>

              {/* Contextual Action */}
              {activeTab === 'pengurus' && (
                <button
                  onClick={() => setIsAddOfficerModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0, 229, 255, 0.15)',
                    border: '1px solid #00e5ff',
                    color: '#00e5ff',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <UserPlus size={12} />
                  <span>Tambah Pengurus</span>
                </button>
              )}
            </div>

            {/* TAB 1: Sub-Wilayah Content */}
            {activeTab === 'sub' && (
              <div>
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
            )}

            {/* TAB 2: Pengurus Content */}
            {activeTab === 'pengurus' && (
              <div>
                {selectedTerritory.officers && selectedTerritory.officers.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                    {selectedTerritory.officers.map((off) => (
                      <div
                        key={off.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          backgroundColor: '#060b13',
                          border: '1px solid rgba(56, 189, 248, 0.1)'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#ffffff' }}>
                              {off.name}
                            </span>
                            <span style={{
                              fontSize: '9px',
                              fontWeight: 700,
                              color: '#38bdf8',
                              backgroundColor: 'rgba(56, 189, 248, 0.12)',
                              padding: '1px 5px',
                              borderRadius: '3px'
                            }}>
                              {off.position}
                            </span>
                          </div>
                          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                            {off.phone} • {off.email}
                          </div>
                        </div>

                        <span style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          color: '#10b981',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          AKTIF
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '16px', color: '#64748b', fontSize: '11.5px' }}>
                    Belum ada data pengurus yang didaftarkan pada wilayah ini.
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Demografi & Android Warga Content */}
            {activeTab === 'demografi' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 12px'
                }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>Kepala Keluarga (KK)</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    {demo.totalKK.toLocaleString('id-ID')} KK
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#64748b', marginTop: '4px' }}>
                    Laki-laki: {demo.maleCount.toLocaleString('id-ID')} • Perempuan: {demo.femaleCount.toLocaleString('id-ID')}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 12px'
                }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>Adopsi Aplikasi Android Warga</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#00e5ff', marginTop: '2px' }}>
                    {demo.appAdoptionPercentage}%
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#10b981', marginTop: '4px' }}>
                    {demo.verifiedWargaCount.toLocaleString('id-ID')} Warga Terverifikasi
                  </div>
                </div>
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

      {/* Add Officer Modal */}
      <AddOfficerModal
        isOpen={isAddOfficerModalOpen}
        onClose={() => setIsAddOfficerModalOpen(false)}
        territoryName={selectedTerritory.name}
        onSave={handleSaveOfficer}
      />
    </div>
  );
};
