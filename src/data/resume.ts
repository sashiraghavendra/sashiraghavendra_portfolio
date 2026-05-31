import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Desha Sashi Raghavendra Kumar",
    phone: "6302155895",
    email: "sashiraghavendra789@gmail.com",
    github: "https://github.com/sashiraghavendra",
    linkedin: "https://linkedin.com/in/sashiraghavendra",
    location: "Nandyal, Andhra Pradesh",
    summary: "Computer Science and Engineering graduate (2026) with hands-on experience developing backend applications using Java, MySQL, HTML, and CSS. Built two end-to-end systems, a cryptocurrency portfolio manager and a university ERP portal, leveraging Spring Boot, REST APIs, and relational database design. Eager to apply strong engineering fundamentals in a software development role."
  },
  education: [
    {
      institution: "Kalasalingam Academy of Research and Education",
      location: "Tamilnadu",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      startDate: "2022",
      endDate: "2026",
      metric: "CGPA: 8.19/10.0"
    }
  ],
  skills: {
    programmingLanguages: ["Java", "SQL", "MySQL", "HTML", "CSS"],
    toolsAndPlatforms: ["JDBC", "Git", "Postman", "Eclipse", "VS Code"],
    softSkills: ["Problem Solving", "Teamwork", "Communication"]
  },
  internships: [
    {
      role: "Intern",
      company: "Infosys Springboard Internship 6.0",
      startDate: "Nov 2025",
      endDate: "Jan 2026",
      projectTitle: "Cryptocurrency Portfolio Management System with Real-Time Risk and Scam Detection",
      achievements: [
        "Engineered a backend cryptocurrency portfolio management system using Java, Spring Boot, and MySQL, enabling secure multi-user portfolio tracking.",
        "Designed and implemented 10+ REST APIs covering user authentication, holdings management, trade history, and profit/loss analytics.",
        "Integrated CoinGecko, Binance, and CryptoScamDB third-party APIs for live market data and real-time scam detection alerts.",
        "Delivered CSV export functionality for tax-friendly trade reporting and automated risk notifications for portfolio threshold breaches.",
        "Tested all endpoints using Postman ensured robust error handling and response validation across all modules."
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "REST APIs", "Postman"],
      certificateUrl: "#certificate"
    }
  ],
  projects: [
    {
      title: "University ERP Portal",
      description: "A full-stack university ERP web application supporting admissions, fee payments, hostel bookings, and notices for students and administrators.",
      achievements: [
        "Architected a full-stack university ERP web application supporting admissions, fee payments, hostel bookings, and notices for students and administrators.",
        "Developed role-based login modules for student and admin users with profile management, approval workflows, and academic records.",
        "Designed a normalized MySQL relational database with tables for students, courses, fee payments, and hostel room allocations.",
        "Built responsive dashboards for both student and admin interfaces using HTML and CSS, ensuring cross-device compatibility."
      ],
      technologies: ["Java", "MySQL", "HTML", "CSS", "JDBC"],
      githubUrl: "https://github.com/sashiraghavendra",
      liveUrl: "https://kl-university-portal.onrender.com/"
    }
  ],
  certifications: [
    {
      title: "Introduction to Java",
      issuer: "Coursera (offered by LearnQuest)",
      issueDate: "Jun 2025",
      verificationUrl: "https://coursera.org/share/ebf7c01713e3a45622f2ca83cdc63022"
    },
    {
      title: "SQL Fundamentals",
      issuer: "IBM SkillsBuild",
      issueDate: "Jul 2025",
      verificationUrl: "https://courses.yl-ptech.skillsnetwork.site/certificates/340f05a1274549718024e93cdd417c76"
    },
    {
      title: "Introduction to Git and GitHub",
      issuer: "Coursera (offered by Google)",
      issueDate: "Jul 2025",
      verificationUrl: "https://www.coursera.org/account/accomplishments/verify/6PRRH7PXRZSL"
    }
  ]
};
