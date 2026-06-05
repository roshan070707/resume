import React from 'react';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';
import styles from './ModernTemplate.module.css';
import { formatUrl } from '../../utils/formatUrl';

const LinkedinIcon = ({ size = 13, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 13, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ModernTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div className={styles.templateContainer}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personal.firstName} {personal.lastName}</h1>
        {personal.title && <h2 className={styles.title}>{personal.title}</h2>}
        
        <div className={styles.contactContainer}>
          <div className={styles.contactRow}>
            {personal.location && (
              <span className={styles.contactItem}>
                <MapPin size={13} className={styles.contactIcon} />
                {personal.location}
              </span>
            )}
            {personal.email && (
              <span className={styles.contactItem}>
                <Mail size={13} className={styles.contactIcon} />
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </span>
            )}
            {personal.phone && (
              <span className={styles.contactItem}>
                <Phone size={13} className={styles.contactIcon} />
                {personal.phone}
              </span>
            )}
          </div>
          
          {(personal.linkedin || personal.github || personal.portfolio) && (
            <div className={styles.socialRow}>
              {personal.linkedin && (
                <span className={styles.contactItem}>
                  <LinkedinIcon size={13} className={styles.contactIcon} />
                  <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </span>
              )}
              {personal.github && (
                <span className={styles.contactItem}>
                  <GithubIcon size={13} className={styles.contactIcon} />
                  <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer">GitHub</a>
                </span>
              )}
              {personal.portfolio && (
                <span className={styles.contactItem}>
                  <Globe size={13} className={styles.contactIcon} />
                  <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer">Portfolio</a>
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {personal.summary && (
        <section className={styles.section}>
          <p className={styles.summary}>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Professional Experience</h3>
          <div className={styles.sectionContent}>
            {experience.map(exp => (
              <div key={exp.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemMain}>
                    <strong>{exp.title}</strong>
                    {exp.company && <span> at {exp.company}</span>}
                  </div>
                  <div className={styles.itemDate}>
                    {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                  </div>
                </div>
                {exp.description && (
                  <p className={styles.itemDescription}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Education</h3>
          <div className={styles.sectionContent}>
            {education.map(edu => (
              <div key={edu.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemMain}>
                    <strong>{edu.school}</strong>
                  </div>
                  <div className={styles.itemDate}>{edu.year}</div>
                </div>
                {edu.degree && <div className={styles.itemSub}>{edu.degree}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Projects</h3>
          <div className={styles.sectionContent}>
            {projects.map(proj => (
              <div key={proj.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemMain}>
                    <strong>{proj.title}</strong>
                    {proj.link && (
                      <span className={styles.link}>
                        {' | '}<a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                      </span>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className={styles.itemDescription}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Certifications</h3>
          <div className={styles.sectionContent}>
            {certifications.map(cert => (
              <div key={cert.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemMain}>
                    <strong>{cert.name}</strong>
                    {cert.org && <span> from {cert.org}</span>}
                    {cert.link && (
                      <span className={styles.link}>
                        {' | '}<a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer">View Credential</a>
                      </span>
                    )}
                  </div>
                  <div className={styles.itemDate}>{cert.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Skills</h3>
          <div className={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <span key={index} className={styles.skillPill}>{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
