import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, ContactShadows, Box, Float } from '@react-three/drei';
import * as THREE from 'three';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)',
  'linear-gradient(135deg, #3d2b1f 0%, #5c4033 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
  'linear-gradient(135deg, #1e272e 0%, #485460 100%)',
  'linear-gradient(135deg, #2c2c54 0%, #474787 100%)',
];

// Corrected mapping for Three.js coordinates (X/Y inverted from CSS)
const cubeRotations = [
  { x: 0, y: 0, z: 0 },             // Front (Index 0)
  { x: Math.PI / 2, y: 0, z: 0 },   // Top (Index 1: pitch down to see top)
  { x: 0, y: Math.PI / 2, z: 0 },   // Left (Index 2: yaw right to see left face)
  { x: -Math.PI / 2, y: 0, z: 0 },  // Bottom (Index 3: pitch up to see bottom)
  { x: 0, y: Math.PI, z: 0 },       // Back (Index 4: yaw 180)
  { x: 0, y: -Math.PI / 2, z: 0 },  // Right (Index 5: yaw left to see right face)
];

function CubeMesh({ projects, activeIndex, isDragging, dragOffset, isHovering }) {
  const innerRef = useRef();
  const htmlRefs = useRef([]);
  const sceneTiltRef = useRef();

  useFrame((state, delta) => {
    if (!innerRef.current || !sceneTiltRef.current) return;
    
    // Exactly matches CSS: -35deg X in CSS tilts top face towards you (positive in Three)
    const targetSceneX = isHovering && !isDragging ? 0 : THREE.MathUtils.degToRad(35);
    const targetSceneY = isHovering && !isDragging ? 0 : THREE.MathUtils.degToRad(-45);
    
    sceneTiltRef.current.rotation.x = THREE.MathUtils.damp(sceneTiltRef.current.rotation.x, targetSceneX, 4, delta);
    sceneTiltRef.current.rotation.y = THREE.MathUtils.damp(sceneTiltRef.current.rotation.y, targetSceneY, 4, delta);

    const target = cubeRotations[activeIndex] || cubeRotations[0];
    
    let targetX = target.x - (isDragging ? dragOffset.y * 0.01 : 0);
    let targetY = target.y + (isDragging ? dragOffset.x * 0.01 : 0);
    
    // Smooth idle drift
    if (!isHovering && !isDragging) {
      targetX += Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      targetY += Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }

    innerRef.current.rotation.x = THREE.MathUtils.damp(innerRef.current.rotation.x, targetX, 5, delta);
    innerRef.current.rotation.y = THREE.MathUtils.damp(innerRef.current.rotation.y, targetY, 5, delta);
    
    htmlRefs.current.forEach((el, index) => {
      if(el) {
        const isActiveFace = index === activeIndex;
        let targetOpacity = 0.9; 
        if (isHovering && !isActiveFace) targetOpacity = 0.3;
        else if (isActiveFace) targetOpacity = 1;
        
        let targetBlur = 'blur(0px)';
        if (isHovering && !isActiveFace) targetBlur = 'blur(2px)';

        el.style.opacity = targetOpacity;
        el.style.filter = targetBlur;
        // Keep the subtle dark transparent look for inactive, opaque for active
        el.style.backgroundColor = isActiveFace ? 'rgba(15,15,15,1)' : 'rgba(0,0,0,0.6)';
        el.style.transition = 'opacity 0.4s ease, filter 0.4s ease, background-color 0.4s ease';
      }
    });
  });

  return (
    <group ref={sceneTiltRef}>
      <group ref={innerRef}>
        {/* The original glossy box that creates the bezel effect */}
        <Box args={[3.15, 3.15, 3.15]}>
          <meshPhysicalMaterial 
            color="#111111" 
            metalness={0.9} 
            roughness={0.1} 
            transmission={0.8} 
            thickness={0.5}
          />
        </Box>

        {projects.map((project, i) => {
          const initial = project.name.charAt(0);
          let position = [0, 0, 0];
          let rotation = [0, 0, 0];
          const offset = 1.6; 

          switch(i) {
            case 0: position = [0, 0, offset]; rotation = [0, 0, 0]; break;
            case 1: position = [0, offset, 0]; rotation = [-Math.PI / 2, 0, 0]; break;
            case 2: position = [-offset, 0, 0]; rotation = [0, -Math.PI / 2, 0]; break;
            case 3: position = [0, -offset, 0]; rotation = [Math.PI / 2, 0, 0]; break;
            case 4: position = [0, 0, -offset]; rotation = [0, Math.PI, 0]; break;
            case 5: position = [offset, 0, 0]; rotation = [0, Math.PI / 2, 0]; break;
            default: break;
          }

          return (
            <Html
              key={project.id}
              transform
              position={position}
              rotation={rotation}
              distanceFactor={3.2}
              occlude="blending"
              style={{
                width: '320px',
                height: '320px',
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                overflow: 'hidden',
                background: 'transparent',
                border: 'none',
              }}
            >
              <div 
                ref={el => htmlRefs.current[i] = el}
                className="cube__content" 
                style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
              >
                {project.image ? (
                  <img src={project.image} alt={project.name} className="cube__image" style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                ) : (
                  <div className="cube__placeholder" style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length], width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <span className="cube__initial" style={{ fontSize: '100px', fontWeight: '800', color: 'white', opacity: 0.1 }}>{initial}</span>
                  </div>
                )}
                <div className="cube__overlay" style={{ pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
                <div className="cube__details" style={{ pointerEvents: 'none' }}>
                  <p className="cube__desc" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{project.description}</p>
                  <div className="cube__tech">
                    {project.tech.map((t) => (
                      <span key={t} className="cube__tech-tag" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>
                    ))}
                  </div>
                  <a href={project.link} className="cube__link" style={{ pointerEvents: 'auto', cursor: 'none' }}>View Project →</a>
                </div>
              </div>
            </Html>
          );
        })}
      </group>
    </group>
  );
}

export default function ThreeCube({ projects, activeIndex, isDragging, dragOffset, isHovering }) {
  return (
    <div style={{ width: '150%', height: '150%', position: 'absolute', top: '-25%', left: '-25%' }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -10, -5]} intensity={1.5} color="#c4c3b6" /> 
        <pointLight position={[0, 5, 5]} intensity={1} color="#f5f5f5" distance={10} />
        
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <CubeMesh 
            projects={projects} 
            activeIndex={activeIndex} 
            isDragging={isDragging} 
            dragOffset={dragOffset} 
            isHovering={isHovering}
          />
        </Float>

        <Environment preset="studio" />
        
        <ContactShadows 
          position={[0, -4.2, 0]} 
          opacity={0.8} 
          scale={15} 
          blur={3.5} 
          far={6} 
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
