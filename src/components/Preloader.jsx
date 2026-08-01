import React, { useEffect } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setTimeout(onComplete, 100);
      }
    });

    tl.to('.preloader-text', {
      duration: 1.2,
      strokeDashoffset: 0,
      ease: "power2.inOut",
    })
    .to('.preloader-text', {
      fill: 'var(--color-paper)',
      duration: 0.4,
      ease: "power1.inOut"
    }, "-=0.3")
    .to('.preloader-container', {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.2
    });

    return () => { document.body.style.overflow = ''; };
  }, [onComplete]);

  return (
    <div className="preloader-container" style={{
      position: 'fixed', inset: 0, zIndex: 10000, 
      backgroundColor: 'var(--color-ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <svg width="800" height="200" viewBox="0 0 800 200" style={{ maxWidth: '90vw' }}>
        <text 
          x="50%" y="50%" 
          dominantBaseline="middle" textAnchor="middle" 
          className="preloader-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 8vw, 70px)',
            fill: 'transparent',
            stroke: 'var(--color-paper)',
            strokeWidth: '1.5px',
            strokeDasharray: '600',
            strokeDashoffset: '600',
            letterSpacing: '0.05em'
          }}
        >
          SUYASH DWIVEDI
        </text>
      </svg>
    </div>
  );
};

export default Preloader;
