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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
