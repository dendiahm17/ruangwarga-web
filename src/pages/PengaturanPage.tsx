import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Clock,
  Radio,
  Save,
  CheckCircle2,
  Database,
  Cloud,
  Globe,
  Bell
} from 'lucide-react';

export const PengaturanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'umum' | 'sla' | 'integrasi'>('umum');
  
  // General settings
  const [platformName, setPlatformName] = useState('RuangWarga Control Center');
  const [timeZone, setTimeZone] = useState('Asia/Jakarta (WIB)');
  const [sessionTimeout, setSessionTimeout] = useState('60 Menit');

  // SLA Settings
  const [emergencySlaMinutes, setEmergencySlaMinutes] = useState('15');
  const [reportSlaHours, setReportSlaHours] = useState('24');
  const [autoEscalateSos, setAutoEscalateSos] = useState(true);
  const [inactiveRegionAlertDays, setInactiveRegionAlertDays] = useState('14');

  // Cloud & Integration
  const [firebaseStatus, setFirebaseStatus] = useState('Terkoneksi (ruangwarga-app)');
  const [smsGatewayStatus, setSmsGatewayStatus] = useState('Aktif (WhatsApp Official)');

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
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
            <Settings size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Pengaturan Sistem & Konfigurasi Ekosistem
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Konfigurasi parameter global, target SLA respon darurat, dan integrasi backend Firebase
          </p>
        </div>

        {savedNotice && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '6px 12px',
            color: '#10b981',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <CheckCircle2 size={15} />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      {/* Tabs Toolbar */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { id: 'umum', label: 'Umum & Identitas Platform', icon: <Globe size={14} /> },
          { id: 'sla', label: 'Kebijakan SLA & Kedaruratan', icon: <Clock size={14} /> },
          { id: 'integrasi', label: 'Integrasi Cloud & Backend', icon: <Cloud size={14} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeTab === tab.id ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: activeTab === tab.id ? 'rgba(0, 229, 255, 0.15)' : '#0a1220',
              color: activeTab === tab.id ? '#00e5ff' : '#94a3b8',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Form Card */}
      <div className="futuristic-card" style={{ padding: '24px', maxWidth: '800px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* TAB 1: UMUM */}
          {activeTab === 'umum' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Nama Platform Control Center
                </label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Zona Waktu Resmi
                  </label>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
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
                    <option value="Asia/Jakarta (WIB)">Waktu Indonesia Barat (WIB / UTC+7)</option>
                    <option value="Asia/Makassar (WITA)">Waktu Indonesia Tengah (WITA / UTC+8)</option>
                    <option value="Asia/Jayapura (WIT)">Waktu Indonesia Timur (WIT / UTC+9)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Durasi Sesi Login Admin
                  </label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
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
                    <option value="30 Menit">30 Menit</option>
                    <option value="60 Menit">60 Menit (Direkomendasikan)</option>
                    <option value="120 Menit">120 Menit</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SLA & KEDARURATAN */}
          {activeTab === 'sla' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Target Respon Alarm Darurat (SLA)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      value={emergencySlaMinutes}
                      onChange={(e) => setEmergencySlaMinutes(e.target.value)}
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
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Menit</span>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Target Disposisi Laporan Warga
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      value={reportSlaHours}
                      onChange={(e) => setReportSlaHours(e.target.value)}
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
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Jam</span>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff' }}>
                    Otomasi Eskalasi Sinyal SOS Belum Direspon
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                    Teruskan otomatis ke Babinsa / Posko Kecamatan jika RT/RW tidak merespon dalam 10 menit.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoEscalateSos}
                  onChange={(e) => setAutoEscalateSos(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#00e5ff', cursor: 'pointer' }}
                />
              </div>
            </div>
          )}

          {/* TAB 3: INTEGRASI */}
          {activeTab === 'integrasi' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#060b13',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Database size={20} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Firebase Firestore Backend</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Project ID: ruangwarga-app (Multi-Region)</div>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                  CONNECTED
                </span>
              </div>

              {/* Seed Firestore Database Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: 'rgba(0, 229, 255, 0.05)',
                border: '1px dashed rgba(0, 229, 255, 0.3)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#00e5ff' }}>Inisialisasi Data Awal Firestore (Database Seeder)</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    Otomatis membuat koleksi awal (territories, workspaces, users, alarms, reports, roles).
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const { seedInitialFirestoreData } = await import('../services/firestore/seedFirestore');
                    const res = await seedInitialFirestoreData();
                    alert(res.message);
                  }}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                    border: '1px solid #00e5ff',
                    borderRadius: '6px',
                    color: '#00e5ff',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0, 229, 255, 0.2)'
                  }}
                >
                  🚀 Jalankan Seeder
                </button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Bell size={20} color="#38bdf8" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>WhatsApp Broadcast & SMS Gateway</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Notifikasi darurat ke pengurus wilayah</div>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                  ACTIVE
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                backgroundColor: 'rgba(0, 229, 255, 0.18)',
                border: '1px solid #00e5ff',
                borderRadius: '8px',
                color: '#00e5ff',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(0, 229, 255, 0.25)'
              }}
            >
              <Save size={15} />
              <span>Simpan Konfigurasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
