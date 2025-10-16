import React from 'react';

const BlueCircle = ({ top = 'auto', left = 'auto', right = 'auto', bottom = 'auto' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 0, // ✅ keep it behind all interactive content
        top,
        left,
        right,
        bottom,
        width: '14.5rem',
        height: '14.5rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(52, 144, 220, 0.3)', 
        filter: 'blur(48px)',
        pointerEvents: 'none', 
      }}
    ></div>
  );
};

export default BlueCircle;
