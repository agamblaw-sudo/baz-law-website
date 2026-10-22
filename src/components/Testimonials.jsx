import React, { useEffect } from 'react';

const PROVIDER_URL = 'https://www.lawreviews.co.il/provider/azouri-liron';

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
      <span className="section-eyebrow">מה אומרים עלינו</span>
      <h2 className="section-title" style={{ textAlign: 'center' }}>לקוחות ממליצים</h2>
      <div className="reviews-grid">
        <div className="reviews-col">
          <h3>ביקורות Google</h3>
          <div className="elfsight-app-e1f8701f-fffa-4269-834d-28f7131068be"></div>
        </div>
        <div className="reviews-col">
          <h3>ביקורות LawReviews</h3>
          <iframe
            title="ביקורות לקוחות על ברזילי, עזורי ושות׳ - עורכי דין"
            src={`${PROVIDER_URL}/reviews-widget?show-header=false&slide-switch-interval=4500&bg=ffffff&controls-color=&r-text-color=&date-color=&main-text=&only-favorite=&logo=`}
            loading="lazy"
            allowFullScreen
          />
          <div dir="rtl" style={{ textAlign: 'center', marginTop: '1rem' }}>
            <a href={PROVIDER_URL} target="_blank" rel="noopener noreferrer">
              לכל חוות הדעת על ברזילי, עזורי ושות׳ - עורכי דין באתר LawReviews.co.il
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
