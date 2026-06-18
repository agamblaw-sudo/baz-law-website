import React, { useState, useEffect, useRef } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' | 'form'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [target, setTarget] = useState('both'); // 'agam' | 'liron' | 'both'
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const message = encodeURIComponent("היי! הגעתי דרך האתר, אשמח לקבל מכם שירות משפטי.");
  const agamUrl = `https://wa.me/972542030535?text=${message}`;
  const lironUrl = `https://wa.me/972542531925?text=${message}`;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('fname', name);
      data.append('fphone', phone);
      data.append('fexpertise', 'השארת פרטים מווידג׳ט וואטסאפ');
      data.append('fmessage', `פנייה מהירה לחזרה. עורך הדין המבוקש לחזרה: ${target === 'agam' ? 'עו״ד אגם ברזילי' : target === 'liron' ? 'עו״ד לירון עזורי' : 'שניהם / לא משנה'}${topic ? `. נושא הפנייה: ${topic}` : ''}`);
      data.append('subject', 'פנייה מהירה לחזרה (ווידג׳ט וואטסאפ)');
      data.append('from_name', 'ווידג׳ט וואטסאפ באתר');
      data.append('access_key', '65842ad6-8798-47fb-9eb5-c49f3e4ee7c6');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setName('');
        setPhone('');
        setTopic('');
      } else {
        throw new Error(json.message || 'error');
      }
    } catch (err) {
      alert('אירעה שגיאה בשליחה, אנא נסו שוב.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="whatsapp-widget-container" ref={widgetRef} dir="rtl">
      {/* Popup Options Card */}
      <div className={`whatsapp-popup-card ${isOpen ? 'open' : ''}`}>
        <div className="whatsapp-popup-header">
          <div className="whatsapp-popup-title">יצירת קשר מהירה</div>
          <button
            className="whatsapp-popup-close"
            onClick={() => setIsOpen(false)}
            aria-label="סגור תפריט"
          >
            &times;
          </button>
        </div>

        {/* Tab Selector */}
        <div className="whatsapp-tab-selector" style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            type="button"
            className={`whatsapp-tab-btn ${activeTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => { setActiveTab('whatsapp'); setSuccess(false); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'whatsapp' ? '2.5px solid var(--gold-mid)' : 'none',
              color: activeTab === 'whatsapp' ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            שיחה בוואטסאפ
          </button>
          <button
            type="button"
            className={`whatsapp-tab-btn ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => { setActiveTab('form'); setSuccess(false); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'form' ? '2.5px solid var(--gold-mid)' : 'none',
              color: activeTab === 'form' ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            נחזור אליכם
          </button>
        </div>

        <div className="whatsapp-popup-body">
          {activeTab === 'whatsapp' ? (
            <>
              <p className="whatsapp-popup-text">
                שלום! בחרו את עורך הדין שברצונכם לפנות אליו ישירות בוואטסאפ:
              </p>
              <div className="whatsapp-popup-options">
                <a href={agamUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-popup-option-btn" onClick={() => setIsOpen(false)}>
                  <div className="whatsapp-option-details">
                    <span className="whatsapp-option-name">עו״ד אגם ברזילי</span>
                    <span className="whatsapp-option-phone">054-2030535</span>
                  </div>
                  <svg className="whatsapp-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </a>
                <a href={lironUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-popup-option-btn" onClick={() => setIsOpen(false)}>
                  <div className="whatsapp-option-details">
                    <span className="whatsapp-option-name">עו״ד לירון עזורי</span>
                    <span className="whatsapp-option-phone">054-2531925</span>
                  </div>
                  <svg className="whatsapp-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </>
          ) : (
            <div className="whatsapp-form-wrapper">
              {success ? (
                <div style={{ textAlign: 'center', padding: '1rem 0', color: '#4ade80' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>הפנייה נשלחה בהצלחה!</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>נחזור אליכם בהקדם האפשרי.</div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>שם מלא</label>
                    <input
                      type="text"
                      required
                      placeholder="הקלידו שם מלא"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        padding: '0.45rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        fontSize: '0.8rem',
                        outline: 'none',
                        textAlign: 'right'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>מספר טלפון</label>
                    <input
                      type="tel"
                      required
                      placeholder="הקלידו מספר טלפון"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        padding: '0.45rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        fontSize: '0.8rem',
                        outline: 'none',
                        textAlign: 'right'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>נושא הפנייה</label>
                    <input
                      type="text"
                      placeholder="לדוגמה: רכישת דירה, טאבו..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      style={{
                        padding: '0.45rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        fontSize: '0.8rem',
                        outline: 'none',
                        textAlign: 'right'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>מי יחזור אליכם?</label>
                    <select
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      style={{
                        padding: '0.45rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: '#10293f',
                        color: '#fff',
                        fontSize: '0.8rem',
                        outline: 'none',
                        textAlign: 'right'
                      }}
                    >
                      <option value="both">אגם או לירון (שניהם)</option>
                      <option value="agam">עו״ד אגם ברזילי</option>
                      <option value="liron">עו״ד לירון עזורי</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      marginTop: '0.4rem',
                      padding: '0.55rem',
                      background: 'var(--gold-mid)',
                      color: '#10293f',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    {submitting ? 'שולח...' : 'שלחו פנייה לחזרה'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="whatsapp-widget-row">
        <a
          href="https://www.facebook.com/profile.php?id=61590961314809"
          target="_blank"
          rel="noopener noreferrer"
          className="header-facebook-trigger-btn"
          title="עמוד הפייסבוק של המשרד"
        >
          <svg className="whatsapp-trigger-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>

        <button
          className={`whatsapp-trigger-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="פתח יצירת קשר בוואטסאפ"
          title="דברו איתנו בוואטסאפ"
        >
          <span className="whatsapp-trigger-pulse"></span>
          <svg className="whatsapp-trigger-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
