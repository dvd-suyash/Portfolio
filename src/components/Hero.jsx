import React, { useState, useEffect } from 'react';
import MagneticName from './MagneticName';
import ScrambleText from './ScrambleText';
import AnimatedCounter from './AnimatedCounter';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GenerativeMountainScene from './ui/mountain-scene';

const Hero = ({ onOpenAbout, isDarkMode }) => {
  const navigate = useNavigate();

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigate('/projects');
  };

  const isFirstVisit = !sessionStorage.getItem('hasLoaded');
  const [canAnimate, setCanAnimate] = useState(!isFirstVisit);

  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setCanAnimate(true);
      }, 1500); // Trigger just as the preloader starts to fade out
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero">
      <GenerativeMountainScene isDarkMode={isDarkMode} />
      
      {canAnimate && (
        <>
          <motion.div 
            className="hero__content"
          style={{ position: 'relative', zIndex: 1 }}
          variants={containerVars}
          initial="hidden"
          animate="show"
        >
        <motion.p className="hero__subtitle" variants={itemVars}>
          <ScrambleText text="COMPUTER SCIENCE ENGINEER" />
        </motion.p>

        <motion.h1 className="hero__title" variants={itemVars}>
          Crafting Digital
          <br />
          <em>Experiences</em>
        </motion.h1>

        <motion.p className="hero__tagline" variants={itemVars}>
          Building elegant solutions at the intersection of design
          <br />
          and engineering. Every line of code tells a story.
        </motion.p>

        <motion.div className="hero__stats" variants={itemVars}>
          <span className="hero__stat"><AnimatedCounter value={6} suffix="+" /> PROJECTS</span>
          <span className="hero__stat-sep">·</span>
          <span className="hero__stat"><AnimatedCounter value={3} suffix="+" /> YEARS CODING</span>
        </motion.div>

        <motion.a
          href="#projects"
          data-magnetic
          className="hero__cta"
          variants={itemVars}
          onClick={handleCtaClick}
        >
          VIEW MY WORK
        </motion.a>
      </motion.div>

      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
      >
        <MagneticName 
          text="SUYASH DWIVEDI" 
          hoverText="OPEN ABOUT ME ↗" 
          onClick={onOpenAbout} 
        />
        </motion.div>
        </>
      )}
    </section>
  );
};

export default Hero;
