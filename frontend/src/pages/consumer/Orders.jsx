import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/api';
import { ShoppingBag, Truck, CheckCircle2, Clock, MapPin, Store, Sparkles, Navigation } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ConsumerOrders = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('tracking');

  useEffect(() => {
    const consumerId = currentUser ? currentUser.id : "usr_consumer1";
    getOrders({ consumerId }).then(res => setOrders(res.data)).catch(console.error);
  }, [currentUser]);

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">📦 Order Tracking & Logistics</h1>
          <p className="page-subtitle">Real-time status of multi-farm AI routed deliveries</p>
        </div>
      </div>

      {location.state?.orderSuccess && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
          <CheckCircle2 size={24} />
          <div>
            🎉 Order #{location.state.newOrderId || 'FG1028'} placed successfully!
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#14532d', marginTop: '2px' }}>
              AI has optimized the collection route across 3 nearby farms.
            </div>
          </div>
        </div>
      )}

      {/* Main Order Tracking Card requested in prompt */}
      <div className="card" style={{ marginBottom: '28px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Shipment</span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#166534', marginTop: '2px' }}>ORDER #FG1028</h2>
          </div>
          <span className="badge badge-warning" style={{ fontSize: '13px', padding: '6px 14px', fontWeight: 800 }}>
            🚚 In Transit (10 AM – 1 PM)
          </span>
        </div>

        {/* 4-Step Vertical Tracker Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative', paddingLeft: '20px', marginBottom: '32px' }}>

          {/* Timeline Connector Line */}
          <div style={{
            position: 'absolute',
            left: '35px',
            top: '20px',
            bottom: '20px',
            width: '3px',
            backgroundColor: '#166534',
            zIndex: 1
          }}></div>

          {/* Step 1: Farm */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '24px', zIndex: 2 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#166534', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
              ✓
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>👨🌾 Farm</div>
              <div style={{ fontSize: '13px', color: '#166534', fontWeight: 700, marginTop: '2px' }}>✓ Order received</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Products harvested & packed at Ravi Kumar Farm, Suresh Patel Farm & Green Valley Agro</div>
            </div>
          </div>

          {/* Step 2: Collection Hub */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '24px', zIndex: 2 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#166534', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
              ✓
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>📦 Collection Hub</div>
              <div style={{ fontSize: '13px', color: '#166534', fontWeight: 700, marginTop: '2px' }}>✓ Products collected</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Aggregated at Coimbatore Central Hub (Distance Optimized: 18%)</div>
            </div>
          </div>

          {/* Step 3: In Transit */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '24px', zIndex: 2 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
              🚚
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0284c7' }}>🚚 In Transit</div>
              <div style={{ fontSize: '13px', color: '#0369a1', fontWeight: 700, marginTop: '2px' }}>
                ●─────────────────────────○ <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>Driver: Selvam (TN-37-AG-8821)</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Vehicle is en route to RS Puram residence</div>
            </div>
          </div>

          {/* Step 4: Delivered */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', zIndex: 2 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
              🏠
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#64748b' }}>🏠 Delivered</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Expected Tomorrow • 10 AM – 1 PM</div>
            </div>
          </div>
        </div>

        {/* AI Route Map Visualization requested in prompt */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '14px',
          padding: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={18} color="#0284c7" /> AI Multi-Farm Route Map Visualizer
          </h4>

          {/* Visual SVG Map Diagram */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #cbd5e1',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <div style={{ color: '#166534', fontWeight: 700 }}>Farm A (Ravi Kumar - Tomatoes) ─────┐</div>
            <div style={{ color: '#166534', fontWeight: 700 }}>Farm B (Suresh Patel - Groundnut) ──┼── 🚚 (AI Optimized Route) ──&gt; 🏠 Your Home (RS Puram)</div>
            <div style={{ color: '#166534', fontWeight: 700 }}>Farm C (Green Valley - Watermelon) ──┘</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '13px' }}>
            <span style={{ color: '#64748b' }}>📍 Route Distance: <strong>14.2 km total</strong></span>
            <span className="badge badge-success" style={{ padding: '4px 10px' }}>
              🌱 Single Eco-Batch Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Historical Orders Table */}
      <div className="card">
        <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Order History</h4>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Produce Items</th>
                <th>Total Value</th>
                <th>Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>#FG1028</td>
                <td>Tomatoes, Groundnut, Watermelon</td>
                <td style={{ fontWeight: 800, color: '#166534' }}>₹180</td>
                <td><span className="badge badge-warning">🚚 In Transit</span></td>
              </tr>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 700 }}>#{order.id}</td>
                  <td>{order.productName} ({order.quantity} units)</td>
                  <td style={{ fontWeight: 800, color: '#166534' }}>₹{order.totalAmount}</td>
                  <td>
                    <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-warning'}`}>
                      {order.status}
                    </span>
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

export default ConsumerOrders;
