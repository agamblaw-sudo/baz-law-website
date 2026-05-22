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

  // Scroll so the top of the element aligns exactly with the bottom of the navbar
  window.scrollTo({
    top: elementTop - navbarHeight,
    behavior: behavior
  });
}

/**
 * Resolves a hash path and scrolls the centered target into view.
 * @param {string} hash - The target element id prefix with '#' (e.g. '#contact').
 * @param {string} [behavior='smooth'] - Scrolling behavior ('smooth' or 'auto').
 */
export function scrollToHash(hash, behavior = 'smooth') {
  if (!hash) {
    window.scrollTo(0, 0);
    return;
  }
  const id = hash.replace('#', '');
  
  let attempts = 0;
  const findAndScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        scrollToElement(element, behavior);
      }, 50);
    } else if (attempts < 30) {
      attempts++;
      setTimeout(findAndScroll, 50);
    }
  };
  findAndScroll();
}
