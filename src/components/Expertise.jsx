import React from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';

const areas = [
  {
    slug: 'nadlan',
    title: 'עסקאות נדל"ן',
    image: '/pa-nadlan.webp',
    desc: 'עסקת נדל"ן היא אחת ההחלטות הכלכליות המשמעותיות ביותר שאדם מקבל בחייו. משרדנו מלווה רוכשים, מוכרים ומשקיעים בכל שלבי העסקה החל מבדיקת הנכס וניסוח ההסכם, דרך ניהול משא ומתן מסחרי, ועד לרישום הזכויות בטאבו. אנו מוודאים שכל פרט מוסדר כראוי, ושהאינטרסים של לקוחותינו מוגנים לאורך כל הדרך.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
  },
  {
    slug: 'hitkhadshut-ironit',
    title: 'התחדשות עירונית',
    image: '/pa-hitkhadshut.webp',
    desc: 'פרויקטי התחדשות עירונית תמ"א 38 ופינוי בינוי כרוכים בתהליכים מורכבים הדורשים ייצוג משפטי מנוסה ואיכותי. המשרד מלווה בעלי דירות מרגע קבלת הפנייה הראשונה מהיזם ועד לחתימת ההסכם הסופי, תוך הקפדה על הגנת זכויות הדיירים, בחינת כדאיות העסקה, ניהול משא ומתן קפדני, ווידוא שכלל ההתחייבויות מגובות בערבויות מתאימות.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="13" width="7" height="8"/><line x1="3" y1="17" x2="5" y2="17"/><line x1="3" y1="15" x2="5" y2="15"/>
        <line x1="9" y1="17" x2="13" y2="17"/><polyline points="11,15 13,17 11,19"/>
        <rect x="14" y="5" width="9" height="16"/>
        <line x1="16" y1="9" x2="18" y2="9"/><line x1="16" y1="12" x2="18" y2="12"/><line x1="16" y1="15" x2="18" y2="15"/>
        <line x1="20" y1="9" x2="21" y2="9"/><line x1="20" y1="12" x2="21" y2="12"/><line x1="20" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
  {
    slug: 'tzovaot-yerushot',
    title: 'צוואות, ירושות ועזבונות',
    image: '/pa-tzovaot.webp',
    desc: 'תכנון נכון של העיזבון מקנה לבני המשפחה ודאות, שקט נפשי והגנה על הרכוש שנצבר לאורך השנים. המשרד מנסח צוואות מקצועיות ומדויקות המשקפות את רצון הלקוח, מטפל בהליכי צווי ירושה, ומלווה את בני המשפחה בניהול העיזבון לאחר הפטירה הכול ברגישות, בבהירות ובמסירות.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    ),
  },
  {
    slug: 'tabu',
    title: 'רישום זכויות בטאבו',
    image: '/pa-tabu.webp',
    desc: 'רישום הזכויות בטאבו הוא השלב הקריטי המסיים את עסקת המקרקעין ומעניק לרוכש ביטחון משפטי מלא. המשרד מטפל ברישום עסקאות מכר, העברות בעלות, חכירה, העברת זכויות אגב גירושין, משכנתאות, הערות אזהרה ועוד מול רשם המקרקעין ורשויות רלוונטיות. הטיפול מקיף, יסודי ומדויק, תוך הקפדה על עמידה בלוחות הזמנים.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><line x1="3" y1="12" x2="21" y2="12"/></svg>
    ),
  },
  {
    slug: 'batim-meshotafim',
    title: 'רישום בתים משותפים',
    image: '/pa-batim.webp',
    desc: 'רישום בית משותף הוא הליך מורכב הדורש ידע מקצועי ייחודי. מלווה בעלי זכויות בתהליך המלא החל מניסוח תקנון הבית המשותף, דרך תיאום מול הרשויות הרלוונטיות, ועד לרישום הסופי של כל יחידה על שם בעליה. הטיפול נעשה ביסודיות ובדייקנות כדי להבטיח שזכויות כל הדיירים תהיינה רשומות כראוי.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="5" width="9" height="18"/><rect x="14" y="1" width="9" height="22"/>
        <line x1="10" y1="9" x2="14" y2="9"/><line x1="10" y1="14" x2="14" y2="14"/><line x1="10" y1="19" x2="14" y2="19"/>
        <line x1="3" y1="9" x2="3.01" y2="9"/><line x1="7" y1="9" x2="7.01" y2="9"/>
        <line x1="3" y1="13" x2="3.01" y2="13"/><line x1="7" y1="13" x2="7.01" y2="13"/>
        <line x1="3" y1="17" x2="3.01" y2="17"/><line x1="7" y1="17" x2="7.01" y2="17"/>
        <line x1="16" y1="5" x2="16.01" y2="5"/><line x1="20" y1="5" x2="20.01" y2="5"/>
        <line x1="16" y1="9" x2="16.01" y2="9"/><line x1="20" y1="9" x2="20.01" y2="9"/>
        <line x1="16" y1="13" x2="16.01" y2="13"/><line x1="20" y1="13" x2="20.01" y2="13"/>
      </svg>
    ),
  },
  {
    slug: 'yipuy-koach',
    title: 'ייפוי כוח מתמשך',
    image: '/pa-yipuy.webp',
    desc: 'ייפוי כוח מתמשך הוא מסמך משפטי המאפשר לכם לקבוע מראש מי יקבל החלטות בשמכם בתחומים הרפואיים, הרכושיים והאישיים אם וכאשר לא תוכלו לעשות זאת בעצמכם. המשרד מלווה לקוחות בהכנת ייפוי כוח מתמשך מותאם אישית, תוך הסבר מעמיק של המשמעויות, ייעוץ לגבי הבחירות השונות, והפקדת המסמך כנדרש מול האפוטרופוס הכללי.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
    ),
  },
];

export default function Expertise() {
  const [sectionRef, isVisible] = useReveal();

  return (
    <section ref={sectionRef} className="expertise" id="expertise" aria-labelledby="expertise-heading">
      <h2 id="expertise-heading" className={`section-title reveal-fade-up ${isVisible ? 'active' : ''}`} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>
        תחומי ההתמחות
      </h2>
      <div className="expertise-grid">
        {areas.map((area, index) => (
          <article 
            key={area.slug} 
            className={`expertise-card reveal-fade-up ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <div className="expertise-card-image-wrap">
              <img src={area.image} alt={area.title} className="expertise-card-image" loading="lazy" />
            </div>
            <div className="expertise-card-body">
              <h3>{area.title}</h3>
              <p>{area.desc}</p>
              <Link
                to={`/practice-areas/${area.slug}`}
                className="expertise-read-more"
                aria-label={`לפרטים נוספים על ${area.title}`}
              >
                לפרטים נוספים
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
