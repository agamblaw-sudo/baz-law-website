import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  // Trigger fade-in only after the component has mounted on the client.
  // This prevents the hero content from "jumping" in during hydration and
  // ensures the animation always runs from opacity:0 → opacity:1 smoothly.
  useEffect(() => {
    // rAF ensures paint is complete before we add the class
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Drop `will-change` once the one-shot entrance animation finishes — it's
  // a hint for imminent motion, not a standing instruction to keep these
  // layers promoted for the rest of the session.
  useEffect(() => {
    if (!mounted || !sectionRef.current) return;
    const section = sectionRef.current;
    const handleAnimationEnd = (e) => {
      e.target.style.willChange = 'auto';
    };
    section.addEventListener('animationend', handleAnimationEnd);
    return () => section.removeEventListener('animationend', handleAnimationEnd);
  }, [mounted]);

  return (
    <section ref={sectionRef} className={`hero${mounted ? ' hero-mounted' : ''}`}>
      <div className="hero-bg-text">חוק</div>
      <div className="hero-content">
        <h1>
          ברזילי, עזורי ושות׳
          <span>עורכי דין</span>
        </h1>
        <p className="hero-sub">
          מקצועיות חסרת פשרות, ירידה לפרטים וליווי אישי צמוד — בעסקאות נדל"ן, התחדשות עירונית, ירושות וצוואות.
        </p>
        <div className="hero-actions">
          <a href="/#lead-form" className="btn-primary">לתיאום פגישת ייעוץ</a>
        </div>
      </div>
    </section>
  );
}
