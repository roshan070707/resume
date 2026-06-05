import React from 'react';
import { motion } from 'framer-motion';
import styles from './FeatureCard.module.css';

const FeatureCard = ({ title, description, icon: Icon, delay }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className={styles.glowEffect} />
      <div className={styles.iconContainer}>
        <Icon size={24} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
