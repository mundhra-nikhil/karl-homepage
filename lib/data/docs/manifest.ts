export type DocCategoryColor = "blue" | "purple" | "emerald";

export interface DocArticle {
  slug: string;
  title: string;
  sidebarTitle: string;
  description: string;
  wide?: boolean;
}

export interface DocCategory {
  id: string;
  title: string;
  sidebarTitle: string;
  color: DocCategoryColor;
  articles: DocArticle[];
}

export const docCategories: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    sidebarTitle: "Getting Started",
    color: "blue",
    articles: [
      {
        slug: "enablement-guide",
        sidebarTitle: "Enablement Guide",
        title: "Karl Enablement Guide",
        description:
          "Pre-requisite guide outlining the Workload Setup required for Guest Tenants before enabling Karl.",
      },
      {
        slug: "trial-experience",
        sidebarTitle: "Trial Experience",
        title: "Trial Experience Document",
        description:
          "Comprehensive Trial Experience Guide demonstrating the initial setup and expected flows during the trial period.",
      },
      {
        slug: "workload-enablement",
        sidebarTitle: "Workload Enablement",
        title: "Workload Enablement",
        description:
          "Technical specifications and steps required for configuring workload enablement across environments.",
      },
      {
        slug: "user-guide",
        sidebarTitle: "User Guide",
        title: "Product Docs - User Guide",
        description:
          "A comprehensive user guide outlining the complete lifecycle from trial access to full product adoption.",
      },
    ],
  },
  {
    id: "product-info",
    title: "Product Information",
    sidebarTitle: "Product Info",
    color: "purple",
    articles: [
      {
        slug: "whitepaper",
        sidebarTitle: "The Insight Agent",
        title: "The Insight Agent",
        description:
          "Deep dive whitepaper exploring the architecture, capabilities, and benefits of Karl as an Insight Agent.",
      },
      {
        slug: "vs-fabric",
        sidebarTitle: "Karl vs Fabric",
        title: "Karl vs Fabric Data Agent",
        description:
          "A detailed comparison between Karl and the Microsoft Fabric Data Agent, highlighting key differentiators.",
      },
      {
        slug: "purchasing-flow",
        sidebarTitle: "Purchasing Flow",
        title: "SaaS Purchasing Flow",
        description:
          "Documentation explaining the SaaS purchasing workflow, onboarding steps, and provisioning for Karl.",
      },
      {
        slug: "pricing",
        sidebarTitle: "Pricing",
        title: "Karl Pricing",
        description:
          "Details on Pricing and Credits for Karl usage, including tier breakdowns and billing models.",
      },
    ],
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    sidebarTitle: "Security & Compliance",
    color: "emerald",
    articles: [
      {
        slug: "security-document",
        sidebarTitle: "Security Overview",
        title: "Karl Security Document",
        description:
          "Comprehensive Security Document outlining compliance, infrastructure security, and data protection policies.",
      },
      {
        slug: "fabric-plan",
        sidebarTitle: "Fabric Plan",
        title: "Fabric Plan Documentation",
        description:
          "Technical documentation covering the integration, deployment, and security of the Fabric Plan within Karl.",
      },
      {
        slug: "api-permissions",
        sidebarTitle: "API Permissions",
        title: "API Permissions",
        description:
          "Detailed security justification and data governance rules regarding API access and permission structures.",
        wide: true,
      },
    ],
  },
];

export const docSlugs = docCategories.flatMap((category) =>
  category.articles.map((article) => article.slug)
);

export function getDocArticle(slug: string): DocArticle | undefined {
  for (const category of docCategories) {
    const article = category.articles.find((entry) => entry.slug === slug);
    if (article) return article;
  }
  return undefined;
}

export const categoryColorStyles: Record<
  DocCategoryColor,
  {
    dot: string;
    hover: string;
    iconBg: string;
    iconBorder: string;
    iconText: string;
    cardFrom: string;
    cardTo: string;
    cardShadow: string;
    cardGlow: string;
    cardGlowHover: string;
    cardTitleHover: string;
    tocActive: string;
    tocShadow: string;
  }
> = {
  blue: {
    dot: "bg-blue-500",
    hover: "hover:text-blue-400",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconText: "text-blue-400",
    cardFrom: "hover:from-blue-500/50",
    cardTo: "hover:to-blue-500/10",
    cardShadow: "hover:shadow-[0_8px_32px_-10px_rgba(59,130,246,0.3)]",
    cardGlow: "bg-blue-500/5",
    cardGlowHover: "group-hover:bg-blue-500/10",
    cardTitleHover: "group-hover:text-blue-400",
    tocActive: "text-blue-400",
    tocShadow: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
  },
  purple: {
    dot: "bg-purple-500",
    hover: "hover:text-purple-400",
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    iconText: "text-purple-400",
    cardFrom: "hover:from-purple-500/50",
    cardTo: "hover:to-purple-500/10",
    cardShadow: "hover:shadow-[0_8px_32px_-10px_rgba(168,85,247,0.3)]",
    cardGlow: "bg-purple-500/5",
    cardGlowHover: "group-hover:bg-purple-500/10",
    cardTitleHover: "group-hover:text-purple-400",
    tocActive: "text-purple-400",
    tocShadow: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
  },
  emerald: {
    dot: "bg-emerald-500",
    hover: "hover:text-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconText: "text-emerald-400",
    cardFrom: "hover:from-emerald-500/50",
    cardTo: "hover:to-emerald-500/10",
    cardShadow: "hover:shadow-[0_8px_32px_-10px_rgba(16,185,129,0.3)]",
    cardGlow: "bg-emerald-500/5",
    cardGlowHover: "group-hover:bg-emerald-500/10",
    cardTitleHover: "group-hover:text-emerald-400",
    tocActive: "text-emerald-400",
    tocShadow: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },
};
