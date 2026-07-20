import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../context/CompanyContext';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const { signIn, authState } = useAuth();
  const { selectedCompany, setSelectedCompany, companies } = useCompany();
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    signIn(credentialResponse);
  };

  const handleError = () => {
    console.error('Google Sign-In failed');
  };

  React.useEffect(() => {
    if (authState === 'authenticated') {
      navigate('/');
    }
  }, [authState, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f6f5f4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo / Wordmark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: '#0075de',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 20,
              fontWeight: 800,
            }}>i</div>
            <span style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#000',
            }}>Connect</span>
          </div>
          <p style={{ color: '#615d59', fontSize: '0.9375rem', margin: 0 }}>
            Your company. Connected.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid #e6e6e6',
          padding: '36px 32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: '#000' }}>
            Sign in to iConnect
          </h1>
          <p style={{ color: '#615d59', fontSize: '0.875rem', marginBottom: 28 }}>
            Use your company Google account to continue.
          </p>

          {/* Company Selector */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#31302e', marginBottom: 6 }}>
              Select your company
            </label>
            <select
              value={selectedCompany.id}
              onChange={(e) => setSelectedCompany(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e6e6e6',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                color: '#000',
                background: '#fff',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a39e98' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: 36,
              }}
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <p style={{ marginTop: 6, fontSize: '0.75rem', color: '#a39e98' }}>
              Only email addresses from{' '}
              <strong>{selectedCompany.allowedDomains.map(d => '@' + d).join(', ')}</strong>{' '}
              are authorised.
            </p>
          </div>

          {/* Google Login Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            {authState === 'loading' ? (
              <div style={{ padding: '12px 0', color: '#a39e98', fontSize: '0.875rem' }}>Signing in…</div>
            ) : (
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                shape="pill"
                size="large"
                text="signin_with"
                theme="outline"
                width="320"
              />
            )}
          </div>

          {authState === 'error' && (
            <p style={{ color: '#c0392b', fontSize: '0.8125rem', textAlign: 'center', marginTop: 12 }}>
              Sign-in failed. Please try again.
            </p>
          )}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.75rem', color: '#a39e98' }}>
          Access restricted to authorised employees only.
        </p>
      </div>
    </div>
  );
}
