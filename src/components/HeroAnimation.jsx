import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Cloud, Layout, Download } from 'lucide-react';
import styles from './HeroAnimation.module.css';

const HeroAnimation = () => {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.perspectiveWrapper}
        initial={{ rotateX: 10, rotateY: -15, scale: 0.9 }}
        animate={{ rotateX: 5, rotateY: -10, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Main Dashboard Window */}
        <div className={styles.appWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.dots}>
              <span className={styles.dot} style={{background: '#ef4444'}}></span>
              <span className={styles.dot} style={{background: '#f59e0b'}}></span>
              <span className={styles.dot} style={{background: '#10b981'}}></span>
            </div>
            <div className={styles.windowTitle}>ResumeStudio - Editor</div>
          </div>
          
          <div className={styles.windowBody}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.sidebarItem}><Layout size={14} /> Templates</div>
              <div className={styles.sidebarItem}><FileText size={14} /> Content</div>
              <div className={styles.sidebarItemActive}><CheckCircle2 size={14} /> ATS Score</div>
            </div>

            {/* Resume Preview Area */}
            <div className={styles.resumePreview}>
              <motion.div 
                className={styles.resumePaper}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className={styles.resumeHeader}>
                  <div className={styles.resumeName}></div>
                  <div className={styles.resumeTitle}></div>
                </div>
                <div className={styles.resumeLines}>
                  <div className={styles.line} style={{width: '100%'}}></div>
                  <div className={styles.line} style={{width: '80%'}}></div>
                  <div className={styles.line} style={{width: '90%'}}></div>
                  <div className={styles.line} style={{width: '60%'}}></div>
                </div>
                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}></div>
                  <div className={styles.line} style={{width: '100%'}}></div>
                  <div className={styles.line} style={{width: '100%'}}></div>
                  <div className={styles.line} style={{width: '70%'}}></div>
                </div>
                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}></div>
                  <div className={styles.line} style={{width: '100%'}}></div>
                  <div className={styles.line} style={{width: '85%'}}></div>
                  <div className={styles.line} style={{width: '40%'}}></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          className={styles.floatingCard}
          style={{ top: '10%', right: '-15%' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className={styles.scoreCircle}>
            <span>98</span>
          </div>
          <div className={styles.cardText}>
            <h4>ATS Match</h4>
            <p>Excellent</p>
          </div>
        </motion.div>

        <motion.div 
          className={styles.floatingCardSmall}
          style={{ bottom: '20%', left: '-10%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Cloud size={16} color="#10b981" />
          <span>Cloud Saved</span>
        </motion.div>

        <motion.div 
          className={styles.floatingCardSmall}
          style={{ bottom: '10%', right: '-5%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <Download size={16} color="#6366f1" />
          <span>PDF Ready</span>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroAnimation;
