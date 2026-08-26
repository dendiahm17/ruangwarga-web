import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Bell, 
  Calendar, 
  Clock, 
  User as UserIcon,
  Globe2,
  Check
} from 'lucide-react';
import { useScope } from '../../context/ScopeContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onOpenScopeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenScopeModal }) => {
  const { currentScope, breadcrumbs, setScopeById } = useScope();
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('26 Agustus 2026 10:45:32 WIB');

  // Real-time clock update formatted to Indonesian local style
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      const day = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      const secs = String(d.getSeconds()).padStart(2, '0');
      setCurrentTime(`${day} ${month} ${year} ${hours}:${mins}:${secs} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scopeOptions = [
    { id: 'indonesia', label: '🇮🇩 Indonesia', level: 'Negara' },
    { id: 'jabar', label: '🏛️ Jawa Barat', level: 'Provinsi' },
    { id: 'kab-bogor', label: '🏢 Kab. Bogor', level: 'Kabupaten' },
    { id: 'kec-cibinong', label: '🏘️ Kec. Cibinong', level: 'Kecamatan' },
    { id: 'kel-sukamaju', label: '🏡 Kel. Sukamaju', level: 'Kelurahan' },
    { id: 'rw-02', label: '👥 RW 02', level: 'RW' }
  ];

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e6ebf0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Left side: Scope Selector & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Scope dropdown pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f172a'
            }}
          >
            <span style={{ fontSize: '14px' }}>🇮🇩</span>
            <span>{currentScope.name}</span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '6px',
              width: '240px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              padding: '6px',
              zIndex: 50
            }}>
              <div style={{ padding: '6px 10px', fontSize: '10.5px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Pilih Lingkup Scope
              </div>
              {scopeOptions.map((opt) => {
                const isSelected = currentScope.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setScopeById(opt.id);
                      setDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: isSelected ? '#ecfdf5' : 'transparent',
                      color: isSelected ? '#065f46' : '#1e293b',
                      fontSize: '12.5px',
                      fontWeight: isSelected ? 600 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{opt.label}</span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>({opt.level})</span>
                    </div>
                    {isSelected && <Check size={14} color="#10b981" />}
                  </button>
                );
              })}
              <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0', padding: '4px 0 0 0' }}>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenScopeModal();
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#059669',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  Jelajahi Semua Wilayah...
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scope Breadcrumbs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12.5px',
          color: '#64748b',
          overflowX: 'auto',
          maxWidth: '520px'
        }}>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.id}>
                <button
                  onClick={() => setScopeById(crumb.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    fontWeight: isLast ? 600 : 400,
                    color: isLast ? '#0f172a' : '#64748b',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  {crumb.name}
                </button>
                {!isLast && <ChevronRight size={13} color="#94a3b8" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Right side: Timestamp, Notifications & Admin Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Realtime clock display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '11.5px',
          color: '#334155',
          fontWeight: 500
        }}>
          <Calendar size={14} color="#64748b" />
          <span>{currentTime}</span>
        </div>

        {/* Notification Bell */}
        <button style={{
          position: 'relative',
          width: '38px',
          height: '38px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <Bell size={18} color="#475569" />
          <span style={{
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontSize: '9.5px',
            fontWeight: 700,
            padding: '1px 4.5px',
            borderRadius: '9999px',
            border: '2px solid #ffffff'
          }}>
            12
          </span>
        </button>

        {/* Profile Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '12px',
          borderLeft: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#0c2b20',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 700
          }}>
            AP
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
              {user?.name || 'Admin Platform'}
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>
              {user?.role || 'Super Administrator'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
