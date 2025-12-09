export interface Experience {
    id: string;
    title: string;
    company: string;
    type: "work" | "education" | "project";
    period: string;
    description: string;
    highlights?: string[];
}

export const experiences: Experience[] = [
    {
        id: "headstarter-fellowship",
        title: "Software Engineering Fellow",
        company: "Headstarter AI",
        type: "education",
        period: "2024",
        description: "Intensive fellowship program focused on AI-powered applications, collaborative development, and building production-ready software systems.",
        highlights: [
            "Built AI-powered applications including Flashcard SaaS and Inventory Dashboard",
            "Learned RAG pipelines and LLM integration patterns",
            "Collaborated with team members on full-stack projects",
        ],
    },
    {
        id: "freelance",
        title: "Freelance Full-Stack Developer",
        company: "Self-Employed",
        type: "work",
        period: "2023 - Present",
        description: "Building web applications and AI-powered solutions for clients across various industries, from education to healthcare.",
        highlights: [
            "Developed Bursary Management Dashboard for Daglore School",
            "Built custom websites and web applications",
            "Specialized in AI integration and automation tools",
        ],
    },
    {
        id: "university",
        title: "Computer Science Student",
        company: "Mountaineer University",
        type: "education",
        period: "2020 - Present",
        description: "Pursuing degree in Computer Science with focus on software engineering and artificial intelligence.",
        highlights: [
            "Built Chapel Letter Automation System",
            "Completed SIWES internship program",
            "Developed multiple university projects",
        ],
    },
];

export const stats = [
    { label: "Projects Completed", value: "12+" },
    { label: "Technologies", value: "25+" },
    { label: "Years Coding", value: "3+" },
    { label: "AI Projects", value: "6+" },
];
