import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-icon">
        {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="notification-message">{message}</span>
      <button 
        className="notification-close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
