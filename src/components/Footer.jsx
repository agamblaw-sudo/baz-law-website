import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer dir="rtl">
      {/* ═══ FOOTER ═══ */}
  <div className="footer-inner">

    {/* ── 4-column grid ── */}
    <div className="footer-grid">

      {/* Col 1: מיתוג */}
      <div className="footer-brand">
                <Link to="/" className="footer-logo-link" aria-label="ברזילי, עזורי ושות' עורכי דין">
          <picture>
            <source srcSet="/logo-footer.webp" type="image/webp" />
            <img src="/logo-footer.png" className="footer-logo-img" alt="ברזילי, עזורי ושות׳ עורכי דין" width="320" height="95" />
          </picture>
        </Link>
        <p className="footer-brand-about">משרד עורכי דין המתמחה בעסקאות נדל&quot;ן, התחדשות עירונית, צוואות וירושות, רישום זכויות בטאבו, רישום בתים משותפים וייפוי כוח מתמשך. ליווי משפטי מקצועי, אישי ואמין לאורך כל הדרך.</p>
        <div className="footer-social-wrapper" style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="https://wa.me/972542030535"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-btn"
            aria-label="צרו קשר בוואטסאפ"
            title="וואטסאפ"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61590961314809"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-facebook-btn"
            aria-label="דף הפייסבוק של המשרד"
            title="פייסבוק"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Col 2: ניווט מהיר */}
      <div className="footer-col">
        <h3>ניווט מהיר</h3>
        <ul>
          <li><a href="/#attorneys">אודות המשרד</a></li>
          <li><Link to="/practice-areas">תחומי התמחות</Link></li>
          <li><a href="/#testimonials">המלצות</a></li>
          <li><a href="/#contact">מיקום המשרד</a></li>
          <li><a href="/#lead-form">צור קשר</a></li>
        </ul>
      </div>

      {/* Col 3: תחומי התמחות */}
      <div className="footer-col">
        <h4>תחומי התמחות</h4>
        <ul>
          <li><Link to="/practice-areas/nadlan">עסקאות נדל&quot;ן</Link></li>
          <li><Link to="/practice-areas/hitkhadshut-ironit">התחדשות עירונית</Link></li>
          <li><Link to="/practice-areas/tabu">רישום זכויות</Link></li>
          <li><Link to="/practice-areas/batim-meshotafim">רישום בתים משותפים</Link></li>
          <li><Link to="/practice-areas/tzovaot-yerushot">צוואות וירושות</Link></li>
          <li><Link to="/practice-areas/yipuy-koach">ייפוי כוח מתמשך</Link></li>
        </ul>
      </div>

      {/* Col 4: פרטי התקשרות */}
      <div className="footer-contact">
        <h4>פרטי התקשרות</h4>

        <div className="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>זאב ז&#x27;בוטינסקי 61<br />פתח תקווה</span>
        </div>

        <div className="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <span>
            <a href="https://wa.me/972542030535" target="_blank" rel="noopener" className="footer-wa-link">054-2030535 (אגם)</a><br />
            <a href="https://wa.me/972542531925" target="_blank" rel="noopener" className="footer-wa-link">054-2531925 (לירון)</a>
          </span>
        </div>

        <div className="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:office@baz-law.co.il">office@baz-law.co.il</a>
        </div>

        <div className="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>ראשון עד חמישי: 09:00 עד 18:00</span>
        </div>

        <div className="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
          <a href="https://www.facebook.com/profile.php?id=61590961314809" target="_blank" rel="noopener noreferrer">עמוד הפייסבוק של המשרד</a>
        </div>

        <a href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIICAEQRRgnGDsyDggCEEUYORhDGIAEGIoFMgYIAxBFGDsyDAgEEAAYQxiABBiKBTIGCAUQRRg8MgYIBhBFGD0yBggHEEUYPdIBBzg5MWowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=il&sa=X&geocode=KZVxm3NtSx0VMdPRYn1cLs70&daddr=%D7%9E%D7%92%D7%93%D7%9C%D7%99+%D7%91%D7%A1%D7%A8+%D7%A1%D7%99%D7%98%D7%99%2C+%D7%96%D7%90%D7%91+%D7%96%27%D7%91%D7%95%D7%98%D7%A0%D7%A1%D7%A7%D7%99+61%2C+%D7%A4%D7%AA%D7%97+%D7%AA%D7%A7%D7%95%D7%95%D7%94" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          נווט למשרד
        </a>
      </div>

    </div>{/* /footer-grid */}

    {/* ── Bottom bar: copyright ← rule → legal links ── */}
    <div className="footer-bottom">
      {/* RTL start (right): copyright */}
      <p className="footer-copyright">© 2026 ברזילי, עזורי ושות&#x27; עורכי דין. כל הזכויות שמורות.</p>

      {/* RTL end (left): legal links + admin — all inline */}
      <div className="footer-bottom-end">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-a11y'))} 
          className="footer-bottom-links"
          style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
          type="button"
        >
          נגישות
        </button>
        <span aria-hidden="true" className="footer-sep">|</span>
        <Link to="/accessibility" className="footer-bottom-links">הצהרת נגישות</Link>
        <span aria-hidden="true" className="footer-sep">|</span>
        <Link to="/privacy" className="footer-bottom-links">מדיניות פרטיות</Link>
        <span aria-hidden="true" className="footer-sep">|</span>
        <Link to="/terms" className="footer-bottom-links">תקנון ותנאי שימוש</Link>
        <span aria-hidden="true" className="footer-sep">|</span>
        <a href="#" className="footer-admin-link">ניהול</a>
      </div>
    </div>{/* /footer-bottom */}

  </div>{/* /footer-inner */}
</footer>
  );
}
