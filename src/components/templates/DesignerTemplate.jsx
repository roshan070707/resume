import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const DesignerTemplate = ({ data }) => {
  const { personal, experience, education, projects, skills } = data;

  return (
    <div style={{
      fontFamily: '"Outfit", sans-serif',
      color: '#2d3748',
      lineHeight: 1.6,
      padding: '50px',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#fff',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '0 0 5px 0', letterSpacing: '-1px', color: '#1a202c' }}>
          {personal.firstName} <span style={{ color: '#ec4899' }}>{personal.lastName}</span>
        </h1>
        {personal.title && (
          <div style={{ fontSize: '18px', fontWeight: '500', color: '#718096', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>
            {personal.title}
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '14px', color: '#4a5568', marginBottom: '10px', fontWeight: 500 }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} color="#ec4899" /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={15} color="#ec4899" /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#4a5568', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={15} color="#ec4899" /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '14px', color: '#4a5568', fontWeight: 500 }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#4a5568', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Linkedin size={15} color="#ec4899" /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#4a5568', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Github size={15} color="#ec4899" /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#4a5568', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LinkIcon size={15} color="#ec4899" /> Portfolio
            </a>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
        
        {/* Left Column */}
        <div>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1a202c', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Expertise</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, idx) => (
                  <li key={idx} style={{ fontSize: '14px', color: '#4a5568' }}>{typeof s === 'string' ? s : (s?.name || s?.title || '')}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1a202c', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#2d3748' }}>{edu.degree}</div>
                  <div style={{ fontSize: '13px', color: '#718096' }}>{edu.school}</div>
                  <div style={{ fontSize: '12px', color: '#a0aec0', marginTop: '2px' }}>{edu.startDate} - {edu.endDate || 'Present'}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {personal.summary && (
            <div style={{ marginBottom: '35px', fontSize: '15px', color: '#4a5568', fontStyle: 'italic', paddingLeft: '15px', borderLeft: '3px solid #ec4899' }}>
              {personal.summary}
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1a202c', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '25px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '800', fontSize: '16px', color: '#1a202c' }}>{exp.title || exp.position}</span>
                    <span style={{ fontSize: '13px', color: '#ec4899', fontWeight: '600' }}>{exp.startDate} - {exp.endDate || exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#718096', fontWeight: '500', marginBottom: '10px' }}>
                    {exp.company}
                  </div>
                  <div 
                    style={{ fontSize: '14px', color: '#4a5568', paddingLeft: '15px' }}
                    dangerouslySetInnerHTML={{ __html: exp.description || '' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignerTemplate;
