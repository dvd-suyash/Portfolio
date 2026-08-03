import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

        {/* Elegant UI UX Pro Max Modal for Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="project-modal-overlay"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                className="project-modal"
                initial={{ y: 60, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="project-modal__close" onClick={() => setSelectedProject(null)} aria-label="Close modal">×</button>
                <h3 className="project-modal__title">{selectedProject.name}</h3>
                <p className="project-modal__desc">{selectedProject.description}</p>
                <div className="project-modal__tech">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="project-modal__tag">{t}</span>
                  ))}
                </div>
                {selectedProject.link !== '#' && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="project-modal__link">
                    View Live Project →
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
