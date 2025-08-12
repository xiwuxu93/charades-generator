# 🚨 快速修复：KV Namespace ID 错误

## 错误信息

```
Error 8000022: Invalid KV namespace ID (feedback-production). Not a valid hex string.
```

## ✅ 已修复

我已经修复了 `wrangler.toml` 配置，移除了无效的 KV namespace ID。

## 🚀 现在需要做的

### 1. 创建 KV Namespace

**通过 Cloudflare Dashboard（最简单）：**

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** > **KV**
3. 点击 **Create a namespace**
4. 名称输入：`charades-feedback`
5. 点击 **Add**

### 2. 配置 Pages 项目

1. 在 Dashboard 中找到你的 Pages 项目
2. 进入 **Settings** > **Functions**
3. 找到 **KV namespace bindings** 部分
4. 点击 **Add binding**
5. 配置：
   - **Variable name**: `FEEDBACK_KV`
   - **KV namespace**: 选择 `charades-feedback`
6. 点击 **Save**

### 3. 重新部署

```bash
npm run deploy
```

## 🎯 为什么这样修复？

1. **移除硬编码 ID**：`wrangler.toml` 中不再包含无效的 namespace ID
2. **使用 Dashboard 配置**：Cloudflare Pages 会自动处理 KV 绑定
3. **简化配置**：避免了手动管理 namespace ID 的复杂性

## ✅ 修复后的文件

`wrangler.toml` 现在只包含基本配置：

```toml
name = "charades-generator"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".vercel/output/static"
```

KV 绑定通过 Pages Dashboard 管理，更加可靠。

## 🔍 验证修复

部署成功后，访问：

```
https://your-project.pages.dev/api/feedback
```

应该返回 JSON 数据而不是 404 错误。

---

**状态**: ✅ 配置已修复，等待 KV namespace 创建和绑定
