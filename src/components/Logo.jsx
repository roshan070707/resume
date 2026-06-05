import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Logo = ({ size = 32, showText = true, className = '' }) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Quick pulse and rotate
    await controls.start({ rotate: 10, scale: 0.9, transition: { duration: 0.1 } });
    await controls.start({ rotate: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } });
    setIsAnimating(false);
    navigate('/');
  };

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`} 
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', outline: 'none' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <motion.svg 
        width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
        animate={controls}
        style={{ originX: 0.5, originY: 0.5 }}
        whileHover={{ filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.6))' }}
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
        </defs>

        {/* Document Background Fold (Subtle Document Motif) */}
        <path 
          d="M 6 10 C 6 7.79086 7.79086 6 10 6 H 20 L 26 12 V 22 C 26 24.2091 24.2091 26 22 26 H 10 C 7.79086 26 6 24.2091 6 22 V 10 Z" 
          fill="url(#rs-logo-grad-light)" 
          stroke="url(#rs-logo-grad)" 
          strokeWidth="1.5" 
          strokeOpacity="0.3" 
        />
        <path 
          d="M 20 6 V 10 C 20 11.1046 20.8954 12 22 12 H 26" 
          stroke="url(#rs-logo-grad)" 
          strokeWidth="1.5" 
          strokeOpacity="0.3" 
          strokeLinejoin="round" 
          fill="none" 
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
      
      {showText && (
        <span style={{ 
          fontSize: `${Math.max(16, size * 0.55)}px`, 
          fontWeight: 700, 
          color: 'var(--text-primary)', 
          fontFamily: 'var(--font-heading)', 
          letterSpacing: '-0.02em',
          lineHeight: 1
        }}>
          Resume<span style={{ color: 'var(--color-primary)' }}>Studio</span>
        </span>
      )}
    </motion.div>
  );
};

export default Logo;
