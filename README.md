# 半导体产业链学习地图

一个中文网页版学习工具，用于理解半导体产业链结构、细分环节、A 股公司产业位置、AI 算力链条、术语和学习路线。

## 技术栈

- React + TypeScript + Vite
- React Router
- Tailwind CSS
- lucide-react
- Recharts
- 本地 TypeScript 数据文件

## 功能模块

- 首页 `/`
- 产业链交互地图 `/chain`
- 制造工艺流程 `/process`
- 细分环节知识库 `/segments`、`/segments/:id`
- A 股产业链映射 `/companies`、`/companies/:code`
- AI 算力专题 `/ai-computing`
- 术语词典 `/glossary`
- 学习路线 `/learn`
- 产业链小测验 `/quiz`
- 关于页面 `/about`

## 安装与启动

```bash
npm install
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```

## 目录结构

```text
src/
  components/
  data/
  hooks/
  layouts/
  pages/
  styles/
  types/
  utils/
```

## 数据说明

所有数据均为本地学习用途的 TypeScript 数据，不接入后端、数据库、登录系统、实时行情或第三方财经 API。

## 免责声明

本项目仅作半导体产业链学习映射，不构成投资建议，不提供交易决策依据。

## 后续规划

- 支持导入 CSV / Excel 公司数据
- 支持用户自定义关注公司和研究笔记
- 支持深色模式
- 增加财务指标和营收结构等学习型数据模块
