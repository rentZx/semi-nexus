import { segmentIdByName } from "./segments";

export type AiNodeLayer = "core" | "interconnect" | "thermal";

export type AiLandscapeNode = {
  id: string;
  label: string;
  layer: AiNodeLayer;
  category: string;
  summary: string;
  whyImportant: string;
  relatedNodes: string[];
  benefitLogic: string;
  relatedCompanies: Array<{ name: string; code?: string }>;
  relatedTerms: string[];
  risks: string[];
  segmentId?: string;
  glossaryIds?: string[];
};

export type AiLandscapeEdge = {
  id: string;
  source: string;
  target: string;
  path: "compute" | "optical" | "thermal";
};

export const aiLandscapeNodes: AiLandscapeNode[] = [
  {
    id: "ai-chip",
    label: "AI芯片",
    layer: "core",
    category: "核心算力链",
    summary: "GPU、ASIC、NPU 等算力芯片是 AI 训练和推理的计算起点。",
    whyImportant: "它决定单机算力、能效、软件生态和服务器配置，是整条 AI 基础设施链路的需求源头。",
    relatedNodes: ["hbm", "advanced-packaging", "ai-server"],
    benefitLogic: "算力需求上升会向 HBM、先进封装、载板、PCB 和整机系统传导。",
    relatedCompanies: [
      { name: "寒武纪", code: "688256" },
      { name: "海光信息", code: "688041" },
      { name: "澜起科技", code: "688008" },
    ],
    relatedTerms: ["GPU", "NPU", "ASIC", "AI服务器"],
    risks: ["研发周期长", "生态迁移成本高", "客户验证慢"],
    segmentId: segmentIdByName("AI芯片"),
  },
  {
    id: "hbm",
    label: "HBM",
    layer: "core",
    category: "核心算力链",
    summary: "HBM 是面向高性能计算的高带宽存储方案，常与高端 AI 芯片协同封装。",
    whyImportant: "训练和推理需要大量数据快速进入计算芯片，HBM 提供更高带宽和更短互连距离。",
    relatedNodes: ["ai-chip", "advanced-packaging"],
    benefitLogic: "高端算力芯片需求提升，会同步推动高带宽存储和封装协同能力升级。",
    relatedCompanies: [
      { name: "长电科技", code: "600584" },
      { name: "通富微电", code: "002156" },
    ],
    relatedTerms: ["HBM", "DRAM", "先进封装", "CoWoS"],
    risks: ["技术门槛高", "供应集中", "产能周期波动"],
    segmentId: segmentIdByName("HBM相关封装"),
  },
  {
    id: "advanced-packaging",
    label: "先进封装",
    layer: "core",
    category: "核心算力链",
    summary: "先进封装通过高密度互连把计算芯片、存储和其他功能单元集成到一起。",
    whyImportant: "AI 芯片对带宽、能效和集成密度要求高，先进封装是系统性能的重要约束。",
    relatedNodes: ["ai-chip", "hbm", "ic-substrate"],
    benefitLogic: "芯片复杂度提高，会推动 Chiplet、2.5D/3D 与高密度封装能力提升。",
    relatedCompanies: [
      { name: "长电科技", code: "600584" },
      { name: "通富微电", code: "002156" },
      { name: "华天科技", code: "002185" },
    ],
    relatedTerms: ["Chiplet", "CoWoS", "2.5D封装", "HBM"],
    risks: ["工艺复杂", "良率爬坡", "客户认证周期"],
    segmentId: segmentIdByName("先进封装"),
  },
  {
    id: "ic-substrate",
    label: "IC载板/ABF",
    layer: "core",
    category: "核心算力链",
    summary: "IC 载板连接芯片封装和 PCB，是高端处理器封装中的高密度基板。",
    whyImportant: "高性能处理器对载板层数、线宽线距、可靠性和材料稳定性要求更高。",
    relatedNodes: ["advanced-packaging", "pcb"],
    benefitLogic: "高端封装复杂度提升，会带动 ABF 等高端载板能力建设。",
    relatedCompanies: [
      { name: "兴森科技", code: "002436" },
      { name: "深南电路", code: "002916" },
    ],
    relatedTerms: ["IC载板", "ABF载板", "PCB"],
    risks: ["良率爬坡", "设备材料约束", "客户认证"],
    segmentId: segmentIdByName("IC载板"),
  },
  {
    id: "pcb",
    label: "PCB/高速板",
    layer: "core",
    category: "核心算力链",
    summary: "PCB 和高速板承载服务器内部高速信号、电源和模块连接。",
    whyImportant: "AI 服务器高速互连密度高，对层数、材料、信号完整性和可靠性提出更高要求。",
    relatedNodes: ["ic-substrate", "ai-server", "optical-cpo"],
    benefitLogic: "AI 服务器放量会提升高端 PCB 和高速材料的价值占比。",
    relatedCompanies: [
      { name: "沪电股份", code: "002463" },
      { name: "深南电路", code: "002916" },
      { name: "生益科技", code: "600183" },
    ],
    relatedTerms: ["PCB", "高速板", "服务器主板"],
    risks: ["服务器需求波动", "材料成本", "产能扩张"],
    segmentId: segmentIdByName("PCB"),
  },
  {
    id: "ai-server",
    label: "AI服务器",
    layer: "core",
    category: "系统承载",
    summary: "AI 服务器把芯片、存储、PCB、散热、电源和网络整合为可部署的算力系统。",
    whyImportant: "它是硬件链路从器件走向数据中心的系统入口，也是多条分支链路的交汇点。",
    relatedNodes: ["pcb", "data-center", "optical-cpo", "liquid-cooling", "server-power"],
    benefitLogic: "云厂商和企业 AI 投入提升，会推动整机与上游链路协同升级。",
    relatedCompanies: [
      { name: "工业富联", code: "601138" },
      { name: "深科技", code: "000021" },
    ],
    relatedTerms: ["AI服务器", "液冷", "光模块", "PCB"],
    risks: ["客户集中", "交付节奏波动", "供应链协同"],
    segmentId: segmentIdByName("AI服务器"),
  },
  {
    id: "data-center",
    label: "数据中心",
    layer: "core",
    category: "算力承载",
    summary: "数据中心集中部署 AI 服务器、网络、电力和冷却系统，承载训练与推理任务。",
    whyImportant: "它决定算力从硬件到服务的部署规模、能源约束和网络效率。",
    relatedNodes: ["ai-server", "optical-cpo", "liquid-cooling"],
    benefitLogic: "模型训练和推理需求提升，会推动数据中心扩容和基础设施升级。",
    relatedCompanies: [{ name: "工业富联", code: "601138" }],
    relatedTerms: ["数据中心", "AI服务器", "液冷"],
    risks: ["电力约束", "建设周期", "资本开支波动"],
    segmentId: segmentIdByName("AI服务器"),
  },
  {
    id: "optical-cpo",
    label: "光模块/CPO",
    layer: "interconnect",
    category: "光通信链",
    summary: "光模块和 CPO 承担数据中心高速互连，支撑服务器集群之间的数据传输。",
    whyImportant: "AI 集群需要大量节点协同，网络带宽会影响集群训练和推理效率。",
    relatedNodes: ["ai-server", "dc-interconnect", "data-center"],
    benefitLogic: "集群规模扩大，会提升高速光互连和低功耗传输方案的重要性。",
    relatedCompanies: [],
    relatedTerms: ["光模块", "CPO", "数据中心互联"],
    risks: ["技术路线变化", "价格竞争", "客户集中"],
  },
  {
    id: "dc-interconnect",
    label: "数据中心互联",
    layer: "interconnect",
    category: "光通信链",
    summary: "数据中心互联连接服务器、交换机和集群节点，是算力资源调度的网络基础。",
    whyImportant: "互联效率越高，计算资源越容易形成集群能力，减少等待和通信瓶颈。",
    relatedNodes: ["optical-cpo", "data-center"],
    benefitLogic: "算力集群规模提升，会强化高速互联、交换和光电转换需求。",
    relatedCompanies: [],
    relatedTerms: ["交换机", "光互联", "数据中心"],
    risks: ["网络架构迭代", "部署节奏", "成本压力"],
  },
  {
    id: "liquid-cooling",
    label: "液冷散热",
    layer: "thermal",
    category: "散热电源链",
    summary: "液冷散热用于处理高功耗 AI 服务器的热管理问题，保障系统稳定运行。",
    whyImportant: "功耗密度提升后，散热能力会直接限制服务器部署密度和稳定性。",
    relatedNodes: ["ai-server", "data-center", "server-power"],
    benefitLogic: "AI 服务器功耗提升，会推动热管理方案从风冷向液冷等方案升级。",
    relatedCompanies: [],
    relatedTerms: ["液冷", "热管理", "数据中心"],
    risks: ["技术路线选择", "改造成本", "维护复杂度"],
  },
  {
    id: "server-power",
    label: "服务器电源",
    layer: "thermal",
    category: "散热电源链",
    summary: "服务器电源为 AI 服务器提供高效率、高可靠性的电力转换和供电能力。",
    whyImportant: "电源效率和稳定性影响整机能耗、可靠性和数据中心能源利用效率。",
    relatedNodes: ["ai-server", "liquid-cooling", "power-device"],
    benefitLogic: "高功耗服务器部署增加，会带动高效率电源与功率器件升级。",
    relatedCompanies: [],
    relatedTerms: ["服务器电源", "功率器件", "SiC", "GaN"],
    risks: ["成本压力", "认证周期", "需求节奏"],
  },
  {
    id: "power-device",
    label: "功率器件",
    layer: "thermal",
    category: "散热电源链",
    summary: "功率器件承担电能转换和控制，是服务器电源和数据中心供电系统的底层元件。",
    whyImportant: "高效电能转换能降低能耗和热负载，对大规模 AI 数据中心尤其重要。",
    relatedNodes: ["server-power"],
    benefitLogic: "电源效率要求提升，会推动 MOSFET、IGBT、SiC、GaN 等器件迭代。",
    relatedCompanies: [
      { name: "斯达半导", code: "603290" },
      { name: "新洁能", code: "605111" },
    ],
    relatedTerms: ["功率半导体", "SiC", "GaN"],
    risks: ["价格波动", "技术路线变化", "下游采购节奏"],
    segmentId: segmentIdByName("功率半导体"),
  },
];

