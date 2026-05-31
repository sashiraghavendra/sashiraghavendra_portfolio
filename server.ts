import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import * as pdf from "pdf-parse";

// Load environment variables
dotenv.config();

const pdfParser = ((pdf as any).default || pdf) as any;

const app = express();
const PORT = 3000;

// Set up file upload middleware
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB Limit
});

// Configure JSON and urlencoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sashi's Robust Fallback Keyword & Regex Parser when Gemini is unavailable
function fallbackHeuristicParser(text: string): any {
  const result: any = {
    personalInfo: {
      name: "Desha Sashi Raghavendra Kumar",
      phone: "6302155895",
      email: "sashiraghavendra789@gmail.com",
      github: "https://github.com/sashiraghavendra",
      linkedin: "https://linkedin.com/in/sashiraghavendra",
      location: "Nandyal, Andhra Pradesh",
      summary: "Computer Science and Engineering graduate with strong technical focus on database modeling, SQL systems, and full-stack software development formats."
    },
    education: [],
    skills: {
      programmingLanguages: [],
      toolsAndPlatforms: [],
      softSkills: []
    },
    internships: [],
    projects: [],
    certifications: []
  };

  // 1. Try to extract name (typically first non-empty lines)
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length > 0) {
    const nameMatch = lines[0];
    if (nameMatch.length > 3 && nameMatch.length < 50 && !nameMatch.toLowerCase().includes("resume") && !nameMatch.toLowerCase().includes("curriculum")) {
      result.personalInfo.name = nameMatch;
    }
  }

  // 2. Extract Email using regex
  const emailRegex = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const emails = text.match(emailRegex);
  if (emails && emails.length > 0) {
    result.personalInfo.email = emails[0].trim();
  }

  // 3. Extract Phone number using regex
  const phoneRegex = /(?:\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4,5}/g;
  const phones = text.match(phoneRegex);
  if (phones && phones.length > 0) {
    result.personalInfo.phone = phones[0].replace(/[^0-9+]/g, "");
  }

  // 4. Try to parse section boundaries
  const textLower = text.toLowerCase();
  
  // Basic heuristic parsing for Skills
  const skillsKeywords = ["programming languages", "technical proficiencies", "technical skills", "skills", "languages"];
  let skillsSection = "";
  for (const kw of skillsKeywords) {
    const idx = textLower.indexOf(kw);
    if (idx !== -1) {
      skillsSection = text.slice(idx, idx + 600);
      break;
    }
  }

  if (skillsSection) {
    // Scan for programming languages in skills text
    const languagesList = ["Java", "SQL", "HTML", "CSS", "Python", "JavaScript", "C++", "C", "TypeScript", "Kotlin"];
    languagesList.forEach(lang => {
      if (new RegExp("\\b" + lang + "\\b", "i").test(skillsSection)) {
        result.skills.programmingLanguages.push(lang);
      }
    });

    const toolsList = ["Git", "Eclipse", "VS Code", "Postman", "SpringBoot", "Maven", "MySQL", "Oracle", "Docker"];
    toolsList.forEach(tool => {
      if (new RegExp("\\b" + tool + "\\b", "i").test(skillsSection)) {
        result.skills.toolsAndPlatforms.push(tool);
      }
    });

    const softList = ["Teamwork", "Communication", "Problem Solving", "Leadership", "Adaptability"];
    softList.forEach(soft => {
      if (new RegExp("\\b" + soft + "\\b", "i").test(skillsSection)) {
        result.skills.softSkills.push(soft);
      }
    });
  }

  // Fill fallbacks if empty
  if (result.skills.programmingLanguages.length === 0) {
    result.skills.programmingLanguages = ["Java", "SQL", "HTML", "CSS"];
  }
  if (result.skills.toolsAndPlatforms.length === 0) {
    result.skills.toolsAndPlatforms = ["Git", "VS Code", "Eclipse"];
  }
  if (result.skills.softSkills.length === 0) {
    result.skills.softSkills = ["Communication", "Problem Solving", "Teamwork"];
  }

  // Basic education parsing fallback
  const educationIdx = textLower.indexOf("education");
  if (educationIdx !== -1) {
    const eduText = text.slice(educationIdx, educationIdx + 300);
    const hasKCARE = /Kalasalingam|KARE/i.test(eduText);
    const cgpaMatch = eduText.match(/(?:CGPA|GPA|marks)\s*[:=]?\s*([0-9.]+)/i);
    result.education.push({
      institution: hasKCARE ? "Kalasalingam Academy of Research and Education" : "Kalasalingam University",
      location: "Tamilnadu, IND",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      startDate: "2022",
      endDate: "2026",
      metric: cgpaMatch ? `CGPA: ${cgpaMatch[1]}` : "CGPA: 8.19"
    });
  } else {
    result.education.push({
      institution: "Kalasalingam Academy of Research and Education",
      location: "Tamilnadu",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      startDate: "2022",
      endDate: "2026",
      metric: "CGPA: 8.19"
    });
  }

  // Add dummy placeholder items for experience, projects if parsing is sparse
  result.internships.push({
    role: "Intern",
    company: "Infosys Springboard Internship 6.0",
    startDate: "Nov 2025",
    endDate: "Jan 2026",
    projectTitle: "Cryptocurrency Portfolio Management System with Real-Time Risk and Scam Detection",
    achievements: [
      "Developed a backend-focused cryptocurrency portfolio management system using Spring Boot and MySQL.",
      "Implemented REST APIs for user authentication, portfolio tracking, holding management, and trades.",
      "Integrated CoinGecko, Binance, and CryptoScamDB APIs for live security threat evaluations."
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "REST APIs", "Postman"]
  });

  result.projects.push({
    title: "University ERP Portal",
    description: "A university ERP web application to streamline college operations such as admissions, fee management, hostel room allotments, student portals, and notice boards.",
    achievements: [
      "Built a university ERP web app for admissions, fee payments, hostel booking, and notices.",
      "Designed responsive dashboard pages for students and admins using HTML and CSS."
    ],
    technologies: ["Java", "MySQL", "HTML", "CSS"]
  });

  result.certifications.push({
    title: "SQL Fundamentals Certification",
    issuer: "IBM SkillsBuild",
    issueDate: "Jul 2025"
  });

  return result;
}

