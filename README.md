# Desha Sashi Raghavendra Kumar - Modern 3D Portfolio Webside

Welcome to the premium, dark-futuristic animated 3D portfolio website for **Desha Sashi Raghavendra Kumar**, built from the absolute ground up in React with Tailwind CSS v4 and vanilla HTML5 Canvas interactive space connections. It acts as an award-winning developer resume, offering a highly stylized bento-grid layout, cinematic loader systems, custom tactile cursor glows, and high-performance orbital gravity nodes that perform flawlessly on smartphones and desktops alike.

---

## 🛠️ Technology Stack
- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite 6](https://vite.dev/)
- **Styling Architecture**: [Tailwind CSS v4](https://tailwindcss.com/) (fully native CSS @theme customizer)
- **Fluid & Reveal Animations**: [Motion (React 19 edition)](https://motion.dev/)
- **Vector Icons**: [Lucide React](https://lucide.dev/)
- **Particle System**: Interactive custom, ultra-lightweight Canvas 3D Constellation algorithm (60 FPS on mobile)

---

## 📂 Project Architecture

```bash
/
├── public/
│   └── Desha_Sashi_Resume.txt     # Clean plain-text download-ready resume asset
├── src/
│   ├── components/
│   │   ├── LoadingScreen.tsx      # System pre-boot console simulator
│   │   ├── ParticleBackground.tsx # High-performance custom canvas connection nodes
│   │   ├── AnimatedCursor.tsx     # Magnetic cursor halo and inner glowing dot
│   │   ├── Header.tsx             # Sticky top glassmorphic navigation bar
│   │   └── sections/
│   │       ├── Hero.tsx           # Intro showcase and typing capability simulator
│   │       ├── About.tsx          # Bento Grid identity cards & GPA metric meters
│   │       ├── Skills.tsx         # verified tech categorized charts
│   │       ├── Projects.tsx       # selected projects showcase
│   │       ├── Experience.tsx     # Infosys Springboard internship timeline
│   │       ├── Education.tsx      # B.Tech degree path parameters
│   │       ├── Certifications.tsx # IBM & Coursera cert lockers
│   │       └── Contact.tsx        # secure recruiter contact console
│   ├── data/
│   │   └── resume.ts              # SINGLE SOURCE OF TRUTH (all resume text data)
│   ├── types.ts                   # Precise TypeScript interfaces
│   ├── App.tsx                    # main workspace core layout stitcher
│   ├── index.css                  # global styling, scrollbars, and premium fonts
│   └── main.tsx                   # entrypoint
├── package.json                   # dependencies configuration
├── tsconfig.json                  # typescript compiler parameters
└── vite.config.ts                 # bundler settings
```

---

## 🧬 Resume Data Integration

To protect Sashi's personal data integrity and prevent hallucinated details, we've implemented a strict **Single Source of Truth** pattern. All text, credentials, timeline nodes, and metadata are read dynamically by React from a static structured record located at:

👉 `src/data/resume.ts`

### How To Modify Resume Data:
To update Sashi's coordinates, add projects, or list new credentials, simply edit the JSON fields inside `/src/data/resume.ts`. The UI sections will automatically adjust (creating or hiding bento containers as appropriate) with zero component refactoring!

Similarly, update `public/Desha_Sashi_Resume.txt` to keep the downloadable offline file identical.

---

## 📬 Contact Form & EmailJS Parameters

The Portfolio includes a functional, recruiter-friendly message console under `#contact`. It operates on safe fallbacks: if keys are absent, it displays a gentle disclaimer alert and safely mock-submits with local dispatches. 

To link your physical EmailJS inbox:
1. Create a free account at [EmailJS](https://www.emailjs.com/) and register an Email Service template.
2. In your local `.env` or deployment settings (Vercel Secrets / AI Studio Settings), append:

```env
# EmailJS inbox coordinates
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service_id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template_id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_public_key"
```

The contact component is designed to read either `VITE_` or `NEXT_PUBLIC_` structures automatically to make sure it plays nicely on both Vite wrappers and static Vercel build runtimes!

---

## 🚀 How to Run the App Locally

To clone. install dependencies, and run the dev server locally:

1. Ensure [NodeJS](https://nodejs.org/) is installed.
2. Run installation:
   ```bash
   npm install
   ```
3. Run Local Dev Server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to preview.

4. Check code for errors:
   ```bash
   npm run lint
   ```

5. Compile production code:
   ```bash
   npm run build
   ```

---

## 🌌 Deploying to Vercel

Vercel provides native, high-performance static optimization for Vite bundles.

### Deploy Steps via Vercel CLI:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the root folder of the project.
3. Follow prompts. Keep defaults:
   - **Framework Preset**: select `Vite` (automatic)
   - **Output Directory**: `dist` (automatic)
4. Add your email credentials configuration (under Vercel Dashboard Settings -> Environment Variables) if linking EmailJS.
