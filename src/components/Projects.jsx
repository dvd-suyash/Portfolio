import React from 'react';
import projects from '../data/projects';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)',
  'linear-gradient(135deg, #3d2b1f 0%, #5c4033 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
  'linear-gradient(135deg, #1e272e 0%, #485460 100%)',
  'linear-gradient(135deg, #2c2c54 0%, #474787 100%)',
];

const ProjectCard = ({ project, index }) => {
  const initial = project.name.charAt(0);

  return (
    <div className="project-card reveal">
      <div className="project-card__image">
        {project.image ? (
          <img src={project.image} alt={project.name} />
        ) : (
          <div
            className="project-card__placeholder"
            style={{ background: CARD_GRADIENTS[index % CARD_GRADIENTS.length] }}
          >
            <span className="project-card__initial">{initial}</span>
          </div>
        )}
      </div>
      <div className="project-card__overlay" />
      <h3 className="project-card__name">{project.name}</h3>
      <div className="project-card__details">
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span className="project-card__tech-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <a href={project.link} className="project-card__link">
          View Project →
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <p className="projects__label reveal">SELECTED WORKS</p>
      <h2 className="projects__heading reveal">PROJECTS</h2>

      <div className="projects__grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
