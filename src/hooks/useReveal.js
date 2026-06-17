import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to trigger scroll animations when elements enter the viewport.
 * Uses the HTML5 Intersection Observer API to transition an element to its reveal state.
 */
export default function useReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not supported, fallback to visible immediately
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve immediately after reveal to preserve browser performance
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08, // Reveal when 8% of the section enters the viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible];
}
