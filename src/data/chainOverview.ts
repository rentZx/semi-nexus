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
    summary: "芯片制造过程中的核心工具，决定晶圆加工精度、良率和产能。",
    children: ["光刻设备", "刻蚀设备", "薄膜沉积设备", "清洗设备", "CMP设备", "离子注入设备", "检测量测设备"],
    barriers: ["工艺精度", "设备稳定性", "客户验证周期", "制程适配能力"],
    drivers: ["晶圆厂扩产", "先进制程推进", "国产替代", "成熟制程扩产"],
    exampleCompanies: [
      { name: "北方华创", code: "002371" },
      { name: "中微公司", code: "688012" },
      { name: "拓荆科技", code: "688072" },
      { name: "芯源微", code: "688037" },
      { name: "盛美上海", code: "688082" },
      { name: "华海清科", code: "688120" },
    ],
    relatedThemes: ["国产替代", "设备扩产", "先进制程", "成熟制程"],
    segmentId: segmentIdByName("半导体设备"),
    glossaryIds: ["刻蚀", "光刻", "CMP"],
  },
  {
    id: "materials",
    label: "半导体材料",
    category: "upstream",
    locationLabel: "上游支撑",
    summary: "芯片制造的基础耗材，对纯度、稳定性和批量一致性要求极高。",
    children: ["硅片", "光刻胶", "电子特气", "湿电子化学品", "CMP材料", "靶材", "封装材料", "ABF载板"],
    barriers: ["材料纯度", "批次一致性", "客户认证", "长期供货能力"],
    drivers: ["晶圆制造扩产", "材料国产替代", "先进封装", "AI服务器"],
    exampleCompanies: [
      { name: "沪硅产业", code: "688126" },
      { name: "立昂微", code: "605358" },
      { name: "安集科技", code: "688019" },
      { name: "江丰电子", code: "300666" },
      { name: "雅克科技", code: "002409" },
      { name: "彤程新材", code: "603650" },
    ],
    relatedThemes: ["国产替代", "材料认证", "先进封装", "AI算力"],
    segmentId: segmentIdByName("半导体材料"),
    glossaryIds: ["光刻胶", "ABF载板", "IC载板"],
  },
  {
    id: "eda-ip",
    label: "EDA/IP",
    category: "upstream",
    locationLabel: "上游支撑",
    summary: "芯片设计的软件工具和可复用模块，是复杂芯片设计效率的基础。",
    children: ["EDA软件", "CPU IP", "GPU IP", "NPU IP", "存储IP", "接口IP", "验证工具"],
    barriers: ["工具链生态", "算法积累", "IP复用能力", "客户迁移成本"],
    drivers: ["高复杂度芯片", "国产设计工具", "AI芯片设计", "接口协议升级"],
    exampleCompanies: [{ name: "芯原股份", code: "688521" }],
    relatedThemes: ["设计工具", "IP授权", "国产替代", "AI芯片"],
    segmentId: segmentIdByName("EDA/IP"),
    glossaryIds: ["EDA", "IP核", "SoC"],
  },
  {
    id: "design",
    label: "芯片设计",
    category: "midstream",
    locationLabel: "中游核心",
    summary: "定义芯片功能、电路结构和性能，是最靠近产品定义的一环。",
    children: ["数字芯片", "模拟芯片", "存储芯片", "MCU", "AI芯片", "射频芯片", "功率芯片"],
    barriers: ["架构设计", "IP积累", "算法能力", "生态适配"],
    drivers: ["AI算力", "汽车电子", "消费电子", "工业控制", "国产替代"],
    exampleCompanies: [
      { name: "韦尔股份", code: "603501" },
      { name: "兆易创新", code: "603986" },
      { name: "澜起科技", code: "688008" },
      { name: "寒武纪", code: "688256" },
      { name: "海光信息", code: "688041" },
      { name: "圣邦股份", code: "300661" },
    ],
    relatedThemes: ["AI芯片", "国产CPU", "存储", "模拟芯片", "汽车电子"],
    segmentId: segmentIdByName("芯片设计"),
    glossaryIds: ["Fabless", "GPU", "NPU", "ASIC"],
  },
  {
    id: "manufacturing",
    label: "晶圆制造",
    category: "midstream",
    locationLabel: "中游核心",
    summary: "把芯片设计图形加工到晶圆上，是资本和技术密集度极高的环节。",
    children: ["先进制程", "成熟制程", "特色工艺", "存储制造", "功率器件制造", "晶圆代工", "IDM制造"],
    barriers: ["制程能力", "良率控制", "设备协同", "资本投入"],
    drivers: ["AI芯片", "汽车电子", "工业控制", "国产制造能力建设"],
    exampleCompanies: [
      { name: "中芯国际", code: "688981" },
      { name: "华虹公司", code: "688347" },
      { name: "晶合集成", code: "688249" },
      { name: "华润微", code: "688396" },
      { name: "士兰微", code: "600460" },
    ],
    relatedThemes: ["晶圆代工", "成熟制程", "特色工艺", "国产制造"],
    segmentId: segmentIdByName("晶圆制造"),
    glossaryIds: ["Foundry", "IDM", "良率", "制程节点"],
  },
  {
    id: "packaging",
    label: "封装测试",
    category: "midstream",
    locationLabel: "中游核心",
    summary: "把晶圆切割成芯片并完成封装、测试，是进入终端产品前的关键环节。",
    children: ["传统封装", "先进封装", "Chiplet", "2.5D/3D封装", "SiP", "晶圆测试", "成品测试"],
    barriers: ["封装良率", "先进封装工艺", "客户认证", "测试能力"],
    drivers: ["AI芯片", "HBM", "高性能计算", "存储", "服务器升级"],
    exampleCompanies: [
      { name: "长电科技", code: "600584" },
      { name: "通富微电", code: "002156" },
      { name: "华天科技", code: "002185" },
      { name: "甬矽电子", code: "688362" },
      { name: "伟测科技", code: "688372" },
    ],
    relatedThemes: ["先进封装", "AI算力", "Chiplet", "HBM", "存储周期"],
    segmentId: segmentIdByName("封装测试"),
    glossaryIds: ["先进封装", "Chiplet", "CoWoS", "HBM"],
  },
  {
    id: "ai-server",
    label: "AI服务器",
    category: "downstream",
    locationLabel: "下游应用",
    summary: "承载 AI 训练和推理任务，向上拉动芯片、存储、封装、PCB、散热和电源。",
    children: ["GPU服务器", "AI加速卡", "高速PCB", "液冷散热", "服务器电源", "数据中心"],
    barriers: ["系统集成", "供应链协同", "散热设计", "高速互连"],
    drivers: ["大模型训练", "推理部署", "云厂商资本开支", "数据中心扩张"],
    exampleCompanies: [
      { name: "工业富联", code: "601138" },
      { name: "沪电股份", code: "002463" },
      { name: "深南电路", code: "002916" },
    ],
    relatedThemes: ["AI算力", "高速互连", "液冷", "服务器"],
    segmentId: segmentIdByName("AI服务器"),
    glossaryIds: ["AI服务器", "PCB", "光模块", "液冷"],
  },
  {
    id: "automotive",
    label: "汽车电子",
    category: "downstream",
    locationLabel: "下游应用",
    summary: "汽车电动化和智能化带动功率、MCU、传感器和智能驾驶芯片需求。",
    children: ["功率半导体", "MCU", "车规芯片", "传感器", "智能驾驶芯片", "SiC / GaN"],
    barriers: ["车规认证", "可靠性", "长周期供货", "安全冗余"],
    drivers: ["新能源车", "智能驾驶", "电驱系统", "座舱升级"],
    exampleCompanies: [
      { name: "斯达半导", code: "603290" },
      { name: "时代电气", code: "688187" },
      { name: "韦尔股份", code: "603501" },
    ],
    relatedThemes: ["功率半导体", "汽车电子", "SiC", "智能驾驶"],
    segmentId: segmentIdByName("汽车电子"),
    glossaryIds: ["功率半导体", "SiC", "GaN", "MCU"],
  },
  {
    id: "consumer",
    label: "消费/通信/新能源",
    category: "downstream",
    locationLabel: "下游应用",
    summary: "智能手机、消费电子、通信设备和新能源构成半导体需求的广阔终端场景。",
    children: ["智能手机", "消费电子", "通信设备", "工业控制", "新能源", "边缘设备"],
    barriers: ["成本控制", "产品迭代", "渠道周期", "可靠性"],
    drivers: ["终端换机", "通信升级", "新能源扩张", "工业自动化"],
    exampleCompanies: [
      { name: "鹏鼎控股", code: "002938" },
      { name: "景旺电子", code: "603228" },
      { name: "扬杰科技", code: "300373" },
    ],
    relatedThemes: ["通信设备", "消费电子", "工业控制", "新能源"],
    segmentId: segmentIdByName("消费电子"),
    glossaryIds: ["SoC", "MCU", "功率半导体"],
  },
];

export const chainOverviewEdges: ChainOverviewEdge[] = [
  { id: "equipment-manufacturing", source: "equipment", target: "manufacturing", label: "制程工具" },
  { id: "materials-manufacturing", source: "materials", target: "manufacturing", label: "工艺耗材" },
  { id: "eda-design", source: "eda-ip", target: "design", label: "设计工具" },
  { id: "design-manufacturing", source: "design", target: "manufacturing", label: "版图制造" },
  { id: "manufacturing-packaging", source: "manufacturing", target: "packaging", label: "晶圆交付" },
  { id: "packaging-ai-server", source: "packaging", target: "ai-server", label: "算力封装" },
  { id: "design-automotive", source: "design", target: "automotive", label: "芯片定义" },
  { id: "packaging-consumer", source: "packaging", target: "consumer", label: "终端供给" },
  { id: "manufacturing-automotive", source: "manufacturing", target: "automotive", label: "车规制造" },
];

export function getChainOverviewNode(id?: string | null) {
  return chainOverviewNodes.find((node) => node.id === id);
}
