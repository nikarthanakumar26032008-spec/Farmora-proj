import React, { useEffect, useState } from 'react';
import { getProducts, createOrder } from '../../services/api';
import { Store, ShoppingCart, MapPin, CheckCircle2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsumerDashboard = ({ currentUser, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderingProduct, setOrderingProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(5);
  const [deliveryAddress, setDeliveryAddress] = useState('Gandhipuram, Coimbatore');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const fetchProduce = () => {
    getProducts({ location: searchLocation, category: selectedCategory })
      .then(res => setProducts(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProduce();
  }, [searchLocation, selectedCategory]);

  const handleQuickBuy = async (e) => {
    e.preventDefault();
    if (!orderingProduct) return;

    try {
      await createOrder({
        consumerId: currentUser ? currentUser.id : "usr_consumer1",
        consumerName: currentUser ? currentUser.name : "Priya Sharma",
        productId: orderingProduct.id,
        quantity: Number(buyQuantity),
        deliveryAddress
      });

      setSuccessMsg(`🎉 Order placed successfully for ${buyQuantity} ${orderingProduct.unit} of ${orderingProduct.name}!`);
      setOrderingProduct(null);
      fetchProduce();

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert('Order failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">🌾 Fresh Products Near You</h1>
          <p className="page-subtitle">Direct from verified local farmers in Coimbatore & Tamil Nadu</p>
        </div>
      </div>

      {successMsg && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '14px', borderRadius: '12px', marginBottom: '20px', fontWeight: 600 }}>
          {successMsg}
        </div>
      )}

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '38px' }}
            placeholder="Search produce by location (e.g. Coimbatore, Salem)"
            value={searchLocation}
            onChange={e => setSearchLocation(e.target.value)}
          />
        </div>

        <select className="form-select" style={{ width: '200px' }} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains & Pulses</option>
          <option value="Nuts & Grains">Nuts & Oilseeds</option>
        </select>
      </div>

      {/* Produce Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {products.map(product => (
          <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <span className="badge badge-success" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  Fresh Harvest
                </span>
              </div>

              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>🥕 {product.name}</h3>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#166534' }}>₹{product.price}/{product.unit}</span>
                </div>

                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                  Farmer: <strong>{product.farmerName}</strong>
                </div>

                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="#166534" /> <strong>{product.location}</strong>
                </div>

                <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '16px' }}>
                  Available: <span style={{ color: '#0f172a', fontWeight: 700 }}>{product.remaining} {product.unit}</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '0 18px 18px 18px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setOrderingProduct(product)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <ShoppingCart size={16} /> Add to Cart / Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      {orderingProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', maxWidth: '440px', width: '90%' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Order {orderingProduct.name}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Farmer: {orderingProduct.farmerName} • ₹{orderingProduct.price}/{orderingProduct.unit}</p>

            <form onSubmit={handleQuickBuy}>
              <div className="form-group">
                <label className="form-label">Quantity to Purchase ({orderingProduct.unit})</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={orderingProduct.remaining}
                  className="form-input"
                  value={buyQuantity}
                  onChange={e => setBuyQuantity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                />
              </div>

              <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Total Amount:</span>
                <span style={{ color: '#166534', fontSize: '18px' }}>₹{(buyQuantity * orderingProduct.price).toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Confirm Order
                </button>
                <button type="button" onClick={() => setOrderingProduct(null)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerDashboard;
