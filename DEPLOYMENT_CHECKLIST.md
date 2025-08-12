# 部署检查清单

## 修复 `/api/feedback` 404 错误

### ✅ 已完成的修复

1. **删除冲突的 Next.js API 路由**

   - 删除了 `src/app/api` 目录
   - 避免与 Cloudflare Functions 路由冲突

2. **配置 Next.js 为静态导出**

   - 更新 `next.config.ts` 添加 `output: 'export'`
   - 配置图片优化为 `unoptimized: true`

3. **创建路由配置**

   - 添加 `public/_routes.json` 确保 API 路由正确处理

4. **更新构建脚本**

   - 修正 package.json 中的部署命令
   - 使用正确的输出目录 `.vercel/output/static`

5. **更新 Wrangler 配置**
   - 配置正确的 pages_build_output_dir

### 🚀 部署步骤

1. **本地测试**

   ```bash
   npm run cf:build
   npm run preview
   ```

2. **部署到 Cloudflare Pages**

   ```bash
   npm run deploy
   ```

3. **配置 KV Namespace**
   - 在 Cloudflare Dashboard 创建 KV namespace
   - 在 Pages 项目设置中绑定 `FEEDBACK_KV`

### 🔍 验证步骤

1. **检查构建输出**

   - 确认 `.vercel/output/static` 目录存在
   - 确认 `functions/api/feedback.ts` 被正确处理

2. **测试 API 端点**

   - 访问 `https://your-domain.pages.dev/api/feedback`
   - 应该返回统计信息（GET 请求）

3. **测试反馈表单**
   - 提交测试反馈
   - 检查 KV namespace 中的数据

### 🐛 如果仍有问题

1. **检查 Cloudflare Pages 日志**

   - 查看部署日志
   - 查看 Functions 执行日志

2. **验证文件结构**

   ```
   project-root/
   ├── functions/
   │   └── api/
   │       └── feedback.ts
   ├── public/
   │   └── _routes.json
   └── .vercel/output/static/
   ```

3. **检查 KV 绑定**
   - 变量名: `FEEDBACK_KV`
   - 指向正确的 KV namespace

### 📞 联系支持

如果问题持续存在：

- 检查 Cloudflare Pages 文档
- 查看 Functions 日志
- 确认 KV namespace 权限
