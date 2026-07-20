import React from 'react';
import { useCompany } from '../context/CompanyContext';
import Card from '../components/common/Card';

const HR_CATEGORIES = [
  { key: 'Leave & Attendance', icon: '🗓️', filter: (item) => item.title.toLowerCase().includes('leave') || item.title.toLowerCase().includes('attendance') || item.title.toLowerCase().includes('shift') || item.title.toLowerCase().includes('roster') },
  { key: 'Payroll & Benefits', icon: '💵', filter: (item) => item.title.toLowerCase().includes('payroll') || item.title.toLowerCase().includes('pay') || item.title.toLowerCase().includes('benefit') || item.title.toLowerCase().includes('insurance') || item.title.toLowerCase().includes('carry') },
  { key: 'Learning & Development', icon: '📚', filter: (item) => item.title.toLowerCase().includes('learn') || item.title.toLowerCase().includes('train') || item.title.toLowerCase().includes('cme') || item.title.toLowerCase().includes('development') || item.title.toLowerCase().includes('course') },
  { key: 'Performance', icon: '⭐', filter: (item) => item.title.toLowerCase().includes('performance') || item.title.toLowerCase().includes('review') || item.title.toLowerCase().includes('goal') },
  { key: 'Other Resources', icon: '🤝', filter: () => true },
];

export default function HRPage() {
  const { selectedCompany } = useCompany();
  const hrResources = selectedCompany.hrResources || [];

  // Assign items to categories (first matching category wins)
  const assigned = new Set();
  const sections = HR_CATEGORIES.map((cat) => {
    const items = hrResources.filter((item) => !assigned.has(item.id) && cat.filter(item));
    items.forEach((i) => assigned.add(i.id));
    return { ...cat, items };
  }).filter((s) => s.items.length > 0);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>HR Resources</h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>People resources, benefits, and support for {selectedCompany.name} employees.</p>
      </div>

      {/* Quick action bar */}
      <Card style={{ padding: '20px 24px', marginBottom: 28, background: `linear-gradient(135deg, ${selectedCompany.brandColor}12 0%, #fff 100%)` }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: '#000' }}>Need help? Contact HR</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {(selectedCompany.contacts || []).filter((c) => c.department === 'Human Resources' || c.department === 'HR').slice(0, 2).map((c) => (
            <div key={c.id} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e6e6e6', padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', flex: '1 1 200px' }}>
              <span style={{ fontSize: 24 }}>👤</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000' }}>{c.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#615d59' }}>{c.role}</div>
                <a href={`mailto:${c.email}`} style={{ fontSize: '0.75rem', color: '#0075de', textDecoration: 'none' }}>{c.email}</a>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.key} style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>{section.icon}</span>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#000' }}>{section.key}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {section.items.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Card hoverable style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28 }}>{item.icon}</span>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 3 }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#615d59' }}>{item.description}</div>
                    </div>
                    <span style={{ color: '#0075de', flexShrink: 0 }}>→</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      ))}

      {/* Policies teaser */}
      <Card style={{ padding: '20px 24px', background: '#f6f5f4' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: 4, color: '#000' }}>Looking for HR Policies?</h3>
            <p style={{ fontSize: '0.875rem', color: '#615d59', margin: 0 }}>View leave policy, WFH guidelines, anti-harassment policy and more.</p>
          </div>
          <a href="/policies" style={{ padding: '8px 20px', borderRadius: '9999px', background: '#0075de', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>View Policies →</a>
        </div>
      </Card>
    </div>
  );
}
