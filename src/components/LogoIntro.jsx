import React, { useState, useEffect } from 'react';

export default function LogoIntro() {
  const [phase, setPhase] = useState('hold'); // 'hold' | 'leaving' | 'done'

  useEffect(() => {
    if (sessionStorage.getItem('baz-intro-shown')) {
      setPhase('done');
      return;
    }
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('leaving'), 1600);
    const t2 = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
      sessionStorage.setItem('baz-intro-shown', '1');
    }, 2450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`logo-intro${phase === 'leaving' ? ' logo-intro--leaving' : ''}`} aria-hidden="true">
      <div className="logo-intro__logo">
        <img src="/logo-transparent.png" alt="" width="280" height="83" draggable="false" />
        <div className="logo-intro__shimmer" />
      </div>
    </div>
  );
}
