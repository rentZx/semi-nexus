import { segmentIdByName } from "./segments";

export type ChainNodeCategory = "upstream" | "midstream" | "downstream";
export type ChainEdgeStrength = "strong" | "weak";

export type ChainChildNode = {
  label: string;
  targets: string[];
};

export type ChainOverviewNode = {
  id: string;
  label: string;
  category: ChainNodeCategory;
  locationLabel: string;
  summary: string;
  children: string[];
  childNodes: ChainChildNode[];
  barriers: string[];
  drivers: string[];
  exampleCompanies: Array<{ name: string; code?: string }>;
  relatedThemes: string[];
  segmentId?: string;
  glossaryIds?: string[];
};

export type ChainOverviewEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
  strength: ChainEdgeStrength;
};

export const chainOverviewNodes: ChainOverviewNode[] = [
  {
    id: "equipment",
    label: "半导体设备",
    category: "upstream",
    locationLabel: "上游支撑",
    summary: "半导体设备提供晶圆制造和部分封装测试所需的关键工艺工具，是产能、良率和制程能力的基础。",
    children: ["光刻设备", "刻蚀设备", "薄膜沉积设备", "清洗设备", "CMP设备", "离子注入设备", "检测量测设备"],
    childNodes: [
      "光刻设备",
      "刻蚀设备",
      "薄膜沉积设备",
      "清洗设备",
      "CMP设备",
      "离子注入设备",
      "检测量测设备",
    ].map((label) => ({ label, targets: ["manufacturing"] })),
    barriers: ["工艺精度", "设备稳定性", "客户验证周期", "制程适配能力"],
    drivers: ["晶圆厂扩产", "先进制程推进", "国产替代", "成熟制程扩产"],
    exampleCompanies: [
      { name: "北方华创", code: "002371" },
      { name: "中微公司", code: "688012" },
      { name: "拓荆科技", code: "688072" },
      { name: "华海清科", code: "688120" },
    ],
    relatedThemes: ["设备扩产", "先进制程", "国产替代"],
    segmentId: segmentIdByName("半导体设备"),
  },
  {
    id: "materials",
    label: "半导体材料",
    category: "upstream",
    locationLabel: "上游支撑",
    summary: "半导体材料覆盖晶圆制造耗材和封装材料，核心要求是纯度、稳定性、批量一致性和长期供货能力。",
    children: ["硅片", "光刻胶", "电子特气", "湿电子化学品", "CMP材料", "靶材", "封装材料", "ABF载板"],
    childNodes: [
      { label: "硅片", targets: ["manufacturing"] },
      { label: "光刻胶", targets: ["manufacturing"] },
      { label: "电子特气", targets: ["manufacturing"] },
      { label: "湿电子化学品", targets: ["manufacturing"] },
      { label: "CMP材料", targets: ["manufacturing"] },
      { label: "靶材", targets: ["manufacturing"] },
      { label: "封装材料", targets: ["packaging"] },
      { label: "ABF载板", targets: ["packaging"] },
    ],
    barriers: ["材料纯度", "批次一致性", "客户认证", "长期供货能力"],
    drivers: ["晶圆制造扩产", "材料国产替代", "先进封装", "AI服务器"],
    exampleCompanies: [
      { name: "沪硅产业", code: "688126" },
      { name: "安集科技", code: "688019" },
      { name: "江丰电子", code: "300666" },
    ],
    relatedThemes: ["材料认证", "先进封装", "供应链安全"],
    segmentId: segmentIdByName("半导体材料"),
  },
  {
    id: "eda-ip",
    label: "EDA/IP",
    category: "upstream",
    locationLabel: "上游设计基础",
    summary: "EDA/IP 是芯片设计的工具链和可复用模块，统一支撑芯片设计环节完成架构、验证和流片准备。",
    children: ["EDA软件", "CPU IP", "GPU IP", "NPU IP", "存储IP", "接口IP", "验证工具"],
    childNodes: ["EDA软件", "CPU IP", "GPU IP", "NPU IP", "存储IP", "接口IP", "验证工具"].map((label) => ({
      label,
      targets: ["design"],
    })),
    barriers: ["工具链生态", "算法积累", "IP复用能力", "客户迁移成本"],
    drivers: ["高复杂度芯片", "AI芯片设计", "国产设计工具", "接口协议升级"],
    exampleCompanies: [{ name: "芯原股份", code: "688521" }],
    relatedThemes: ["设计工具", "IP授权", "AI芯片"],
    segmentId: segmentIdByName("EDA/IP"),
  },
  {
    id: "design",
    label: "芯片设计",
    category: "midstream",
    locationLabel: "中游核心",
    summary: "芯片设计定义功能、架构、性能和功耗，输出版图并流向晶圆制造。",
    children: ["数字芯片", "模拟芯片", "存储芯片", "MCU", "AI芯片", "射频芯片", "功率芯片"],
    childNodes: ["数字芯片", "模拟芯片", "存储芯片", "MCU", "AI芯片", "射频芯片", "功率芯片"].map((label) => ({
      label,
      targets: ["manufacturing"],
    })),
    barriers: ["架构设计", "IP积累", "算法能力", "生态适配"],
    drivers: ["AI算力", "汽车电子", "消费电子", "工业控制", "国产替代"],
    exampleCompanies: [
      { name: "韦尔股份", code: "603501" },
      { name: "兆易创新", code: "603986" },
      { name: "澜起科技", code: "688008" },
      { name: "寒武纪", code: "688256" },
    ],
    relatedThemes: ["AI芯片", "国产CPU", "模拟芯片", "汽车电子"],
    segmentId: segmentIdByName("芯片设计"),
  },
  {
    id: "manufacturing",
    label: "晶圆制造",
    category: "midstream",
    locationLabel: "中游核心",
    summary: "晶圆制造把设计版图加工到晶圆上，是设备、材料、工艺、资本和良率控制高度密集的环节。",
    children: ["先进制程", "成熟制程", "特色工艺", "晶圆代工", "存储制造", "功率器件制造", "IDM制造"],
    childNodes: ["先进制程", "成熟制程", "特色工艺", "晶圆代工", "存储制造", "功率器件制造", "IDM制造"].map((label) => ({
      label,
      targets: ["packaging"],
    })),
    barriers: ["制程能力", "良率控制", "设备协同", "资本投入"],
    drivers: ["AI芯片", "汽车电子", "工业控制", "国产制造能力建设"],
    exampleCompanies: [
      { name: "中芯国际", code: "688981" },
      { name: "华虹公司", code: "688347" },
      { name: "晶合集成", code: "688249" },
    ],
    relatedThemes: ["晶圆代工", "成熟制程", "特色工艺"],
    segmentId: segmentIdByName("晶圆制造"),
  },
  {
    id: "packaging",
    label: "封装测试",
    category: "midstream",
    locationLabel: "中游交付",
    summary: "封装测试把晶圆切割成芯片，并完成封装、晶圆测试和成品测试，最终流向下游应用。",
    children: ["传统封装", "先进封装", "Chiplet", "2.5D/3D封装", "SiP", "晶圆测试", "成品测试"],
    childNodes: ["传统封装", "先进封装", "Chiplet", "2.5D/3D封装", "SiP", "晶圆测试", "成品测试"].map((label) => ({
      label,
      targets: ["downstream"],
    })),
    barriers: ["封装良率", "先进封装工艺", "客户认证", "测试能力"],
    drivers: ["AI芯片", "HBM", "高性能计算", "服务器升级"],
    exampleCompanies: [
      { name: "长电科技", code: "600584" },
      { name: "通富微电", code: "002156" },
      { name: "华天科技", code: "002185" },
    ],
    relatedThemes: ["先进封装", "Chiplet", "HBM"],
    segmentId: segmentIdByName("封装测试"),
  },
  {
    id: "downstream",
    label: "下游应用",
    category: "downstream",
    locationLabel: "需求牵引",
    summary: "下游应用聚合 AI、汽车、通信、消费电子、工业控制和新能源等终端场景，承接封装测试后的芯片产品。",
    children: ["AI服务器", "汽车电子", "智能手机", "工业控制", "消费电子", "通信设备", "新能源"],
    childNodes: ["AI服务器", "汽车电子", "智能手机", "工业控制", "消费电子", "通信设备", "新能源"].map((label) => ({
      label,
      targets: [],
    })),
    barriers: ["场景验证", "可靠性要求", "成本控制", "供应链协同"],
    drivers: ["大模型训练", "推理部署", "智能驾驶", "终端升级", "工业自动化"],
    exampleCompanies: [
      { name: "工业富联", code: "601138" },
      { name: "沪电股份", code: "002463" },
      { name: "深南电路", code: "002916" },
    ],
    relatedThemes: ["AI算力", "汽车电子", "高速互联", "终端应用"],
    segmentId: segmentIdByName("AI服务器"),
  },
];

