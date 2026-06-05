import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import DeveloperTemplate from './templates/DeveloperTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import styles from './InteractiveTemplates.module.css';

const mockData = {
  personal: {
    firstName: 'Priya',
    lastName: 'Sharma',
    title: 'Computer Science Graduate',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/priyasharma',
    github: 'github.com/priyasharma',
    summary: 'Motivated and detail-oriented recent Computer Science graduate with a strong foundation in software engineering principles, full-stack development, and data structures.'
  },
  experience: [
    { id: '1', title: 'Software Engineering Intern', company: 'TechFlow Inc.', location: 'Seattle, WA', startDate: 'May 2023', endDate: 'Aug 2023', description: '• Developed and deployed a responsive internal dashboard using React and Node.js.\n• Participated in daily stand-ups and Agile sprints.' }
  ],
  education: [
    { id: '1', school: 'University of Washington', degree: 'Bachelor of Science', specialization: 'Computer Science', year: '2020 - 2024' }
  ],
  projects: [
    { id: '1', title: 'Smart Campus Map App', link: 'github.com/priyasharma/campus-map', description: '• Built a full-stack web application using React, Express, and MongoDB.' }
  ],
  certifications: [],
  skills: ['Java', 'Python', 'React', 'Node.js', 'SQL']
};

const templatesList = [
  { id: 'fresher', name: 'Student / Fresher', score: 92, category: 'Early Career', Component: ModernTemplate },
  { id: 'developer', name: 'Software Developer', score: 98, category: 'Engineering', Component: DeveloperTemplate },
  { id: 'frontend', name: 'Frontend Developer', score: 96, category: 'Design & Code', Component: MinimalTemplate },
  { id: 'corporate', name: 'Corporate Professional', score: 99, category: 'Business & Finance', Component: CorporateTemplate },
  { id: 'executive', name: 'Executive', score: 98, category: 'Leadership', Component: ExecutiveTemplate },
  { id: 'creative', name: 'Creative', score: 95, category: 'Design & Media', Component: CreativeTemplate }
];

const InteractiveTemplates = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.templatesSection} id="templates">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Professional <span className={styles.gradientText}>Resume Templates</span></h2>
          <p className={styles.subheadline}>
            Choose from recruiter-approved resume designs built to maximize interviews and ATS compatibility.
          </p>
        </div>

        <div className={styles.grid}>
          {templatesList.map((template) => {
            const TemplateComponent = template.Component;
            return (
              <div key={template.id} className={styles.templateCard}>
                <div className={styles.previewWindow}>
                  <div className={styles.templateScaler}>
                    <TemplateComponent data={mockData} />
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.templateName}>{template.name}</h3>
                      <span className={styles.templateCategory}>{template.category}</span>
                    </div>
                    <div className={styles.atsBadge}>
                      <CheckCircle2 size={14} /> {template.score}% ATS
                    </div>
                  </div>
                  
                  <button 
                    className={styles.applyBtn}
                    onClick={() => navigate('/builder')}
                  >
                    Use Template <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaWrapper}>
          <h3 className={styles.ctaHeadline}>Start Building Your Professional Resume Today</h3>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryBtn} onClick={() => navigate('/builder')}>
              Build Resume Free <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InteractiveTemplates;
