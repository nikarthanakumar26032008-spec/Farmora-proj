import React, { useState, useEffect } from 'react';
import { ShoppingBag, Truck, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/api';

const ConsumerCart = ({ currentUser }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 'prod_1', name: 'Fresh Red Tomatoes', icon: '🍅', quantity: 2, unit: 'kg', price: 28, farm: 'Ravi Kumar Farm (Coimbatore)', farmerId: 'usr_farmer1' },
    { id: 'prod_2', name: 'Organic Groundnut', icon: '🥜', quantity: 2, unit: 'kg', price: 55, farm: 'Suresh Patel Farm (Salem)', farmerId: 'usr_farmer2' },
    { id: 'prod_3', name: 'Fresh Sweet Watermelon', icon: '🍉', quantity: 1, unit: 'kg', price: 10, farm: 'Green Valley Agro (Theni)', farmerId: 'usr_farmer1' }
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState('RS Puram, Coimbatore');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Calculate Subtotals
  const productsTotal = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const logisticsFee = 15;
  const grandTotal = productsTotal + logisticsFee;

  // Number of unique farms
  const uniqueFarmsCount = new Set(cartItems.map(item => item.farm)).size;

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      // Create orders in backend for each item
      for (const item of cartItems) {
        await createOrder({
          consumerId: currentUser ? currentUser.id : "usr_consumer1",
          consumerName: currentUser ? currentUser.name : "Priya Sharma",
          productId: item.id,
          quantity: item.quantity,
          deliveryAddress
        });
      }

      // Navigate to order tracking page
      navigate('/consumer/orders', { state: { orderSuccess: true, newOrderId: 'FG1028' } });
    } catch (err) {
      alert('Error placing order: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">YOUR CART</h1>
          <p className="page-subtitle">Direct farm-to-table checkout with AI logistics optimization</p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <ShoppingBag size={48} color="#166534" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Your cart is empty</h3>
          <button onClick={() => navigate('/consumer/dashboard')} className="btn btn-primary" style={{ marginTop: '16px' }}>
            Explore Fresh Produce
          </button>
        </div>
      ) : (
        <>
          {/* Smart Delivery AI Optimization Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: '#ffffff',
            borderRadius: '14px',
            padding: '20px 24px',
            marginBottom: '24px',
            boxShadow: '0 8px 20px rgba(2, 132, 199, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
              <Truck size={22} /> 🚚 Smart Delivery
            </div>

            <p style={{ fontSize: '14px', opacity: 0.95, lineHeight: 1.5 }}>
              Your order contains products from <strong>{uniqueFarmsCount} nearby farms</strong>.
              <br />
              <strong style={{ color: '#fef08a' }}>AI has grouped the collection route.</strong>
            </p>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              fontSize: '13px'
            }}>
              <div>
                <span style={{ opacity: 0.8 }}>Estimated Delivery:</span>
                <div style={{ fontWeight: 800, fontSize: '15px' }}>Tomorrow • 10 AM – 1 PM</div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '20px' }}>
                <span style={{ opacity: 0.8 }}>Route Optimization:</span>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#86efac', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={14} /> Distance Optimized: 18%
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items Table */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Selected Farm Produce</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>📍 {item.farm}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534', marginTop: '2px' }}>
                        ₹{item.price} / {item.unit}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Quantity Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '2px 6px' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', fontWeight: 700, padding: '2px 6px' }}>-</button>
                      <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity} {item.unit}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', fontWeight: 700, padding: '2px 6px' }}>+</button>
                    </div>

                    <div style={{ fontSize: '16px', fontWeight: 800, minWidth: '60px', textAlign: 'right' }}>
                      ₹{item.quantity * item.price}
                    </div>

                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address Input */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <label className="form-label">Delivery Address</label>
              <input
                type="text"
                className="form-input"
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
              />
            </div>

            {/* Bill Breakdown requested in prompt */}
            <div style={{
              marginTop: '20px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#475569' }}>Products</span>
                <span style={{ fontWeight: 700 }}>₹{productsTotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#475569' }}>Logistics (AI Route Batching)</span>
                <span style={{ fontWeight: 700 }}>₹{logisticsFee}</span>
              </div>

              <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#166534' }}>
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <div style={{ fontSize: '13px', color: '#166534', fontWeight: 700, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🌱 Farmers benefit from direct sales
              </div>
            </div>

            {/* PLACE ORDER Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="btn btn-primary"
              style={{
                width: '100%',
                justify: 'center',
                padding: '14px',
                marginTop: '20px',
                fontSize: '16px',
                fontWeight: 800,
                letterSpacing: '0.5px'
              }}
            >
              {isPlacingOrder ? 'Processing Multi-Farm Batch...' : 'PLACE ORDER'} <ArrowRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConsumerCart;
