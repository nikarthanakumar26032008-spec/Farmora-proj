import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../services/api';
import { Sprout, User, Mail, Lock, MapPin, ArrowRight } from 'lucide-react';

const SignUp = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Farmer');
  const [location, setLocation] = useState('Coimbatore');
  const [landArea, setLandArea] = useState('2.5 acres');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signupUser({
        name,
        email,
        password,
        role,
        location,
        landArea
      });

      const user = res.data.user;
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }

      if (user.role === 'Farmer') {
        navigate('/farmer/dashboard');
      } else if (user.role === 'Consumer') {
        navigate('/consumer/dashboard');
      } else {
        navigate('/signin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
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
        maxWidth: '480px',
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
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#166534' }}>Create an Account</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Join the Farmora Marketplace Platform</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
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
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Register As</label>
            <select
              className="form-select"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="Farmer">👨🌾 Farmer (Seller & Produce Producer)</option>
              <option value="Consumer">🛒 Consumer / Retail Buyer</option>
            </select>
          </div>

          {role === 'Farmer' && (
            <>
              <div className="form-group">
                <label className="form-label">Farm Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Coimbatore, Salem, Madurai"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Land Area (Acres)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2.5 acres"
                  value={landArea}
                  onChange={e => setLandArea(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '12px' }}
          >
            {loading ? 'Creating Account...' : 'Complete Sign Up'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
          Already registered?{' '}
          <Link to="/signin" style={{ color: '#166534', fontWeight: 700 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
