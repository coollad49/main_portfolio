"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <article className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-neutral-900 dark:prose-headings:text-white
            prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-neutral-200 dark:prose-h2:border-neutral-700 prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-neutral-800 dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:my-4
            prose-strong:text-neutral-900 dark:prose-strong:text-white prose-strong:font-semibold
            prose-em:text-neutral-800 dark:prose-em:text-neutral-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline prose-a:font-medium hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300
            prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-neutral-800 dark:prose-li:text-neutral-300 prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-400
            prose-code:text-neutral-900 dark:prose-code:text-neutral-100 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-800 prose-pre:text-neutral-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-4 prose-pre:overflow-x-auto
            prose-hr:border-neutral-200 dark:prose-hr:border-neutral-700
        ">
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    );
}

