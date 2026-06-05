import React from 'react';
import { motion } from 'framer-motion';
import styles from './BackgroundEffects.module.css';

const BackgroundEffects = () => {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.meshGradient} />
      

      
      <div className={styles.gridOverlay} />
    </div>
  );
};

export default BackgroundEffects;
