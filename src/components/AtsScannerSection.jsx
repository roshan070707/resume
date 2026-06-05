import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CheckCircle2, ShieldAlert, Zap, FileText } from 'lucide-react';
import styles from './AtsScannerSection.module.css';

const AtsScannerSection = () => {
  const [score, setScore] = useState(0);
  
  // This effect simulates the continuous counting up of the ATS score
  useEffect(() => {
    let interval;
    const runScan = () => {
      setScore(0);
      let currentScore = 0;
      interval = setInterval(() => {
        currentScore += 1;
        setScore(currentScore);
        if (currentScore >= 87) {
          clearInterval(interval);
        }
      }, 30);
    };

    runScan(); // Run initially
    const loopInterval = setInterval(() => {
      runScan(); // Repeat every 6 seconds
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(loopInterval);
    };
  }, []);

  const scoreCircumference = 2 * Math.PI * 45; // r=45
  const scoreOffset = scoreCircumference - (score / 100) * scoreCircumference;

  return (
    <section className={styles.scannerSection} id="ats-score">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headline}>See Your Resume Through A <span className={styles.gradientText}>Recruiter's Eyes</span></h2>
          <p className={styles.subheadline}>
            Upload a resume and instantly discover how ATS systems evaluate your profile.
          </p>
        </div>

        <div className={styles.dashboardGrid}>
          
          {/* Left: Floating 3D Resume with Scanner */}
          <div className={styles.resumeColumn}>
            <motion.div 
              className={styles.resumeContainer}
              initial={{ rotateX: 10, rotateY: -10 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={styles.glassResume}>
                {/* Resume Mock Content */}
                <div className={styles.resumeHeader}>
                  <div className={styles.avatar} />
                  <div className={styles.headerLines}>
                    <div className={styles.lineLg} />
                    <div className={styles.lineMd} />
                  </div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle} />
                  <div className={styles.lineFull} />
                  
                  {/* Highlightable Keywords */}
                  <div className={styles.textBlock}>
                    <div className={styles.lineFull} />
                    <motion.div 
                      className={styles.keywordHighlight}
                      animate={{ backgroundColor: ["rgba(255,255,255,0.05)", "rgba(34, 197, 94, 0.4)", "rgba(34, 197, 94, 0.4)", "rgba(255,255,255,0.05)"] }}
                      transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                    >
                      Senior React Engineer
                    </motion.div>
                    <div className={styles.lineFull} />
                  </div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle} />
                  <div className={styles.textBlock}>
                    <div className={styles.lineFull} />
                    <motion.div 
                      className={styles.keywordHighlight}
                      animate={{ backgroundColor: ["rgba(255,255,255,0.05)", "rgba(34, 197, 94, 0.4)", "rgba(34, 197, 94, 0.4)", "rgba(255,255,255,0.05)"] }}
                      transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
                    >
                      CI/CD Pipelines & AWS
                    </motion.div>
                    <div className={styles.lineHalf} />
                  </div>
                </div>

                {/* Animated Scanning Laser */}
                <motion.div 
                  className={styles.scannerLaser}
                  animate={{ top: ["0%", "100%", "0%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: "linear" }}
                >
                  <div className={styles.laserBeam} />
                  <div className={styles.laserGlow} />
                </motion.div>
              </div>

              {/* Floating Analytics Cards */}
              <motion.div 
                className={`${styles.floatingCard} ${styles.card1}`}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FileText size={16} className={styles.cardIcon} />
                <div>
                  <div className={styles.cardValue}>95%</div>
                  <div className={styles.cardLabel}>Keyword Match</div>
                </div>
              </motion.div>

              <motion.div 
                className={`${styles.floatingCard} ${styles.card2}`}
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Zap size={16} className={styles.cardIconAlt} />
                <div>
                  <div className={styles.cardValue}>A+</div>
                  <div className={styles.cardLabel}>Readability Score</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* Right: SaaS Dashboard */}
          <div className={styles.dashboardColumn}>
            
            {/* Top Row: Score Ring and Summary */}
            <div className={styles.scoreRow}>
              <div className={styles.scoreRingContainer}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="transparent" 
                    stroke="var(--color-primary)" 
                    strokeWidth="8" 
                    strokeDasharray={scoreCircumference}
                    strokeDashoffset={scoreOffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                    transform="rotate(-90 50 50)"
                    filter="drop-shadow(0 0 6px rgba(79, 70, 229, 0.6))"
                  />
                </svg>
                <div className={styles.scoreNumber}>
                  {score}<span className={styles.scorePercent}>%</span>
                </div>
              </div>
              <div className={styles.scoreText}>
                <h3>Excellent Candidate</h3>
                <p>Your resume is highly optimized and likely to pass ATS screening.</p>
              </div>
            </div>

            {/* Smart Suggestions Panel */}
            <div className={styles.suggestionsPanel}>
              <h4 className={styles.panelTitle}>Smart Suggestions</h4>
              <div className={styles.suggestionList}>
                {[
                  "Add JavaScript to skills",
                  "Include GitHub Projects link",
                  "Quantify achievements in last role",
                  "Improve summary section clarity"
                ].map((text, i) => (
                  <motion.div 
                    key={i} 
                    className={styles.suggestionItem}
                    animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, 0] }}
                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.1 + (i*0.1), 0.9, 1] }}
                  >
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skill Match Visualization */}
            <div className={styles.panel}>
              <h4 className={styles.panelTitle}>Skill Match Coverage</h4>
              <div className={styles.skillsList}>
                {[
                  { name: "JavaScript", target: 95 },
                  { name: "React", target: 82 },
                  { name: "Node.js", target: 76 },
                  { name: "ATS Compatibility", target: 90 }
                ].map((skill, i) => (
                  <div key={skill.name} className={styles.skillRow}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPercent}>{skill.target}%</span>
                    </div>
                    <div className={styles.skillBarTrack}>
                      <motion.div 
                        className={styles.skillBarFill}
                        animate={{ width: ["0%", `${skill.target}%`, `${skill.target}%`, "0%"] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.3 + (i*0.1), 0.9, 1], ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AtsScannerSection;
