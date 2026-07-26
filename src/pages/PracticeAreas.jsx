import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { practiceAreas } from '../data/practiceAreas';
import { useSEO } from '../hooks/useSEO';
import useReveal from '../hooks/useReveal';

const indexSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': 'https://baz-law.co.il/practice-areas',
      name: "ברזילי, עזורי ושות׳: תחומי התמחות",
      description: 'משרד עורכי דין המתמחה בנדל"ן, התחדשות עירונית, רישום זכויות, צוואות, ירושות וייפוי כוח מתמשך.',
      url: 'https://baz-law.co.il/practice-areas',
      provider: {
        '@type': 'LegalService',
        name: "ברזילי, עזורי ושות׳ עורכי דין",
        url: 'https://baz-law.co.il',
        address: {
          '@type': 'PostalAddress',
          streetAddress: "זאב ז'בוטינסקי 61",
          addressLocality: 'פתח תקווה',
          addressCountry: 'IL',
        },
        telephone: ['+972-54-2030535', '+972-54-2531925'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'דף הבית', item: 'https://baz-law.co.il' },
        { '@type': 'ListItem', position: 2, name: 'תחומי התמחות', item: 'https://baz-law.co.il/practice-areas' },
      ],
    },
  ],
};

export default function PracticeAreas() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [introRef, introVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  useSEO({
    title: "תחומי ההתמחות | ברזילי, עזורי ושות׳ עורכי דין",
    description: 'משרד ברזילי, עזורי ושות׳ מתמחה בנדל"ן, התחדשות עירונית, צוואות וירושות, רישום זכויות בטאבו, בתים משותפים וייפוי כוח מתמשך. בחרו את תחום ההתמחות שלכם.',
    keywords: 'תחומי התמחות, עורך דין נדל"ן, עורך דין מקרקעין, התחדשות עירונית, צוואות ירושות, פתח תקווה',
    canonicalPath: '/practice-areas',
    jsonLd: indexSchema,
  });

  return (
    <main className="pa-page" role="main">

      {/* ── Page Hero ── */}
      <section className="pa-hero pa-hero-list-page" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <h1 className="pa-hero-title">תחומי ההתמחות שלנו</h1>
          <p className="pa-hero-sub">
            ייצוג משפטי מקצועי ומחויב בתחומי הנדל"ן וההתמחויות המשלימות, מהייעוץ הראשוני ועד לסגירת העסקה.
          </p>
          <div className="pa-hero-actions">
            <Link to="/#lead-form" className="btn-primary">לתיאום פגישת ייעוץ</Link>
          </div>
        </div>
      </section>

      {/* ── Intro band ── */}
      <section ref={introRef} className={`pa-intro-band reveal-fade-up ${introVisible ? 'active' : ''}`}>
        <div className="pa-intro-inner">
          <p>
            משרד ברזילי, עזורי ושות׳ עורכי דין מעניק ליווי משפטי מקיף בתחומים שונים של חיי היומיום: עסקאות נדל"ן, התחדשות עירונית, צוואות, ירושות תכנון עיזבון, ניהול רכוש, ייפוי כח מתמשך ועוד. כל לקוח מקבל מענה אישי, מקצועי וזמין מתחילת הדרך ועד לסיומה.
          </p>
        </div>
      </section>

      {/* ── Practice Areas — typography-led numbered list ── */}
      <section ref={gridRef} className="pa-grid-section">
        <ol className="exp-list" aria-label="תחומי ההתמחות">
          {practiceAreas.map((area, index) => (
            <li
              key={area.slug}
              className={`exp-item reveal-fade-up ${gridVisible ? 'active' : ''}`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <Link to={`/practice-areas/${area.slug}`} className="exp-link" aria-label={`${area.title} — לפרטים נוספים`}>
                <span className="exp-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className="exp-body">
                  <h3 className="exp-title">{area.title}</h3>
                  <div className="exp-reveal">
                    <div className="exp-reveal-inner">
                      <p className="exp-desc">{area.intro.slice(0, 180)}…</p>
                      <span className="exp-cta">
                        לפרטים נוספים
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="19" y1="12" x2="5" y2="12"/>
                          <polyline points="12 19 5 12 12 5"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── CTA Band ── */}
      <section ref={ctaRef} className={`pa-cta-band reveal-fade-up ${ctaVisible ? 'active' : ''}`} aria-label="קריאה לפעולה">
        <div className="pa-cta-inner">
          <h2>מוכנים לצעד הבא?</h2>
          <p>צרו קשר לפגישת ייעוץ ראשונה: נשמח לבחון את הנסיבות שלכם ולהציע את הדרך הנכונה.</p>
          <div className="pa-cta-btns">
            <Link to="/#lead-form" className="btn-primary">
              לתיאום פגישת ייעוץ
            </Link>
            <Link to="/" className="btn-ghost">
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
