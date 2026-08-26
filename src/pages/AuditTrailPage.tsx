import React, { useState } from 'react';
import type { AuditLogItem } from '../core/types/security.types';
import { mockAuditLogs } from '../services/mock/mockSecurityData';
import {
  FileCode,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Info,
  Clock,
  User,
  Monitor,
  Download
} from 'lucide-react';

export const AuditTrailPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredLogs = logs.filter((l) => {
    const matchSearch = l.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actorScope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ipAddress.includes(searchQuery);
    const matchRisk = riskFilter === 'all' || l.riskLevel === riskFilter;
    return matchSearch && matchRisk;
  });

  const getRiskBadge = (risk: AuditLogItem['riskLevel']) => {
    switch (risk) {
      case 'critical': return { label: 'CRITICAL', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
      case 'high': return { label: 'HIGH RISK', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' };
      case 'medium': return { label: 'MEDIUM', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'low': return { label: 'NORMAL', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    }
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
            <FileCode size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Log Forensik & Audit Trail
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Rekam jejak aktivitas sensitif dan kepatuhan sistem yang tidak dapat diubah (*Immutable Security Log*)
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => alert('Log audit terenkripsi siap diunduh dalam format .CSV!')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#0a1220',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#38bdf8',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Download size={14} />
          <span>Ekspor Log Audit</span>
        </button>
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
          width: '320px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
          <input
            type="text"
            placeholder="Cari aktor, IP address, atau aksi..."
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

        {/* Risk Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { id: 'all', label: 'Semua Risiko' },
            { id: 'low', label: 'Normal' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'Tinggi' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setRiskFilter(btn.id as any)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: riskFilter === btn.id ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: riskFilter === btn.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                color: riskFilter === btn.id ? '#00e5ff' : '#94a3b8',
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

      {/* Log Feed Table */}
      <div className="futuristic-card" style={{ padding: '16px 20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Waktu & Timestamp</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Aktivitas / Aksi</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Aktor & Scope</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>IP & Perangkat</th>
              <th style={{ padding: '8px 10px', fontWeight: 700, textAlign: 'center' }}>Tingkat Risiko</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((l) => {
              const badge = getRiskBadge(l.riskLevel);
              return (
                <tr key={l.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  {/* Timestamp */}
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{l.timestamp}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{l.timeExact}</div>
                  </td>

                  {/* Action & Description */}
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontWeight: 700, color: '#00e5ff' }}>{l.actionTitle}</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '2px' }}>{l.description}</div>
                  </td>

                  {/* Actor & Scope */}
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{l.actorName}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8' }}>{l.actorRole} • {l.actorScope}</div>
                  </td>

                  {/* IP & Device */}
                  <td style={{ padding: '12px 10px', fontFamily: 'monospace', fontSize: '10.5px' }}>
                    <div style={{ color: '#cbd5e1' }}>{l.ipAddress}</div>
                    <div style={{ fontSize: '9.5px', color: '#64748b' }}>{l.device}</div>
                  </td>

                  {/* Risk Badge */}
                  <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      color: badge.color,
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.color}40`,
                      padding: '2px 7px',
                      borderRadius: '4px'
                    }}>
                      {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
