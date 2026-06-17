import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Accessibility() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-wrapper">

      <section className="pa-hero" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <span className="section-label" style={{ color: 'var(--gold-mid)' }}>מידע משפטי</span>
          <h1 className="pa-hero-title">הצהרת נגישות</h1>
          <p className="pa-hero-sub">מחויבותנו לנגישות ושוויון לכלל המשתמשים</p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(240,246,255,0.4)', marginTop: '0.75rem' }}>עודכן לאחרונה: 21 במאי 2026</p>
          <div className="pa-hero-actions">
            <Link to="/#lead-form" className="btn-primary">לתיאום פגישת ייעוץ</Link>
          </div>
        </div>
      </section>

      <main>
        <div className="content-card">

          <div className="intro-box">
            משרד ברזילי, עזורי ושות' מחויב לספק שירות שוויוני ונגיש לכלל האוכלוסייה, לרבות אנשים עם מוגבלות. הצהרה זו מפרטת את רמת הנגישות של אתר האינטרנט שלנו ומספקת מידע על תקנים שיושמו ודרכי יצירת קשר לשאלות ולהערות.
          </div>

          <div className="section">
            <h2>1. מחויבותנו לנגישות</h2>
            <p>משרד ברזילי, עזורי ושות' מאמין בערכי שוויון והזדמניות שוות לכולם. אנו פועלים באופן שוטף להנגשת האתר ולהבטיח נגישות מירבית לשירותי האינטרנט שלנו, בהתאם לדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013, ובהתאם לתקן הישראלי (ת"י 5568) בפורמט AA של WCAG 2.0.</p>
          </div>

          <div className="section">
            <h2>2. התאמות נגישות שבוצעו באתר</h2>
            <p>באתר זה הוטמעו מספר התאמות נגישות, ביניהן:</p>
            <ul>
              <li>מבנה היררכי תקין של כותרות וסימון סמנטי נכון</li>
              <li>ניווט באמצעות מקלדת בלבד (Tab, Enter, חיצים)</li>
              <li>תמיכה בתוכנות קוראות מסך (Screen Readers)</li>
              <li>תגיות ALT לתמונות ואלמנטים גרפיים</li>
              <li>ניגודיות צבעים מותאמת לקריאה נוחה</li>
              <li>פונטים ברורים וגדלים נוחים לקריאה</li>
              <li>שפה פשוטה וברורה בתכנים</li>
              <li>תמיכה בהגדלה/הקטנה של טקסט באמצעות הדפדפן</li>
              <li>מנגנון דילוג לתוכן הראשי (Skip to main content)</li>
              <li>קישורים ברורים עם תיאור משמעותי</li>
            </ul>
          </div>

          <div className="section">
            <h2>3. סביבת גלישה נתמכת</h2>
            <p>האתר תוכנן להיות נגיש בדפדפנים העיקריים ומותאם לגלישה באמצעות:</p>
            <ul>
              <li><strong>דפדפנים:</strong> Chrome, Firefox, Safari, Edge (בגרסאות עדכניות)</li>
              <li><strong>מערכות הפעלה:</strong> Windows, MacOS, iOS, Android</li>
              <li><strong>טכנולוגיות מסייעות:</strong> JAWS, NVDA, VoiceOver, TalkBack</li>
              <li><strong>התקני קלט:</strong> מקלדת, עכבר, מסך מגע, טכנולוגיות מסייעות נוספות</li>
            </ul>
          </div>

          <div className="section">
            <h2>4. חלקים באתר שאינם נגישים (אם ישנם)</h2>
            <p>למרות מאמצינו להנגשת כל חלקי האתר, ייתכן שקיימים חלקים מסוימים שטרם הונגשו במלואם. במקרה כזה, אנו פועלים לשיפור מתמיד. אם נתקלתם בקושי נגישות או במידע שאינו נגיש עבורכם, אנא עדכנו אותנו ונעשה כמיטב יכולתנו לסייע.</p>
          </div>

          <div className="section">
            <h2>5. אופן יצירת קשר לנושאי נגישות</h2>
            <p>אם נתקלתם בבעיית נגישות באתר, או אם יש לכם שאלות או הצעות לשיפור הנגישות, אנו מזמינים אתכם ליצור עמנו קשר:</p>
            <div className="contact-box">
              <p><strong>רכז/ת נגישות:</strong> משרד ברזילי, עזורי ושות' עורכי דין</p>
              <p><strong>כתובת המשרד:</strong> מגדלי ב.ס.ר, רחוב ז'בוטינסקי 61, פתח תקווה</p>
              <p><strong>דוא"ל:</strong> <a href="mailto:office@baz-law.co.il">office@baz-law.co.il</a></p>
            </div>
            <p style={{ marginTop: '1rem' }}>אנו מתחייבים לטפל בכל פנייה בנושא נגישות בהקדם האפשרי.</p>
          </div>

          <div className="section">
            <h2>6. שיפורים מתמשכים</h2>
            <p>המשרד מתחייב להמשיך ולעדכן ולשפר את רמת הנגישות של האתר באופן שוטף. אנו מבצעים בדיקות תקופתיות ומיישמים התאמות נוספות במטרה להנגיש את האתר לגוון רחב ככל האפשר של משתמשים.</p>
          </div>

          <div className="section">
            <h2>7. תאריך ביקורת נגישות אחרון</h2>
            <p>האתר נבדק לאחרונה לרמת נגישות בתאריך: <strong>21 במאי 2026</strong></p>
          </div>

          <div className="section">
            <h2>8. הסדרים פיזיים במשרד</h2>
            <p>המשרד נמצא בבניין נגיש הכולל:</p>
            <ul>
              <li>כניסה נגישה לבניין</li>
              <li>מעליות נגישות לכלל הקומות</li>
              <li>חניית נכים יעודית במתחם</li>
              <li>שירותי נכים נגישים בקומת המשרד</li>
            </ul>
            <p>אנו ממליצים לתאם פגישה מראש על מנת שנוכל להכין את כל ההסדרים הנדרשים עבורכם.</p>
          </div>

          <div className="section">
            <h2>9. פנייה לממונה על הנגישות במשרד המשפטים</h2>
            <p>אם פנייתכם בנושא נגישות האתר לא טופלה באופן מלאה או שלא קיבלתם מענה מספק, ניתן לפנות גם לממונה על הנגישות במשרד המשפטים:</p>
            <div className="contact-box">
              <p><strong>הממונה על הנגישות במשרד המשפטים</strong></p>
              <p><strong>טלפון:</strong> 02-6466347</p>
              <p><strong>דוא"ל:</strong> <a href="mailto:accessibility@justice.gov.il">accessibility@justice.gov.il</a></p>
              <p><strong>כתובת:</strong> רחוב שער משה 5, ירושלים</p>
            </div>
          </div>
        </div>

        <div className="bottom-actions-section">
          <p className="help-text">יש לכם שאלות? אנחנו כאן לעזור.</p>
          <div className="bottom-actions-container">
            <Link
              to="/#lead-form"
              className="btn-legal-contact"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              צרו קשר
            </Link>
            <Link
              to="/"
              className="btn-legal-back"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </main>

      <footer className="page-footer" role="contentinfo">
        &copy; {new Date().getFullYear()} ברזילי, עזורי ושות' עורכי דין. כל הזכויות שמורות.
        <br />
        <Link to="/accessibility">הצהרת נגישות</Link> |{' '}
        <Link to="/privacy">מדיניות פרטיות</Link> |{' '}
        <Link to="/terms">תקנון ותנאי שימוש</Link>
      </footer>
    </div>
  );
}
