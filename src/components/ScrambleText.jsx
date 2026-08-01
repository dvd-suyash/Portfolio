import React, { useEffect, useRef } from 'react';

const chars = '!<>-_\\\\/[]{}—=+*^?#________';

const ScrambleText = ({ text, className = '' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let interval;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let iterations = 0;
        interval = setInterval(() => {
          el.innerText = text
            .split('')
            .map((letter, index) => {
              if (index < iterations || letter === ' ') {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          if (iterations >= text.length) {
            clearInterval(interval);
            el.innerText = text;
          }
          iterations += 1 / 3;
        }, 30);
        
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });

    observer.observe(el);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [text]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
};

export default ScrambleText;
