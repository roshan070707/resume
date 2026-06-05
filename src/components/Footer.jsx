import React from 'react';
import { Github, Linkedin } from './icons';
import { Logo } from './Logo';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      background: 'var(--bg-color)',
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        
        {/* Left: Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Logo size={24} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
            Build professional resumes that stand out.
          </p>
        </div>

        {/* Middle: Links */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <a href="/templates" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s', fontWeight: 500 }}>Templates</a>
          <a href="/dashboard" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s', fontWeight: 500 }}>Dashboard</a>
          <a href="/ats" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s', fontWeight: 500 }}>ATS Checker</a>
          <a href="#" style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>Terms</a>
        </div>

        {/* Right: Social & Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-tertiary)', transition: 'color 0.2s' }}>
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-tertiary)', transition: 'color 0.2s' }}>
              <Linkedin size={18} />
            </a>
          </div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} ResumeStudio.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
