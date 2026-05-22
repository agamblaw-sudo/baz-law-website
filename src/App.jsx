import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppWidget from './components/WhatsAppWidget';
import { scrollToHash } from './services/scrollService';

// Lazy-load heavy pages to enable code-splitting (reduces initial bundle / TBT)
const Home = lazy(() => import('./pages/Home'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Accessibility = lazy(() => import('./pages/Accessibility'));

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    scrollToHash(hash);
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isLegalPage = ['/terms', '/privacy', '/accessibility'].includes(location.pathname);

  return (
    <>
      <ScrollToHash />
      {!isLegalPage && <Navbar />}
      <AccessibilityWidget />
      <WhatsAppWidget isLegalPage={isLegalPage} />
      <ScrollToTop />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#10293f' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/accessibility" element={<Accessibility />} />
        </Routes>
      </Suspense>
      {!isLegalPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
