import React from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';

const attorneys = [
  {
    slug: 'agam-brazili',
    name: 'עו"ד אגם ברזילי',
    photo: '/attorney-agam.jpg',
    photoPosition: 'center top',
    bio: 'עו"ד אגם ברזילי מעניק ליווי משפטי אישי ויסודי, מתוך מחויבות לשמירה על האינטרסים של לקוחותיו ולהבטחת שקט נפשי לאורך כל התהליך. את הניסיון המעשי שלו רכש במשרד עורכי דין מוביל ובחברת יזמות בולטת, רקע המקנה לו ראייה עסקית מעמיקה והבנה של שני צידי המתרס.',
  },
  {
    slug: 'liron-azouri',
    name: 'עו"ד לירון עזורי',
    photo: '/attorney-liron.jpg',
    photoPosition: 'center',
    bio: 'עו"ד לירון עזורי מביא עמו סטנדרט גבוה של מקצועיות, יסודיות ומסירות, מתוך מטרה להעניק לכל לקוח ביטחון וליווי משפטי צמוד. גישתו המשפטית משלבת הבנה חדה עם חשיבה פרקטית, המאפשרת לו לנווט תהליכים מורכבים ברגישות ובנחישות.',
  },
];

export default function Attorneys() {
  const [sectionRef, isVisible] = useReveal();

  return (
    <section ref={sectionRef} className="attorneys" id="attorneys">
      <span className="section-eyebrow">הצוות שלנו</span>
      <h2 className={`section-title reveal-fade-up ${isVisible ? 'active' : ''}`} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>אודות</h2>
      <div className="atty-rows">
        {attorneys.map((a, i) => (
          <Link
            key={a.slug}
            to={`/attorneys/${a.slug}`}
            className={`atty-row${i % 2 ? ' atty-row--flip' : ''} ${i % 2 ? 'reveal-slide-right' : 'reveal-slide-left'} ${isVisible ? 'active' : ''}`}
          >
            <div className="atty-photo">
              <img src={a.photo} alt={a.name} style={{ objectPosition: a.photoPosition }} loading="lazy" />
            </div>
            <div className="atty-text">
              <h3>{a.name}</h3>
              <p>{a.bio}</p>
              <span className="atty-more">קראו עוד ←</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
