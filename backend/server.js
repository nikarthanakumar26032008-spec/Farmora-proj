const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mlRoutes = require('./routes/mlRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads and data directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

// Static uploads serving
app.use('/uploads', express.static(uploadsDir));

// API Routing
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ml', mlRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Farmora Node/Express Backend', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🌾 Farmora Backend Server running on http://localhost:${PORT}`);
});
