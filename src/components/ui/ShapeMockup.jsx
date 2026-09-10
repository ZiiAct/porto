/**
 * ShapeMockup.jsx
 * Geometric placeholder for images.
 * Replace with <img src="..." alt="..." /> when ready.
 *
 * Props:
 *  width      {string|number} — CSS width  (default: '100%')
 *  height     {string|number} — CSS height (default: '100%')
 *  shape      {'rect'|'rounded'|'circle'|'pill'} — border-radius variant
 *  color      {'lavender'|'dark'|'stone'|'warm'|'smoke'|'charcoal'|'sage'}
 *  label      {string}  — tiny label inside (default: 'image')
 *  style      {object}  — extra inline styles
 *  className  {string}  — extra class names
 */

import './ShapeMockup.css';

export default function ShapeMockup({
  width  = '100%',
  height = '100%',
  shape  = 'rect',
  color  = 'smoke',
  label  = 'image',
  style  = {},
  className = '',
}) {
  return (
    <div
      className={`shape-mockup shape-mockup--${shape} shape-mockup--${color} ${className}`}
      style={{ width, height, ...style }}
      aria-label={`Placeholder: ${label}`}
      role="img"
    >
      <div className="shape-mockup__inner">
        <span className="shape-mockup__label">{label}</span>
      </div>
    </div>
  );
}
