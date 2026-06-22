import React from 'react';
import { DocArticle as DocArticleType } from '@/lib/data/docs/manifest';

interface DocArticleProps {
  html: string;
  article: DocArticleType;
}

export default function DocArticle({ html, article }: DocArticleProps) {
  return (
    <div className="docs-content-wrapper">
      <div className="docs-header mb-12 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">{article.title}</h1>
        <p className="text-xl text-slate-400">{article.description}</p>
      </div>
      <div
        className="docs-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
