import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

// Check for updates every hour
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Сайтын шинэ хувилбар гарлаа. Шинэчлэх үү?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('Апп офлайн горимд ажиллахад бэлэн боллоо.');
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
