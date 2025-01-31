import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { BlogsProvider } from './context/useBlogContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BlogsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BlogsProvider>
    </UserProvider>
  </React.StrictMode>,
);
