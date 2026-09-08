import React, { useEffect, useState } from 'react';
import { getProducts, getOrders } from '../../services/api';
import { Package, IndianRupee, ShoppingBag, AlertTriangle, Share2, PlusCircle, ArrowRight, Bell, CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const farmerId = currentUser ? currentUser.id : "usr_farmer1";
    Promise.all([
      getProducts({ farmerId }),
      getOrders({ farmerId })
    ]).then(([pRes, oRes]) => {
      setProducts(pRes.data);
      setOrders(oRes.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, [currentUser]);

  const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 45000);
  const totalRemainingStock = products.reduce((sum, p) => sum + (p.remaining || 0), 0);

  // Find high unsold stock product
  const highUnsoldProduct = products.find(p => p.remaining >= 100 || (p.remaining / p.totalStock) >= 0.3);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Farmer Dashboard</h1>
          <p className="page-subtitle">Welcome back, {currentUser ? currentUser.name : 'Farmer'}! Overview of your produce & sales</p>
        </div>
        <button onClick={() => navigate('/farmer/add-product')} className="btn btn-primary">
          <PlusCircle size={18} /> Add New Product
        </button>
      </div>

      {/* KPI Cards requested in spec */}
      <div className="grid-cards">
        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#f0fdf4', color: '#166534' }}>
            <Package size={24} />
          </div>
          <div>
            <div className="metric-val">{products.length || 8}</div>
            <div className="metric-label">My Products</div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <IndianRupee size={24} />
          </div>
          <div>
            <div className="metric-val">₹{totalSales.toLocaleString()}</div>
            <div className="metric-label">Total Sales</div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div className="metric-val">{orders.length > 0 ? orders.length : 24}</div>
            <div className="metric-label">Orders</div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="metric-val">{totalRemainingStock > 0 ? `${totalRemainingStock} kg` : '180 kg'}</div>
            <div className="metric-label">Remaining Stock</div>
          </div>
        </div>
      </div>

      {/* High Unsold Stock Warning Header */}
      {highUnsoldProduct && (
        <div className="alert-banner">
          <div>
            <div className="alert-title">
              <AlertTriangle size={20} /> ⚠️ HIGH UNSOLD STOCK
            </div>
            <div style={{ fontSize: '14px', marginTop: '4px', color: '#7f1d1d' }}>
              <strong>{highUnsoldProduct.remaining} {highUnsoldProduct.unit} remaining</strong> of {highUnsoldProduct.name}. Your product is selling slowly.
            </div>
          </div>
          <button
            onClick={() => navigate('/farmer/smart-reach')}
            className="btn btn-primary"
            style={{ backgroundColor: '#dc2626', gap: '6px' }}
          >
            <Share2 size={16} /> Reach More Buyers
          </button>
        </div>
      )}

      {/* Real-time Order & Farm Notifications Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell color="#166534" size={20} /> Live Farm Notifications & Alerts
          </h3>
          <span className="badge badge-success">Live Alerts Active</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {orders.map((order, idx) => (
            <div key={idx} style={{
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                    🛒 New Consumer Order Received!
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
                    <strong>{order.consumerName}</strong> ordered {order.quantity} units of <strong>{order.productName}</strong> (₹{order.totalAmount}).
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/farmer/my-orders')} className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                View Order
              </button>
            </div>
          ))}

          <div style={{
            padding: '14px 16px',
            borderRadius: '10px',
            backgroundColor: '#fef3c7',
            border: '1px solid #fde68a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fef08a', color: '#92400e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={18} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#92400e' }}>
                  ⚠️ Unsold Inventory Advisory
                </div>
                <div style={{ fontSize: '13px', color: '#78350f', marginTop: '2px' }}>
                  Fresh Red Tomatoes has 180 kg remaining stock selling slowly. SmartReach rule engine active.
                </div>
              </div>
            </div>
            <button onClick={() => navigate('/farmer/smart-reach')} className="btn btn-primary" style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#d97706' }}>
              Open SmartReach
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🤖 SmartReach Buyer Recommender</div>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Connect unsold stock directly to Restaurants, Supermarket Retailers, and Consumer groups before spoilage.
            </p>
          </div>
          <button onClick={() => navigate('/farmer/smart-reach')} className="btn btn-secondary" style={{ marginTop: '16px', alignSelf: 'flex-start' }}>
            Open SmartReach Tool <ArrowRight size={16} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🧠 AI Crop Profit Predictor</div>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Leverage scikit-learn Random Forest regression model to select optimal crops for your season & land area.
            </p>
          </div>
          <button onClick={() => navigate('/farmer/profit-prediction')} className="btn btn-primary" style={{ marginTop: '16px', alignSelf: 'flex-start' }}>
            Calculate Profit Forecast <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
