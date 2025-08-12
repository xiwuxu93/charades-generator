# 📦 KV Namespace 设置指南

## 🎯 概述

本项目需要两个 KV namespace：

- **Preview 环境**: `feedback-preview`
- **Production 环境**: `feedback-production`

## 🚀 创建 KV Namespaces

### 1. 通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** > **KV**
3. 点击 **Create a namespace**
4. 创建两个 namespace：
   - 名称: `feedback-preview`
   - 名称: `feedback-production`
5. 记录每个 namespace 的 ID

### 2. 通过 Wrangler CLI

```bash
# 创建 preview namespace
wrangler kv:namespace create "feedback-preview"

# 创建 production namespace
wrangler kv:namespace create "feedback-production"
```

## 🔧 配置 Pages 项目

### 1. 进入 Pages 项目设置

1. 在 Cloudflare Dashboard 中找到你的 Pages 项目
2. 进入 **Settings** > **Functions**

### 2. 配置 KV Namespace 绑定

#### Preview 环境

- **Variable name**: `FEEDBACK_KV`
- **KV namespace**: 选择 `feedback-preview`

#### Production 环境

- **Variable name**: `FEEDBACK_KV`
- **KV namespace**: 选择 `feedback-production`

## 📝 更新 wrangler.toml

如果你有实际的 namespace ID，可以更新 `wrangler.toml`：

```toml
# Preview environment
[env.preview]
kv_namespaces = [
  { binding = "FEEDBACK_KV", id = "your-preview-namespace-id" }
]

# Production environment
[env.production]
kv_namespaces = [
  { binding = "FEEDBACK_KV", id = "your-production-namespace-id" }
]
```

## 🧪 测试 KV 连接

### 1. 部署到 Preview

```bash
npm run deploy:preview
```

### 2. 测试 API 端点

访问你的 preview URL：

```
https://your-project.pages.dev/api/feedback
```

应该返回统计信息而不是 404 错误。

### 3. 测试反馈提交

在 preview 环境中提交一个测试反馈，然后检查 KV namespace 中是否有数据。

## 🔍 验证数据存储

### 通过 Dashboard

1. 进入 **Workers & Pages** > **KV**
2. 点击你的 namespace
3. 查看存储的键值对

### 通过 Wrangler CLI

```bash
# 列出所有键
wrangler kv:key list --namespace-id="your-namespace-id"

# 获取特定键的值
wrangler kv:key get "feedback_123456789_abc" --namespace-id="your-namespace-id"
```

## 🐛 故障排除

### KV 绑定错误

如果看到 "KV namespace not found" 错误：

1. 确认 namespace 已创建
2. 检查绑定的变量名是 `FEEDBACK_KV`
3. 确认选择了正确的 namespace

### 权限问题

确保你的 Cloudflare 账户有权限：

- 创建和管理 KV namespaces
- 配置 Pages 项目设置

### 数据不显示

如果数据没有正确存储：

1. 检查 Functions 日志
2. 确认 API 调用成功
3. 验证 KV 绑定配置

## 📊 数据结构

### 反馈记录格式

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

### 日期索引格式

```json
// Key: "daily_2024-01-01"
["feedback_id_1", "feedback_id_2", "feedback_id_3"]
```

---

**下一步**: 创建 KV namespaces 后，运行 `npm run deploy:preview` 测试配置
