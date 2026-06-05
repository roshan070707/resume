import React from 'react';
import { motion } from 'framer-motion';
import styles from './TemplateShowcase.module.css';

// Mock template visuals using simple CSS shapes to represent layouts
const templates = [
  { id: 'modern', name: 'Modern Tech', color: '#6366f1' },
  { id: 'executive', name: 'Executive', color: '#334155' },
  { id: 'minimal', name: 'Minimal', color: '#94a3b8' },
  { id: 'creative', name: 'Creative', color: '#ec4899' },
  { id: 'corporate', name: 'Corporate', color: '#0ea5e9' },
  { id: 'developer', name: 'Developer', color: '#10b981' },
];

const TemplateMockup = ({ template }) => (
  <div className={styles.mockupWrapper}>
    <div className={styles.mockupHeader}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
    <div className={styles.mockupBody}>
      <div className={styles.paper}>
        {/* Abstract representation of a resume */}
        <div style={{ width: '40%', height: '8px', background: template.color, borderRadius: '4px', marginBottom: '12px' }}></div>
        <div style={{ width: '25%', height: '4px', background: '#cbd5e1', borderRadius: '2px', marginBottom: '20px' }}></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
          <div>
            <div style={{ width: '100%', height: '4px', background: '#94a3b8', borderRadius: '2px', marginBottom: '8px' }}></div>
            <div style={{ width: '80%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '4px' }}></div>
            <div style={{ width: '90%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '16px' }}></div>
          </div>
          <div>
            <div style={{ width: '100%', height: '4px', background: '#94a3b8', borderRadius: '2px', marginBottom: '8px' }}></div>
            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '4px' }}></div>
            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '4px' }}></div>
            <div style={{ width: '70%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '16px' }}></div>
            
            <div style={{ width: '100%', height: '4px', background: '#94a3b8', borderRadius: '2px', marginBottom: '8px' }}></div>
            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '4px' }}></div>
            <div style={{ width: '85%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '4px' }}></div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.templateName}>{template.name}</div>
  </div>
);

const TemplateShowcase = () => {
  return (
    <section className={styles.section} id="templates">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Stand Out From The Crowd</h2>
          <p className={styles.subheadline}>Choose from dozens of professionally designed, ATS-friendly templates.</p>
        </div>

        <div className={styles.marqueeContainer}>
          {/* We render the track twice to allow seamless infinite scrolling via CSS animation */}
          <div className={styles.marqueeTrack}>
            {templates.map(t => <TemplateMockup key={`1-${t.id}`} template={t} />)}
            {templates.map(t => <TemplateMockup key={`2-${t.id}`} template={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
