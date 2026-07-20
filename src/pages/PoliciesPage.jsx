import React, { useState, useMemo } from 'react';
import { useCompany } from '../context/CompanyContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PoliciesPage() {
  const { selectedCompany } = useCompany();
  const [search, setSearch] = useState('');

  const policies = selectedCompany.policies || [];

  const filtered = useMemo(() => {
    if (!search.trim()) return policies;
    const q = search.toLowerCase();
    return policies.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
    );
  }, [policies, search]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, policy) => {
      const cat = policy.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(policy);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>Policies</h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>Company policies and guidelines for {selectedCompany.name}.</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 400, marginBottom: 28 }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#a39e98', pointerEvents: 'none' }}>🔍</span>
        <input
          type="text"
          placeholder="Search policies…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '9px 12px 9px 32px', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '0.875rem', background: '#fff', outline: 'none' }}
          onFocus={(e) => e.target.style.borderColor = '#0075de'}
          onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
        />
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p style={{ color: '#a39e98', textAlign: 'center', padding: '40px 0' }}>No policies found matching "{search}".</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #e6e6e6' }}>
              <Badge label={category} />
              <span style={{ fontSize: '0.8125rem', color: '#a39e98' }}>{items.length} polic{items.length !== 1 ? 'ies' : 'y'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((policy) => (
                <Card key={policy.id} hoverable style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 20 }}>📋</span>
                        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#000' }}>{policy.title}</h3>
                        <Badge label={policy.category} />
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#615d59', lineHeight: 1.6, margin: 0 }}>{policy.description}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>Updated {formatDate(policy.updatedAt)}</span>
                      <a
                        href={policy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ padding: '6px 16px', borderRadius: '9999px', background: '#0075de', color: '#fff', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}
                      >
                        View →
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
