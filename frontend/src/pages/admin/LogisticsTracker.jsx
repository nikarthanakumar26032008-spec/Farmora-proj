import React from 'react';
import { Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

const LogisticsTracker = () => {
  const activeShipments = [
    { id: 'SHP-9021', orderId: '#ord_102', origin: 'Coimbatore Farm', destination: 'Gandhipuram Hub', carrier: 'Farmora Agri-Express', status: 'In Transit', eta: 'Today, 4:00 PM' },
    { id: 'SHP-9022', orderId: '#ord_101', origin: 'Coimbatore Farm', destination: 'RS Puram Residence', carrier: 'Local Direct Transport', status: 'Delivered', eta: 'Delivered' }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Logistics & Fleet Tracker</h1>
          <p className="page-subtitle">Track farm-to-door fresh produce deliveries</p>
        </div>
      </div>

      <div className="grid-cards">
        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}><Truck size={24} /></div>
          <div><div className="metric-val">1 Active</div><div className="metric-label">In-Transit Shipment</div></div>
        </div>
        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#f0fdf4', color: '#166534' }}><CheckCircle size={24} /></div>
          <div><div className="metric-val">98.4%</div><div className="metric-label">On-Time Delivery Rate</div></div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Order Ref</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Carrier</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {activeShipments.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700 }}>{s.id}</td>
                  <td>{s.orderId}</td>
                  <td>{s.origin}</td>
                  <td>{s.destination}</td>
                  <td>{s.carrier}</td>
                  <td>
                    <span className={`badge ${s.status === 'Delivered' ? 'badge-success' : 'badge-warning'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogisticsTracker;
