# Caurium 设计系统

> 实现文档。公开页面的视觉以本文与 `src/app/globals.css` 为准。
> 视觉基线：v2 石墨细线 / 白面板 / 单一蓝色强调（`dev` 分支）。v1 暖纸体系保留在 `caurium-site-backup`。

## 1. 设计命题

页面是一张可核查的技术面板：结构靠细线和留白表达，不靠阴影和装饰。

- 中性石墨底 + 纯白面板，内容与边框是唯一的结构信号。
- 一个蓝色强调用于链接、焦点与活跃状态；青柠只保留在品牌标记里。
- 状态仍由文字 + 形状表达，不依赖颜色单独传达。
- 等宽字体承担标签、编号、按钮与元信息；正文和标题使用同一无衬线家族，靠字号与字距分层。

## 2. Design tokens

| Token | Value | 说明 |
| --- | --- | --- |
| `--background` | `#F6F6F6` | 页面底色（冷灰） |
| `--paper` | `#FFFFFF` | 卡片、图版、表头 |
| `--surface` | `#EFEFEF` | 面板头、次级底色 |
| `--surface-2` | `#E9E5F5` | 淡紫区块（原则） |
| `--surface-3` | `#E3ECE4` | 淡绿区块（边界） |
| `--ink` | `#0F0F0F` | 标题、深色区块、页头底色 |
| `--ink-2` | `#2F2F2F` | 正文 |
| `--muted` | `#6B6B6B` | 次级文字 |
| `--border` | `#E4E4E4` | 常规细线 |
| `--border-strong` | `#C9C9C9` | 分隔线、图版边界（不作为控件边界） |
| `--control-border` | `#9A9A9A` | 输入框/次按钮边界，对纸白 3:1 |
| `--accent` | `#51A2FF` | 深色面上的焦点环、标记点 |
| `--accent-ink` | `#0007CD` | 正文链接、标题强调、浅色面焦点环（≥ 7:1） |
| `--accent-soft` | `#EAF3FF` | 提示、当前阶段 |
| `--lime` | `#C9E265` | 仅品牌标记的圆点与页头小点 |
| `--olive` | `#4B6B2F` | 青柠底色上的次要文字 |
| `--success` | `#17794E` | 仅真实健康状态 |
| `--warning` | `#A35B00` | 计划/边界 |
| `--danger` | `#C62F2F` | 故障 |
| `--container` | `1240px` | 内容宽度（≥1320px 时显示左右竖线导轨） |
| `--radius-card` | `16px` | 卡片、图版 |
| `--radius-control` | `0` | 按钮/输入为直角 |
| `--topbar` | `36px` | 顶部公告条 |
| `--header` | `64px` | 固定页头 |

深色区块：背景 `--ink`，正文 `#F4F4F4`，次级 `rgba(255,255,255,0.7)`，边框 `rgba(255,255,255,0.16)`。
浅色卡片放在深色区块上时由 `.section-ink .figure/.card/.status-panel` 恢复深色文字。

## 3. 排版

| 角色 | 字体 | 字号 | 行高 | 字距 |
| --- | --- | --- | --- | --- |
| Display H1 | Geist Variable 400 | `clamp(2.75rem, 5.6vw, 4rem)` | 1.04 | -0.035em |
| Hero H1 | Geist Variable 400 | `clamp(2.6rem, 5vw, 3.9rem)` | 1.05 | -0.035em |
| Page H1 | Geist Variable 400 | `clamp(2.3rem, 4.6vw, 3.4rem)` | 1.06 | -0.032em |
| H2 | Geist Variable 400 | `clamp(1.9rem, 3.4vw, 2.75rem)` | 1.08 | -0.03em |
| H3 | Geist Variable 400 | 19–24px | 1.2 | -0.02em |
| Body | Geist Variable 400 | 16px | 1.55 | 0 |
| Lede | Geist Variable 400 | 16–18px | 1.6 | 0 |
| 标签 / 按钮 / 元信息 | JetBrains Mono Variable 400 | 11px | 1.5 | 0.06em, uppercase |
| 代码 | JetBrains Mono Variable 400 | 12.5px | 1.7 | 0 |
| 词标 | Roboto Slab Variable 600 | 18px | 1 | -0.02em |

- 字体自托管：Geist 与 JetBrains Mono 由 `@fontsource-variable/*` 引入；词标单独保留 Roboto Slab。
- 标题一律 400 字重，靠字号与负字距建立层级；不使用 600/700 粗标题。
- 标题之上不放 kicker / eyebrow 小标签：标题自己承担层级。序号（`01 /`）只在顺序本身是信息时保留，目前全站不保留。
- 辅助说明统一用 `.note`（`max-width: 34em`），附注/正文用 `text-wrap: pretty`，避免单词孤行。
- 全大写只用于短标签、编号、按钮与导航，不用于整句。
- 标题内强调片段使用 `.emphasis`（`--accent-ink`），深色底使用 `#8EC4FF`。

## 4. 布局

