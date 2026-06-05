export function calculateCompletion(data) {
  let score = 0;
  
  // 5 main sections: Personal, Experience, Education, Skills, Projects
  // Personal Info (20%)
  if (data.personal.firstName && data.personal.lastName && data.personal.email && data.personal.phone) {
    score += 20;
  } else if (data.personal.firstName || data.personal.email) {
    score += 10;
  }

  // Experience (20%)
  if (data.experience.length > 0) {
    const exp = data.experience[0];
    if (exp.title && exp.company && exp.description) score += 20;
    else score += 10;
  }

  // Education (20%)
  if (data.education.length > 0) {
    const edu = data.education[0];
    if (edu.degree && edu.school) score += 20;
    else score += 10;
  }

  // Skills (20%)
  if (data.skills.length >= 5) {
    score += 20;
  } else if (data.skills.length > 0) {
    score += 10;
  }

  // Projects (20%)
  if (data.projects.length > 0) {
    const proj = data.projects[0];
    if (proj.title && proj.description) score += 20;
    else score += 10;
  }

  return score;
}

export function calculateAtsScore(data) {
  let score = 0;
  let suggestions = [];

  // 1. Name Present (5%)
  if (data.personal.firstName && data.personal.lastName) score += 5;
  else suggestions.push("Add your full name");

  // 2. Email Present (5%)
  if (data.personal.email) score += 5;
  else suggestions.push("Add an email address");

  // 3. Phone Present (5%)
  if (data.personal.phone) score += 5;
  else suggestions.push("Add a phone number");

  // 4. Summary Present (10%)
  if (data.personal.summary && data.personal.summary.length > 50) score += 10;
  else suggestions.push("Improve your Professional Summary (add more detail)");

  // 5. LinkedIn Present (5%)
  if (data.personal.linkedin) score += 5;
  else suggestions.push("Missing LinkedIn Profile");

  // 6. GitHub Present (5%)
  if (data.personal.github) score += 5;
  else suggestions.push("Add your GitHub Profile");

  // 7. Experience Present (25%)
  if (data.experience.length > 0) {
    score += 15;
    if (data.experience.length > 1) score += 10;
  } else {
    suggestions.push("Add Work Experience");
  }

  // 8. Education Present (10%)
  if (data.education.length > 0) {
    score += 10;
  } else {
    suggestions.push("Add your Education history");
  }

  // 9. Projects Present (10%)
  if (data.projects.length > 0) {
    score += 10;
  } else {
    suggestions.push("Add Project descriptions");
  }

  // 10. Skills Count (15%)
  if (data.skills.length >= 8) {
    score += 15;
  } else if (data.skills.length >= 4) {
    score += 10;
    suggestions.push("Add More Skills (aim for 8+)");
  } else {
    suggestions.push("Add a robust Skills section");
  }

  // 11. Certifications Present (5%)
  if (data.certifications.length > 0) {
    score += 5;
  } else {
    suggestions.push("Add Certifications to stand out");
  }

  return {
    score: Math.min(100, score),
    suggestions
  };
}
