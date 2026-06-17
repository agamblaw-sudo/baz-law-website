import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: 'דף הבית',
    action: { type: 'home' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'תחומי התמחות',
    action: { type: 'hash', hash: '#expertise' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      </svg>
    ),
  },
  {
    label: 'אודות',
    action: { type: 'hash', hash: '#attorneys' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    label: 'צור קשר',
    action: { type: 'hash', hash: '#contact' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
  },
];

export default function SmartNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleItem = (action) => {
    setOpen(false);
    if (action.type === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action.type === 'hash') {
      if (location.pathname === '/') {
        const el = document.querySelector(action.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + action.hash);
      }
    }
  };

  return (
    <div className={`smart-nav ${open ? 'open' : ''}`} dir="rtl">
      {open && <div className="smart-nav-backdrop" onClick={() => setOpen(false)} />}
      <div className="smart-nav-menu">
        {navItems.map((item, i) => (
          <button
            key={i}
            className="smart-nav-item"
            style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
            onClick={() => handleItem(item.action)}
            aria-label={item.label}
          >
            <span className="smart-nav-label">{item.label}</span>
            <span className="smart-nav-icon">{item.icon}</span>
          </button>
        ))}
      </div>
      <button
        className="smart-nav-trigger"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'סגור תפריט ניווט' : 'פתח תפריט ניווט'}
        aria-expanded={open}
      >
        <svg className="smart-nav-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="21" y2="7"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="17" x2="21" y2="17"/>
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
