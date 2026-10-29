# v2 graphite 视觉体系

> `dev` 分支使用。共用规则见 [`design-system.md`](design-system.md)。
> 视觉性格：冷灰底、纯白面板、无衬线标题、直角控件、细线导轨。

## 配色

| Token | Value | 说明 |
| --- | --- | --- |
| `--background` | `#F6F6F6` | 页面底色，冷灰 |
| `--paper` | `#FFFFFF` | 卡片、图版、表头 |
| `--surface` | `#EFEFEF` | 面板头 |
| `--surface-2` | `#E9E5F5` | 淡紫区块（原则） |
| `--surface-3` | `#E3ECE4` | 淡绿区块（边界） |
| `--foreground` | `#0F0F0F` | 近黑 |
| `--ink` | `#0F0F0F` | 标题、深色区块、页头底色 |
| `--ink-2` | `#2F2F2F` | 正文 |
| `--muted` | `#6B6B6B` | 次级文字 |
| `--border` | `#E4E4E4` | 常规细线 |
| `--border-strong` | `#C9C9C9` | 分隔线、图版边界（不作控件边界） |
| `--control-border` | `#9A9A9A` | 输入框/次按钮边界，对纸白 3:1 |
| `--accent` | `#51A2FF` | 深色面上的焦点环、标记点 |
| `--accent-ink` | `#0007CD` | 正文链接、标题强调、浅色面焦点环（≥ 7:1） |
| `--accent-soft` | `#EAF3FF` | 提示、当前阶段 |
| `--lime` | `#C9E265` | 仅品牌标记圆点与页头小点 |
| `--olive` | `#4B6B2F` | 青柠底上的次要文字 |
| `--success` | `#17794E` | 仅真实健康状态 |
| `--warning` | `#A35B00` | 计划/边界 |
| `--danger` | `#C62F2F` | 故障 |

深色区块：背景 `--ink`，正文 `#F4F4F4`，次级 `rgba(255,255,255,0.7)`，边框 `rgba(255,255,255,0.16)`。
浅色卡片放在深色区块上时由 `.section-ink .figure/.card/.status-panel` 恢复深色文字。

## 字体

| 角色 | 字体 | 备注 |
| --- | --- | --- |
| 正文 / UI / 标题 | **Geist Variable** | `@fontsource-variable/geist`；标题也是无衬线 |
| 标签 / 元信息 / 代码 | **JetBrains Mono Variable** | |
| 词标 | Roboto Slab Variable 600 | 唯一保留的衬线 |

标题一律 400 字重，靠字号与负字距建立层级，不使用 600/700 粗标题。

## 几何

| Token | Value | 说明 |
| --- | --- | --- |
| `--container` | `1240px` | 内容宽度；≥1320px 时显示左右竖线导轨 |
| `--radius-card` | `16px` | 卡片、图版 |
| `--radius-control` | `0` | 按钮/输入为直角 |
| `--shadow-card` | 无 | 去掉常态阴影，靠细线分隔 |
| `--shadow-float` | 无 | 同上 |
| `--header` | `64px` | 固定页头 |
| `--topbar` | `36px` | 顶部公告条 |

## 页头与导航

- 顶部 **36px 公告条**，底色 `#1114C8`，承载 `New` 徽章 + 阶段说明 + Apply 链接。
- 页头**深色**：`var(--ink)` 底、白字，底部 `rgba(255,255,255,0.16)` 细线。
- 导航链接：等宽字体、12px、全大写、0.06em 字距，当前页用底部 1px 白线标记。
- 移动菜单面板为深色底、白字。

## 按钮

- 直角，高度 ≥ 46px，等宽字体、12px、全大写。
- 主按钮：墨黑底白字；次按钮：透明底 + 1px `--border-strong`，hover 反转为墨黑底。
- 深色底：主按钮白底墨字，次按钮透明 + 30% 白边。

## 卡片与图版

- 白底、1px `--border`、16px 圆角，无常态阴影。
- hover：边框转墨黑，箭头位移 3px，不做上移。
- 图版头部 `--surface` 底 + 等宽大写标题，内部装饰线用 `--border-strong`。

## 与 editorial 的差异清单

| 维度 | graphite（dev） | editorial（main） |
| --- | --- | --- |
| 底色 | 冷灰 `#F6F6F6` | 暖纸 `#F6F4EE` |
| 墨色 | 近黑 `#0F0F0F` | navy `#0B1B3F` |
| 强调 | 蓝 `#51A2FF` | 紫 `#6C4CF1` |
| 标题字体 | Geist（无衬线） | Roboto Slab（衬线） |
| 卡片圆角 | 16px | 22px |
| 按钮 | 直角 0 | 药丸 999px |
| 阴影 | 无，靠细线 | 有常态阴影 |
| 页头 | 深色 chrome | 浅色 + 模糊 |
| 顶部公告条 | 36px | 无 |
| 容器 | 1240px | 1180px |

## 改动纪律

改这套视觉只动 `dev` 的 `globals.css` 令牌段与本节；`main` 对应 `design-system-editorial.md`。共用规则变更要两边同时改，并更新 `design-system.md`。
