import React, { useState, useEffect, useCallback } from 'react';

/**
 * ScrollProgressBar
 * A fixed gold bar at the very top of the viewport that fills
 * left-to-right as the user scrolls down the page.
 * Uses a single passive scroll listener — no conflict with
 * existing scroll handlers.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY   = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      role="progressbar"
      aria-label="התקדמות גלילה בעמוד"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9999,
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #c9a84c 0%, #e8cc7a 60%, #c9a84c 100%)',
          boxShadow: '0 0 8px rgba(201,168,76,0.6)',
          transition: 'width 0.08s linear',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}
