import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { Package, PlusCircle, Share2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyProducts = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const farmerId = currentUser ? currentUser.id : "usr_farmer1";
    getProducts({ farmerId }).then(res => setProducts(res.data)).catch(console.error);
  }, [currentUser]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Published Products</h1>
          <p className="page-subtitle">Manage catalog listings & inventory ratios</p>
        </div>
        <button onClick={() => navigate('/farmer/add-product')} className="btn btn-primary">
          <PlusCircle size={18} /> Add Product
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {products.map(product => {
          const isHighUnsold = product.remaining >= 100 || (product.remaining / product.totalStock) >= 0.3;
          return (
            <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                {isHighUnsold && (
                  <span className="badge badge-danger" style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={12} /> HIGH UNSOLD STOCK
                  </span>
                )}
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{product.name}</h3>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#166534' }}>₹{product.price}/{product.unit}</span>
                </div>

                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                  📍 {product.location} • Harvested: {product.harvestDate}
                </div>

                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Total Stock:</span> <strong>{product.totalStock} {product.unit}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Sold:</span> <span style={{ color: '#16a34a', fontWeight: 700 }}>{product.sold} {product.unit}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Remaining:</span> <span style={{ color: isHighUnsold ? '#dc2626' : '#0f172a', fontWeight: 700 }}>{product.remaining} {product.unit}</span>
                  </div>
                </div>

                {isHighUnsold && (
                  <button onClick={() => navigate('/farmer/smart-reach')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', color: '#dc2626', borderColor: '#fecaca' }}>
                    <Share2 size={16} /> Reach Buyers via SmartReach
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyProducts;
