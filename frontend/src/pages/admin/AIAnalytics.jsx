import React from 'react';
import { BrainCircuit, TrendingUp, Sparkles } from 'lucide-react';

const AIAnalytics = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Market Analytics & Demand Forecaster</h1>
          <p className="page-subtitle">Machine learning model performance metrics & market trend forecasts</p>
        </div>
      </div>

      <div className="grid-cards">
        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#f0fdf4', color: '#166534' }}><BrainCircuit size={24} /></div>
          <div><div className="metric-val">Random Forest</div><div className="metric-label">Active Regressor Model</div></div>
        </div>
        <div className="card metric-card">
          <div className="metric-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}><Sparkles size={24} /></div>
          <div><div className="metric-val">94.8%</div><div className="metric-label">Profit Prediction Accuracy</div></div>
        </div>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Regional Demand Insights</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Coimbatore Region</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#166534', marginTop: '4px' }}>Groundnut & Tomatoes</div>
            <span className="badge badge-success" style={{ marginTop: '8px' }}>High Profit Index</span>
          </div>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Salem Region</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>Tomatoes & Paddy</div>
            <span className="badge badge-info" style={{ marginTop: '8px' }}>High Yield Outlook</span>
          </div>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Erode Region</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>Turmeric & Maize</div>
            <span className="badge badge-warning" style={{ marginTop: '8px' }}>Steady Demand</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
