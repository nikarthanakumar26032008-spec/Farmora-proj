import React, { useState, useEffect } from 'react';
import { Sprout, LogOut, User, Bell, Check, ShoppingBag, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOrders, getProducts } from '../services/api';

const Navbar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.role === 'Farmer') {
      const farmerId = currentUser.id || "usr_farmer1";
      Promise.all([
        getOrders({ farmerId }),
        getProducts({ farmerId })
      ]).then(([oRes, pRes]) => {
        const orderItems = oRes.data;
        const productItems = pRes.data;

        const notifs = [];

        // Order notifications
        orderItems.forEach(ord => {
          notifs.push({
            id: `notif_ord_${ord.id}`,
            type: 'order',
            title: `🛒 New Order #${ord.id}`,
            message: `${ord.consumerName} ordered ${ord.quantity} units of ${ord.productName} (₹${ord.totalAmount})`,
            time: 'Recently',
            link: '/farmer/my-orders'
          });
        });

        // Unsold stock notifications
        const highUnsold = productItems.filter(p => p.remaining >= 100 || (p.remaining / p.totalStock) >= 0.3);
        highUnsold.forEach(prod => {
          notifs.push({
            id: `notif_stock_${prod.id}`,
            type: 'warning',
            title: `⚠️ High Unsold Stock Warning`,
            message: `${prod.name} has ${prod.remaining} ${prod.unit} unsold remaining. Reach buyers now via SmartReach.`,
            time: 'Active Alert',
            link: '/farmer/smart-reach'
          });
        });

        // Verification notification
        notifs.push({
          id: 'notif_verify',
          type: 'success',
          title: `✅ Verification Status Approved`,
          message: `Your farmer registration for ${currentUser.location || 'Coimbatore'} land area is verified and active.`,
          time: 'Verified',
          link: '/farmer/profile'
        });

        setNotifications(notifs);
      }).catch(console.error);
    } else {
      setNotifications([
        {
          id: 'notif_welcome',
          type: 'info',
          title: `👋 Welcome to Farmora`,
          message: `Logged in as ${currentUser.role} (${currentUser.name})`,
          time: 'Just now'
        }
      ]);
    }
  }, [currentUser]);

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: '#166534',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}>
          <Sprout size={22} />
        </div>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#166534', lineHeight: 1 }}>FARMORA</h1>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Agri-Market & Intelligence</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {currentUser && (
          <>
            {/* Notification Bell Icon */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  color: '#475569'
                }}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '11px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '50px',
                  width: '340px',
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  border: '1px solid #e2e8f0',
                  zIndex: 100,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '14px 16px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Notifications ({notifications.length})</span>
                    <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>Close</button>
                  </div>

                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.link) navigate(n.link);
                          setShowNotifications(false);
                        }}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #f1f5f9',
                          cursor: 'pointer',
                          backgroundColor: '#ffffff',
                          transition: 'background-color 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fdf4'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{n.title}</div>
                        <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{n.message}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', textAlign: 'right' }}>{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f0fdf4',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{currentUser.name}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#166534' }}>
                  {currentUser.role} {currentUser.status ? `(${currentUser.status})` : ''}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="btn btn-secondary"
              style={{ padding: '8px 12px', fontSize: '13px' }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
