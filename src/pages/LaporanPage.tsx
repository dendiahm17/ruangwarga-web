import React, { useState } from 'react';
import type { CitizenReport } from '../core/types/report.types';
import { mockCitizenReports } from '../services/mock/mockReportData';
import { ReportDetailModal } from '../components/reports/ReportDetailModal';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  Inbox,
  Filter,
  Eye,
  Building,
  Trash2,
  ShieldAlert
} from 'lucide-react';

export const LaporanPage: React.FC = () => {
  const [reports, setReports] = useState<CitizenReport[]>(mockCitizenReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredReports = reports.filter((r) => {
    const matchQuery = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.locationScope.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'Semua' || r.category === categoryFilter;
    const matchStatus = statusFilter === 'Semua' || r.status === statusFilter;
    return matchQuery && matchCategory && matchStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: CitizenReport['status'], assignedTo?: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: newStatus, assignedTo: assignedTo || r.assignedTo, updatedAt: 'Hari ini' } : r));
  };

  const getCategoryIcon = (category: CitizenReport['category']) => {
    switch (category) {
      case 'infrastruktur': return <Building size={14} color="#38bdf8" />;
      case 'kebersihan': return <Trash2 size={14} color="#34d399" />;
      case 'keamanan': return <ShieldAlert size={14} color="#f59e0b" />;
      default: return <FileText size={14} color="#a855f7" />;
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
            <FileText size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Pusat Pengaduan & Laporan Warga
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Manajemen aspirasi, aduan infrastruktur & ketertiban dari aplikasi Android warga
          </p>
        </div>

        {/* Quick KPI stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#0a1220',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Inbox size={14} color="#38bdf8" />
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Total Laporan:</span>
            <strong style={{ fontSize: '13px', color: '#ffffff' }}>{reports.length}</strong>
          </div>

          <div style={{
            backgroundColor: '#0a1220',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={14} color="#10b981" />
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Selesai:</span>
            <strong style={{ fontSize: '13px', color: '#10b981' }}>{reports.filter(r => r.status === 'completed').length}</strong>
          </div>
        </div>
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
            placeholder="Cari nomor tiket, judul laporan, atau warga..."
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

        {/* Category & Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#94a3b8' }}>
            <span>Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '11.5px',
                color: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="Semua">Semua Kategori</option>
              <option value="infrastruktur">Infrastruktur</option>
              <option value="kebersihan">Kebersihan</option>
              <option value="keamanan">Keamanan</option>
              <option value="administrasi">Administrasi</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#94a3b8' }}>
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '11.5px',
                color: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="Semua">Semua Status</option>
              <option value="received">Diterima</option>
              <option value="dispositioned">Disposisi</option>
              <option value="in_progress">Sedang Dikerjakan</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="futuristic-card" style={{ padding: '16px 20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>No. Tiket</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Judul & Kategori</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Wilayah Laporan</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Warga Pelapor</th>
              <th style={{ padding: '8px 10px', fontWeight: 700 }}>Status Tindak Lanjut</th>
              <th style={{ padding: '8px 10px', fontWeight: 700, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => {
              const isCompleted = r.status === 'completed';
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#00e5ff', fontWeight: 700 }}>
                    {r.ticketNumber}
                  </td>

                  <td style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      {getCategoryIcon(r.category)}
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{r.title}</span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                      {r.description.slice(0, 50)}...
                    </div>
                  </td>

                  <td style={{ padding: '10px', color: '#cbd5e1' }}>
                    {r.locationScope}
                  </td>

                  <td style={{ padding: '10px' }}>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>{r.reporterName}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8' }}>{r.reporterPhone}</div>
                  </td>

                  <td style={{ padding: '10px' }}>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: isCompleted ? '#10b981' : r.status === 'in_progress' ? '#a855f7' : '#f59e0b',
                      backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.12)' : r.status === 'in_progress' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {r.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        setSelectedReport(r);
                        setIsDetailModalOpen(true);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#0a1220',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        color: '#38bdf8',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <Eye size={12} />
                      <span>Investigasi</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Report Detail Modal */}
      <ReportDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        report={selectedReport}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
