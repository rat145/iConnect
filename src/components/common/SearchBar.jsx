import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';
import Badge from './Badge';

function searchData(company, query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results = [];

  (company.quickLinks || []).forEach((item) => {
    if (item.title.toLowerCase().includes(q) || (item.category || '').toLowerCase().includes(q)) {
      results.push({ type: 'Quick Link', icon: item.icon, title: item.title, url: item.url, path: '/quick-links' });
    }
  });

  (company.documents || []).forEach((item) => {
    if (item.title.toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q)) {
      results.push({ type: 'Document', icon: '📄', title: item.title, url: item.url, path: '/documents' });
    }
  });

  (company.announcements || []).forEach((item) => {
    if (item.title.toLowerCase().includes(q) || (item.body || '').toLowerCase().includes(q)) {
      results.push({ type: 'Announcement', icon: '📢', title: item.title, url: null, path: '/' });
    }
  });

  (company.policies || []).forEach((item) => {
    if (item.title.toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q)) {
      results.push({ type: 'Policy', icon: '📋', title: item.title, url: item.url, path: '/policies' });
    }
  });

  return results.slice(0, 8);
}

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { selectedCompany } = useCompany();

  useEffect(() => {
    if (query.length > 1) {
      setResults(searchData(selectedCompany, query));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query, selectedCompany]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleResultClick = useCallback((result) => {
    setOpen(false);
    setQuery('');
    navigate(result.path);
    if (onClose) onClose();
  }, [navigate, onClose]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#a39e98', pointerEvents: 'none' }}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search links, docs, policies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '7px 12px 7px 32px',
            border: '1px solid #e6e6e6',
            borderRadius: '8px',
            fontSize: '0.875rem',
            background: '#f6f5f4',
            color: '#000',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#0075de'; e.target.style.background = '#fff'; }}
          onBlur={(e) => { e.target.style.borderColor = '#e6e6e6'; e.target.style.background = '#f6f5f4'; }}
          aria-label="Search"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); }}
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#a39e98', fontSize: 14, padding: 2 }}
            aria-label="Clear search"
          >✕</button>
        )}
      </div>

      {open && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 4,
          background: '#fff',
          border: '1px solid #e6e6e6',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          zIndex: 1000,
          overflow: 'hidden',
          maxHeight: 380,
          overflowY: 'auto',
        }}>
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => handleResultClick(r)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 14px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: i < results.length - 1 ? '1px solid #f0f0f0' : 'none',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f6f5f4'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <span style={{ fontSize: 18 }}>{r.icon}</span>
              <span style={{ flex: 1, fontSize: '0.8125rem', color: '#000', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</span>
              <Badge label={r.type} style={{ flexShrink: 0 }} />
            </button>
          ))}
        </div>
      )}

      {open && query.length > 1 && results.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 4,
          background: '#fff',
          border: '1px solid #e6e6e6',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          zIndex: 1000,
          padding: '16px 14px',
          fontSize: '0.8125rem',
          color: '#a39e98',
          textAlign: 'center',
        }}>
          No results for "{query}"
        </div>
      )}
    </div>
  );
}
