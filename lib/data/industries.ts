export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const industries: Industry[] = [
  {
    id: "automotive",
    name: "Automotive",
    description: "Accelerate production, optimize operations, create smarter CX.",
    image: "/industries/automotive.png",
  },
  {
    id: "banking",
    name: "Banking",
    description: "Transform operations seamlessly with secure & compliant analytics.",
    image: "/industries/banking.png",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Modernize systems, automate workflows, make faster decisions.",
    image: "/industries/healthcare.png",
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Automate claims, enhance underwriting, personalize customer engagement.",
    image: "/industries/insurance.png",
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    description: "Modernize operations for faster decisions, better forecasting.",
    image: "/industries/logistics.png",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Boost production speed, reduce downtime, improve forecast accuracy.",
    image: "/industries/manufacturing.png",
  },
  {
    id: "pharma",
    name: "Pharma",
    description: "Accelerate research, improve efficiency, deliver faster.",
    image: "/industries/pharma.png",
  },
  {
    id: "retail",
    name: "Retail & FMCG",
    description: "Digitize operations, automate tasks, deliver stronger customer connections.",
    image: "/industries/retail.png",
  },
];
