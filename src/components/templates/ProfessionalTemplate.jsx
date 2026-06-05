import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const { personal, experience, education, projects, certifications, skills } = data;
  const accentColor = '#1e3a8a'; // Dark blue

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333', lineHeight: 1.6 }}>
      <header style={{ borderBottom: `4px solid ${accentColor}`, paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: accentColor }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && <h2 style={{ fontSize: '1.3rem', margin: '0 0 1rem 0', color: '#555' }}>{personal.title}</h2>}
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: '#555' }}>
          {personal.location && <span>📍 {personal.location}</span>}
          {personal.email && <span>✉️ {personal.email}</span>}
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.linkedin && <span>🔗 <a href={personal.linkedin} style={{ color: '#555', textDecoration: 'none' }}>LinkedIn</a></span>}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: accentColor, textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Professional Summary
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: accentColor, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 'bold' }}>
            Work Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1.1rem', color: '#000' }}>{exp.title}</strong>
                  <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'bold' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ color: accentColor, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                {exp.description && <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          {education.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: accentColor, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 'bold' }}>
                Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <strong style={{ fontSize: '1.05rem', color: '#000' }}>{edu.school}</strong>
                    <div style={{ fontSize: '0.95rem', color: '#444' }}>{edu.degree} {edu.specialization && `in ${edu.specialization}`}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {edu.startYear && `${edu.startYear} - `}{edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: accentColor, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 'bold' }}>
                Certifications
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                {certifications.map(cert => (
                  <li key={cert.id} style={{ marginBottom: '0.5rem' }}>
                    <strong>{cert.name}</strong> <br/>
                    <span style={{ color: '#666', fontSize: '0.85rem' }}>{cert.org} ({cert.date})</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div>
          {projects.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: accentColor, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 'bold' }}>
                Projects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {projects.map(proj => (
                  <div key={proj.id}>
                    <strong style={{ fontSize: '1.05rem', color: '#000' }}>{proj.title}</strong>
                    <div style={{ fontSize: '0.85rem', color: accentColor, marginBottom: '0.25rem' }}>
                      {proj.technologies && `Built with: ${proj.technologies}`}
                    </div>
                    {proj.description && <p style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h3 style={{ fontSize: '1.2rem', color: accentColor, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 'bold' }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((skill, index) => (
                  <span key={index} style={{ 
                    background: '#f1f5f9', 
                    color: '#334155', 
                    padding: '0.3rem 0.6rem', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
