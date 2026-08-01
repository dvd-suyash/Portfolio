import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, RoundedBox, Text, Float } from '@react-three/drei';
import gsap from 'gsap';

const NavPill = ({ label, isSpecial, hovered, width = 2.8 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetRotationX = hovered ? 0.2 : 0;
      const targetRotationY = hovered ? 0.2 : 0;
      const targetScale = hovered ? 1.05 : 1;

      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
      
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {isSpecial ? (
        <RoundedBox args={[width + 0.4, 1.2, 0.4]} radius={0.3} smoothness={4}>
          <meshPhysicalMaterial 
            color="#ef4444" 
            metalness={0.6} 
            roughness={0.2} 
            clearcoat={1} 
            transmission={0.2}
          />
        </RoundedBox>
      ) : (
        <RoundedBox args={[width, 1.0, 0.2]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#222222" 
            metalness={0.8} 
            roughness={0.3} 
          />
        </RoundedBox>
      )}
      <Text 
        position={[0, -0.05, 0.21]} 
        fontSize={0.45} 
        fontWeight="bold" 
        color="white"
        letterSpacing={0.05}
      >
        {label}
      </Text>
    </group>
  );
};

const Nav3DButton = ({ href, label, onClick, isSpecial = false, isExternal = false, containerWidth = 110, boxWidth = 2.8 }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      data-magnetic
      style={{
        display: 'block',
        width: `${containerWidth}px`,
        height: '50px',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 35 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        <Environment preset="city" />
        <Float speed={isSpecial ? 3 : 2} rotationIntensity={0.2} floatIntensity={isSpecial ? 0.8 : 0.4}>
          <NavPill label={label} isSpecial={isSpecial} hovered={hovered} width={boxWidth} />
        </Float>
      </Canvas>
    </a>
  );
};

export default Nav3DButton;
