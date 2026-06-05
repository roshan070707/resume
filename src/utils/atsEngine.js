// src/utils/atsEngine.js

const TECHNICAL_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'html5', 'css3', 'sql', 'nosql',
  'react', 'next.js', 'vue.js', 'angular', 'svelte', 'tailwindcss', 'redux', 'graphql', 'webpack',
  'node.js', 'express.js', 'django', 'flask', 'spring boot', 'asp.net', 'fastapi', 'docker', 'kubernetes', 'aws', 'google cloud', 'azure', 'firebase', 'supabase',
  'flutter', 'react native', 'swift', 'kotlin', 'electron',
  'jest', 'cypress', 'git', 'github actions', 'ci/cd',
  'agile', 'scrum', 'jira', 'figma', 'system design'
];

export function analyzeResumeLocal(data) {
  let score = 0;
  let strengths = [];
  let weaknesses = [];
  let missingKeywords = [];
  let atsImprovements = [];
  let recommendedSkills = [];

  const { personal, experience, education, projects, skills } = data;

  // 1. Contact Info & Identity (15 points total)
  if (personal.firstName && personal.lastName) {
    score += 3;
  } else {
    weaknesses.push('Missing full name in contact information.');
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (personal.email && emailRegex.test(personal.email)) {
    score += 4;
    strengths.push('Valid email format detected.');
  } else {
    weaknesses.push('Email address is missing or invalid.');
    atsImprovements.push('Add a professional email address.');
  }

  // Phone validation
  if (personal.phone && personal.phone.length > 7) {
    score += 4;
  } else {
    weaknesses.push('Phone number is missing.');
    atsImprovements.push('Add a reachable phone number.');
  }

  // LinkedIn validation
  const linkedinRegex = /linkedin\.com\/in\//i;
  if (personal.linkedin && linkedinRegex.test(personal.linkedin)) {
    score += 4;
    strengths.push('Professional LinkedIn profile included.');
  } else {
    weaknesses.push('LinkedIn profile link is missing or invalid.');
    atsImprovements.push('Add your LinkedIn URL to boost ATS parsing.');
  }

  // 2. Experience Section (25 points total)
  if (experience && experience.length > 0) {
    score += 10;
    
    let hasDetails = true;
    let totalExpWords = 0;
    
    experience.forEach(exp => {
      if (!exp.title || !exp.company) hasDetails = false;
      if (exp.description) {
        totalExpWords += exp.description.split(/\s+/).length;
      }
    });

    if (hasDetails) {
      score += 5;
    } else {
      atsImprovements.push('Ensure all experience entries have job titles and company names.');
    }

    if (totalExpWords > 50) {
      score += 10;
      strengths.push('Work experience is well-detailed.');
    } else {
      score += 5;
      weaknesses.push('Experience descriptions are too brief.');
      atsImprovements.push('Add detailed bullet points to your experience using the XYZ formula.');
    }
  } else {
    weaknesses.push('No work experience found.');
  }

  // 3. Education Section (15 points total)
  if (education && education.length > 0) {
    score += 5;
    const edu = education[0];
    if (edu.degree && edu.school) {
      score += 10;
      strengths.push('Education history is clearly formatted.');
    } else {
      score += 5;
      atsImprovements.push('Make sure to include both your degree and institution name.');
    }
  } else {
    weaknesses.push('Education section is empty.');
  }

  // 4. Projects Section (15 points total)
  if (projects && projects.length > 0) {
    score += 10;
    let hasProjDesc = false;
    projects.forEach(p => {
      if (p.description && p.description.length > 20) hasProjDesc = true;
    });
    
    if (hasProjDesc) {
      score += 5;
      strengths.push('Project descriptions demonstrate practical experience.');
    } else {
      atsImprovements.push('Add detailed descriptions to your projects explaining the problem and your solution.');
    }
  } else {
    weaknesses.push('Missing projects section. (Important for tech roles)');
    atsImprovements.push('Add 1-2 personal or academic projects to show practical skills.');
  }

  // 5. Skills & Keyword Density (30 points total)
  if (skills && skills.length > 0) {
    if (skills.length >= 8) {
      score += 15;
      strengths.push('Strong number of skills listed.');
    } else {
      score += 7;
      atsImprovements.push('Aim for at least 8-10 targeted skills for better ATS matching.');
    }

    // Technical skills count
    let techSkillCount = 0;
    const lowerSkills = skills.map(s => s.toLowerCase());
    
    lowerSkills.forEach(s => {
      if (TECHNICAL_SKILLS.includes(s)) techSkillCount++;
    });

    if (techSkillCount >= 5) {
      score += 10;
      strengths.push('Good coverage of recognized technical skills.');
    } else {
      score += 5;
      atsImprovements.push('Include more hard technical skills relevant to your target role.');
      
      // Recommend some technical skills they don't have
      const unusedTech = TECHNICAL_SKILLS.filter(ts => !lowerSkills.includes(ts));
      // Pick 3 random
      for(let i=0; i<3 && unusedTech.length > 0; i++) {
        const randIdx = Math.floor(Math.random() * unusedTech.length);
        recommendedSkills.push(unusedTech[randIdx]);
        unusedTech.splice(randIdx, 1);
      }
    }

    // Keyword density check (basic check if skills appear in experience/projects)
    let keywordsFoundInText = 0;
    const allText = JSON.stringify(experience).toLowerCase() + ' ' + JSON.stringify(projects).toLowerCase();
    
    lowerSkills.forEach(s => {
      if (allText.includes(s)) keywordsFoundInText++;
    });

    if (skills.length > 0 && (keywordsFoundInText / skills.length) >= 0.3) {
      score += 5;
      strengths.push('Good keyword density: skills naturally appear in your descriptions.');
    } else {
      weaknesses.push('Skills listed do not appear in your experience/project descriptions.');
      atsImprovements.push('Weave your listed skills naturally into your experience and project bullet points.');
    }
  } else {
    weaknesses.push('No skills listed.');
    atsImprovements.push('Add a dedicated skills section with relevant industry keywords.');
  }

  // 6. Overall Length (Check)
  const fullText = JSON.stringify(data);
  const wordCount = fullText.split(/\s+/).length;
  
  if (wordCount < 150) {
    weaknesses.push('Resume is too short and lacks detail.');
    atsImprovements.push('Flesh out your resume to provide more context for ATS parsers.');
  }

  let scoreExplanation = '';
  if (score >= 80) scoreExplanation = 'Your resume is highly optimized for Applicant Tracking Systems and covers all key areas effectively.';
  else if (score >= 60) scoreExplanation = 'Your resume has a good foundation but is missing some critical elements that ATS algorithms look for.';
  else scoreExplanation = 'Your resume requires significant structural improvements to successfully pass through automated ATS filters.';

  return {
    score: Math.min(100, Math.max(0, score)),
    strengths,
    weaknesses,
    missingKeywords,
    atsImprovements,
    recommendedSkills,
    scoreExplanation
  };
}
