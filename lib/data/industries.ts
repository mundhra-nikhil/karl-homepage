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
    image: "/industries/automotive.avif",
  },
  {
    id: "banking",
    name: "Banking",
    description: "Transform operations seamlessly with secure & compliant analytics.",
    image: "/industries/banking.jpg",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Modernize systems, automate workflows, make faster decisions.",
    image: "/industries/healthcare.avif",
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Automate claims, enhance underwriting, personalize customer engagement.",
    image: "/industries/insurance.jpg",
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    description: "Modernize operations for faster decisions, better forecasting.",
    image: "/industries/logistics.jpg",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Boost production speed, reduce downtime, improve forecast accuracy.",
    image: "/industries/manufacturing.jpg",
  },
  {
    id: "pharma",
    name: "Pharma",
    description: "Accelerate research, improve efficiency, deliver faster.",
    image: "/industries/pharma.jpg",
  },
  {
    id: "retail",
    name: "Retail & FMCG",
    description: "Digitize operations, automate tasks, deliver stronger customer connections.",
    image: "/industries/retail.jpg",
  },
];
