import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fname: '',
    fphone: '',
    femail: '',
    fmessage: '',
    fexpertise: '',
    subject: 'פנייה חדשה מאתר המשרד',
    from_name: 'אתר משרד ברזילי-עזורי'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ fname: false, fphone: false });
  const [mapLinkHover, setMapLinkHover] = useState(false);

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
        throw new Error(json.message || 'שגיאה');
      }
    } catch (err) {
      alert('אירעה שגיאה בשליחה, אנא נסו שוב.');
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
          השאירו פרטים ונחזור אליכם בהקדם לתיאום פגישת ייעוץ אישית ומקצועית.
        </p>

        {success ? (
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

            <div className="form-submit">
              <button type="submit" id="submitBtn" className="btn-primary" disabled={loading}>
                <span id="submitBtnText" style={{ display: loading ? 'none' : 'inline' }}>שליחת הפנייה</span>
                <span id="submitBtnSpinner" className="spinner" style={{ display: loading ? 'inline' : 'none' }}></span>
              </button>
              <span className="form-note">הפרטים שלכם נשמרים בסודיות מלאה</span>
            </div>
          </form>
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
                fontFamily: 'Arial, sans-serif',
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
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" fill="white" />
                </svg>
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?ll=32.09113289217626,34.86021375898328&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn nav-btn-waze"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M20.5 9.5C20.5 14.19 16.63 18 11.88 18c-.9 0-1.77-.13-2.59-.37L6 19l.88-3.07A8.44 8.44 0 0 1 3.5 9.5C3.5 4.81 7.31 1 12 1s8.5 3.81 8.5 8.5z" />
                  <circle cx="9" cy="10" r="1" fill="#00bcd4" />
                  <circle cx="14" cy="10" r="1" fill="#00bcd4" />
                  <path d="M9 13s1 1.5 3 1.5 3-1.5 3-1.5" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
                </svg>
                Waze
              </a>
              <a
                href="https://moovitapp.com/?tll=32.09113289217626_34.86021375898328&lang=he"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn nav-btn-moovit"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
                Moovit
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
