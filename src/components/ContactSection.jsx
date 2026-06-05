import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Mail } from 'lucide-react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.glow}></div>
      
      <motion.div 
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className={styles.title}>Let's Connect</motion.h2>
        <motion.p variants={itemVariants} className={styles.subtitle}>
          Have questions or want to collaborate? Feel free to reach out across any of these platforms.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.linksGrid}>
          
          <a href="https://github.com/" target="_blank" rel="noreferrer" className={styles.linkCard}>
            <div className={styles.iconWrapper}>
              <Code size={28} />
            </div>
            <span className={styles.linkTitle}>GitHub</span>
          </a>

          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className={styles.linkCard}>
            <div className={styles.iconWrapper}>
              <Briefcase size={28} />
            </div>
            <span className={styles.linkTitle}>LinkedIn</span>
          </a>

          <a href="mailto:your.email@example.com" className={styles.linkCard}>
            <div className={styles.iconWrapper}>
              <Mail size={28} />
            </div>
            <span className={styles.linkTitle}>Email</span>
          </a>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
