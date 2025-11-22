// src/components/Login.jsx
import React, { useState } from 'react';
// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'; 
import sareeImageSource from '../assets/womenimage.png' // Ensure you have an image in this path

export const Login = ({onLoginSuccess}) => {
  const [name, setName] = useState('');
  const navigate = useNavigate(); // Initialize the hook

  const handleLogin = (e) => {
    e.preventDefault(); 
    if (name.trim()) {
      // 1. Log the action
      console.log(`User "${name}" is attempting to log in.`);
      onLoginSuccess(name.trim());
      // 2. Simulate authentication success (optional alert, then navigate)
      // alert(`Welcome, ${name}! Redirecting to home page...`); // You can remove this alert
      
      // 3. Navigate to the Home page ('/')
      // This is the key change to make the button go to the home route.
      navigate('/'); 

    } else {
      alert('Please enter your name to proceed.');
    }
  };

  return (
    <div className="login-page-container">
      {/* Left Section: Saree Image (Existing code) */}
      <div className="login-image-section">
        <img
          src={sareeImageSource}
          alt="Woman selecting a saree"
          className="saree-image"
        />
      </div>

      {/* Right Section: Login Form (Existing code) */}
      <div className="login-form-section">
        <div className="login-form-card">
          <h2 className="login-title">Saree Fusion</h2>
          <p className="login-subtitle">Discover the elegance of tradition</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

