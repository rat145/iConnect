import React from 'react';

// Simple emoji icon wrapper for consistent sizing/styling
export default function Icon({ emoji, size = 20, style }) {
  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        fontSize: size,
        lineHeight: 1,
        display: 'inline-block',
        ...style,
      }}
    >
      {emoji}
    </span>
  );
}
