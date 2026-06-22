import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fname: '',
    fphone: '',
    femail: '',
    fmessage: '',
    fexpertise: '',
    fattorney: '',
    subject: 'פנייה חדשה מאתר המשרד',
    from_name: 'אתר משרד ברזילי עזורי'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState({ fname: false, fphone: false });
  const [mapLinkHover, setMapLinkHover] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'whatsapp'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'fname' || name === 'fphone') {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fnameError = !formData.fname.trim();
    const fphoneError = !formData.fphone.trim();
    
    if (fnameError || fphoneError) {
      setErrors({ fname: fnameError, fphone: fphoneError });
      return;
    }

    setLoading(true);
    setFormError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      data.append('access_key', '65842ad6-8798-47fb-9eb5-c49f3e4ee7c6');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();

      if (json.success) {
        setSuccess(true);
      } else {
        console.error('[ContactForm] Web3Forms error:', json);
        throw new Error(json.message || 'שגיאה בשרת');
      }
    } catch (err) {
      console.error('[ContactForm] Submission failed:', err);
      setFormError(err.message || 'אירעה שגיאה בשליחה, אנא נסו שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-form-section" id="lead-form">
      <div className="gold-line"></div>
      <div className="contact-form-inner">
        <h2 className="section-title" style={{ textAlign: 'center' }}>נשמח לסייע לכם</h2>
        <p className="lead-subtitle" style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          בחרו את הדרך הנוחה לכם ליצירת קשר עמנו.
        </p>

        {/* ── Tab selector ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          background: 'rgba(26,58,92,0.06)',
          borderRadius: '50px',
          padding: '5px',
          maxWidth: '480px',
          margin: '0 auto 2.2rem',
          gap: '4px',
        }}>
          <button
            id="tabForm"
            type="button"
            onClick={() => setActiveTab('form')}
            style={{
              flex: 1,
              padding: '0.65rem 1.2rem',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.25s',
              background: activeTab === 'form' ? 'white' : 'transparent',
              color: activeTab === 'form' ? 'var(--navy-dark)' : 'var(--text-muted)',
              boxShadow: activeTab === 'form' ? '0 2px 10px rgba(26,58,92,0.12)' : 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            השאירו פרטים
          </button>
          <button
            id="tabWhatsapp"
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            style={{
              flex: 1,
              padding: '0.65rem 1.2rem',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.25s',
              background: activeTab === 'whatsapp' ? 'white' : 'transparent',
              color: activeTab === 'whatsapp' ? '#128C7E' : 'var(--text-muted)',
              boxShadow: activeTab === 'whatsapp' ? '0 2px 10px rgba(37,211,102,0.18)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, verticalAlign: 'middle' }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            שלחו הודעה
          </button>
        </div>

        {/* ── Form panel ── */}
        {activeTab === 'form' && (
          success ? (
            <div id="successMsg" className="success-msg" style={{ display: 'flex' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1aa055" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <div>
                <strong>תודה! פנייתכם התקבלה בהצלחה.</strong>
                <p>נציג מטעמנו יצור עמכם קשר בהקדם האפשרי.</p>
              </div>
            </div>
          ) : (
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fname">שם מלא</label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    required
                    placeholder=""
                    value={formData.fname}
                    onChange={handleChange}
                    style={errors.fname ? { borderColor: '#e24b4a', boxShadow: '0 0 0 3px rgba(226,75,74,.15)' } : {}}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fphone">טלפון</label>
                  <input
                    type="tel"
                    id="fphone"
                    name="fphone"
                    required
                    placeholder=""
                    value={formData.fphone}
                    onChange={handleChange}
                    style={errors.fphone ? { borderColor: '#e24b4a', boxShadow: '0 0 0 3px rgba(226,75,74,.15)' } : {}}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="femail">דוא"ל</label>
                  <input
                    type="email"
                    id="femail"
                    name="femail"
                    placeholder=""
                    value={formData.femail}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fexpertise">תחום פנייה</label>
                  <select
                    id="fexpertise"
                    name="fexpertise"
                    value={formData.fexpertise}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>בחרו תחום</option>
                    <option value="עסקאות נדל&quot;ן">עסקאות נדל&quot;ן</option>
                    <option value="התחדשות עירונית">התחדשות עירונית</option>
                    <option value="רישום זכויות בטאבו">רישום זכויות בטאבו</option>
                    <option value="רישום בתים משותפים">רישום בתים משותפים</option>
                    <option value="צוואות, ירושות ועזבונות">צוואות, ירושות ועזבונות</option>
                    <option value="ייפוי כוח מתמשך">ייפוי כוח מתמשך</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="fattorney">לאיזה עורך דין לפנות?</label>
                  <select
                    id="fattorney"
                    name="fattorney"
                    value={formData.fattorney}
                    onChange={handleChange}
                  >
                    <option value="">שניהם / לא משנה</option>
                    <option value="עו&quot;ד אגם ברזילי">עו&quot;ד אגם ברזילי</option>
                    <option value="עו&quot;ד לירון עזורי">עו&quot;ד לירון עזורי</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label htmlFor="fmessage">הודעה (אופציונלי)</label>
                  <textarea
                    id="fmessage"
                    name="fmessage"
                    rows="4"
                    placeholder="ספרו לנו בקצרה במה תרצו עזרה..."
                    value={formData.fmessage}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <input type="hidden" name="subject" value={formData.subject} />
              <input type="hidden" name="from_name" value={formData.from_name} />

              {/* ── Inline error banner ── */}
              {formError && (
                <div role="alert" style={{
                  background: '#fff3f3',
                  border: '1px solid #f5c6c6',
                  borderRadius: '10px',
                  padding: '1rem 1.2rem',
                  color: '#b91c1c',
                  fontSize: '0.93rem',
                  lineHeight: 1.6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  marginBottom: '0.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>אירעה שגיאה בשליחה. ניתן לנסות שוב, או לפנות אלינו ישירות:</span>
                  </div>
                  <a
                    href={`mailto:office@baz-law.co.il?subject=פנייה מהאתר&body=שם: ${formData.fname}%0Aטלפון: ${formData.fphone}%0Aהודעה: ${formData.fmessage}`}
                    style={{ color: '#1d4ed8', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'underline' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline', verticalAlign:'middle', marginLeft:'4px' }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> office@baz-law.co.il
                  </a>
                </div>
              )}

              <div className="form-submit" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <button type="submit" id="submitBtn" className="btn-primary" disabled={loading} style={{ minWidth: '220px', maxWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                  <span id="submitBtnText" style={{ display: loading ? 'none' : 'inline' }}>שליחת הפנייה</span>
                  <span id="submitBtnSpinner" className="spinner" style={{ display: loading ? 'inline' : 'none' }}></span>
                </button>
                <span className="form-note" style={{ position: 'relative', left: 'auto', display:'flex', alignItems:'center', gap:'0.35rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  הפרטים שלכם נשמרים בסודיות מלאה
                </span>
              </div>
            </form>
          )
        )}

        {/* ── WhatsApp panel ── */}
        {activeTab === 'whatsapp' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1rem 0 0.5rem' }}>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '1rem', maxWidth: '420px', lineHeight: 1.6 }}>
              בחרו את עורך הדין שתרצו לפנות אליו ישירות בוואטסאפ:
            </p>

            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              {/* כרטיס אגם */}
              <a
                href="https://wa.me/972542030535?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D%20%D7%9E%D7%94%D7%90%D7%AA%D7%A8"
                target="_blank"
                rel="noopener noreferrer"
                id="waAgam"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem',
                  background: 'white', border: '2px solid rgba(37,211,102,0.25)', borderRadius: '18px',
                  padding: '1.8rem 2rem', textDecoration: 'none', color: 'var(--navy-dark)',
                  flex: '1', minWidth: '200px', maxWidth: '240px',
                  boxShadow: '0 4px 18px rgba(37,211,102,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s', cursor: 'pointer',
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.22)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.55)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(37,211,102,0.1)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)'; }}
              >
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(135deg,#25D366,#128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,211,102,0.35)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>אגם ברזילי</div>
                  <div style={{ fontSize: '0.88rem', color: '#128C7E', fontWeight: 600 }}>054-2030535</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', color: 'white', borderRadius: '30px', padding: '0.45rem 1.2rem', fontSize: '0.88rem', fontWeight: 600 }}>
                  שלחו הודעה
                </div>
              </a>

              {/* כרטיס לירון */}
              <a
                href="https://wa.me/972542531925?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D%20%D7%9E%D7%94%D7%90%D7%AA%D7%A8"
                target="_blank"
                rel="noopener noreferrer"
                id="waLiron"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem',
                  background: 'white', border: '2px solid rgba(37,211,102,0.25)', borderRadius: '18px',
                  padding: '1.8rem 2rem', textDecoration: 'none', color: 'var(--navy-dark)',
                  flex: '1', minWidth: '200px', maxWidth: '240px',
                  boxShadow: '0 4px 18px rgba(37,211,102,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s', cursor: 'pointer',
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.22)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.55)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(37,211,102,0.1)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)'; }}
              >
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(135deg,#25D366,#128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,211,102,0.35)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>לירון עזורי</div>
                  <div style={{ fontSize: '0.88rem', color: '#128C7E', fontWeight: 600 }}>054-2531925</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', color: 'white', borderRadius: '30px', padding: '0.45rem 1.2rem', fontSize: '0.88rem', fontWeight: 600 }}>
                  שלחו הודעה
                </div>
              </a>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline', verticalAlign:'middle', marginLeft:'5px' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> הפרטים שלכם נשמרים בסודיות מלאה
            </p>
          </div>
        )}
      </div>
    </section>

    {/* ═══ CONTACT / MAP ═══ */}
      <section className="contact" id="contact">
        <div className="location-grid">

          {/* מפה */}
          <div className="map-container" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* פתיחה במפות Google */}
            <a
              href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIICAEQRRgnGDsyDggCEEUYORhDGIAEGIoFMgYIAxBFGDsyDAgEEAAYQxiABBiKBTIGCAUQRRg8MgYIBhBFGD0yBggHEEUYPdIBBzg5MWowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=il&sa=X&geocode=KZVxm3NtSx0VMdPRYn1cLs70&daddr=%D7%9E%D7%92%D7%93%D7%9C%D7%99+%D7%91%D7%A1%D7%A8+%D7%A1%D7%99%D7%98%D7%99%2C+%D7%96%D7%90%D7%91+%D7%96%27%D7%91%D7%95%D7%98%D7%A0%D7%A1%D7%A7%D7%99+61%2C+%D7%A4%D7%AA%D7%97+%D7%AA%D7%A7%D7%95%D7%95%D7%94"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                zIndex: 10,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fff',
                color: '#1a73e8',
                fontSize: '13px',
                fontFamily: "'Heebo', Arial, sans-serif",
                fontWeight: 500,
                padding: '7px 12px',
                borderRadius: '4px',
                boxShadow: mapLinkHover ? '0 2px 8px rgba(0,0,0,0.35)' : '0 1px 4px rgba(0,0,0,0.25)',
                textDecoration: 'none',
                direction: 'rtl',
                transition: 'box-shadow .2s',
              }}
              onMouseOver={() => setMapLinkHover(true)}
              onMouseOut={() => setMapLinkHover(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a73e8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              פתיחה במפות Google
            </a>
            <iframe
              src="https://maps.google.com/maps?q=32.09113289217626,34.86021375898328&output=embed&hl=iw&z=16"
              allowFullScreen={true}
              loading="lazy"
              title="מפת המשרד"
            >
            </iframe>
          </div>

          {/* פרטי מיקום */}
          <div className="location-info">
            <div className="location-title">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="26"
                height="26"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h2>מיקום המשרד</h2>
            </div>

            <p className="location-address-main">זאב ז'בוטינסקי 61, פתח תקווה</p>
            <p className="location-address-sub">בניין I, קומה 15</p>

            <p className="location-desc">משרדנו ממוקם בלב מתחם העסקים המודרני והנגיש של פתח תקווה. המיקום האסטרטגי מאפשר הגעה נוחה ומהירה מכל רחבי גוש דן, הן בתחבורה ציבורית והן ברכב פרטי. לרשות המבקרים עומדים חניונים מוסדרים ואפשרויות חניה רבות בסביבת המתחם.</p>

            <div className="nav-btns">
              <a
                href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIICAEQRRgnGDsyDggCEEUYORhDGIAEGIoFMgYIAxBFGDsyDAgEEAAYQxiABBiKBTIGCAUQRRg8MgYIBhBFGD0yBggHEEUYPdIBBzg5MWowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=il&sa=X&geocode=KZVxm3NtSx0VMdPRYn1cLs70&daddr=%D7%9E%D7%92%D7%93%D7%9C%D7%99+%D7%91%D7%A1%D7%A8+%D7%A1%D7%99%D7%98%D7%99%2C+%D7%96%D7%90%D7%91+%D7%96%27%D7%91%D7%95%D7%98%D7%A0%D7%A1%D7%A7%D7%99+61%2C+%D7%A4%D7%AA%D7%97+%D7%AA%D7%A7%D7%95%D7%95%D7%94"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn nav-btn-google"
              >
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?ll=32.09113289217626,34.86021375898328&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn nav-btn-waze"
              >
                Waze
              </a>
              <a
                href="https://moovitapp.com/?tll=32.09113289217626_34.86021375898328&lang=he"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn nav-btn-moovit"
              >
                Moovit
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
