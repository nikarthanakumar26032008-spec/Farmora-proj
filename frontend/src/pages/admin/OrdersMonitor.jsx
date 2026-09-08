import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/api';
import { ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';

const OrdersMonitor = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(res => setOrders(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Marketplace Orders Monitor</h1>
          <p className="page-subtitle">Real-time status of transaction fulfillments across consumers and farmers</p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Consumer Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Value</th>
                <th>Delivery Address</th>
                <th>Status</th>
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
      </div>
    </div>
  );
};

export default OrdersMonitor;
