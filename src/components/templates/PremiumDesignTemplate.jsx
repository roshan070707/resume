import React from 'react';

const PremiumDesignTemplate = ({ data }) => {
  const { personal, experience, education, projects, skills } = data;

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      color: '#333',
      lineHeight: 1.6,
      display: 'flex',
      minHeight: '100%',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '32%',
        background: '#1e293b',
        color: '#f8fafc',
        padding: '30px 25px',
        boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#3b82f6',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 700,
            color: '#fff'
          }}>
            {personal.firstName?.[0]}{personal.lastName?.[0]}
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 800,
            margin: '0 0 5px 0',
            letterSpacing: '0.5px'
          }}>
            {personal.firstName} <br/> {personal.lastName}
          </h1>
          <div style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {personal.title}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '8px',
            marginBottom: '15px'
          }}>Contact</h3>
          <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#cbd5e1' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.portfolio && <div>{personal.portfolio}</div>}
          </div>
        </div>

        {skills?.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, idx) => (
                <span key={idx} style={{
                  fontSize: '11px',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  color: '#e2e8f0'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {education?.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px' }}>{edu.year}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>{edu.degree}</div>
                <div style={{ fontSize: '11px', color: '#cbd5e1' }}>{edu.school}</div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={{
        width: '68%',
        padding: '40px 30px',
        boxSizing: 'border-box'
      }}>
        {personal.summary && (
          <section style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px'
            }}>
              <span style={{ width: '30px', height: '2px', background: '#3b82f6' }}></span>
              Profile
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.7 }}>
              {personal.summary}
            </p>
          </section>
        )}

        {experience?.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <span style={{ width: '30px', height: '2px', background: '#3b82f6' }}></span>
              Experience
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{exp.title}</h4>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#3b82f6', background: '#eff6ff', padding: '2px 8px', borderRadius: '12px' }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '10px' }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', color: '#475569', paddingLeft: '15px', borderLeft: '2px solid #e2e8f0' }}>
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects?.length > 0 && (
          <section>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <span style={{ width: '30px', height: '2px', background: '#3b82f6' }}></span>
              Projects
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{proj.title}</h4>
                  {proj.link && <div style={{ fontSize: '11px', color: '#3b82f6', marginBottom: '8px' }}>{proj.link}</div>}
                  <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {proj.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PremiumDesignTemplate;
