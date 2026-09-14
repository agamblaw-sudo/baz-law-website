import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only unset (never asked) shows the banner — a prior "rejected" choice
    // is respected and not re-prompted on every visit.
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to make the entry animation feel organic
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    if (window.__loadConsentedScripts) window.__loadConsentedScripts();
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  return (
    <div className="cookie-consent-banner-wrap">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="cookie-consent-banner"
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <div className="cookie-consent-content">
              <p className="cookie-consent-text">
                אתר זה משתמש ב-Cookies כדי לשפר את חווית הגלישה שלך. המשך השימוש באתר מהווה הסכמה למדיניות הפרטיות שלנו.{' '}
                <Link to="/privacy" className="cookie-consent-link">
                  לקריאת הצהרת הפרטיות
                </Link>
                .
              </p>
              <div className="cookie-consent-actions">
                <button className="cookie-consent-btn cookie-consent-btn-secondary" onClick={handleReject} aria-label="דחה קוקיז לא חיוניים">
                  דחה
                </button>
                <button className="cookie-consent-btn" onClick={handleAccept} aria-label="אשר שימוש בקוקיז">
                  אשר
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
