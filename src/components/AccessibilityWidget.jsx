import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AccessibilityWidget() {
  const STORAGE_KEY = 'baz-a11y-v1';

  const [state, setState] = useState(() => {
    const defaultState = {
      fontSize: 100,
      font: false,
      contrast: 'normal',
      links: false,
      headings: false,
      anim: false,
      sr: false
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return defaultState;
  });

  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}

    const html = document.documentElement;
    html.style.fontSize = state.fontSize + '%';
    html.classList.toggle('a11y-font', state.font);
    html.classList.remove('a11y-high-contrast', 'a11y-invert', 'a11y-mono');
    if (state.contrast === 'high')   html.classList.add('a11y-high-contrast');
    if (state.contrast === 'invert') html.classList.add('a11y-invert');
    if (state.contrast === 'mono')   html.classList.add('a11y-mono');

    html.classList.toggle('a11y-links',    state.links);
    html.classList.toggle('a11y-headings', state.headings);
    html.classList.toggle('a11y-no-anim',  state.anim);
    html.classList.toggle('a11y-sr',       state.sr);
  }, [state]);

  const closePanel = () => setPanelOpen(false);

  const changeFontSize = (diff) => {
    setState(prev => ({
      ...prev,
      fontSize: Math.max(70, Math.min(200, prev.fontSize + diff))
    }));
  };

  const toggleFeature = (key) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setContrast = (mode) => {
    setState(prev => ({ ...prev, contrast: mode }));
  };

  const resetAll = () => {
    setState({
      fontSize: 100,
      font: false,
      contrast: 'normal',
      links: false,
      headings: false,
      anim: false,
      sr: false
    });
  };

  return (
    <>
      <Dialog open={panelOpen} onOpenChange={setPanelOpen}>
        <DialogTrigger asChild>
          <button 
            id="a11y-btn" 
            aria-label="הגדרות נגישות" 
            title="הגדרות נגישות"
            className={panelOpen ? "open" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <circle cx="12" cy="4" r="2.2"/>
              <path d="M19 8H5l1.6 5.5H10V22h4V13.5h3.4L19 8z"/>
            </svg>
          </button>
        </DialogTrigger>

        <DialogPortal>
          <DialogPrimitive.Content 
            id="a11y-panel" 
            className="a11y-open" 
            aria-describedby={undefined}
            dir="rtl"
          >
            <div className="a11y-hdr">
              <DialogTitle className="a11y-hdr-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
                הגדרות נגישות
              </DialogTitle>
              <button className="a11y-close-btn" id="a11y-close" aria-label="סגור" onClick={closePanel}>✕</button>
            </div>

            <div className="a11y-sec">
              <div className="a11y-sec-label">גודל טקסט</div>
              <div className="a11y-size-row">
                <button className="a11y-size-btn" id="a11y-plus" aria-label="הגדל טקסט" onClick={() => changeFontSize(10)}>+</button>
                <span className="a11y-size-val" id="a11y-size-val">{state.fontSize}%</span>
                <button className="a11y-size-btn" id="a11y-minus" aria-label="הקטן טקסט" onClick={() => changeFontSize(-10)}>−</button>
              </div>
            </div>

            <div className="a11y-sec">
              <div className="a11y-sec-label">גופן קריאה (Sans-Serif)</div>
              <div className="a11y-row-item">
                <Label htmlFor="a11y-toggle-font" className="cursor-pointer">גופן קריא לעיוורי צבעים / לקויי ראייה</Label>
                <Switch 
                  id="a11y-toggle-font" 
                  checked={state.font} 
                  onCheckedChange={() => toggleFeature('font')}
                />
              </div>
            </div>

            <div className="a11y-sec">
              <div className="a11y-sec-label">מצב ניגודיות</div>
              <div className="a11y-contrast-grid">
                <button className={`a11y-mode-btn ${state.contrast === 'normal' ? 'active' : ''}`} id="a11y-c-normal" onClick={() => setContrast('normal')}>רגיל</button>
                <button className={`a11y-mode-btn ${state.contrast === 'high' ? 'active' : ''}`} id="a11y-c-high" onClick={() => setContrast('high')}>ניגודיות גבוהה</button>
                <button className={`a11y-mode-btn ${state.contrast === 'invert' ? 'active' : ''}`} id="a11y-c-invert" onClick={() => setContrast('invert')}>הפוך</button>
                <button className={`a11y-mode-btn ${state.contrast === 'mono' ? 'active' : ''}`} id="a11y-c-mono" onClick={() => setContrast('mono')}>מונוכרום</button>
              </div>
            </div>

            <div className="a11y-sec">
              <div className="a11y-sec-label">הדגשת אלמנטים</div>
              
              <div className="a11y-row-item">
                <Label htmlFor="a11y-toggle-links" className="cursor-pointer">הדגש קישורים</Label>
                <Switch 
                  id="a11y-toggle-links" 
                  checked={state.links} 
                  onCheckedChange={() => toggleFeature('links')}
                />
              </div>

              <div className="a11y-row-item">
                <Label htmlFor="a11y-toggle-headings" className="cursor-pointer">הדגש כותרות</Label>
                <Switch 
                  id="a11y-toggle-headings" 
                  checked={state.headings} 
                  onCheckedChange={() => toggleFeature('headings')}
                />
              </div>
            </div>

            <div className="a11y-sec">
              <div className="a11y-sec-label">תוכן ותצוגה</div>

              <div className="a11y-row-item">
                <Label htmlFor="a11y-toggle-anim" className="cursor-pointer">בטל אנימציות</Label>
                <Switch 
                  id="a11y-toggle-anim" 
                  checked={state.anim} 
                  onCheckedChange={() => toggleFeature('anim')}
                />
              </div>

              <div className="a11y-row-item">
                <Label htmlFor="a11y-toggle-sr" className="cursor-pointer">קורא מסך (למפתחים)</Label>
                <Switch 
                  id="a11y-toggle-sr" 
                  checked={state.sr} 
                  onCheckedChange={() => toggleFeature('sr')}
                />
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <button className="a11y-reset-btn" id="a11y-reset" onClick={resetAll}>איפוס הגדרות</button>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}
