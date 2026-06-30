export type SegmentCategory = "上游支撑" | "中游核心" | "下游应用";

export type Market = "A股" | "港股" | "美股" | "全球";

export type CompanyRef = {
  code: string;
  name: string;
};

export type Segment = {
  id: string;
  name: string;
  category: SegmentCategory;
  parent?: string;
  summary: string;
  whatItDoes: string;
  whyImportant: string;
  coreBarriers: string[];
  keyMaterials?: string[];
  keyEquipment?: string[];
  keyMetrics: string[];
  demandDrivers: string[];
  riskFactors: string[];
  relatedTerms: string[];
  exampleCompanies: CompanyRef[];
};

export type Company = {
  code: string;
  name: string;
  market: Market;
  segmentIds: string[];
  mainBusiness: string;
  keyProducts: string[];
  relatedThemes: string[];
  upstream?: string[];
  downstream?: string[];
  investmentTags: string[];
  observationMetrics: string[];
  notThis: string[];
  risks: string[];
  note: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  alias?: string[];
  category: string;
  plainExplanation: string;
  technicalExplanation: string;
  relatedSegments: string[];
  relatedTerms: string[];
  example: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  order: number;
  plainExplanation: string;
  technicalExplanation: string;
  relatedEquipment: string[];
  relatedMaterials: string[];
  difficulty: string[];
  relatedSegments: string[];
  aShareObservation: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  relatedSegmentIds?: string[];
  relatedGlossaryIds?: string[];
};
