import React, { useEffect, useRef } from 'react';

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.body.appendChild(script);
      },
      { rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>לקוחות ממליצים</h2>
      <div className="elfsight-app-e1f8701f-fffa-4269-834d-28f7131068be" data-elfsight-app-lazy></div>
    </section>
  );
}
