import React from 'react';

const presets = {
  High:        { background: '#fde8e8', color: '#c0392b' },
  Medium:      { background: '#fef3e2', color: '#dd5b00' },
  Low:         { background: '#e8f5e9', color: '#1aae39' },
  HR:          { background: '#e8f0fe', color: '#213183' },
  IT:          { background: '#e3f2fd', color: '#0075de' },
  Finance:     { background: '#fff8e1', color: '#dd5b00' },
  General:     { background: '#f3e8fd', color: '#7b2d8b' },
  Training:    { background: '#e8f5e9', color: '#2a9d99' },
  Compliance:  { background: '#fce4ec', color: '#c2185b' },
  Marketing:   { background: '#f3e8fd', color: '#9c27b0' },
  Analytics:   { background: '#e3f2fd', color: '#0075de' },
  Content:     { background: '#fff3e0', color: '#e65100' },
  Design:      { background: '#f3e8fd', color: '#7b2d8b' },
  Operations:  { background: '#e8f5e9', color: '#2a9d99' },
  Clinical:    { background: '#e0f2f1', color: '#2a9d99' },
  Research:    { background: '#e8eaf6', color: '#3949ab' },
  Brand:       { background: '#fce4ec', color: '#c2185b' },
  Awards:      { background: '#fff8e1', color: '#f9a825' },
  Business:    { background: '#e3f2fd', color: '#0075de' },
  Events:      { background: '#f3e8fd', color: '#9c27b0' },
  Sustainability: { background: '#e8f5e9', color: '#1aae39' },
  Learning:    { background: '#e0f2f1', color: '#2a9d99' },
  Innovation:  { background: '#ede7f6', color: '#6a1b9a' },
  People:      { background: '#fce4ec', color: '#c2185b' },
  CSR:         { background: '#e8f5e9', color: '#1aae39' },
  Facilities:  { background: '#f5f5f5', color: '#616161' },
  Investment:  { background: '#fff8e1', color: '#dd5b00' },
  Legal:       { background: '#e8eaf6', color: '#283593' },
  Reporting:   { background: '#e3f2fd', color: '#0277bd' },
  Fund:        { background: '#fff8e1', color: '#dd5b00' },
  Portfolio:   { background: '#e8f5e9', color: '#2e7d32' },
  Recognition: { background: '#fff8e1', color: '#f9a825' },
  ESG:         { background: '#e8f5e9', color: '#1aae39' },
  Network:     { background: '#f3e8fd', color: '#6a1b9a' },
};

export default function Badge({ label, color, background, style }) {
  const preset = presets[label] || { background: '#f5f5f5', color: '#616161' };
  const bg = background || preset.background;
  const fg = color || preset.color;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        background: bg,
        color: fg,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {label}
    </span>
  );
}
