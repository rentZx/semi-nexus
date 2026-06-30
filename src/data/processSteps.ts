import type { ProcessStep } from "../types";

const titles = [
  "硅材料",
  "单晶硅棒",
  "硅片切割/抛光",
  "晶圆清洗",
  "氧化/薄膜沉积",
  "涂胶",
  "光刻",
  "显影",
  "刻蚀",
  "离子注入",
  "CMP抛光",
  "金属互连",
  "晶圆测试",
  "切割",
  "封装",
  "成品测试",
  "进入服务器/手机/汽车/工业设备",
] as const;

export const processSteps: ProcessStep[] = titles.map((title, index) => ({
  id: `step-${index + 1}`,
  title,
  order: index + 1,
  plainExplanation: `${title}是芯片制造链条中的第 ${index + 1} 步，负责把前一步结果继续加工成更接近可用芯片的形态。`,
  technicalExplanation:
    title === "光刻"
      ? "光刻通过掩膜版、光源和光刻胶把电路图形转移到晶圆表面，是图形化制造的核心步骤。"
      : title === "刻蚀"
        ? "刻蚀使用等离子体或湿法化学反应去除目标材料，对选择比、均匀性和侧壁形貌要求很高。"
        : `${title}需要与前后工艺协同控制缺陷、洁净度、均匀性和良率。`,
  relatedEquipment: ["制程设备", "检测量测设备", title.includes("测试") ? "测试机" : "自动化设备"],
  relatedMaterials: ["硅片", "电子特气", "湿电子化学品", "光刻胶"].slice(0, index % 4 + 1),
  difficulty: ["微米到纳米级控制", "洁净度要求高", "良率放大效应", "客户验证周期长"],
  relatedSegments: ["晶圆制造", title.includes("封装") ? "封装测试" : "半导体设备"],
  aShareObservation: ["设备国产化进展", "材料验证情况", "晶圆厂资本开支", "封测需求变化"],
}));
