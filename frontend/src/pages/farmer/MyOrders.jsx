import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/api';
import { ShoppingBag, CheckCircle, Clock } from 'lucide-react';

const MyOrders = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const farmerId = currentUser ? currentUser.id : "usr_farmer1";
    getOrders({ farmerId }).then(res => setOrders(res.data)).catch(console.error);
  }, [currentUser]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Received Consumer Orders</h1>
          <p className="page-subtitle">Track incoming purchase requests & dispatch details</p>
        </div>
      </div>

      <div className="card">
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
            No incoming orders yet. Listed products will show up here once consumers purchase.
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Consumer Name</th>
                  <th>Product Purchased</th>
                  <th>Quantity</th>
                  <th>Order Revenue</th>
                  <th>Delivery Address</th>
                  <th>Fulfillment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 700 }}>#{order.id}</td>
                    <td>{order.consumerName}</td>
                    <td>{order.productName}</td>
                    <td>{order.quantity} units</td>
                    <td style={{ fontWeight: 800, color: '#166534' }}>₹{order.totalAmount}</td>
                    <td>{order.deliveryAddress}</td>
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
        )}
      </div>
    </div>
  );
};

export default MyOrders;
