import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    shippingAddress: '',
    paymentMethod: 'Credit Card'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/orders', formData);
      
      if (response.data) {
        alert('Order placed successfully!');
        await clearCart();
        navigate('/orders');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some products before checkout</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3>Shipping Information</h3>
                <div className="form-group">
                  <label htmlFor="shippingAddress" className="form-label">
                    Shipping Address *
                  </label>
                  <textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    className="form-input"
                    rows="3"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    placeholder={user?.address || "Enter your shipping address"}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="form-group">
                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit Card"
                        checked={formData.paymentMethod === 'Credit Card'}
                        onChange={handleChange}
                      />
                      <span>Credit Card</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Debit Card"
                        checked={formData.paymentMethod === 'Debit Card'}
                        onChange={handleChange}
                      />
                      <span>Debit Card</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="PayPal"
                        checked={formData.paymentMethod === 'PayPal'}
                        onChange={handleChange}
                      />
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary place-order-btn"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {cart.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.product.imageUrl} alt={item.product.name} />
                    <div className="item-info">
                      <p className="item-name">{item.product.name}</p>
                      <p className="item-details">
                        Qty: {item.quantity} × {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <div className="item-total">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>{formatPrice(getCartTotal() * 0.08)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(getCartTotal() * 1.08)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
