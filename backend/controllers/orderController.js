const { readJSON, writeJSON } = require('../utils/jsonStore');

const getOrders = (req, res) => {
  const orders = readJSON('orders.json');
  const { consumerId, farmerId } = req.query;

  let result = [...orders];

  if (consumerId) {
    result = result.filter(o => o.consumerId === consumerId);
  }

  if (farmerId) {
    result = result.filter(o => o.farmerId === farmerId);
  }

  res.json(result);
};

const createOrder = (req, res) => {
  const { consumerId, consumerName, productId, quantity, deliveryAddress } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Product ID and a valid quantity are required." });
  }

  const products = readJSON('products.json');
  const prodIndex = products.findIndex(p => p.id === productId);

  if (prodIndex === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  const product = products[prodIndex];

  if (product.remaining < quantity) {
    return res.status(400).json({
      message: `Insufficient stock. Only ${product.remaining} ${product.unit} available.`
    });
  }

  const orderQuantity = Number(quantity);
  const totalAmount = orderQuantity * product.price;

  // Deduct inventory
  product.sold += orderQuantity;
  product.remaining -= orderQuantity;
  products[prodIndex] = product;
  writeJSON('products.json', products);

  // Record order
  const orders = readJSON('orders.json');
  const newOrder = {
    id: `ord_${Date.now()}`,
    consumerId: consumerId || (req.user ? req.user.id : "usr_consumer1"),
    consumerName: consumerName || (req.user ? req.user.name : "Priya Sharma"),
    farmerId: product.farmerId,
    productId: product.id,
    productName: product.name,
    quantity: orderQuantity,
    pricePerUnit: product.price,
    totalAmount,
    status: "Processing",
    deliveryAddress: deliveryAddress || "Main Street, Coimbatore",
    orderDate: new Date().toISOString()
  };

  orders.push(newOrder);
  writeJSON('orders.json', orders);

  res.status(201).json({
    message: "Order placed successfully!",
    order: newOrder
  });
};

module.exports = {
  getOrders,
  createOrder
};
