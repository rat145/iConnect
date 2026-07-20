import React from 'react';

const cardStyle = {
  background: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e6e6e6',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
};

export default function Card({ children, style, onClick, hoverable }) {
  const hoverableStyle = hoverable
    ? { cursor: 'pointer', transition: 'box-shadow 0.15s ease, transform 0.15s ease' }
    : {};

  const handleMouseEnter = (e) => {
    if (hoverable) {
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';
      e.currentTarget.style.transform = 'translateY(-1px)';
    }
  };
  const handleMouseLeave = (e) => {
    if (hoverable) {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  return (
    <div
      style={{ ...cardStyle, ...hoverableStyle, ...style }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
