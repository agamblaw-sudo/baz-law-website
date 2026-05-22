import os
import re

base_dir = "/Users/apple/Documents/GitHub/baz-law-website"
index_bak = os.path.join(base_dir, "index.html.bak")
src_dir = os.path.join(base_dir, "src")
components_dir = os.path.join(src_dir, "components")
pages_dir = os.path.join(src_dir, "pages")

os.makedirs(components_dir, exist_ok=True)
os.makedirs(pages_dir, exist_ok=True)

with open(index_bak, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Define functions to clean HTML content to React JSX
def clean_to_jsx(html_text):
    # Replace class= with className=
    jsx = re.sub(r'\bclass\s*=\s*(["\'])(.*?)\1', r'className=\1\2\1', html_text)
    # Replace for= with htmlFor=
    jsx = re.sub(r'\bfor\s*=\s*(["\'])(.*?)\1', r'htmlFor=\1\2\1', jsx)
    
    # Replace inline onclick="closeMobileMenu()"
    jsx = jsx.replace('onclick="closeMobileMenu()"', 'onClick={closeMobileMenu}')
    
    # Replace HTML comments with JSX comments
    jsx = re.sub(r'<!-- (?!═══)(.*?) -->', r'{/* \1 */}', jsx)
    
    # Make sure self-closing tags are closed
    jsx = re.sub(r'<img\b([^>]*?)(?<!/)>', r'<img\1 />', jsx)
    jsx = re.sub(r'<input\b([^>]*?)(?<!/)>', r'<input\1 />', jsx)
    jsx = jsx.replace('<br>', '<br />').replace('<br/>', '<br />')
    jsx = jsx.replace('<hr>', '<hr />').replace('<hr/>', '<hr />')
    
    return jsx

# Let's extract sections based on the dividers
sections = {}
dividers = [
    ("NAVBAR", "<!-- ═══ NAVBAR ═══ -->"),
    ("MOBILE_MENU", "<!-- ═══ MOBILE MENU DRAWER ═══ -->"),
    ("HERO", "<!-- ═══ HERO ═══ -->"),
    ("ATTORNEYS", "<!-- ═══ ATTORNEYS ═══ -->"),
    ("EXPERTISE", "<!-- ═══ EXPERTISE ═══ -->"),
    ("TESTIMONIALS", "<!-- ═══ TESTIMONIALS ═══ -->"),
    ("CONTACT_FORM", "<!-- ═══ CONTACT FORM ═══ -->"),
    ("CONTACT_MAP", "<!-- ═══ CONTACT / MAP ═══ -->"),
    ("FOOTER", "<!-- ═══ FOOTER ═══ -->"),
    ("ACCESSIBILITY_WIDGET", "<!-- ═══ ACCESSIBILITY WIDGET ═══ -->")
]

# Find content between dividers
for i in range(len(dividers)):
    name, div = dividers[i]
    start_idx = html_content.find(div)
    if start_idx == -1:
        print("Warning: Divider {} not found!".format(div))
        continue
    
    if i < len(dividers) - 1:
        next_name, next_div = dividers[i+1]
        end_idx = html_content.find(next_div)
    else:
        end_idx = html_content.find("<style>")
        if end_idx == -1:
            end_idx = html_content.find("<script>")
        if end_idx == -1:
            end_idx = len(html_content)
            
    sections[name] = html_content[start_idx:end_idx].strip()

print("Extracted sections: {}".format(list(sections.keys())))

# 1. Navbar.jsx
navbar_html = sections.get("NAVBAR", "")
mobile_html = sections.get("MOBILE_MENU", "")
navbar_jsx = clean_to_jsx(navbar_html)
mobile_jsx = clean_to_jsx(mobile_html)

navbar_component = """import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      %NAVBAR_JSX%
      
      <div id="mobileMenu" className={`mobile-menu ${isOpen ? "open" : ""}`}>
        %MOBILE_JSX%
      </div>
    </>
  );
}
""".replace('%NAVBAR_JSX%', navbar_jsx.replace('class="navbar"', 'className={`navbar ${isScrolled ? "scrolled" : ""}`}')
                                     .replace('id="hamburger"', 'id="hamburger" className={isOpen ? "open" : ""} onClick={toggleMenu} aria-expanded={isOpen ? "true" : "false"}')) \
   .replace('%MOBILE_JSX%', mobile_jsx.replace('<div id="mobileMenu" className="mobile-menu">', '').replace('</div>', ''))

with open(os.path.join(components_dir, "Navbar.jsx"), 'w', encoding='utf-8') as f:
    f.write(navbar_component)

# Helper function to generate simple components
def generate_simple_component(name, html_key):
    html_data = sections.get(html_key, "")
    jsx = clean_to_jsx(html_data)
    component_text = """import React from 'react';

export default function %NAME%() {
  return (
    %JSX%
  );
}
""".replace('%NAME%', name).replace('%JSX%', jsx)
    
    with open(os.path.join(components_dir, name + ".jsx"), 'w', encoding='utf-8') as f:
        f.write(component_text)

# 2. Hero.jsx
generate_simple_component("Hero", "HERO")

# 3. Attorneys.jsx
generate_simple_component("Attorneys", "ATTORNEYS")

# 4. Expertise.jsx
generate_simple_component("Expertise", "EXPERTISE")

# 5. Testimonials.jsx
generate_simple_component("Testimonials", "TESTIMONIALS")

# 6. ContactForm.jsx
form_html = sections.get("CONTACT_FORM", "")
map_html = sections.get("CONTACT_MAP", "")
form_jsx = clean_to_jsx(form_html)
map_jsx = clean_to_jsx(map_html)

contact_component = """import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fname: '',
    fphone: '',
    femail: '',
    fmessage: '',
    fexpertise: 'נדל"ן ועסקאות מכר',
    subject: 'פנייה חדשה מאתר המשרד',
    from_name: 'אתר משרד ברזילי-עזורי'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ fname: false, fphone: false });

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
    <section className="lead-form" id="lead-form">
      <div className="lead-container">
        
        <div className="lead-form-area">
          <h2 className="lead-title">נשמח לסייע לכם</h2>
          <p className="lead-subtitle">
            השאירו פרטים ונחזור אליכם בהקדם לתיאום פגישת ייעוץ אישית ומקצועית.
          </p>

          {success ? (
            <div id="successMsg" className="success-message" style={{ display: 'flex' }}>
              <div className="success-icon">✓</div>
              <h3 className="success-title">הפרטים התקבלו בהצלחה!</h3>
              <p className="success-desc">נציג מטעמנו יצור עמכם קשר בהקדם האפשרי.</p>
            </div>
          ) : (
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fname">שם מלא *</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  placeholder="ישראל ישראלי"
                  value={formData.fname}
                  onChange={handleChange}
                  style={errors.fname ? { borderColor: '#e24b4a', boxShadow: '0 0 0 3px rgba(226,75,74,.15)' } : {}}
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="fphone">טלפון נייד *</label>
                  <input
                    type="tel"
                    id="fphone"
                    name="fphone"
                    required
                    placeholder="050-0000000"
                    value={formData.fphone}
                    onChange={handleChange}
                    style={errors.fphone ? { borderColor: '#e24b4a', boxShadow: '0 0 0 3px rgba(226,75,74,.15)' } : {}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="femail">כתובת אימייל</label>
                  <input
                    type="email"
                    id="femail"
                    name="femail"
                    placeholder="name@example.com"
                    value={formData.femail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="fexpertise">נושא הפנייה</label>
                <select
                  id="fexpertise"
                  name="fexpertise"
                  value={formData.fexpertise}
                  onChange={handleChange}
                >
                  <option value='נדל"ן ועסקאות מכר'>נדל"ן ועסקאות מכר (רכישה / מכירה)</option>
                  <option value="צוואות, ירושות ועזבונות">צוואות, ירושות ועזבונות</option>
                  <option value="ייפוי כוח מתמשך">ייפוי כוח מתמשך</option>
                  <option value="משפט אזרחי ומסחרי">משפט אזרחי ומסחרי</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="fmessage">כיצד נוכל לעזור?</label>
                <textarea
                  id="fmessage"
                  name="fmessage"
                  rows="4"
                  placeholder="פירוט קצר על פנייתכם..."
                  value={formData.fmessage}
                  onChange={handleChange}
                ></textarea>
              </div>

              <input type="hidden" name="subject" value={formData.subject} />
              <input type="hidden" name="from_name" value={formData.from_name} />

              <button type="submit" id="submitBtn" className="btn-submit" disabled={loading}>
                <span id="submitBtnText" style={{ display: loading ? 'none' : 'inline' }}>שליחת פנייה</span>
                <span id="submitBtnSpinner" className="spinner" style={{ display: loading ? 'inline' : 'none' }}></span>
              </button>
            </form>
          )}
        </div>

        %MAP_JSX%
      </div>
    </section>
  );
}
""".replace('%MAP_JSX%', map_jsx.replace('<div className="lead-info-area">', '<div className="lead-info-area">').replace('</div>\n      </div>\n    </section>', ''))

with open(os.path.join(components_dir, "ContactForm.jsx"), 'w', encoding='utf-8') as f:
    f.write(contact_component)

# 7. Footer.jsx
footer_html = sections.get("FOOTER", "")
footer_jsx = clean_to_jsx(footer_html)
footer_jsx = footer_jsx.replace('<a href="./accessibility.html"', '<Link to="/accessibility"')
footer_jsx = footer_jsx.replace('<a href="./privacy.html"', '<Link to="/privacy"')
footer_jsx = footer_jsx.replace('<a href="./terms.html"', '<Link to="/terms"')
footer_jsx = footer_jsx.replace('</a>', '</Link>', 3)

footer_component = """import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    %JSX%
  );
}
""".replace('%JSX%', footer_jsx)
with open(os.path.join(components_dir, "Footer.jsx"), 'w', encoding='utf-8') as f:
    f.write(footer_component)

# 8. AccessibilityWidget.jsx
a11y_component = """import React, { useState, useEffect } from 'react';

export default function AccessibilityWidget() {
  const [state, setState] = useState({
    fontSize: 100,
    font: false,
    contrast: 'normal',
    links: false,
    headings: false,
    anim: false,
    sr: false
  });

  const [panelOpen, setPanelOpen] = useState(false);
  const STORAGE_KEY = 'baz-a11y-v1';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}

    const html = document.documentElement;
    html.style.fontSize = state.fontSize + '%';
    html.classList.toggle('a11y-font', state.font);
    html.classList.remove('a11y-high-contrast', 'a11y-invert', 'a11y-mono');
    if (state.contrast === 'high')   html.classList.add('a11y-high-contrast');
    if (state.contrast === 'invert') html.classList.add('a11y-invert');
    if (state.contrast === 'mono')   html.classList.add('a11y-mono');

    html.classList.toggle('a11y-links',    state.links);
    html.classList.toggle('a11y-headings', state.headings);
    html.classList.toggle('a11y-no-anim',  state.anim);
    html.classList.toggle('a11y-sr',       state.sr);
  }, [state]);

  const togglePanel = () => setPanelOpen(!panelOpen);
  const closePanel = () => setPanelOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && panelOpen) closePanel();
    };
    
    const handleMouseDown = (e) => {
      const panel = document.getElementById('a11y-panel');
      const btn = document.getElementById('a11y-btn');
      if (panel && btn && panelOpen && !panel.contains(e.target) && !btn.contains(e.target)) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [panelOpen]);

  const changeFontSize = (diff) => {
    setState(prev => ({
      ...prev,
      fontSize: Math.max(70, Math.min(200, prev.fontSize + diff))
    }));
  };

  const toggleFeature = (key) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setContrast = (mode) => {
    setState(prev => ({ ...prev, contrast: mode }));
  };

  const resetAll = () => {
    setState({
      fontSize: 100,
      font: false,
      contrast: 'normal',
      links: false,
      headings: false,
      anim: false,
      sr: false
    });
  };

  return (
    <>
      <button 
        id="a11y-btn" 
        aria-label="הגדרות נגישות" 
        aria-expanded={panelOpen ? "true" : "false"}
        aria-controls="a11y-panel" 
        title="הגדרות נגישות"
        className={panelOpen ? "open" : ""}
        onClick={togglePanel}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <circle cx="12" cy="4" r="2.2"/>
          <path d="M19 8H5l1.6 5.5H10V22h4V13.5h3.4L19 8z"/>
        </svg>
      </button>

      <aside id="a11y-panel" className={panelOpen ? "a11y-open" : ""} role="dialog" aria-label="הגדרות נגישות" aria-modal="true" aria-hidden={panelOpen ? "false" : "true"} dir="rtl">
        <div className="a11y-hdr">
          <div className="a11y-hdr-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
            הגדרות נגישות
          </div>
          <button className="a11y-close-btn" id="a11y-close" aria-label="סגור" onClick={closePanel}>✕</button>
        </div>

        <div className="a11y-sec">
          <div className="a11y-sec-label">גודל טקסט</div>
          <div className="a11y-size-row">
            <button className="a11y-size-btn" id="a11y-plus" aria-label="הגדל טקסט" onClick={() => changeFontSize(10)}>+</button>
            <span className="a11y-size-val" id="a11y-size-val">{state.fontSize}%</span>
            <button className="a11y-size-btn" id="a11y-minus" aria-label="הקטן טקסט" onClick={() => changeFontSize(-10)}>−</button>
          </div>
        </div>

        <div className="a11y-sec">
          <div className="a11y-sec-label">גופן קריאה (Sans-Serif)</div>
          <div className="a11y-row-item">
            <button className="a11y-toggle-btn" id="a11y-toggle-font" aria-pressed={state.font} onClick={() => toggleFeature('font')}>
              <span className="a11y-toggle-track"><span className="a11y-toggle-knob"></span></span>
              <span className="a11y-toggle-lbl">{state.font ? "פעיל" : "כבוי"}</span>
            </button>
          </div>
        </div>

        <div className="a11y-sec">
          <div className="a11y-sec-label">מצב ניגודיות</div>
          <div className="a11y-contrast-grid">
            <button className={`a11y-mode-btn ${state.contrast === 'normal' ? 'active' : ''}`} id="a11y-c-normal" onClick={() => setContrast('normal')}>רגיל</button>
            <button className={`a11y-mode-btn ${state.contrast === 'high' ? 'active' : ''}`} id="a11y-c-high" onClick={() => setContrast('high')}>ניגודיות גבוהה</button>
            <button className={`a11y-mode-btn ${state.contrast === 'invert' ? 'active' : ''}`} id="a11y-c-invert" onClick={() => setContrast('invert')}>הפוך</button>
            <button className={`a11y-mode-btn ${state.contrast === 'mono' ? 'active' : ''}`} id="a11y-c-mono" onClick={() => setContrast('mono')}>מונוכרום</button>
          </div>
        </div>

        <div className="a11y-sec">
          <div className="a11y-sec-label">הדגשת אלמנטים</div>
          
          <div className="a11y-row-item">
            <span>הדגש קישורים</span>
            <button className="a11y-toggle-btn" id="a11y-toggle-links" aria-pressed={state.links} onClick={() => toggleFeature('links')}>
              <span className="a11y-toggle-track"><span className="a11y-toggle-knob"></span></span>
              <span className="a11y-toggle-lbl">{state.links ? "פעיל" : "כבוי"}</span>
            </button>
          </div>

          <div className="a11y-row-item">
            <span>הדגש כותרות</span>
            <button className="a11y-toggle-btn" id="a11y-toggle-headings" aria-pressed={state.headings} onClick={() => toggleFeature('headings')}>
              <span className="a11y-toggle-track"><span className="a11y-toggle-knob"></span></span>
              <span className="a11y-toggle-lbl">{state.headings ? "פעיל" : "כבוי"}</span>
            </button>
          </div>
        </div>

        <div className="a11y-sec">
          <div className="a11y-sec-label">תוכן ותצוגה</div>

          <div className="a11y-row-item">
            <span>בטל אנימציות</span>
            <button className="a11y-toggle-btn" id="a11y-toggle-anim" aria-pressed={state.anim} onClick={() => toggleFeature('anim')}>
              <span className="a11y-toggle-track"><span className="a11y-toggle-knob"></span></span>
              <span className="a11y-toggle-lbl">{state.anim ? "פעיל" : "כבוי"}</span>
            </button>
          </div>

          <div className="a11y-row-item">
            <span>קורא מסך (למפתחים)</span>
            <button className="a11y-toggle-btn" id="a11y-toggle-sr" aria-pressed={state.sr} onClick={() => toggleFeature('sr')}>
              <span className="a11y-toggle-track"><span className="a11y-toggle-knob"></span></span>
              <span className="a11y-toggle-lbl">{state.sr ? "פעיל" : "כבוי"}</span>
            </button>
          </div>
        </div>

        <div style={{ padding: '1rem' }}>
          <button className="a11y-reset-btn" id="a11y-reset" onClick={resetAll}>איפוס הגדרות</button>
        </div>
      </aside>
    </>
  );
}
"""
with open(os.path.join(components_dir, "AccessibilityWidget.jsx"), 'w', encoding='utf-8') as f:
    f.write(a11y_component)

# Pages

# 9. Home.jsx
home_page = """import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Attorneys from '../components/Attorneys';
import Expertise from '../components/Expertise';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          const heading = target.querySelector('h2') || target;
          const viewH = window.innerHeight;
          const desiredTop = Math.round(viewH * 0.25);
          const rect = heading.getBoundingClientRect();
          const currentTop = window.pageYOffset + rect.top;
          window.scrollTo({ top: currentTop - desiredTop, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main>
      <Hero />
      <Attorneys />
      <Expertise />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
"""
with open(os.path.join(pages_dir, "Home.jsx"), 'w', encoding='utf-8') as f:
    f.write(home_page)

# Helper function to generate legal subpages
def generate_legal_page(name, source_file_name):
    source_path = os.path.join(base_dir, source_file_name)
    with open(source_path, 'r', encoding='utf-8') as f:
        sub_content = f.read()
    
    main_pattern = re.compile(r'<main\b[^>]*>(.*?)</main>', re.DOTALL)
    m = main_pattern.search(sub_content)
    if m:
        main_html = m.group(1).strip()
    else:
        main_html = "<div>Content not found.</div>"
        
    jsx = clean_to_jsx(main_html)
    page_text = """import React, { useEffect } from 'react';

export default function %NAME%() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      %JSX%
    </main>
  );
}
""".replace('%NAME%', name).replace('%JSX%', jsx)
    
    with open(os.path.join(pages_dir, name + ".jsx"), 'w', encoding='utf-8') as f:
        f.write(page_text)

# 10. Privacy.jsx
generate_legal_page("Privacy", "privacy.html.bak")

# 11. Terms.jsx
generate_legal_page("Terms", "terms.html.bak")

# 12. Accessibility.jsx
generate_legal_page("Accessibility", "accessibility.html.bak")

print("Generated all React page and component files successfully!")
