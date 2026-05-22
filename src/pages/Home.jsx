import React, { useEffect, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Attorneys from '../components/Attorneys';
import Expertise from '../components/Expertise';
import { scrollToHash } from '../services/scrollService';

const Testimonials = lazy(() => import('../components/Testimonials'));
const ContactForm  = lazy(() => import('../components/ContactForm'));

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
      <Suspense fallback={null}>
        <Testimonials />
        <ContactForm />
      </Suspense>
    </main>
  );
}
