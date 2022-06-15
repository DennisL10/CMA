import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
//import Home from './pages/Home';
import User from './pages/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <User />
  </React.StrictMode>
);
