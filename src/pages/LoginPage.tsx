import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Globe2,
  CheckCircle2,
  AlertCircle,
  Radio,
  Eye,
  EyeOff
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('admin@ruangwarga.id');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState('Super Administrator');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await login(email, password, selectedRole);
    if (!res.success) {
      setErrorMessage(res.message || 'Gagal masuk sistem!');
    }
  };

  const handleDemoAccount = (role: string, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword('admin123');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      backgroundImage: `
        radial-gradient(circle at 50% 20%, rgba(0, 229, 255, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.05) 0%, transparent 50%),
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '460px',
        maxWidth: '100%',
        backgroundColor: '#0a1220',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        borderRadius: '16px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 229, 255, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Header Branding */}
        <div style={{
          padding: '28px 28px 20px 28px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundColor: '#060b13'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid #00e5ff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00e5ff',
            marginBottom: '12px',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
          }}>
            <ShieldCheck size={28} />
          </div>

          <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
            RUANGWARGA <span style={{ color: '#00e5ff', fontWeight: 400 }}>CONTROL CENTER</span>
          </h1>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
            Autentikasi Aman Pusat Komando Tata Kelola Wilayah
          </p>
        </div>

        {/* Form Container */}
        <div style={{ padding: '28px' }}>
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#f87171',
              fontSize: '11.5px',
              marginBottom: '16px'
            }}>
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Role / Scope Selection */}
            <div>
              <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Otoritas Hak Akses
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="Super Administrator">Super Administrator (Nasional / Full Access)</option>
                <option value="Provinsi Administrator">Administrator Provinsi (Jawa Barat)</option>
                <option value="RW Administrator">Administrator RW (RW 02 Sukamaju)</option>
                <option value="RT Administrator">Administrator RT (RT 01 / RW 02)</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Email Pengurus
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={15} color="#64748b" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ruangwarga.id"
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#060b13',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '8px',
                    padding: '9px 12px 9px 36px',
                    fontSize: '12px',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Kata Sandi
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={15} color="#64748b" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#060b13',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '8px',
                    padding: '9px 36px 9px 36px',
                    fontSize: '12px',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '6px',
                padding: '11px',
                backgroundColor: 'rgba(0, 229, 255, 0.2)',
                border: '1px solid #00e5ff',
                borderRadius: '8px',
                color: '#00e5ff',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 16px rgba(0, 229, 255, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              {isLoading ? (
                <span>Memverifikasi Otoritas...</span>
              ) : (
                <>
                  <span>Masuk ke Control Center</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Shortcuts */}
          <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b', textAlign: 'center', marginBottom: '10px' }}>
              Akun Demo Cepat:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleDemoAccount('Super Administrator', 'superadmin@ruangwarga.id')}
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '6px',
                  color: '#94a3b8',
                  fontSize: '10px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                👑 <strong>Super Admin</strong>
              </button>

              <button
                type="button"
                onClick={() => handleDemoAccount('RW Administrator', 'ketuarw@ruangwarga.id')}
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '6px',
                  color: '#94a3b8',
                  fontSize: '10px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                🏘️ <strong>Ketua RW 02</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
