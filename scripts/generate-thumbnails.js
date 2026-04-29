/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../public/projects');

const projects = [
    { id: "exam-ai-grader", title: "Exam AI Grader", category: "ai-ml", color: "#a855f7", bg: "#1a0f2e" },
    { id: "bursary-dashboard", title: "Bursary Dashboard", category: "fullstack", color: "#3b82f6", bg: "#0f172a" },
    { id: "learn-your-facts", title: "Learn Your Facts", category: "ai-ml", color: "#a855f7", bg: "#1a0f2e" },
    { id: "logbook-generator", title: "Logbook Generator", category: "ai-ml", color: "#a855f7", bg: "#1a0f2e" },
    { id: "hospital-chatbot", title: "Hospital Chatbot", category: "ai-ml", color: "#a855f7", bg: "#1a0f2e" },
    { id: "task-dashboard", title: "Task Dashboard", category: "fullstack", color: "#3b82f6", bg: "#0f172a" },
    { id: "chapel-automation", title: "Chapel Automation", category: "tools", color: "#22c55e", bg: "#0a1f0f" },
    { id: "ecommerce-api", title: "E-Commerce API", category: "fullstack", color: "#3b82f6", bg: "#0f172a" },
    { id: "flashcard-saas", title: "Flashcard SaaS", category: "ai-ml", color: "#a855f7", bg: "#1a0f2e" },
    { id: "inventory-dashboard", title: "Inventory Dashboard", category: "ai-ml", color: "#a855f7", bg: "#1a0f2e" },
    { id: "ml-portfolio", title: "ML Portfolio", category: "data", color: "#f97316", bg: "#1a0f05" },
    { id: "daglore-website", title: "Daglore Website", category: "fullstack", color: "#3b82f6", bg: "#0f172a" },
];

function generateSVG(project) {
    const { id, title, color, bg } = project;
    const initials = title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    // Generate a unique seed-based pattern for each project
    const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const circles = [];
    for (let i = 0; i < 6; i++) {
        const cx = 100 + ((seed + i * 137) % 600);
        const cy = 80 + ((seed + i * 89) % 340);
        const r = 40 + ((seed + i * 53) % 80);
        const opacity = 0.03 + ((seed + i * 31) % 5) / 100;
        circles.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}"/>`);
    }

    const lines = [];
    for (let i = 0; i < 8; i++) {
        const x1 = (seed + i * 47) % 800;
        const y1 = (seed + i * 71) % 500;
        const x2 = x1 + 60 + ((seed + i * 113) % 120);
        const y2 = y1 + 30 + ((seed + i * 67) % 80);
        const opacity = 0.04 + ((seed + i * 23) % 4) / 100;
        lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`);
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
    </linearGradient>
    <pattern id="grid-${id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="800" height="500" fill="url(#grad-${id})" />
  <rect width="800" height="500" fill="url(#grid-${id})" />
  ${circles.join('\n  ')}
  ${lines.join('\n  ')}
  <rect x="40" y="40" width="720" height="420" rx="12" fill="none" stroke="${color}" stroke-width="1" opacity="0.15"/>
  <text x="400" y="240" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="700" fill="${color}" opacity="0.12" letter-spacing="-2">${initials}</text>
  <text x="400" y="280" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="#e5e5e5" opacity="0.9">${title}</text>
  <rect x="340" y="310" width="120" height="3" rx="1.5" fill="${color}" opacity="0.4"/>
</svg>`;
}

projects.forEach(project => {
    const svg = generateSVG(project);
    fs.writeFileSync(path.join(outDir, `${project.id}.svg`), svg);
});

console.log(`Generated ${projects.length} project thumbnails in ${outDir}`);
