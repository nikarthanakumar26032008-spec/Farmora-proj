import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { Sprout, Lock, Mail, ArrowRight } from 'lucide-react';

const SignIn = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      const user = res.data.user;

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }

      // Role-based navigation
      if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'Farmer') {
        navigate('/farmer/dashboard');
      } else if (user.role === 'Consumer') {
        navigate('/consumer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoUser = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('password123');
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
        maxWidth: '440px',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#166534' }}>Welcome to Farmora</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Sign in to access your portal</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            padding: '12px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '20px',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '10px' }}>
            Quick Demo Logins:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => setDemoUser('admin@farmora.com', 'Admin')}
              className="btn btn-secondary"
              style={{ fontSize: '12px', padding: '6px', justifyContent: 'center' }}
            >
              👑 Admin
            </button>
            <button
              onClick={() => setDemoUser('ravi@farmer.com', 'Farmer')}
              className="btn btn-secondary"
              style={{ fontSize: '12px', padding: '6px', justifyContent: 'center' }}
            >
              👨🌾 Farmer
            </button>
            <button
              onClick={() => setDemoUser('priya@gmail.com', 'Consumer')}
              className="btn btn-secondary"
              style={{ fontSize: '12px', padding: '6px', justifyContent: 'center' }}
            >
              🛒 Consumer
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#166534', fontWeight: 700 }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
