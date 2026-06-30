import type { Segment, SegmentCategory } from "../types";

const categoryByParent: Record<string, SegmentCategory> = {
  半导体设备: "上游支撑",
  半导体材料: "上游支撑",
  "EDA/IP": "上游支撑",
  芯片设计: "中游核心",
  晶圆制造: "中游核心",
  封装测试: "中游核心",
  下游应用: "下游应用",
};

const companyMap: Record<string, Array<{ code: string; name: string }>> = {
  半导体设备: [{ code: "002371", name: "北方华创" }],
  光刻设备: [{ code: "688037", name: "芯源微" }],
  刻蚀设备: [{ code: "688012", name: "中微公司" }],
  薄膜沉积设备: [{ code: "688072", name: "拓荆科技" }],
  清洗设备: [{ code: "688082", name: "盛美上海" }],
  CMP设备: [{ code: "688120", name: "华海清科" }],
  检测量测设备: [{ code: "300567", name: "精测电子" }],
  半导体材料: [{ code: "688126", name: "沪硅产业" }],
  硅片: [{ code: "688126", name: "沪硅产业" }],
  光刻胶: [{ code: "300655", name: "晶瑞电材" }],
  电子特气: [{ code: "688268", name: "华特气体" }],
  湿电子化学品: [{ code: "300655", name: "晶瑞电材" }],
  CMP材料: [{ code: "688019", name: "安集科技" }],
  靶材: [{ code: "300666", name: "江丰电子" }],
  "EDA/IP": [{ code: "688521", name: "芯原股份" }],
  芯片设计: [{ code: "603501", name: "韦尔股份" }],
  数字芯片: [{ code: "688041", name: "海光信息" }],
  模拟芯片: [{ code: "300661", name: "圣邦股份" }],
  存储芯片: [{ code: "603986", name: "兆易创新" }],
  AI芯片: [{ code: "688256", name: "寒武纪" }],
  MCU: [{ code: "603986", name: "兆易创新" }],
  射频芯片: [{ code: "300782", name: "卓胜微" }],
  功率半导体: [{ code: "603290", name: "斯达半导" }],
  晶圆制造: [{ code: "688981", name: "中芯国际" }],
  先进制程: [{ code: "688981", name: "中芯国际" }],
  成熟制程: [{ code: "688347", name: "华虹公司" }],
  特色工艺: [{ code: "600460", name: "士兰微" }],
  封装测试: [{ code: "600584", name: "长电科技" }],
  传统封装: [{ code: "002185", name: "华天科技" }],
  先进封装: [{ code: "600584", name: "长电科技" }],
  Chiplet: [{ code: "002156", name: "通富微电" }],
  HBM相关封装: [{ code: "600584", name: "长电科技" }],
  IC载板: [{ code: "002436", name: "兴森科技" }],
  PCB: [{ code: "002463", name: "沪电股份" }],
  AI服务器: [{ code: "601138", name: "工业富联" }],
};

const segmentNames = [
  ["半导体设备", "上游支撑", undefined],
  ["光刻设备", "上游支撑", "半导体设备"],
  ["刻蚀设备", "上游支撑", "半导体设备"],
  ["薄膜沉积设备", "上游支撑", "半导体设备"],
  ["清洗设备", "上游支撑", "半导体设备"],
  ["CMP设备", "上游支撑", "半导体设备"],
  ["检测量测设备", "上游支撑", "半导体设备"],
  ["半导体材料", "上游支撑", undefined],
  ["硅片", "上游支撑", "半导体材料"],
  ["光刻胶", "上游支撑", "半导体材料"],
  ["电子特气", "上游支撑", "半导体材料"],
  ["湿电子化学品", "上游支撑", "半导体材料"],
  ["CMP材料", "上游支撑", "半导体材料"],
  ["靶材", "上游支撑", "半导体材料"],
  ["EDA/IP", "上游支撑", undefined],
  ["芯片设计", "中游核心", undefined],
  ["数字芯片", "中游核心", "芯片设计"],
  ["模拟芯片", "中游核心", "芯片设计"],
  ["存储芯片", "中游核心", "芯片设计"],
  ["AI芯片", "中游核心", "芯片设计"],
  ["MCU", "中游核心", "芯片设计"],
  ["射频芯片", "中游核心", "芯片设计"],
  ["功率半导体", "中游核心", "芯片设计"],
  ["晶圆制造", "中游核心", undefined],
  ["先进制程", "中游核心", "晶圆制造"],
  ["成熟制程", "中游核心", "晶圆制造"],
  ["特色工艺", "中游核心", "晶圆制造"],
  ["封装测试", "中游核心", undefined],
  ["传统封装", "中游核心", "封装测试"],
  ["先进封装", "中游核心", "封装测试"],
  ["Chiplet", "中游核心", "封装测试"],
  ["HBM相关封装", "中游核心", "封装测试"],
  ["IC载板", "中游核心", "封装测试"],
  ["PCB", "下游应用", "下游应用"],
  ["AI服务器", "下游应用", "下游应用"],
  ["汽车电子", "下游应用", "下游应用"],
  ["工业控制", "下游应用", "下游应用"],
  ["消费电子", "下游应用", "下游应用"],
  ["通信设备", "下游应用", "下游应用"],
] as const;

function idOf(name: string) {
  return name
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[（）()]/g, "")
    .toLowerCase();
}

export const segments: Segment[] = segmentNames.map(([name, category, parent]) => ({
  id: idOf(name),
  name,
  category,
  parent,
  summary: `${name}是半导体产业链中的${parent ?? category}环节，决定产品能力、成本结构或应用落地效率。`,
  whatItDoes:
    name === "刻蚀设备"
      ? "把晶圆表面不需要的材料去掉，将光刻形成的图形真正转移到薄膜或硅材料中。"
      : `${name}负责产业链中相对明确的一段任务，把上游资源转化为设计、制造、封装或应用所需能力。`,
  whyImportant: `${name}影响良率、性能、交付节奏和国产替代空间，是理解产业链位置时必须拆开的节点。`,
  coreBarriers: ["客户验证周期", "工艺经验积累", "可靠性与良率", "供应链协同"],
  keyMaterials: ["高纯材料", "精密零部件", "工艺耗材"],
  keyEquipment: ["制程设备", "检测设备", "自动化系统"],
  keyMetrics: ["订单与客户导入", "毛利率", "研发投入", "良率或交付能力"],
  demandDrivers: ["AI算力扩张", "国产替代", "晶圆厂资本开支", "终端应用升级"],
  riskFactors: ["下游周期波动", "客户验证慢", "技术迭代快", "外部供应限制"],
  relatedTerms: [name, parent ?? category, "良率", "国产替代"],
  exampleCompanies: companyMap[name] ?? [],
}));

export const chainGroups = [
  {
    title: "上游支撑",
    description: "设备、材料和 EDA/IP 为芯片设计与制造提供基础能力。",
    parents: ["半导体设备", "半导体材料", "EDA/IP"],
  },
  {
    title: "中游核心",
    description: "设计、晶圆制造、封装测试把需求转化为可交付芯片。",
    parents: ["芯片设计", "晶圆制造", "封装测试"],
  },
  {
    title: "下游应用",
    description: "AI服务器、汽车、工业和消费电子决定需求弹性。",
    parents: ["下游应用"],
  },
] as const;

export function getSegment(id: string) {
  return segments.find((segment) => segment.id === id);
}

export function segmentIdByName(name: string) {
  return segments.find((segment) => segment.name === name)?.id ?? idOf(name);
}

export function parentCategory(parent: string) {
  return categoryByParent[parent] ?? "下游应用";
}
