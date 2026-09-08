import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth APIs
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const signupUser = (userData) => api.post('/auth/signup', userData);
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);

// Farmer APIs
export const getFarmers = (status) => api.get('/farmers', { params: { status } });
export const updateFarmerStatus = (id, status) => api.put(`/farmers/${id}/approve`, { status });

// Product APIs
export const getProducts = (params) => api.get('/products', { params });
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const getSmartReach = (productId) => api.get(`/products/${productId}/smart-reach`);

// Order APIs
export const getOrders = (params) => api.get('/orders', { params });
export const createOrder = (orderData) => api.post('/orders', orderData);

// ML Prediction API
export const predictCropProfit = (data) => api.post('/ml/predict', data);

export default api;
