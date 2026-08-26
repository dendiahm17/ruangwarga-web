import React, { useState } from 'react';
import type { OfficerAccount } from '../../core/types/user.types';
import { X, UserPlus, Shield } from 'lucide-react';

interface CreateOfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (officer: OfficerAccount) => void;
}

export const CreateOfficerModal: React.FC<CreateOfficerModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [nipOrNik, setNipOrNik] = useState('');
  const [roleTitle, setRoleTitle] = useState('Ketua RT');
  const [tierLevel, setTierLevel] = useState<OfficerAccount['tierLevel']>('RT');
  const [assignedScope, setAssignedScope] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [skNumber, setSkNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onSave({
      id: `off-${Date.now()}`,
      name,
      nipOrNik: nipOrNik || '320101XXXXXXXXX',
      roleTitle,
      tierLevel,
      assignedScope: assignedScope || 'RT 01 / RW 02 Sukamaju',
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@ruangwarga.id`,
      skNumber: skNumber || 'SK-RW/02/2025',
      periodStart: '2025',
      periodEnd: '2028',
      status: 'active'
    });

    setName('');
    setNipOrNik('');
    setAssignedScope('');
    setPhone('');
    setEmail('');
    setSkNumber('');
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
        width: '540px',
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
            <UserPlus size={18} color="#00e5ff" />
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Registrasi Akun Pengurus / Aparatur
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Nama Lengkap Pejabat / Pengurus
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: H. Agus Permana"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Tingkatan Wilayah
              </label>
              <select
                value={tierLevel}
                onChange={(e) => setTierLevel(e.target.value as any)}
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
                <option value="Nasional">Nasional</option>
                <option value="Provinsi">Provinsi</option>
                <option value="Kabupaten/Kota">Kabupaten/Kota</option>
                <option value="Kecamatan">Kecamatan</option>
                <option value="Desa/Kelurahan">Desa/Kelurahan</option>
                <option value="RW">Rukun Warga (RW)</option>
                <option value="RT">Rukun Tetangga (RT)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Jabatan Struktural
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="Contoh: Ketua RW, Lurah, Camat"
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
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Wilayah Penugasan (Scope Authorization)
            </label>
            <input
              type="text"
              required
              value={assignedScope}
              onChange={(e) => setAssignedScope(e.target.value)}
              placeholder="Contoh: RW 02 Sukamaju / Kelurahan Sukamaju"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Nomor WhatsApp Resmi
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 812-..."
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
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Nomor SK Pengangkatan
              </label>
              <input
                type="text"
                value={skNumber}
                onChange={(e) => setSkNumber(e.target.value)}
                placeholder="SK-RW/02/2024"
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
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
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
              Daftarkan Pengurus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
