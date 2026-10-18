import React, { useEffect, useState, useContext, useId } from 'react';
import { ProductContext } from '../context/ProductContext';

function AdminForm({ existingProduct = null, onClearSelection }) {
  const { addProduct, updateProduct } = useContext(ProductContext);
  
 
  const isEditing = !!existingProduct;

  
  const [name, setName] = useState(existingProduct ? existingProduct.name : "");
  const [img, setImg] = useState(existingProduct ? existingProduct.img : "");
  const [price, setPrice] = useState(existingProduct ? existingProduct.price : "");

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setImg(existingProduct.img);
      setPrice(existingProduct.price);
    } else {
      setName("");
      setImg("");
      setPrice("");
    }
  }, [existingProduct]);

  
  const nameId = useId();
  const imgId = useId();
  const priceId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !img.trim() || !price) return;

    const payload = {
      name,
      img,
      price: parseFloat(price)
    };

    if (isEditing) {
      
      fetch(`http://localhost:4000/corn-holders/${existingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(r => r.json())
      .then(updatedItem => {
        updateProduct(updatedItem); // Sync global context state
        if (onClearSelection) onClearSelection(); // Reset parent selection state
      });
    } else {
     
      fetch("http://localhost:4000/corn-holders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(r => r.json())
      .then(newItem => {
        addProduct(newItem); 
        setName("");
        setImg("");
        setPrice("");
      });
    }
  }

  return (
      <div style={{
      maxWidth: '450px',
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: '#f8fafc'
    }}>
    
      <h3 style={{ marginTop: 0 }}>{isEditing ? "✏️ Edit Product Details" : "🆕 Register New Product"}</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor={nameId} style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Item Name:</label>
          <input
            id={nameId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Flamingo Corn Holder"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #94a3b8' }}
          />
        </div>

        <div>
          <label htmlFor={imgId} style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Image Asset Path:</label>
          <input
            id={imgId}
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="images/filename.jpeg"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #94a3b8' }}
          />
        </div>

        <div>
          <label htmlFor={priceId} style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Unit Price (\$):</label>
          <input
            id={priceId}
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #94a3b8' }}
          />
        </div>

        <button type="submit" style={{
          backgroundColor: isEditing ? '#059669' : '#2563eb',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          marginTop: '8px'
        }}>
          {isEditing ? "Save Inventory Changes" : "Publish to Shop Catalog"}
        </button>
      </form>
    </div>
  );
}

export default AdminForm;
