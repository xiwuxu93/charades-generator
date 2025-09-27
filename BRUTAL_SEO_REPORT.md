# BRUTAL SEO评估对照报告 – Google 2025「视角」算法

## 1. 关键差异总览

| 项目 | 外部报告结论 | 实际状况/本次评估 | 影响说明 |
| --- | --- | --- | --- |
| 结构化数据 | ✅ **完整的 JSON-LD** | ❌ `inLanguage`、描述、站点信息全部锁定英文（`src/components/StructuredData.tsx:45`、`src/components/WebsiteStructuredData.tsx:9`），西语页标记与正文冲突 | 视角算法与富结果判定会视为「语言不一致」，难进 Perspectives/SERPs 富展示 |
| 语言信号 | ✅ **多语言支持 + hreflang** | ❌ 服务器端 `<html lang>` 始终输出 `en`（`src/app/layout.tsx:62`），与 hreflang 相互矛盾 | Google 将 `/es` 视作英文副本，视角算法失去跨语种视角加分 |
| 站点地图 | ✅ **动态 sitemap 已优化** | ❌ `getPageFilePath` 拼接失败，所有 `lastmod` 回退默认 `2025-08-01`（`src/app/sitemap.ts:29`） | 无真实更新信号，爬虫频率下降，视角算法无法感知新鲜度 |
| OpenGraph/Twitter Cards | ✅ **完整覆盖** | ❌ 子页 `generateMetadata` 覆盖 `openGraph` 却缺少 `images`（如 `src/app/[locale]/random-charades-generator/page.tsx:38`） | 社交/SGE 预览失效，视角卡片曝光机会下降 |
| 信任与 E-E-A-T | 未提及 | ❌ 无明示联系人、团队、更新日志（`src/i18n/dictionaries/en.ts:392`） | 视角算法强调「可信叙述者」，站点缺乏权威背书 |
| 内容深度 | ⚠️ 深度不足 | ⚠️ 与本评估一致，但若技术层面不修复，新增内容也难获权重 | 必须同时解决技术 + 信任缺陷 |
| 差异化创新 | ❗ 提议诸多长期功能（AI 难度、在线房间等） | ✅ 可列为长线规划，但需在修复基础信号后执行 | 当前优先级应是语言/结构化/信任修复 |

## 2. 优先整改路径

1. **技术信号修复（最高优先）**
   - 依据 locale 动态输出 `<html lang>`、`hreflang`、`StructuredData`。
   - 修正 `sitemap.ts` 路径拼接，写入真实 `lastModified`。
   - 为所有页面补齐 `openGraph.images`、Twitter 卡片。

2. **可信/E-E-A-T 加固**
   - 公布团队信息、实名邮箱、隐私/条款修订记录；在结构化数据中同步。
   - 建立 Cookie 同意/合规流程，延迟 GTM/AdSense。

3. **视角内容运营**
   - 引入多身份实战案例（家庭、教师、主持人等）与 UGC。
   - 补充音视频、玩法复盘、更新日志，满足多视角叙事。

4. **长线创新（在技术/信任完成后）**
   - 迭代 AI 难度评估、个性化推荐、社区功能。
   - 保持多语言同步，避免再度出现标记不一致。

## 3. 结论

- 外部报告聚焦内容层面，却错误判定基础信号「已完善」，忽略了最致命的语言与结构化数据缺陷。
- 若仅按其路线执行，即使新增大量深度内容，Google 仍会把站点视作缺乏真实视角的英文工具站，难以获得 2025/09 「视角」算法加权。
- 建议先按本报告的技术 → 信任 → 多视角步骤执行，再吸收外部报告的内容与功能创意，才能真正恢复曝光与排名。

