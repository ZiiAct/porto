/**
 * Sidebar.jsx
 * Fixed left edge: vertical name + role label
 * Mirrors the left sidebar from mariavasilyeva.com
 */

import { motion } from 'framer-motion';
import './Sidebar.css';

export default function Sidebar({ isDark = false }) {
  return (
    <motion.aside
      className={`sidebar${isDark ? ' sidebar--dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <span className="sidebar__name">
        <span className="sidebar__play">▶</span>
        {' '}Ziyad
      </span>

      {/* Role — bottom of sidebar */}
      <span className="sidebar__role">
        Developer &amp; Designer
      </span>
    </motion.aside>
  );
}
