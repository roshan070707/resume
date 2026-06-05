import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const ExecutiveTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{ 
      fontFamily: 'Georgia, serif', 
      color: '#2d3748', 
      lineHeight: 1.6,
      fontSize: '0.9rem',
      borderTop: '6px solid #1a202c', // Elegant top border
      paddingTop: '1.5rem'
    }}>
      {/* Executive Header */}
      <header style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <h1 style={{ 
          fontSize: '2.4rem', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          margin: '0 0 0.25rem 0', 
          color: '#1a202c',
          fontWeight: 'normal'
        }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && (
          <h2 style={{ 
            fontSize: '1.15rem', 
            fontWeight: 'normal', 
            fontStyle: 'italic', 
            margin: '0 0 1rem 0', 
            color: '#4a5568',
            letterSpacing: '0.5px'
          }}>
            {personal.title}
          </h2>
        )}
        
        <div style={{ 
          fontSize: '0.85rem', 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '1.25rem', 
          color: '#4a5568',
          marginBottom: '0.5rem'
        }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={13} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Mail size={13} /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#4a5568', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Phone size={13} /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ 
          fontSize: '0.85rem', 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '1.25rem', 
          borderBottom: '1px double #cbd5e0',
          paddingBottom: '0.75rem'
        }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Linkedin size={13} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Github size={13} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <LinkIcon size={13} /> Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ 
            textTransform: 'uppercase', 
            fontSize: '1.05rem', 
            letterSpacing: '0.5px', 
            color: '#1a202c',
            borderBottom: '1px solid #718096', 
            paddingBottom: '0.25rem', 
            marginBottom: '0.5rem' 
          }}>
            Executive Profile
          </h3>
          <p style={{ textAlign: 'justify', fontSize: '0.85rem', margin: 0 }}>
            {personal.summary}
          </p>
        </section>
      )}

      {/* Core Competencies Grid */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ 
            textTransform: 'uppercase', 
            fontSize: '1.05rem', 
            letterSpacing: '0.5px', 
            color: '#1a202c',
            borderBottom: '1px solid #718096', 
            paddingBottom: '0.25rem', 
            marginBottom: '0.5rem' 
          }}>
            Core Competencies
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '0.35rem 1rem', 
            fontSize: '0.85rem',
            color: '#2d3748'
          }}>
            {skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#718096' }}>▪</span> {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ 
            textTransform: 'uppercase', 
            fontSize: '1.05rem', 
            letterSpacing: '0.5px', 
            color: '#1a202c',
            borderBottom: '1px solid #718096', 
            paddingBottom: '0.25rem', 
            marginBottom: '0.75rem' 
          }}>
            Professional Leadership
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold', color: '#1a202c', fontSize: '0.85rem' }}>
                  <span>{exp.title}</span>
                  <span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#4a5568', marginBottom: '0.25rem' }}>
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                {exp.description && (
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', listStyleType: 'circle' }}>
                    {exp.description.split('\n').map((bullet, idx) => (
                      <li key={idx} style={{ marginBottom: '0.15rem' }}>{bullet.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ 
            textTransform: 'uppercase', 
            fontSize: '1.05rem', 
            letterSpacing: '0.5px', 
            color: '#1a202c',
            borderBottom: '1px solid #718096', 
            paddingBottom: '0.25rem', 
            marginBottom: '0.75rem' 
          }}>
            Key Initiatives & Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#1a202c' }}>{proj.title}</strong>
                  {proj.link && (
                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', fontSize: '0.75rem' }}>
                      [Initiative Link]
                    </a>
                  )}
                </div>
                {proj.technologies && <div style={{ fontSize: '0.75rem', color: '#718096', fontStyle: 'italic' }}>Focus: {proj.technologies}</div>}
                {proj.description && <p style={{ fontSize: '0.85rem', margin: '0.15rem 0 0 0', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications Side-by-Side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }}>
        {education.length > 0 && (
          <section>
            <h3 style={{ 
              textTransform: 'uppercase', 
              fontSize: '0.95rem', 
              letterSpacing: '0.5px', 
              color: '#1a202c',
              borderBottom: '1px solid #718096', 
              paddingBottom: '0.25rem', 
              marginBottom: '0.5rem' 
            }}>
              Education
            </h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <strong style={{ color: '#1a202c' }}>{edu.school}</strong>
                <div>{edu.degree}{edu.specialization && ` in ${edu.specialization}`}</div>
                <div style={{ color: '#718096', fontSize: '0.75rem' }}>Graduation: {edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
              </div>
            ))}
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section>
            <h3 style={{ 
              textTransform: 'uppercase', 
              fontSize: '0.95rem', 
              letterSpacing: '0.5px', 
              color: '#1a202c',
              borderBottom: '1px solid #718096', 
              paddingBottom: '0.25rem', 
              marginBottom: '0.5rem' 
            }}>
              Certifications
            </h3>
            {certifications.map(cert => (
              <div key={cert.id} style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <strong style={{ color: '#1a202c' }}>{cert.name}</strong>
                <div>{cert.org} ({cert.date})</div>
                {cert.link && (
                  <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', fontSize: '0.75rem', textDecoration: 'underline' }}>
                    Verify Certificate
                  </a>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
