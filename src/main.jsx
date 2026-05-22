import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Prevent the browser from restoring the previous scroll position on page load.
// Without this, the browser scrolls back to the bottom (last position) AFTER React
// mounts, and then smooth-scroll animates back to the top — causing the visible jump.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
