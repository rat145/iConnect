import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'iconnect_auth';

export function AuthProvider({ children, selectedCompany }) {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState('idle');

  // Restore auth state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email && parsed.name) {
          setUser(parsed);
          setAuthState('authenticated');
        }
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const signIn = useCallback((credentialResponse) => {
    setAuthState('loading');
    try {
      const credential = credentialResponse.credential;
      // Decode JWT payload (header.payload.signature)
      const base64Payload = credential.split('.')[1];
      // Pad base64 if needed
      const padded = base64Payload + '=='.slice(0, (4 - base64Payload.length % 4) % 4);
      const payload = JSON.parse(atob(padded));

      const { email, name, picture, email_verified } = payload;

      if (!email_verified) {
        setAuthState('error');
        return;
      }

      // Domain validation
      const allowedDomains = selectedCompany ? selectedCompany.allowedDomains : [];
      const isAllowed = allowedDomains.some((domain) =>
        email.toLowerCase().endsWith('@' + domain.toLowerCase())
      );

      if (!isAllowed) {
        setAuthState('denied');
        // Store the rejected email for display
        setUser({ email, name, picture });
        return;
      }

      const userObj = { name, email, picture };
      setUser(userObj);
      setAuthState('authenticated');
      // Store only safe fields — never the raw token
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
    } catch (err) {
      console.error('Sign-in error:', err);
      setAuthState('error');
    }
  }, [selectedCompany]);

  const signOut = useCallback(() => {
    setUser(null);
    setAuthState('idle');
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = {
    user,
    authState,
    signIn,
    signOut,
    isAuthenticated: authState === 'authenticated',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
