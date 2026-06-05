import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Cloud, FileCheck, Target } from 'lucide-react';
import styles from './FeaturesSection.module.css';

const features = [
  {
    icon: Target,
    title: 'ATS Optimized',
    description: 'Our resumes are built with clean code that passes through Applicant Tracking Systems flawlessly.',
    color: '#10b981'
  },
  {
    icon: LayoutTemplate,
    title: 'Modern Templates',
    description: 'Choose from beautifully designed, recruiter-approved templates that stand out.',
    color: '#6366f1'
  },
  {
    icon: Cloud,
    title: 'Cloud Saving',
    description: 'Your progress is automatically saved to the cloud. Access your resume from anywhere.',
    color: '#3b82f6'
  },
  {
    icon: FileCheck,
    title: 'Instant PDF Export',
    description: 'Export your finished resume to a perfectly formatted PDF with a single click.',
    color: '#ec4899'
  }
];

const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection} id="features">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.headline}>
            Built for <span className={styles.gradientText}>Professionals.</span>
          </h2>
          <p className={styles.subheadline}>
            Everything you need to create a stunning resume that gets you hired.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.iconWrapper} style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                  <Icon size={24} />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
