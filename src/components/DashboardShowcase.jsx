import React from 'react';
import { motion } from 'framer-motion';
import { Plus, LayoutTemplate, Settings, CheckCircle2, Cloud } from 'lucide-react';
import styles from './DashboardShowcase.module.css';
import { Logo } from './Logo';

const DashboardShowcase = () => {
  return (
    <section className={styles.section} id="dashboard-preview">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Your Command Center</h2>
          <p className={styles.subheadline}>Manage all your resumes, track ATS scores, and duplicate variations for different roles.</p>
        </div>

        <motion.div 
          className={styles.mockupContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Dashboard Window Mockup */}
          <div className={styles.dashboardWindow}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.brand}>
                <Logo size={20} />
              </div>
              <div className={styles.navGroup}>
                <div className={styles.navItemActive}><LayoutTemplate size={16} /> Resumes</div>
                <div className={styles.navItem}><Settings size={16} /> Settings</div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
              <div className={styles.topBar}>
                <div className={styles.greeting}>Welcome back, Alex 👋</div>
                <button className={styles.createBtn}><Plus size={16} /> New Resume</button>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statTitle}>Total Resumes</div>
                  <div className={styles.statValue}>4</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statTitle}>Avg. ATS Score</div>
                  <div className={styles.statValue} style={{color: 'var(--color-success)'}}>94%</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statTitle}>Storage Used</div>
                  <div className={styles.statValue}>1.2 MB</div>
                </div>
              </div>

              <h3 className={styles.sectionTitle}>Recent Resumes</h3>
              <div className={styles.resumeGrid}>
                {/* Resume Card 1 */}
                <div className={styles.resumeCard}>
                  <div className={styles.resumePreview}>
                    <div className={styles.mockHeader}></div>
                    <div className={styles.mockLines}>
                      <div></div><div></div><div></div>
                    </div>
                  </div>
                  <div className={styles.resumeInfo}>
                    <h4>Frontend Developer Role</h4>
                    <div className={styles.resumeMeta}>
                      <span className={styles.badge}><CheckCircle2 size={12} color="var(--color-success)" /> ATS: 98</span>
                      <span className={styles.badge}><Cloud size={12} color="var(--text-tertiary)" /> Saved</span>
                    </div>
                  </div>
                </div>

                {/* Resume Card 2 */}
                <div className={styles.resumeCard}>
                  <div className={styles.resumePreview}>
                    <div className={styles.mockHeader}></div>
                    <div className={styles.mockLines}>
                      <div></div><div></div><div></div>
                    </div>
                  </div>
                  <div className={styles.resumeInfo}>
                    <h4>Product Designer 2026</h4>
                    <div className={styles.resumeMeta}>
                      <span className={styles.badge}><CheckCircle2 size={12} color="var(--color-success)" /> ATS: 92</span>
                      <span className={styles.badge}><Cloud size={12} color="var(--text-tertiary)" /> Saved</span>
                    </div>
                  </div>
                </div>

                {/* Resume Card 3 */}
                <div className={styles.resumeCard} style={{ opacity: 0.5 }}>
                  <div className={styles.resumePreview} style={{ background: 'transparent', border: '2px dashed var(--glass-border)' }}>
                    <Plus size={32} color="var(--text-tertiary)" />
                  </div>
                  <div className={styles.resumeInfo}>
                    <h4>Create New</h4>
                    <div className={styles.resumeMeta}>Start from scratch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
