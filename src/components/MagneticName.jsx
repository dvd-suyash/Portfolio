import React, { useRef, useState, useCallback, useEffect } from "react";

export default function MagneticName({ text = "SUYASH DWIVEDI", hoverText = "ABOUT ME", onClick }) {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const lettersRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [isPressed, setIsPressed] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15);

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }

      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        lettersRef.current.forEach((letter) => {
          if (!letter) return;
          const rect = letter.getBoundingClientRect();
          const letterX = rect.left - containerRect.left + rect.width / 2;
          const letterY = rect.top - containerRect.top + rect.height / 2;
          
          const dx = currentPos.current.x - letterX;
          const dy = currentPos.current.y - letterY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 200; // Radius of the blur field
          if (dist < maxDist && isHoveredRef.current) {
            const intensity = 1 - (dist / maxDist);
            const blurAmount = intensity * 12; 
            const opacityAmount = 1 - (intensity * 0.7); 
            const scaleAmount = 1 - (intensity * 0.15); 
            
            letter.style.filter = `blur(${blurAmount}px)`;
            letter.style.opacity = opacityAmount;
            letter.style.transform = `scale(${scaleAmount})`;
          } else {
            letter.style.filter = `blur(0px)`;
            letter.style.opacity = 1;
            letter.style.transform = `scale(1)`;
          }
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseEnter = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };
    currentPos.current = { x, y };
    setIsHovered(true);
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    isHoveredRef.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      className="magnetic-name-container"
      style={{ position: 'relative', cursor: 'none' }}
    >
      <span className="hero__wordmark magnetic-name-base">
        {text.split('').map((char, index) => (
          <span 
            key={index} 
            ref={el => lettersRef.current[index] = el}
            className="magnetic-letter"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* The cute little box that travels with the cursor */}
      <div
        ref={circleRef} // Reuse circleRef for the follower position
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 50
        }}
      >
        <div
          className="magnetic-name-tooltip"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${isPressed ? 0.9 : isHovered ? 1 : 0.5})`,
            backgroundColor: isPressed ? 'var(--color-accent)' : undefined
          }}
        >
          {hoverText}
        </div>
      </div>
    </div>
  );
}
