import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Header = ({ onOpenAbout, isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const themeBtnRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: themeBtnRef });
  const location = useLocation();
  const isInverse = location.pathname === '/skills' && !isDarkMode;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  useGSAP(() => {
    if (isDarkMode) {
      gsap.to(sunRef.current, { rotation: 90, scale: 0.5, opacity: 0, duration: 0.5, ease: 'back.in(1.5)' });
      gsap.fromTo(moonRef.current, 
        { rotation: -90, scale: 0.5, opacity: 0 }, 
        { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 }
      );
    } else {
      gsap.to(moonRef.current, { rotation: 90, scale: 0.5, opacity: 0, duration: 0.5, ease: 'back.in(1.5)' });
      gsap.fromTo(sunRef.current, 
        { rotation: -90, scale: 0.5, opacity: 0 }, 
        { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 }
      );
    }
  }, [isDarkMode]);

  const onThemeBtnEnter = contextSafe(() => {
    gsap.to(themeBtnRef.current, { scale: 1.1, duration: 0.3, ease: 'back.out(2)' });
  });

  const onThemeBtnLeave = contextSafe(() => {
    gsap.to(themeBtnRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${isInverse ? ' header--inverse' : ''}`}>
      <Link 
        to="/" 
        data-magnetic
        className="header__logo" 
        aria-label="Home"
        onClick={() => setMenuOpen(false)}
        style={{ cursor: 'none' }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="16"
            fill="var(--color-ink)"
          >
            S
          </text>
        </svg>
      </Link>

      <button 
        className="header__menu-btn mobile-only" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
        style={{ cursor: 'none' }}
      >
        <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
      </button>

      <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
        <button
          ref={themeBtnRef}
          data-magnetic
          className="theme-toggle-btn"
          onClick={toggleTheme}
          onMouseEnter={onThemeBtnEnter}
          onMouseLeave={onThemeBtnLeave}
          onFocus={onThemeBtnEnter}
          onBlur={onThemeBtnLeave}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'none' }}
        >
          <div ref={sunRef} style={{ position: 'absolute' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" style={{ color: 'var(--color-ink)' }}>
              <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
            </svg>
          </div>
          <div ref={moonRef} style={{ position: 'absolute' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" style={{ color: 'var(--color-ink)' }}>
              <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"></path>
            </svg>
          </div>
        </button>
        <NavLink
          to="/"
          data-magnetic
          className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <a
          href="#"
          data-magnetic
          className="header__nav-link"
          onClick={(e) => { e.preventDefault(); setMenuOpen(false); onOpenAbout(); }}
        >
          About
        </a>
        <NavLink
          to="/projects"
          data-magnetic
          className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </NavLink>
        <NavLink
          to="/skills"
          data-magnetic
          className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Skills
        </NavLink>
        <NavLink
          to="/contact"
          data-magnetic
          className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>
        <a 
          href="/SuyashDwivediResume.pdf" 
          target="_blank" 
          data-magnetic
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
