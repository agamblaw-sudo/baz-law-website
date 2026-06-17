import React from 'react';

export default function Hero() {
  // ═══ HERO ═══
  return (
    <section className="hero">
      <video 
        className="hero-video-bg" 
        src="/hero-bg.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
      />
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
