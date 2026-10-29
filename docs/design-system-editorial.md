# v1 editorial 视觉体系

> `main` 分支使用。共用规则见 [`design-system.md`](design-system.md)。
> 视觉性格：暖纸底、navy 墨色、衬线标题、圆角卡片、药丸按钮。

## 配色

| Token | Value | 说明 |
| --- | --- | --- |
| `--background` | `#F6F4EE` | 页面底色，暖纸 |
| `--paper` | `#FFFDF8` | 卡片、图版 |
| `--surface` | `#F1EEE4` | 面板头 |
| `--surface-2` | `#ECE7FD` | 淡紫区块（原则） |
| `--surface-3` | `#E8F2CF` | 淡绿区块（边界） |
| `--foreground` | `#0B1B3F` | 墨色 |
| `--ink` | `#0B1B3F` | 标题、深色区块 |
| `--ink-2` | `#26365F` | 正文 |
| `--muted` | `#5C6784` | 次级文字 |
| `--border` | `rgba(11, 27, 63, 0.14)` | 常规细线 |
| `--border-strong` | `rgba(11, 27, 63, 0.28)` | 分隔线、图版边界（不作控件边界） |
| `--control-border` | `#6B6480` | 输入框/次按钮边界，对纸白 ≥ 3:1 |
| `--accent` | `#6C4CF1` | 紫色强调 |
| `--accent-dark` | `#5433D4` | 强调色按下态 |
| `--accent-ink` | `#4B2FD0` | 浅色面上的可读强调文字与焦点环（≥ 7:1） |
| `--accent-soft` | `#ECE7FD` | 提示、当前阶段 |
| `--lime` | `#C9E265` | 品牌标记圆点 |
| `--lime-soft` | `#E8F2CF` | 青柠底 |
| `--olive` | `#5E7A1F` | 青柠底上的文字 |
| `--success` | `#3F6212` | 仅真实健康状态 |
| `--warning` | `#92400E` | 计划/边界 |
| `--danger` | `#B91C1C` | 故障 |

深色区块：背景 `--ink`，正文 `#F4F4F4`，次级 `rgba(255,255,255,0.7)`，边框 `rgba(255,255,255,0.16)`。

## 字体

| 角色 | 字体 | 备注 |
| --- | --- | --- |
| 正文 / UI | **Inter Variable** | `@fontsource-variable/inter` |
| 标题 | **Roboto Slab Variable** | 衬线，`ui-serif` 兜底；这是与 graphite 最明显的差异 |
| 标签 / 元信息 / 代码 | **JetBrains Mono Variable** | |
| 词标 | Roboto Slab Variable 600 | `.wordmark` |

标题用衬线体建立「编辑物」气质，字重 500–600，与无衬线正文形成对照。

## 几何

| Token | Value | 说明 |
| --- | --- | --- |
| `--container` | `1180px` | 内容宽度 |
| `--radius-card` | `22px` | 卡片、图版 |
| `--radius-control` | `999px` | 按钮为药丸形 |
| `--shadow-card` | `0 30px 70px -42px rgba(11,27,63,0.45)` | 卡片常态阴影 |
| `--shadow-float` | `0 24px 60px -28px rgba(11,27,63,0.4)` | 浮层 |
| `--header` | `72px` | 固定页头 |

圆角是这套体系的主要识别特征：卡片 22px、按钮全圆角。graphite 版把两者都收到 16px / 0。

## 页头与导航

- 页头**浅色**：`rgba(246,244,238,0.86)` + 14px 高斯模糊，底部 1px 细线。
- **没有顶部公告条**。阶段信息放在页头的标记点旁（「Free private preview · By application」）。
- 导航链接：药丸形，36px 高，14.5px 正文字号，当前页用 7% 墨色底标记。
- 移动菜单面板为浅色底、墨色文字。

## 按钮

- 主按钮：墨色底、纸白字、全圆角。
- 次按钮：透明底 + 1px `--border-strong`，hover 反转为墨色底。
- 深色底：主按钮纸白底墨字，次按钮透明 + 低透明度白边。

## 与 graphite 的差异清单

| 维度 | editorial（main） | graphite（dev） |
| --- | --- | --- |
| 底色 | 暖纸 `#F6F4EE` | 冷灰 `#F6F6F6` |
| 墨色 | navy `#0B1B3F` | 近黑 `#0F0F0F` |
| 强调 | 紫 `#6C4CF1` | 蓝 `#51A2FF` |
| 标题字体 | Roboto Slab（衬线） | Geist（无衬线） |
| 卡片圆角 | 22px | 16px |
| 按钮 | 药丸 999px | 直角 0 |
| 阴影 | 有常态阴影 | 无，靠细线 |
| 页头 | 浅色 + 模糊 | 深色 chrome |
| 顶部公告条 | 无 | 36px |
| 容器 | 1180px | 1240px |

## 改动纪律

改这套视觉只动 `main` 的 `globals.css` 令牌段与本节；`dev` 对应 `design-system-graphite.md`。共用规则变更要两边同时改，并更新 `design-system.md`。
