interface DocArticleProps {
  html: string;
}

export default function DocArticle({ html }: DocArticleProps) {
  return (
    <div
      className="docs-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
