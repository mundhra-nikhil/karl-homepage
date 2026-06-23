import React from 'react';
import { DocArticle as DocArticleType } from '@/lib/data/docs/manifest';

interface DocArticleProps {
  html: string;
  article: DocArticleType;
}

export default function DocArticle({ html, article }: DocArticleProps) {
  return (
    <div className="docs-content-wrapper">
      <div className="docs-header mb-12 border-b border-docs-border-main pb-8 transition-colors duration-200">
        <h1 className="text-4xl font-bold text-docs-text-primary tracking-tight mb-4 transition-colors duration-200">{article.title}</h1>
        <p className="text-xl text-docs-text-secondary transition-colors duration-200">{article.description}</p>
      </div>
      <div
        className="docs-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
