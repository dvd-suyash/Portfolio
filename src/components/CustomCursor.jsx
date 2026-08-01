import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const ringXSet = gsap.quickSetter(ring, "x", "px");
    const ringYSet = gsap.quickSetter(ring, "y", "px");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y }; 

    // Initial position to prevent jumping
    xSet(mouse.x);
    ySet(mouse.y);
    ringXSet(mouse.x);
    ringYSet(mouse.y);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xSet(mouse.x);
      ySet(mouse.y);
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      ringXSet(pos.x);
      ringYSet(pos.y);
    };
    gsap.ticker.add(ticker);

    const addHoverClass = () => ring.classList.add('hovering');
    const removeHoverClass = () => ring.classList.remove('hovering');
    const addHideClass = () => { cursor.classList.add('hide'); ring.classList.add('hide'); };
    const removeHideClass = () => { cursor.classList.remove('hide'); ring.classList.remove('hide'); };

    // Set up hover states for dynamic elements using event delegation on body
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        ring.classList.add('hovering');
      }
      if (e.target.closest('.cube') || e.target.closest('.projects__stage')) {
        ring.classList.add('grabbable');
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        ring.classList.remove('hovering');
      }
      if (e.target.closest('.cube') || e.target.closest('.projects__stage')) {
        ring.classList.remove('grabbable');
      }
    };
    const handleMouseDown = (e) => {
      if (e.target.closest('.cube') || e.target.closest('.projects__stage')) {
        ring.classList.add('grabbing');
      }
    };
    const handleMouseUp = () => {
      ring.classList.remove('grabbing');
    };

    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', addHideClass);
    document.body.addEventListener('mouseenter', removeHideClass);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      document.body.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', addHideClass);
      document.body.removeEventListener('mouseenter', removeHideClass);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
};

export default CustomCursor;
