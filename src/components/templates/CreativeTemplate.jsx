import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const CreativeTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;
  
  // Theme colors
  const primary = '#ec4899'; // Pink
  const dark = '#1f2937';
  const light = '#f9fafb';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', minHeight: '100%', fontFamily: '"Outfit", sans-serif', color: dark }}>
      {/* Left Sidebar */}
      <aside style={{ backgroundColor: dark, color: light, padding: '2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0 0 0.5rem 0', lineHeight: 1.1, color: primary }}>
            {personal.firstName}<br/>{personal.lastName}
          </h1>
          {personal.title && <h2 style={{ fontSize: '1.1rem', fontWeight: 300, color: '#9ca3af', margin: 0 }}>{personal.title}</h2>}
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', color: primary, marginBottom: '1rem', borderBottom: `1px solid ${primary}`, paddingBottom: '0.5rem' }}>Contact</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {personal.location && <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={15} color={primary} /> <span>{personal.location}</span></li>}
            {personal.email && <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={15} color={primary} /> <a href={`mailto:${personal.email}`} style={{color: light, textDecoration: 'none'}}>{personal.email}</a></li>}
            {personal.phone && <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={15} color={primary} /> <span>{personal.phone}</span></li>}
          </ul>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            {personal.linkedin && <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{color: light, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Linkedin size={15} color={primary} /> LinkedIn</a>}
            {personal.github && <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{color: light, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Github size={15} color={primary} /> GitHub</a>}
            {personal.portfolio && <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{color: light, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><LinkIcon size={15} color={primary} /> Portfolio</a>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', color: primary, marginBottom: '1rem', borderBottom: `1px solid ${primary}`, paddingBottom: '0.5rem' }}>Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((skill, index) => (
                <span key={index} style={{ background: 'rgba(236, 72, 153, 0.2)', color: light, padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ padding: '2rem 3rem', backgroundColor: '#fff' }}>
        {personal.summary && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', color: dark, marginBottom: '1rem' }}>
              <span style={{ width: '30px', height: '3px', background: primary, display: 'inline-block' }}></span> Profile
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563' }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', color: dark, marginBottom: '1.5rem' }}>
              <span style={{ width: '30px', height: '3px', background: primary, display: 'inline-block' }}></span> Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: `2px solid ${primary}` }}>
                  <div style={{ position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: primary }}></div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{exp.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    <span style={{ fontStyle: 'italic', color: primary }}>{exp.company}</span>
                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                  </div>
                  {exp.description && <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: 0, whiteSpace: 'pre-line' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', color: dark, marginBottom: '1.5rem' }}>
              <span style={{ width: '30px', height: '3px', background: primary, display: 'inline-block' }}></span> Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: `2px solid ${primary}` }}>
                  <div style={{ position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: primary }}></div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span>{proj.title}</span>
                    {proj.link && <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: primary, textDecoration: 'none' }}>Live Demo</a>}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    {proj.technologies && <span style={{ fontStyle: 'italic' }}>Built with: {proj.technologies}</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: 0, whiteSpace: 'pre-line' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', color: dark, marginBottom: '1.5rem' }}>
              <span style={{ width: '30px', height: '3px', background: primary, display: 'inline-block' }}></span> Education
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{edu.degree}</h4>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>{edu.school}</div>
                  <div style={{ fontSize: '0.85rem', color: primary, fontWeight: 600 }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', color: dark, marginBottom: '1.5rem' }}>
              <span style={{ width: '30px', height: '3px', background: primary, display: 'inline-block' }}></span> Certifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {certifications.map(cert => (
                <div key={cert.id}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span>{cert.name}</span>
                    {cert.link && <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: primary, textDecoration: 'none' }}>Verify</a>}
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>{cert.org}</div>
                  <div style={{ fontSize: '0.85rem', color: primary, fontWeight: 600 }}>{cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CreativeTemplate;
