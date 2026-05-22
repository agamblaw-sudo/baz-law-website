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
          <img src="/logo-footer.png" className="footer-logo-img" alt="ברזילי, עזורי ושות׳ עורכי דין" />
        </Link>
        <p className="footer-brand-about">משרד עורכי דין המתמחה בעסקאות נדל&quot;ן, התחדשות עירונית, צוואות וירושות, רישום זכויות בטאבו, רישום בתים משותפים וייפוי כוח מתמשך. ליווי משפטי מקצועי, אישי ואמין לאורך כל הדרך.</p>
      </div>

      {/* Col 2: ניווט מהיר */}
      <div className="footer-col">
        <h4>ניווט מהיר</h4>
        <ul>
          <li><a href="/#attorneys">אודות המשרד</a></li>
          <li><a href="/#expertise">תחומי התמחות</a></li>
          <li><a href="/#testimonials">המלצות</a></li>
          <li><a href="/#contact">מיקום המשרד</a></li>
          <li><a href="/#lead-form">צור קשר</a></li>
        </ul>
      </div>

      {/* Col 3: תחומי התמחות */}
      <div className="footer-col">
        <h4>תחומי התמחות</h4>
        <ul>
          <li><a href="/#expertise">עסקאות נדל&quot;ן</a></li>
          <li><a href="/#expertise">התחדשות עירונית</a></li>
          <li><a href="/#expertise">רישום זכויות</a></li>
          <li><a href="/#expertise">רישום בתים משותפים</a></li>
          <li><a href="/#expertise">צוואות וירושות</a></li>
          <li><a href="/#expertise">ייפוי כוח מתמשך</a></li>
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
