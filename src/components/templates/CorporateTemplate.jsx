import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const CorporateTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', color: '#000', lineHeight: 1.5 }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', textTransform: 'uppercase' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && <h2 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', fontWeight: 'normal', fontStyle: 'italic' }}>{personal.title}</h2>}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={14} /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#000', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={14} /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.95rem' }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Github size={14} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <LinkIcon size={14} /> Portfolio
            </a>
          )}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
            Professional Summary
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1.05rem' }}>{exp.company} {exp.location && `- ${exp.location}`}</strong>
                  <span style={{ fontSize: '0.95rem' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{exp.title}</div>
                {exp.description && <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong style={{ fontSize: '1.05rem' }}>{edu.school}</strong>
                  <div style={{ fontSize: '0.95rem' }}>{edu.degree} {edu.specialization && `in ${edu.specialization}`} {edu.gpa && `(GPA: ${edu.gpa})`}</div>
                </div>
                <div style={{ fontSize: '0.95rem' }}>{edu.startYear && `${edu.startYear} - `}{edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
            Key Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1.05rem' }}>{proj.title}</strong>
                  <span style={{ fontSize: '0.95rem' }}>{proj.technologies && `[${proj.technologies}]`}</span>
                </div>
                {proj.description && <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
            Certifications
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem' }}>
            {certifications.map(cert => (
              <li key={cert.id}>
                {cert.name} - {cert.org} ({cert.date})
                {cert.link && <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'underline', marginLeft: '6px', fontSize: '0.85rem' }}>[Credential]</a>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
            Core Competencies
          </h3>
          <div style={{ fontSize: '0.95rem' }}>
            {skills.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
};

export default CorporateTemplate;
