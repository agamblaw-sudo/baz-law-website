import React, { useRef, useEffect } from 'react';

/**
 * ScrollProgressBar
 * A fixed gold bar at the very top of the viewport that fills
 * as the user scrolls down the page.
 *
 * The fill is written straight to the element's transform inside a
 * requestAnimationFrame tick rather than going through React state, and it
 * carries no CSS transition: scroll is a direct manipulation, so the bar has to
 * track the gesture 1:1 with no interpolation delay between them.
 */
export default function ScrollProgressBar() {
  const fillRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${ratio})`;
      }
      if (barRef.current) {
        barRef.current.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
      }
    };

    // Coalesce bursts of scroll events into one write per displayed frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="התקדמות גלילה בעמוד"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={fillRef} className="scroll-progress-bar-fill" />
    </div>
  );
}
