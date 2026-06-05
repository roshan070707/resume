import React from 'react';
import { motion } from 'framer-motion';
import styles from './TrustSection.module.css';

const stats = [
  { value: "10+", label: "Professional Templates" },
  { value: "95%", label: "ATS Pass Rate" },
  { value: "100%", label: "Cloud Saved" },
  { value: "1-Click", label: "PDF Export" }
];

const TrustSection = () => {
  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div id="contact"></div>
    </section>
  );
};

export default TrustSection;