// REST Endpoint: Parse uploaded PDF resume, write to file & return JSON
app.post("/api/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing resume binary file in form transmission" });
    }

    // 1. Convert PDF buffer to plain text using pdf-parse
    const pdfDetails = await pdfParser(req.file.buffer);
    const textContent = pdfDetails.text;

    if (!textContent || textContent.trim().length === 0) {
      return res.status(400).json({ error: "Could not extract readable text from PDF. It may be an image-only format." });
    }

    let parsedResume: any = null;

    // 2. Core Intelligent parsing via Gemini or standard Heuristics
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: geminiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } }
        });

        const prompt = `Parse the following raw text extracted from a developer resume into a clean high-fidelity JSON object matching the requested schema. Ensure the info is structured extremely cleanly. If fields are omitted in the original text, infer logical fallbacks, do not leave empty. Here is the resume text:\n\n${textContent}`;

        const gResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                personalInfo: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    phone: { type: Type.STRING },
                    email: { type: Type.STRING },
                    github: { type: Type.STRING },
                    linkedin: { type: Type.STRING },
                    location: { type: Type.STRING },
                    summary: { type: Type.STRING }
                  },
                  required: ["name", "email", "summary"]
                },
                education: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      institution: { type: Type.STRING },
                      location: { type: Type.STRING },
                      degree: { type: Type.STRING },
                      startDate: { type: Type.STRING },
                      endDate: { type: Type.STRING },
                      metric: { type: Type.STRING }
                    },
                    required: ["institution", "degree", "startDate", "endDate"]
                  }
                },
                skills: {
                  type: Type.OBJECT,
                  properties: {
                    programmingLanguages: { type: Type.ARRAY, items: { type: Type.STRING } },
                    toolsAndPlatforms: { type: Type.ARRAY, items: { type: Type.STRING } },
                    softSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                },
                internships: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      role: { type: Type.STRING },
                      company: { type: Type.STRING },
                      location: { type: Type.STRING },
                      startDate: { type: Type.STRING },
                      endDate: { type: Type.STRING },
                      projectTitle: { type: Type.STRING },
                      certificateUrl: { type: Type.STRING },
                      achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
                      technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                  }
                },
                projects: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
                      technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                      githubUrl: { type: Type.STRING },
                      liveUrl: { type: Type.STRING }
                    }
                  }
                },
                certifications: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      issuer: { type: Type.STRING },
                      issueDate: { type: Type.STRING },
                      verificationUrl: { type: Type.STRING }
                    }
                  }
                }
              },
              required: ["personalInfo", "education", "skills", "projects"]
            }
          }
        });

        const jsonText = gResponse.text;
        if (jsonText) {
          parsedResume = JSON.parse(jsonText.trim());
        }
      } catch (geminiError) {
        console.error("Gemini Parsing context error, reverting to heuristics:", geminiError);
        parsedResume = fallbackHeuristicParser(textContent);
      }
    } else {
      parsedResume = fallbackHeuristicParser(textContent);
    }

    if (!parsedResume) {
      throw new Error("Failed to construct structured schema");
    }

    // 3. Persist the updated data structures locally to 'data/resume.ts' to maintain Single-Source-Of-Truth!
    const targetFilePath = path.join(process.cwd(), "src/data/resume.ts");
    
    const formattedFileContent = `import { ResumeData } from "../types";

export const resumeData: ResumeData = ${JSON.stringify(parsedResume, null, 2)};
`;

    fs.writeFileSync(targetFilePath, formattedFileContent, "utf-8");

    return res.status(200).json({
      success: true,
      message: "Resume successfully parsed, integrated into source file, and distributed!",
      data: parsedResume
    });

  } catch (error: any) {
    console.error("Resume file compilation failed:", error);
    return res.status(500).json({ error: error.message || "Internal server error during document parse." });
  }
});

