import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/documents', label: 'Documents' },
  { to: '/hr', label: 'HR' },
  { to: '/policies', label: 'Policies' },
  { to: '/help', label: 'Help' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#f6f5f4',
      borderTop: '1px solid #e6e6e6',
      padding: '20px 24px',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {/* Left */}
        <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>
          © {new Date().getFullYear()} Acme Group. All rights reserved.
        </span>

        {/* Center */}
        <nav style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ fontSize: '0.75rem', color: '#615d59', textDecoration: 'none' }}
              onMouseEnter={(e) => e.target.style.color = '#0075de'}
              onMouseLeave={(e) => e.target.style.color = '#615d59'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>
          Powered by <strong style={{ color: '#0075de' }}>iConnect</strong>
        </span>
      </div>
    </footer>
  );
}
