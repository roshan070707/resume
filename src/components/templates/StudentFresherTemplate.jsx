import React from 'react';
import { formatUrl } from '../../utils/formatUrl';

const StudentFresherTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', color: '#1f2937', lineHeight: 1.5, fontSize: '0.9rem' }}>
      {/* Student/Fresher Header */}
      <header style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #4b5563', paddingBottom: '0.75rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && <h2 style={{ fontSize: '1.1rem', color: '#4b5563', margin: '0 0 0.75rem 0', fontWeight: 500 }}>{personal.title}</h2>}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem 1rem', fontSize: '0.8rem', color: '#4b5563' }}>
          {personal.email && <span>Email: <strong>{personal.email}</strong></span>}
          {personal.phone && <span>Phone: <strong>{personal.phone}</strong></span>}
          {personal.location && <span>Location: <strong>{personal.location}</strong></span>}
        </div>
        
        {/* Clickable Social Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
          {personal.linkedin && <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>LinkedIn</a>}
          {personal.github && <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>GitHub</a>}
          {personal.portfolio && <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>Portfolio</a>}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Objective
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151' }}>{personal.summary}</p>
        </section>
      )}

      {/* Education First */}
      {education.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {education.map(edu => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#111827', fontSize: '0.85rem' }}>
                  <span>{edu.school}</span>
                  <span style={{ fontWeight: 'normal', color: '#6b7280' }}>{edu.startYear && `${edu.startYear} - `}{edu.year}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#374151', display: 'flex', justifyContent: 'space-between', marginTop: '0.1rem' }}>
                  <span>{edu.degree} {edu.specialization && `in ${edu.specialization}`}</span>
                  {edu.gpa && <span style={{ fontWeight: 500 }}>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Second */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Academic & Personal Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#111827' }}>
                    {proj.title} {proj.technologies && <span style={{ fontWeight: 'normal', color: '#4b5563', fontSize: '0.75rem' }}>({proj.technologies})</span>}
                  </strong>
                  {proj.link && (
                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '0.75rem', textDecoration: 'underline' }}>
                      [Link]
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Matrix */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Skills Matrix
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
            gap: '0.35rem', 
            fontSize: '0.85rem' 
          }}>
            {skills.map((skill, idx) => (
              <div key={idx} style={{ 
                background: '#f3f4f6', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                textAlign: 'center',
                color: '#374151',
                border: '1px solid #e5e7eb'
              }}>
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Last */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Internship & Work Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#111827', fontSize: '0.85rem' }}>
                  <span>{exp.title} at {exp.company}</span>
                  <span style={{ fontWeight: 'normal', color: '#6b7280' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <div style={{ fontSize: '0.75rem', color: '#6b7280', fontStyle: 'italic', marginBottom: '0.2rem' }}>{exp.location}</div>}
                {exp.description && <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', whiteSpace: 'pre-wrap' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Certifications & Training
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#374151' }}>
            {certifications.map(cert => (
              <li key={cert.id} style={{ marginBottom: '0.25rem' }}>
                <strong>{cert.name}</strong> - {cert.org} ({cert.date})
                {cert.link && <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', marginLeft: '6px' }}>[Verify]</a>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default StudentFresherTemplate;
