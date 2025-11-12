import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Make sure this path matches where you saved the code

// 1. Import Bootstrap CSS
// This line loads all Bootstrap styles globally for your application.
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. You might have a base CSS file for global styles or font settings.
// import './index.css'; 

// 3. Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);