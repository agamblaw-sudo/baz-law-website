import React from 'react';
import Hero from '../components/Hero';
import Attorneys from '../components/Attorneys';
import Expertise from '../components/Expertise';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      {/* 1. Hero Section (Dark, Background Video) */}
      <Hero />

      {/* 2. Intro Section (Light/White background, scrolls with page) */}
      <section className="intro-section">
        <div className="intro-container">
          <span className="section-label">נעים להכיר</span>
          <h2 className="section-title">ברזילי, עזורי ושות' – משרד עורכי דין</h2>
          <p className="intro-text">
            משרדנו מעניק מעטפת משפטית מקיפה ומקצועית בתחומי עסקאות הנדל"ן, ההתחדשות העירונית ודיני הירושה. אנו דוגלים בליווי אישי, מקצועיות ללא פשרות, שקיפות וזמינות מלאה לאורך כל הדרך כדי להבטיח את התוצאות המיטביות והשקט הנפשי של לקוחותינו.
          </p>
        </div>
      </section>

      {/* 3. Parallax Section 1 (Dark fixed background + quote) */}
      <div className="parallax-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1740574314628-b0e031323e5a?auto=format&fit=crop&w=1920&q=80")' }}>
        <div className="parallax-overlay"></div>
        <div className="parallax-content">
          <span className="parallax-label">האני מאמין שלנו</span>
          <h2 className="parallax-quote">"החוק הוא המצפן, הצדק הוא היעד."</h2>
        </div>
      </div>

      {/* 4. Attorneys Section (Light, scrolls with page) */}
      <Attorneys />

      {/* 5. Parallax Section 2 (Dark fixed background + quote) */}
      <div className="parallax-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1571210774504-471a564d5bf0?auto=format&fit=crop&w=1920&q=80")' }}>
        <div className="parallax-overlay"></div>
        <div className="parallax-content">
          <span className="parallax-label">מקצועיות ואיכות</span>
          <h2 className="parallax-quote">"ביושר, במקצועיות ובמסירות – מייצגים אתכם בכל שלב."</h2>
        </div>
      </div>

      {/* 6. Expertise Section (Light, scrolls with page) */}
      <Expertise />

      {/* 7. Parallax Section 3 (Dark fixed background + quote) */}
      <div className="parallax-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1695910410678-6731d8577dc5?auto=format&fit=crop&w=1920&q=80")' }}>
        <div className="parallax-overlay"></div>
        <div className="parallax-content">
          <span className="parallax-label">המחויבות שלנו</span>
          <h2 className="parallax-quote">"ההצלחה שלכם היא השקט שלנו."</h2>
        </div>
      </div>

      {/* 8. Testimonials Section (Light, scrolls with page) */}
      <Testimonials />

      {/* 9. Contact Form Section (Light, scrolls with page) */}
      <ContactForm />
    </main>
  );
}
