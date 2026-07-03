import React from 'react';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <p className="contact__label reveal">SAY HELLO</p>
      <h2 className="contact__heading reveal">GET IN TOUCH</h2>
      <p className="contact__subtext reveal">
        Interested in working together? Let's connect and build something remarkable.
      </p>

      <div className="contact__links reveal">
        <a href="mailto:suyash.dwivedi121@gmail.com" className="contact__link">
          <svg
            className="contact__link-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          suyash.dwivedi121@gmail.com
        </a>

        <a
          href="https://github.com/dvd-suyash"
          className="contact__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="contact__link-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/dvdsuyash"
          className="contact__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="contact__link-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Contact;
