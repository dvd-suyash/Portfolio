import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PaintingPanel = ({ src, alt = 'Painting', className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax effect: move the image slightly in the opposite direction of scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`painting-panel ${className}`}>
      <motion.img 
        className="painting-panel__img" 
        src={src} 
        alt={alt} 
        loading="lazy" 
        style={{ y, scale: 1.15 }} // Scale up slightly to prevent edges showing during parallax
      />
    </div>
  );
};

export default PaintingPanel;
