import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrentUser } from '../core/types/dashboard.types';
import { dashboardService } from '../services';

interface AuthContextState {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, role?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(() => {
    const saved = localStorage.getItem('ruangwarga_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null; // default starts at Login Page if not logged in
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, pass: string, selectedRole: string = 'Super Administrator'): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 600));

    if (!email || !pass) {
      setIsLoading(false);
      return { success: false, message: 'Email dan kata sandi wajib diisi!' };
    }

    if (pass.length < 6) {
      setIsLoading(false);
      return { success: false, message: 'Kata sandi minimal 6 karakter!' };
    }

    let roleDesc = 'Super Administrator';
    let scopeLbl = 'Seluruh Indonesia';
    let permLevel = 'Full Access';
    let name = 'Admin Platform';

    if (selectedRole === 'Provinsi Administrator') {
      name = 'Admin Provinsi Jawa Barat';
      roleDesc = 'Administrator Provinsi';
      scopeLbl = 'Jawa Barat';
      permLevel = 'Province Level';
    } else if (selectedRole === 'RW Administrator') {
      name = 'H. Agus Permana';
      roleDesc = 'Ketua RW 02';
      scopeLbl = 'RW 02 Sukamaju';
      permLevel = 'RW Level';
    } else if (selectedRole === 'RT Administrator') {
      name = 'Budi Santoso';
      roleDesc = 'Ketua RT 01';
      scopeLbl = 'RT 01 / RW 02';
      permLevel = 'RT Level';
    }

    const authUser: CurrentUser = {
      id: `usr-${Date.now()}`,
      name: name,
      role: selectedRole,
      roleDescription: roleDesc,
      scopeLabel: scopeLbl,
      permissionLevel: permLevel,
      activeUsersCount: 28
    };

    setUser(authUser);
    localStorage.setItem('ruangwarga_auth_user', JSON.stringify(authUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ruangwarga_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
