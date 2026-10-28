# Caurium 设计系统

> 实现文档。公开页面设计以本文与规格书第 7 节为准。
> 视觉基线：v1 暖纸 / 海军蓝 / 紫罗兰 / 青柠体系（备份仓库 `caurium-site-backup`）。

## 1. 设计命题

Caurium 的页面应当像一份可核查的工程图版，但保留 v1 的编辑感与温度：

- 信息优先于装饰，暖纸底色让长时间阅读更轻。
- 每条边界都能被看见。
- 状态不依赖颜色单独传达。
- 细节精确，但不冷漠。
- 参考方向：编辑型技术手册、工程图版、克制的产品说明。不复制第三方商标、插图、客户标识或专有文案。

## 2. Design tokens

| Token | Value | 说明 |
| --- | --- | --- |
| `--background` | `#F6F4EE` | 页面底色（暖纸） |
| `--paper` | `#FFFDF8` | 卡片、图版、交替区块 |
| `--surface` | `#F1EEE4` | 页脚、面板、次级底色 |
| `--surface-2` | `#ECE7FD` | 淡紫色区块 |
| `--surface-3` | `#E8F2CF` | 淡青柠区块 |
| `--ink` | `#0B1B3F` | 标题、深色区块、Logo 底色 |
| `--ink-2` | `#26365F` | 正文 |
| `--muted` | `#5C6784` | 次级文字 |
| `--border` | `rgba(11,27,63,0.14)` | 常规细线 |
| `--border-strong` | `rgba(11,27,63,0.28)` | 图版/控件边界 |
| `--accent` | `#6C4CF1` | 主按钮、链接、焦点、信号 |
| `--accent-dark` | `#5433D4` | 主按钮 hover |
| `--lime` | `#C9E265` | 选中、强调标记、Logo 圆点 |
| `--olive` | `#5E7A1F` | 青柠底色上的次要文字 |
| `--success` | `#3F6212` | 仅真实健康状态 |
| `--warning` | `#92400E` | 计划/边界 |
| `--danger` | `#B91C1C` | 故障 |
| `--container` | `1180px` | 内容宽度 |
| `--radius-card` | `22px` | 卡片、图版 |
| `--radius-control` | `999px` | 按钮/输入 |
| `--shadow-card` | `0 30px 70px -42px rgba(11,27,63,0.45)` | 卡片 hover |

深色区块：背景 `--ink`，文字 `#F6F4EE`，次级 `rgba(246,244,238,0.7)`，边框 `rgba(255,255,255,0.16)`。

## 3. 排版

| 角色 | 字体 | 字号 | 行高 | 字距 |
| --- | --- | --- | --- | --- |
| Display H1 | Roboto Slab Variable 500 | `clamp(3.2rem, 7vw, 5.6rem)` | 0.98 | -0.035em |
| H2 | Roboto Slab Variable 500 | `clamp(2.2rem, 4.2vw, 3.6rem)` | 1.05 | -0.03em |
| H3 | Roboto Slab Variable 500 | 21–28px | 1.2 | -0.02em |
| Body | Inter Variable 400 | 16–17px | 1.6 | 0 |
| Lede | Inter Variable 400 | 17–20px | 1.6 | 0 |
| Mono label | JetBrains Mono Variable 400 | 9–11.5px | 1.4 | 0.16em, uppercase |
| Code | JetBrains Mono Variable 400 | 12.5–13px | 1.75 | 0 |

字体通过 `@fontsource-variable/*` 自托管，在 `src/app/layout.tsx` 引入；`globals.css` 中的 `@theme` 映射为 `--font-sans` / `--font-display` / `--font-mono`。

不使用全大写长句；全大写仅用于短标签。眉题（eyebrow）前置 6px 紫罗兰圆点。

## 4. 布局

- 容器：`max-width: 1180px`，左右 20 / 32 / 40px。
- 桌面 12 列，间距 24px。
- 区块：手机 60px，平板 88px，桌面 112px。
- Hero：桌面 7/5 分栏，移动端上下；背景使用紫罗兰 + 青柠径向光晕。
- 产品页：内容主列 + 右侧 290px spec 面板；文档页：200px 导航 + 720px 正文 + 176px TOC（≥1280px）。
- 图版细线网格 80px，透明度 ≤ 5.5%。

## 5. 组件规则

### 5.1 Logo

- v1 标志：海军蓝圆角方块，米白 C 形弧线，青柠圆点。
- 反色用于深色底：米白方块、海军蓝弧线、青柠圆点。
- 水印/单色场景使用 `mono` 变体，透明度 ≤ 12%。
- 词标使用 Roboto Slab 600。

### 5.2 按钮

- 高度 ≥ 46px，胶囊圆角。
- 主按钮紫罗兰底白字，带低透明紫色投影；次按钮透明底 + 1px 边框。
- 深色区块反转为米白底墨字 / 透明底米白字。
- hover 只改变背景/边框/1px 位移；focus-visible 使用 2px accent 外框。

### 5.3 状态徽章

- 文字 + 圆点/形状，不只依赖颜色。
- `Planned` 使用中性色和空心圆点，不使用绿色。
- `Available` 才可使用 success 色。
- 尺寸：10px mono，大写，1px 边框，圆角 999px。

### 5.4 卡片

- 米白底、1px border、22px 圆角，无常态阴影。
- hover：上移 4px、边框变强、出现柔和投影；箭头位移 3px。
- 整卡可点击时，链接覆盖整卡，保证键盘可达。
- 列表项目使用 10px 青柠圆点作为标记。

### 5.5 图版（Figure）

- 米白背景、1px 边框、18px 圆角、柔和投影。
- 顶部：`FIG. 0X — TITLE` + 状态徽章；底部：说明 + `Illustrative example`（如适用）。
- 图内文字最小 9.5px，仅用于标注，不承载正文。
- Hero 图版桌面端轻微旋转 -1.2deg。

### 5.6 文档

- 正文最大 720px；H2 前距 40px、H3 前距 28px。
- 表格可横向滚动，不撑宽页面。
- 代码块为海军蓝底、米白字，支持复制，`tabIndex=0` 可键盘滚动。
- 左侧导航 sticky；当前页使用左侧 2px 紫罗兰竖线 + 加粗。
- 右侧 TOC 仅在 ≥1280px 显示，不隐藏正文信息。

### 5.7 页脚

- `--surface` 暖灰底、上边框、大号 Roboto Slab 词标。
- 分组标题使用紫色圆点眉题；链接 hover 变为紫罗兰。
- 底部为 mono 小字元信息。

### 5.8 状态

- 未接入时显示明确英文说明，不显示绿色或百分比。
- 加载中、不可用、无组件、部分 Unknown 均有独立文案。
- `checkedAt` 新鲜度优先于 `generatedAt`。

## 6. 响应式检查宽度

360、390、768、1024、1440px。

- 360px：无横向滚动；按钮全宽；图版内部允许局部滚动。
- 768px：产品卡两列；工作流可三列或纵排；导航仍为移动菜单（<md）。
- 1024px：桌面导航；Hero 可两列。
- 1440px：容器居中，最大 1180px。

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
- 字体自托管，仅加载实际字重；浏览器按 unicode-range 只取拉丁子集。
- 内联 SVG 图示，避免额外请求。
- 目标：移动端 Lighthouse Performance ≥ 90，Accessibility/SEO ≥ 95（实验室结果，不是 SLA）。