export const chainOverviewEdges: ChainOverviewEdge[] = [
  { id: "eda-design", source: "eda-ip", target: "design", label: "设计工具", strength: "strong" },
  { id: "equipment-manufacturing", source: "equipment", target: "manufacturing", label: "制程工具", strength: "strong" },
  { id: "materials-manufacturing", source: "materials", target: "manufacturing", label: "工艺耗材", strength: "strong" },
  { id: "design-manufacturing", source: "design", target: "manufacturing", label: "版图流片", strength: "strong" },
  { id: "manufacturing-packaging", source: "manufacturing", target: "packaging", label: "晶圆交付", strength: "strong" },
  { id: "packaging-downstream", source: "packaging", target: "downstream", label: "产品交付", strength: "strong" },
  { id: "equipment-packaging", source: "equipment", target: "packaging", label: "封测设备", strength: "weak" },
  { id: "materials-packaging", source: "materials", target: "packaging", label: "封装材料", strength: "weak" },
];

export const strongChainOverviewEdges = chainOverviewEdges.filter((edge) => edge.strength === "strong");
export const weakChainOverviewEdges = chainOverviewEdges.filter((edge) => edge.strength === "weak");

export function getChainOverviewNode(id?: string | null) {
  return chainOverviewNodes.find((node) => node.id === id);
}
