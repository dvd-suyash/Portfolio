import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrambleText from './ScrambleText';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, RoundedBox, Text, Html } from '@react-three/drei';

const Gmail3D = ({ hovered }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0;
      meshRef.current.rotation.y = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0;
      meshRef.current.scale.x = gsap.utils.interpolate(meshRef.current.scale.x, hovered ? 1.1 : 1, 0.1);
      meshRef.current.scale.y = gsap.utils.interpolate(meshRef.current.scale.y, hovered ? 1.1 : 1, 0.1);
      meshRef.current.scale.z = gsap.utils.interpolate(meshRef.current.scale.z, hovered ? 1.1 : 1, 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[2.4, 1.8, 0.4]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.3} />
      </RoundedBox>
      <Html center transform distanceFactor={5} position={[0, 0, 0.21]} style={{ pointerEvents: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
          <path d="M1.5 5.25L12 11.25L22.5 5.25C22.5 4.5 21.75 3.75 21 3.75H3C2.25 3.75 1.5 4.5 1.5 5.25Z" fill="#EA4335"/>
          <path d="M22.5 5.25V18.75C22.5 19.5 21.75 20.25 21 20.25H17.25V11.25L22.5 5.25Z" fill="#4285F4"/>
          <path d="M1.5 5.25V18.75C1.5 19.5 2.25 20.25 3 20.25H6.75V11.25L1.5 5.25Z" fill="#34A853"/>
          <path d="M6.75 11.25V20.25H17.25V11.25L12 14.25L6.75 11.25Z" fill="#FBBC04"/>
        </svg>
      </Html>
    </group>
  );
};

const GitHub3D = ({ hovered }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0;
      meshRef.current.rotation.y = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0;
      meshRef.current.scale.x = gsap.utils.interpolate(meshRef.current.scale.x, hovered ? 1.1 : 1, 0.1);
      meshRef.current.scale.y = gsap.utils.interpolate(meshRef.current.scale.y, hovered ? 1.1 : 1, 0.1);
      meshRef.current.scale.z = gsap.utils.interpolate(meshRef.current.scale.z, hovered ? 1.1 : 1, 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[2, 2, 0.4]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color="#24292e" metalness={0.4} roughness={0.2} />
      </RoundedBox>
      <Html center transform distanceFactor={5} position={[0, 0, 0.21]} style={{ pointerEvents: 'none' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </Html>
    </group>
  );
};

const LinkedIn3D = ({ hovered }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0;
      meshRef.current.rotation.y = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0;
      meshRef.current.scale.x = gsap.utils.interpolate(meshRef.current.scale.x, hovered ? 1.1 : 1, 0.1);
      meshRef.current.scale.y = gsap.utils.interpolate(meshRef.current.scale.y, hovered ? 1.1 : 1, 0.1);
      meshRef.current.scale.z = gsap.utils.interpolate(meshRef.current.scale.z, hovered ? 1.1 : 1, 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[2, 2, 0.4]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color="#0077b5" metalness={0.4} roughness={0.2} />
      </RoundedBox>
      <Text position={[0, -0.05, 0.21]} fontSize={1.2} fontWeight="bold" color="white">
        in
      </Text>
    </group>
  );
};

const Contact3DButton = ({ href, type, label, isEmail }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      data-magnetic
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '1rem', 
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      <div style={{ width: '120px', height: '120px', cursor: 'pointer' }}>
        <Canvas camera={{ position: [0, 0, 4.5], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1.5} />
          <Environment preset="city" />
          {type === 'mail' && <Gmail3D hovered={hovered} />}
          {type === 'github' && <GitHub3D hovered={hovered} />}
          {type === 'linkedin' && <LinkedIn3D hovered={hovered} />}
        </Canvas>
      </div>
      <span style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</span>
    </a>
  );
};

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <p className="contact__label reveal"><ScrambleText text="SAY HELLO" /></p>
      <h2 className="contact__heading reveal">GET IN TOUCH</h2>
      <p className="contact__subtext reveal">
        Interested in working together? Let's connect and build something remarkable.
      </p>

      <div className="contact__links reveal" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
        <Contact3DButton 
          href="mailto:suyash.dwivedi121@gmail.com" 
          label="Email"
          isEmail={true}
          type="mail"
        />

        <Contact3DButton 
          href="https://github.com/dvd-suyash" 
          label="GitHub"
          type="github"
        />

        <Contact3DButton 
          href="https://www.linkedin.com/in/dvdsuyash" 
          label="LinkedIn"
          type="linkedin"
        />
      </div>
    </section>
  );
};

export default Contact;
