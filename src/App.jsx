import React, { useEffect, lazy, Suspense } from 'react';
import ScrollProgressBar from './components/ScrollProgressBar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppWidget from './components/WhatsAppWidget';
import ChatBot from './components/ChatBot';
import { scrollToHash } from './services/scrollService';
import Home from './pages/Home';
import CookieConsent from './components/CookieConsent';

// Lazy-load heavy pages to enable code-splitting (reduces initial bundle / TBT)
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const PracticeAreas = lazy(() => import('./pages/PracticeAreas'));
const PracticeAreaDetail = lazy(() => import('./pages/PracticeAreaDetail'));
const AttorneyDetail = lazy(() => import('./pages/AttorneyDetail'));

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
      <ScrollProgressBar />
      <ScrollToHash />
      <Navbar />
      <AccessibilityWidget />
      <WhatsAppWidget />
      <ChatBot />
      <ScrollToTop isLegalPage={isLegalPage} />
      <CookieConsent />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <div key={location.pathname} className="page-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/practice-areas/:slug" element={<PracticeAreaDetail />} />
            <Route path="/attorneys/:slug" element={<AttorneyDetail />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/accessibility" element={<Accessibility />} />
          </Routes>
        </div>
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
