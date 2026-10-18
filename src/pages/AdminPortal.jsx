import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import AdminForm from './AdminForm';
import Navbar from '../components/NavBar';

function AdminPortal() {
  const { products } = useContext(ProductContext);
  
  
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleEditClick(product) {
    setEditingProduct(product);
    setIsFormOpen(true); 
  }

  function handleAddNewClick() {
    setEditingProduct(null); 
    setIsFormOpen(true);
  }

  function handleClearSelection() {
    setEditingProduct(null);
    setIsFormOpen(false);
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
        <h1>Welcome, System Administrator 🛠️</h1>
        <p style={{ color: '#64748b' }}>Manage your storefront inventory data seamlessly.</p>
        
        <button 
          onClick={handleAddNewClick}
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            marginTop: '12px'
          }}
        >
          + Add New Store Product
        </button>
      </header>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>Current Shop Inventory ({products.length} items)</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {products.map((product) => (
              <li 
                key={product.id} 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: editingProduct?.id === product.id ? '#f1f5f9' : 'transparent'
                }}
              >
                <div>
                  <strong style={{ display: 'block' }}>{product.name}</strong>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>${product.price.toFixed(2)}</span>
                </div>
                
               
                <button
                  onClick={() => handleEditClick(product)}
                  style={{
                    backgroundColor: '#e2e8f0',
                    color: '#1e293b',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Click to Edit ✏️
                </button>
              </li>
            ))}
          </ul>
        </div>
    

        
        {isFormOpen && (
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0 }}>Form Control Panel</h3>
              <button 
                onClick={handleClearSelection}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cancel / Close ❌
              </button>
            </div>
            
           
            <AdminForm 
              key={editingProduct ? editingProduct.id : 'new-product'} 
              existingProduct={editingProduct} 
              onClearSelection={handleClearSelection}
            />
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default AdminPortal;

