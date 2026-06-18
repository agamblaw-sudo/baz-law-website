import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // Trigger fade-in only after the component has mounted on the client.
  // This prevents the hero content from "jumping" in during hydration and
  // ensures the animation always runs from opacity:0 → opacity:1 smoothly.
  useEffect(() => {
    // rAF ensures paint is complete before we add the class
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`hero${mounted ? ' hero-mounted' : ''}`}>
      <div className="hero-bg-text">חוק</div>
      <div className="hero-content">
        <h1>
          ייעוץ משפטי
          <span>מקצועי ואישי</span>
        </h1>
        <p className="hero-sub">
          משרדנו מעניק ליווי משפטי מקצועי, אישי ומדוייק מתוך מחויבות מלאה לשירות, זמינות ותוצאה מיטיבה עבור כל לקוח, בכל שלבי העסקה.
        </p>
        <div className="hero-actions">
          <a href="/#lead-form" className="btn-primary">לתיאום פגישת ייעוץ</a>
        </div>
      </div>
    </section>
  );
}
