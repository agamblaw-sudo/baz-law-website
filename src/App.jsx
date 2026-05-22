import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppWidget from './components/WhatsAppWidget';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Accessibility from './pages/Accessibility';
import { scrollToHash } from './services/scrollService';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/accessibility" element={<Accessibility />} />
      </Routes>
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
