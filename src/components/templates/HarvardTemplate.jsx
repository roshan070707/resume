import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const HarvardTemplate = ({ data }) => {
  const { personal, experience, education, projects, skills } = data;

  return (
    <div style={{
      fontFamily: '"Times New Roman", Times, serif',
      color: '#000',
      lineHeight: 1.4,
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#fff',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #000', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && <h2 style={{ fontSize: '14px', margin: '0 0 10px 0', fontWeight: 'normal', fontStyle: 'italic' }}>{personal.title}</h2>}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '12px', marginBottom: '8px' }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={12} /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#000', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={12} /> {personal.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '12px' }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Linkedin size={12} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Github size={12} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LinkIcon size={12} /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Education Section */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', margin: '0 0 5px 0' }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '12px' }}>
                <span>{edu.school}</span>
                <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontStyle: 'italic' }}>
                <span>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                <span>{edu.location}</span>
              </div>
              {edu.gpa && <div style={{ fontSize: '12px' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', margin: '0 0 5px 0' }}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '12px' }}>
                <span>{exp.company}</span>
                <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontStyle: 'italic' }}>
                <span>{exp.position}</span>
                <span>{exp.location}</span>
              </div>
              <div 
                style={{ fontSize: '12px', marginTop: '4px', paddingLeft: '15px' }}
                dangerouslySetInnerHTML={{ __html: exp.description || '' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', margin: '0 0 5px 0' }}>Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '12px' }}>
                <span>{proj.name} {proj.link && <a href={proj.link} style={{ color: '#000', textDecoration: 'none', fontWeight: 'normal' }}>| Link</a>}</span>
                <span>{proj.date}</span>
              </div>
              <div 
                style={{ fontSize: '12px', marginTop: '4px', paddingLeft: '15px' }}
                dangerouslySetInnerHTML={{ __html: proj.description || '' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', margin: '0 0 5px 0' }}>Skills</h2>
          <div style={{ fontSize: '12px' }}>
            {skills.map(s => s.name).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default HarvardTemplate;
