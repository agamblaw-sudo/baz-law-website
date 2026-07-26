import React, { useState, useEffect } from 'react';

/*
 * Logo reveal animation — code-driven (no video), modeled on the reference
 * wordmark intro: each character enters as a thin vertical bar that unfurls
 * (skew + scaleY) into its final letterform, staggered left-to-right, at a
 * contained on-screen size (not full-bleed) on a dark overlay that fades to
 * reveal the site.
 */

const T = {
  leave: 4200,
  done: 5000,
};

function RevealText({ text, className, startMs, step = 32 }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="logo-intro__char"
          style={{ animationDelay: `${startMs + i * step}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

export default function LogoIntro() {
  const [phase, setPhase] = useState('hold'); // 'hold' | 'leaving' | 'done'

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sessionStorage.getItem('baz-intro-shown') || reduced) {
      setPhase('done');
      sessionStorage.setItem('baz-intro-shown', '1');
      return;
    }
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('leaving'), T.leave);
    const t2 = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
      sessionStorage.setItem('baz-intro-shown', '1');
    }, T.done);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`logo-intro${phase === 'leaving' ? ' logo-intro--leaving' : ''}`} aria-hidden="true">
      <div className="logo-intro__mark">
        <span className="logo-intro__rule" />
        <div className="logo-intro__stack">
          <RevealText text="BA" className="logo-intro__ba" startMs={0} step={90} />
          <RevealText text="ברזילי, עזורי ושות׳ - עורכי דין" className="logo-intro__he" startMs={550} step={22} />
          <span className="logo-intro__line" style={{ animationDelay: '1350ms' }} />
          <RevealText text="BARZILAY AZURY | LAW FIRM" className="logo-intro__en" startMs={1500} step={26} />
        </div>
      </div>
    </div>
  );
}
