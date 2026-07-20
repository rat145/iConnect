import React, { useState, useMemo } from 'react';
import { useCompany } from '../context/CompanyContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function DocumentsPage() {
  const { selectedCompany } = useCompany();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const docs = selectedCompany.documents || [];

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(docs.map((d) => d.category))];
    return cats;
  }, [docs]);

  const filtered = useMemo(() => {
    return docs.filter((d) => {
      const matchCat = activeCategory === 'All' || d.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        (d.description || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [docs, search, activeCategory]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>Documents</h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>Policies, handbooks, and key resources for {selectedCompany.name}.</p>
      </div>

      {/* Search + Filter Row */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 400 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#a39e98', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 32px', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '0.875rem', background: '#fff', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = '#0075de'}
            onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
          />
        </div>
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: activeCategory === cat ? 600 : 400,
                border: '1px solid',
                borderColor: activeCategory === cat ? '#0075de' : '#e6e6e6',
                background: activeCategory === cat ? '#0075de' : '#fff',
                color: activeCategory === cat ? '#fff' : '#31302e',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      {filtered.length === 0 ? (
        <p style={{ color: '#a39e98', textAlign: 'center', padding: '40px 0' }}>No documents found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {filtered.map((doc) => (
            <Card key={doc.id} hoverable>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>📄</span>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#000', marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.title}</div>
                  <p style={{ fontSize: '0.8125rem', color: '#615d59', marginBottom: 10, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{doc.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <Badge label={doc.category} />
                    <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>Updated {formatDate(doc.updatedAt)}</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: '6px 16px', borderRadius: '9999px', background: '#0075de', color: '#fff', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  View →
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
