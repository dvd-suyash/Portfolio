import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { vec2 } from 'vecteur';

export const MagneticCursor = ({
  children,
  lerpAmount = 0.1,
  magneticFactor = 0.2,
  hoverPadding = 12,
  hoverAttribute = 'data-magnetic',
  cursorSize = 24,
  cursorColor = '#ffffff', // Pure white works best for exclusion/difference
  blendMode = 'exclusion', 
  cursorClassName = '',
  shape = 'circle',
  disableOnTouch = true,
  speedMultiplier = 0.02,
  maxScaleX = 1,
  maxScaleY = 0.3,
  contrastBoost = 1.5,
}) => {
  const cursorRef = useRef(null);
  const cursorStateRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const configRef = useRef({
    magneticFactor,
    speedMultiplier,
    maxScaleX,
    maxScaleY,
    cursorSize,
    lerpAmount,
    hoverPadding,
  });

  useEffect(() => {
    configRef.current = {
      magneticFactor,
      speedMultiplier,
      maxScaleX,
      maxScaleY,
      cursorSize,
      lerpAmount,
      hoverPadding,
    };
  }, [magneticFactor, speedMultiplier, maxScaleX, maxScaleY, cursorSize, lerpAmount, hoverPadding]);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const detachDuration = prefersReducedMotion ? 0.1 : 0.35;

    if (!cursorStateRef.current) {
      cursorStateRef.current = {
        el: cursorEl,
        pos: {
          current: vec2(-100, -100),
          target: vec2(-100, -100),
          previous: vec2(-100, -100),
        },
        hover: { isHovered: false },
        isDetaching: false,
      };
    }

    const update = () => {
      const state = cursorStateRef.current;
      if (!state || state.hover.isHovered) return;

      const { speedMultiplier, maxScaleX, maxScaleY, lerpAmount } = configRef.current;
      const effectiveLerp = prefersReducedMotion ? 1 : lerpAmount;

      state.pos.current.lerp(state.pos.target, effectiveLerp);
      const delta = state.pos.current.clone().sub(state.pos.previous);
      state.pos.previous.copy(state.pos.current);

      if (state.isDetaching) {
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          overwrite: 'auto'
        });
      } else {
        const speed = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * speedMultiplier;
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          rotate: Math.atan2(delta.y, delta.x) * (180 / Math.PI),
          scaleX: 1 + Math.min(speed, maxScaleX),
          scaleY: 1 - Math.min(speed, maxScaleY),
          overwrite: 'auto'
        });
      }
    };

    const initializePosition = (event) => {
      const state = cursorStateRef.current;
      if (!state) return;
      const x = event.clientX;
      const y = event.clientY;
      state.pos.current.x = x;
      state.pos.current.y = y;
      state.pos.target.x = x;
      state.pos.target.y = y;
      state.pos.previous.x = x;
      state.pos.previous.y = y;
      gsap.set(cursorEl, { x, y, opacity: 1 });
    };

    const onMouseMove = (event) => {
      const state = cursorStateRef.current;
      if (!state) return;
      
      state.pos.target.x = event.clientX;
      state.pos.target.y = event.clientY;

      const isInViewport =
        event.clientX >= 0 &&
        event.clientX <= window.innerWidth &&
        event.clientY >= 0 &&
        event.clientY <= window.innerHeight;

      gsap.to(cursorEl, { opacity: isInViewport ? 1 : 0, duration: 0.2, overwrite: 'auto' });

      const target = event.target;
      const isTextContent =
        ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'A'].includes(target.tagName);

      if (isTextContent && !state.hover.isHovered && !state.isDetaching) {
        gsap.to(cursorEl, { scaleX: 0.5, scaleY: 1.5, duration: 0.3, overwrite: 'auto' });
      }
    };

    const handleMouseLeave = () => gsap.to(cursorEl, { opacity: 0, duration: 0.3 });
    const handleMouseEnter = () => gsap.to(cursorEl, { opacity: 1, duration: 0.3 });
    const handleClick = () => {};

    gsap.ticker.add(update);
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointermove', initializePosition, { once: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('click', handleClick);

    let cleanupFunctions = [];

    const initMagneticElements = () => {
      // Cleanup old listeners first
      cleanupFunctions.forEach((cleanup) => cleanup());
      cleanupFunctions = [];

      const magneticElements = gsap.utils.toArray(`[${hoverAttribute}]`);
      magneticElements.forEach((el) => {
        // Prevent duplicate quickTo creation if already initialized
        if (!el._magneticInit) {
          el._xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
          el._yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
          el._magneticInit = true;
        }
        const xTo = el._xTo;
        const yTo = el._yTo;

        const handlePointerEnter = () => {
          const state = cursorStateRef.current;
          if (!state) return;
          const { magneticFactor, hoverPadding } = configRef.current;

          state.hover.isHovered = true;
          state.isDetaching = false;

          const bounds = el.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(el);
          const magneticColor = el.getAttribute('data-magnetic-color') || cursorColor;
          const dynamicPadding = hoverPadding * (1 + magneticFactor);
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;

          gsap.killTweensOf(cursorEl);
          gsap.to(cursorEl, {
            x: centerX,
            y: centerY,
            width: bounds.width + dynamicPadding * 2,
            height: bounds.height + dynamicPadding * 2,
            borderRadius: '100px', // Force pill shape instead of computedStyle.borderRadius
            backgroundColor: magneticColor,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
            duration: 0.3, 
            ease: 'power3.out',
            overwrite: 'all'
          });
        };

        const handlePointerLeave = () => {
          const state = cursorStateRef.current;
          if (!state) return;
          const currentX = gsap.getProperty(cursorEl, "x");
          const currentY = gsap.getProperty(cursorEl, "y");

          state.pos.current.x = currentX;
          state.pos.current.y = currentY;
          state.pos.previous.x = currentX;
          state.pos.previous.y = currentY;

          state.hover.isHovered = false;
          state.isDetaching = true;

          const { cursorSize } = configRef.current;
          const shapeBorderRadius = shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px';

          gsap.killTweensOf(cursorEl);
          gsap.to(cursorEl, {
            width: cursorSize,
            height: cursorSize,
            borderRadius: shapeBorderRadius,
            backgroundColor: cursorColor,
            scaleX: 1,
            scaleY: 1,
            duration: detachDuration,
            ease: 'power3.out',
            overwrite: 'all',
            onComplete: () => { state.isDetaching = false; }
          });
        };

        let rafId = null;
        const handlePointerMove = (event) => {
          if (rafId) return;
          rafId = requestAnimationFrame(() => {
            const { clientX, clientY } = event;
            const { height, width, left, top } = el.getBoundingClientRect();
            const { magneticFactor } = configRef.current;
            xTo((clientX - (left + width / 2)) * magneticFactor);
            yTo((clientY - (top + height / 2)) * magneticFactor);
            rafId = null;
          });
        };

        const handlePointerOut = () => { xTo(0); yTo(0); };

        el.addEventListener('pointerenter', handlePointerEnter);
        el.addEventListener('pointerleave', handlePointerLeave);
        el.addEventListener('pointermove', handlePointerMove);
        el.addEventListener('pointerout', handlePointerOut);

        cleanupFunctions.push(() => {
          el.removeEventListener('pointerenter', handlePointerEnter);
          el.removeEventListener('pointerleave', handlePointerLeave);
          el.removeEventListener('pointermove', handlePointerMove);
          el.removeEventListener('pointerout', handlePointerOut);
        });
      });
    };

    initMagneticElements();

    let debounceTimer;
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
          shouldRefresh = true;
          break;
        }
      }
      if (shouldRefresh) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(initMagneticElements, 100);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', handleClick);
      cleanupFunctions.forEach((cleanup) => cleanup());
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [disableOnTouch, isTouchDevice, hoverPadding, hoverAttribute, cursorColor, shape]);

  if (disableOnTouch && isTouchDevice) return <>{children}</>;

  const styles = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 99999,
    pointerEvents: 'none',
    willChange: 'transform, width, height, border-radius',
    backgroundColor: cursorColor,
    mixBlendMode: blendMode,
    width: cursorSize,
    height: cursorSize,
    borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px',
    backdropFilter: contrastBoost !== 1 ? `contrast(${contrastBoost})` : 'none',
    WebkitBackdropFilter: contrastBoost !== 1 ? `contrast(${contrastBoost})` : 'none',
  };

  return (
    <>
      <div ref={cursorRef} className={`magnetic-cursor ${cursorClassName}`} style={styles} />
      {children}
    </>
  );
};
