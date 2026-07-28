import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getArticleBySlug, buildArticleSchema } from '../data/articles';
import { useSEO } from '../hooks/useSEO';
import useReveal from '../hooks/useReveal';

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  const [introRef, introVisible] = useReveal();
  const [bodyRef, bodyVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useSEO(
    article
      ? {
          title: article.seoTitle,
          description: article.metaDescription,
          keywords: article.keywords,
          canonicalPath: article.canonicalPath,
          jsonLd: buildArticleSchema(article),
        }
      : {}
  );

  if (!article) return <Navigate to="/articles" replace />;

  return (
    <main className="pa-page" role="main">

      {/* ── Page Hero ── */}
      <section className="pa-hero pa-hero-practice" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <h1 className="pa-hero-title">{article.title}</h1>
          <p className="pa-hero-sub">{article.excerpt}</p>
          <div className="pa-hero-actions">
            <Link to="/#lead-form" className="btn-primary">לתיאום פגישת ייעוץ</Link>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="pa-content">

        <section ref={introRef} className={`pa-section pa-section-intro reveal-fade-up ${introVisible ? 'active' : ''}`} aria-label="תאריך פרסום">
          <div className="pa-section-inner article-meta">
            <span className="article-date">
              עודכן לאחרונה: {formatDate(article.updatedAt || article.publishedAt)}
            </span>
          </div>
        </section>

        <section ref={bodyRef} className={`pa-section reveal-fade-up ${bodyVisible ? 'active' : ''}`} aria-label="תוכן המאמר">
          <div className="pa-section-inner article-body">
            {article.content.map((block, i) => (
              <div key={i} className="article-block">
                <h2 className="pa-section-title">{block.heading}</h2>
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="pa-intro-text">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── CTA Band ── */}
      <section ref={ctaRef} className={`pa-cta-band reveal-fade-up ${ctaVisible ? 'active' : ''}`} aria-label="קריאה לפעולה">
        <div className="pa-cta-inner">
          <h2>מוכנים לצעד הבא?</h2>
          <p>צרו קשר לפגישת ייעוץ ראשונה: נשמח לבחון את הנסיבות שלכם ולהציע את הדרך הנכונה.</p>
          <div className="pa-cta-btns">
            <Link to="/#lead-form" className="btn-primary">
              לתיאום פגישת ייעוץ
            </Link>
            <Link to="/articles" className="btn-ghost">
              חזרה למאמרים
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
