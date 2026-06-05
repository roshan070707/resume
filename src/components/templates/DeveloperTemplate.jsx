import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const DeveloperTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{ fontFamily: '"Fira Code", "Courier New", monospace', color: '#e2e8f0', backgroundColor: '#0f172a', padding: '2rem', minHeight: '100%' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', margin: '0 0 0.25rem 0', color: '#e2e8f0', fontWeight: 'bold' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && (
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', color: '#38bdf8', fontWeight: 'normal' }}>
            {personal.title}
          </h2>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} color="#f472b6" /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={14} color="#f472b6" /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={14} color="#f472b6" /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Linkedin size={14} color="#10b981" /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Github size={14} color="#10b981" /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <LinkIcon size={14} color="#10b981" /> Portfolio
            </a>
          )}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>// summary</div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>{personal.summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>// skills</div>
          <div style={{ fontSize: '0.9rem', color: '#fcd34d' }}>
            [{skills.map(s => `'${s}'`).join(', ')}]
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#64748b', marginBottom: '1rem' }}>// experience</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ paddingLeft: '1rem', borderLeft: '2px solid #334155' }}>
                <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>{exp.title} <span style={{color: '#cbd5e1'}}>@</span> {exp.company}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{exp.startDate} - {exp.current ? 'present' : exp.endDate}</div>
                {exp.description && <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', whiteSpace: 'pre-wrap' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#64748b', marginBottom: '1rem' }}>// projects</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ background: '#1e293b', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{proj.title}()</span>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                    {proj.github && <a href={formatUrl(proj.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>github</a>}
                    {proj.link && <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>demo</a>}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#f472b6', marginBottom: '0.5rem' }}>{proj.technologies}</div>
                {proj.description && <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#64748b', marginBottom: '1rem' }}>// education</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#e2e8f0' }}>{edu.school}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}> — {edu.degree}</span>
                </div>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#64748b', marginBottom: '1rem' }}>// certifications</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {certifications.map(cert => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#38bdf8' }}>{cert.name}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}> — {cert.org}</span>
                  {cert.link && <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#f472b6', textDecoration: 'underline', marginLeft: '8px', fontSize: '0.8rem' }}>link</a>}
                </div>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DeveloperTemplate;
