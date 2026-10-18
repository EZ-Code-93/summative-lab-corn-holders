import React from 'react';

function CornCard({ holder }) {
  const { name, img, price } = holder;

  return (
    <div style={{
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      padding: '16px',
      width: '220px',
      textAlign: 'center',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }}>
      <img 
        src={`/${img}`} 
        alt={name} 
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
      />
      <h3 style={{ fontSize: '1.1rem', margin: '12px 0 6px 0', color: '#b0b2b5' }}>{name}</h3>
      <p style={{ fontWeight: 'bold', color: '#b0b2b5', margin: '0 0 12px 0' }}>${price.toFixed(2)}</p>
      
    </div>
  );
}

export default CornCard;
