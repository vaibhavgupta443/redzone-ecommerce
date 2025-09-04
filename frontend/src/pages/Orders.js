import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#ff9900';
      case 'CONFIRMED':
        return '#0066c0';
      case 'SHIPPED':
        return '#8b5cf6';
      case 'DELIVERED':
        return '#059669';
      case 'CANCELLED':
        return '#dc2626';
      default:
        return '#666';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Your Orders</h1>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {orders.length === 0 && !error ? (
          <div className="no-orders">
            <h2>No orders found</h2>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-total">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="shipping-info">
                    <h4>Shipping Address:</h4>
                    <p>{order.shippingAddress}</p>
                  </div>
                  
                  {order.paymentMethod && (
                    <div className="payment-info">
                      <h4>Payment Method:</h4>
                      <p>{order.paymentMethod}</p>
                    </div>
                  )}
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.product.imageUrl} alt={item.product.name} />
                      <div className="item-details">
                        <p className="item-name">{item.product.name}</p>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                        <p className="item-price">Price: {formatPrice(item.price)}</p>
                      </div>
                      <div className="item-total">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
