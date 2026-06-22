import apiPermissions from "./content/api-permissions.json";
import enablementGuide from "./content/enablement-guide.json";
import fabricPlan from "./content/fabric-plan.json";
import pricing from "./content/pricing.json";
import purchasingFlow from "./content/purchasing-flow.json";
import securityDocument from "./content/security-document.json";
import trialExperience from "./content/trial-experience.json";
import userGuide from "./content/user-guide.json";
import vsFabric from "./content/vs-fabric.json";
import whitepaper from "./content/whitepaper.json";
import workloadEnablement from "./content/workload-enablement.json";

export interface DocContent {
  html: string;
}

const docContentBySlug: Record<string, DocContent> = {
  "api-permissions": apiPermissions,
  "enablement-guide": enablementGuide,
  "fabric-plan": fabricPlan,
  pricing,
  "purchasing-flow": purchasingFlow,
  "security-document": securityDocument,
  "trial-experience": trialExperience,
  "user-guide": userGuide,
  "vs-fabric": vsFabric,
  whitepaper,
  "workload-enablement": workloadEnablement,
};

export function getDocContent(slug: string): DocContent | undefined {
  return docContentBySlug[slug];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function processArticleHtml(html: string): { cleanHtml: string; headings: Heading[] } {
  let cleanHtml = html;

  // Extract tables to prevent modifying their internal contents (like generating H2s)
  const tables: string[] = [];
  cleanHtml = cleanHtml.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
    tables.push(match);
    return `__TABLE_PLACEHOLDER_${tables.length - 1}__`;
  });

  // 1. Convert `<p><strong>...</strong></p>` and `<p><b>...</b></p>` into `<h2>...</h2>`
  cleanHtml = cleanHtml.replace(/<p>\s*<(strong|b)>((?:(?!<\/?p>).)*?)<\/\1>\s*<\/p>/gi, (match, tag, content) => {
    const cleanContent = content.replace(/<br\s*\/?>\s*$/i, '');
    return `<h2>${cleanContent}</h2>`;
  });

  // 2. Convert raw `<h1>` to `<h2>` for consistency.
  cleanHtml = cleanHtml.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<h2>$1</h2>');

  // 3. Remove redundant title headers at the top of the document.
  const isJunk = (text: string) => {
    const t = text.toLowerCase().replace(/<[^>]+>/g, '').trim();
    if (!t) return true;
    if (
      t.includes('karl') || 
      t.includes('insight agent') || 
      t === 'vs' || 
      t.includes('fabric data agent') || 
      t.includes('decision-oriented') || 
      t.includes('white paper') || 
      t.includes('document control') || 
      t.includes('setup guide') || 
      t.includes('api permissions') || 
      t.includes('pricing') || 
      t.includes('purchasing flow') || 
      t.includes('security document') || 
      t.includes('trial experience') || 
      t.includes('fabric plan') ||
      t.includes('abstract')
    ) {
       return true;
    }
    return false;
  };

  let changed = true;
  while(changed) {
     changed = false;
     cleanHtml = cleanHtml.replace(/^(\s*<a[^>]*><\/a>\s*|\s*)*<h2[^>]*>(.*?)<\/h2>/i, (match, prefix, content) => {
        if (isJunk(content)) {
           changed = true;
           return prefix || '';
        }
        return match;
     });
  }

  // 4. Remove static Word-generated Table of Contents
  cleanHtml = cleanHtml.replace(/<p[^>]*>\s*<(strong|b)>\s*Table of Contents\s*<\/\1>\s*<\/p>/gi, '');
  cleanHtml = cleanHtml.replace(/<p[^>]*>\s*Table of Contents\s*<\/p>/gi, '');
  // Safely remove any paragraph containing a link to a Word TOC anchor
  cleanHtml = cleanHtml.replace(/<p[^>]*>(?:(?!<\/?p>).)*?href=["']?#_Toc(?:(?!<\/?p>).)*?<\/p>/gi, '');

  // 5. Extract headings and inject IDs (only H2 for the TOC)
  const headings: Heading[] = [];
  cleanHtml = cleanHtml.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (match, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim(); // strip inner tags
    if (!text) return match;

    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const level = 2;

    // We make sure the ID is unique
    let finalId = id;
    let counter = 1;
    while (headings.some(h => h.id === finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }

    headings.push({ id: finalId, text, level });

    // Inject id
    return `<h2 id="${finalId}">${content}</h2>`;
  });

  // Restore tables
  cleanHtml = cleanHtml.replace(/__TABLE_PLACEHOLDER_(\d+)__/g, (match, index) => {
    return tables[parseInt(index, 10)];
  });

  return { cleanHtml, headings };
}
