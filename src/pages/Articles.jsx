import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { articles, getArticleCategories } from '../data/articles';
import { useSEO } from '../hooks/useSEO';
import useReveal from '../hooks/useReveal';

const BASE_URL = 'https://baz-law.co.il';

const indexSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/articles`,
      name: 'ברזילי, עזורי ושות׳: מאמרים',
      description: 'מאמרים משפטיים בתחומי הנדל"ן, ההתחדשות העירונית, צוואות וירושות וייפוי כוח מתמשך.',
      url: `${BASE_URL}/articles`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'דף הבית', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'מאמרים', item: `${BASE_URL}/articles` },
      ],
    },
  ],
};

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export default function Articles() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [introRef, introVisible] = useReveal();
  const [featuredRef, featuredVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('הכל');

  const categories = useMemo(() => ['הכל', ...getArticleCategories()], []);

  const [featured, ...rest] = articles;
  const showFeatured = activeCategory === 'הכל' && !query.trim();
  const pool = showFeatured ? rest : articles;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pool.filter((article) => {
      const matchesCategory = activeCategory === 'הכל' || article.category === activeCategory;
      const matchesQuery = !q || `${article.title} ${article.excerpt}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [pool, query, activeCategory]);

  useSEO({
    title: 'מאמרים | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'מאמרים משפטיים בתחומי הנדל"ן, ההתחדשות העירונית, צוואות וירושות וייפוי כוח מתמשך, מאת משרד ברזילי, עזורי ושות׳ עורכי דין.',
    keywords: 'מאמרים משפטיים, עורך דין פתח תקווה, ייפוי כוח מתמשך, צוואות וירושות',
    canonicalPath: '/articles',
    jsonLd: indexSchema,
  });

  return (
    <main className="pa-page articles-page" role="main">

      {/* ── Page Hero ── */}
      <section className="pa-hero pa-hero-list-page" aria-label="כותרת עמוד">
        <div className="pa-hero-bg-text">חוק</div>
        <div className="pa-hero-inner">
          <h1 className="pa-hero-title">מאמרים</h1>
          <p className="pa-hero-sub">
            תוכן משפטי מקצועי ונגיש בנושאי נדל"ן, התחדשות עירונית, צוואות, ירושות וייפוי כוח מתמשך.
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
            כאן תמצאו מאמרים מקצועיים שכתב משרד ברזילי, עזורי ושות׳ עורכי דין, שנועדו לעזור לכם להבין תהליכים משפטיים מרכזיים בחיי היומיום — מרכישת דירה ועד תכנון עיזבון — ולהגיע מוכנים לפגישת הייעוץ.
          </p>
        </div>
      </section>

      {/* ── Toolbar: search + category filter ── */}
      <section className="articles-toolbar-section" aria-label="חיפוש וסינון מאמרים">
        <div className="articles-toolbar">
          <label className="articles-search" htmlFor="articles-search-input">
            <SearchIcon />
            <input
              id="articles-search-input"
              type="search"
              placeholder="חיפוש מאמר…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="חיפוש מאמר לפי כותרת או תקציר"
            />
          </label>

          <div className="articles-filter-pills" role="group" aria-label="סינון לפי קטגוריה">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`articles-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured article ── */}
      {showFeatured && featured && (
        <section ref={featuredRef} className={`articles-featured-section reveal-fade-up ${featuredVisible ? 'active' : ''}`} aria-label="מאמר מומלץ">
          <Link to={`/articles/${featured.slug}`} className="articles-featured-card">
            {featured.image && (
              <div className="articles-featured-media">
                <img
                  src={featured.image}
                  alt={featured.imageAlt || featured.title}
                  width="640"
                  height="400"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="articles-featured-badges">
                  <span className="articles-featured-tag">מאמר מומלץ</span>
                  {featured.category && <span className="article-category">{featured.category}</span>}
                </div>
              </div>
            )}
            <div className="articles-featured-body">
              <h2 className="articles-featured-title">{featured.title}</h2>
              <p className="articles-featured-excerpt">{featured.excerpt}</p>
              <div className="articles-card-footer">
                <time className="article-card-date" dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                <span className="exp-cta">
                  לקריאת המאמר
                  <ArrowIcon />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Articles grid ── */}
      <section ref={gridRef} className="articles-grid-section" aria-label="כל המאמרים">
        {filtered.length > 0 ? (
          <div className="articles-grid">
            {filtered.map((article, index) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className={`article-card reveal-fade-up ${gridVisible ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {article.category && <span className="article-category">{article.category}</span>}
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-excerpt">{article.excerpt}</p>
                <div className="articles-card-footer">
                  <time className="article-card-date" dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                  <span className="exp-cta">
                    לקריאה
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !showFeatured && (
            <div className="articles-empty-state">
              <p>לא נמצאו מאמרים התואמים את החיפוש.</p>
              <button type="button" className="btn-ghost" onClick={() => { setQuery(''); setActiveCategory('הכל'); }}>
                איפוס סינון
              </button>
            </div>
          )
        )}
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
