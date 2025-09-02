import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError('Product not found');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    const result = await addToCart(product.id, quantity);
    
    if (result.success) {
      alert('Product added to cart!');
    } else {
      alert(result.error || 'Failed to add product to cart');
    }
    
    setAddingToCart(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error-message">
          <p>{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-image-section">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            {product.brand && (
              <p className="product-brand">by {product.brand}</p>
            )}

            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">{product.rating} out of 5</span>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>

            <div className="product-price">
              {formatPrice(product.price)}
            </div>

            <div className="product-description">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-details">
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{product.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Stock:</span>
                <span className="detail-value">
                  {product.stockQuantity > 0 ? `${product.stockQuantity} available` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>

          <div className="product-purchase-section">
            <div className="purchase-box">
              <div className="price-section">
                <div className="price">{formatPrice(product.price)}</div>
              </div>

              <div className="quantity-section">
                <label htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="quantity-select"
                >
                  {[...Array(Math.min(10, product.stockQuantity))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-primary add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={addingToCart || product.stockQuantity === 0}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>

              {product.stockQuantity === 0 && (
                <p className="out-of-stock">Currently unavailable</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
