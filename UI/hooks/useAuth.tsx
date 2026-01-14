'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { account, teams as teamsDb, ID } from '@/lib/appwrite';
import { User } from '@/models/user';
import { Team } from '@/models/team';

type AuthContextType = {
  user: User | null;
  teams: Team[];
  loading: boolean;
  error: string | null;
  register: (userData: Pick<User, 'email' | 'password' | 'name'>, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshUser() {
    setLoading(true);
    try {
      const current = await account.get();
      setUser(current);
      if(current != null){
        const teamList = await teamsDb.list();
        setTeams(teamList.teams as Team[]);
      }
      setError(null);
    } catch (err: any) {
      // User not authenticated or session expired
      setUser(null);
      setTeams([]);
      setError(null); // Don't set error for unauthenticated state
    } finally {
      setLoading(false);
    }
  }

  async function register(userData: Pick<User, 'email' | 'password' | 'name'>, password: string) {
    try {
      await account.create({
        userId: ID.unique(),
        email: userData.email,
        password,
        name: userData.name,
      });
      // Automatically create session after registration
      await account.createEmailPasswordSession({ email: userData.email, password });
      await refreshUser(); // update context user
    } catch (err: any) {
      console.error(err);
      throw new Error(err?.message || 'Registration failed');
    }
  }

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession({ email, password });
      await refreshUser(); // sync context state with session
    } catch (err: any) {
      console.error(err);
      throw new Error(err?.message || 'Login failed');
    }
  }

  async function logout() {
    try {
      await account.deleteSession({ sessionId: 'current' });
      // Immediately clear state without API call
      setUser(null);
      setTeams([]);
      setError(null);
    } catch (err: any) {
      console.error(err);
      throw new Error(err?.message || 'Logout failed');
    }
  }

  useEffect(() => {
    refreshUser(); // Check auth state on app load
  }, []);

  const value: AuthContextType = {
    user,
    teams,
    loading,
    error,
    register,
    login,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
