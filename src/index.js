import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import './assets/css/aip.css';
import './assets/css/branding.css';
import './assets/css/Login.css';
import './assets/css/nav.css';
import './assets/css/notifications.css';
import './assets/css/sidenav.css';
import './assets/css/Style.css';
import './assets/css/search.css';
import './assets/css/responsive.css';
import './App.css';



import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
