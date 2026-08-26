import React, { useState } from 'react';
import { Search, Bell, MessageSquare, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari RuangWarga Control Center?')) {
      logout();
    }
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-header)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Title & Subtitle */}
      <div>
        <div style={{
          fontSize: '18px',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          Control Center
        </div>
        <div style={{
          fontSize: '11px',
          color: '#00e5ff',
          fontWeight: 600,
          marginTop: '2px'
        }}>
          {user?.role || 'Platform Administrator'}
        </div>
      </div>

      {/* Center/Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Global Search Bar with Ctrl K badge */}
        <div style={{
          position: 'relative',
          width: '320px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari wilayah, data, atau fitur..."
            style={{
              width: '100%',
              backgroundColor: '#0a1220',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              borderRadius: '8px',
              padding: '7px 46px 7px 32px',
              fontSize: '11.5px',
              color: '#ffffff',
              outline: 'none',
              transition: 'all 0.15s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#00e5ff';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 229, 255, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <span style={{
            position: 'absolute',
            right: '8px',
            backgroundColor: '#132238',
            border: '1px solid #1e293b',
            color: '#64748b',
            fontSize: '9.5px',
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: '4px',
            pointerEvents: 'none'
          }}>
            Ctrl K
          </span>
        </div>

        {/* Notifications Icon with Badge */}
        <button style={{
          position: 'relative',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: '#0a1220',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#94a3b8',
          transition: 'all 0.15s ease'
        }}>
          <Bell size={16} />
          <span style={{
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontSize: '9px',
            fontWeight: 800,
            padding: '0 4px',
            borderRadius: '9999px',
            border: '2px solid #060b13',
            boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)'
          }}>
            12
          </span>
        </button>

        {/* Messages Icon */}
        <button style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: '#0a1220',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#94a3b8'
        }}>
          <MessageSquare size={15} />
        </button>

        {/* Administrator Profile Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '4px 10px 4px 4px',
          backgroundColor: '#0a1220',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          borderRadius: '24px'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#1e293b',
            border: '1.5px solid #00e5ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 800,
            color: '#00e5ff',
            boxShadow: '0 0 8px rgba(0, 229, 255, 0.3)'
          }}>
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AU'}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
              {user?.name || 'Administrator Utama'}
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748b', fontWeight: 500 }}>
              {user?.scopeLabel || 'Seluruh Indonesia'}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title="Keluar dari Sistem"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#f87171',
            fontSize: '11.5px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <LogOut size={14} />
          <span>Keluar</span>
        </button>
      </div>
    </header>
  );
};
