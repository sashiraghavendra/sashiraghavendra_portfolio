import { jsPDF } from "jspdf";
import { ResumeData } from "../types";

export function exportResumePDF(data: ResumeData) {
  // A4 dimensions: 210mm x 297mm
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const marginX = 18;
  const pageHeight = 297;
  const pageWidth = 210;
  let currentY = 18;

  // Helper to ensure we don't bleed off page edge
  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 15) {
      doc.addPage();
      currentY = 18;
      return true;
    }
    return false;
  };

  // Color Palette Definitions
  const colorPrimary = [15, 23, 42];  // Slate 900 (Bold Headers)
  const colorSecondary = [64, 74, 86]; // Slate 700 (Subtext & details)
  const colorBody = [51, 65, 85];     // Slate 600 (Normal body)
  const colorMuted = [100, 116, 139];  // Slate 500 (Timeline constraints)

  // 1. PRIMARY HEADER (Name and Contact Coordinates)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text(data.personalInfo.name, marginX, currentY);
  currentY += 6.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
  
  const contactText = `${data.personalInfo.location}  |  +91 ${data.personalInfo.phone}  |  ${data.personalInfo.email}`;
  doc.text(contactText, marginX, currentY);
  currentY += 4.5;

  const socialText = `GitHub: ${data.personalInfo.github.replace("https://", "")}  |  LinkedIn: ${data.personalInfo.linkedin.replace("https://", "")}`;
  doc.text(socialText, marginX, currentY);
  currentY += 6;

  // Header separator line
  doc.setDrawColor(226, 232, 240); // tailwind slate-200
  doc.setLineWidth(0.4);
  doc.line(marginX, currentY, pageWidth - marginX, currentY);
  currentY += 8;

  // 2. PROFESSIONAL SUMMARY
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("OBJECTIVE & SUMMARY", marginX, currentY);
  currentY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(colorBody[0], colorBody[1], colorBody[2]);
  
  const splitSummary = doc.splitTextToSize(data.personalInfo.summary, pageWidth - marginX * 2);
  doc.text(splitSummary, marginX, currentY);
  currentY += splitSummary.length * 4.5 + 6;

  // 3. CORE TECHNICAL SKILLS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text("CORE TECHNICAL CAPABILITIES", marginX, currentY);
  currentY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(colorBody[0], colorBody[1], colorBody[2]);

  const skillLines = [
    { label: "Programming Languages :", val: data.skills.programmingLanguages.join(", ") },
    { label: "Tools & Ecosystems :", val: data.skills.toolsAndPlatforms.join(", ") },
    { label: "Soft Skills & Values :", val: data.skills.softSkills.join(", ") }
  ];

  skillLines.forEach((sk) => {
    doc.setFont("helvetica", "bold");
    doc.text(sk.label, marginX, currentY);
    doc.setFont("helvetica", "normal");
    
    // Position text dynamically beyond the label width
    doc.text(sk.val, marginX + 45, currentY);
    currentY += 5;
  });
  currentY += 4;

  // 4. INDUSTRY WORK EXPERIENCE (Internship timeline)
  if (data.internships && data.internships.length > 0) {
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text("PROFESSIONAL INTERNSHIPS", marginX, currentY);
    currentY += 5;

    data.internships.forEach((intern) => {
      checkPageBreak(25);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
      
      // Left align: Title - Company
      doc.text(`${intern.role}  -  ${intern.company}`, marginX, currentY);
      
      // Right align: Timeline
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
      doc.text(`${intern.startDate} - ${intern.endDate}`, pageWidth - marginX - 35, currentY);
      currentY += 4.5;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
      doc.text(`Project Core: ${intern.projectTitle}`, marginX, currentY);
      currentY += 4.5;

      // Achievements bullets
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(colorBody[0], colorBody[1], colorBody[2]);
      
      intern.achievements.forEach((ach) => {
        const wrapText = doc.splitTextToSize(`•  ${ach}`, pageWidth - marginX * 2 - 5);
        checkPageBreak(wrapText.length * 4);
        doc.text(wrapText, marginX + 3, currentY);
        currentY += wrapText.length * 4.2 + 0.5;
      });
      currentY += 3;
    });
  }

  // 5. PROJECTS & WEB PORTALS
  if (data.projects && data.projects.length > 0) {
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text("ENGINEERING PROJECTS", marginX, currentY);
    currentY += 5;

    data.projects.forEach((proj) => {
      checkPageBreak(20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
      doc.text(proj.title, marginX, currentY);
      currentY += 4.5;

      // Tech pill details listed in document
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
      doc.text(`Stack: ${proj.technologies.join(", ")}`, marginX, currentY);
      currentY += 4;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(colorBody[0], colorBody[1], colorBody[2]);
      const wrapDesc = doc.splitTextToSize(proj.description, pageWidth - marginX * 2);
      checkPageBreak(wrapDesc.length * 4);
      doc.text(wrapDesc, marginX, currentY);
      currentY += wrapDesc.length * 4.2 + 2;

      if (proj.achievements) {
        proj.achievements.forEach((ach) => {
          const wrapAch = doc.splitTextToSize(`-  ${ach}`, pageWidth - marginX * 2 - 5);
          checkPageBreak(wrapAch.length * 4);
          doc.text(wrapAch, marginX + 3, currentY);
          currentY += wrapAch.length * 4.2 + 0.5;
        });
      }
      currentY += 4;
    });
  }

  // 6. ACADEMIC CREDENTIALS
  if (data.education && data.education.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text("ACADEMIC COMPLIANCE", marginX, currentY);
    currentY += 5;

    data.education.forEach((edu) => {
      checkPageBreak(15);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
      doc.text(edu.degree, marginX, currentY);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
      doc.text(`${edu.startDate} - ${edu.endDate}`, pageWidth - marginX - 25, currentY);
      currentY += 4.5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
      doc.text(`${edu.institution}, ${edu.location}  |  ${edu.metric || ""}`, marginX, currentY);
      currentY += 6;
    });
    currentY += 3;
  }

  // 7. CERTIFICATIONS LOCKER
  if (data.certifications && data.certifications.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text("RELEVANT VERIFIED CERTIFICATIONS", marginX, currentY);
    currentY += 5;

    data.certifications.forEach((cert) => {
      checkPageBreak(6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
      // Left aligned cert title
      doc.text(`•  ${cert.title}`, marginX, currentY);

      // Issuer & date info right aligned or inline
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
      doc.text(`issued by ${cert.issuer} (${cert.issueDate})`, pageWidth - marginX - 60, currentY);
      currentY += 5;
    });
  }

  // Trigger browser download action safely
  const formattedFilename = `${data.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`;
  doc.save(formattedFilename);
}
