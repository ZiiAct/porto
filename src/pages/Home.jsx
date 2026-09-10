/**
 * Home.jsx — Homepage
 *
 * Layout:
 *  - Fixed frame: sidebar (left), MENU button (right)
 *  - Central area: horizontal-scroll canvas of project slides
 *  - Mouse wheel / trackpad scrolls the canvas horizontally
 *  - Bottom bar: project index + name + view link
 *  - Minimap progress bar at top
 *
 * Project shapes are placeholder ShapeMockup components.
 * Replace shape definitions with real images later.
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ProjectSlide from '../components/home/ProjectSlide';
import BottomBar from '../components/home/BottomBar';
import './Home.css';

/* ─────────────────────────────────────────────
   Project data — replace shapes with <img> later
   ───────────────────────────────────────────── */
const PROJECTS = [
  {
    index: 1,
    name: 'Project Alpha',
    href: '#',
    shapes: [
      // Main hero shape
      { top: '10%',  left: '8%',  width: '340px', height: '280px', color: 'lavender', shape: 'rect',    rotate: -2,  z: 1, label: 'hero' },
      // Overlapping secondary
      { top: '30%',  left: '22%', width: '220px', height: '180px', color: 'dark',     shape: 'rounded', rotate: 1.5, z: 2, label: 'detail' },
      // Small accent
      { top: '55%',  left: '5%',  width: '160px', height: '120px', color: 'smoke',    shape: 'rect',    rotate: 0,   z: 3, label: 'extra' },
      // Mini pill
      { top: '14%',  left: '40%', width: '80px',  height: '80px',  color: 'warm',     shape: 'circle',  rotate: 0,   z: 4, label: 'icon' },
    ],
  },
  {
    index: 2,
    name: 'Project Beta',
    href: '#',
    shapes: [
      { top: '8%',   left: '5%',  width: '300px', height: '240px', color: 'charcoal', shape: 'rounded', rotate: 1,   z: 1, label: 'cover' },
      { top: '35%',  left: '18%', width: '260px', height: '200px', color: 'sage',     shape: 'rect',    rotate: -1,  z: 2, label: 'screen' },
      { top: '55%',  left: '8%',  width: '180px', height: '140px', color: 'lavender', shape: 'rounded', rotate: 2,   z: 3, label: 'ui' },
      { top: '20%',  left: '38%', width: '100px', height: '60px',  color: 'warm',     shape: 'pill',    rotate: 0,   z: 4, label: 'label' },
    ],
  },
  {
    index: 3,
    name: 'Project Gamma',
    href: '#',
    shapes: [
      { top: '15%',  left: '10%', width: '280px', height: '320px', color: 'stone',    shape: 'rect',    rotate: -1.5, z: 1, label: 'photo' },
      { top: '40%',  left: '25%', width: '240px', height: '190px', color: 'dark',     shape: 'rounded', rotate: 2,    z: 2, label: 'app' },
      { top: '12%',  left: '42%', width: '130px', height: '130px', color: 'lavender', shape: 'circle',  rotate: 0,    z: 3, label: 'badge' },
      { top: '62%',  left: '5%',  width: '200px', height: '110px', color: 'smoke',    shape: 'pill',    rotate: -0.5, z: 4, label: 'tag' },
    ],
  },
  {
    index: 4,
    name: 'Project Delta',
    href: '#',
    shapes: [
      { top: '12%',  left: '6%',  width: '360px', height: '260px', color: 'warm',     shape: 'rounded', rotate: 0.5,  z: 1, label: 'main' },
      { top: '45%',  left: '15%', width: '200px', height: '200px', color: 'lavender', shape: 'circle',  rotate: 0,    z: 2, label: 'logo' },
      { top: '32%',  left: '38%', width: '160px', height: '240px', color: 'charcoal', shape: 'rect',    rotate: -2,   z: 3, label: 'mobile' },
      { top: '65%',  left: '4%',  width: '140px', height: '90px',  color: 'sage',     shape: 'pill',    rotate: 1,    z: 4, label: 'chip' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function Home() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Framer Motion spring for smooth horizontal movement
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.8 });

  // Track raw x target
  const targetX = useRef(0);
  const slideWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;

  // Clamp helper
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  // Update active slide index based on current x
  const updateActiveIndex = useCallback(
    (currentX) => {
      const rawIndex = Math.round((-currentX) / slideWidth);
      setActiveIndex(clamp(rawIndex, 0, PROJECTS.length - 1));
    },
    [slideWidth]
  );

  // Wheel / trackpad handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      const maxX = -(PROJECTS.length - 1) * slideWidth;
      targetX.current = clamp(targetX.current - delta * 1.2, maxX, 0);
      x.set(targetX.current);
      updateActiveIndex(targetX.current);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [slideWidth, x, updateActiveIndex]);

  // Keyboard arrow navigation
  useEffect(() => {
    const onKey = (e) => {
      const maxX = -(PROJECTS.length - 1) * slideWidth;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetX.current = clamp(targetX.current - slideWidth, maxX, 0);
        x.set(targetX.current);
        updateActiveIndex(targetX.current);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetX.current = clamp(targetX.current + slideWidth, maxX, 0);
        x.set(targetX.current);
        updateActiveIndex(targetX.current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slideWidth, x, updateActiveIndex]);

  const progress = ((activeIndex) / (PROJECTS.length - 1)) * 100;
  const activeProject = PROJECTS[activeIndex];

  return (
    <div className="home" ref={containerRef}>
      {/* Progress minimap */}
      <div className="home__minimap" aria-hidden="true">
        <div
          className="home__minimap-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Annotation labels (right side decoration) */}
      <div className="home__annotations" aria-hidden="true">
        <span className="home__annotation-label">Sound: Off</span>
        <span className="home__annotation-label">Annotations: On</span>
      </div>

      {/* Horizontal rail */}
      <motion.div
        className="home__rail"
        style={{ x: springX }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectSlide
            key={project.name}
            project={project}
            isFirst={i === 0}
          />
        ))}
      </motion.div>

      {/* Bottom bar */}
      <BottomBar
        index={activeProject.index}
        projectName={activeProject.name}
        viewHref={activeProject.href}
      />
    </div>
  );
}
