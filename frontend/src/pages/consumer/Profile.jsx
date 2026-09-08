import React from 'react';
import { User, MapPin } from 'lucide-react';

const ConsumerProfile = ({ currentUser }) => {
  const consumer = currentUser || {
    name: "Priya Sharma",
    email: "priya@gmail.com",
    role: "Consumer",
    location: "Coimbatore"
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Consumer Profile</h1>
          <p className="page-subtitle">Your delivery locations & account settings</p>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800 }}>
            {consumer.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>{consumer.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              <MapPin size={14} /> {consumer.location}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
            <div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>Email Address</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{consumer.email}</div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>Role</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{consumer.role}</div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>Default Shipping Hub</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>Coimbatore, Tamil Nadu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;
