export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    image?: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "building-ai-powered-applications-langgraph",
        title: "Building AI-Powered Applications with LangGraph",
        excerpt:
            "A deep dive into orchestrating complex LLM workflows using LangGraph for production-ready AI systems.",
        content: `
# Building AI-Powered Applications with LangGraph

LangGraph has revolutionized how we build stateful, multi-actor applications with LLMs. In this post, we'll explore...

## Why LangGraph?

Traditional chains are great for simple sequences, but complex agents need state management and cycles...

## Key Concepts

- **State**: The shared context...
- **Nodes**: The processing units...
- **Edges**: The control flow...

## Conclusion

LangGraph provides the primitives needed for the next generation of AI agents.
    `,
        category: "AI/ML",
        readTime: "8 min read",
        date: "Mar 15, 2024",
        author: {
            name: "Lucas-Adebayo Daniel",
            avatar: "/me.jpg",
        },
    },
    {
        id: "2",
        slug: "why-nextjs-fullstack",
        title: "Why I Choose Next.js for Full-Stack Development",
        excerpt:
            "Exploring the benefits of building modern web applications with Next.js App Router and server components.",
        content: `
# Why I Choose Next.js

Next.js has become the de-facto framework for React development...

## Server Components

The shift to server components allows us to...

## Routing

The file-system based router...

## Conclusion

For modern full-stack development, Next.js offers the best developer experience.
    `,
        category: "Web Dev",
        readTime: "5 min read",
        date: "Feb 28, 2024",
        author: {
            name: "Lucas-Adebayo Daniel",
            avatar: "/me.jpg",
        },
    },
    {
        id: "3",
        slug: "problem-to-product-philosophy",
        title: "From Problem to Product: My Development Philosophy",
        excerpt:
            "How I approach building software that solves real problems, not just technical challenges.",
        content: `
# From Problem to Product

Building software is more than just writing code...

## Understanding the User

Before writing a single line of code...

## The MVP Mindset

Shipping fast and iterating...

## Conclusion

Focus on the problem, not just the technology.
    `,
        category: "Thoughts",
        readTime: "4 min read",
        date: "Jan 10, 2024",
        author: {
            name: "Lucas-Adebayo Daniel",
            avatar: "/me.jpg",
        },
    },
];
