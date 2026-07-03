import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <a href="#" className="header__logo" aria-label="Home">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="16"
            fill="#1a1a1a"
          >
            S
          </text>
        </svg>
      </a>

      <nav className="header__nav">
        <a
          href="#about"
          className="header__nav-link"
          onClick={(e) => handleNavClick(e, 'about')}
        >
          About
        </a>
        <a
          href="#projects"
          className="header__nav-link"
          onClick={(e) => handleNavClick(e, 'projects')}
        >
          Projects
        </a>
        <a
          href="#skills"
          className="header__nav-link"
          onClick={(e) => handleNavClick(e, 'skills')}
        >
          Skills
        </a>
        <a
          href="#contact"
          className="header__nav-link"
          onClick={(e) => handleNavClick(e, 'contact')}
        >
          Contact
        </a>
        <a 
          href="/Suyash_Dwivedi_Resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="header__resume-link"
        >
          Resume
        </a>
      </nav>
    </header>
  );
};

export default Header;
