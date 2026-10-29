# 分支规范

两条长期分支，各有明确职责。`main` 是生产；`dev` 是预览与试验场。

| 分支 | 角色 | Worker | 地址 | 索引 |
| --- | --- | --- | --- | --- |
| `main` | **生产**。官网主展示，对外唯一可信版本 | `caurium-site` | `caurium.tech` | 受 `NEXT_PUBLIC_SITE_ENV` 控制 |
| `dev` | **预览**。设计、功能、试验都在这里先跑 | `caurium-site-dev` | `caurium-site-dev.caurium.workers.dev` | 永不索引 |

`dev` 不是"准生产"，也不是"下一个 main"。它是可以随时推翻的工作台。

## 1. 什么进哪条分支

| 改动类型 | 进 `dev` | 进 `main` |
| --- | --- | --- |
| 新组件、新页面、新交互 | ✅ 先在这里 | 验收后 |
| 视觉体系、配色、字体调整 | ✅ | 只有确认要换掉生产视觉时 |
| 功能试验、A/B 变体 | ✅ | 选定后 |
| 文案修正、事实纠错 | ✅ | ✅ 可直接进 |
| 依赖升级 | ✅ | 验证后 |
| CI / 部署配置 | 两边同步 | 两边同步 |
| `src/content/` 事实记录 | ✅ | ✅ 可直接进 |
| `docs/` 共用文档 | ✅ | ✅ 可直接进 |

判定原则：**会改变访客所见的东西，先在 `dev` 证明；不会改变访客所见的，可以直接进 `main`。**

## 2. 视觉体系是唯一允许分叉的部分

两条分支的差异**只允许**落在这八个文件：

```
src/app/globals.css          设计令牌（配色、字号、圆角、阴影）
src/app/layout.tsx           字体 import
src/app/page.tsx             首页状态行的呈现
src/components/SiteHeader.tsx        页头结构
src/components/MobileNavigation.tsx  移动菜单配色
src/content/site.ts          HERO 字段集合
package.json                 字体依赖
pnpm-lock.yaml               随之更新
```

除此之外的任何文件在两分支上**必须逐字节相同**：内容、文档、CI、配置、测试。

这条规则的作用：任何时候 `git diff main..dev` 的结果都应该落在这份清单内。若出现清单外的文件，说明有人在改共享结构而没有同步，需要立即处理。

```sh
# 每次合并前跑一次
git diff --name-only main..dev
```

## 3. 两套视觉体系

| 文件 | 内容 | 两分支都有 |
| --- | --- | --- |
| `docs/design-system.md` | 共用骨架：令牌角色、字号阶梯、布局、组件行为、无障碍 | 逐字节相同 |
| `docs/design-system-editorial.md` | v1 暖纸 / navy / Roboto Slab / 圆角 | 逐字节相同 |
| `docs/design-system-graphite.md` | v2 冷灰 / 近黑 / Geist / 直角 | 逐字节相同 |

两份视觉文档**两条分支都有**，因为它们记录的是可选体系而非分支私有状态。只放一条分支会在合并时产生 "added in both" 冲突。

`main` 当前用 editorial，`dev` 当前用 graphite。切换任何一条分支的视觉，只动上表八个文件之一加对应视觉文档，不要碰共用骨架。

## 4. 日常流程

### 4.1 在 dev 上做设计或功能

```sh
git checkout dev
git pull origin dev
# ... 改动 ...
pnpm check                 # typecheck + lint + test + build + links
git commit -m "…"
git push origin dev        # CI 检查后自动部署到 caurium-site-dev
```

预览地址立即更新。`dev` 永不索引，可以随便试。

### 4.2 从 dev 提升到 main

不是合并，是**挑选**。`dev` 上通常混着未定稿的试验，整体合并会把它们带进生产。

```sh
git checkout main
git pull origin main

# 只取要上线的提交
git cherry-pick <sha1> <sha2>
# 或只取某个文件
git checkout dev -- src/components/NewThing.tsx

pnpm check
git push origin main       # CI 检查后自动部署到 caurium-site
```

**除非整条 `dev` 都已验收**，否则不要 `git merge dev`。整体合并会把 graphite 视觉一并带进生产。

### 4.3 共享部分直接从 main 改

改 CI、文档、`src/content/` 事实记录时，直接在 `main` 上改，然后快进 `dev`：

```sh
git checkout main
# ... 改共享部分 ...
git commit -m "…" && git push origin main

git checkout dev
git merge --ff-only origin/main   # dev 应能快进
git push origin dev
```

`--ff-only` 是关键：如果无法快进，说明 `dev` 上有不该有的共享改动，需要先处理而不是强行合并。

## 5. 部署由分支决定，不由人决定

| 动作 | 触发 |
| --- | --- |
| push `main` | CI 检查 → `deploy` job → `caurium-site` |
| push `dev` | CI 检查 → `deploy-dev` job → `caurium-site-dev` |
| 任何 PR | CI 只检查，不部署 |

两个 job 各自锁定一个分支和一个配置文件：

```yaml
deploy:     # if: refs/heads/main, 默认 wrangler.jsonc
deploy-dev: # if: refs/heads/dev,  --config wrangler.dev.jsonc
```

**不要手工执行 `wrangler deploy` 部署 `caurium-site`。** 手工部署不会写入 commit message，线上版本无法追溯，而且会与 CI 竞争——曾出现过 CI 部署完成 2 秒后被一次手工部署覆盖，当前生效的版本因此没有 SHA 记录。

如果确实需要手工部署（例如 CI 故障），补上 message：

```sh
npx wrangler deploy --message "$(git rev-parse HEAD) manual"
```

### 5.1 并发

两个 job 的 `concurrency.group` 不同（`production` / `dev-preview`），互不排队。

