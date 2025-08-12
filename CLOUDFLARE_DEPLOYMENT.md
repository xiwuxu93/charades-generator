# Cloudflare Pages 部署指南

本项目已经优化为完全兼容 Cloudflare Pages，包括使用 KV 存储的反馈系统。

## 🚀 快速部署步骤

### 1. 准备 Cloudflare 账户

- 注册/登录 [Cloudflare 账户](https://dash.cloudflare.com)
- 确保账户已验证

### 2. 创建 KV Namespace

1. 进入 Cloudflare Dashboard > Workers & Pages > KV
2. 点击 "Create a namespace"
3. 命名为 `feedback-storage` (或你喜欢的名称)
4. 记录创建的 Namespace ID

### 3. 部署到 Cloudflare Pages

#### 方法一：通过 GitHub 连接（推荐）

1. 进入 Cloudflare Dashboard > Workers & Pages
2. 点击 "Create application" > "Pages" > "Connect to Git"
3. 连接你的 GitHub 仓库
4. 配置构建设置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `out`
   - **Root directory**: `/` (根目录)

#### 方法二：手动上传

1. 本地运行 `npm run build`
2. 上传 `out` 目录到 Cloudflare Pages

### 4. 配置环境变量和绑定

在 Cloudflare Pages 项目设置中：

#### 4.1 KV Namespace 绑定

1. 进入项目 > Settings > Functions
2. 在 "KV namespace bindings" 部分添加：
   - **Variable name**: `FEEDBACK_KV`
   - **KV namespace**: 选择步骤 2 创建的 namespace

#### 4.2 兼容性日期设置

在 Functions 设置中设置：

- **Compatibility date**: `2024-01-01`

### 5. 验证部署

1. 访问你的 Pages 域名
2. 测试反馈表单提交功能
3. 检查 KV namespace 中是否有数据存储

## 📊 KV 存储结构

### 数据存储格式

```javascript
// 单个反馈记录
Key: "feedback_1673123456789_abc123def"
Value: {
  "id": "feedback_1673123456789_abc123def",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "usage_purpose": "Get multiple words for offline charades game",
  "primary_scenario": "family_home",
  // ... 其他字段
}

// 日期索引
Key: "daily_2024-01-01"
Value: ["feedback_id_1", "feedback_id_2", ...]
```

### 数据管理

- 反馈数据自动按日期组织
- 支持最多 1000 条反馈/天的索引
- 可通过 API `/api/feedback` (GET) 获取统计

## 🔧 本地开发

### 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 本地开发模式

```bash
# 启动本地开发服务器
wrangler pages dev out --kv FEEDBACK_KV

# 或者使用 Next.js 开发模式（不包含 KV 功能）
npm run dev
```

## 📈 费用说明

### Cloudflare Pages

- **免费额度**: 500 次构建/月，无限带宽
- **自定义域名**: 免费
- **全球 CDN**: 免费

### Cloudflare KV

- **免费额度**: 每天 100,000 次读取，1,000 次写入
- **估算使用**: 一般网站远低于免费限制
- **付费定价**: 仅在超出时按使用量计费

## 🛠 故障排除

### 常见问题

**1. API 返回 404 错误**

- 确保删除了 `src/app/api` 目录（避免与 Cloudflare Functions 冲突）
- 检查 `functions/api/feedback.ts` 文件存在
- 验证 `public/_routes.json` 配置正确

**2. Functions 无法找到**

- 确保 `functions/` 目录在项目根目录
- 检查文件路径: `functions/api/feedback.ts`
- 确认构建输出目录为 `.vercel/output/static`

**3. KV Namespace 错误**

- 验证绑定名称为 `FEEDBACK_KV`
- 确认 Namespace ID 正确
- 检查 Cloudflare Pages 项目设置中的 KV 绑定

**4. 构建失败**

- 检查 Node.js 版本兼容性
- 确保所有依赖已安装
- 运行 `npm run cf:build` 测试本地构建

**5. CORS 错误**

- API 已包含 CORS 支持
- 检查域名配置

### 调试技巧

1. 查看 Pages 部署日志
2. 使用 `npm run preview` 本地测试
3. 检查浏览器网络面板
4. 使用 `node test-api.js` 测试 API（需要本地服务器运行）

### 本地测试步骤

```bash
# 1. 构建项目
npm run cf:build

# 2. 启动本地预览（需要配置本地 KV）
npm run preview

# 3. 在另一个终端测试 API
node test-api.js
```

## 🔒 安全注意事项

- 反馈数据存储在 Cloudflare KV (符合 GDPR)
- IP 地址仅用于分析，不对外暴露
- 用户邮箱为可选字段
- 建议定期清理旧数据

## 📞 支持

如果遇到部署问题：

1. 检查本文档的故障排除部分
2. 查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
3. 参考 [Cloudflare KV 文档](https://developers.cloudflare.com/workers/runtime-apis/kv/)
