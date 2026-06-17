import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from 'radix-ui';

export default function AccessibilityWidget() {
  const STORAGE_KEY = 'baz-a11y-v5';

  const defaultState = {
    largeWidget: false,
    textSize: 100, // 100, 110, 120, 130
    textSpacing: false,
    contrast: false,
    invert: false,
    grayscale: false,
    links: false,
    headers: false,
    readableFont: false,
    largeCursor: false,
    contrastCursor: false,
    stopAnimations: false,
    readingMask: false,
    largeClickable: false,
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
  const [maskTop, setMaskTop] = useState(0);

  // Reading mask mouse tracking
  useEffect(() => {
    if (!state.readingMask) return;
    const handleMouseMove = (e) => {
      setMaskTop(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [state.readingMask]);

  // Sync classes to <html> tag
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}

    const html = document.documentElement;
    
    // Text size levels
    html.classList.toggle('a11y-size-100', state.textSize === 100);
    html.classList.toggle('a11y-size-110', state.textSize === 110);
    html.classList.toggle('a11y-size-120', state.textSize === 120);
    html.classList.toggle('a11y-size-130', state.textSize === 130);

    // Other toggles
    html.classList.toggle('a11y-text-spacing',     state.textSpacing);
    html.classList.toggle('a11y-high-contrast',    state.contrast);
    html.classList.toggle('a11y-invert',           state.invert);
    html.classList.toggle('a11y-grayscale',        state.grayscale);
    html.classList.toggle('a11y-links',            state.links);
    html.classList.toggle('a11y-headers',          state.headers);
    html.classList.toggle('a11y-readable-font',    state.readableFont);
    html.classList.toggle('a11y-large-cursor',     state.largeCursor);
    html.classList.toggle('a11y-contrast-cursor',  state.contrastCursor);
    html.classList.toggle('a11y-no-anim',          state.stopAnimations);
    html.classList.toggle('a11y-large-clickable',  state.largeClickable);
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

  const cycleTextSize = () => {
    setState(prev => {
      let nextSize = 100;
      if (prev.textSize === 100) nextSize = 110;
      else if (prev.textSize === 110) nextSize = 120;
      else if (prev.textSize === 120) nextSize = 130;
      return { ...prev, textSize: nextSize };
    });
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
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="a11y-hdr">
              <DialogTitle className="a11y-hdr-title">הגדרות נגישות</DialogTitle>
              <div className="a11y-hdr-left">
                <span className="a11y-large-widget-label">תפריט גדול</span>
                <button 
                  className={`a11y-switch ${state.largeWidget ? 'active' : ''}`}
                  onClick={() => toggleFeature('largeWidget')}
                  type="button"
                  aria-label="תפריט גדול"
                  aria-pressed={state.largeWidget}
                >
                  <span className="a11y-switch-knob"></span>
                </button>
                <button className="a11y-close-circle" id="a11y-close" aria-label="סגור תפריט" onClick={closePanel} type="button">✕</button>
              </div>
            </div>

            {/* Accessibility Features List */}
            <div className="a11y-grid" role="group" aria-label="אפשרויות הנגשת האתר">
              
              {/* A. Text Size Stepper */}
              <button 
                className={`a11y-card ${state.textSize > 100 ? 'active' : ''}`} 
                onClick={cycleTextSize}
                type="button"
                aria-label="הגדלת טקסט"
                aria-pressed={state.textSize > 100}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3M9 20h6M12 4v16M7 20h4M13 20h4"/></svg>
                </div>
                <span className="a11y-card-title">גודל גופן: {state.textSize}%</span>
              </button>

              {/* B. Text Spacing */}
              <button 
                className={`a11y-card ${state.textSpacing ? 'active' : ''}`} 
                onClick={() => toggleFeature('textSpacing')}
                type="button"
                aria-label="ריווח טקסט משופר"
                aria-pressed={state.textSpacing}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8l4 4-4 4M6 8l-4 4 4 4M2 12h20"/></svg>
                </div>
                <span className="a11y-card-title">ריווח טקסט</span>
              </button>

              {/* C. High Contrast */}
              <button 
                className={`a11y-card ${state.contrast ? 'active' : ''}`} 
                onClick={() => toggleFeature('contrast')}
                type="button"
                aria-label="ניגודיות גבוהה"
                aria-pressed={state.contrast}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20V2z" fill="currentColor"/></svg>
                </div>
                <span className="a11y-card-title">ניגודיות גבוהה</span>
              </button>

              {/* D. Invert Colors */}
              <button 
                className={`a11y-card ${state.invert ? 'active' : ''}`} 
                onClick={() => toggleFeature('invert')}
                type="button"
                aria-label="היפוך צבעים"
                aria-pressed={state.invert}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
                </div>
                <span className="a11y-card-title">היפוך צבעים</span>
              </button>

              {/* E. Grayscale */}
              <button 
                className={`a11y-card ${state.grayscale ? 'active' : ''}`} 
                onClick={() => toggleFeature('grayscale')}
                type="button"
                aria-label="תצוגת מונוכרום גווני אפור"
                aria-pressed={state.grayscale}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/></svg>
                </div>
                <span className="a11y-card-title">גווני אפור</span>
              </button>

              {/* F. Highlight Links */}
              <button 
                className={`a11y-card ${state.links ? 'active' : ''}`} 
                onClick={() => toggleFeature('links')}
                type="button"
                aria-label="הדגשת קישורים"
                aria-pressed={state.links}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </div>
                <span className="a11y-card-title">הדגשת קישורים</span>
              </button>

              {/* G. Highlight Headers */}
              <button 
                className={`a11y-card ${state.headers ? 'active' : ''}`} 
                onClick={() => toggleFeature('headers')}
                type="button"
                aria-label="הדגשת כותרות"
                aria-pressed={state.headers}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                </div>
                <span className="a11y-card-title">הדגשת כותרות</span>
              </button>

              {/* H. Readable Font */}
              <button 
                className={`a11y-card ${state.readableFont ? 'active' : ''}`} 
                onClick={() => toggleFeature('readableFont')}
                type="button"
                aria-label="גופן קריא מובנה"
                aria-pressed={state.readableFont}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <span className="a11y-card-title">גופן קריא</span>
              </button>

              {/* I1. Large Cursor */}
              <button 
                className={`a11y-card ${state.largeCursor ? 'active' : ''}`} 
                onClick={() => toggleFeature('largeCursor')}
                type="button"
                aria-label="סמן עכבר מוגדל"
                aria-pressed={state.largeCursor}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
                </div>
                <span className="a11y-card-title">סמן עכבר גדול</span>
              </button>

              {/* I2. Contrast Cursor */}
              <button 
                className={`a11y-card ${state.contrastCursor ? 'active' : ''}`} 
                onClick={() => toggleFeature('contrastCursor')}
                type="button"
                aria-label="סמן עכבר בניגודיות גבוהה"
                aria-pressed={state.contrastCursor}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" stroke="currentColor" fill="none"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="3 3"/></svg>
                </div>
                <span className="a11y-card-title">סמן ניגודי</span>
              </button>

              {/* J. Stop Animations */}
              <button 
                className={`a11y-card ${state.stopAnimations ? 'active' : ''}`} 
                onClick={() => toggleFeature('stopAnimations')}
                type="button"
                aria-label="עצירת הנפשות ותנועות באתר"
                aria-pressed={state.stopAnimations}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>
                </div>
                <span className="a11y-card-title">ביטול הנפשות</span>
              </button>

              {/* K. Reading Mask */}
              <button 
                className={`a11y-card ${state.readingMask ? 'active' : ''}`} 
                onClick={() => toggleFeature('readingMask')}
                type="button"
                aria-label="מסכת קריאה למיקוד קשב"
                aria-pressed={state.readingMask}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="2"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </div>
                <span className="a11y-card-title">מסכת קריאה</span>
              </button>

              {/* L. Large Clickable Areas */}
              <button 
                className={`a11y-card ${state.largeClickable ? 'active' : ''}`} 
                onClick={() => toggleFeature('largeClickable')}
                type="button"
                aria-label="הגדלת שטחי מגע וכפתורים"
                aria-pressed={state.largeClickable}
              >
                <div className="a11y-card-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M12 7v10M7 12h10"/></svg>
                </div>
                <span className="a11y-card-title">הגדלת כפתורים</span>
              </button>

            </div>

            {/* M. Accessibility Declaration Statement */}
            <div className="a11y-declaration">
              <h4>הצהרת נגישות</h4>
              <p>אנו משקיעים מאמצים להנגיש את האתר בהתאם להנחיות WCAG 2.1 ברמה AA, במטרה לאפשר חוויית שימוש נוחה ושוויונית לכלל המשתמשים.</p>
              <p>במידה ונתקלתם בקושי או בתקלה בנושא נגישות, נשמח לקבל פנייה ולטפל בה בהקדם.</p>
              <div className="a11y-decl-contacts">
                <div><strong>אחראי נגישות:</strong> ברזילי, עזורי ושות׳ עורכי דין</div>
                <div><strong>טלפון:</strong> 054-2030535</div>
                <div><strong>אימייל:</strong> office@baz-law.co.il</div>
              </div>
              <p className="a11y-decl-channels">פנייה זמינה גם בוואטסאפ / טופס יצירת קשר.</p>
              <div className="a11y-decl-date">עודכן לאחרונה: 17.06.2026</div>
            </div>

            {/* Widget Footer */}
            <div className="a11y-footer">
              <button className="a11y-footer-btn" onClick={switchSide} type="button" aria-label="החלפת צד של כפתור הנגישות">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M8 21H3v-5M21 3L14 10M3 21l7-7"/></svg>
                החלף צד
              </button>
              <button className="a11y-footer-btn" onClick={hideWidget} type="button" aria-label="הסתרת כפתור הנגישות מהמסך">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                הסתר כפתור
              </button>
              <button className="a11y-footer-btn" onClick={resetAll} type="button" aria-label="איפוס כל הגדרות הנגישות">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 3h5v5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 21H3v-5"/></svg>
                איפוס
              </button>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {/* Reading Mask Render element overlay */}
      {state.readingMask && (
        <div 
          className="a11y-reading-mask" 
          style={{ top: `${maskTop - 25}px` }} 
          aria-hidden="true" 
        />
      )}

      {/* Hide Alert Toast */}
      {showHideAlert && (
        <div className="a11y-toast-alert" role="alert" aria-live="polite">
          <span>כפתור הנגישות הוסתר. ניתן לפתוח את התפריט בכל עת על ידי לחיצה על <strong>Alt + A</strong> במקלדת או דרך קישור הנגישות בתחתית האתר.</span>
          <button onClick={() => setShowHideAlert(false)} aria-label="סגור הודעה" type="button">✕</button>
        </div>
      )}
    </>
  );
}
