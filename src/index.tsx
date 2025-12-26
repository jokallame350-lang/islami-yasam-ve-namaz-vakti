import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // CSS dosyasını buraya bağlıyoruz

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element bulunamadı");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);