/**
 * MenuButton.jsx
 * Fixed right-edge button that opens the menu overlay.
 */

import './MenuOverlay.css';

export default function MenuButton({ isOpen, onToggle }) {
  return (
    <button
      className={`menu-btn${isOpen ? ' menu-btn--open menu-btn--dark' : ''}`}
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      id="menu-toggle-btn"
    >
      <span className="menu-btn__label">
        {isOpen ? 'Close' : 'Menu'}
      </span>
    </button>
  );
}
