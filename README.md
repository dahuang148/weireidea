# Weibo Trend Analyzer - GitHub Actions Integration

## 概述

本项目使用**第三方 Claude API** 在 GitHub Actions 中自动化运行微博热搜分析，生成产品创意报告。

## 功能特性

- ✅ 自动抓取微博热搜榜单
- ✅ AI 深度分析每个热点话题
- ✅ 生成产品创新创意
- ✅ 评分系统（兴趣度 80% + 实用性 20%）
- ✅ 生成精美的 HTML 报告
- ✅ 定时自动执行（每天北京时间 9:00）
- ✅ 支持手动触发

## 技术架构

```
GitHub Actions
    ↓
Third-party Claude API (uucode.org)
    ↓
Weibo Trend Analyzer Skill
    ↓
HTML Report
```

## 快速开始

### 1. 配置 GitHub Secrets

在您的 GitHub 仓库中设置以下 Secrets：

1. 进入仓库 Settings → Secrets and variables → Actions
2. 添加以下 secrets：

| Secret Name | Description | Required |
|------------|-------------|----------|
| `CLAUDE_API_KEY` | 第三方 Claude API 密钥 | ✅ 必需 |
| `CLAUDE_API_BASE` | API 基础地址 (默认: https://api.uucode.org) | ⚠️ 可选 |
| `WEIBO_API_ENDPOINT` | 微博热搜 API 地址 | ⚠️ 可选 |

### 2. 配置 API Key

将以下信息添加到 GitHub Secrets：

**CLAUDE_API_KEY**:
```
gr_0478be1a5ee06daa6d11003f97f3faacf4b2e5a8b77fb22e2830a6a658e12345
```

**CLAUDE_API_BASE** (可选):
```
https://api.uucode.org
```

> 注意：如果不设置 CLAUDE_API_BASE，默认使用 https://api.uucode.org

### 3. 启用 GitHub Actions

1. 进入仓库的 Actions 标签页
2. 启用 Workflows
3. 工作流将自动按计划运行

## 使用方法

### 自动运行

工作流会在每天北京时间 9:00（UTC 1:00）自动执行。

### 手动触发

1. 进入 Actions 标签页
2. 选择 "Weibo Trend Analysis" 工作流
3. 点击 "Run workflow"
4. （可选）输入自定义的 API Endpoint
5. 点击绿色的 "Run workflow" 按钮

### 查看报告

报告会以两种方式保存：

1. **Artifacts**: 在 Actions 运行页面下载
2. **Git Commit**: 自动提交到仓库根目录

报告文件名格式：`weibo-trend-report-YYYY-MM-DD.html`

## 项目结构

```
weireidea/
├── .github/
│   ├── workflows/
│   │   └── weibo-trend-analysis.yml    # GitHub Actions 工作流
│   └── scripts/
│       └── run-analysis.js              # Claude Agent SDK 脚本
├── skills/
│   └── weibo-trend-analyzer/
│       └── SKILL.md                     # Skill 定义文件
├── package.json                         # Node.js 依赖配置
└── README.md                            # 项目文档
```

## 技术说明

### 第三方 Claude API

本项目使用第三方 Claude API (uucode.org)，具有以下特点：

- ✅ 兼容 Anthropic API 格式
- ✅ 无需 Agent SDK，使用原生 HTTPS 请求
- ✅ 支持 Claude Sonnet 4.5 模型
- ✅ 轻量级实现，无额外依赖

### 工作流程

1. **触发**: 定时或手动触发 GitHub Actions
2. **初始化**: 安装 Node.js 和 Claude Agent SDK
3. **执行**: 运行分析脚本，调用 Claude API
4. **生成**: Claude 执行 skill，生成 HTML 报告
5. **保存**: 上传 Artifact 并提交到仓库

## 配置选项

### 修改执行时间

编辑 `.github/workflows/weibo-trend-analysis.yml`：

```yaml
schedule:
  - cron: '0 1 * * *'  # UTC 1:00 = 北京时间 9:00
```

### 修改 Claude 模型

编辑 `.github/scripts/run-analysis.js`：

```javascript
const agent = new Agent({
  apiKey: ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-5-20250929', // 可改为 claude-opus-4-6
});
```

## 常见问题

### Q: 如何获取微博 API？

A: 您需要自行寻找或搭建微博热搜 API。可以考虑：
- 使用第三方 API 服务
- 自建爬虫服务
- 使用公开的热搜数据源

### Q: 费用如何计算？

A: 费用取决于 Claude API 的使用量。每次分析约消耗：
- Sonnet 4.5: ~$0.50-1.00
- Opus 4.6: ~$2.00-4.00

### Q: 可以分析其他平台吗？

A: 可以！只需修改 skill 定义和 API 接口即可适配其他平台。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 相关链接

- [Claude Agent SDK 文档](https://docs.anthropic.com/agent-sdk)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Anthropic API 文档](https://docs.anthropic.com/)

