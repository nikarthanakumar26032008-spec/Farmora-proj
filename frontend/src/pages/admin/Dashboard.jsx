import React, { useEffect, useState } from 'react';
import { getFarmers, getProducts, getOrders, updateFarmerStatus } from '../../services/api';
import { Users, UserCheck, ShoppingBag, Package, AlertTriangle, Check, X, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchData = async () => {
    try {
      const [fRes, pRes, oRes] = await Promise.all([
        getFarmers(),
        getProducts(),
        getOrders()
      ]);
      setFarmers(fRes.data);
      setProducts(pRes.data);
      setOrders(oRes.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    await updateFarmerStatus(id, 'approved');
    fetchData();
  };

  const handleReject = async (id) => {
    await updateFarmerStatus(id, 'rejected');
    fetchData();
  };

  const pendingFarmers = farmers.filter(f => f.status === 'pending');
  const approvedFarmers = farmers.filter(f => f.status === 'approved');
  const unsoldStockAlerts = products.filter(p => p.remaining >= 100 || (p.remaining / p.totalStock) >= 0.3);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Command Dashboard</h1>
          <p className="page-subtitle">Real-time marketplace monitoring, farmer verifications & stock controls</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid-cards">
        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="metric-val">{farmers.length}</div>
            <div className="metric-label">Total Farmers</div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <UserCheck size={24} />
          </div>
          <div>
            <div className="metric-val">{pendingFarmers.length}</div>
            <div className="metric-label">Pending Verifications</div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#f0fdf4', color: '#166534' }}>
            <Package size={24} />
          </div>
          <div>
            <div className="metric-val">{products.length}</div>
            <div className="metric-label">Total Products</div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div className="metric-val">{orders.length}</div>
            <div className="metric-label">Total Orders</div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="metric-val">{unsoldStockAlerts.length}</div>
            <div className="metric-label">Unsold Stock Alerts</div>
          </div>
        </div>
      </div>

      {/* Farmer Verification Section */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Farmer Verification Queue</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Review land documents & photos before marketplace approval</p>
          </div>
          <span className="badge badge-warning">{pendingFarmers.length} Pending Approval</span>
        </div>

        {pendingFarmers.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
            🎉 No pending farmer verification requests. All farmers are verified!
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Farmer Name</th>
                  <th>Location</th>
                  <th>Land Area</th>
                  <th>Crops Grown</th>
                  <th>Land Photos</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingFarmers.map(farmer => (
                  <tr key={farmer.id}>
                    <td style={{ fontWeight: 700 }}>{farmer.name}</td>
                    <td>{farmer.location}</td>
                    <td>{farmer.landArea}</td>
                    <td>{Array.isArray(farmer.cropTypes) ? farmer.cropTypes.join(', ') : farmer.cropTypes}</td>
                    <td>
                      {farmer.photos && farmer.photos.length > 0 ? (
                        <button
                          onClick={() => setSelectedPhoto(farmer.photos[0])}
                          className="btn btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '12px' }}
                        >
                          <Eye size={14} /> View Photos
                        </button>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>No photos</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleApprove(farmer.id)}
                          className="btn btn-success"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          <Check size={14} /> APPROVE
                        </button>
                        <button
                          onClick={() => handleReject(farmer.id)}
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          <X size={14} /> REJECT
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Image View Modal */}
      {selectedPhoto && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', maxWidth: '600px', width: '90%' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Verified Farm & Land Photo</h4>
            <img src={selectedPhoto} alt="Land Photo" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button onClick={() => setSelectedPhoto(null)} className="btn btn-secondary">Close Window</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
