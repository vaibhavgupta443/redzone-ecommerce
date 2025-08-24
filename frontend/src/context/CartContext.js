import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post('/api/cart', {
        productId,
        quantity
      });
      
      // Update local cart state
      const existingItem = cart.items.find(item => item.product.id === productId);
      if (existingItem) {
        setCart(prevCart => ({
          ...prevCart,
          items: prevCart.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }));
      } else {
        // For demo purposes, we'll simulate adding the product
        // In a real app, the backend would return the updated cart
        setCart(prevCart => ({
          ...prevCart,
          items: [...prevCart.items, { 
            product: { id: productId }, 
            quantity 
          }]
        }));
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await axios.put(`/api/cart/update/${productId}?quantity=${quantity}`);
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update cart' 
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${productId}`);
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to remove from cart' 
      };
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart/clear');
      setCart({ items: [] });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to clear cart' 
      };
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
