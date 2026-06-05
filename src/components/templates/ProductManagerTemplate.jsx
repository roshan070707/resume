import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const ProductManagerTemplate = ({ data }) => {
  const { personal, experience, education, projects, skills } = data;

  return (
    <div style={{
      fontFamily: '"Inter", sans-serif',
      color: '#1e293b',
      lineHeight: 1.6,
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#fff',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '20px', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && (
          <div style={{ fontSize: '18px', color: '#64748b', fontWeight: '500', marginBottom: '15px' }}>
            {personal.title}
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#475569', marginBottom: '10px' }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#475569', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#475569' }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Github size={14} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LinkIcon size={14} /> Portfolio
            </a>
          )}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: '25px', fontSize: '14px' }}>
          {personal.summary}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Professional Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{exp.position}</span>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#334155', fontWeight: '500', marginBottom: '8px' }}>
                {exp.company} {exp.location && `| ${exp.location}`}
              </div>
              <div 
                style={{ fontSize: '13.5px', paddingLeft: '15px' }}
                dangerouslySetInnerHTML={{ __html: exp.description || '' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Products & Initiatives</h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>{proj.name}</span>
              </div>
              <div 
                style={{ fontSize: '13.5px', paddingLeft: '15px' }}
                dangerouslySetInnerHTML={{ __html: proj.description || '' }}
              />
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>{edu.school}</div>
                <div style={{ fontSize: '13px', color: '#475569' }}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{edu.startDate} - {edu.endDate || 'Present'}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Competencies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map(s => (
                <span key={s.id} style={{ background: '#f1f5f9', color: '#334155', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagerTemplate;
