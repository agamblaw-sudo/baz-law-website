import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BOT_NAME = 'בוט המשרד';

const INITIAL_MESSAGE = {
  from: 'bot',
  text: 'שלום! אני כאן כדי לעזור לך למצוא את מה שאתה מחפש. במה אוכל לסייע?',
  options: [
    { label: 'עסקת נדל"ן', value: 'nadlan' },
    { label: 'התחדשות עירונית', value: 'hitkhadshut' },
    { label: 'צוואות וירושות', value: 'tzovaot' },
    { label: 'רישום בטאבו', value: 'tabu' },
    { label: 'ייפוי כוח מתמשך', value: 'yipuy' },
    { label: 'יצירת קשר', value: 'contact' },
  ],
};

const RESPONSES = {
  nadlan: {
    text: 'המשרד מתמחה בליווי עסקאות נדל"ן — רכישה, מכירה והשקעה. תרצה לקרוא עוד או לדבר עם עורך דין?',
    options: [
      { label: 'לדף תחום הנדל"ן', value: 'goto_nadlan' },
      { label: 'יצירת קשר', value: 'contact' },
      { label: 'חזרה לתפריט', value: 'restart' },
    ],
  },
  hitkhadshut: {
    text: 'אנו מלווים בעלי דירות בפרויקטי תמ"א 38 ופינוי-בינוי מהפנייה הראשונה ועד חתימת ההסכם הסופי.',
    options: [
      { label: 'לדף התחדשות עירונית', value: 'goto_hitkhadshut' },
      { label: 'יצירת קשר', value: 'contact' },
      { label: 'חזרה לתפריט', value: 'restart' },
    ],
  },
  tzovaot: {
    text: 'המשרד מנסח צוואות, מטפל בצווי ירושה וניהול עיזבונות, הכול ברגישות ובמקצועיות.',
    options: [
      { label: 'לדף צוואות וירושות', value: 'goto_tzovaot' },
      { label: 'יצירת קשר', value: 'contact' },
      { label: 'חזרה לתפריט', value: 'restart' },
    ],
  },
  tabu: {
    text: 'אנו מטפלים ברישום עסקאות מכר, העברות בעלות, הערות אזהרה ועוד מול רשם המקרקעין.',
    options: [
      { label: 'לדף רישום בטאבו', value: 'goto_tabu' },
      { label: 'יצירת קשר', value: 'contact' },
      { label: 'חזרה לתפריט', value: 'restart' },
    ],
  },
  yipuy: {
    text: 'ייפוי כוח מתמשך מאפשר לקבוע מראש מי יקבל החלטות בשמך. המשרד מלווה את התהליך המלא.',
    options: [
      { label: 'לדף ייפוי כוח', value: 'goto_yipuy' },
      { label: 'יצירת קשר', value: 'contact' },
      { label: 'חזרה לתפריט', value: 'restart' },
    ],
  },
  contact: {
    text: 'ניתן לפנות אלינו בטלפון, בוואטסאפ, או למלא את טופס יצירת הקשר באתר. נשמח לחזור אליך בהקדם.',
    options: [
      { label: 'לטופס יצירת קשר', value: 'goto_contact' },
      { label: 'חזרה לתפריט', value: 'restart' },
    ],
  },
  restart: INITIAL_MESSAGE,
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setUnread(true), 4000);
      return () => clearTimeout(t);
    }
    setUnread(false);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOption = (value) => {
    const userLabel = findLabel(value);

    if (value.startsWith('goto_')) {
      const routes = {
        goto_nadlan: '/practice-areas/nadlan',
        goto_hitkhadshut: '/practice-areas/hitkhadshut-ironit',
        goto_tzovaot: '/practice-areas/tzovaot-yerushot',
        goto_tabu: '/practice-areas/tabu',
        goto_yipuy: '/practice-areas/yipuy-koach',
        goto_contact: '/#contact',
      };
      addMessage({ from: 'user', text: userLabel });
      setTimeout(() => {
        setOpen(false);
        const path = routes[value];
        if (path.includes('#')) {
          navigate('/');
          setTimeout(() => {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          navigate(path);
        }
      }, 400);
      return;
    }

    if (value === 'restart') {
      addMessage({ from: 'user', text: userLabel });
      setTimeout(() => addMessage(INITIAL_MESSAGE), 500);
      return;
    }

    const response = RESPONSES[value];
    if (response) {
      addMessage({ from: 'user', text: userLabel });
      setTimeout(() => addMessage({ from: 'bot', ...response }), 500);
    }
  };

  const addMessage = (msg) => setMessages(prev => [...prev, msg]);

  const findLabel = (value) => {
    for (const msg of messages) {
      const opt = msg.options?.find(o => o.value === value);
      if (opt) return opt.label;
    }
    return value;
  };

  return (
    <>
      <div className={`chatbot-window ${open ? 'open' : ''}`} dir="rtl" role="dialog" aria-label="צ'אטבוט">
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <span className="chatbot-avatar">
              <img src="/logo-avatar.webp" alt="BA" />
            </span>
            <div>
              <div className="chatbot-name">{BOT_NAME}</div>
              <div className="chatbot-status">מחובר</div>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="סגור">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg ${msg.from === 'bot' ? 'bot' : 'user'}`}>
              {msg.from === 'bot' && (
                <span className="chatbot-msg-avatar">
                  <img src="/logo-avatar.webp" alt="BA" />
                </span>
              )}
              <div className="chatbot-msg-content">
                <p className="chatbot-msg-text">{msg.text}</p>
                {msg.options && (
                  <div className="chatbot-options">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.value}
                        className="chatbot-option-btn"
                        onClick={() => handleOption(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <button
        className={`chatbot-trigger ${open ? 'active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'סגור צ׳אט' : 'פתח צ׳אט'}
      >
        {unread && !open && <span className="chatbot-badge" />}
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* head */}
            <circle cx="12" cy="7" r="3"/>
            {/* headset arc */}
            <path d="M6 10.5a6 6 0 0 1 12 0"/>
            {/* left ear cup */}
            <rect x="4.5" y="10.5" width="2.5" height="4" rx="1"/>
            {/* right ear cup */}
            <rect x="17" y="10.5" width="2.5" height="4" rx="1"/>
            {/* mic arm */}
            <path d="M19.5 14.5 Q19.5 17 17 17 H14"/>
            {/* mic dot */}
            <circle cx="14" cy="17" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
        )}
      </button>
    </>
  );
}
