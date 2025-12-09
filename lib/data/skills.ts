export interface Skill {
    name: string;
    icon?: string;
}

export interface SkillCategory {
    title: string;
    icon: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Frontend",
        icon: "Layout",
        skills: [
            { name: "React" },
            { name: "Next.js" },
            { name: "TypeScript" },
            { name: "TailwindCSS" },
            { name: "Framer Motion" },
            { name: "Three.js" },
            { name: "Chakra UI" },
            { name: "ShadCN UI" },
        ],
    },
    {
        title: "Backend",
        icon: "Server",
        skills: [
            { name: "Node.js" },
            { name: "Express.js" },
            { name: "FastAPI" },
            { name: "Django" },
            { name: "Python" },
            { name: "PostgreSQL" },
            { name: "MongoDB" },
            { name: "Prisma" },
            { name: "Supabase" },
        ],
    },
    {
        title: "AI / ML",
        icon: "Brain",
        skills: [
            { name: "LangChain" },
            { name: "LangGraph" },
            { name: "OpenAI API" },
            { name: "RAG Pipelines" },
            { name: "VLMs" },
            { name: "Prompt Engineering" },
            { name: "Scikit-learn" },
            { name: "Pandas" },
        ],
    },
    {
        title: "DevOps & Tools",
        icon: "Wrench",
        skills: [
            { name: "Docker" },
            { name: "Git" },
            { name: "AWS EC2" },
            { name: "Vercel" },
            { name: "Redis" },
            { name: "RabbitMQ" },
            { name: "NGINX" },
            { name: "Linux" },
        ],
    },
];
