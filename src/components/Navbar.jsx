import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { scrollToHash } from '../services/scrollService';
import { practiceAreas } from '../data/practiceAreas';
import { attorneys } from '../data/attorneys';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileAttorneysOpen, setMobileAttorneysOpen] = useState(false);
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
    setMobileDropdownOpen(false);
    setMobileAttorneysOpen(false);
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
            <img src="/logo.png" className="nav-logo-img" alt="ברזילי, עזורי ושות׳ עורכי דין" width="320" height="95" />
          </picture>
        </a>

        {/* Nav links — centre (desktop) */}
        <ul className="nav-links">

          {/* אודות — dropdown */}
          <li className="nav-dropdown-wrapper">
            <a href="/#attorneys" onClick={(e) => handleLinkClick(e, '#attorneys')} className="nav-dropdown-trigger">
              אודות
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="dropdown-arrow">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul className="nav-dropdown-menu">
              {attorneys.map((attorney) => (
                <li key={attorney.slug}>
                  <Link to={`/attorneys/${attorney.slug}`}>עו״ד {attorney.nameShort}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* תחומי התמחות — dropdown */}
          <li className="nav-dropdown-wrapper">
            <Link to="/practice-areas" className="nav-dropdown-trigger">
              תחומי התמחות
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="dropdown-arrow">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul className="nav-dropdown-menu">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link to={`/practice-areas/${area.slug}`}>
                    {area.titleShort || area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

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

              {/* אודות mobile dropdown */}
              <div className="mobile-dropdown-wrapper">
                <button
                  onClick={() => setMobileAttorneysOpen(!mobileAttorneysOpen)}
                  className="mobile-dropdown-trigger"
                  aria-expanded={mobileAttorneysOpen}
                >
                  אודות
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${mobileAttorneysOpen ? 'open' : ''}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className={`mobile-dropdown-content ${mobileAttorneysOpen ? 'open' : ''}`}>
                  <a href="/#attorneys" onClick={(e) => handleLinkClick(e, '#attorneys')} className="mobile-dropdown-subitem all-areas">
                    הצוות שלנו ←
                  </a>
                  {attorneys.map((attorney) => (
                    <Link
                      key={attorney.slug}
                      to={`/attorneys/${attorney.slug}`}
                      onClick={closeMobileMenu}
                      className="mobile-dropdown-subitem"
                    >
                      עו״ד {attorney.nameShort}
                    </Link>
                  ))}
                </div>
              </div>

              {/* תחומי התמחות mobile dropdown */}
              <div className="mobile-dropdown-wrapper">
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="mobile-dropdown-trigger"
                  aria-expanded={mobileDropdownOpen}
                >
                  תחומי התמחות
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${mobileDropdownOpen ? 'open' : ''}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className={`mobile-dropdown-content ${mobileDropdownOpen ? 'open' : ''}`}>
                  <Link to="/practice-areas" onClick={closeMobileMenu} className="mobile-dropdown-subitem all-areas">
                    כל תחומי ההתמחות ←
                  </Link>
                  {practiceAreas.map((area) => (
                    <Link
                      key={area.slug}
                      to={`/practice-areas/${area.slug}`}
                      onClick={closeMobileMenu}
                      className="mobile-dropdown-subitem"
                    >
                      {area.titleShort || area.title}
                    </Link>
                  ))}
                </div>
              </div>

              <a href="/#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')}>לקוחות ממליצים</a>
              <a href="/#lead-form"    onClick={(e) => handleLinkClick(e, '#lead-form')}>צור קשר</a>
              <a 
                href="https://www.facebook.com/profile.php?id=61590961314809" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--gold-mid)', flexShrink: 0 }}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>עמוד הפייסבוק של המשרד</span>
              </a>
              <a href="/#lead-form" className="mobile-cta" onClick={(e) => handleLinkClick(e, '#lead-form')}>לתיאום פגישת ייעוץ</a>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>

      </nav>
    </>
  );
}
