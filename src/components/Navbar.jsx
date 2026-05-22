import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { scrollToHash } from '../services/scrollService';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    const wasMobileMenuOpen = isOpen;
    closeMobileMenu();

    if (location.pathname === '/' && location.hash === hash) {
      setTimeout(() => {
        scrollToHash(hash);
      }, wasMobileMenuOpen ? 300 : 50);
    } else {
      navigate('/' + hash);
      setTimeout(() => {
        scrollToHash(hash);
      }, wasMobileMenuOpen ? 300 : 100);
    }
  };

  return (
    <>
      {/* ═══ NAVBAR ═══ */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>

        {/* Logo — ימין (RTL start) */}
        <a href="/" className="nav-logo-wrap" aria-label="ברזילי, עזורי ושות׳">
          <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.png" className="nav-logo-img" alt="ברזילי, עזורי ושות׳ עורכי דין" />
            </picture>
        </a>

        {/* Nav links — centre (desktop) */}
        <ul className="nav-links">
          <li><a href="/#attorneys" onClick={(e) => handleLinkClick(e, '#attorneys')}>אודות</a></li>
          <li><a href="/#expertise" onClick={(e) => handleLinkClick(e, '#expertise')}>תחומי התמחות</a></li>
          <li><a href="/#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')}>לקוחות ממליצים</a></li>
          <li><a href="/#lead-form" onClick={(e) => handleLinkClick(e, '#lead-form')}>צור קשר</a></li>
        </ul>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className={`hamburger ${isOpen ? "open" : ""}`} id="hamburger" aria-label="פתח תפריט">
              <span></span><span></span><span></span>
            </button>
          </DialogTrigger>
          <DialogPortal>
            <DialogPrimitive.Content id="mobileMenu" className="mobile-menu open" aria-describedby={undefined}>
              <DialogTitle className="sr-only">תפריט נייד</DialogTitle>
              <a href="/#attorneys"    onClick={(e) => handleLinkClick(e, '#attorneys')}>אודות</a>
              <a href="/#expertise"    onClick={(e) => handleLinkClick(e, '#expertise')}>תחומי התמחות</a>
              <a href="/#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')}>לקוחות ממליצים</a>
              <a href="/#lead-form"    onClick={(e) => handleLinkClick(e, '#lead-form')}>צור קשר</a>
              <a href="/#lead-form" className="mobile-cta" onClick={(e) => handleLinkClick(e, '#lead-form')}>לתיאום פגישת ייעוץ</a>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>

      </nav>
    </>
  );
}
