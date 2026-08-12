/**
 * Service to handle page scrolling and viewport centering for target hash elements.
 */

/**
 * Centers a given DOM element in the viewport.
 * @param {HTMLElement} element - The target element to center.
 * @param {string} [behavior='smooth'] - Scrolling behavior ('smooth' or 'auto').
 */
export function scrollToElement(element, behavior = 'smooth') {
  if (!element) return;

  // Find the navbar and measure its height dynamically to handle desktop/mobile layouts
  const navbar = document.querySelector('nav');
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 100;

  // Get the absolute top of the element (e.g. the section container)
  const rect = element.getBoundingClientRect();
  const elementTop = window.scrollY + rect.top;

  let offset = navbarHeight;

  // Specific handling for lead-form to align the heading "נשמח לסייע לכם" perfectly on mobile/desktop
  if (element.id === 'lead-form') {
    const width = window.innerWidth;
    if (width <= 480) {
      offset = navbarHeight - 24;
    } else if (width <= 768) {
      offset = navbarHeight - 32;
    } else {
      offset = navbarHeight - 64;
    }
  }

  // To prevent the CSS `scroll-behavior: smooth` from causing a jump/smooth-scroll during programmatic layout corrections, we force instant scrolling.
  const isInstant = behavior === 'auto' || behavior === 'instant';
  const originalScrollBehavior = document.documentElement.style.scrollBehavior;
  
  if (isInstant) {
    document.documentElement.style.scrollBehavior = 'auto'; // overrides CSS smooth
  }

  // Scroll so the top of the element aligns exactly with the bottom of the navbar minus any custom offset adjustments
  window.scrollTo({
    top: elementTop - offset,
    behavior: isInstant ? 'auto' : behavior
  });

  if (isInstant) {
    // Restore the inline style after the scroll event has been processed by the browser
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }, 10);
  }
}

/**
 * Resolves a hash path and scrolls the centered target into view.
 * @param {string} hash - The target element id prefix with '#' (e.g. '#contact').
 * @param {string} [behavior='smooth'] - Scrolling behavior ('smooth' or 'auto').
 */
export function scrollToHash(hash, behavior = 'smooth') {
  if (!hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return;
  }
  const id = hash.replace('#', '');
  
  let attempts = 0;
  const findAndScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      // If the body is still scroll-locked by a Dialog transition, wait and retry
      const isLocked = document.body.style.overflow === 'hidden';
      if (isLocked && attempts < 25) {
        attempts++;
        setTimeout(findAndScroll, 40);
        return;
      }

      // Initial scroll attempt
      scrollToElement(element, behavior);

      // Watch for layout shifts (e.g., Elfsight widget loading) and correct the
      // scroll position to compensate. External widgets can take 1-2 seconds to
      // load, pushing the layout down.
      let lastHeight = document.documentElement.scrollHeight;
      let cancelled = false;

      const cleanup = () => {
        cancelled = true;
        observer.disconnect();
        clearTimeout(stopTimeoutId);
        ['wheel', 'touchstart', 'keydown'].forEach((type) =>
          window.removeEventListener(type, cancelOnUserInput)
        );
      };

      // The moment the user takes the wheel/touch/keyboard themselves, back off
      // immediately — a programmatic correction must never fight live user input.
      function cancelOnUserInput() {
        cleanup();
      }
      ['wheel', 'touchstart', 'keydown'].forEach((type) =>
        window.addEventListener(type, cancelOnUserInput, { passive: true })
      );

      const observer = new ResizeObserver(() => {
        if (cancelled) return;
        const newHeight = document.documentElement.scrollHeight;
        if (Math.abs(newHeight - lastHeight) > 15) {
          lastHeight = newHeight;
          // Re-adjust scroll position instantly without smooth animation
          scrollToElement(element, 'auto');
        }
      });
      observer.observe(document.body);

      // Stop correcting after 2.5 seconds regardless — covers the window where
      // slow-loading widgets (Elfsight etc.) typically finish shifting layout.
      const stopTimeoutId = setTimeout(cleanup, 2500);

    } else if (attempts < 30) {
      attempts++;
      setTimeout(findAndScroll, 50);
    }
  };
  findAndScroll();
}

