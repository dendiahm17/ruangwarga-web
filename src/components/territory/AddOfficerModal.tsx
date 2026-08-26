import React, { useState } from 'react';
import type { TerritoryOfficer } from '../../core/types/territory.types';
import { X, UserPlus, Shield } from 'lucide-react';

interface AddOfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
  territoryName: string;
  onSave: (officer: TerritoryOfficer) => void;
}

export const AddOfficerModal: React.FC<AddOfficerModalProps> = ({
  isOpen,
  onClose,
  territoryName,
  onSave
}) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState<TerritoryOfficer['position']>('Sekretaris');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onSave({
      id: `off-${Date.now()}`,
      name,
      position,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@ruangwarga.id`,
      status: 'active',
      registeredAt: 'Hari ini'
    });

    setName('');
    setPhone('');
    setEmail('');
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
        width: '500px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={18} color="#00e5ff" />
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Tambah Pengurus Wilayah
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            Wilayah: <strong style={{ color: '#00e5ff' }}>{territoryName}</strong>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Nama Lengkap Pengurus
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama pengurus..."
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
              Jabatan / Amanah
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
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
              <option value="Ketua">Ketua</option>
              <option value="Sekretaris">Sekretaris</option>
              <option value="Bendahara">Bendahara</option>
              <option value="Seksi Keamanan">Seksi Keamanan</option>
              <option value="Seksi Sosial">Seksi Sosial & Pemberdayaan</option>
              <option value="Operator Sistem">Operator Sistem & IT</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Nomor WhatsApp / Kontak Aktif
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+62 812-3456-7890"
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
              Email Resmi (Opsional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pengurus@ruangwarga.id"
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
              Simpan Pengurus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
