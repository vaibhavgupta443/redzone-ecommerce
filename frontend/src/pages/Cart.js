import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity === 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.product.imageUrl} alt={item.product.name} />
                  </div>
                  
                  <div className="item-details">
                    <Link to={`/product/${item.product.id}`} className="item-name">
                      {item.product.name}
                    </Link>
                    {item.product.brand && (
                      <p className="item-brand">by {item.product.brand}</p>
                    )}
                    <p className="item-price">{formatPrice(item.product.price)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                    <select
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                      className="quantity-select"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="item-total">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  
                  <div className="item-actions">
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary checkout-btn"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
