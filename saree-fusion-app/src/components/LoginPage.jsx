// src/components/Login.jsx
import React, { useState } from 'react';
// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'; 
import sareeImageSource from '../assets/womenimage.png' // Ensure you have an image in this path
import Spinner from 'react-bootstrap/esm/Spinner';

export const Login = ({onLoginSuccess}) => {
  const [name, setName] = useState('');
  const navigate = useNavigate(); // Initialize the hook
  const [isLoading , setIsLoading] = useState(false)
  const handleLogin = (e) => {
    e.preventDefault(); 
    setIsLoading(true)
    const base_url = import.meta.env.VITE_API_URL
    
    const get_user = async () => {
      try {const form = new FormData()
    form.append("username", name)
          const response = await fetch(`${base_url}/get_user`, {
              method: "POST",
              body: form
          });
          if (response.status === 406) {
            alert("User not found");
            return; // Stop the function here
        }

        // 2. Check for other errors (404, 500, etc.)
        if (!response.ok) {
          
            alert(`An error occurred: ${response.status}`);
            return;
        }
          // 1. Convert the raw response into a JSON object
          const data = await response.json();
  
          // 2. Access the _id field
          const userId = data._id;
          
          console.log("User ID:", userId); // Output: 6920a8daf91e056be69a8b39
          onLoginSuccess(userId)
          setIsLoading(false)
          navigate('/'); 
  
      } catch (error) {
          console.alert("Error:", error);
          setIsLoading(false)
      }
      finally{
        setIsLoading(false)
      }
  }
get_user()

  
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
  {/* 1. Added quotes around "Login" */}
  {/* 2. Added size="sm" to make the spinner fit inside the button */}
  {isLoading ? (
    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
  ) : (
    "Login"
  )}
</button>
          </form>
        </div>
      </div>
    </div>
  );
};

