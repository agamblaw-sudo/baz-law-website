import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { useSEO } from '../hooks/useSEO';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'צור קשר | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'צרו קשר עם משרד ברזילי, עזורי ושות׳ עורכי דין: כתובת, טלפון, וואטסאפ, דוא"ל וטופס יצירת קשר לתיאום פגישת ייעוץ.',
    canonicalPath: '/contact',
  });

  return (
    <div className="legal-page-wrapper">
      <section className="pa-hero" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <h1 className="pa-hero-title">צור קשר</h1>
          <p className="pa-hero-sub">נשמח לעמוד לרשותכם ולתאם פגישת ייעוץ ראשונית</p>
        </div>
      </section>

      <main>
        <div className="content-card">
          <div className="intro-box">
            <p>
              ניתן לפנות למשרד ברזילי, עזורי ושות׳ עורכי דין בכל אחד מהאפיקים הבאים, או להשאיר פרטים בטופס
              שבהמשך העמוד ונשוב אליכם בהקדם האפשרי. המשרד פועל בימים א׳–ה׳ בין השעות 09:00–18:00.
            </p>
          </div>

          <div className="section">
            <h2>פרטי המשרד</h2>
            <p>
              <strong>כתובת:</strong> זאב ז׳בוטינסקי 61, פתח תקווה
              <br />
              <strong>דוא"ל:</strong> <a href="mailto:office@baz-law.co.il">office@baz-law.co.il</a>
              <br />
              <strong>שעות פעילות:</strong> ימים א׳–ה׳, 09:00–18:00
            </p>
          </div>

          <div className="section">
            <h2>יצירת קשר עם השותפים</h2>
            <p>
              <strong>עו"ד אגם ברזילי</strong> — טלפון ווואטסאפ:{' '}
              <a href="tel:054-2030535">054-2030535</a> · דוא"ל:{' '}
              <a href="mailto:agam@baz-law.co.il">agam@baz-law.co.il</a>
            </p>
            <p>
              <strong>עו"ד לירון עזורי</strong> — טלפון ווואטסאפ:{' '}
              <a href="tel:054-2531925">054-2531925</a> · דוא"ל:{' '}
              <a href="mailto:liron@baz-law.co.il">liron@baz-law.co.il</a>
            </p>
          </div>
        </div>

        <ContactForm />
      </main>
    </div>
  );
}
