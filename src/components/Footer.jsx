import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Footer = () => {
  const topBtnRef = useRef(null);
  const iconRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: topBtnRef });

  const onEnter = contextSafe(() => {
    gsap.to(iconRef.current, { y: -4, duration: 0.3, ease: 'back.out(2)' });
  });

  const onLeave = contextSafe(() => {
    gsap.to(iconRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
  });

  const onClick = contextSafe(() => {
    gsap.fromTo(iconRef.current, 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <span className="footer__wordmark">Suyash Dwivedi</span>
          <p className="footer__text">© 2026 · All rights reserved</p>
        </div>

        <button 
          ref={topBtnRef}
          className="footer__back-to-top" 
          onClick={onClick}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
          aria-label="Back to top"
          style={{ cursor: 'none', background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
        >
          <div ref={iconRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" style={{ color: 'var(--color-graphite)' }}>
              <path d="M201.58,54.43a104,104,0,1,0,0,147.14A104.17,104.17,0,0,0,201.58,54.43Zm-35.9,119.25a8,8,0,0,1-11.32,0L128,147.32l-26.35,26.36a8,8,0,1,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,165.68,173.68Zm0-56a8,8,0,0,1-11.32,0L128,91.29l-26.35,26.36a8,8,0,1,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,165.68,117.65Z"></path>
            </svg>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TOP</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
