import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Attorneys from '../components/Attorneys';
import Expertise from '../components/Expertise';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import { scrollToHash } from '../services/scrollService';

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      scrollToHash(hash);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main>
      <Hero />
      <Attorneys />
      <Expertise />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
