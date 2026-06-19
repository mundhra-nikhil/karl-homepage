export interface Chapter {
  timestamp: number;
  title: string;
  description: string;
}

/** Chapter markers for the demo video */
export const chapters: Chapter[] = [
  { timestamp: 0,  title: "Connect to data source", description: "0:00 - 0:10" },
  { timestamp: 10, title: "Knowledge graphs",        description: "0:10 - 0:20" },
  { timestamp: 20, title: "Telemetry insights",      description: "0:20 - 0:28" },
  { timestamp: 28, title: "Prompting to Karl",       description: "0:28 - end"  },
];
