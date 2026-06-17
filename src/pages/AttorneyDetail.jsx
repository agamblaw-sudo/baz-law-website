import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getAttorneyBySlug } from '../data/attorneys';
import { useSEO } from '../hooks/useSEO';
import useReveal from '../hooks/useReveal';

export default function AttorneyDetail() {
  const { slug } = useParams();
  const attorney = getAttorneyBySlug(slug);

  const [profileRef, profileVisible] = useReveal();
  const [eduRef, eduVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useSEO(
    attorney
      ? { title: attorney.seoTitle, description: attorney.metaDescription }
      : {}
  );

  if (!attorney) return <Navigate to="/#attorneys" replace />;

  const message = encodeURIComponent(`היי! הגעתי דרך האתר, אשמח לדבר עם ${attorney.nameShort}.`);
  const whatsappUrl = `https://wa.me/${attorney.whatsapp}?text=${message}`;

  return (
    <main className="pa-page" role="main">

      {/* ── Hero ── */}
      <section className="pa-hero pa-hero-attorney" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <span className="section-label" style={{ color: 'var(--gold-mid)' }}>הצוות שלנו</span>
          <h1 className="pa-hero-title">{attorney.name}</h1>
          <p className="pa-hero-sub">{attorney.role} | ברזילי, עזורי ושות׳ עורכי דין</p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="pa-content">

        {/* Profile card */}
        <section ref={profileRef} className="pa-section pa-section-intro" aria-labelledby="profile-heading">
          <div className="pa-section-inner attorney-profile-layout">

            <div className={`attorney-left-column reveal-slide-left ${profileVisible ? 'active' : ''}`}>
              <div className="attorney-detail-photo-wrap">
                <img
                  src={attorney.photo}
                  alt={attorney.name}
                  style={{ objectPosition: attorney.photoPosition }}
                />
                <div className="attorney-detail-badge">{attorney.role}</div>
              </div>

              <div className="attorney-contact-row">
                <a href={`tel:${attorney.phone}`} className="attorney-contact-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {attorney.phone}
                </a>
                <a href={`mailto:${attorney.email}`} className="attorney-contact-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {attorney.email}
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="attorney-contact-btn attorney-contact-wa">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  וואטסאפ
                </a>
              </div>
            </div>

            <div className={`attorney-detail-info reveal-slide-right ${profileVisible ? 'active' : ''}`}>
              <h2 id="profile-heading" className="pa-section-title" style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                {attorney.name}
              </h2>
              {attorney.bio.map((para, i) => (
                <p key={i} className="pa-intro-text" style={{ marginBottom: '1.25rem' }}>{para}</p>
              ))}

              <div className="attorney-certification-badge">
                <div className="attorney-certification-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="attorney-certification-text">
                  מוסמך לעריכת ייפוי כוח מתמשך מטעם משרד המשפטים ולשכת עורכי הדין
                </span>
              </div>
            </div>
          </div>
        </section>



        {/* Education */}
        <section ref={eduRef} className="pa-section" aria-labelledby="edu-heading">
          <div className="pa-section-inner">
            <span className={`section-label reveal-fade-up ${eduVisible ? 'active' : ''}`}>השכלה</span>
            <h2 id="edu-heading" className={`pa-section-title reveal-fade-up ${eduVisible ? 'active' : ''}`}>השכלה אקדמית</h2>
            <div className="pa-process-grid pa-process-grid--no-line" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '560px', margin: '0 auto' }}>
              {attorney.education.map((edu, i) => (
                <div key={i} className={`pa-process-step reveal-fade-up ${eduVisible ? 'active' : ''}`} style={{ transitionDelay: `${i * 100}ms`, textAlign: 'center' }}>
                  <div className="pa-step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="pa-step-title">{edu.degree}</h3>
                  <p className="pa-step-desc">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={ctaRef} className={`pa-cta-band reveal-fade-up ${ctaVisible ? 'active' : ''}`} aria-label="קריאה לפעולה">
          <div className="pa-cta-inner">
            <h2>רוצים לדבר עם {attorney.nameShort}?</h2>
            <p>צרו קשר ישירות לפגישת ייעוץ ראשונה — אנחנו כאן בשבילכם.</p>
            <div className="pa-cta-btns">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                שלחו הודעה בוואטסאפ
              </a>
              <Link to="/#attorneys" className="btn-ghost">הצוות שלנו</Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
