import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/api';
import { PlusCircle, Image, ArrowRight } from 'lucide-react';

const AddProduct = ({ currentUser }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('kg');
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState(currentUser?.location || 'Coimbatore');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct({
        farmerId: currentUser ? currentUser.id : 'usr_farmer1',
        farmerName: currentUser ? currentUser.name : 'Ravi Kumar',
        name,
        category,
        totalStock: Number(quantity),
        price: Number(price),
        unit,
        harvestDate,
        location,
        image
      });

      navigate('/farmer/my-products');
    } catch (err) {
      alert('Error listing product: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add New Farm Produce</h1>
          <p className="page-subtitle">List your harvested crops directly to local buyers</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Fresh Red Tomatoes / Paddy / Groundnut"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains & Pulses</option>
                <option value="Nuts & Grains">Nuts & Oilseeds</option>
                <option value="Spices">Spices & Herbs</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                required
                className="form-input"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Harvest Quantity</label>
              <input
                type="number"
                required
                min="1"
                className="form-input"
                placeholder="e.g. 500"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Unit</label>
              <select className="form-select" value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="kg">Kilograms (kg)</option>
                <option value="quintal">Quintal (100 kg)</option>
                <option value="ton">Ton</option>
                <option value="boxes">Boxes</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price per Unit (₹)</label>
              <input
                type="number"
                required
                min="1"
                className="form-input"
                placeholder="e.g. 28"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Harvest Date</label>
              <input
                type="date"
                required
                className="form-input"
                value={harvestDate}
                onChange={e => setHarvestDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Product Image URL</label>
              <input
                type="text"
                className="form-input"
                placeholder="Image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '12px' }}>
            {loading ? 'Publishing Product...' : 'Publish Product to Marketplace'} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
