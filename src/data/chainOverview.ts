import { segmentIdByName } from "./segments";

export type ChainNodeCategory = "upstream" | "midstream" | "downstream";

export type ChainOverviewNode = {
  id: string;
  label: string;
  category: ChainNodeCategory;
  locationLabel: string;
  summary: string;
  children: string[];
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
};

export const chainOverviewNodes: ChainOverviewNode[] = [
  {
    id: "equipment",
    label: "半导体设备",
    category: "upstream",
    locationLabel: "上游支撑",
    summary: "设备决定晶圆加工、薄膜沉积、刻蚀、清洗、检测等关键工序的精度、良率和产能。",
    children: ["光刻设备", "刻蚀设备", "薄膜沉积", "清洗设备", "CMP", "检测量测"],
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
    summary: "材料是晶圆制造和封装的基础耗材，对纯度、稳定性、批量一致性和供应可靠性要求极高。",
    children: ["硅片", "光刻胶", "电子特气", "湿电子化学品", "CMP材料", "封装材料"],
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
    summary: "EDA 和 IP 是芯片设计的工具链与复用模块，决定复杂芯片能否高效完成设计、验证和流片。",
    children: ["EDA软件", "CPU IP", "GPU IP", "NPU IP", "接口IP", "验证工具"],
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
    summary: "芯片设计定义功能、架构、性能和功耗，是连接应用需求与制造能力的关键环节。",
    children: ["数字芯片", "模拟芯片", "存储芯片", "MCU", "AI芯片", "功率芯片"],
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
    summary: "晶圆制造把设计版图加工到晶圆上，是资本、工艺、设备协同和良率控制高度密集的环节。",
    children: ["先进制程", "成熟制程", "特色工艺", "存储制造", "功率器件制造", "晶圆代工"],
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
    summary: "封测把晶圆切割成芯片并完成封装、测试，是芯片进入终端产品前的关键交付环节。",
    children: ["传统封装", "先进封装", "Chiplet", "2.5D/3D封装", "SiP", "成品测试"],
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
    summary: "下游应用把算力、汽车、通信、消费电子和工业控制需求传导到芯片设计、制造和封测环节。",
    children: ["AI服务器", "数据中心", "汽车电子", "消费电子", "通信设备", "工业控制"],
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
  { id: "eda-design", source: "eda-ip", target: "design", label: "设计工具" },
  { id: "equipment-manufacturing", source: "equipment", target: "manufacturing", label: "制程工具" },
  { id: "materials-manufacturing", source: "materials", target: "manufacturing", label: "工艺耗材" },
  { id: "design-manufacturing", source: "design", target: "manufacturing", label: "版图交付" },
  { id: "manufacturing-packaging", source: "manufacturing", target: "packaging", label: "晶圆交付" },
  { id: "packaging-downstream", source: "packaging", target: "downstream", label: "产品交付" },
  { id: "downstream-design", source: "downstream", target: "design", label: "需求反馈" },
];

export function getChainOverviewNode(id?: string | null) {
  return chainOverviewNodes.find((node) => node.id === id);
}
