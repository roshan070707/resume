import React, { useState } from 'react';
import { ArrowUp, ArrowDown, X, Plus, Wand2, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

import styles from './Forms.module.css';

const validateLinkedIn = (url) => {
  if (!url) return null;
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+\/?$/i;
  return regex.test(url);
};

const validateGitHub = (url) => {
  if (!url) return null;
  const regex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9\-._~%]+\/?$/i;
  return regex.test(url);
};

const validatePortfolio = (url) => {
  if (!url) return null;
  const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
  return regex.test(url);
};

export const PersonalInfoForm = ({ personal, updatePersonal }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <div className={styles.inputGroup}>
        <label>First Name</label>
        <input type="text" value={personal.firstName || ''} onChange={(e) => updatePersonal('firstName', e.target.value)} placeholder="e.g. Jane" />
      </div>
      <div className={styles.inputGroup}>
        <label>Last Name</label>
        <input type="text" value={personal.lastName || ''} onChange={(e) => updatePersonal('lastName', e.target.value)} placeholder="e.g. Doe" />
      </div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <div className={styles.inputGroup}>
        <label>Professional Title</label>
        <input type="text" value={personal.title || ''} onChange={(e) => updatePersonal('title', e.target.value)} placeholder="e.g. Senior Software Engineer" />
      </div>
      <div className={styles.inputGroup}>
        <label>Location</label>
        <input type="text" value={personal.location || ''} onChange={(e) => updatePersonal('location', e.target.value)} placeholder="e.g. San Francisco, CA" />
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.inputGroup}>
        <label>Email <span style={{color: '#ef4444'}}>*</span></label>
        <input type="email" required value={personal.email || ''} onChange={(e) => updatePersonal('email', e.target.value)} placeholder="jane@example.com" />
      </div>
      <div className={styles.inputGroup}>
        <label>Phone</label>
        <input type="tel" value={personal.phone || ''} onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+1 (555) 123-4567" />
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.inputGroup}>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          LinkedIn URL
          {validateLinkedIn(personal.linkedin) !== null && (
            validateLinkedIn(personal.linkedin) ? (
              <span className={styles.validationSuccess} style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', textTransform: 'none', color: '#10b981' }}>
                <CheckCircle2 size={12} /> Valid Link
              </span>
            ) : (
              <span className={styles.validationError} style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', textTransform: 'none', color: '#ef4444' }}>
                <AlertTriangle size={12} /> Invalid URL
              </span>
            )
          )}
        </label>
        <input type="url" value={personal.linkedin || ''} onChange={(e) => updatePersonal('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
      </div>
      <div className={styles.inputGroup}>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          GitHub URL
          {validateGitHub(personal.github) !== null && (
            validateGitHub(personal.github) ? (
              <span className={styles.validationSuccess} style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', textTransform: 'none', color: '#10b981' }}>
                <CheckCircle2 size={12} /> Valid Link
              </span>
            ) : (
              <span className={styles.validationError} style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', textTransform: 'none', color: '#ef4444' }}>
                <AlertTriangle size={12} /> Invalid URL
              </span>
            )
          )}
        </label>
        <input type="url" value={personal.github || ''} onChange={(e) => updatePersonal('github', e.target.value)} placeholder="https://github.com/username" />
      </div>
    </div>

    <div className={styles.inputGroup}>
      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Portfolio / Website
        {validatePortfolio(personal.portfolio) !== null && (
          validatePortfolio(personal.portfolio) ? (
            <span className={styles.validationSuccess} style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', textTransform: 'none', color: '#10b981' }}>
              <CheckCircle2 size={12} /> Valid Link
            </span>
          ) : (
            <span className={styles.validationError} style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', textTransform: 'none', color: '#ef4444' }}>
              <AlertTriangle size={12} /> Invalid URL
            </span>
          )
        )}
      </label>
      <input type="url" value={personal.portfolio || ''} onChange={(e) => updatePersonal('portfolio', e.target.value)} placeholder="https://yourwebsite.com" />
    </div>

    <div className={styles.inputGroup}>
      <label>Professional Summary</label>
      <textarea rows="4" value={personal.summary || ''} onChange={(e) => updatePersonal('summary', e.target.value)} placeholder="Brief professional summary..."></textarea>
    </div>
  </div>
);

export const ExperienceForm = ({ experience, addListItem, updateListItem, removeListItem, moveItemUp, moveItemDown }) => {
  return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {experience.map((exp, index) => (
      <div key={exp.id} className={styles.formCard}>
        <div className={styles.formCardHeader}>
          <h4>Experience {index + 1}</h4>
          <div className={styles.cardActions}>
            <button className={styles.iconBtn} onClick={() => moveItemUp('experience', index)} disabled={index === 0}><ArrowUp size={16} /></button>
            <button className={styles.iconBtn} onClick={() => moveItemDown('experience', index)} disabled={index === experience.length - 1}><ArrowDown size={16} /></button>
            <button className={styles.removeBtn} onClick={() => removeListItem('experience', exp.id)}><X size={16} /></button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.inputGroup}>
              <label>Job Title</label>
              <input type="text" value={exp.title || ''} onChange={e => updateListItem('experience', exp.id, 'title', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Company</label>
              <input type="text" value={exp.company || ''} onChange={e => updateListItem('experience', exp.id, 'company', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Location</label>
              <input type="text" value={exp.location || ''} onChange={e => updateListItem('experience', exp.id, 'location', e.target.value)} placeholder="e.g. New York, NY" />
            </div>
            <div className={styles.inputGroup}>
              <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                Dates
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{width:'auto'}} checked={exp.current || false} onChange={e => updateListItem('experience', exp.id, 'current', e.target.checked)} />
                  Current Role
                </label>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value={exp.startDate || ''} onChange={e => updateListItem('experience', exp.id, 'startDate', e.target.value)} placeholder="Start" style={{flex: 1}} />
                {!exp.current && (
                  <input type="text" value={exp.endDate || ''} onChange={e => updateListItem('experience', exp.id, 'endDate', e.target.value)} placeholder="End" style={{flex: 1}} />
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0 }}>Description & Achievements</label>
            </div>
            <textarea rows="4" value={exp.description || ''} onChange={e => updateListItem('experience', exp.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..."></textarea>
          </div>
        </div>
      </div>
    ))}
    <button className={styles.addBtn} onClick={() => addListItem('experience', { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' })}>
      <Plus size={16} /> Add Experience
    </button>
  </div>
  );
};

export const EducationForm = ({ education, addListItem, updateListItem, removeListItem, moveItemUp, moveItemDown }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {education.map((edu, index) => (
      <div key={edu.id} className={styles.formCard}>
        <div className={styles.formCardHeader}>
          <h4>Education {index + 1}</h4>
          <div className={styles.cardActions}>
            <button className={styles.iconBtn} onClick={() => moveItemUp('education', index)} disabled={index === 0}><ArrowUp size={16} /></button>
            <button className={styles.iconBtn} onClick={() => moveItemDown('education', index)} disabled={index === education.length - 1}><ArrowDown size={16} /></button>
            <button className={styles.removeBtn} onClick={() => removeListItem('education', edu.id)}><X size={16} /></button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.inputGroup}>
              <label>Institution Name</label>
              <input type="text" value={edu.school || ''} onChange={e => updateListItem('education', edu.id, 'school', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Degree</label>
              <input type="text" value={edu.degree || ''} onChange={e => updateListItem('education', edu.id, 'degree', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Specialization / Major</label>
              <input type="text" value={edu.specialization || ''} onChange={e => updateListItem('education', edu.id, 'specialization', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>GPA / Percentage</label>
              <input type="text" value={edu.gpa || ''} onChange={e => updateListItem('education', edu.id, 'gpa', e.target.value)} placeholder="e.g. 3.8/4.0" />
            </div>
            <div className={styles.inputGroup}>
              <label>Start Year</label>
              <input type="text" value={edu.startYear || ''} onChange={e => updateListItem('education', edu.id, 'startYear', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>End Year</label>
              <input type="text" value={edu.year || ''} onChange={e => updateListItem('education', edu.id, 'year', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    ))}
    <button className={styles.addBtn} onClick={() => addListItem('education', { school: '', degree: '', specialization: '', gpa: '', startYear: '', year: '' })}>
      <Plus size={16} /> Add Education
    </button>
  </div>
);

export const ProjectsForm = ({ projects, addListItem, updateListItem, removeListItem, moveItemUp, moveItemDown }) => {
  return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {projects.map((proj, index) => (
      <div key={proj.id} className={styles.formCard}>
        <div className={styles.formCardHeader}>
          <h4>Project {index + 1}</h4>
          <div className={styles.cardActions}>
            <button className={styles.iconBtn} onClick={() => moveItemUp('projects', index)} disabled={index === 0}><ArrowUp size={16} /></button>
            <button className={styles.iconBtn} onClick={() => moveItemDown('projects', index)} disabled={index === projects.length - 1}><ArrowDown size={16} /></button>
            <button className={styles.removeBtn} onClick={() => removeListItem('projects', proj.id)}><X size={16} /></button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.inputGroup}>
              <label>Project Name</label>
              <input type="text" value={proj.title || ''} onChange={e => updateListItem('projects', proj.id, 'title', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Technologies Used</label>
              <input type="text" value={proj.technologies || ''} onChange={e => updateListItem('projects', proj.id, 'technologies', e.target.value)} placeholder="React, Node.js, etc." />
            </div>
            <div className={styles.inputGroup}>
              <label>GitHub Link</label>
              <input type="url" value={proj.github || ''} onChange={e => updateListItem('projects', proj.id, 'github', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Live Demo Link</label>
              <input type="url" value={proj.link || ''} onChange={e => updateListItem('projects', proj.id, 'link', e.target.value)} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0 }}>Description</label>
            </div>
            <textarea rows="3" value={proj.description || ''} onChange={e => updateListItem('projects', proj.id, 'description', e.target.value)}></textarea>
          </div>
        </div>
      </div>
    ))}
    <button className={styles.addBtn} onClick={() => addListItem('projects', { title: '', technologies: '', description: '', link: '', github: '' })}>
      <Plus size={16} /> Add Project
    </button>
  </div>
  );
};

export const CertificationsForm = ({ certifications, addListItem, updateListItem, removeListItem, moveItemUp, moveItemDown }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {certifications.map((cert, index) => (
      <div key={cert.id} className={styles.formCard}>
        <div className={styles.formCardHeader}>
          <h4>Certification {index + 1}</h4>
          <div className={styles.cardActions}>
            <button className={styles.iconBtn} onClick={() => moveItemUp('certifications', index)} disabled={index === 0}><ArrowUp size={16} /></button>
            <button className={styles.iconBtn} onClick={() => moveItemDown('certifications', index)} disabled={index === certifications.length - 1}><ArrowDown size={16} /></button>
            <button className={styles.removeBtn} onClick={() => removeListItem('certifications', cert.id)}><X size={16} /></button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.inputGroup}>
              <label>Certification Name</label>
              <input type="text" value={cert.name || ''} onChange={e => updateListItem('certifications', cert.id, 'name', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Issuing Organization</label>
              <input type="text" value={cert.org || ''} onChange={e => updateListItem('certifications', cert.id, 'org', e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Completion Date</label>
              <input type="text" value={cert.date || ''} onChange={e => updateListItem('certifications', cert.id, 'date', e.target.value)} placeholder="MM/YYYY" />
            </div>
            <div className={styles.inputGroup}>
              <label>Credential Link</label>
              <input type="url" value={cert.link || ''} onChange={e => updateListItem('certifications', cert.id, 'link', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    ))}
    <button className={styles.addBtn} onClick={() => addListItem('certifications', { name: '', org: '', date: '', link: '' })}>
      <Plus size={16} /> Add Certification
    </button>
  </div>
);

const COMMON_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'HTML5', 'CSS3', 'SQL', 'NoSQL',
  'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'TailwindCSS', 'Redux', 'GraphQL', 'Webpack',
  'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'FastAPI', 'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure', 'Firebase', 'Supabase',
  'Flutter', 'React Native', 'Swift', 'Kotlin', 'Electron',
  'Jest', 'Cypress', 'Git', 'GitHub Actions', 'CI/CD',
  'Agile', 'Scrum', 'Jira', 'Figma', 'System Design'
];

export const SkillsForm = ({ skills, addSkill, removeSkill }) => {
  const [input, setInput] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        addSkill(input.trim());
        setInput('');
        setShowSuggestions(false);
      }
    }
  };

  const suggestions = input.trim()
    ? COMMON_SKILLS.filter(skill =>
        skill.toLowerCase().includes(input.toLowerCase()) &&
        !skills.some(s => s.toLowerCase() === skill.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.inputGroup} style={{ position: 'relative' }}>
        <label>Add Skill</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={input} 
            onChange={e => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }} 
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Delay onBlur slightly to allow clicking suggestion item
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            onKeyDown={handleKeyDown} 
            placeholder="e.g. React (Press Enter to add)"
            style={{ flex: 1 }}
          />
          <button className={styles.addBtn} onClick={() => { 
            if (input.trim()) {
              addSkill(input.trim()); 
              setInput(''); 
              setShowSuggestions(false);
            }
          }} style={{ margin: 0, width: 'auto' }}>Add</button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestionsContainer}>
            {suggestions.map((skill, index) => (
              <div 
                key={index} 
                className={styles.suggestionItem}
                onMouseDown={() => {
                  addSkill(skill);
                  setInput('');
                  setShowSuggestions(false);
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.skillsTagContainer}>
        {skills.map((skill, index) => (
          <span key={index} className={styles.skillTag}>
            {skill}
            <button onClick={() => removeSkill(skill)}><X size={14}/></button>
          </span>
        ))}
      </div>
    </div>
  );
};
