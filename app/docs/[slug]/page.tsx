import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocArticle from "@/components/docs/DocArticle";
import DocLayout from "@/components/docs/DocLayout";
import { getDocContent } from "@/lib/data/docs/content";
import { docSlugs, getDocArticle } from "@/lib/data/docs/manifest";

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return docSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getDocArticle(slug);

  if (!article) {
    return { title: "Not Found" };
  }

  return {
    title: `${article.title} | Karl Docs`,
    description: article.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const article = getDocArticle(slug);
  const content = getDocContent(slug);

  if (!article || !content) {
    notFound();
  }

  return (
    <DocLayout>
      <DocArticle html={content.html} />
    </DocLayout>
  );
}
