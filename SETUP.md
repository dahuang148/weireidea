# GitHub Actions 配置指南

## 第一步：添加 Secrets

进入您的 GitHub 仓库：

1. 点击 **Settings** 标签页
2. 左侧菜单选择 **Secrets and variables** → **Actions**
3. 点击 **New repository secret** 按钮

### 添加 CLAUDE_API_KEY

- **Name**: `CLAUDE_API_KEY`
- **Value**: `gr_0478be1a5ee06daa6d11003f97f3faacf4b2e5a8b77fb22e2830a6a658e12345`

点击 **Add secret** 保存。

### 添加 CLAUDE_API_BASE（可选）

- **Name**: `CLAUDE_API_BASE`
- **Value**: `https://api.uucode.org`

点击 **Add secret** 保存。

### 添加 WEIBO_API_ENDPOINT（可选）

如果您有自己的微博 API：

- **Name**: `WEIBO_API_ENDPOINT`
- **Value**: `您的微博API地址`

点击 **Add secret** 保存。

## 第二步：启用 GitHub Actions

1. 进入仓库的 **Actions** 标签页
2. 如果看到提示，点击 **I understand my workflows, go ahead and enable them**
3. 您应该能看到 "Weibo Trend Analysis" 工作流

## 第三步：手动测试运行

1. 在 Actions 页面，点击 **Weibo Trend Analysis** 工作流
2. 点击右侧的 **Run workflow** 按钮
3. 点击绿色的 **Run workflow** 确认
4. 等待工作流执行完成（约 5-10 分钟）

## 第四步：查看结果

执行完成后：

1. 点击工作流运行记录
2. 在 **Artifacts** 部分下载生成的报告
3. 或者在仓库根目录查看提交的 HTML 文件

## 自动执行时间

工作流会在每天 **北京时间 9:00**（UTC 1:00）自动执行。

如需修改时间，编辑 `.github/workflows/weibo-trend-analysis.yml` 文件中的 cron 表达式。