export const aiLandscapeEdges: AiLandscapeEdge[] = [
  { id: "chip-hbm", source: "ai-chip", target: "hbm", path: "compute" },
  { id: "hbm-packaging", source: "hbm", target: "advanced-packaging", path: "compute" },
  { id: "packaging-substrate", source: "advanced-packaging", target: "ic-substrate", path: "compute" },
  { id: "substrate-pcb", source: "ic-substrate", target: "pcb", path: "compute" },
  { id: "pcb-server", source: "pcb", target: "ai-server", path: "compute" },
  { id: "server-datacenter", source: "ai-server", target: "data-center", path: "compute" },
  { id: "server-optical", source: "ai-server", target: "optical-cpo", path: "optical" },
  { id: "optical-interconnect", source: "optical-cpo", target: "dc-interconnect", path: "optical" },
  { id: "interconnect-datacenter", source: "dc-interconnect", target: "data-center", path: "optical" },
  { id: "server-cooling", source: "ai-server", target: "liquid-cooling", path: "thermal" },
  { id: "cooling-power", source: "liquid-cooling", target: "server-power", path: "thermal" },
  { id: "power-device", source: "server-power", target: "power-device", path: "thermal" },
];

export function getAiLandscapeNode(id?: string | null) {
  return aiLandscapeNodes.find((node) => node.id === id);
}
