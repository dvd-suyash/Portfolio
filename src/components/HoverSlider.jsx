import React, { createContext, useContext, useState, useCallback, forwardRef } from 'react';
import { motion, MotionConfig } from 'motion/react';

function splitText(text) {
  const words = text.split(' ').map((word) => word.concat(' '));
  const characters = words.map((word) => word.split('')).flat(1);
  return { words, characters };
}

const HoverSliderContext = createContext(undefined);

function useHoverSliderContext() {
  const context = useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error('useHoverSliderContext must be used within a HoverSlider');
  }
  return context;
}

export const HoverSlider = forwardRef(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const changeSlide = useCallback((index) => setActiveSlide(index), []);

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className} ref={ref} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  );
});
HoverSlider.displayName = 'HoverSlider';

export const TextStaggerHover = forwardRef(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const { characters } = splitText(text);
  const isActive = activeSlide === index;
  const handleMouse = () => changeSlide(index);

  return (
    <span
      className={`text-stagger ${className || ''}`}
      ref={ref}
      onMouseEnter={handleMouse}
      {...props}
    >
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className="text-stagger__char">
          <MotionConfig
            transition={{
              delay: i * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="text-stagger__char-ghost"
              initial={{ y: '0%' }}
              animate={isActive ? { y: '-110%' } : { y: '0%' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>

            <motion.span
              className="text-stagger__char-real"
              initial={{ y: '110%' }}
              animate={isActive ? { y: '0%' } : { y: '110%' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  );
});
TextStaggerHover.displayName = 'TextStaggerHover';

export const HoverSliderContentWrap = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={`hover-slider-content-wrap ${className || ''}`} {...props}>
      {children}
    </div>
  );
});
HoverSliderContentWrap.displayName = 'HoverSliderContentWrap';

export const HoverSliderContent = forwardRef(({ index, children, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  // Panels above active scroll up out, panels below wait below
  const yTarget = isActive ? '0%' : index < activeSlide ? '-100%' : '100%';

  return (
    <motion.div
      className={`hover-slider-content ${className || ''}`}
      animate={{ y: yTarget, opacity: isActive ? 1 : 0 }}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.5 }}
      ref={ref}
      {...props}
    >
      {children}
    </motion.div>
  );
});
HoverSliderContent.displayName = 'HoverSliderContent';
