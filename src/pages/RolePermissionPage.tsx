import React, { useState } from 'react';
import type { RolePermissionMatrix } from '../core/types/security.types';
import { mockRoleMatrices } from '../services/mock/mockSecurityData';
import {
  ShieldCheck,
  Search,
  Check,
  X,
  Lock,
  Unlock,
  Layers,
  Users,
  Settings
} from 'lucide-react';

export const RolePermissionPage: React.FC = () => {
  const [roles, setRoles] = useState<RolePermissionMatrix[]>(mockRoleMatrices);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(mockRoleMatrices[0].roleId);

  const selectedRole = roles.find(r => r.roleId === selectedRoleId) || roles[0];

  const handleTogglePermission = (moduleId: string, field: 'canView' | 'canCreate' | 'canEdit' | 'canDelete' | 'canVerify' | 'canExport') => {
    setRoles(roles.map(r => {
      if (r.roleId === selectedRoleId) {
        return {
          ...r,
          modules: r.modules.map(m => {
            if (m.moduleId === moduleId) {
              return { ...m, [field]: !m[field] };
            }
            return m;
          })
        };
      }
      return r;
    }));
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
            <ShieldCheck size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Matriks Role & Hak Akses (Permission)
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Otorisasi berjenjang berbasis Role + Scope + Permission sesuai hierarki 7 tingkat tata kelola
          </p>
        </div>

        {/* Global Security Status */}
        <div style={{
          backgroundColor: '#0a1220',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Lock size={14} color="#10b981" />
          <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Kebijakan Keamanan:</span>
          <strong style={{ fontSize: '12px', color: '#10b981' }}>Enforced & Strict</strong>
        </div>
      </div>

      {/* 2-Column Layout: Roles List (Left) + Permission Matrix (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px minmax(0, 1fr)',
        gap: '20px'
      }}>
        {/* Left Column: Role Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span className="futuristic-card-title" style={{ paddingLeft: '4px' }}>DAFTAR PERAN (ROLES)</span>

          {roles.map((r) => {
            const isSelected = r.roleId === selectedRoleId;
            return (
              <div
                key={r.roleId}
                onClick={() => setSelectedRoleId(r.roleId)}
                className="futuristic-card"
                style={{
                  padding: '14px 16px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #00e5ff' : undefined,
                  backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.08)' : undefined,
                  boxShadow: isSelected ? '0 0 15px rgba(0, 229, 255, 0.15)' : undefined,
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    TINGKAT: {r.tierLevel.toUpperCase()}
                  </span>

                  <span style={{ fontSize: '10px', color: '#64748b' }}>
                    {r.activeUsersCount.toLocaleString('id-ID')} Pengguna
                  </span>
                </div>

                <div style={{ fontSize: '13.5px', fontWeight: 800, color: isSelected ? '#00e5ff' : '#ffffff' }}>
                  {r.roleName}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.3 }}>
                  {r.description.slice(0, 70)}...
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Permission Matrix Table */}
        <div className="futuristic-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header of selected role */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                  {selectedRole.roleName}
                </h2>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: '#00e5ff',
                  backgroundColor: 'rgba(0, 229, 255, 0.12)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {selectedRole.tierLevel}
                </span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>
                {selectedRole.description}
              </p>
            </div>
          </div>

          {/* Matrix Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>Modul Sistem</th>
                  <th style={{ padding: '10px', fontWeight: 700 }}>Lihat (Read)</th>
                  <th style={{ padding: '10px', fontWeight: 700 }}>Tambah (Create)</th>
                  <th style={{ padding: '10px', fontWeight: 700 }}>Edit (Update)</th>
                  <th style={{ padding: '10px', fontWeight: 700 }}>Hapus (Delete)</th>
                  <th style={{ padding: '10px', fontWeight: 700 }}>Verifikasi (Verify)</th>
                  <th style={{ padding: '10px', fontWeight: 700 }}>Ekspor (Export)</th>
                </tr>
              </thead>
              <tbody>
                {selectedRole.modules.map((m) => (
                  <tr key={m.moduleId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#ffffff', textAlign: 'left' }}>
                      {m.moduleName}
                    </td>

                    {/* Checkboxes / Toggles */}
                    {[
                      { field: 'canView', val: m.canView },
                      { field: 'canCreate', val: m.canCreate },
                      { field: 'canEdit', val: m.canEdit },
                      { field: 'canDelete', val: m.canDelete },
                      { field: 'canVerify', val: m.canVerify },
                      { field: 'canExport', val: m.canExport }
                    ].map((cell, idx) => (
                      <td key={idx} style={{ padding: '12px 10px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleTogglePermission(m.moduleId, cell.field as any)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            border: cell.val ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: cell.val ? 'rgba(0, 229, 255, 0.2)' : 'transparent',
                            color: cell.val ? '#00e5ff' : '#475569',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {cell.val ? <Check size={14} strokeWidth={3} /> : <X size={13} />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
