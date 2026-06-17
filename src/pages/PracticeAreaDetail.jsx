import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getPracticeAreaBySlug, buildLegalServiceSchema } from '../data/practiceAreas';
import { useSEO } from '../hooks/useSEO';
import useReveal from '../hooks/useReveal';

export default function PracticeAreaDetail() {
  const { slug } = useParams();
  const area = getPracticeAreaBySlug(slug);
  const [activeTab, setActiveTab] = React.useState(0);

  const [introRef, introVisible] = useReveal();
  const [servicesRef, servicesVisible] = useReveal();
  const [processRef, processVisible] = useReveal();
  const [whyRef, whyVisible] = useReveal();
  const [faqRef, faqVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab(0);
  }, [slug]);

  useSEO(
    area
      ? {
          title: area.seoTitle,
          description: area.metaDescription,
          keywords: area.keywords,
          canonicalPath: area.canonicalPath,
          jsonLd: buildLegalServiceSchema(area),
        }
      : {}
  );

  if (!area) return <Navigate to="/practice-areas" replace />;

  return (
    <main className="pa-page" role="main">

      {/* ── Page Hero ── */}
      <section className="pa-hero pa-hero-practice" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <span className="section-label" style={{ color: 'var(--gold-mid)' }}>תחום התמחות</span>
          <h1 className="pa-hero-title">{area.title}</h1>
          <p className="pa-hero-sub">{area.subtitle}</p>
          <div className="pa-hero-actions">
            <Link to="/#lead-form" className="btn-primary">לתיאום פגישת ייעוץ</Link>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="pa-content">

        {/* Intro */}
        <section ref={introRef} className={`pa-section pa-section-intro reveal-fade-up ${introVisible ? 'active' : ''}`} aria-label="מבוא">
          <div className="pa-section-inner">
            {area.slug === 'yipuy-koach' && (
              <h2 className="pa-section-title">על ייפוי הכוח המתמשך</h2>
            )}
            <p className="pa-intro-text">{area.intro}</p>
          </div>
        </section>

        {/* Services */}
        {area.slug !== 'yipuy-koach' && (
          <section ref={servicesRef} className="pa-section pa-section-alt" aria-labelledby="services-heading">
            <div className="pa-section-inner">
              <span className={`section-label reveal-fade-up ${servicesVisible ? 'active' : ''}`}>מה כולל הטיפול</span>
              <h2 id="services-heading" className={`pa-section-title reveal-fade-up ${servicesVisible ? 'active' : ''}`}>שירותים שאנו מציעים</h2>
              <div className="pa-services-grid" role="list">
                {area.services.map((svc, i) => (
                  <div key={i} className={`pa-service-item reveal-fade-up ${servicesVisible ? 'active' : ''}`} style={{ transitionDelay: `${i * 80}ms` }} role="listitem">
                    <div className="pa-service-check" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="pa-service-title">{svc.title}</h3>
                      <p className="pa-service-desc">{svc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process */}
        <section ref={processRef} className="pa-section pa-section-process" aria-labelledby="process-heading">
          <div className="pa-section-inner">
            <span className={`section-label reveal-fade-up ${processVisible ? 'active' : ''}`}>כיצד אנחנו עובדים</span>
            <h2 id="process-heading" className={`pa-section-title reveal-fade-up ${processVisible ? 'active' : ''}`}>תהליך העבודה</h2>
            
            {/* Flowchart Layout (CPOA, Snake Flowchart) */}
            {area.slug === 'yipuy-koach' && (
              <div className="cpoa-flow-snake-container animate-fade-in">
                {/* Step 1 */}
                <div className={`cpoa-flow-card grid-step-1 reveal-fade-up ${processVisible ? 'active' : ''}`}>
                  <div className="cpoa-flow-header">
                    <span className="cpoa-flow-num">01</span>
                    <h3 className="cpoa-flow-title">{area.process[0].title}</h3>
                  </div>
                  <p className="cpoa-flow-desc">{area.process[0].desc}</p>
                </div>

                {/* Arrow 1-2 */}
                <div className={`cpoa-flow-arrow grid-arrow-1-2 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '100ms' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-left">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </div>

                {/* Step 2 */}
                <div className={`cpoa-flow-card grid-step-2 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '150ms' }}>
                  <div className="cpoa-flow-header">
                    <span className="cpoa-flow-num">02</span>
                    <h3 className="cpoa-flow-title">{area.process[1].title}</h3>
                  </div>
                  <p className="cpoa-flow-desc">{area.process[1].desc}</p>
                </div>

                {/* Arrow 2-3 */}
                <div className={`cpoa-flow-arrow grid-arrow-2-3 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '250ms' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-left">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </div>

                {/* Step 3 */}
                <div className={`cpoa-flow-card grid-step-3 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '300ms' }}>
                  <div className="cpoa-flow-header">
                    <span className="cpoa-flow-num">03</span>
                    <h3 className="cpoa-flow-title">{area.process[2].title}</h3>
                  </div>
                  <p className="cpoa-flow-desc">{area.process[2].desc}</p>
                </div>

                {/* Arrow 3-4 */}
                <div className={`cpoa-flow-arrow grid-arrow-3-4 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '400ms' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-down">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>

                {/* Step 4 */}
                <div className={`cpoa-flow-card grid-step-4 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '450ms' }}>
                  <div className="cpoa-flow-header">
                    <span className="cpoa-flow-num">04</span>
                    <h3 className="cpoa-flow-title">{area.process[3].title}</h3>
                  </div>
                  <p className="cpoa-flow-desc">{area.process[3].desc}</p>
                </div>

                {/* Arrow 4-5 */}
                <div className={`cpoa-flow-arrow grid-arrow-4-5 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '550ms' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-right">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>

                {/* Step 5 */}
                <div className={`cpoa-flow-card grid-step-5 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '600ms' }}>
                  <div className="cpoa-flow-header">
                    <span className="cpoa-flow-num">05</span>
                    <h3 className="cpoa-flow-title">{area.process[4].title}</h3>
                  </div>
                  <p className="cpoa-flow-desc">{area.process[4].desc}</p>
                </div>

                {/* Arrow 5-6 */}
                <div className={`cpoa-flow-arrow grid-arrow-5-6 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '700ms' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-right">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>

                {/* Step 6 */}
                <div className={`cpoa-flow-card grid-step-6 highlight-step reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '750ms' }}>
                  <div className="cpoa-flow-header">
                    <span className="cpoa-flow-num">06</span>
                    <h3 className="cpoa-flow-title">{area.process[5].title}</h3>
                  </div>
                  <p className="cpoa-flow-desc">{area.process[5].desc}</p>
                </div>
              </div>
            )}

            {/* Default Grid Layout with Tabs (Real Estate - Snake Flowchart) */}
            {area.slug === 'nadlan' && area.processTabs && (
              <div className="nadlan-tabs-container">
                <div className="process-tabs-header" role="tablist">
                  {area.processTabs.map((tab, idx) => (
                    <button
                      key={tab.id}
                      className={`process-tab-btn ${activeTab === idx ? 'active' : ''}`}
                      onClick={() => setActiveTab(idx)}
                      role="tab"
                      aria-selected={activeTab === idx}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                
                {/* 6-step Snake Flowchart */}
                <div key={activeTab} className="cpoa-flow-snake-container animate-fade-in">
                  {/* Step 1 */}
                  <div className={`cpoa-flow-card grid-step-1 reveal-fade-up ${processVisible ? 'active' : ''}`}>
                    <div className="cpoa-flow-header">
                      <span className="cpoa-flow-num">01</span>
                      <h3 className="cpoa-flow-title">{area.processTabs[activeTab].steps[0].title}</h3>
                    </div>
                    <p className="cpoa-flow-desc">{area.processTabs[activeTab].steps[0].desc}</p>
                  </div>

                  {/* Arrow 1-2 */}
                  <div className={`cpoa-flow-arrow grid-arrow-1-2 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '100ms' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-left">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </div>

                  {/* Step 2 */}
                  <div className={`cpoa-flow-card grid-step-2 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '150ms' }}>
                    <div className="cpoa-flow-header">
                      <span className="cpoa-flow-num">02</span>
                      <h3 className="cpoa-flow-title">{area.processTabs[activeTab].steps[1].title}</h3>
                    </div>
                    <p className="cpoa-flow-desc">{area.processTabs[activeTab].steps[1].desc}</p>
                  </div>

                  {/* Arrow 2-3 */}
                  <div className={`cpoa-flow-arrow grid-arrow-2-3 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '250ms' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-left">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </div>

                  {/* Step 3 */}
                  <div className={`cpoa-flow-card grid-step-3 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '300ms' }}>
                    <div className="cpoa-flow-header">
                      <span className="cpoa-flow-num">03</span>
                      <h3 className="cpoa-flow-title">{area.processTabs[activeTab].steps[2].title}</h3>
                    </div>
                    <p className="cpoa-flow-desc">{area.processTabs[activeTab].steps[2].desc}</p>
                  </div>

                  {/* Arrow 3-4 */}
                  <div className={`cpoa-flow-arrow grid-arrow-3-4 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '400ms' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-down">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>

                  {/* Step 4 */}
                  <div className={`cpoa-flow-card grid-step-4 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '450ms' }}>
                    <div className="cpoa-flow-header">
                      <span className="cpoa-flow-num">04</span>
                      <h3 className="cpoa-flow-title">{area.processTabs[activeTab].steps[3].title}</h3>
                    </div>
                    <p className="cpoa-flow-desc">{area.processTabs[activeTab].steps[3].desc}</p>
                  </div>

                  {/* Arrow 4-5 */}
                  <div className={`cpoa-flow-arrow grid-arrow-4-5 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '550ms' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-right">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>

                  {/* Step 5 */}
                  <div className={`cpoa-flow-card grid-step-5 reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '600ms' }}>
                    <div className="cpoa-flow-header">
                      <span className="cpoa-flow-num">05</span>
                      <h3 className="cpoa-flow-title">{area.processTabs[activeTab].steps[4].title}</h3>
                    </div>
                    <p className="cpoa-flow-desc">{area.processTabs[activeTab].steps[4].desc}</p>
                  </div>

                  {/* Arrow 5-6 */}
                  {area.processTabs[activeTab].steps[5] && (
                    <>
                      <div className={`cpoa-flow-arrow grid-arrow-5-6 reveal-fade-in ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '700ms' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow-icon arrow-right">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>

                      {/* Step 6 */}
                      <div className={`cpoa-flow-card grid-step-6 highlight-step reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: '750ms' }}>
                        <div className="cpoa-flow-header">
                          <span className="cpoa-flow-num">06</span>
                          <h3 className="cpoa-flow-title">{area.processTabs[activeTab].steps[5].title}</h3>
                        </div>
                        <p className="cpoa-flow-desc">{area.processTabs[activeTab].steps[5].desc}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Alternating Vertical Timeline (Wills & Inheritances, Urban Renewal) */}
            {(area.slug === 'tzovaot-yerushot' || area.slug === 'hitkhadshut-ironit') && (
              <div className="timeline-container">
                {area.process.map((step, i) => (
                  <div key={i} className={`timeline-item ${i % 2 === 0 ? 'right' : 'left'} reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                    <div className="timeline-badge">{step.step}</div>
                    <div className="timeline-card">
                      <h3 className="timeline-title">{step.title}</h3>
                      <p className="timeline-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Progress Track Line Flow (Tabu Registration) */}
            {area.slug === 'tabu' && (
              <div className="track-flow-container">
                <div className="track-flow-line"></div>
                {area.process.map((step, i) => (
                  <div key={i} className={`track-flow-step reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="track-flow-badge">{step.step}</div>
                    <div className="track-flow-card">
                      <h3 className="track-flow-title">{step.title}</h3>
                      <p className="track-flow-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Connected Bar Flow (Shared Buildings) */}
            {area.slug === 'batim-meshotafim' && (
              <div className="list-flow-container">
                {area.process.map((step, i) => (
                  <div key={i} className={`list-flow-item reveal-fade-up ${processVisible ? 'active' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                    <div className="list-flow-left">
                      <div className="list-flow-badge">{step.step}</div>
                      {i < area.process.length - 1 && <div className="list-flow-connector"></div>}
                    </div>
                    <div className="list-flow-card">
                      <h3 className="list-flow-title">{step.title}</h3>
                      <p className="list-flow-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Us */}
        <section ref={whyRef} className="pa-section pa-section-dark" aria-labelledby="why-heading">
          <div className="pa-section-inner">
            <span className={`section-label reveal-fade-up ${whyVisible ? 'active' : ''}`} style={{ color: 'var(--gold-mid)' }}>היתרונות שלנו</span>
            <h2 id="why-heading" className={`pa-section-title reveal-fade-up ${whyVisible ? 'active' : ''}`} style={{ color: '#fff' }}>למה לבחור בנו?</h2>
            <div className="pa-why-grid">
              {area.whyUs.map((item, i) => (
                <div key={i} className={`pa-why-item reveal-fade-up ${whyVisible ? 'active' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <h3 className="pa-why-title">{item.title}</h3>
                  <p className="pa-why-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="pa-section" aria-labelledby="faq-heading">
          <div className="pa-section-inner pa-faq-section">
            <span className={`section-label reveal-fade-up ${faqVisible ? 'active' : ''}`}>שאלות נפוצות</span>
            <h2 id="faq-heading" className={`pa-section-title reveal-fade-up ${faqVisible ? 'active' : ''}`}>שאלות נפוצות</h2>
            <div className="pa-faq-list" itemScope itemType="https://schema.org/FAQPage">
              {area.faq.map((item, i) => (
                <details
                  key={i}
                  className={`pa-faq-item reveal-fade-up ${faqVisible ? 'active' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="pa-faq-q" itemProp="name">
                    {item.q}
                  </summary>
                  <div
                    className="pa-faq-a"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={ctaRef} className={`pa-cta-band reveal-fade-up ${ctaVisible ? 'active' : ''}`} aria-label="קריאה לפעולה">
          <div className="pa-cta-inner">
            <h2>מוכנים לצעד הבא?</h2>
            <p>
              צרו קשר לפגישת ייעוץ ראשונה בנושא <strong>{area.title}</strong>, נשמח לבחון את הנסיבות שלכם ולהציע את הדרך הנכונה.
            </p>
            <div className="pa-cta-btns">
              <Link to="/#lead-form" className="btn-primary">
                לתיאום פגישת ייעוץ
              </Link>
              <Link to="/practice-areas" className="btn-ghost">
                כל תחומי ההתמחות
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
