import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import FarmerVerification from './pages/admin/FarmerVerification';
import CropsCatalog from './pages/admin/CropsCatalog';
import OrdersMonitor from './pages/admin/OrdersMonitor';
import LogisticsTracker from './pages/admin/LogisticsTracker';
import UnsoldStock from './pages/admin/UnsoldStock';
import AIAnalytics from './pages/admin/AIAnalytics';

// Farmer Pages
import FarmerDashboard from './pages/farmer/Dashboard';
import MyProducts from './pages/farmer/MyProducts';
import AddProduct from './pages/farmer/AddProduct';
import MyStock from './pages/farmer/MyStock';
import MyOrders from './pages/farmer/MyOrders';
import SmartReach from './pages/farmer/SmartReach';
import ProfitPrediction from './pages/farmer/ProfitPrediction';
import FarmerProfile from './pages/farmer/Profile';

// Consumer Pages
import ConsumerDashboard from './pages/consumer/Dashboard';
import BrowseProducts from './pages/consumer/BrowseProducts';
import ConsumerCart from './pages/consumer/Cart';
import ConsumerOrders from './pages/consumer/Orders';
import ConsumerProfile from './pages/consumer/Profile';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('farmora_user');
    return saved ? JSON.parse(saved) : {
      id: "usr_admin",
      name: "Platform Admin",
      email: "admin@farmora.com",
      role: "Admin"
    };
  });

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('farmora_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('farmora_user');
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        {currentUser && <Navbar currentUser={currentUser} onLogout={handleLogout} />}

        <div className="app-container">
          {currentUser && <Sidebar role={currentUser.role} />}

          <main className="main-content">
            <Routes>
              {/* Default Redirect */}
              <Route path="/" element={
                currentUser ? (
                  currentUser.role === 'Admin' ? <Navigate to="/admin/dashboard" replace /> :
                  currentUser.role === 'Farmer' ? <Navigate to="/farmer/dashboard" replace /> :
                  <Navigate to="/consumer/dashboard" replace />
                ) : <Navigate to="/signin" replace />
              } />

              {/* Auth Routes */}
              <Route path="/signin" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/signup" element={<SignUp onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute user={currentUser} allowedRole="Admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/farmer-verification" element={<ProtectedRoute user={currentUser} allowedRole="Admin"><FarmerVerification /></ProtectedRoute>} />
              <Route path="/admin/crops-catalog" element={<ProtectedRoute user={currentUser} allowedRole="Admin"><CropsCatalog /></ProtectedRoute>} />
              <Route path="/admin/orders-monitor" element={<ProtectedRoute user={currentUser} allowedRole="Admin"><OrdersMonitor /></ProtectedRoute>} />
              <Route path="/admin/logistics-tracker" element={<ProtectedRoute user={currentUser} allowedRole="Admin"><LogisticsTracker /></ProtectedRoute>} />
              <Route path="/admin/unsold-stock" element={<ProtectedRoute user={currentUser} allowedRole="Admin"><UnsoldStock /></ProtectedRoute>} />
              <Route path="/admin/ai-analytics" element={<ProtectedRoute user={currentUser} allowedRole="Admin"><AIAnalytics /></ProtectedRoute>} />

              {/* Farmer Routes */}
              <Route path="/farmer/dashboard" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><FarmerDashboard currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/farmer/my-products" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><MyProducts currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/farmer/add-product" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><AddProduct currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/farmer/my-stock" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><MyStock currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/farmer/my-orders" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><MyOrders currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/farmer/smart-reach" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><SmartReach currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/farmer/profit-prediction" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><ProfitPrediction currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/farmer/profile" element={<ProtectedRoute user={currentUser} allowedRole="Farmer"><FarmerProfile currentUser={currentUser} /></ProtectedRoute>} />

              {/* Consumer Routes */}
              <Route path="/consumer/dashboard" element={<ProtectedRoute user={currentUser} allowedRole="Consumer"><ConsumerDashboard currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/consumer/browse" element={<ProtectedRoute user={currentUser} allowedRole="Consumer"><BrowseProducts currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/consumer/cart" element={<ProtectedRoute user={currentUser} allowedRole="Consumer"><ConsumerCart currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/consumer/orders" element={<ProtectedRoute user={currentUser} allowedRole="Consumer"><ConsumerOrders currentUser={currentUser} /></ProtectedRoute>} />
              <Route path="/consumer/profile" element={<ProtectedRoute user={currentUser} allowedRole="Consumer"><ConsumerProfile currentUser={currentUser} /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
