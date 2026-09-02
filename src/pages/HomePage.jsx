import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCompany } from '../context/CompanyContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function SectionHeader({ title, linkTo, linkLabel = 'View all' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#000' }}>{title}</h2>
      {linkTo && <Link to={linkTo} style={{ fontSize: '0.8125rem', color: '#0075de', fontWeight: 500, textDecoration: 'none' }}>{linkLabel} →</Link>}
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const { selectedCompany } = useCompany();

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  const quickLinks = (selectedCompany.quickLinks || []).slice(0, 6);
  const announcements = (selectedCompany.announcements || []).slice(0, 3);
  const news = (selectedCompany.news || []).slice(0, 3);
  const documents = (selectedCompany.documents || []).slice(0, 4);
  const hrResources = (selectedCompany.hrResources || []).slice(0, 3);
  const itLinks = (selectedCompany.itLinks || []).slice(0, 3);
  const events = (selectedCompany.events || []).slice(0, 6);
  const spotlight = (selectedCompany.directory || []).slice(0, 4);

  return (
    <div>
      {/* ── Hero Banner ── */}
      <div style={{
        background: `linear-gradient(135deg, ${selectedCompany.brandColor}18 0%, #fff 100%)`,
        border: '1px solid #e6e6e6',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#a39e98', marginBottom: 4 }}>{today}</p>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>
              {getGreeting()}, {firstName} 👋
            </h1>
            <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>
              Welcome to <strong style={{ color: selectedCompany.brandColor }}>{selectedCompany.name}</strong> — {selectedCompany.tagline}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e6e6e6', borderRadius: '12px', padding: '10px 16px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: selectedCompany.brandColor }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#31302e' }}>{selectedCompany.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader title="Quick Links" linkTo="/quick-links" />
        <div className="home-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {quickLinks.map((ql) => (
            <a key={ql.id} href={ql.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Card hoverable style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{ql.icon}</span>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ql.title}</div>
                  <Badge label={ql.category} />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* ── Announcements ── */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader title="Announcements" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {announcements.map((ann) => (
            <Card key={ann.id}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#000', flex: 1 }}>{ann.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <Badge label={ann.priority} />
                  <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>{formatDate(ann.date)}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#615d59', marginBottom: 6, lineHeight: 1.6 }}>{ann.body}</p>
              <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>— {ann.author}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* ── News ── */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader title="Company News" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {news.map((item) => (
            <Card key={item.id} hoverable>
              <Badge label={item.category} style={{ marginBottom: 10 }} />
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#000', marginBottom: 8, lineHeight: 1.4 }}>{item.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: '#615d59', lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>{item.author}</span>
                <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>{formatDate(item.date)}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Documents ── */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader title="Key Documents" linkTo="/documents" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {documents.map((doc) => (
            <Card key={doc.id} hoverable>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>📄</span>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.title}</div>
                  <p style={{ fontSize: '0.8125rem', color: '#615d59', marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{doc.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Badge label={doc.category} />
                    <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>{formatDate(doc.updatedAt)}</span>
                  </div>
                </div>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, color: '#0075de', fontSize: '0.8125rem', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>View →</a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── HR & IT ── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* HR */}
          <div>
            <SectionHeader title="HR Resources" linkTo="/hr" />
            <Card style={{ padding: '12px' }}>
              {hrResources.map((item, i) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px',
                    borderRadius: '8px', borderBottom: i < hrResources.length - 1 ? '1px solid #f0f0f0' : 'none',
                    transition: 'background 0.1s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f6f5f4'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#000' }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#a39e98' }}>{item.description}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: '#a39e98' }}>→</span>
                  </div>
                </a>
              ))}
            </Card>
          </div>
          {/* IT */}
          <div>
            <SectionHeader title="IT Support" linkTo="/it-support" />
            <Card style={{ padding: '12px' }}>
              {itLinks.map((item, i) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px',
                    borderRadius: '8px', borderBottom: i < itLinks.length - 1 ? '1px solid #f0f0f0' : 'none',
                    transition: 'background 0.1s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f6f5f4'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#000' }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#a39e98' }}>{item.description}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: '#a39e98' }}>→</span>
                  </div>
                </a>
              ))}
            </Card>
          </div>
        </div>
      </div>

      {/* ── Events ── */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader title="Upcoming Events" />
        <div className="home-grid-3"style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {events.map((ev) => {
            const d = new Date(ev.date);
            const dayNum = d.toLocaleDateString('en-IN', { day: '2-digit' });
            const monthName = d.toLocaleDateString('en-IN', { month: 'short' });
            return (
              <Card key={ev.id} style={{ padding: '16px', display: 'flex', gap: 14 }}>
                <div style={{
                  width: 48, height: 56, borderRadius: '10px', background: `${selectedCompany.brandColor}18`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: 800, color: selectedCompany.brandColor, lineHeight: 1 }}>{dayNum}</span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: selectedCompany.brandColor, textTransform: 'uppercase' }}>{monthName}</span>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#615d59', marginBottom: 2 }}>⏰ {ev.time}</div>
                  <div style={{ fontSize: '0.75rem', color: '#a39e98', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📍 {ev.location}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── Directory Spotlight ── */}
      <div style={{ marginBottom: 16 }}>
        <SectionHeader title="Directory Spotlight" linkTo="/directory" />
        <div className="home-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {spotlight.map((emp) => (
            <Card key={emp.id} hoverable style={{ padding: '20px 16px', textAlign: 'center' }}>
              <Avatar name={emp.name} picture={emp.avatar} size={48} style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#615d59', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.role}</div>
              <Badge label={emp.department} />
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .home-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
          .home-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .home-grid-2col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .home-grid-3 { grid-template-columns: 1fr !important; }
          .home-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
