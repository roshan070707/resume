import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls, RoundedBox } from '@react-three/drei';

const ResumeCard = ({ position, rotation, primaryColor, delay = 0 }) => {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Subtle breathing animation per card
    group.current.position.y = position[1] + Math.sin(t * 1.5 + delay) * 0.05;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Paper Base */}
      <RoundedBox args={[2.5, 3.5, 0.05]} radius={0.05} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </RoundedBox>

      {/* Abstract UI Elements - slightly raised from the paper surface */}
      <group position={[0, 0, 0.03]}>
        
        {/* Header Block */}
        <mesh position={[0, 1.35, 0]}>
          <planeGeometry args={[2.1, 0.35]} />
          <meshBasicMaterial color={primaryColor} />
        </mesh>
        
        {/* Profile Circle */}
        <mesh position={[-0.75, 0.9, 0]}>
          <circleGeometry args={[0.18, 32]} />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>

        {/* Name and Title Lines */}
        <mesh position={[0.15, 0.95, 0]}>
          <planeGeometry args={[1.2, 0.06]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
        <mesh position={[0.05, 0.8, 0]}>
          <planeGeometry args={[1.0, 0.04]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>

        {/* Section 1 Header */}
        <mesh position={[-0.8, 0.45, 0]}>
          <planeGeometry args={[0.4, 0.05]} />
          <meshBasicMaterial color={primaryColor} />
        </mesh>

        {/* Section 1 Bullets */}
        {[0.25, 0.05, -0.15].map((y, i) => (
          <group key={`s1-${i}`}>
            <mesh position={[-0.85, y, 0]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#64748b" />
            </mesh>
            <mesh position={[-0.2, y, 0]}>
              <planeGeometry args={[1.2, 0.03]} />
              <meshBasicMaterial color="#cbd5e1" />
            </mesh>
          </group>
        ))}

        {/* Section 2 Header */}
        <mesh position={[-0.8, -0.45, 0]}>
          <planeGeometry args={[0.4, 0.05]} />
          <meshBasicMaterial color={primaryColor} />
        </mesh>

        {/* Section 2 Bullets */}
        {[-0.65, -0.85, -1.05, -1.25].map((y, i) => (
          <group key={`s2-${i}`}>
            <mesh position={[-0.85, y, 0]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="#64748b" />
            </mesh>
            <mesh position={[-0.3, y, 0]}>
              <planeGeometry args={[1.0, 0.03]} />
              <meshBasicMaterial color="#cbd5e1" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

const ResumeStack = () => {
  const stackRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Slowly rotate the entire stack
    stackRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    stackRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={stackRef}>
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8}>
        
        {/* Back Card - Dark/Slate Theme */}
        <ResumeCard 
          position={[-1.2, 0.3, -1.2]} 
          rotation={[0, -0.15, -0.05]} 
          primaryColor="#334155" 
          delay={0}
        />
        
        {/* Middle Card - Primary Indigo Theme */}
        <ResumeCard 
          position={[0, 0, 0]} 
          rotation={[0, 0, 0]} 
          primaryColor="#6366f1" 
          delay={1}
        />
        
        {/* Front Card - Creative Pink Theme */}
        <ResumeCard 
          position={[1.2, -0.3, 1.2]} 
          rotation={[0, 0.15, 0.05]} 
          primaryColor="#ec4899" 
          delay={2}
        />
        
      </Float>
    </group>
  );
};

const Hero3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '550px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        {/* Premium Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 15, 10]} 
          angle={0.25} 
          penumbra={1} 
          intensity={1.2} 
          castShadow 
        />
        <spotLight 
          position={[-10, 5, -10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.8} 
          color="#a855f7" 
        />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 1000 }}
          rotation={[0, -0.3, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <ResumeStack />
        </PresentationControls>

        {/* Soft shadow plane underneath */}
        <ContactShadows 
          position={[0, -2.8, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={3} 
          far={5} 
          color="#000" 
        />
        
        {/* Reflection environment mapping */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Hero3D;
