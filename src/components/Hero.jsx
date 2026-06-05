import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import HeroAnimation from './HeroAnimation';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.bgGlow}></div>
      
      <div className={styles.container}>
        {/* Left Column: Text Content */}
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>Professional Resume Builder</span>
          </div>
          
          <h1 className={styles.headline}>
            Craft a Resume That Gets <span className={styles.gradientText}>Interviews.</span>
          </h1>
          
          <p className={styles.subheadline}>
            Build professional, ATS-friendly resumes with modern templates, cloud saving, and one-click PDF export.
          </p>
          
          <div className={styles.ctaGroup}>
            <button className={styles.primaryBtn} onClick={() => navigate('/builder/new')}>
              Create Resume <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </button>
            <button className={styles.secondaryBtn} onClick={() => navigate('/templates')}>
              Browse Templates
            </button>
          </div>
        </motion.div>

        {/* Right Column: 2.5D Animated Showcase */}
        <motion.div 
          className={styles.visualContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <HeroAnimation />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
