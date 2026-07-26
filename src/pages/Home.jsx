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

      {/* 2. Attorneys Section (Light, scrolls with page) */}
      <Attorneys />

      {/* 4. Statement band — the firm's single quote (local image) */}
      <div className="parallax-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1740574314628-b0e031323e5a?auto=format&fit=crop&w=1920&q=80")' }}>
        <div className="parallax-overlay"></div>
        <div className="parallax-content">
          <h2 className="parallax-quote">"החוק הוא המצפן, הצדק הוא היעד."</h2>
        </div>
      </div>

      {/* 5. Expertise Section (Light, scrolls with page) */}
      <Expertise />

      {/* 8. Testimonials Section (Light, scrolls with page) */}
      <Testimonials />

      {/* 9. Contact Form Section (Light, scrolls with page) */}
      <ContactForm />
    </main>
  );
}
