import React, { useEffect, useState } from 'react';
import { getProducts, createOrder } from '../../services/api';
import { Store, ShoppingCart, MapPin } from 'lucide-react';

const BrowseProducts = ({ currentUser }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Browse All Direct Produce</h1>
          <p className="page-subtitle">Farm-fresh crops directly from local farms</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {products.map(prod => (
          <div key={prod.id} className="card" style={{ padding: '16px' }}>
            <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{prod.name}</h3>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Farmer: {prod.farmerName} • 📍 {prod.location}</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#166534', margin: '8px 0' }}>₹{prod.price} / {prod.unit}</div>
            <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px' }}>Available: {prod.remaining} {prod.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseProducts;
