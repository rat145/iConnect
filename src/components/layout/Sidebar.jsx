import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../context/CompanyContext';
import Avatar from '../common/Avatar';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/quick-links', label: 'Quick Links', icon: '🔗' },
  { to: '/documents', label: 'Documents', icon: '📁' },
  { to: '/hr', label: 'HR', icon: '👥' },
  { to: '/it-support', label: 'IT Support', icon: '💻' },
  { to: '/policies', label: 'Policies', icon: '📋' },
  { to: '/directory', label: 'Directory', icon: '📒' },
  { to: '/help', label: 'Help', icon: '❓' },
];

export default function Sidebar({ open, onClose }) {
  const { user, signOut } = useAuth();
  const { selectedCompany, setSelectedCompany, companies } = useCompany();
  const navigate = useNavigate();

  const handleSignOut = () => {
    onClose();
    signOut();
    navigate('/signin');
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 200,
        }}
      />
      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 280,
        background: '#fff',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #e6e6e6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: '7px', background: '#0075de', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 800 }}>i</div>
            <span style={{ fontSize: '1.0625rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#000' }}>Connect</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#a39e98', padding: 4 }} aria-label="Close menu">✕</button>
        </div>

        {/* Company Switcher */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #e6e6e6' }}>
          <label style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#a39e98', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Company</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: selectedCompany.brandColor, flexShrink: 0 }} />
            <select
              value={selectedCompany.id}
              onChange={(e) => setSelectedCompany(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9375rem', fontWeight: 500, color: '#31302e', cursor: 'pointer' }}
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '8px 12px' }}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#0075de' : '#31302e',
                background: isActive ? '#eff6ff' : 'transparent',
                borderLeft: isActive ? '3px solid #0075de' : '3px solid transparent',
                marginBottom: 2,
                transition: 'background 0.1s',
              })}
            >
              <span style={{ fontSize: 18 }}>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #e6e6e6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Avatar name={user?.name} picture={user?.picture} size={36} />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#a39e98', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: '8px',
              background: '#fde8e8',
              border: 'none',
              color: '#c0392b',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
