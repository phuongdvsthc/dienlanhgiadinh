import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AdminUser, AdminAccessStatus } from '../types/admin';
import { validateAdminAccess } from '../repositories/adminRepository';

interface AuthContextType {
  firebaseUser: User | null;
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthLoading: boolean;
  adminAccessStatus: AdminAccessStatus | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user?: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [adminAccessStatus, setAdminAccessStatus] = useState<AdminAccessStatus | null>(null);

  useEffect(() => {
    // Chỉ có một observer duy nhất
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setFirebaseUser(currentUser);
        setIsAuthenticated(true);
        setIsAuthLoading(true); // Giữ loading khi kiểm tra admin access
        
        try {
          // Chỉ kiểm tra một document admin
          const result = await validateAdminAccess(currentUser.uid);
          setAdminAccessStatus(result.status);
          
          if (result.status === 'authorized' && result.admin) {
            setIsAdmin(true);
            setAdminUser(result.admin);
          } else {
            setIsAdmin(false);
            setAdminUser(null);
          }
        } catch (error) {
          console.error('Error validating admin access:', error);
          setIsAdmin(false);
          setAdminUser(null);
          setAdminAccessStatus('error');
        } finally {
          setIsAuthLoading(false);
        }
      } else {
        setFirebaseUser(null);
        setAdminUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setAdminAccessStatus(null);
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.warn('Error signing in', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setAdminUser(null);
      setIsAdmin(false);
      setAdminAccessStatus(null);
    } catch (error) {
      console.warn('Error signing out', error);
      throw error;
    }
  };

  const value = {
    firebaseUser,
    adminUser,
    isAuthenticated,
    isAdmin,
    isAuthLoading,
    adminAccessStatus,
    signIn,
    signOut,
    user: firebaseUser, // Để tương thích ngược với các trang cũ
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
