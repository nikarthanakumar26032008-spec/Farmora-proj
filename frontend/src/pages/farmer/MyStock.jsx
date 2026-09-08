import React, { useEffect, useState } from 'react';
import { getProducts, updateProduct } from '../../services/api';
import { Store, Edit, AlertTriangle } from 'lucide-react';

const MyStock = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newStock, setNewStock] = useState('');

  const fetchStock = () => {
    const farmerId = currentUser ? currentUser.id : "usr_farmer1";
    getProducts({ farmerId }).then(res => setProducts(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchStock();
  }, [currentUser]);

  const handleUpdate = async (id) => {
    await updateProduct(id, { totalStock: Number(newStock) });
    setEditingId(null);
    fetchStock();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Stock & Inventory Control</h1>
          <p className="page-subtitle">Detailed breakdown of total harvest stock, sold units, and remaining volume</p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Total Harvest Stock</th>
                <th>Quantity Sold</th>
                <th>Remaining Inventory</th>
                <th>Price per Unit</th>
                <th>Stock Alert Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => {
                const isHighUnsold = prod.remaining >= 100 || (prod.remaining / prod.totalStock) >= 0.3;
                return (
                  <tr key={prod.id}>
                    <td style={{ fontWeight: 700 }}>{prod.name}</td>
                    <td>{prod.category}</td>
                    <td>
                      {editingId === prod.id ? (
                        <input
                          type="number"
                          className="form-input"
                          style={{ width: '80px', padding: '4px' }}
                          value={newStock}
                          onChange={e => setNewStock(e.target.value)}
                        />
                      ) : (
                        `${prod.totalStock} ${prod.unit}`
                      )}
                    </td>
                    <td style={{ color: '#16a34a', fontWeight: 600 }}>{prod.sold} {prod.unit}</td>
                    <td style={{ fontWeight: 800, color: isHighUnsold ? '#dc2626' : '#0f172a' }}>
                      {prod.remaining} {prod.unit}
                    </td>
                    <td>₹{prod.price}/{prod.unit}</td>
                    <td>
                      {isHighUnsold ? (
                        <span className="badge badge-danger">⚠️ HIGH UNSOLD STOCK</span>
                      ) : (
                        <span className="badge badge-success">Optimal</span>
                      )}
                    </td>
                    <td>
                      {editingId === prod.id ? (
                        <button onClick={() => handleUpdate(prod.id)} className="btn btn-success" style={{ padding: '4px 10px', fontSize: '12px' }}>
                          Save
                        </button>
                      ) : (
                        <button onClick={() => { setEditingId(prod.id); setNewStock(prod.totalStock); }} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                          <Edit size={14} /> Update Stock
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyStock;
