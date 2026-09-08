import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { AlertTriangle, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnsoldStock = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts({ unsoldOnly: 'true' }).then(res => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Unsold Stock Risk Monitor</h1>
          <p className="page-subtitle">Identify slow-selling farm inventory before perishability impacts profits</p>
        </div>
      </div>

      <div className="alert-banner">
        <div className="alert-title">
          <AlertTriangle size={20} />
          High Stock Alerts Detected ({products.length} Products)
        </div>
        <span style={{ fontSize: '13px' }}>SmartReach rules active to suggest commercial buyers</span>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Farmer Name</th>
                <th>Location</th>
                <th>Total Stock</th>
                <th>Remaining</th>
                <th>Price</th>
                <th>SmartReach Intervention</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod.id}>
                  <td style={{ fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#dc2626' }}>⚠️</span>
                      {prod.name}
                    </div>
                  </td>
                  <td>{prod.farmerName}</td>
                  <td>{prod.location}</td>
                  <td>{prod.totalStock} {prod.unit}</td>
                  <td style={{ fontWeight: 800, color: '#dc2626' }}>{prod.remaining} {prod.unit}</td>
                  <td>₹{prod.price}/{prod.unit}</td>
                  <td>
                    <button
                      onClick={() => navigate('/farmer/smart-reach')}
                      className="btn btn-primary"
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      <Share2 size={14} /> Trigger SmartReach
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UnsoldStock;
