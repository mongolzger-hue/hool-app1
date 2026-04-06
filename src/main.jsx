import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

// Check for updates every hour
const updateSW = registerSW({
  onNeedRefresh() {
    if (window.confirm('Сайтын шинэ хувилбар гарлаа. Шинэчлэх үү?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    // App is ready for offline use
  },
});

import { Component } from 'react';

// Simple Error Boundary to catch fatal render errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CRITICAL ERROR CAUGHT BY BOUNDARY:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', background: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
          <h1>🛑 Системд алдаа гарлаа</h1>
          <p>Дараах алдаанаас болж программ зогслоо:</p>
          <pre style={{ background: '#333', padding: '15px', borderRadius: '8px', color: '#ff4d4d', overflow: 'auto' }}>
            {this.state.error?.message}
          </pre>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', background: '#FFA500', border: 'none', borderRadius: '5px' }}
          >
            Нүүр хуудас руу буцах
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
