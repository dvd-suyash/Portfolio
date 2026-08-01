import React from 'react';
import ScrambleText from './ScrambleText';

const skillCategories = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Rust'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'] },
  { title: 'Backend', items: ['Node.js', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis'] },
  { title: 'DevOps & Tools', items: ['Docker', 'AWS', 'CI/CD Pipelines', 'Linux', 'Git'] },
];

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <p className="skills__label reveal"><ScrambleText text="WHAT I KNOW" /></p>
      <h2 className="skills__heading reveal">EXPERTISE</h2>

      <div className="skills-marquee-container reveal">
        {skillCategories.map((category, index) => {
          // Multiply items so they seamlessly loop across the screen
          const multipliedItems = [...category.items, ...category.items, ...category.items, ...category.items];
          
          return (
            <div className="skills-row" key={category.title}>
              <div className="skills-row__category">
                {category.title}
              </div>
              <div className="skills-row__marquee">
                <div className={`skills-row__track ${index % 2 === 0 ? 'move-left' : 'move-right'}`}>
                  {/* Group 1 */}
                  <div className="skills-row__group">
                    {multipliedItems.map((skill, i) => (
                      <div className="skill-pill" key={`g1-${i}`}>
                        {skill}
                      </div>
                    ))}
                  </div>
                  {/* Group 2 (identical duplicate for seamless infinite loop) */}
                  <div className="skills-row__group">
                    {multipliedItems.map((skill, i) => (
                      <div className="skill-pill" key={`g2-${i}`}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
