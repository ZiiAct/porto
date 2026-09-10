/**
 * ProjectSlide.jsx
 * One horizontal "slide" on the homepage.
 * Contains overlapping ShapeMockup compositions.
 * Scroll wheel drives horizontal movement (handled in Home.jsx).
 *
 * Props:
 *  project   { index, name, role, shapes[] }
 *  isFirst   {boolean} — show scroll hint on first slide
 */

import { motion } from 'framer-motion';
import ShapeMockup from '../ui/ShapeMockup';
import './ProjectSlide.css';

export default function ProjectSlide({ project, isFirst = false }) {
  const { shapes = [] } = project;

  return (
    <div className="project-slide">
      {/* Scroll hint — only on first slide */}
      {isFirst && (
        <div className="project-slide__scroll-hint" aria-label="Scroll to browse">
          Scroll
        </div>
      )}

      {/* Shape composition canvas */}
      <div className="project-slide__canvas" aria-label={`Project: ${project.name}`}>
        {shapes.map((s, i) => (
          <motion.div
            key={i}
            className="project-slide__shape"
            style={{
              top:    s.top,
              left:   s.left,
              width:  s.width,
              height: s.height,
              zIndex: s.z ?? i,
              rotate: s.rotate ?? 0,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <ShapeMockup
              width="100%"
              height="100%"
              shape={s.shape ?? 'rect'}
              color={s.color ?? 'smoke'}
              label={s.label ?? project.name}
            />
          </motion.div>
        ))}
      </div>

      {/* Annotation dots (right side decoration) */}
      <div className="project-slide__annotation" aria-hidden="true">
        <div className="project-slide__dot" />
        <div className="project-slide__dot" />
        <div className="project-slide__dot" />
      </div>
    </div>
  );
}
