import React from 'react';

const Hero = () => {
  const handleCtaClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__subtitle animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          COMPUTER SCIENCE ENGINEER
        </p>

        <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
          Crafting Digital
          <br />
          <em>Experiences</em>
        </h1>

        <p className="hero__tagline animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          Building elegant solutions at the intersection of design and engineering.
          Every line of code tells a story.
        </p>

        <div className="hero__stats animate-fade-in-up" style={{ animationDelay: '0.55s', opacity: 0 }}>
          <span className="hero__stat">6+ Projects</span>
          <span className="hero__stat-sep">·</span>
          <span className="hero__stat">3+ Years Coding</span>
        </div>

        <div className="hero__divider animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }} />

        <a
          href="#projects"
          className="hero__cta animate-fade-in-up"
          style={{ animationDelay: '0.7s', opacity: 0 }}
          onClick={handleCtaClick}
        >
          View My Work
        </a>
      </div>

      <div className="hero__wordmark">
        SUYASH DWIVEDI
      </div>
    </section>
  );
};

export default Hero;
