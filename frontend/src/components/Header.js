import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <span className="logo-text">RedZone</span>
            </Link>

            {/* Search Bar */}
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search RedZone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {/* Right Side Navigation */}
            <div className="header-nav">
              {user ? (
                <>
                  <div className="nav-item">
                    <span className="nav-greeting">Hello, {user.firstName}</span>
                    <div className="nav-dropdown">
                      <Link to="/orders" className="dropdown-item">Your Orders</Link>
                      <button onClick={handleLogout} className="dropdown-item logout-btn">
                        Sign Out
                      </button>
                    </div>
                  </div>
                  <Link to="/cart" className="nav-item cart-link">
                    <div className="cart-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {getCartItemCount() > 0 && (
                        <span className="cart-count">{getCartItemCount()}</span>
                      )}
                    </div>
                    <span className="nav-text">Cart</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-item">
                    <span className="nav-text">Sign In</span>
                  </Link>
                  <Link to="/register" className="nav-item">
                    <span className="nav-text">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="header-nav-bar">
        <div className="container">
          <nav className="nav-links">
            <Link to="/?category=Electronics" className="nav-link">Electronics</Link>
            <Link to="/?category=Books" className="nav-link">Books</Link>
            <Link to="/?category=Clothing" className="nav-link">Clothing</Link>
            <Link to="/?category=Home & Kitchen" className="nav-link">Home & Kitchen</Link>
            <Link to="/?category=Sports & Outdoors" className="nav-link">Sports & Outdoors</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
