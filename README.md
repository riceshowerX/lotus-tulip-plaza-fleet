# Lotus Tulip Plaza Fleet

一个基于 React、TypeScript 与 Canvas 的鸟群（Boids）集群运动模拟器。项目以深色夜空为背景，将分离（Separation）、对齐（Alignment）和聚合（Cohesion）等经典群体行为可视化，并提供实时交互控制。

> 项目界面主要使用中文，适合用于探索群体运动、Canvas 动画和响应式控制面板的实现方式。

## 功能特性

- **实时鸟群模拟**：基于 Canvas 绘制并持续更新鸟群运动。
- **Boids 参数调节**：可实时调整以下参数：
  - 分离（Separation）
  - 对齐（Alignment）
  - 聚合（Cohesion）
  - 避让强度（Flee）
  - 鸟群数量（Flock）
  - 移动速度（Speed）
  - 感知半径（Radius）
- **指针互动**：移动指针可以吸引或驱散鸟群，按住指针可增强互动效果。
- **动画控制**：支持暂停/继续、重新聚拢和恢复默认参数。
- **运动尾迹**：可切换鸟群运动轨迹，观察群体运动路径。
- **快捷键操作**：
  - `Space`：暂停或继续模拟
  - `R`：重新生成鸟群
- **响应式布局**：桌面端提供完整控制面板，移动端控制面板可折叠。
- **高分辨率渲染**：根据设备像素比调整 Canvas 分辨率，兼顾清晰度与性能。

## 技术栈

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Start](https://tanstack.com/start)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://zustand.docs.pmnd.rs/) —— 管理模拟参数和界面状态
- [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) —— 绘制鸟群与背景
- [Lucide React](https://lucide.dev/) —— 界面图标

## 快速开始

### 环境要求

- Node.js 22 或更高版本
- npm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后即可在浏览器中打开开发预览。

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run typecheck
```

### 代码检查与格式化

```bash
npm run lint
npm run format
```

## 使用说明

1. 移动指针，观察鸟群对指针位置的响应。
2. 在左上角控制面板中调整群体行为参数。
3. 使用“尾迹”按钮显示或隐藏运动轨迹。
4. 点击“重聚”让鸟群重新生成并聚集。
5. 点击“重置”恢复默认参数。
6. 在移动设备上点击“鸟群”标题可展开或收起控制面板。

参数含义简述：

- **分离**：避免个体之间过度靠近。
- **对齐**：让个体趋向于与邻近个体保持相似方向和速度。
- **聚合**：让个体趋向于群体中心。
- **避让**：控制鸟群躲避指针的力度。
- **数量**：控制画布中的鸟群规模。
- **速度**：控制个体移动速度上限。
- **感知**：控制个体寻找邻居时的感知范围。

## 项目结构

```text
.
├── public/                 # 静态资源、图标和分享卡片
├── screenshots/            # 项目预览与 QA 截图
├── src/
│   ├── components/
│   │   ├── flock-app.tsx       # 应用主界面
│   │   ├── flock-canvas.tsx     # Canvas 渲染与指针事件
│   │   └── control-panel.tsx    # 参数控制面板
│   ├── lib/
│   │   └── flock/               # 鸟群模拟、状态和类型定义
│   ├── routes/                  # TanStack Router 路由
│   ├── router.tsx               # 路由实例
│   └── styles.css               # 全局样式与设计令牌
├── migrations/             # 预置数据库迁移目录
├── scripts/                # 开发、构建和预览辅助脚本
├── server/                 # 平台服务端中间件
├── startup.sh              # 预览环境启动脚本
├── package.json
└── vite.config.ts
```

## 核心实现

鸟群模拟遵循经典 Boids 模型：每个个体根据邻近个体的相对位置和速度计算下一帧的运动向量，同时叠加边界处理、指针避让和速度限制。渲染层使用单个 Canvas，并通过 `requestAnimationFrame` 驱动动画；背景渐变、星点与暗角会在尺寸变化时重新生成，以减少每帧开销。

## 开发建议

- 修改模拟逻辑时，优先查看 `src/lib/flock/` 中的类型、状态和模拟实现。
- 修改视觉效果时，查看 `src/components/flock-canvas.tsx`。
- 修改参数范围、按钮或移动端交互时，查看 `src/components/control-panel.tsx`。
- 提交前建议执行：

```bash
npm run typecheck
npm run lint
npm run build
```

## License

本项目基于 [MIT License](./LICENSE) 开源。
