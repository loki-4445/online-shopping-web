import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../src/contests/Usercontest/UserContext.jsx'; // Update this line

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContext>
    <App />
  </UserContext>
);
