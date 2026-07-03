import React from 'react';
import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderContentWrap,
  HoverSliderContent,
} from './HoverSlider';

const skillCategories = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Rust', 'Go', 'SQL'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'HTML/CSS', 'Tailwind', 'D3.js'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'Django', 'GraphQL', 'REST'] },
  { title: 'DevOps & Tools', items: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD', 'Linux'] },
  { title: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'] },
  { title: 'AI / ML', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NLP', 'Computer Vision'] },
];

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <p className="skills__label reveal">WHAT I KNOW</p>
      <h2 className="skills__heading reveal">EXPERTISE</h2>

      <HoverSlider className="skills__layout reveal">
        <div className="skills__categories">
          {skillCategories.map((category, index) => (
            <TextStaggerHover
              key={category.title}
              index={index}
              text={category.title}
            />
          ))}
        </div>

        <HoverSliderContentWrap className="skills__content-area">
          {skillCategories.map((category, index) => (
            <HoverSliderContent key={category.title} index={index}>
              <div className="skill-card">
                <div className="skill-card__items">
                  {category.items.map((item) => (
                    <span className="skill-card__tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </HoverSliderContent>
          ))}
        </HoverSliderContentWrap>
      </HoverSlider>
    </section>
  );
};

export default Skills;
