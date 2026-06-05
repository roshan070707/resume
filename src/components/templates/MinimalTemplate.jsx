import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const MinimalTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#333', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 300, margin: '0 0 0.25rem 0', letterSpacing: '-0.03em', color: '#111' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && <h2 style={{ fontSize: '1.1rem', margin: '0 0 1.25rem 0', fontWeight: 400, color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{personal.title}</h2>}
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', color: '#555', marginBottom: '0.75rem' }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={13} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={13} /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#555', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={13} /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', color: '#555' }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Linkedin size={13} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Github size={13} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <LinkIcon size={13} /> Portfolio
            </a>
          )}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={{ margin: 0, fontSize: '1rem', color: '#444' }}>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1.5rem' }}>
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', marginBottom: '0.2rem' }}>{exp.title}</div>
                  <div style={{ fontSize: '0.95rem', color: '#555', marginBottom: '0.5rem' }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: 0, fontSize: '0.95rem', color: '#444', whiteSpace: 'pre-wrap' }}>{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1.5rem' }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{edu.year}</div>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111' }}>{edu.school}</div>
                  <div style={{ fontSize: '0.95rem', color: '#555' }}>{edu.degree} {edu.specialization && `— ${edu.specialization}`}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1.5rem' }}>
            Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{proj.technologies}</div>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', marginBottom: '0.2rem' }}>
                    {proj.title}
                    {proj.link && <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" style={{color:'#666', textDecoration:'none', marginLeft:'10px', fontSize:'0.85rem'}}>[Link]</a>}
                  </div>
                  {proj.description && <p style={{ margin: 0, fontSize: '0.95rem', color: '#444', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1.5rem' }}>
            Certifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {certifications.map(cert => (
              <div key={cert.id} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{cert.date}</div>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', marginBottom: '0.2rem' }}>{cert.name}</div>
                  <div style={{ fontSize: '0.95rem', color: '#444' }}>{cert.org} {cert.link && <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{color:'#666', textDecoration:'none', marginLeft:'10px'}}>[Link]</a>}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1.5rem' }}>
            Skills
          </h3>
          <div style={{ fontSize: '0.95rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {skills.map((skill, index) => (
              <span key={index} style={{ color: '#333' }}>{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
