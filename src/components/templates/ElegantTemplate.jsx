import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const ElegantTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;
  const accentColor = '#27272a'; // Very dark gray, almost black
  const secondaryColor = '#52525b'; // Medium gray

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#111', lineHeight: 1.6, padding: '1rem' }}>
      <header style={{ textAlign: 'center', borderBottom: `1px solid ${secondaryColor}`, paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'normal', margin: '0 0 0.25rem 0', color: accentColor, letterSpacing: '2px' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && <h2 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', color: secondaryColor, fontStyle: 'italic', letterSpacing: '1px' }}>{personal.title}</h2>}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: secondaryColor, marginBottom: '0.5rem' }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Mail size={14} /> 
              <a href={`mailto:${personal.email}`} style={{ color: secondaryColor, textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={14} /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: secondaryColor }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: secondaryColor, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: secondaryColor, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Github size={14} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: secondaryColor, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <LinkIcon size={14} /> Portfolio
            </a>
          )}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ margin: '0 auto', fontSize: '1rem', fontStyle: 'italic', maxWidth: '80%', color: '#333' }}>
            "{personal.summary}"
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: accentColor, textTransform: 'uppercase', borderBottom: `1px solid ${secondaryColor}`, paddingBottom: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '2px' }}>
            Professional Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '1.15rem', color: accentColor }}>{exp.title}</strong>
                  <span style={{ fontSize: '0.9rem', color: secondaryColor, fontStyle: 'italic' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ color: '#000', fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                {exp.description && <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap', color: '#444' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: accentColor, textTransform: 'uppercase', borderBottom: `1px solid ${secondaryColor}`, paddingBottom: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '2px' }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem', color: accentColor }}>{edu.school}</strong>
                  <div style={{ fontSize: '1rem', color: '#333' }}>{edu.degree} {edu.specialization && `in ${edu.specialization}`}</div>
                  {edu.gpa && <div style={{ fontSize: '0.9rem', color: secondaryColor }}>GPA: {edu.gpa}</div>}
                </div>
                <div style={{ fontSize: '0.9rem', color: secondaryColor, fontStyle: 'italic' }}>
                  {edu.startYear && `${edu.startYear} - `}{edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: accentColor, textTransform: 'uppercase', borderBottom: `1px solid ${secondaryColor}`, paddingBottom: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '2px' }}>
            Selected Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '1.1rem', color: accentColor }}>{proj.title}</strong>
                </div>
                <div style={{ fontSize: '0.9rem', color: secondaryColor, fontStyle: 'italic', marginBottom: '0.5rem' }}>
                  {proj.technologies && `Technologies: ${proj.technologies}`}
                </div>
                {proj.description && <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap', color: '#444' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {(certifications.length > 0 || skills.length > 0) && (
        <div style={{ display: 'flex', gap: '2rem' }}>
          {skills.length > 0 && (
            <section style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.4rem', color: accentColor, textTransform: 'uppercase', borderBottom: `1px solid ${secondaryColor}`, paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'center', letterSpacing: '2px' }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {skills.join(' • ')}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.4rem', color: accentColor, textTransform: 'uppercase', borderBottom: `1px solid ${secondaryColor}`, paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'center', letterSpacing: '2px' }}>
                Certifications
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', color: '#333' }}>
                {certifications.map(cert => (
                  <li key={cert.id} style={{ marginBottom: '0.5rem' }}>
                    <strong>{cert.name}</strong> — {cert.org} ({cert.date})
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ElegantTemplate;
