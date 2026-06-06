import React from 'react';
import { Github, Linkedin } from './icons';
import { Logo } from './Logo';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Left: Brand */}
        <div className={styles.brand}>
          <Logo size={24} />
          <p className={styles.tagline}>
            Build professional resumes that stand out.
          </p>
        </div>

        {/* Middle: Links */}
        <div className={styles.links}>
          <a href="/templates" className={styles.link}>Templates</a>
          <a href="/dashboard" className={styles.link}>Dashboard</a>
          <a href="/ats" className={styles.link}>ATS Checker</a>
          <a href="#" className={styles.linkMuted}>Privacy Policy</a>
          <a href="#" className={styles.linkMuted}>Terms</a>
        </div>

        {/* Right: Social & Copyright */}
        <div className={styles.socialArea}>
          <div className={styles.socials}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialIcon}>
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialIcon}>
              <Linkedin size={18} />
            </a>
          </div>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} ResumeStudio.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
