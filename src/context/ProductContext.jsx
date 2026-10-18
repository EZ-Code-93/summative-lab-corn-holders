import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/corn-holders")
            .then(r => r.json())
            .then(setProducts)
            .catch(console.error);
    }, []);

    const addProduct = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    );
}