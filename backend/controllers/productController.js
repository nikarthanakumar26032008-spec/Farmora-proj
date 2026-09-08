const { readJSON, writeJSON } = require('../utils/jsonStore');

const getProducts = (req, res) => {
  const products = readJSON('products.json');
  const { farmerId, category, location, unsoldOnly } = req.query;

  let result = [...products];

  if (farmerId) {
    result = result.filter(p => p.farmerId === farmerId);
  }

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (location) {
    result = result.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (unsoldOnly === 'true') {
    result = result.filter(p => p.remaining >= 100 || (p.remaining / p.totalStock) >= 0.3);
  }

  res.json(result);
};

const createProduct = (req, res) => {
  const { farmerId, farmerName, name, category, totalStock, price, unit, harvestDate, location, image } = req.body;

  if (!name || !totalStock || !price) {
    return res.status(400).json({ message: "Product Name, Total Stock, and Price are required." });
  }

  const products = readJSON('products.json');

  const newProduct = {
    id: `prod_${Date.now()}`,
    farmerId: farmerId || (req.user ? req.user.id : "usr_farmer1"),
    farmerName: farmerName || (req.user ? req.user.name : "Ravi Kumar"),
    name,
    category: category || "General",
    totalStock: Number(totalStock),
    sold: 0,
    remaining: Number(totalStock),
    unit: unit || "kg",
    price: Number(price),
    harvestDate: harvestDate || new Date().toISOString().split('T')[0],
    location: location || "Coimbatore",
    image: image || req.file ? `/uploads/${req.file.filename}` : "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600",
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  writeJSON('products.json', products);

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const products = readJSON('products.json');
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  products[index] = {
    ...products[index],
    ...updates,
    remaining: updates.totalStock !== undefined ? (Number(updates.totalStock) - Number(products[index].sold)) : products[index].remaining
  };

  writeJSON('products.json', products);

  res.json({
    message: "Product updated successfully",
    product: products[index]
  });
};

// SmartReach Rule-based Buyer Recommendation Engine
const getSmartReach = (req, res) => {
  const { productId } = req.params;
  const products = readJSON('products.json');
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  const remaining = product.remaining;
  const isHighUnsold = remaining >= 100 || (remaining / product.totalStock) >= 0.3;

  // Rule-based logic depending on crop category and remaining quantity
  let recommendations = [];

  if (product.category === 'Vegetables' || product.name.toLowerCase().includes('tomato')) {
    recommendations = [
      { buyerGroup: "Restaurants & Hotels", suitability: "⭐⭐⭐⭐⭐", score: 5, targetVolume: "50-100 kg", priceMultiplier: 0.95, buyerList: ["Annapoorna Hotel Chain", "Royal Fine Dining", "Green Leaf Bistro"] },
      { buyerGroup: "Retail Grocery Shops", suitability: "⭐⭐⭐⭐", score: 4, targetVolume: "30-50 kg", priceMultiplier: 0.92, buyerList: ["Nilgiris Supermarket", "Kovai Fresh Mart", "Pazhamudir Nilayam"] },
      { buyerGroup: "Direct Consumers", suitability: "⭐⭐⭐", score: 3, targetVolume: "5-10 kg", priceMultiplier: 1.0, buyerList: ["Local Residential Communities", "Weekly Farmer Market Buyers"] },
      { buyerGroup: "Food Processing Units", suitability: "⭐⭐⭐⭐", score: 4, targetVolume: "100+ kg", priceMultiplier: 0.85, buyerList: ["Kissan Foods Processing Unit", "Southern Sauce Corp"] }
    ];
  } else if (product.category === 'Fruits' || product.name.toLowerCase().includes('watermelon')) {
    recommendations = [
      { buyerGroup: "Juice Bars & Cafes", suitability: "⭐⭐⭐⭐⭐", score: 5, targetVolume: "100-200 kg", priceMultiplier: 0.95, buyerList: ["Juice Junction", "Squeeze Fresh Outlet", "Tropical Drinks Hub"] },
      { buyerGroup: "Retail Supermarkets", suitability: "⭐⭐⭐⭐", score: 4, targetVolume: "50-100 kg", priceMultiplier: 0.90, buyerList: ["Reliance Smart", "More Megastore"] },
      { buyerGroup: "Direct Consumers", suitability: "⭐⭐⭐", score: 3, targetVolume: "10-20 kg", priceMultiplier: 1.0, buyerList: ["Apartment Complex Group Buys"] }
    ];
  } else {
    recommendations = [
      { buyerGroup: "Retail Shops & Wholesale", suitability: "⭐⭐⭐⭐⭐", score: 5, targetVolume: "100+ kg", priceMultiplier: 0.95, buyerList: ["Coimbatore Wholesale Market", "Apex Grain Traders"] },
      { buyerGroup: "Food Manufacturers", suitability: "⭐⭐⭐⭐", score: 4, targetVolume: "200+ kg", priceMultiplier: 0.90, buyerList: ["Agro-Foods Industries"] },
      { buyerGroup: "Direct Consumers", suitability: "⭐⭐⭐", score: 3, targetVolume: "10-25 kg", priceMultiplier: 1.0, buyerList: ["Consumer Co-op Stores"] }
    ];
  }

  res.json({
    product: {
      id: product.id,
      name: product.name,
      remaining: product.remaining,
      unit: product.unit,
      price: product.price,
      location: product.location,
      isHighUnsold
    },
    smartReach: {
      alert: isHighUnsold ? "⚠️ HIGH UNSOLD STOCK — Action Required" : "Stock level optimal",
      recommendations
    }
  });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  getSmartReach
};
