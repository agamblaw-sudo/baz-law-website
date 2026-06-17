import React from 'react';

const faqCategories = [
  {
    category: 'נדל"ן',
    items: [
      {
        q: 'מהו הצעד הראשון לפני שקונים דירה?',
        a: 'הצעד הראשון והחשוב ביותר הוא בדיקת תקציב מקיפה והוצאת "אישור עקרוני" למשכנתא מהבנק, עוד לפני החתימה על זיכרון דברים או חוזה.'
      },
      {
        q: 'מדוע חשוב להיעזר בעורך דין בעסקת מקרקעין?',
        a: 'עורך הדין מוודא שהנכס נקי משעבודים ועיקולים, מגן על הזכויות שלכם בחוזה, מטפל בהיבטי המיסוי ודואג לרישום מסודר של הנכס על שמכם.'
      },
      {
        q: 'מהי "הערת אזהרה" ולמה היא קריטית?',
        a: 'זהו רישום בטאבו שנועד להגן על הקונה מיד לאחר חתימת החוזה. ההערה מונעת מהמוכר למכור את הנכס לאדם אחר או לשעבד אותו בטרם הושלמה העסקה.'
      },
      {
        q: 'מי משלם מס רכישה ומתי?',
        a: 'מס רכישה חל על רוכש הנכס. גובה המס תלוי בשווי הנכס ובשאלה האם זוהי דירתו היחידה של הקונה או דירה להשקעה.'
      },
      {
        q: 'כמה זמן לוקח תהליך רכישת או מכירת דירה?',
        a: 'לרוב מדובר בתהליך שאורך בין חודשיים לחצי שנה, בהתאם לקצב קבלת המשכנתא, מועד פינוי הנכס המוסכם ותנאי התשלום.'
      }
    ]
  },
  {
    category: 'צוואות וירושות',
    items: [
      {
        q: 'למה כדאי לי לערוך צוואה אם יש חוק ירושה?',
        a: 'חוק הירושה קובע חלוקת רכוש כברירת מחדל שלא תמיד תואמת את הרצון האישי שלכם. צוואה מאפשרת לכם לקבוע בדיוק מי יקבל מה, ומונעת סכסוכים משפחתיים עתידיים.'
      }
    ]
  },
  {
    category: 'ייפוי כוח מתמשך',
    items: [
      {
        q: 'מהו ייפוי כוח מתמשך?',
        a: 'זהו מסמך משפטי המאפשר לאדם לתכנן את עתידו ולבחור מראש מי יקבל החלטות עבורו (בענייני רכוש, רפואה ואישיים) במידה ויאבד את צלילותו או את כושר קבלת ההחלטות.'
      },
      {
        q: 'את מי כדאי למנות כמיופה כוח?',
        a: 'מומלץ למנות אדם שאתם סומכים עליו במאת האחוזים, לרוב בן/בת זוג, ילדים בגיר או חבר קרוב. ניתן למנות מספר מיופיי כוח ולהגדיר את חלוקת האחריות ביניהם.'
      },
      {
        q: 'מתי המסמך נכנס לתוקף?',
        a: 'המסמך "שוכב במגירה" ונכנס לתוקף אך ורק אם וכאשר רופא מומחה קובע שאינכם מסוגלים יותר להבין או לקבל החלטות באותם עניינים שהוגדרו מראש.'
      }
    ]
  }
];

export default function FAQ() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-inner">
        <h2 id="faq-heading" className="section-title">שאלות נפוצות</h2>
        
        {faqCategories.map((cat, catIdx) => (
          <div key={catIdx} className="faq-category-group" style={{ marginBottom: '2.5rem' }}>
            <h3 className="faq-category-title">
              {cat.category}
            </h3>
            
            <div className="pa-faq-list" itemScope itemType="https://schema.org/FAQPage">
              {cat.items.map((faq, index) => (
                <details
                  key={index}
                  className="pa-faq-item"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="pa-faq-q" itemProp="name">
                    {faq.q}
                  </summary>
                  <div
                    className="pa-faq-a"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
