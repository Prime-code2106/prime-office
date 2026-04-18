/**
 * APPLICATION ENTRY POINT
 * This file renders the React application to the DOM
 * 
 * DEVELOPER NOTE: This is the main entry point for the React application
 * It imports the root App component and renders it to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Import global CSS styles
import '../styles/globals.css';

// Create root element and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);