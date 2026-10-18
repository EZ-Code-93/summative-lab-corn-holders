import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext'; 

const ShopContainer = () => {
    
    const { products } = useContext(ProductContext);
   
    const [searchQuery, setSearchQuery] = useState("");

   
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <NavBar />
            <main style={{ padding: '20px' }}>
                <h1>Welcome to the Shop!</h1>
                
                
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Search corn holders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '10px 16px',
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>

                
                <Outlet context={{ filteredProducts }} />
            </main>
        </>
    );
}

export default ShopContainer;


