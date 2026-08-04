import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import projects from '../data/projects';
import ThreeCube from './ThreeCube';

function splitText(text) {
  const words = text.split(' ').map((word) => word.concat(' '));
  const characters = words.map((word) => word.split('')).flat(1);
  return { words, characters };
}

const ProjectNameTumble = ({ text, isActive }) => {
  const { characters } = splitText(text);
  return (
    <h3 className="text-stagger projects__list-name">
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className="text-stagger__char">
          <motion.span
            className="text-stagger__char-ghost"
            initial={{ y: '0%' }}
            animate={isActive ? { y: '-110%' } : { y: '0%' }}
            transition={{ delay: i * 0.025, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          <motion.span
            className="text-stagger__char-real"
            initial={{ y: '110%' }}
            animate={isActive ? { y: '0%' } : { y: '110%' }}
            transition={{ delay: i * 0.025, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </h3>
  );
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let interval;
    if (!isHovering && !isDragging) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % projects.slice(0, 6).length);
      }, 3000); // 3 seconds feels more relaxed for a 3D showcase
    }
    return () => clearInterval(interval);
  }, [isHovering, isDragging]);

  const displayedProjects = projects.slice(0, 6);

  return (
    <section className="projects" id="projects">
      <div className="projects__header reveal">
        <p className="projects__label">SELECTED WORKS</p>
        <h2 className="projects__heading">PROJECTS</h2>
      </div>

      <div 
        className="projects__container reveal"
      >
        {/* Left Side: Project Index */}
        <div 
          className="projects__list"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              data-magnetic
              className={`projects__list-item ${index === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setSelectedProject(project)}
            >
              <span className="projects__list-num">0{index + 1}</span>
              <ProjectNameTumble text={project.name} isActive={index === activeIndex} />
            </div>
          ))}
        </div>

        <motion.div 
          className="projects__stage"
          onPanStart={() => {
            setIsDragging(true);
            document.body.style.userSelect = 'none';
            document.body.style.webkitUserSelect = 'none';
          }}
          onPan={(e, info) => {
            setDragOffset({ x: info.offset.x, y: info.offset.y });
          }}
          onPanEnd={() => {
            setIsDragging(false);
            setDragOffset({ x: 0, y: 0 });
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
          }}
          style={{ touchAction: 'none' }}
        >
          <ThreeCube 
            projects={displayedProjects}
            activeIndex={activeIndex}
            isDragging={isDragging}
            dragOffset={dragOffset}
            isHovering={isHovering}
          />
        </motion.div>

        {/* Elegant UI UX Pro Max Modal for Project Details (Matches About Modal) */}
        {createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div 
                className="about-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div 
                  className="about-modal-wrapper"
                  initial={{ y: 60, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 30, opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="about-modal-cat">
                    <DotLottieReact
                      src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                      loop
                      autoplay
                    />
                  </div>
                  <button className="about-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">×</button>
                  <div className="about-modal-content" style={{ padding: '40px', color: '#faf6ef' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: '1.1' }}>{selectedProject.name}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>{selectedProject.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                      {selectedProject.tech.map((t) => (
                        <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', color: 'rgba(255,255,255,0.8)' }}>{t}</span>
                      ))}
                    </div>
                    {selectedProject.link !== '#' && (
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '16px', background: '#faf6ef', color: '#1a1a1a', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', borderRadius: '12px', textDecoration: 'none', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        View Live Project →
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

export default Projects;
