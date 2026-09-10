/**
 * Contact.jsx — Blank placeholder page
 * Will become the contact / get in touch section.
 */

import { motion } from 'framer-motion';
import './BlankPage.css';

const LINE_COUNT = 8;

export default function Contact() {
  return (
    <div className="blank-page">
      <div className="blank-page__lines" aria-hidden="true">
        {[...Array(LINE_COUNT)].map((_, i) => (
          <div className="blank-page__line" key={i} />
        ))}
      </div>

      <motion.h1
        className="blank-page__title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        id="contact-page-title"
      >
        CONTACT
      </motion.h1>

      <motion.p
        className="blank-page__tag"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Get in touch
      </motion.p>

      <motion.div
        className="blank-page__status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Content coming soon
      </motion.div>
    </div>
  );
}
