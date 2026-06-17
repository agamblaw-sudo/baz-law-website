import React from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';

export default function Attorneys() {
  const [sectionRef, isVisible] = useReveal();

  return (
    <section ref={sectionRef} className="attorneys" id="attorneys">
      <h2 className={`section-title reveal-fade-up ${isVisible ? 'active' : ''}`} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>אודות</h2>
      <div className="attorneys-grid">

        {/* ── עו"ד אגם ברזילי ── */}
        <Link to="/attorneys/agam-brazili" className={`attorney-card attorney-card-link reveal-slide-left ${isVisible ? 'active' : ''}`}>
          <div className="attorney-photo-wrap">
            <img src="/attorney-agam.jpg" alt='עו"ד אגם ברזילי' style={{ objectPosition: 'center top' }} />
            <div className="attorney-photo-badge">שותף</div>
          </div>
          <div className="attorney-body">
            <h3>עו"ד אגם ברזילי</h3>
            <p className="attorney-bio">
              עו"ד אגם ברזילי מעניק ליווי משפטי אישי ויסודי, מתוך מחויבות לשמירה על האינטרסים של לקוחותיו ולהבטחת שקט נפשי לאורך כל התהליך. את הניסיון המעשי שלו רכש במשרד עורכי דין מוביל ובחברת יזמות בולטת, רקע המקנה לו ראייה עסקית מעמיקה והבנה של שני צידי המתרס.
            </p>
            <span className="attorney-read-more">קראו עוד ←</span>
          </div>
        </Link>

        {/* ── עו"ד לירון עזורי ── */}
        <Link to="/attorneys/liron-azouri" className={`attorney-card attorney-card-link reveal-slide-right ${isVisible ? 'active' : ''}`}>
          <div className="attorney-photo-wrap">
            <img src="/attorney-liron.jpg" alt='עו"ד לירון עזורי' />
            <div className="attorney-photo-badge">שותף</div>
          </div>
          <div className="attorney-body">
            <h3>עו"ד לירון עזורי</h3>
            <p className="attorney-bio">
              עו"ד לירון עזורי מביא עמו סטנדרט גבוה של מקצועיות, יסודיות ומסירות, מתוך מטרה להעניק לכל לקוח ביטחון וליווי משפטי צמוד. גישתו המשפטית משלבת הבנה חדה עם חשיבה פרקטית, המאפשרת לו לנווט תהליכים מורכבים ברגישות ובנחישות.
            </p>
            <span className="attorney-read-more">קראו עוד ←</span>
          </div>
        </Link>

      </div>
    </section>
  );
}
