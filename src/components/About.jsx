import React from 'react';

const highlights = [
  'Full-Stack Development',
  'Machine Learning & AI',
  'System Design & Architecture',
  'Open Source Contributor',
];

const About = () => {
  return (
    <section className="about" id="about">
      <p className="about__label reveal">WHO I AM</p>
      <h2 className="about__heading reveal">ABOUT ME</h2>

      <div className="about__content reveal">
        <div className="about__text">
          <p>
            I'm a Computer Science Engineer passionate about building software that
            makes a difference. With a strong foundation in algorithms, data structures,
            and system design, I approach every project with both analytical rigor and
            creative curiosity.
          </p>
          <p>
            From full-stack web applications to machine learning experiments, I enjoy
            exploring the full spectrum of software development. I believe the best code
            is not just functional — it's elegant, maintainable, and tells a clear story.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new technologies, contributing
            to open-source projects, or diving deep into art and literature.
          </p>
        </div>

        <div className="about__highlights">
          {highlights.map((item, index) => (
            <div className="about__highlight" key={index}>
              <div className="about__hex" />
              <span className="about__highlight-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
