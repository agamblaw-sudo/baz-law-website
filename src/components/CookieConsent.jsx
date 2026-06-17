import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') {
      // Small delay to make the entry animation feel organic
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsFadingOut(true);
    // Wait for fade-out animation to complete before removing from DOM
    setTimeout(() => {
      localStorage.setItem('cookie-consent', 'accepted');
      setIsVisible(false);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-consent-banner ${isFadingOut ? 'fade-out' : ''}`} role="alert" aria-live="polite">
      <div className="cookie-consent-content">
        <p className="cookie-consent-text">
          אתר זה משתמש ב-Cookies כדי לשפר את חווית הגלישה שלך. המשך השימוש באתר מהווה הסכמה למדיניות הפרטיות שלנו.{' '}
          <Link to="/privacy" className="cookie-consent-link">
            לקריאת הצהרת הפרטיות
          </Link>
          .
        </p>
        <button className="cookie-consent-btn" onClick={handleAccept} aria-label="אשר שימוש בקוקיז">
          אשר
        </button>
      </div>
    </div>
  );
}
