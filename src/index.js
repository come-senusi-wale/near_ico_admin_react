import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initContract } from "./near/utils";

const root = ReactDOM.createRoot(document.getElementById('root'));

  window.nearInitPromise = initContract()
  .then(() => {
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    
  })
  .catch(console.error)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
