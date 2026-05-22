import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Attorneys from '../components/Attorneys';
import Expertise from '../components/Expertise';

const Testimonials = lazy(() => import('../components/Testimonials'));
const ContactForm  = lazy(() => import('../components/ContactForm'));

export default function Home() {
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
