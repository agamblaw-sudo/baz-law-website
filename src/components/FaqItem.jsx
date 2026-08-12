import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Single accordion row shared by FAQ.jsx and PracticeAreaDetail.jsx.
 * Native <details> can't animate its content open/close (closed content is
 * removed from layout, not just hidden), so this is a controlled button+div
 * instead — framer-motion measures the answer's real height and animates to
 * it, so the content no longer just snaps open.
 */
export default function FaqItem({ q, a, className = '', style }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <div
      className={`pa-faq-item ${open ? 'is-open' : ''} ${className}`.trim()}
      style={style}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        type="button"
        className="pa-faq-q"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={answerId}
        itemProp="name"
      >
        {q}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            className="pa-faq-a"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p itemProp="text">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
