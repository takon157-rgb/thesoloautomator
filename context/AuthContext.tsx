import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserPlan } from '../types';
import { INITIAL_FREE_CREDITS, PLAN_CREDITS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  deductCredit: () => boolean;
  saveItem: (itemId: string) => void;
  addToHistory: (itemId: string) => void;
  upgradeUser: (plan: UserPlan) => void;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load user and theme from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('saas_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedTheme = localStorage.getItem('saas_theme') as 'light' | 'dark';
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       // Auto detect system preference if no stored preference
       setTheme('dark');
       document.documentElement.classList.add('dark');
    }
  }, []);

  // Persist user to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('saas_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('saas_user');
    }
  }, [user]);

  // Persist theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('saas_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const login = (email: string) => {
    if (!user) {
         const mockUser: User = {
            id: 'u_' + Math.random().toString(36).substr(2, 9),
            name: 'Demo User',
            email: email,
            avatar: `https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff`,
            bio: 'I am a solo founder building cool things.',
            plan: UserPlan.FREE,
            credits: INITIAL_FREE_CREDITS,
            savedItemIds: [],
            recentlyViewedIds: [],
            joinedDate: new Date().toISOString()
        };
        setUser(mockUser);
    }
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
      bio: 'New member ready to automate.',
      plan: UserPlan.FREE,
      credits: INITIAL_FREE_CREDITS,
      savedItemIds: [],
      recentlyViewedIds: [],
      joinedDate: new Date().toISOString()
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const upgradeUser = (plan: UserPlan) => {
    if (!user) return;
    // Backend simulation: Allocate coins (credits) based on the plan
    const newCredits = PLAN_CREDITS[plan];
    setUser({ ...user, plan, credits: newCredits });
  };

  const deductCredit = (): boolean => {
    if (!user) return false;
    if (user.plan !== UserPlan.FREE && user.plan !== UserPlan.PRO && user.plan !== UserPlan.BUSINESS) return false;
    
    // Pro/Business have unlimited (Infinity) or high cap. 
    // If logic changes to consumption based, handle here.
    if (user.credits <= 0) return false;
    
    if (user.credits !== Infinity) {
        setUser({ ...user, credits: user.credits - 1 });
    }
    return true;
  };

  const saveItem = (itemId: string) => {
    if (!user) return;
    const isSaved = user.savedItemIds.includes(itemId);
    let newSaved = [];
    if (isSaved) {
      newSaved = user.savedItemIds.filter(id => id !== itemId);
    } else {
      newSaved = [...user.savedItemIds, itemId];
    }
    setUser({ ...user, savedItemIds: newSaved });
  };

  const addToHistory = (itemId: string) => {
    if (!user) return;
    // Remove if exists, add to front, slice to keep last 10
    const newHistory = [itemId, ...user.recentlyViewedIds.filter(id => id !== itemId)].slice(0, 10);
    setUser({ ...user, recentlyViewedIds: newHistory });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile,
      deductCredit,
      saveItem,
      addToHistory,
      upgradeUser,
      isAuthenticated: !!user,
      theme,
      toggleTheme
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};