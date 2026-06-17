import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from 'radix-ui';

export default function AccessibilityWidget() {
  const STORAGE_KEY = 'baz-a11y-v2';

  const defaultState = {
    largeWidget: false,
    contrast: false,
    links: false,
    largeText: false,
    textSpacing: false,
    anim: false,
    hideImages: false,
    dyslexia: false,
    largeCursor: false,
    titles: false,
    lineHeight: false,
    textAlign: false,
    saturation: false,
    position: 'left',
    hidden: false
  };

  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return defaultState;
  });

  const [panelOpen, setPanelOpen] = useState(false);
  const [showHideAlert, setShowHideAlert] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}

    const html = document.documentElement;
    html.classList.toggle('a11y-high-contrast', state.contrast);
    html.classList.toggle('a11y-links',         state.links);
    html.classList.toggle('a11y-large-text',    state.largeText);
    html.classList.toggle('a11y-text-spacing',   state.textSpacing);
    html.classList.toggle('a11y-no-anim',        state.anim);
    html.classList.toggle('a11y-hide-images',    state.hideImages);
    html.classList.toggle('a11y-dyslexia',       state.dyslexia);
    html.classList.toggle('a11y-large-cursor',   state.largeCursor);
    html.classList.toggle('a11y-titles',         state.titles);
    html.classList.toggle('a11y-line-height',    state.lineHeight);
    html.classList.toggle('a11y-text-align',     state.textAlign);
    html.classList.toggle('a11y-saturation',     state.saturation);
  }, [state]);

  // Keyboard shortcut listener (Alt + A / Alt + ש)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'ש')) {
        e.preventDefault();
        setPanelOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to custom window event to open widget from Footer links
  useEffect(() => {
    const handleOpen = () => {
      setPanelOpen(true);
      // If it was hidden, show it again
      setState(prev => ({ ...prev, hidden: false }));
    };
    window.addEventListener('open-a11y', handleOpen);
    return () => window.removeEventListener('open-a11y', handleOpen);
  }, []);

  // Hide toast alert after 6 seconds
  useEffect(() => {
    if (showHideAlert) {
      const t = setTimeout(() => setShowHideAlert(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showHideAlert]);

  const closePanel = () => setPanelOpen(false);

  const toggleFeature = (key) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const switchSide = () => {
    setState(prev => ({ ...prev, position: prev.position === 'left' ? 'right' : 'left' }));
  };

  const hideWidget = () => {
    setState(prev => ({ ...prev, hidden: true }));
    setShowHideAlert(true);
    closePanel();
  };

  const resetAll = () => {
    setState(defaultState);
  };

  return (
    <>
      <Dialog open={panelOpen} onOpenChange={setPanelOpen}>
        {!state.hidden && (
          <DialogTrigger asChild>
            <button 
              id="a11y-btn" 
              className={`${state.position === 'right' ? 'a11y-pos-right' : 'a11y-pos-left'} ${panelOpen ? "open" : ""}`}
              aria-label="הגדרות נגישות" 
              title="הגדרות נגישות"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <circle cx="12" cy="4" r="2.2"/>
                <path d="M19 8H5l1.6 5.5H10V22h4V13.5h3.4L19 8z"/>
              </svg>
            </button>
          </DialogTrigger>
        )}

        <DialogPortal>
          <DialogPrimitive.Content 
            id="a11y-panel" 
            className={`a11y-open ${state.largeWidget ? 'a11y-large' : ''} ${state.position === 'right' ? 'a11y-pos-right' : 'a11y-pos-left'}`} 
            aria-describedby={undefined}
            dir="rtl"
          >
            {/* Header */}
            <div className="a11y-hdr">
              <DialogTitle className="a11y-hdr-title">הגדרות נגישות</DialogTitle>
              <div className="a11y-hdr-left">
                <span className="a11y-large-widget-label">יישומון גדול</span>
                <button 
                  className={`a11y-switch ${state.largeWidget ? 'active' : ''}`}
                  onClick={() => toggleFeature('largeWidget')}
                  type="button"
                  aria-label="יישומון גדול"
                >
                  <span className="a11y-switch-knob"></span>
                </button>
                <button className="a11y-close-circle" id="a11y-close" aria-label="סגור" onClick={closePanel} type="button">✕</button>
              </div>
            </div>

            {/* 12 Features Grid */}
            <div className="a11y-grid">
              
              {/* 1. High Contrast */}
              <button 
                className={`a11y-card ${state.contrast ? 'active' : ''}`} 
                onClick={() => toggleFeature('contrast')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20V2z" fill="currentColor"/></svg>
                </div>
                <span className="a11y-card-title">+ ניגודיות</span>
              </button>

              {/* 2. Highlight Links */}
              <button 
                className={`a11y-card ${state.links ? 'active' : ''}`} 
                onClick={() => toggleFeature('links')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </div>
                <span className="a11y-card-title">הדגשת קישורים</span>
              </button>

              {/* 3. Large Text */}
              <button 
                className={`a11y-card ${state.largeText ? 'active' : ''}`} 
                onClick={() => toggleFeature('largeText')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3M9 20h6M12 4v16M7 20h4M13 20h4"/></svg>
                </div>
                <span className="a11y-card-title">טקסט גדול</span>
              </button>

              {/* 4. Text Spacing */}
              <button 
                className={`a11y-card ${state.textSpacing ? 'active' : ''}`} 
                onClick={() => toggleFeature('textSpacing')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8l4 4-4 4M6 8l-4 4 4 4M2 12h20"/></svg>
                </div>
                <span className="a11y-card-title">ריווח טקסט</span>
              </button>

              {/* 5. Stop Animations */}
              <button 
                className={`a11y-card ${state.anim ? 'active' : ''}`} 
                onClick={() => toggleFeature('anim')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>
                </div>
                <span className="a11y-card-title">ביטול הנפשות</span>
              </button>

              {/* 6. Hide Images */}
              <button 
                className={`a11y-card ${state.hideImages ? 'active' : ''}`} 
                onClick={() => toggleFeature('hideImages')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <span className="a11y-card-title">הסתרת תמונות</span>
              </button>

              {/* 7. Dyslexia Friendly */}
              <button 
                className={`a11y-card ${state.dyslexia ? 'active' : ''}`} 
                onClick={() => toggleFeature('dyslexia')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><text x="2" y="17" fontStyle="normal" fontWeight="900" fontSize="14" fill="currentColor">Df</text></svg>
                </div>
                <span className="a11y-card-title">תמיכה בדיסלקסיה</span>
              </button>

              {/* 8. Cursor */}
              <button 
                className={`a11y-card ${state.largeCursor ? 'active' : ''}`} 
                onClick={() => toggleFeature('largeCursor')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
                </div>
                <span className="a11y-card-title">סמן</span>
              </button>

              {/* 9. Titles */}
              <button 
                className={`a11y-card ${state.titles ? 'active' : ''}`} 
                onClick={() => toggleFeature('titles')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="15"/><circle cx="12" cy="7" r="0.5" fill="currentColor"/></svg>
                </div>
                <span className="a11y-card-title">תארים</span>
              </button>

              {/* 10. Line Height */}
              <button 
                className={`a11y-card ${state.lineHeight ? 'active' : ''}`} 
                onClick={() => toggleFeature('lineHeight')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M5 20V4M2 7l3-3 3 3M2 17l3 3 3-3"/></svg>
                </div>
                <span className="a11y-card-title">גובה שורה</span>
              </button>

              {/* 11. Text Alignment */}
              <button 
                className={`a11y-card ${state.textAlign ? 'active' : ''}`} 
                onClick={() => toggleFeature('textAlign')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
                </div>
                <span className="a11y-card-title">יישור טקסט</span>
              </button>

              {/* 12. Saturation */}
              <button 
                className={`a11y-card ${state.saturation ? 'active' : ''}`} 
                onClick={() => toggleFeature('saturation')}
                type="button"
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/></svg>
                </div>
                <span className="a11y-card-title">רוויה</span>
              </button>

            </div>

            {/* Widget Footer */}
            <div className="a11y-footer">
              <button className="a11y-footer-btn" onClick={switchSide} type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M8 21H3v-5M21 3L14 10M3 21l7-7"/></svg>
                החלף צד
              </button>
              <button className="a11y-footer-btn" onClick={hideWidget} type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                הסתר כפתור
              </button>
              <button className="a11y-footer-btn" onClick={resetAll} type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 3h5v5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 21H3v-5"/></svg>
                איפוס
              </button>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {/* Hide Alert Toast */}
      {showHideAlert && (
        <div className="a11y-toast-alert" role="alert">
          <span>כפתור הנגישות הוסתר. ניתן לפתוח את התפריט בכל עת על ידי לחיצה על <strong>Alt + A</strong> במקלדת או דרך קישור הנגישות בתחתית האתר.</span>
          <button onClick={() => setShowHideAlert(false)} aria-label="סגור הודעה" type="button">✕</button>
        </div>
      )}
    </>
  );
}
