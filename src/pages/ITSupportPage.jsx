import React from 'react';
import { useCompany } from '../context/CompanyContext';
import Card from '../components/common/Card';

export default function ITSupportPage() {
  const { selectedCompany } = useCompany();
  const itLinks = selectedCompany.itLinks || [];

  const ticketLink = itLinks.find((l) => l.title.toLowerCase().includes('ticket')) || itLinks[0];
  const otherLinks = itLinks.filter((l) => l.id !== ticketLink?.id);

  const itContacts = (selectedCompany.contacts || []).filter(
    (c) => c.department === 'IT' || c.department === 'Information Technology'
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>IT Support</h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>Get technical help, access self-service resources, and reach the IT team.</p>
      </div>

      {/* Raise a Ticket CTA */}
      <Card style={{ padding: '28px 32px', marginBottom: 28, background: `linear-gradient(135deg, #0075de12 0%, #fff 100%)`, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎫</div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#000', marginBottom: 8, letterSpacing: '-0.02em' }}>Raise a Support Ticket</h2>
        <p style={{ color: '#615d59', fontSize: '0.9375rem', marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
          Having a technical issue? Log it with our helpdesk and we'll get back to you as soon as possible.
        </p>
        {ticketLink && (
          <a
            href={ticketLink.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '11px 32px',
              borderRadius: '9999px',
              background: '#0075de',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9375rem',
              textDecoration: 'none',
            }}
          >
            Open IT Helpdesk →
          </a>
        )}
      </Card>

      {/* Self-Service Resources */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: 14, letterSpacing: '-0.01em' }}>Self-Service Resources</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
          {otherLinks.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Card hoverable style={{ padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#615d59', lineHeight: 1.5 }}>{item.description}</div>
                  </div>
                  <span style={{ color: '#0075de', flexShrink: 0 }}>↗</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* IT Contacts */}
      {itContacts.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: 14, letterSpacing: '-0.01em' }}>IT Helpdesk Contacts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {itContacts.map((c) => (
              <Card key={c.id} style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>💻</div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#615d59', marginBottom: 4 }}>{c.role}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <a href={`mailto:${c.email}`} style={{ fontSize: '0.75rem', color: '#0075de', textDecoration: 'none' }}>✉️ {c.email}</a>
                      <a href={`tel:${c.phone}`} style={{ fontSize: '0.75rem', color: '#615d59', textDecoration: 'none' }}>📞 {c.phone}</a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <Card style={{ background: '#f6f5f4', padding: '20px 24px' }}>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#000', marginBottom: 12 }}>💡 Before You Raise a Ticket</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
          {['Restart your device and try again.', 'Check the IT Knowledge Base for a quick fix.', 'Ensure your software is up to date.', 'For urgent issues affecting production, call the helpdesk directly.'].map((tip, i) => (
            <li key={i} style={{ fontSize: '0.875rem', color: '#615d59', display: 'flex', gap: 8 }}>
              <span style={{ color: '#0075de', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {tip}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
