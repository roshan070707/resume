import React from 'react';
import { formatUrl } from '../../utils/formatUrl';
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { Github, Linkedin } from '../icons';

const StartupFounderTemplate = ({ data }) => {
  const { personal, experience, education, projects, skills } = data;

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      color: '#1f2937',
      lineHeight: 1.5,
    }}>
      <header style={{
        borderBottom: '4px solid #111',
        paddingBottom: '25px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 900,
          letterSpacing: '-1px',
          margin: '0 0 5px 0',
          textTransform: 'uppercase'
        }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && (
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            margin: '0 0 15px 0',
            color: '#4b5563'
          }}>
            {personal.title}
          </h2>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#374151', marginBottom: '10px', fontWeight: 500 }}>
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} /> {personal.location}
            </span>
          )}
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} /> 
              <a href={`mailto:${personal.email}`} style={{ color: '#374151', textDecoration: 'none' }}>
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

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#374151', fontWeight: 500 }}>
          {personal.linkedin && (
            <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Github size={14} /> GitHub
            </a>
          )}
          {personal.portfolio && (
            <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LinkIcon size={14} /> Portfolio
            </a>
          )}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: '25px' }}>
          <p style={{
            margin: 0,
            fontSize: '13px',
            fontWeight: 500,
            lineHeight: 1.6,
            borderLeft: '4px solid #111',
            paddingLeft: '15px'
          }}>
            {personal.summary}
          </p>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div>
          {experience?.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>Experience</h3>
              
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{exp.title}</h4>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280' }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', color: '#4b5563' }}>
                    {exp.description}
                  </div>
                </div>
              ))}
            </section>
          )}

          {projects?.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>Key Initiatives</h3>
              
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{proj.title}</h4>
                    {proj.link && <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb' }}>{proj.link}</span>}
                  </div>
                  <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', color: '#4b5563' }}>
                    {proj.description}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {skills?.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>Core Competencies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill, idx) => (
                  <span key={idx} style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    background: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: '#374151'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education?.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>Education</h3>
              
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 3px 0', fontSize: '13px', fontWeight: 700 }}>{edu.degree} in {edu.specialization}</h4>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{edu.school}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{edu.year}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupFounderTemplate;
