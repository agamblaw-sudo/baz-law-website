import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from 'radix-ui';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      {/* ═══ NAVBAR ═══ */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>

  {/* Logo — ימין (RTL start) */}
  <a href="/" className="nav-logo-wrap" aria-label="ברזילי, עזורי ושות׳">
    <img src="/logo.png" className="nav-logo-img" alt="ברזילי, עזורי ושות׳ - עורכי דין" />
  </a>

  {/* Nav links — centre (desktop) */}
  <ul className="nav-links">
    <li><a href="/#attorneys">אודות</a></li>
    <li><a href="/#expertise">תחומי התמחות</a></li>
    <li><a href="/#testimonials">לקוחות ממליצים</a></li>
    <li><a href="/#lead-form">צור קשר</a></li>
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
        <a href="/#attorneys"    onClick={closeMobileMenu}>אודות</a>
        <a href="/#expertise"    onClick={closeMobileMenu}>תחומי התמחות</a>
        <a href="/#testimonials" onClick={closeMobileMenu}>לקוחות ממליצים</a>
        <a href="/#lead-form"    onClick={closeMobileMenu}>צור קשר</a>
        <a href="/#lead-form" className="mobile-cta" onClick={closeMobileMenu}>לתיאום פגישת ייעוץ</a>
      </DialogPrimitive.Content>
    </DialogPortal>
  </Dialog>

</nav>
    </>
  );
}
