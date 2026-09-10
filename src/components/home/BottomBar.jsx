/**
 * BottomBar.jsx
 * Fixed bottom bar on homepage: project index, name, "View project" link.
 * Mirrors the bottom strip in mariavasilyeva.com.
 */

import './BottomBar.css';

export default function BottomBar({ index = '01', projectName = '', viewHref = '#' }) {
  const padded = String(index).padStart(2, '0');

  return (
    <div className="bottom-bar" role="status" aria-label="Current project info">
      <span className="bottom-bar__index">{padded}</span>

      <div className="bottom-bar__center">
        <span className="bottom-bar__play">▶</span>
        <span className="bottom-bar__project-name">{projectName}</span>
      </div>

      <div className="bottom-bar__right">
        <span className="bottom-bar__view-label">More details</span>
        <span className="bottom-bar__dot">↓</span>
        <a
          href={viewHref}
          className="bottom-bar__view-link"
          id={`view-project-${padded}`}
        >
          View project
        </a>
      </div>
    </div>
  );
}
