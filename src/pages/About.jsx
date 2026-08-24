import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { attorneys } from '../data/attorneys';
import { useSEO } from '../hooks/useSEO';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'אודות המשרד | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'משרד ברזילי, עזורי ושות׳ עורכי דין בפתח תקווה — שני שותפים, התמחות בנדל"ן, התחדשות עירונית, צוואות, ירושות וייפוי כוח מתמשך.',
    canonicalPath: '/about',
  });

  return (
    <div className="legal-page-wrapper">
      <section className="pa-hero" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <h1 className="pa-hero-title">אודות המשרד</h1>
          <p className="pa-hero-sub">ליווי משפטי אישי, מקצועי ומדויק — משרד ברזילי, עזורי ושות׳</p>
          <div className="pa-hero-actions">
            <Link to="/contact" className="btn-primary">לתיאום פגישת ייעוץ</Link>
          </div>
        </div>
      </section>

      <main>
        <div className="content-card">
          <div className="intro-box">
            <p>
              משרד ברזילי, עזורי ושות׳ עורכי דין הוא משרד בוטיק המספק ליווי משפטי אישי ומקצועי בפתח תקווה
              ובמרכז הארץ, בהובלת שני שותפים המתמחים כל אחד בתחומו. המשרד מלווה אנשים פרטיים, משפחות, יזמים
              ומשקיעים בעסקאות נדל״ן, פרויקטי התחדשות עירונית, רישום זכויות בטאבו, וכן בתכנון עתידי — צוואות,
              ירושות וייפוי כוח מתמשך.
            </p>
            <p style={{ marginTop: '0.6rem', marginBottom: 0 }}>
              הגישה שלנו מבוססת על ירידה לפרטים, שקיפות מלאה מול הלקוח ונגישות אישית לאורך כל התהליך — ממעמד
              הפנייה הראשונה ועד סיום הטיפול המשפטי בפועל.
            </p>
          </div>

          <div className="section">
            <h2>השותפים במשרד</h2>
            {attorneys.map((a) => (
              <div key={a.slug} style={{ marginBottom: '1.5rem' }}>
                <h3>
                  <Link to={`/attorneys/${a.slug}`}>{a.name}</Link>
                  {a.role ? ` — ${a.role}` : ''}
                </h3>
                {a.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="section">
            <h2>תחומי עיסוק</h2>
            <p>
              המשרד מתמחה בעסקאות נדל״ן (רכישה, מכירה והשקעה), פרויקטי התחדשות עירונית (תמ״א 38 ופינוי-בינוי),
              רישום זכויות בטאבו, רישום בתים משותפים, וכן בתחום הצוואות, הירושות וניהול העיזבונות וייפוי כוח
              מתמשך. לפירוט מלא ראו את <Link to="/practice-areas">עמוד תחומי העיסוק</Link>.
            </p>
          </div>

          <div className="section">
            <h2>פרטי התקשרות</h2>
            <p>
              משרדנו ממוקם בזאב ז׳בוטינסקי 61, פתח תקווה. ניתן לפנות אלינו בטלפון, בוואטסאפ או באמצעות
              <Link to="/contact"> טופס יצירת הקשר</Link> ונשיב בהקדם האפשרי.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
