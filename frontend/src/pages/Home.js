import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get('search');
  const category = searchParams.get('category');

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      let url = '/api/products';
      
      if (searchTerm) {
        url = `/api/products/search?keyword=${encodeURIComponent(searchTerm)}`;
      } else if (category) {
        url = `/api/products/category/${encodeURIComponent(category)}`;
      }
      
      const response = await axios.get(url);
      setProducts(response.data || []);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    if (searchTerm) {
      return `Search results for "${searchTerm}"`;
    } else if (category) {
      return category;
    }
    return 'Featured Products';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        {!searchTerm && !category && (
          <div className="hero">
            <div className="hero-content">
              <h1>Welcome to <span className="brand-highlight">RedZone</span> Store</h1>
              <p>Discover premium products with <span className="accent-text">unbeatable prices</span></p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">24+</span>
                  <span className="stat-label">Premium Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5★</span>
                  <span className="stat-label">Customer Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="products-section">
          <div className="section-header">
            <h2>{getPageTitle()}</h2>
            {products.length > 0 && (
              <span className="results-count">
                {products.length} result{products.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {products.length === 0 && !error ? (
            <div className="no-products">
              <p>No products found</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Categories Section */}
        {!searchTerm && !category && (
          <div className="categories-section">
            <h2>Shop by Category</h2>
            <div className="categories-grid">
              <div className="category-card">
                <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300" alt="Electronics" />
                <h3>Electronics</h3>
              </div>
              <div className="category-card">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" alt="Books" />
                <h3>Books</h3>
              </div>
              <div className="category-card">
                <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=300" alt="Clothing" />
                <h3>Clothing</h3>
              </div>
              <div className="category-card">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300" alt="Home & Kitchen" />
                <h3>Home & Kitchen</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