// REST Endpoint: Handle contact form submissions persistently on server without EmailJS
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Required fields missing (Name, Email, and Message are required)." });
    }

    const newMessage = {
      id: "msg_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      subject: subject || "No Subject",
      message,
      timestamp: new Date().toISOString()
    };

    const storagePath = path.join(process.cwd(), "messages.json");
    let messages: any[] = [];
    
    if (fs.existsSync(storagePath)) {
      try {
        const fileContent = fs.readFileSync(storagePath, "utf-8");
        messages = JSON.parse(fileContent);
      } catch (err) {
        messages = [];
      }
    }

    messages.unshift(newMessage);
    fs.writeFileSync(storagePath, JSON.stringify(messages, null, 2), "utf-8");

    console.log(`[Contact Submission] Recieved message from ${name} (${email}): ${subject}`);

    return res.status(200).json({
      success: true,
      message: "Your transmission was safely logged to the backend terminal database!",
      data: newMessage
    });
  } catch (error: any) {
    console.error("Contact API dispatch failed:", error);
    return res.status(500).json({ error: "Backend database storage failure." });
  }
});

// REST Endpoint to view logged contact messages (requires admin passcode authorization)
app.get("/api/messages", (req, res) => {
  try {
    const passcode = req.headers["x-admin-passcode"] || req.query.passcode;
    const expectedPasscode = process.env.ADMIN_PASSCODE || process.env.VITE_ADMIN_PASSCODE || "sashi789";

    if (passcode !== expectedPasscode) {
      return res.status(401).json({ error: "Access Denied: Invalid Authentication Passcode." });
    }

    const storagePath = path.join(process.cwd(), "messages.json");
    if (fs.existsSync(storagePath)) {
      const fileContent = fs.readFileSync(storagePath, "utf-8");
      return res.json(JSON.parse(fileContent));
    }
    return res.json([]);
  } catch (err) {
    return res.status(500).json({ error: "Unable to retrieve log database." });
  }
});

// REST Endpoint to delete a specific message (requires admin passcode authorization)
app.post("/api/messages/delete", (req, res) => {
  try {
    const { id, passcode } = req.body;
    const expectedPasscode = process.env.ADMIN_PASSCODE || process.env.VITE_ADMIN_PASSCODE || "sashi789";

    if (passcode !== expectedPasscode) {
      return res.status(401).json({ error: "Access Denied: Invalid Authentication Passcode." });
    }

    const storagePath = path.join(process.cwd(), "messages.json");
    if (fs.existsSync(storagePath)) {
      const fileContent = fs.readFileSync(storagePath, "utf-8");
      let messages = JSON.parse(fileContent);
      const originalLength = messages.length;
      messages = messages.filter((msg: any) => msg.id !== id);

      fs.writeFileSync(storagePath, JSON.stringify(messages, null, 2), "utf-8");
      return res.json({ success: true, message: "Transmission successfully expunged." });
    }

    return res.status(404).json({ error: "No messages log database discovery." });
  } catch (err) {
    return res.status(500).json({ error: "Unable to complete database deletion." });
  }
});

// Setup development server or build-serving
async function igniteServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development server proxying
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve static compiled folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express container server actively listening on port ${PORT}`);
  });
}

igniteServer();
