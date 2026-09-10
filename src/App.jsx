/**
 * App.jsx — Root component
 *
 * Provides:
 *  - Fixed frame layout (sidebar, menu button, menu overlay)
 *  - React Router page routing
 *  - Framer Motion page transitions
 *  - Global menu state
 */

import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar     from './components/layout/Sidebar';
import MenuButton  from './components/layout/MenuButton';
import MenuOverlay from './components/layout/MenuOverlay';

import Home    from './pages/Home';
import Work    from './pages/Work';
import About   from './pages/About';
import Contact from './pages/Contact';

/* Page enter/exit variants */
const pageVariants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ position: 'fixed', inset: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu  = () => setMenuOpen(false);

  return (
    <>
      {/* ── Global horizontal hairlines ── */}
      <div className="grid-lines" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div className="grid-line" key={i} />
        ))}
      </div>

      {/* ── Left sidebar ── */}
      <Sidebar isDark={menuOpen} />

      {/* ── Right menu button ── */}
      <MenuButton isOpen={menuOpen} onToggle={toggleMenu} />

      {/* ── Full-screen menu overlay ── */}
      <MenuOverlay isOpen={menuOpen} onClose={closeMenu} />

      {/* ── Page content (routed) ── */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<AnimatedPage><Home    /></AnimatedPage>} />
          <Route path="/work"    element={<AnimatedPage><Work    /></AnimatedPage>} />
          <Route path="/about"   element={<AnimatedPage><About   /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
