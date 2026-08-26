import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  GitPullRequest, 
  History, 
  MessageSquare, 
  Lock, 
  BarChart2, 
  Network 
} from 'lucide-react';

export const PhilosophyFooter: React.FC = () => {
  const principles = [
    { label: 'Sistem > Individu', icon: Users },
    { label: 'Kewenangan Berbasis Jabatan & Scope', icon: ShieldCheck },
    { label: 'Workflow untuk Setiap Pekerjaan', icon: GitPullRequest },
    { label: 'Audit Trail untuk Setiap Tindakan', icon: History },
    { label: 'Musyawarah Didukung Sistem, Bukan Digantikan', icon: MessageSquare },
    { label: 'Data Aman & Terkendali', icon: Lock },
    { label: 'Statistik untuk Perbaikan, Bukan Kompetisi', icon: BarChart2 },
    { label: 'Kemandirian Wilayah, Terhubung Nasional', icon: Network }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '3fr 1.2fr',
      gap: '16px',
      marginTop: '6px'
    }}>
      {/* Left Box: 8 Prinsip RuangWarga */}
      <div className="panel-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#059669', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '10px' }}>
          PRINSIP RUANGWARGA
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px 10px'
        }}>
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px'
                }}>
                  <Icon size={13} color="#059669" strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#334155', lineHeight: 1.3 }}>
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Box: Berlandaskan Pancasila & Garuda */}
      <div className="panel-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
        border: '1px solid #bbf7d0'
      }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#15803d', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            BERLANDASKAN PANCASILA
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#166534', marginTop: '4px', maxWidth: '190px', lineHeight: 1.3 }}>
            Untuk Masyarakat yang Mandiri, Tertib, dan Sejahtera
          </div>
        </div>

        {/* Garuda Emblem SVG / Graphic */}
        <div style={{
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            {/* Stylized Golden Garuda Emblem */}
            <circle cx="50" cy="50" r="45" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <polygon points="50,15 62,35 85,38 68,55 72,78 50,66 28,78 32,55 15,38 38,35" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
            {/* Center shield */}
            <rect x="40" y="40" width="20" height="22" rx="3" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
            <circle cx="50" cy="51" r="5" fill="#ffffff" />
            <polygon points="50,47 52,53 48,53" fill="#ca8a04" />
          </svg>
        </div>
      </div>
    </div>
  );
};
