import React, { useState } from 'react';
import {
  LineChart,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  Star,
  Activity,
  ArrowUpRight,
  Download
} from 'lucide-react';

export const WawasanPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('30 Hari Terakhir');

  const stats = [
    { label: 'Pertumbuhan Pengguna Baru', value: '+12,8%', subtitle: '+324.890 warga terdaftar', icon: <TrendingUp size={20} color="#00e5ff" /> },
    { label: 'Indeks Partisipasi Warga', value: '68,4%', subtitle: 'Rata-rata keaktifan gotong royong', icon: <Users size={20} color="#38bdf8" /> },
    { label: 'Penyelesaian Pengaduan', value: '82,4%', subtitle: '1.248 laporan tuntas tepat waktu', icon: <CheckCircle2 size={20} color="#10b981" /> },
    { label: 'Kepuasan Layanan Publik', value: '4,6 / 5', subtitle: 'Berdasarkan 48.290 ulasan warga', icon: <Star size={20} color="#f59e0b" /> }
  ];

  const regionalRanks = [
    { rank: 1, region: 'Provinsi Jawa Barat', score: '94,2%', citizens: '842.100 Warga', status: 'Sangat Aktif' },
    { rank: 2, region: 'Provinsi Jawa Tengah', score: '91,8%', citizens: '710.300 Warga', status: 'Sangat Aktif' },
    { rank: 3, region: 'Provinsi Jawa Timur', score: '88,5%', citizens: '790.400 Warga', status: 'Aktif' },
    { rank: 4, region: 'DKI Jakarta', score: '86,4%', citizens: '594.200 Warga', status: 'Aktif' },
    { rank: 5, region: 'Provinsi Banten', score: '81,0%', citizens: '342.100 Warga', status: 'Cukup Aktif' }
  ];

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
            <LineChart size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Wawasan & Analitik Eksekutif Platform
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Evaluasi kinerja pelayanan wilayah, kepuasan masyarakat, dan indeks adopsi aplikasi warga
          </p>
        </div>

        {/* Filter Period & Export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              backgroundColor: '#0a1220',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '11.5px',
              color: '#ffffff',
              outline: 'none'
            }}
          >
            <option value="7 Hari Terakhir">7 Hari Terakhir</option>
            <option value="30 Hari Terakhir">30 Hari Terakhir</option>
            <option value="Kuartal Ini">Kuartal Ini (Q3)</option>
            <option value="Tahun Ini">Tahun 2026</option>
          </select>

          <button
            onClick={() => alert('Laporan analitik eksekutif siap diunduh format PDF!')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(0, 229, 255, 0.15)',
              border: '1px solid #00e5ff',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#00e5ff',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Download size={13} />
            <span>Ekspor Laporan</span>
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="futuristic-card"
            style={{
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {s.icon}
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>
                {s.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Analytics: Performance Trend & Regional Ranking */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: '20px'
      }}>
        {/* Left: Monthly Growth Analytics */}
        <div className="futuristic-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="futuristic-card-title">TREN ADOPSI APLIKASI & KEAKTIFAN WARGA</span>
            <span style={{ fontSize: '11px', color: '#00e5ff', fontWeight: 700 }}>
              +18,7% Rata-rata Nasional
            </span>
          </div>

          {/* SVG Vector Sparkline Simulation */}
          <div style={{
            height: '220px',
            backgroundColor: '#060b13',
            borderRadius: '10px',
            border: '1px solid rgba(56, 189, 248, 0.15)',
            padding: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}>
            {[35, 42, 48, 55, 62, 70, 78, 85, 92, 98, 105, 120].map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div
                  style={{
                    width: '18px',
                    height: `${h}px`,
                    backgroundColor: 'rgba(0, 229, 255, 0.25)',
                    border: '1px solid #00e5ff',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 0 10px rgba(0, 229, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                />
                <span style={{ fontSize: '9px', color: '#64748b' }}>Bln {i + 1}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
            <span>Total Unduhan Aplikasi Android: <strong style={{ color: '#ffffff' }}>2.847.592</strong></span>
            <span>Rerata Durasi Respon Aduan: <strong style={{ color: '#10b981' }}>1,8 Jam</strong></span>
          </div>
        </div>

        {/* Right: Regional Performance Ranking */}
        <div className="futuristic-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="futuristic-card-title">PERINGKAT ADOPSI WILAYAH</span>
            <Award size={16} color="#f59e0b" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {regionalRanks.map((r) => (
              <div
                key={r.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: r.rank === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.1)',
                    border: `1px solid ${r.rank === 1 ? '#f59e0b' : 'rgba(56, 189, 248, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    color: r.rank === 1 ? '#f59e0b' : '#38bdf8'
                  }}>
                    {r.rank}
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                      {r.region}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>
                      {r.citizens}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#00e5ff' }}>
                    {r.score}
                  </div>
                  <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 600 }}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
