/**
 * MenuOverlay.jsx
 * Fullscreen dark navigation overlay.
 * Inspired by mariavasilyeva.com menu.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './MenuOverlay.css';

const NAV_ITEMS = [
  { num: '01', title: 'Home',    tag: 'Start here',  path: '/' },
  { num: '02', title: 'Work',    tag: 'Projects',    path: '/work' },
  { num: '03', title: 'About',   tag: 'Who I am',    path: '/about' },
  { num: '04', title: 'Contact', tag: 'Get in touch', path: '/contact' },
];

// Overlay animation variants
const overlayVariants = {
  hidden: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
  },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
  },
};

// Nav item stagger
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  }),
};

export default function MenuOverlay({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNav = (path) => {
    onClose();
    // Small delay to let overlay close
    setTimeout(() => navigate(path), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Horizontal hairlines */}
          <div className="menu-overlay__lines" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <div className="menu-overlay__line" key={i} />
            ))}
          </div>

          {/* Nav items */}
          <nav className="menu-overlay__nav">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                className="menu-nav-item"
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => handleNav(item.path)}
                id={`nav-item-${item.title.toLowerCase()}`}
              >
                <span className="menu-nav-item__num">({item.num})</span>
                <span className="menu-nav-item__title">{item.title.toUpperCase()}</span>
                <span className="menu-nav-item__tag">{item.tag}</span>
              </motion.div>
            ))}
          </nav>

          {/* Bottom links */}
          <div className="menu-overlay__bottom">
            <a
              href="mailto:hello@portoziyad.web.id"
              className="menu-overlay__bottom-link"
              id="menu-email-link"
            >
              Get in touch
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-overlay__bottom-link"
              id="menu-github-link"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-overlay__bottom-link"
              id="menu-linkedin-link"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
