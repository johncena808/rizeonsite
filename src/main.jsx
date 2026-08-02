import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// The prerendered build injects a static, crawlable copy of each page's
// content into #seo-content, outside #root, so crawlers that don't run
// JavaScript still see real text. Once React mounts and takes over the
// page, that fallback is no longer needed — remove it immediately so it
// never sits in the DOM as hidden duplicate content (which Google can
// flag as thin/cloaked content, since Googlebot does execute JS).
const seoFallback = document.getElementById('seo-content');
if (seoFallback) seoFallback.remove();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

