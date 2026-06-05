import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const ModernTechTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{ 
      fontFamily: '"Outfit", "Inter", sans-serif', 
      color: '#1e293b', 
      lineHeight: 1.6,
      fontSize: '0.9rem'
    }}>
      {/* Dev Header */}
      <header style={{ 
        borderBottom: '2px solid #2563eb', 
        paddingBottom: '1.25rem', 
        marginBottom: '1.25rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.4rem', 
          fontWeight: 800, 
          color: '#0f172a', 
          margin: '0 0 0.25rem 0',
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }}>
          {personal.firstName} <span style={{ color: '#2563eb' }}>{personal.lastName}</span>
        </h1>
        
        {personal.title && (
          <div style={{ 
            fontFamily: '"Fira Code", "Courier New", monospace', 
            fontSize: '1.05rem', 
            color: '#2563eb', 
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            &lt; {personal.title} /&gt;
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '1.25rem', 
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '0.75rem'
        }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={14} color="#334155" /> 
              <strong style={{ color: '#334155' }}>{personal.location}</strong>
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Mail size={14} color="#334155" /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Phone size={14} color="#334155" /> 
              <strong style={{ color: '#334155' }}>{personal.phone}</strong>
            </span>
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '1.5rem', 
          fontFamily: '"Fira Code", "Courier New", monospace',
          fontSize: '0.8rem'
        }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Github size={14} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <LinkIcon size={14} /> Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section style={{ marginBottom: '1.25rem' }}>
          <p style={{ margin: 0, color: '#334155', fontStyle: 'italic', fontSize: '0.9rem' }}>
            {personal.summary}
          </p>
        </section>
      )}

      {/* Side-by-Side Skills and Certifications */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
        {/* Left column: Skills */}
        <div>
          <h3 style={{ 
            fontSize: '0.95rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            color: '#0f172a',
            borderBottom: '1px solid #e2e8f0', 
            paddingBottom: '0.2rem',
            marginBottom: '0.5rem',
            fontFamily: '"Fira Code", "Courier New", monospace'
          }}>
            const skills = [
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {skills.map((skill, idx) => (
              <span key={idx} style={{ 
                background: '#eff6ff', 
                color: '#1e40af', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid #bfdbfe',
                fontFamily: '"Fira Code", "Courier New", monospace'
              }}>
                "{skill}"{idx < skills.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
          <div style={{ fontFamily: '"Fira Code", "Courier New", monospace', fontSize: '0.95rem', color: '#0f172a', marginTop: '0.2rem' }}>];</div>
        </div>

        {/* Right column: Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h3 style={{ 
              fontSize: '0.95rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              color: '#0f172a',
              borderBottom: '1px solid #e2e8f0', 
              paddingBottom: '0.2rem',
              marginBottom: '0.5rem',
              fontFamily: '"Fira Code", "Courier New", monospace'
            }}>
              Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem' }}>
              {certifications.map(cert => (
                <div key={cert.id} style={{ lineHeight: 1.3 }}>
                  <strong style={{ color: '#0f172a' }}>{cert.name}</strong>
                  <div style={{ color: '#64748b' }}>{cert.org} ({cert.date})</div>
                  {cert.link && (
                    <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                      verify_credential()
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            color: '#0f172a', 
            borderBottom: '1px solid #e2e8f0', 
            paddingBottom: '0.2rem', 
            marginBottom: '0.75rem',
            fontFamily: '"Fira Code", "Courier New", monospace'
          }}>
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 600, color: '#0f172a' }}>
                  <span>{exp.title} <span style={{ color: '#2563eb', fontWeight: 400 }}>@ {exp.company}</span></span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.3rem' }}>{exp.location}</div>}
                {exp.description && (
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '1.2rem', 
                    fontSize: '0.85rem', 
                    color: '#334155',
                    listStyleType: 'square'
                  }}>
                    {exp.description.split('\n').map((bullet, idx) => (
                      <li key={idx} style={{ marginBottom: '0.2rem' }}>{bullet.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            color: '#0f172a', 
            borderBottom: '1px solid #e2e8f0', 
            paddingBottom: '0.2rem', 
            marginBottom: '0.75rem',
            fontFamily: '"Fira Code", "Courier New", monospace'
          }}>
            Projects
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ 
                background: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>
                    <span>{proj.title}</span>
                  </div>
                  {proj.technologies && (
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: '#2563eb', 
                      fontFamily: '"Fira Code", "Courier New", monospace',
                      margin: '0.2rem 0'
                    }}>
                      [{proj.technologies}]
                    </div>
                  )}
                  {proj.description && (
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#475569', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                      {proj.description}
                    </p>
                  )}
                </div>
                {proj.link && (
                  <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '0.75rem', marginTop: '0.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.1rem' }}>
                    Code/Demo &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            color: '#0f172a', 
            borderBottom: '1px solid #e2e8f0', 
            paddingBottom: '0.2rem', 
            marginBottom: '0.75rem',
            fontFamily: '"Fira Code", "Courier New", monospace'
          }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>{edu.school}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                    {edu.degree}{edu.specialization && `, ${edu.specialization}`}{edu.gpa && ` (GPA: ${edu.gpa})`}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {edu.startYear && `${edu.startYear} - `}{edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTechTemplate;
