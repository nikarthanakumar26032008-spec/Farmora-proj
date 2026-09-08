import React from 'react';
import { User, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

const FarmerProfile = ({ currentUser }) => {
  const farmer = currentUser || {
    name: "Ravi Kumar",
    email: "ravi@farmer.com",
    role: "Farmer",
    location: "Coimbatore",
    status: "approved"
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Farmer Profile</h1>
          <p className="page-subtitle">Your verified account details and farm status</p>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800 }}>
            {farmer.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>{farmer.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              <MapPin size={14} /> {farmer.location}
            </div>
            <span className="badge badge-success" style={{ marginTop: '6px' }}>
              <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Status: {farmer.status || 'approved'}
            </span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
            <div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>Email Address</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{farmer.email}</div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>Account Role</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{farmer.role}</div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>Land Area</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>3.5 Acres</div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>Marketplace Status</div>
              <div style={{ fontWeight: 600, color: '#166534', marginTop: '2px' }}>Verified & Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
