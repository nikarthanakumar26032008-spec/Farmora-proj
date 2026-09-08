import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { Package, Store } from 'lucide-react';

const CropsCatalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Global Crops & Inventory Catalog</h1>
          <p className="page-subtitle">Master overview of active produce listed across all verified farms</p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Crop / Produce</th>
                <th>Category</th>
                <th>Farmer Name</th>
                <th>Location</th>
                <th>Total Stock</th>
                <th>Sold</th>
                <th>Remaining</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod.id}>
                  <td style={{ fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={prod.image} alt={prod.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                      {prod.name}
                    </div>
                  </td>
                  <td>{prod.category}</td>
                  <td>{prod.farmerName}</td>
                  <td>{prod.location}</td>
                  <td>{prod.totalStock} {prod.unit}</td>
                  <td style={{ color: '#16a34a', fontWeight: 600 }}>{prod.sold} {prod.unit}</td>
                  <td style={{ fontWeight: 700 }}>{prod.remaining} {prod.unit}</td>
                  <td style={{ fontWeight: 800, color: '#166534' }}>₹{prod.price} / {prod.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CropsCatalog;
