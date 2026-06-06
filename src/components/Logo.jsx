import React, { useState, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Logo = ({ size = 32, showText = true, className = '' }) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const [transform3d, setTransform3d] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Dramatic 3D flip on click
    await controls.start({ rotateY: 360, scale: 0.8, transition: { duration: 0.4, ease: 'easeInOut' } });
    await controls.start({ rotateY: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 12 } });
    setIsAnimating(false);
    navigate('/');
  };

  // Track mouse position for 3D tilt effect
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max ±25 degrees for dramatic effect)
    const rotateY = ((x - centerX) / centerX) * 25;
    const rotateX = -((y - centerY) / centerY) * 25;
    
    setTransform3d({ rotateX, rotateY });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform3d({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
        outline: 'none',
        perspective: '600px',
        WebkitPerspective: '600px',
      }}
      className={className}
    >
      {/* 3D Icon Container */}
      <motion.div
        animate={controls}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: `rotateX(${transform3d.rotateX}deg) rotateY(${transform3d.rotateY}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Glow effect behind logo */}
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(168,85,247,0.3) 40%, transparent 70%)',
          filter: 'blur(12px)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: -1,
        }} />

        {/* Reflection/shadow beneath */}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%) scaleY(0.3)',
          width: `${size * 0.8}px`,
          height: `${size * 0.4}px`,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.4) 0%, transparent 70%)',
          filter: 'blur(6px)',
          opacity: isHovered ? 0.8 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }} />

        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isHovered 
              ? 'drop-shadow(0 0 8px rgba(99,102,241,0.6)) drop-shadow(0 0 20px rgba(168,85,247,0.4))' 
              : 'none',
            transition: 'filter 0.4s ease',
          }}
        >
          <defs>
            <linearGradient id="rs-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" /> {/* Indigo */}
              <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
            </linearGradient>
            <linearGradient id="rs-logo-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="rs-logo-hover-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Document Background Fold (Subtle Document Motif) */}
          <path
            d="M 6 10 C 6 7.79086 7.79086 6 10 6 H 20 L 26 12 V 22 C 26 24.2091 24.2091 26 22 26 H 10 C 7.79086 26 6 24.2091 6 22 V 10 Z"
            fill={isHovered ? "url(#rs-logo-hover-grad)" : "url(#rs-logo-grad-light)"}
            stroke="url(#rs-logo-grad)"
            strokeWidth="1.5"
            strokeOpacity={isHovered ? "0.6" : "0.3"}
            style={{ transition: 'all 0.4s ease' }}
          />
          <path
            d="M 20 6 V 10 C 20 11.1046 20.8954 12 22 12 H 26"
            stroke="url(#rs-logo-grad)"
            strokeWidth="1.5"
            strokeOpacity={isHovered ? "0.6" : "0.3"}
            strokeLinejoin="round"
            fill="none"
            style={{ transition: 'all 0.4s ease' }}
          />

          {/* R & S Monogram (Continuous flowing path) */}
          <g transform="translate(1, -1)">
            {/* Vertical Stem of R */}
            <path d="M 12 11 V 23" stroke="url(#rs-logo-grad)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Loop of R seamlessly flowing into curve of S */}
            <path
              d="M 12 11 H 16.5 A 2.5 2.5 0 0 1 16.5 16 H 15.5 A 3.5 3.5 0 0 0 15.5 23 H 20"
              stroke="url(#rs-logo-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </motion.svg>
      </motion.div>

      {showText && (
        <motion.span
          style={{
            fontSize: `${Math.max(16, size * 0.55)}px`,
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            transition: 'all 0.3s ease',
            textShadow: isHovered ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
          }}
        >
          Resume<span style={{
            background: isHovered 
              ? 'linear-gradient(135deg, #818cf8, #c084fc)' 
              : 'none',
            WebkitBackgroundClip: isHovered ? 'text' : 'unset',
            WebkitTextFillColor: isHovered ? 'transparent' : 'var(--color-primary)',
            backgroundClip: isHovered ? 'text' : 'unset',
            color: isHovered ? 'transparent' : 'var(--color-primary)',
            transition: 'all 0.4s ease',
          }}>Studio</span>
        </motion.span>
      )}
    </div>
  );
};

export default Logo;
