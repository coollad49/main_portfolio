"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <article className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:my-4
            prose-strong:text-foreground prose-strong:font-semibold
            prose-em:text-foreground/80
            prose-a:text-foreground prose-a:underline prose-a:font-medium hover:prose-a:text-muted-foreground
            prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-foreground/80 prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
            prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-secondary prose-pre:text-foreground prose-pre:p-4 prose-pre:my-4 prose-pre:overflow-x-auto
            prose-hr:border-border
        ">
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    );
}