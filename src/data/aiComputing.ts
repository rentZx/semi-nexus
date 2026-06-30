export const aiNodes = [
  { id: "ai-chip", title: "AI芯片", text: "GPU、ASIC、NPU 提供训练和推理算力，是链条需求源头。" },
  { id: "hbm", title: "HBM", text: "高带宽存储缓解数据搬运瓶颈，决定算力利用率。" },
  { id: "advanced-packaging", title: "先进封装", text: "让 AI 芯片与 HBM 以更短路径互连，降低延迟和功耗。" },
  { id: "chiplet", title: "Chiplet / CoWoS", text: "把多个芯粒和 HBM 集成在一起，是高性能计算的重要路径。" },
  { id: "substrate", title: "IC载板", text: "承接芯片封装和 PCB 之间的高密度连接。" },
  { id: "pcb", title: "PCB", text: "高速板、HDI 和服务器主板承载数据中心硬件连接。" },
  { id: "optical", title: "光模块", text: "负责服务器和交换机之间的高速光互连。" },
  { id: "thermal", title: "散热 / 电源", text: "高功耗系统需要液冷、导热材料和高效率电源。" },
  { id: "server", title: "AI服务器", text: "整机和数据中心把芯片、存储、网络、电源组合成算力基础设施。" },
] as const;

export const aiQuestions = [
  ["AI 芯片为什么需要先进封装？", "单颗芯片面积和互连能力存在限制，先进封装能把计算芯片与 HBM 更紧密连接，提升带宽并降低功耗。"],
  ["HBM 为什么重要？", "AI 训练需要持续搬运大规模参数和数据，HBM 提供高带宽，减少算力等待数据的时间。"],
  ["Chiplet 是什么？", "Chiplet 是把多个功能芯粒组合成系统的方式，有助于提高良率、复用模块并提升系统性能。"],
  ["CoWoS 类封装为什么重要？", "它能把 GPU、ASIC 与 HBM 集成到高密度互连结构中，是 AI 加速卡的重要封装路径。"],
  ["AI 服务器为什么带动 PCB、载板、散热、电源？", "AI 服务器功耗高、信号速率高、结构复杂，需要高速 PCB、封装基板、热管理和高效率电源共同支撑。"],
  ["哪些环节更具弹性？", "先进封装、HBM、IC 载板、高速 PCB、光模块等环节通常对 AI 服务器放量更敏感。"],
] as const;
