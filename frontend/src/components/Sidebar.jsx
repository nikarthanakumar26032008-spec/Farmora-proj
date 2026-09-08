import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckCircle2,
  Package,
  ShoppingCart,
  Truck,
  AlertTriangle,
  TrendingUp,
  PlusCircle,
  BrainCircuit,
  Share2,
  UserCheck,
  Store,
  ShoppingBag,
  User
} from 'lucide-react';

const Sidebar = ({ role }) => {
  let navItems = [];

  if (role === 'Admin') {
    navItems = [
      { path: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
      { path: '/admin/farmer-verification', label: 'Farmer Verification', icon: UserCheck },
      { path: '/admin/crops-catalog', label: 'Crops Catalog', icon: Package },
      { path: '/admin/orders-monitor', label: 'Orders Monitor', icon: ShoppingCart },
      { path: '/admin/logistics-tracker', label: 'Logistics Tracker', icon: Truck },
      { path: '/admin/unsold-stock', label: 'Unsold Stock', icon: AlertTriangle },
      { path: '/admin/ai-analytics', label: 'AI Analytics', icon: TrendingUp }
    ];
  } else if (role === 'Farmer') {
    navItems = [
      { path: '/farmer/dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
      { path: '/farmer/my-products', label: 'My Products', icon: Package },
      { path: '/farmer/add-product', label: 'Add Product', icon: PlusCircle },
      { path: '/farmer/my-stock', label: 'My Stock', icon: Store },
      { path: '/farmer/my-orders', label: 'My Orders', icon: ShoppingBag },
      { path: '/farmer/smart-reach', label: 'SmartReach', icon: Share2 },
      { path: '/farmer/profit-prediction', label: 'Profit Prediction', icon: BrainCircuit },
      { path: '/farmer/profile', label: 'Profile', icon: User }
    ];
  } else if (role === 'Consumer') {
    navItems = [
      { path: '/consumer/dashboard', label: 'Consumer Dashboard', icon: LayoutDashboard },
      { path: '/consumer/browse', label: 'Browse Products', icon: Store },
      { path: '/consumer/cart', label: 'My Cart', icon: ShoppingCart },
      { path: '/consumer/orders', label: 'My Orders', icon: ShoppingBag },
      { path: '/consumer/profile', label: 'Profile', icon: User }
    ];
  }

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ padding: '0 8px 12px 8px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px' }}>
        {role} Menu
      </div>

      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: isActive ? 700 : 500,
              backgroundColor: isActive ? '#f0fdf4' : 'transparent',
              color: isActive ? '#166534' : '#475569',
              transition: 'all 0.15s ease'
            })}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Sidebar;
