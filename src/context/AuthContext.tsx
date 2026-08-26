import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrentUser } from '../core/types/dashboard.types';
import { dashboardService } from '../services';

interface AuthContextState {
  user: CurrentUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>({
    id: 'usr-admin-1',
    name: 'Admin Platform',
    role: 'Super Administrator',
    roleDescription: 'Super Administrator',
    scopeLabel: 'Seluruh Indonesia',
    permissionLevel: 'Full Access',
    activeUsersCount: 28
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const u = await dashboardService.getCurrentUser();
        setUser(u);
      } catch (e) {
        console.error('Error fetching current user:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
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
