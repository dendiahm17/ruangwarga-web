import React, { useState } from 'react';
import type { WorkspaceItem } from '../../core/types/territory.types';
import { X, Layers, Plus } from 'lucide-react';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newWs: Partial<WorkspaceItem>) => void;
}

export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [tier, setTier] = useState<WorkspaceItem['tier']>('RW');
  const [scopePath, setScopePath] = useState('');
  const [leadAdminName, setLeadAdminName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onSave({
      name,
      tier,
      scopePath: scopePath || 'Indonesia > Jawa Barat > Kab. Bogor > RW Baru',
      leadAdminName: leadAdminName || 'Admin Wilayah',
      status: 'active',
      citizensCount: 0,
      adminsCount: 1,
      lastActivityTime: 'Baru saja',
      coveragePercentage: 10,
      createdAt: 'Hari ini'
    });

    setName('');
    setScopePath('');
    setLeadAdminName('');
    onClose();
  };

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
        width: '520px',
        maxWidth: '90vw',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="#00e5ff" />
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Inisiasi Workspace Baru
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Tingkat Workspace
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as any)}
              style={{
                width: '100%',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="Provinsi">Provinsi Workspace</option>
              <option value="Kabupaten/Kota">Kabupaten/Kota Workspace</option>
              <option value="Kecamatan">Kecamatan Workspace</option>
              <option value="Desa/Kelurahan">Desa/Kelurahan Workspace</option>
              <option value="RW">RW Workspace</option>
              <option value="RT">RT Workspace</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Nama Workspace (misal: Workspace RW 05 Harapan Mulya)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama workspace..."
              style={{
                width: '100%',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Jalur Hierarki Wilayah (Scope Path)
            </label>
            <input
              type="text"
              value={scopePath}
              onChange={(e) => setScopePath(e.target.value)}
              placeholder="Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong > RW 05"
              style={{
                width: '100%',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Ketua / Administrator Utama Workspace
            </label>
            <input
              type="text"
              value={leadAdminName}
              onChange={(e) => setLeadAdminName(e.target.value)}
              placeholder="Nama Ketua RW / Lurah..."
              style={{
                width: '100%',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 18px',
                backgroundColor: 'rgba(0, 229, 255, 0.2)',
                border: '1px solid #00e5ff',
                borderRadius: '8px',
                color: '#00e5ff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(0, 229, 255, 0.25)'
              }}
            >
              Buat Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
