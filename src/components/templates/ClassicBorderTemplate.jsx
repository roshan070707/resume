import React from 'react';
import { formatUrl } from '../../utils/formatUrl';

const ClassicBorderTemplate = ({ data }) => {
  const { personal, experience, education, projects, skills, certifications } = data;

  // Helper function to format bullet points dynamically
  const renderDescription = (descriptionText) => {
    if (!descriptionText) return null;
    
    // Split by newlines, handling both standard text and simple HTML lists
    const cleanText = descriptionText
      .replace(/<[^>]*>/g, '') // Strip existing HTML tags to avoid nesting issues
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return (
      <ul style={{ 
        margin: '6px 0 0 0', 
        paddingLeft: '20px', 
        listStyleType: 'disc',
        fontSize: '12.5px',
        color: '#222',
        lineHeight: '1.5'
      }}>
        {cleanText.map((line, idx) => {
          // Remove bullet markers if present
          let cleanLine = line.replace(/^[•\-\*\s]+/, '').trim();
          
          // Check for colon in the first 45 characters to bold the prefix phrase
          const colonIdx = cleanLine.indexOf(':');
          if (colonIdx > 0 && colonIdx < 45) {
            const prefix = cleanLine.substring(0, colonIdx + 1);
            const rest = cleanLine.substring(colonIdx + 1);
            return (
              <li key={idx} style={{ marginBottom: '5px' }}>
                <strong>{prefix}</strong>{rest}
              </li>
            );
          }
          
          return (
            <li key={idx} style={{ marginBottom: '5px' }}>
              {cleanLine}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div style={{
      fontFamily: '"Times New Roman", Times, serif',
      color: '#111',
      lineHeight: '1.4',
      padding: '25px',
      margin: '0 auto',
      background: '#fff',
      border: '1.5px solid #111',
      minHeight: 'calc(297mm - 40mm - 3px)', // accounts for LivePreview container padding
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* Header Container */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0', 
          textTransform: 'capitalize',
          letterSpacing: '0.5px',
          color: '#000'
        }}>
          {personal.firstName} {personal.lastName}
        </h1>
        
        {personal.title && (
          <h2 style={{ 
            fontSize: '13.5px', 
            margin: '0 0 10px 0', 
            fontWeight: '600', 
            textTransform: 'uppercase',
            color: '#444',
            letterSpacing: '0.5px'
          }}>
            {personal.title}
          </h2>
        )}
        
        {/* Contact Details Grid */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          columnGap: '10px', 
          rowGap: '4px',
          fontSize: '12px', 
          color: '#333',
          marginBottom: '4px',
          fontWeight: '500'
        }}>
          {personal.email && (
            <span>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${personal.email}`} style={{ color: '#111', textDecoration: 'none' }}>
                {personal.email}
              </a>
            </span>
          )}
          
          {(personal.email && personal.phone) && <span>|</span>}
          
          {personal.phone && (
            <span>
              <strong>Mobile:</strong> {personal.phone}
            </span>
          )}
          
          {((personal.email || personal.phone) && personal.location) && <span>|</span>}
          
          {personal.location && (
            <span>
              <strong>Location:</strong> {personal.location}
            </span>
          )}
        </div>

        {/* Links Grid */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          columnGap: '10px', 
          rowGap: '4px',
          fontSize: '12px', 
          color: '#333',
          fontWeight: '500',
          marginTop: '2px'
        }}>
          {personal.linkedin && (
            <span>
              <strong>LinkedIn:</strong>{' '}
              <a href={formatUrl(personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#111', textDecoration: 'underline' }}>
                {personal.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i, '')}
              </a>
            </span>
          )}
          
          {(personal.linkedin && personal.github) && <span>|</span>}
          
          {personal.github && (
            <span>
              <strong>GitHub:</strong>{' '}
              <a href={formatUrl(personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: '#111', textDecoration: 'underline' }}>
                {personal.github.replace(/^(https?:\/\/)?(www\.)?github\.com\//i, '')}
              </a>
            </span>
          )}
          
          {((personal.linkedin || personal.github) && personal.portfolio) && <span>|</span>}
          
          {personal.portfolio && (
            <span>
              <strong>Portfolio:</strong>{' '}
              <a href={formatUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: '#111', textDecoration: 'underline' }}>
                {personal.portfolio.replace(/^(https?:\/\/)?(www\.)?/i, '')}
              </a>
            </span>
          )}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #111', margin: '0 0 4px 0' }} />

      {/* Objective Section */}
      {personal.summary && (
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            margin: '0 0 6px 0', 
            textTransform: 'capitalize',
            color: '#000'
          }}>
            Objective
          </h3>
          <p style={{ 
            fontSize: '12.5px', 
            margin: 0, 
            textAlign: 'justify', 
            color: '#222',
            lineHeight: '1.5'
          }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* Work Experience Section */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #111', margin: '0 0 10px 0' }} />
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            margin: '0 0 8px 0', 
            textTransform: 'capitalize',
            color: '#000'
          }}>
            Work Experience
          </h3>
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '13px', fontWeight: 'bold' }}>
                <span style={{ color: '#000' }}>{exp.title}</span>
                <span style={{ color: '#000' }}>{exp.startDate} – {exp.endDate || (exp.current ? 'Present' : '')}</span>
              </div>
              <div style={{ fontSize: '12.5px', fontStyle: 'italic', color: '#333', marginBottom: '4px' }}>
                {exp.company}{exp.location && `, ${exp.location}`}
              </div>
              {renderDescription(exp.description)}
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #111', margin: '0 0 10px 0' }} />
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            margin: '0 0 8px 0', 
            textTransform: 'capitalize',
            color: '#000'
          }}>
            Projects
          </h3>
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '13px', fontWeight: 'bold' }}>
                <span style={{ color: '#000' }}>
                  {proj.title} {proj.technologies && <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#555' }}>({proj.technologies})</span>}
                </span>
                {proj.link && (
                  <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#111', textDecoration: 'underline', fontWeight: 'normal' }}>
                    Demo Link
                  </a>
                )}
              </div>
              {renderDescription(proj.description)}
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #111', margin: '0 0 10px 0' }} />
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            margin: '0 0 8px 0', 
            textTransform: 'capitalize',
            color: '#000'
          }}>
            Education
          </h3>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '13px', fontWeight: 'bold' }}>
                <span style={{ color: '#000' }}>{edu.school}</span>
                <span style={{ color: '#000' }}>{edu.startYear ? `${edu.startYear} – ` : ''}{edu.year}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#222' }}>
                <span>{edu.degree}{edu.specialization && ` in ${edu.specialization}`}</span>
                {edu.gpa && <span style={{ fontWeight: '500' }}>GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #111', margin: '0 0 10px 0' }} />
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            margin: '0 0 8px 0', 
            textTransform: 'capitalize',
            color: '#000'
          }}>
            Certifications
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc', fontSize: '12.5px', color: '#222' }}>
            {certifications.map((cert, idx) => (
              <li key={cert.id || idx} style={{ marginBottom: '4px' }}>
                <strong>{cert.name}</strong> – {cert.org} ({cert.date})
                {cert.link && (
                  <span>{' '}(<a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#111', textDecoration: 'underline' }}>Credential</a>)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '4px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #111', margin: '0 0 10px 0' }} />
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            margin: '0 0 6px 0', 
            textTransform: 'capitalize',
            color: '#000'
          }}>
            Key Skills
          </h3>
          <div style={{ 
            fontSize: '12.5px', 
            color: '#222', 
            lineHeight: '1.5',
            textAlign: 'justify' 
          }}>
            {skills.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicBorderTemplate;
