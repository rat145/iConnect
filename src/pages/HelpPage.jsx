import React, { useState } from 'react';
import Card from '../components/common/Card';

const FAQS = [
  {
    category: 'Account & Access',
    items: [
      { q: 'How do I reset my corporate password?', a: 'Visit the IT Helpdesk portal and click "Password Reset". You can also call the IT helpdesk directly during business hours.' },
      { q: 'I can\'t sign in to iConnect. What should I do?', a: 'Ensure you are using your company Google account. If you still face issues, clear your browser cache or try an incognito window. Contact IT support if the problem persists.' },
      { q: 'How do I request access to a new application?', a: 'Submit a Software Request via the IT Helpdesk portal, specifying the application name and the business justification.' },
    ],
  },
  {
    category: 'HR & Leave',
    items: [
      { q: 'How do I apply for leave?', a: 'Log in to the Employee Self-Service portal and navigate to Leave Management. Select the leave type, dates, and submit for manager approval.' },
      { q: 'When will my payslip be available?', a: 'Payslips are typically available by the 5th of each month. Log in to the HR portal and navigate to Payroll & Payslips to download yours.' },
      { q: 'How do I enrol or update my health insurance?', a: 'Visit the Benefits Portal during the open enrollment period or contact HR for mid-year changes due to life events (e.g., marriage, childbirth).' },
    ],
  },
  {
    category: 'iConnect Portal',
    items: [
      { q: 'How do I switch between companies?', a: 'Use the Company Switcher in the top navigation bar. Select the company you want to view. Note that access is restricted to your authorised email domain.' },
      { q: 'Can I access iConnect on mobile?', a: 'Yes. iConnect is fully responsive and works on all modern mobile browsers. Bookmark it on your home screen for quick access.' },
      { q: 'The page is not loading correctly. What should I do?', a: 'Try refreshing the page or clearing your browser cache. If the issue persists, contact IT support with a screenshot of the error.' },
    ],
  },
  {
    category: 'Policies & Documents',
    items: [
      { q: 'Where can I find the company leave policy?', a: 'Navigate to Policies in the top menu and search for "Leave Policy". You can also find it under the HR Resources section.' },
      { q: 'How do I report a compliance concern?', a: 'Refer to the Whistleblower Policy on the Policies page for anonymous reporting options, or contact the Legal/Compliance team directly.' },
    ],
  },
];

const GUIDES = [
  { icon: '🔐', title: 'Setting Up VPN', description: 'Step-by-step guide to configure remote access.', url: '#' },
  { icon: '📧', title: 'Email & Calendar Setup', description: 'Configure corporate email on your devices.', url: '#' },
  { icon: '📱', title: 'Mobile Device Management', description: 'Enrol your phone for corporate access.', url: '#' },
  { icon: '💻', title: 'New Employee IT Checklist', description: 'Everything you need on your first day.', url: '#' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          gap: 12,
        }}
      >
        <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#000' }}>{q}</span>
        <span style={{ fontSize: 18, color: '#a39e98', flexShrink: 0, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 14, paddingRight: 24 }}>
          <p style={{ fontSize: '0.875rem', color: '#615d59', lineHeight: 1.6, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>Help & Support</h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>Answers to common questions and ways to get in touch.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        {/* Left: FAQ + Guides */}
        <div>
          {/* FAQ Sections */}
          {FAQS.map((section) => (
            <div key={section.category} style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: 4, letterSpacing: '-0.01em' }}>{section.category}</h2>
              <Card style={{ padding: '0 20px' }}>
                {section.items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </Card>
            </div>
          ))}

          {/* Useful Guides */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: 14, letterSpacing: '-0.01em' }}>Useful Guides</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {GUIDES.map((guide) => (
                <a key={guide.title} href={guide.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Card style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 26 }}>{guide.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#000', marginBottom: 2 }}>{guide.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#615d59' }}>{guide.description}</div>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <Card style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: 4, letterSpacing: '-0.01em' }}>Contact Support</h2>
            <p style={{ fontSize: '0.8125rem', color: '#a39e98', marginBottom: 20 }}>Can't find what you need? Send us a message.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#31302e', marginBottom: 5 }}>Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#0075de'}
                  onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#31302e', marginBottom: 5 }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.smith@acme.com"
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#0075de'}
                  onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#31302e', marginBottom: 5 }}>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question…"
                  rows={4}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#0075de'}
                  onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
                />
              </div>
              <button
                type="button"
                style={{ padding: '10px', borderRadius: '9999px', background: '#0075de', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer' }}
                onClick={() => alert('Thank you! Your message has been noted. (This form is static in demo mode.)')}
              >
                Send Message
              </button>
            </div>
          </Card>

          {/* Emergency contacts */}
          <Card style={{ marginTop: 16, padding: '16px 20px', background: '#fde8e8', border: '1px solid #f5c0c0' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#c0392b', marginBottom: 8 }}>🚨 Urgent IT Issues?</h3>
            <p style={{ fontSize: '0.8125rem', color: '#615d59', margin: 0 }}>
              For production-impacting or security incidents, call the IT emergency line immediately: <strong>1800-ACME-IT</strong>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
