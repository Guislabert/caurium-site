# Caurium 设计系统

> 实现文档。公开页面设计以本文与规格书第 7 节为准。

## 1. 设计命题

Caurium 的页面应当像一份可核查的工程图版：

- 信息优先于装饰。
- 每条边界都能被看见。
- 状态不依赖颜色单独传达。
- 细节精确，但不冷漠。

参考方向：Vercel 的克制网格、Composio 的产品解释、E2B 的技术材料组织。不复制其商标、插图、客户标识或专有文案。

## 2. Design tokens

| Token | Value | 说明 |
| --- | --- | --- |
| `--background` | `#ffffff` | 页面底色 |
| `--paper` | `#f7f6f2` | 交替区块 |
| `--surface` | `#f1f0ea` | 面板、图版 |
| `--ink` | `#111110` | 正文/深色区块 |
| `--muted` | `#5b5b55` | 次级文字 |
| `--border` | `#e4e2db` | 常规细线 |
| `--border-strong` | `#c9c7bf` | 图版/控件边界 |
| `--accent` | `#1d4ed8` | 链接、焦点、信号 |
| `--success` | `#166534` | 仅真实健康状态 |
| `--warning` | `#92400e` | 计划/边界 |
| `--danger` | `#b91c1c` | 故障 |
| `--container` | `1200px` | 内容宽度 |
| `--radius-card` | `12px` | 卡片 |
| `--radius-control` | `6px` | 按钮/输入 |

深色区块：背景 `--ink`，文字 `#f4f3ee`，次级 `#b7b5ac`，边框 `rgba(255,255,255,0.16)`。

## 3. 排版

| 角色 | 字体 | 字号 | 行高 | 字距 |
| --- | --- | --- | --- | --- |
| Display H1 | Geist Sans 500 | `clamp(2.75rem, 6vw, 5.5rem)` | 1.0 | -0.045em |
| H2 | Geist Sans 500 | `clamp(2rem, 3.6vw, 3.25rem)` | 1.06 | -0.035em |
| H3 | Geist Sans 600 | 18–22px | 1.3 | -0.02em |
| Body | Geist Sans 400 | 16–18px | 1.65 | 0 |
| Lede | Geist Sans 400 | 18–20px | 1.6 | -0.005em |
| Mono label | Geist Mono 500 | 10.5–11.5px | 1.4 | 0.14em, uppercase |
| Code | Geist Mono 400 | 12.5–13px | 1.7 | 0 |

不使用全大写长句；全大写仅用于短标签。

## 4. 布局

- 容器：`max-width: 1200px`，左右 20 / 32 / 40px。
- 桌面 12 列，间距 24px。
- 区块：手机 56–72px，桌面 96–128px。
- Hero：桌面 7/5 分栏，移动端上下。
- 产品页：内容主列 + 右侧 280px spec 面板；文档页：220px 导航 + 720px 正文 + 200px TOC（≥1280px）。
- 细线网格 80px，用于图版和深色区块，透明度 ≤ 5%。

## 5. 组件规则

### 5.1 按钮

- 高度 ≥ 44px；主按钮黑底白字；次按钮白底墨字 + 1px 边框。
- 深色区块反转为白底墨字 / 透明底白字。
- hover 只改变背景/边框/1px 位移；focus-visible 使用 2px accent 外框。

### 5.2 状态徽章

- 文字 + 圆点/形状，不只依赖颜色。
- `Planned` 使用中性色，不使用绿色。
- `Available` 才可使用 success 色。
- 尺寸：10.5px mono，大写，1px 边框，圆角 999px。

### 5.3 卡片

- 白底、1px border、12px 圆角、无阴影。
- hover：border 变强、箭头位移 2px；不放大、不发光。
- 整卡可点击时，标题链接覆盖整卡（pseudo-element），保证键盘可达。

### 5.4 图版（Figure）

- 纸色背景、1px 边框、10–12px 圆角。
- 顶部：`FIG. 0X — TITLE` + 状态徽章；底部：说明 + `Illustrative example`（如适用）。
- 图内文字最小 9.5px，仅用于标注，不承载正文。

### 5.5 文档

- 正文最大 720px；H2 前距 40px、H3 前距 28px。
- 表格可横向滚动，不撑宽页面。
- 代码块深色，支持复制，`tabIndex=0` 可键盘滚动。
- 左侧导航 sticky；当前页使用左侧 2px 墨色竖线 + 加粗。
- 右侧 TOC 仅在 ≥1280px 显示，不隐藏正文信息。

### 5.6 状态

- 未接入时显示明确英文说明，不显示绿色或百分比。
- 加载中、不可用、无组件、部分 Unknown 均有独立文案。
- `checkedAt` 新鲜度优先于 `generatedAt`。

## 6. 响应式检查宽度

360、390、768、1024、1440px。

- 360px：无横向滚动；按钮全宽；图版内部允许局部滚动。
- 768px：产品卡两列；工作流可三列或纵排；导航仍为移动菜单（<md）。
- 1024px：桌面导航；Hero 可两列。
- 1440px：容器居中，最大 1200px。

## 7. 无障碍

- 跳过导航链接。
- 逻辑 heading 顺序，一页一个 H1。
- 菜单 `aria-expanded`、Escape 关闭、焦点返回触发按钮。
- 所有图示有 `role="img"` + `aria-label` 或可见文本替代。
- 正文对比度 ≥ 4.5:1；控件边界 ≥ 3:1。
- `prefers-reduced-motion` 下关闭动画与平滑滚动。
- 不依赖 hover 才能访问内容。
- 关闭 JavaScript 后，正文、导航和链接仍可阅读。

## 8. 性能预算

- 首屏无背景视频、无大图、无第三方脚本。
- 字体自托管，仅加载实际字重。
- 内联 SVG 图示，避免额外请求。
- 目标：移动端 Lighthouse Performance ≥ 90，Accessibility/SEO ≥ 95（实验室结果，不是 SLA）。
