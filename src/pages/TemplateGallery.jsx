import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, LayoutTemplate, Target, Eye, Sparkles, X, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import styles from './TemplateGallery.module.css';
import LivePreview from '../components/templates/LivePreview';
import { AnimatePresence, motion } from 'framer-motion';

const TemplateGallery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPreview, setSelectedPreview] = React.useState(null);
  
  const isPremiumUser = user?.plan === 'premium';

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
      summary: 'Motivated and detail-oriented recent Computer Science graduate with a strong foundation in software engineering principles, full-stack development, and data structures. Eager to leverage academic experience and internship background to contribute to a dynamic engineering team. Proven ability to quickly learn new technologies and thrive in collaborative environments.'
    },
    experience: [
      { id: '1', title: 'Software Engineering Intern', company: 'TechFlow Inc.', location: 'Seattle, WA', startDate: 'May 2023', endDate: 'Aug 2023', description: '• Developed and deployed a responsive internal dashboard using React and Node.js, reducing data retrieval time for the marketing team by 20%.\n• Collaborated with senior engineers to write unit tests using Jest, achieving 85% code coverage for the core authentication module.\n• Participated in daily stand-ups and Agile sprints.' },
      { id: '2', title: 'Undergraduate Teaching Assistant', company: 'University of Washington', location: 'Seattle, WA', startDate: 'Sep 2022', endDate: 'May 2023', description: '• Assisted professor in teaching Data Structures & Algorithms to a class of 150+ students.\n• Held weekly office hours to help students debug C++ and Java assignments.\n• Graded programming projects and provided constructive code reviews.' }
    ],
    education: [
      { id: '1', school: 'University of Washington', degree: 'Bachelor of Science', specialization: 'Computer Science', year: '2020 - 2024' }
    ],
    projects: [
      { id: '1', title: 'Smart Campus Map App', link: 'github.com/priyasharma/campus-map', description: '• Built a full-stack web application using React, Express, and MongoDB to help students navigate campus.\n• Implemented real-time location tracking and custom pathfinding algorithms.' }
    ],
    certifications: [
      { id: '1', name: 'AWS Certified Cloud Practitioner', org: 'Amazon Web Services', date: '2024' }
    ],
    skills: ['Java', 'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git/GitHub', 'Data Structures', 'C++']
  };

  const templates = [
    { id: 'classic_border', name: 'Classic Border', category: 'Academic/Classic', ats: '99%', class: '' },
    { id: 'modern_tech', name: 'Modern Tech', category: 'Tech/Engineering', ats: '98%', class: 'developer' },
    { id: 'minimal', name: 'Minimal', category: 'Clean/Simple', ats: '99%', class: '' },
    { id: 'executive', name: 'Executive', category: 'Leadership/Management', ats: '97%', class: '' },
    { id: 'elegant', name: 'Elegant', category: 'Professional', ats: '96%', class: '' },
    { id: 'creative', name: 'Creative', category: 'Design/Portfolio', ats: '90%', class: 'creative' },
    { id: 'corporate', name: 'Corporate', category: 'Traditional Professional', ats: '95%', class: '' },
    { id: 'harvard', name: 'Harvard', category: 'Academic/Classic', ats: '99%', class: '' },
    { id: 'stanford', name: 'Stanford', category: 'Academic/Modern', ats: '98%', class: '' },
    { id: 'startup', name: 'Startup', category: 'Entrepreneur', ats: '96%', class: '' },
    { id: 'developer', name: 'Software Engineer', category: 'Tech/Engineering', ats: '99%', class: 'developer' },
    { id: 'product_manager', name: 'Product Manager', category: 'Product/Business', ats: '97%', class: '' },
    { id: 'designer', name: 'Designer', category: 'Design/Creative', ats: '92%', class: 'creative' }
  ];

  const handleApply = (tpl) => {
    navigate('/dashboard', { state: { template: tpl.id } });
  };
  
  const handlePreview = (tpl) => {
    setSelectedPreview(tpl);
  };

  return (
    <>
      <Navbar />
      <div className={styles.galleryContainer}>
        <div className={styles.bgGlow}></div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Template Gallery</h1>
            <p className={styles.subtitle}>
              Choose from our selection of premium, ATS-optimized templates. 
              Switch instantly without losing your data.
            </p>
          </div>

          <div className={styles.grid}>
            {templates.map(tpl => (
              <div key={tpl.id} className={styles.card}>
                
                <div className={styles.previewWrapper}>
                  {/* Mock thumbnail representation */}
                  <div className={`${styles.mockPreview} ${styles[tpl.class] || ''}`}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: tpl.class === 'developer' ? '#334155' : '#e2e8f0' }}></div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.25rem' }}>
                        <div className={`${styles.mockLine} ${tpl.class === 'developer' ? styles.dark : ''}`} style={{ width: '60%' }}></div>
                        <div className={`${styles.mockLine} ${tpl.class === 'developer' ? styles.dark : ''}`} style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className={`${styles.mockLine} ${tpl.class === 'developer' ? styles.dark : ''}`} style={{ width: '100%', marginBottom: '0.25rem' }}></div>
                    <div className={`${styles.mockLine} ${tpl.class === 'developer' ? styles.dark : ''}`} style={{ width: '100%', marginBottom: '0.25rem' }}></div>
                    <div className={`${styles.mockLine} ${tpl.class === 'developer' ? styles.dark : ''}`} style={{ width: '80%', marginBottom: '1rem' }}></div>
                    
                    <div className={styles.mockLine} style={{ width: '30%', background: 'var(--color-primary)', marginBottom: '0.5rem' }}></div>
                    <div className={`${styles.mockLine} ${tpl.class === 'developer' ? styles.dark : ''}`} style={{ width: '100%', marginBottom: '0.25rem' }}></div>
                    <div className={`${styles.mockLine} ${tpl.class === 'developer' ? styles.dark : ''}`} style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>
                      {tpl.name}
                    </h3>
                    <span className={styles.cardCategory}>{tpl.category}</span>
                  </div>
                  <div className={styles.atsBadge}>
                    <Target size={12} /> {tpl.ats} ATS
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={`${styles.btn} ${styles.previewBtn}`} onClick={() => handlePreview(tpl)}>
                    <Eye size={16} /> Preview
                  </button>
                  <button 
                    className={`${styles.btn} ${styles.applyBtn}`} 
                    onClick={() => handleApply(tpl)}
                  >
                    <Sparkles size={16} /> Apply Template
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPreview && (
          <div className={styles.modalOverlay} onClick={() => setSelectedPreview(null)}>
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h2 className={styles.modalTitle}>{selectedPreview.name} Template</h2>
                  <p className={styles.modalSubtitle}>Previewing with sample data</p>
                </div>
                <button className={styles.closeModalBtn} onClick={() => setSelectedPreview(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalPreviewScroll}>
                  <div className={styles.modalPreviewScale}>
                    <LivePreview data={{ ...mockData, template: selectedPreview.id }} />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.atsBadge}>
                  <Target size={16} /> {selectedPreview.ats} ATS Optimized
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className={styles.cancelBtn} onClick={() => setSelectedPreview(null)}>
                    Cancel
                  </button>
                  <button 
                    className={`${styles.btn} ${styles.applyBtn}`} 
                    onClick={() => handleApply(selectedPreview)}
                  >
                    <Sparkles size={16} /> Use This Template
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TemplateGallery;
