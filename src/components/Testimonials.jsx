import React, { useEffect } from 'react';

export default function Testimonials() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="testimonials" id="testimonials">
      <h2 className="section-title" style={{ textAlign: 'center' }}>לקוחות ממליצים</h2>
      <div className="elfsight-app-e1f8701f-fffa-4269-834d-28f7131068be"></div>
    </section>
  );
}
