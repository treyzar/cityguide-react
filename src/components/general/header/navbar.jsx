import React from 'react';
import './header.css';

export default function Navbar({ toggleMenu }) {
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleMenu();
    }
  };

  return (
    <button
      className="navbar-toggle"
      id="navbarToggle"
      onClick={toggleMenu}
      onKeyDown={handleKeyDown}
      aria-label="Открыть меню"
      tabIndex={0}
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </button>
  );
}
