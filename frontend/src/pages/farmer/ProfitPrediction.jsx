import React, { useState } from 'react';
import { predictCropProfit } from '../../services/api';
import { BrainCircuit, Sparkles, TrendingUp, IndianRupee, Sprout, ArrowRight } from 'lucide-react';

const ProfitPrediction = ({ currentUser }) => {
  const [season, setSeason] = useState('Kharif');
  const [location, setLocation] = useState(currentUser?.location || 'Coimbatore');
  const [landArea, setLandArea] = useState('2');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictCropProfit({
        season,
        location,
        land_area: Number(landArea)
      });
      setResult(res.data);
    } catch (err) {
      alert('Error calculating prediction: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">🧠 AI Crop Profit Prediction</h1>
          <p className="page-subtitle">Machine Learning (Random Forest) powered yield, cost, revenue & profit estimator</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BrainCircuit color="#166534" size={22} /> Enter Farm Parameters
        </h3>

        <form onSubmit={handlePredict}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Sowing Season</label>
              <select className="form-select" value={season} onChange={e => setSeason(e.target.value)}>
                <option value="Kharif">Kharif (Monsoon / Jul-Oct)</option>
                <option value="Rabi">Rabi (Winter / Oct-Mar)</option>
                <option value="Summer">Summer (Zaid / Mar-Jun)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location / District</label>
              <select className="form-select" value={location} onChange={e => setLocation(e.target.value)}>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Salem">Salem</option>
                <option value="Madurai">Madurai</option>
                <option value="Erode">Erode</option>
                <option value="Tirupur">Tirupur</option>
                <option value="Dindigul">Dindigul</option>
                <option value="Theni">Theni</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Land Area (Acres)</label>
              <input
                type="number"
                required
                min="0.5"
                step="0.5"
                className="form-input"
                value={landArea}
                onChange={e => setLandArea(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}
          >
            {loading ? 'Running ML Regressor Model...' : 'Calculate AI Crop Profit Recommendation'} <Sparkles size={18} />
          </button>
        </form>
      </div>

      {/* Output Results Card as specified in section 11 */}
      {result && result.recommended_crop && (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #166534 0%, #14532d 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 10px 20px rgba(22, 101, 52, 0.2)',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px' }}>
                  AI CROP RECOMMENDATION
                </span>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>
                  🥜 {result.recommended_crop.crop}
                </h2>
              </div>
              <span className="badge" style={{ background: '#fef3c7', color: '#92400e', fontSize: '13px', padding: '6px 14px', fontWeight: 800 }}>
                Demand: {result.recommended_crop.demand}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginTop: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Estimated Cost</div>
                <div style={{ fontSize: '20px', fontWeight: 800 }}>₹{result.recommended_crop.estimated_cost_per_acre.toLocaleString()} / acre</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Expected Yield</div>
                <div style={{ fontSize: '20px', fontWeight: 800 }}>{result.recommended_crop.expected_yield_per_acre.toLocaleString()} kg / acre</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Expected Revenue</div>
                <div style={{ fontSize: '20px', fontWeight: 800 }}>₹{result.recommended_crop.expected_revenue_per_acre.toLocaleString()} / acre</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: '12px', opacity: 0.9, fontWeight: 700 }}>Estimated Profit</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#fef08a' }}>
                  ₹{result.recommended_crop.estimated_profit_per_acre.toLocaleString()} / acre
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: '13px', opacity: 0.9 }}>
              Total projected profit for <strong>{landArea} acres</strong>: <strong>₹{result.recommended_crop.total_estimated_profit.toLocaleString()}</strong>
            </div>
          </div>

          {/* Alternative Crops Table */}
          <div className="card">
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>All Ranked Crop Alternatives</h4>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Est. Cost/Acre</th>
                    <th>Yield/Acre</th>
                    <th>Revenue/Acre</th>
                    <th>Profit/Acre</th>
                    <th>Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {result.all_recommendations.map((rec, index) => (
                    <tr key={index} style={{ backgroundColor: index === 0 ? '#f0fdf4' : 'transparent' }}>
                      <td style={{ fontWeight: 700 }}>{rec.crop} {index === 0 ? '⭐ Best Match' : ''}</td>
                      <td>₹{rec.estimated_cost_per_acre.toLocaleString()}</td>
                      <td>{rec.expected_yield_per_acre.toLocaleString()} kg</td>
                      <td>₹{rec.expected_revenue_per_acre.toLocaleString()}</td>
                      <td style={{ fontWeight: 800, color: '#166534' }}>₹{rec.estimated_profit_per_acre.toLocaleString()}</td>
                      <td><span className="badge badge-info">{rec.demand}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfitPrediction;
