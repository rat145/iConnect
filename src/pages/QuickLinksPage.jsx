import React, { useState, useMemo } from 'react';
import { useCompany } from '../context/CompanyContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export default function QuickLinksPage() {
  const { selectedCompany } = useCompany();
  const [search, setSearch] = useState('');

  const links = selectedCompany.quickLinks || [];

  const filtered = useMemo(() => {
    if (!search.trim()) return links;
    const q = search.toLowerCase();
    return links.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.category || '').toLowerCase().includes(q)
    );
  }, [links, search]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, link) => {
      const cat = link.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(link);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>Quick Links</h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>All frequently used tools and resources for {selectedCompany.name}.</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 400, marginBottom: 28 }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#a39e98', pointerEvents: 'none' }}>🔍</span>
        <input
          type="text"
          placeholder="Search quick links…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 12px 9px 32px',
            border: '1px solid #e6e6e6',
            borderRadius: '8px',
            fontSize: '0.875rem',
            background: '#fff',
            color: '#000',
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = '#0075de'}
          onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
        />
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p style={{ color: '#a39e98', textAlign: 'center', padding: '40px 0' }}>No links found matching "{search}".</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Badge label={category} />
              <span style={{ color: '#a39e98', fontSize: '0.8125rem' }}>{items.length} link{items.length !== 1 ? 's' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {items.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Card hoverable style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 28 }}>{link.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 4 }}>{link.title}</div>
                          <Badge label={link.category} />
                        </div>
                      </div>
                      <span style={{ color: '#0075de', fontSize: 16, flexShrink: 0, marginTop: 2 }}>↗</span>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