`cancel-in-progress` 差异是刻意的：预览被新提交取消是对的，生产部署中途被取消则可能留下半个版本。

## 6. 保护规则

| 规则 | `main` | `dev` |
| --- | --- | --- |
| 必需检查 | `Check and build` | `Check and build` |
| 合并前需最新 | 是（`strict: true`） | 否 |
| 强制推送 | 禁止 | 禁止 |
| 删除分支 | 禁止 | 禁止 |

`main` 要求 strict，因为它直接对外。`dev` 不要求，允许快速迭代。

## 7. 验收清单

把 `dev` 上的东西提升到 `main` 之前：

- [ ] `pnpm check` 全绿
- [ ] 在 `caurium-site-dev` 上实际看过渲染结果（不是只看构建通过）
- [ ] 375 / 768 / 1440 三档宽度无横向溢出
- [ ] 改动涉及文案时，`src/content/` 与 `docs/content-audit.md` 已同步
- [ ] 改动涉及产品阶段时，`tests/content.test.ts` 的阶段断言已更新
- [ ] `git diff --name-only main..dev` 的结果仍在这份文档第 2 节的清单内

最后一条最容易被忽略，也最能防止两条分支悄悄分叉。

## 8. 两条分支并行的物理层

两个独立 worktree，互不干扰：

```sh
git worktree list
# <path>/caurium-site-git    [dev]
# <path>/caurium-site-main   [main]
```

`.next` 与 `out/` 都被 gitignore，不会共享。但两者默认都用 3000 端口：

```sh
# 在 main 那个目录
pnpm dev --port 3001
```

构建报"另一个进程持有锁"时，那是**同一目录内**有第二个 `next build`，不是另一个 worktree。清缓存：`rm -rf .next && pnpm build`。

## 9. 新增环境的模板

需要第三条环境时（如 `staging`），复制形状而不是改造现有：

1. `wrangler.staging.jsonc`，`name` 唯一，其余与 `wrangler.jsonc` 一致
2. CI 里加 `deploy-staging` job：锁定 `refs/heads/staging`、`--config wrangler.staging.jsonc`、独立 `concurrency.group`
3. 不绑自定义域名，除非它要对外
4. `NEXT_PUBLIC_SITE_ENV=preview`，除非它是生产

## 10. 版本记录

两条分支各自版本，互不干扰。`main` 的版本号是**对外承诺**，`dev` 的版本号是**内部进度**。

| 分支 | 标签格式 | 示例 |
| --- | --- | --- |
| `main` | `v<major>.<minor>.<patch>` | `v0.2.0` |
| `dev` | `dev-v<major>.<minor>.<patch>` | `dev-v0.3.1` |

`dev` 可以跑到 `dev-v0.5.0` 而 `main` 还停在 `v0.2.0`——这正是它存在的意义：预览先进，生产后跟。

### 10.1 什么时候升版本

| 变化 | 建议 | 理由 |
| --- | --- | --- |
| 视觉体系整体更换 | **major** | 访客看到的世界变了 |
| 新增页面、产品阶段推进、定价变化 | **minor** | 有了新的对外能力或承诺 |
| 文案纠正、修 bug、无障碍修复 | **patch** | 同样的东西，做得更对 |
| 纯内部改动（CI、文档、测试） | **不打标签** | 访客无感，无需承诺 |

不追求每次提交都发版。**发版的含义是"这一版值得被记住"**，通常对应一次对外可见的变化。

### 10.2 怎么发

```sh
# 在 main 上
pnpm release minor "Probe 定价上线，Gate 与 Guard 进入开发"

# 在 dev 上
pnpm release patch "Graphite 视觉的焦点环对比度修复"
```

脚本会：校验工作区干净 → 递增版本 → 提交 `package.json` → 打**附注标签**并把说明写进标签正文 → 提示推送命令。

标签是附注式的（`git tag -a`），所以 `git show v0.2.0` 直接给出这一版的说明，不需要翻提交历史。

### 10.3 查看

```sh
git tag -n9                        # 所有版本带说明
git tag -l 'v*' --sort=-v:refname  # 生产版本线，新到旧
git tag -l 'dev-v*'                # 预览版本线
git show v0.2.0                    # 某一版做了什么
```

### 10.4 版本与部署的关系

标签**不触发部署**。部署由分支决定（第 5 节），标签只记录"某个时刻这一版值得记住"。

这条分离是刻意的：回滚用 Cloudflare 的版本 ID（带 commit SHA），版本号用于对外沟通。两者职责不同。

### 10.5 package.json 的 version

跟着 `main` 的版本走。`dev` 发版时也递增同一个字段——它代表"下一个生产版本的目标"，而不是当前部署的确切版本。确切版本永远以标签为准。

## 11. 这套规范防的是什么

| 曾经发生 | 现在如何防住 |
| --- | --- |
| 在 `dev` 上开发业务，合并时把设计改动一起带进生产 | 提升用 cherry-pick，不整体合并 |
| `dev` 手工部署无 commit 记录，无法追溯线上是哪次提交 | 部署由 CI 按分支触发，版本 message 带 SHA |
| 生产被手工部署覆盖 CI 结果 | 规范禁止手工部署生产；必要时补 `--message` |
| 一个 `design-system.md` 描述且仅描述当前分支，两边都以为自己是真相 | 拆成共用骨架 + 两份视觉文档，三份两分支都有 |
| `dev` 漏了 `main` 的文档与 CI 改动 | 共享部分直接从 `main` 改，`dev` 用 `--ff-only` 快进 |
| 两条分支悄悄分叉 | 第 2 节的八文件清单，`pnpm check:branches` 会失败 |
| 说不清"线上是哪一版" | 附注标签 + 部署版本 message 的双重记录 |
