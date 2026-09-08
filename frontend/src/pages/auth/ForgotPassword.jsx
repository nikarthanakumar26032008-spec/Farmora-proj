import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/api';
import { Sprout, Mail, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email, newPassword });
      setMessage(res.data.message);
      setSubmitted(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error executing password reset.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0fdf4',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: '#166534',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <Sprout size={32} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#166534' }}>Reset Password</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Enter your email to update credentials</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <CheckCircle2 size={48} color="#166534" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Password Updated</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>{message}</p>
            <Link to="/signin" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Account Email</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}>
              Reset Password
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/signin" style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
