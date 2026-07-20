import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../context/CompanyContext';
import Avatar from '../common/Avatar';
import SearchBar from '../common/SearchBar';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/quick-links', label: 'Quick Links' },
  { to: '/documents', label: 'Documents' },
  { to: '/hr', label: 'HR' },
  { to: '/it-support', label: 'IT Support' },
  { to: '/policies', label: 'Policies' },
  { to: '/directory', label: 'Directory' },
  { to: '/help', label: 'Help' },
];

export default function Header({ onMenuOpen }) {
  const { user, signOut } = useAuth();
  const { selectedCompany, setSelectedCompany, companies } = useCompany();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = () => {
    setDropdownOpen(false);
    signOut();
    navigate('/signin');
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#fff',
      borderBottom: '1px solid #e6e6e6',
      height: 56,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        {/* Hamburger — mobile only */}
        <button
          className="header-hamburger"
          onClick={onMenuOpen}
          aria-label="Open menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            color: '#31302e',
            padding: 4,
            marginRight: 4,
          }}
        >
          ☰
        </button>

        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '7px',
            background: '#0075de',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 16,
            fontWeight: 800,
          }}>i</div>
          <span style={{ fontSize: '1.0625rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#000' }}>Connect</span>
        </NavLink>

        {/* Center Nav */}
        <nav className="header-nav" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#0075de' : '#31302e',
                background: isActive ? '#eff6ff' : 'transparent',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.1s, color 0.1s',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Company Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f6f5f4', borderRadius: '8px', padding: '4px 10px', border: '1px solid #e6e6e6' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedCompany.brandColor, flexShrink: 0 }} />
            <select
              value={selectedCompany.id}
              onChange={(e) => setSelectedCompany(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#31302e',
                cursor: 'pointer',
                maxWidth: 120,
              }}
              aria-label="Switch company"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.shortName}</option>
              ))}
            </select>
          </div>

          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen((o) => !o)}
            aria-label="Toggle search"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 18,
              cursor: 'pointer',
              color: '#615d59',
              padding: 4,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            🔍
          </button>

          {/* User Avatar + Dropdown (hidden when no user is logged in) */}
          {user && (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                aria-label="User menu"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Avatar name={user.name} picture={user.picture} size={32} />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: 220,
                  background: '#fff',
                  border: '1px solid #e6e6e6',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  zIndex: 200,
                }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #e6e6e6' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#a39e98', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
                  </div>
                  <div style={{ padding: '6px' }}>
                    <button
                      onClick={handleSignOut}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'none',
                        border: 'none',
                        borderRadius: '8px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        color: '#c0392b',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fde8e8'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search panel below header */}
      {searchOpen && (
        <div style={{
          position: 'absolute',
          top: 56,
          left: 0,
          right: 0,
          background: '#fff',
          borderBottom: '1px solid #e6e6e6',
          padding: '12px 24px',
          zIndex: 99,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .header-hamburger { display: flex !important; }
          .header-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
