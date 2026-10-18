import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CornCard from './CornCard';

function ProductList() {
  
  const { filteredProducts } = useOutletContext();

 
  if (filteredProducts.length === 0) {
    return <p style={{ color: '#64748b' }}>No corn holders match your search parameters.</p>;
  }

  return (
    <div>
      <h2>Available Corn Holders</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredProducts.map((holder) => (
          <CornCard key={holder.id} holder={holder} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;

