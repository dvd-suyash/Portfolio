import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
  'Full-Stack Development',
  'Machine Learning & AI',
  'System Design & Architecture',
  'Open Source Contributor',
];

const About = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section 
      className="about" 
      id="about"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <motion.p className="about__label" variants={itemVars}>WHO I AM</motion.p>
      <motion.h2 className="about__heading" variants={itemVars}>ABOUT ME</motion.h2>

      <div className="about__content">
        <div className="about__text">
          <motion.p variants={itemVars}>
            I'm a Computer Science Engineer passionate about building software that
            makes a difference. With a strong foundation in algorithms, data structures,
            and system design, I approach every project with both analytical rigor and
            creative curiosity.
          </motion.p>
          <motion.p variants={itemVars}>
            From full-stack web applications to machine learning experiments, I enjoy
            exploring the full spectrum of software development. I believe the best code
            is not just functional — it's elegant, maintainable, and tells a clear story.
          </motion.p>
          <motion.div variants={itemVars} style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              display: 'inline-block', width: '12px', height: '12px', 
              borderRadius: '50%', backgroundColor: '#22c55e',
              boxShadow: '0 0 12px #22c55e',
              animation: 'pulse 2s infinite'
            }}></span>
            <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em' }}>
              AVAILABLE FOR FREELANCE WORK
            </span>
          </motion.div>
        </div>

        <div className="about__highlights">
          {highlights.map((item, index) => (
            <motion.div 
              className="about__highlight" 
              key={index} 
              variants={itemVars}
              whileHover={{ x: 10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ cursor: 'default' }}
            >
              <div className="about__hex" />
              <span className="about__highlight-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;
