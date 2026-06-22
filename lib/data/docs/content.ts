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
