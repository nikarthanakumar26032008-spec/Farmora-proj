import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'Farmer') return <Navigate to="/farmer/dashboard" replace />;
    if (user.role === 'Consumer') return <Navigate to="/consumer/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
