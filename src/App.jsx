import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlobalScrollLine from './components/GlobalScrollLine';
import Preloader from './components/Preloader';
import { MagneticCursor } from './components/MagneticCursor';

export let appHasLoaded = false;

const App = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const modalRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible to prevent re-triggering if not needed
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observeNewElements = () => {
      const revealElements = document.querySelectorAll('.reveal:not(.visible)');
      revealElements.forEach((el) => intersectionObserver.observe(el));
    };

    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    observeNewElements(); // Initial run

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [isLoading]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAboutOpen) setIsAboutOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Focus trap
    if (isAboutOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length) {
        focusableElements[0].focus();
      }
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAboutOpen]);

  return (
    <MagneticCursor 
      magneticFactor={0.55} 
      blendMode="exclusion" 
      cursorSize={40}
    >
      {isLoading && <Preloader onComplete={() => {
        setIsLoading(false);
        appHasLoaded = true;
      }} />}
      
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX }}
        />
        <GlobalScrollLine key={location.pathname} />
        <Header 
          onOpenAbout={() => setIsAboutOpen(true)} 
          isDarkMode={isDarkMode} 
          toggleTheme={() => setIsDarkMode(!isDarkMode)} 
        />
        <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Hero onOpenAbout={() => setIsAboutOpen(true)} isDarkMode={isDarkMode} />
                </motion.div>
              } />
              <Route path="/projects" element={
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Projects />
                </motion.div>
              } />
              <Route path="/skills" element={
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Skills />
                </motion.div>
              } />
              <Route path="/contact" element={
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Contact />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />

        {isAboutOpen && (
          <div 
            className="about-modal-overlay" 
            onClick={() => setIsAboutOpen(false)}
          >
            <div 
              className="about-modal-wrapper" 
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-modal-title"
              ref={modalRef}
            >
              <div className="about-modal-cat">
                <DotLottieReact
                  src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                  loop
                  autoplay
                />
              </div>
              <button className="about-modal-close" onClick={() => setIsAboutOpen(false)} aria-label="Close modal">×</button>
              <div className="about-modal-content">
                <About />
              </div>
            </div>
          </div>
        )}
      </div>
    </MagneticCursor>
  );
};

export default App;
