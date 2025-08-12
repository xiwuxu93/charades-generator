# 📦 KV Namespace 设置指南 - 修复版

## 🎯 概述

本项目需要 KV namespace 来存储用户反馈数据。我们将通过 Cloudflare Pages Dashboard 来配置，这是最简单可靠的方法。

## 🚀 创建 KV Namespace

### 步骤 1：创建 KV Namespace

#### 方法 A：通过 Cloudflare Dashboard（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** > **KV**
3. 点击 **Create a namespace**
4. 输入名称：`charades-feedback`
5. 点击 **Add**
6. 记录创建的 namespace ID（类似：`a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`）

#### 方法 B：通过 Wrangler CLI

```bash
# 安装并登录 wrangler（如果还没有）
npm install -g wrangler
wrangler auth login

# 创建 namespace
wrangler kv:namespace create "charades-feedback"
```

### 步骤 2：配置 Pages 项目绑定

1. 在 Cloudflare Dashboard 中找到你的 Pages 项目
2. 进入 **Settings** > **Functions**
3. 滚动到 **KV namespace bindings** 部分
4. 点击 **Add binding**
5. 配置：
   - **Variable name**: `FEEDBACK_KV`
   - **KV namespace**: 选择刚创建的 `charades-feedback`
6. 点击 **Save**

## 🚀 部署项目

现在可以安全部署了：

```bash
# 构建项目
npm run cf:build

# 部署到生产环境
npm run deploy
```

## 🔍 验证设置

### 1. 检查 API 端点

部署完成后，访问：

```
https://your-project.pages.dev/api/feedback
```

应该返回类似这样的 JSON：

```json
{
  "success": true,
  "totalRecentFeedbacks": 0,
  "dailyStats": [...]
}
```

### 2. 测试反馈提交

1. 访问 `https://your-project.pages.dev/feedback`
2. 填写并提交反馈表单
3. 检查是否显示成功消息

### 3. 验证数据存储

在 Cloudflare Dashboard 中：

1. 进入 **Workers & Pages** > **KV**
2. 点击你的 namespace
3. 应该能看到存储的反馈数据

## 🐛 故障排除

### 错误：Invalid KV namespace ID

如果看到这个错误，说明：

1. KV namespace 还没有创建
2. 或者 Pages 项目中的绑定配置不正确

**解决方案**：

1. 确保已创建 KV namespace
2. 在 Pages 项目设置中正确配置绑定
3. 重新部署项目

### 错误：KV namespace not found

这通常意味着：

1. 绑定的变量名不是 `FEEDBACK_KV`
2. 或者选择了错误的 namespace

**解决方案**：

1. 检查变量名必须是 `FEEDBACK_KV`
2. 确认选择了正确的 namespace
3. 保存设置后重新部署

### API 仍然返回 404

如果 API 仍然不工作：

1. 检查构建是否成功
2. 确认 `functions/api/feedback.ts` 文件存在
3. 查看 Pages 部署日志
4. 检查 Functions 执行日志

## 📊 数据结构说明

### 反馈记录格式

每个反馈会存储为：

```json
{
  "id": "feedback_1673123456789_abc123def",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "usage_purpose": "Get multiple words for offline charades game",
  "primary_scenario": "family_home",
  "word_count_preference": "5-10 words for multiple rounds",
  "missing_features": "Timer function would be great",
  "user_type": "parent",
  "satisfaction": "4",
  "improvement_suggestions": "Add difficulty levels",
  "contact_email": "test@example.com",
  "user_agent": "Mozilla/5.0...",
  "ip_address": "192.168.1.1"
}
```

### 日期索引

为了便于管理，系统还会创建日期索引：

```json
// Key: "daily_2024-01-01"
// Value: ["feedback_id_1", "feedback_id_2", "feedback_id_3"]
```

---

**下一步**: 创建 KV namespace 后，运行 `npm run deploy` 部署项目
