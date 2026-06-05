import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const StanfordTemplate = ({ data }) => {
  const { personal, experience, education, projects, skills } = data;

  return (
    <div style={{
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      color: '#333',
      lineHeight: 1.5,
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#fff',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', margin: '0 0 5px 0', color: '#000', textAlign: 'center' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && <h2 style={{ fontSize: '16px', margin: '0 0 10px 0', fontWeight: 'normal', color: '#333', textAlign: 'center' }}>{personal.title}</h2>}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '13px', color: '#555', marginBottom: '8px' }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={13} /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#555', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={13} /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '13px', color: '#555' }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Linkedin size={13} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Github size={13} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LinkIcon size={13} /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#000', borderBottom: '2px solid #333', paddingBottom: '3px', marginBottom: '10px' }}>EDUCATION</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>{edu.school}</span>
                <span style={{ fontSize: '13px' }}>{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              <div style={{ fontSize: '13px' }}>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </div>
              {edu.gpa && <div style={{ fontSize: '13px' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#000', borderBottom: '2px solid #333', paddingBottom: '3px', marginBottom: '10px' }}>EXPERIENCE</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>{exp.company}</span>
                <span style={{ fontSize: '13px' }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <div style={{ fontSize: '13px', fontStyle: 'italic', marginBottom: '4px' }}>
                {exp.position}
              </div>
              <div 
                style={{ fontSize: '13px', paddingLeft: '15px' }}
                dangerouslySetInnerHTML={{ __html: exp.description || '' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#000', borderBottom: '2px solid #333', paddingBottom: '3px', marginBottom: '10px' }}>PROJECTS</h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>{proj.name}</span>
                <span style={{ fontSize: '13px' }}>{proj.date}</span>
              </div>
              <div 
                style={{ fontSize: '13px', marginTop: '4px', paddingLeft: '15px' }}
                dangerouslySetInnerHTML={{ __html: proj.description || '' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#000', borderBottom: '2px solid #333', paddingBottom: '3px', marginBottom: '10px' }}>SKILLS</h2>
          <div style={{ fontSize: '13px' }}>
            <span style={{ fontWeight: 'bold' }}>Technical Skills:</span> {skills.map(s => s.name).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default StanfordTemplate;