- 容器：`max-width: 1240px`，左右 20 / 40px；≥1320px 时容器左右各一条 1px 竖线，形成页面导轨。
- 页头与公告条不画导轨（`.site-topbar/.site-header .container-page` 重置边框）。
- 桌面 12 列，间距 24px；区块 64 / 88 / 104px。
- Hero：深色全宽区块，居中窄栏正文（`max-w-3xl`），下方居中放 `Fig. 01` 模块图 + 四列状态条。
- 分栏区块：`0.72fr / 1.28fr` 等左侧标题、右侧列表；卡片网格用 `gap: 1px` + 底色作分隔线。
- 文档页：200px 导航 + 640px 正文 + 176px TOC（≥1280px）。

## 5. 组件规则

### 5.1 Logo

- 标志（`CauriumMark`）：圆角方块 + C 形弧线 + 青柠圆点；深色页头用反色（米白方块、墨色弧线）。
- 词标使用 Roboto Slab 600，`.wordmark`。
- 水印/单色场景使用 `mono` 变体，透明度 ≤ 12%。

### 5.2 按钮

- 直角，高度 ≥ 46px，等宽字体、12px、`0.06em` 字距、全大写。
- 主按钮：墨黑底白字；次按钮：透明底 + 1px `--border-strong`，hover 反转为墨黑底。
- 深色底：主按钮白底墨字，次按钮透明 + 30% 白边。
- hover 只改背景/边框/文字色，不做位移；focus-visible 用 2px 蓝色外框。

### 5.3 状态徽章

- 文字 + 圆点/空心圆点，不只依赖颜色。
- `Planned` 灰色 + 空心点；`Private preview` 蓝字浅蓝底；`Available` 才可使用 success 色。
- 尺寸：10.5px 等宽，大写，1px 边框，直角。

### 5.4 卡片

- 白底、1px `--border`、16px 圆角，无常态阴影。
- hover：边框转为墨黑，箭头位移 3px；不做上移与投影。
- 整卡可点击时，链接覆盖整卡，保证键盘可达。
- 卡片网格之间使用 1px 间隙 + 底色，避免双线。

### 5.5 图版（Figure）

- 白底、1px 边框、16px 圆角；头部为 `--surface` 底 + 等宽大写标题。
- 顶部：`FIG. 0X — TITLE` + 状态徽章；底部：说明 + `Rev.`/`Illustrative`.
- 图内文字最小 10px，仅用于标注，不承载正文。
- 图版里的装饰线使用 `--border-strong`，不引入新的强调色。

### 5.6 文档

- 正文最大 `34em`（约 75 字符）；H2 前距 40px、H3 前距 28px。
- 表头用等宽大写小字 + `--surface` 底。
- 代码块为 `#171717` 底、浅灰字，支持复制，`tabIndex=0` 可键盘滚动。
- 左侧导航 sticky；当前页使用左侧 1px 墨色竖线 + 加粗。
- 右侧 TOC 仅在 ≥1280px 显示。

### 5.7 页脚

- 白底、上边框；左侧 Logo + 定位句 + 阶段说明，右侧四组链接。
- 分组标题使用等宽大写小字（无圆点）。
- 底部为等宽小字元信息。

### 5.8 状态

- 未接入时显示明确英文说明，不显示绿色或百分比。
- 加载中、不可用、无组件、部分 Unknown 均有独立文案。
- `checkedAt` 新鲜度优先于 `generatedAt`。

### 5.9 结尾卡片

- `.cta-card`：圆角 24px 的渐变面板；`.cta-card--ink` 为深色版本，承载首页 Build log 收尾。

## 6. 响应式检查宽度

360、390、768、1024、1440px。

- 360px：无横向滚动；按钮全宽；图版内部允许局部滚动。
- 768px：产品卡两列；桌面导航出现（≥md）；移动菜单带等宽 `MENU` 按钮。
- 1024px：文档左侧导航竖排。
- 1440px：容器居中，最大 1240px，导轨可见。

## 7. 无障碍

- 跳过导航链接。
- 逻辑 heading 顺序，一页一个 H1。
- 菜单 `aria-expanded`、Escape 关闭、焦点返回触发按钮。
- 所有图示有 `role="img"` + `aria-label` 或可见文本替代。
- 正文对比度 ≥ 4.5:1；控件边界 ≥ 3:1；链接文字统一使用 `--accent-ink`，不使用浅蓝 `--accent` 作正文色。
- `prefers-reduced-motion` 下关闭动画与平滑滚动。
- 不依赖 hover 才能访问内容。
- 关闭 JavaScript 后，正文、导航和链接仍可阅读。

## 8. 性能预算

- 首屏无背景视频、无大图、无第三方脚本。
- 字体自托管，仅加载实际字重；浏览器按 unicode-range 只取拉丁子集。
- 内联 SVG 图示，避免额外请求。
- 目标：移动端 Lighthouse Performance ≥ 90，Accessibility/SEO ≥ 95（实验室结果，不是 SLA）。
