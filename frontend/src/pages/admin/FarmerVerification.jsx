import React, { useEffect, useState } from 'react';
import { getFarmers, updateFarmerStatus } from '../../services/api';
import { Check, X, Eye, UserCheck } from 'lucide-react';

const FarmerVerification = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchFarmers = async () => {
    try {
      const res = await getFarmers();
      setFarmers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleAction = async (id, status) => {
    await updateFarmerStatus(id, status);
    fetchFarmers();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Farmer Verification Directory</h1>
          <p className="page-subtitle">Verify farmer land ownership details and approve credentials</p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Farmer Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Land Area</th>
                <th>Status</th>
                <th>Land Photos</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map(farmer => (
                <tr key={farmer.id}>
                  <td style={{ fontWeight: 700 }}>{farmer.name}</td>
                  <td>{farmer.email}</td>
                  <td>{farmer.location}</td>
                  <td>{farmer.landArea}</td>
                  <td>
                    <span className={`badge ${farmer.status === 'approved' ? 'badge-success' : farmer.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
                      {farmer.status}
                    </span>
                  </td>
                  <td>
                    {farmer.photos && farmer.photos.length > 0 ? (
                      <button onClick={() => setSelectedPhoto(farmer.photos[0])} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                        <Eye size={14} /> View Photos
                      </button>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    {farmer.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleAction(farmer.id, 'approved')} className="btn btn-success" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          <Check size={14} /> APPROVE
                        </button>
                        <button onClick={() => handleAction(farmer.id, 'rejected')} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          <X size={14} /> REJECT
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPhoto && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', maxWidth: '600px', width: '90%' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Land Photos</h4>
            <img src={selectedPhoto} alt="Land Photo" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button onClick={() => setSelectedPhoto(null)} className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerVerification;
