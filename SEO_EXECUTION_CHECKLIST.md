# SEO 执行清单（基于 11-20 GSC 分析）

本清单按优先级分组，覆盖可落地的页面优化、结构化数据、信息架构与验证。勾选项完成后可在 PR 描述中关联验证截图与对比数据。

## 最高优先级（1–2 周）

- [ ] 首页头部词优化（提升“charades generator/word/ideas/random”相关性与 CTR）
  - [x] 更新首页 `generateMetadata` 的标题/描述/关键词（通过字典 `src/i18n/dictionaries/en.ts`）。
  - [x] 在首页首屏下方增加 120–180 字的语义引导段（`src/components/HomeLanding.tsx`）。
- [x] 在首页正文首屏附近增加至其他核心页的锚文本内链（Word/Reverse/Random/Kids/Disney/Movie）。

- [ ] 新页：Word Charades Generator（承接“charades word generator”等查询）
  - [x] 新建路由 `src/app/[locale]/word-charades-generator/page.tsx`（含 `generateMetadata`、canonical、`alternates.languages`、OpenGraph、Twitter）。
  - [ ] 页面内容结构：简介（150–200词）+ 生成器模块 + 常见用例/Tips + 小型词表示例 + FAQ（支持 JSON-LD）。
  - [x] 在导航与首页增加入口链接（已在字典导航中新增项）。
  - [x] 将新路由加入 `src/app/sitemap.ts` 的 `routeConfig`。

- [ ] Reverse Charades 页内容增强
  - [ ] 扩展正文至 800–1200 词：规则、队形、时间控制、示例词、常见问题（`src/app/[locale]/reverse-charades-game/page.tsx`）。
  - [ ] 从首页与 How-To 页增加 2–3 个相关锚文本链接回该页。

- [ ] Christmas Charades 季节性优化（当前曝光低）
  - [ ] 丰富内容模块：示例词清单、派对玩法、可打印资源（`src/app/[locale]/christmas-charades-generator/page.tsx`）。
  - [ ] 在首页与导航临时提升入口权重（季节窗口内）。

- [ ] 桌面端体验专项（桌面平均排名 35.07，CTR 2.75%）
  - [ ] 提升桌面首屏信息密度：首屏可见“主要功能 + 简要说明 + 明确 CTA”（`src/components/HomeLanding.tsx` 及相关样式）。
  - [ ] 检查并优化 LCP/CLS（大图懒加载、字体加载、容器尺寸占位）。
  - [ ] 调整桌面排版（字号、对比度、按钮尺寸、折叠逻辑）。

- [ ] 结构化数据可见性提升
  - [x] 新增面包屑 JSON-LD 注入（Word/Reverse/Christmas/Disney/Movie/Kids 已接入）。
  - [x] 在 How-To 页加入 HowTo JSON-LD（`src/app/[locale]/how-to-use/page.tsx`）。

- [ ] 标题模板与 CTR 提升
  - [ ] 核心专题页标题加入数量与“Free/Printable/2025”等修饰（如：Disney Charades Generator (200+ Prompts) — Free & Printable）。
  - [ ] 检查 `generateMetadata` 中 `title/description` 一致对齐，避免截断与冗长（各 `src/app/[locale]/**/page.tsx`）。

- [ ] 版本与重定向一致性
  - [ ] 确认 https 与带尾斜杠 301 强制（Cloudflare/Vercel 层配置）。
  - [ ] GSC 中观察 `http://` 与无斜杠 URL 是否继续出现，必要时加路由级兜底。

## 中期优先级（2–6 周）

- [ ] 内容集群深化（Movie/Disney/Kids/Random）
  - [ ] 每页扩展为 1000–1500 词结构：规则 + 示例 + Tips + FAQ + 下载资源。
  - [ ] 统一信息架构与模块命名，利于模版复用与内部链接。

- [ ] 导航与页脚内链体系
  - [x] 在相关主题页尾部添加“你可能还想试试”交叉模块（Disney/Movie/Kids/Random）。
  - [x] Footer 中补充核心链接（Word Generator、Reverse）。

- [ ] 本地化深化
  - [ ] 强化西语版本内容与内链（`/es/`），并评估新增 PT/DE。

- [ ] 信任与品牌信号
  - [ ] 作者/评审信息与更新时间戳（文章头或尾）。
  - [ ] 可打印资源下载页（PDF/图片），争取自然外链。

- [ ] 外链与引用
  - [ ] 轻量 Outreach（派对/家庭活动/教育博客），争取 3–5 条垂直外链。

## 需要改动/新增的关键文件

- 首页与专题路由：
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/disney-charades-generator/page.tsx`
  - `src/app/[locale]/movie-charades-generator/page.tsx`
  - `src/app/[locale]/random-charades-generator/page.tsx`
  - `src/app/[locale]/charades-generator-for-kids/page.tsx`
  - `src/app/[locale]/reverse-charades-game/page.tsx`
  - `src/app/[locale]/christmas-charades-generator/page.tsx`
  - （新增）`src/app/[locale]/word-charades-generator/page.tsx`

- 公共 SEO/结构化数据：
  - `src/utils/seo.ts`
  - `src/app/sitemap.ts`
  - `src/components/StructuredData.tsx`
  - （新增）`src/components/BreadcrumbStructuredData.tsx`

- 导航与首页：
  - `src/components/navigation/MobileNavigation.tsx`
  - `src/components/Navigation.tsx`（若存在）
  - `src/components/HomeLanding.tsx`

## 验证与监测

- [ ] 技术验证
  - [ ] Lighthouse（移动/桌面）≥ 90，关注 LCP/CLS；保存前后对比。
  - [ ] URL Inspection/Live Test 验证关键页可抓取、可索引与结构化数据生效。
  - [ ] 检查 sitemap、canonical、hreflang 是否一致（英文/西语）。

- [ ] GSC 指标追踪（按周）
  - [ ] 首页：展示、点击、CTR、平均排名（目标：排名 < 10、CTR > 5%）。
  - [ ] Word/Reverse/Christmas：新增页或增强页的 impressions/clicks 曲线（上线后 2–4 周观察）。
  - [ ] 设备分布：桌面 CTR 与排名差距收敛（目标：桌面 CTR 提升 50%+）。
  - [ ] 富结果：HowTo/Breadcrumb 出现的展现量与 CTR 变化。

## 交付标准（Definition of Done）

- [ ] 相关页面元信息、正文与内链按上文更新并通过预览核对。
- [ ] 新增路由已加入 sitemap 且可抓取。
- [ ] 结构化数据（Breadcrumb/HowTo/FAQ）在 Rich Results Test 可见，无严重错误。
- [ ] Lighthouse（桌面/移动）达标，布局无明显 CLS，首屏信息密度提升。
- [ ] GSC 一周后数据开始体现 CTR/排名改善趋势（持续观测）。

---

负责人/Owner：__________    截止日期/Due：__________    备注：__________
