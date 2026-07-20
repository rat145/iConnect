import React from 'react';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function stringToColor(str) {
  const colors = [
    '#0075de', '#213183', '#2a9d99', '#dd5b00', '#9c27b0',
    '#c2185b', '#1aae39', '#f9a825', '#0277bd', '#6a1b9a',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({ name, picture, size = 36, style }) {
  const bg = stringToColor(name || '?');

  if (picture) {
    return (
      <img
        src={picture}
        alt={name || 'User'}
        referrerPolicy="no-referrer"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
          flexShrink: 0,
          ...style,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 700,
        flexShrink: 0,
        userSelect: 'none',
        ...style,
      }}
      aria-label={name || 'User avatar'}
    >
      {getInitials(name)}
    </div>
  );
}
