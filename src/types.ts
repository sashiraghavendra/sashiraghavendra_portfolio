export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Internship {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  certificateUrl?: string;
  projectTitle: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  achievements: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
  metric?: string; // CGPA, GPA, etc.
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  verificationUrl?: string;
}

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  summary: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: {
    programmingLanguages: string[];
    toolsAndPlatforms: string[];
    softSkills: string[];
  };
  internships: Internship[];
  projects: Project[];
  certifications: Certification[];
}
