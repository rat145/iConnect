import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../context/CompanyContext';

export default function AccessDenied() {
  const { user, signOut } = useAuth();
  const { selectedCompany } = useCompany();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f6f5f4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 440, textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🚫</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#000', marginBottom: 10 }}>
          Access Denied
        </h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem', marginBottom: 8 }}>
          The email address <strong style={{ color: '#000' }}>{user?.email}</strong> is not authorised to access <strong style={{ color: '#000' }}>{selectedCompany?.name}</strong>.
        </p>
        <p style={{ color: '#a39e98', fontSize: '0.875rem', marginBottom: 32 }}>
          Only employees with an email address from{' '}
          {selectedCompany?.allowedDomains?.map((d, i) => (
            <span key={d}>
              <strong style={{ color: '#615d59' }}>@{d}</strong>
              {i < selectedCompany.allowedDomains.length - 1 ? ', ' : ''}
            </span>
          ))}{' '}
          are allowed.
          <br />Please sign in with your company account.
        </p>
        <button
          onClick={signOut}
          style={{
            padding: '10px 28px',
            borderRadius: '9999px',
            background: '#0075de',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem',
            cursor: 'pointer',
          }}
        >
          Sign Out &amp; Try Again
        </button>
      </div>
    </div>
  );
}
