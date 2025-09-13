import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products({ user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updateStock = async (id, newStock) => {
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, {
        stock_quantity: newStock
      });
      fetchProducts();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  if (user.role === 'user') {
    return <div>Access denied. Manager or Admin role required.</div>;
  }

  return (
    <div>
      <h1>Product Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Stock</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{product.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{product.category_name}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>${product.price}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{product.stock_quantity}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <input
                  type="number"
                  defaultValue={product.stock_quantity}
                  onBlur={(e) => updateStock(product.id, e.target.value)}
                  style={{ width: '60px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;