import React, { useEffect, useState } from 'react';
import { getProducts, getSmartReach } from '../../services/api';
import { Share2, AlertTriangle, Building2, Store, Users, CheckCircle2, PhoneCall } from 'lucide-react';

const SmartReach = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [smartReachData, setSmartReachData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const farmerId = currentUser ? currentUser.id : "usr_farmer1";
    getProducts({ farmerId }).then(res => {
      setProducts(res.data);
      if (res.data.length > 0) {
        // Auto select first high unsold product or first product
        const highUnsold = res.data.find(p => p.remaining >= 100 || (p.remaining / p.totalStock) >= 0.3);
        const initialId = highUnsold ? highUnsold.id : res.data[0].id;
        setSelectedProductId(initialId);
        fetchSmartReach(initialId);
      }
    }).catch(console.error);
  }, [currentUser]);

  const fetchSmartReach = async (prodId) => {
    setLoading(true);
    try {
      const res = await getSmartReach(prodId);
      setSmartReachData(res.data);
    } catch (err) {
      console.error('Error fetching SmartReach details', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (e) => {
    const prodId = e.target.value;
    setSelectedProductId(prodId);
    fetchSmartReach(prodId);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">🤖 SmartReach Buyer Recommendation Engine</h1>
          <p className="page-subtitle">Rule-based distribution matching unsold stock to Commercial Buyers, Restaurants & Retail Chains</p>
        </div>
      </div>

      {/* Select Product Dropdown */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <label className="form-label" style={{ fontSize: '15px' }}>Select Product to Analyze Unsold Stock:</label>
        <select className="form-select" value={selectedProductId} onChange={handleSelectProduct} style={{ fontSize: '15px', fontWeight: 600 }}>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.remaining} {p.unit} remaining (₹{p.price}/{p.unit}) {p.remaining >= 100 ? '⚠️ High Unsold Stock' : ''}
            </option>
          ))}
        </select>
      </div>

      {smartReachData && (
        <>
          {/* Unsold Stock Status Banner */}
          <div style={{
            backgroundColor: smartReachData.product.isHighUnsold ? '#fef2f2' : '#f0fdf4',
            border: `1px solid ${smartReachData.product.isHighUnsold ? '#fecaca' : '#bbf7d0'}`,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                fontSize: '18px',
                fontWeight: 800,
                color: smartReachData.product.isHighUnsold ? '#991b1b' : '#166534',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {smartReachData.product.isHighUnsold ? '⚠️ HIGH UNSOLD STOCK DETECTED' : '✅ STOCK LEVELS OPTIMAL'}
              </div>
              <div style={{ fontSize: '14px', color: '#475569', marginTop: '4px' }}>
                Product: <strong>{smartReachData.product.name}</strong> | Remaining: <strong>{smartReachData.product.remaining} {smartReachData.product.unit}</strong> | Price: <strong>₹{smartReachData.product.price}/{smartReachData.product.unit}</strong>
              </div>
            </div>
            {smartReachData.product.isHighUnsold && (
              <span className="badge badge-danger" style={{ fontSize: '13px', padding: '6px 12px' }}>
                Selling Slowly
              </span>
            )}
          </div>

          {/* Recommended Buyer Channels */}
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
            Recommended Buyers & Outreach Channels for {smartReachData.product.name} ({smartReachData.product.remaining} {smartReachData.product.unit} remaining):
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {smartReachData.smartReach.recommendations.map((rec, index) => (
              <div key={index} className="card" style={{ borderLeft: index === 0 ? '4px solid #166534' : '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{rec.buyerGroup}</h4>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Target Volume: {rec.targetVolume}</span>
                  </div>
                  <span style={{ fontSize: '18px' }}>{rec.suitability}</span>
                </div>

                <div style={{ marginBottom: '14px', fontSize: '13px', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Recommended Buyers:</div>
                  <ul style={{ paddingLeft: '18px', color: '#0f172a' }}>
                    {rec.buyerList.map((buyer, idx) => (
                      <li key={idx} style={{ marginBottom: '2px' }}>{buyer}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => alert(`Connecting with ${rec.buyerGroup}... Outreach email/SMS dispatch initiated!`)}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
                >
                  <PhoneCall size={14} /> Send Outreach Broadcast
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SmartReach;
