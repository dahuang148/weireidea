---
name: weibo-trend-analyzer
description: "Analyzes Weibo (微博) trending topics and generates product innovation ideas. Use this skill when the user wants to: (1) Fetch current Weibo hot search rankings, (2) Analyze trending topics for product opportunities, (3) Generate creative product concepts based on social trends, (4) Create comprehensive HTML reports with trend analysis and product ideas scored by interest (80%) and utility (20%). Ideal for product managers, entrepreneurs, and innovation teams looking to identify market opportunities from social media trends."
license: MIT
---

# Weibo Trend Analyzer - 微博热搜产品创意分析

## Overview

This skill automatically fetches Weibo trending topics, researches each topic's background and news, analyzes them using AI to extract product innovation opportunities, and generates a comprehensive HTML report with scoring and highlighting.

**Keywords**: Weibo, trending topics, hot search, product innovation, market analysis, trend analysis, product ideas, social media trends, 微博热搜

## Workflow

The skill follows a 4-step process:

### Step 1: Fetch Weibo Trending Topics
- Use the provided API endpoint to fetch current Weibo hot search rankings
- Extract topic titles, heat scores, and URLs
- Handle API errors gracefully

### Step 2: Research Each Topic
- For each trending topic, use WebSearch tool to find:
  - Latest news articles about the topic
  - Background information and context
  - Key events and timeline
  - Public reactions and discussions
- Compile detailed information for each topic

### Step 3: AI Analysis for Product Ideas
- Analyze each topic using the following scoring framework:
  - **Interest Score (80 points)**: How engaging, novel, or emotionally resonant is this trend?
  - **Utility Score (20 points)**: How practical or useful could products based on this trend be?
  - **Total Score (100 points)**: Combined score for ranking

- For each topic, generate product ideas including:
  - **Product Name**: Creative, memorable name
  - **Core Features**: 3-5 key functionalities
  - **Target Users**: Specific user personas and demographics
  - **Innovation Angle**: What makes this product unique based on the trend

### Step 4: Generate HTML Report
- Create a comprehensive HTML report with:
  - List-based layout showing all analyzed topics
  - For each topic:
    - Event timeline and background
    - Product idea details
    - Comprehensive score (interest + utility)
  - Visual highlighting:
    - **Excellent (80-100 points)**: Prominent highlighting with special styling
    - **Good (60-79 points)**: Moderate highlighting
    - **Below 60 points**: Standard styling
  - Responsive design for easy viewing
  - Professional styling with clear visual hierarchy

## Instructions

When the user invokes this skill, follow these steps:

### Phase 1: API Setup and Data Fetching

1. **Ask for API Endpoint**: If the user hasn't provided the Weibo API endpoint, ask them to provide it.

2. **Fetch Trending Data**: Use the Bash tool with curl to fetch data from the API:
   ```bash
   curl -X GET "API_ENDPOINT_HERE" -H "Content-Type: application/json"
   ```

3. **Parse Response**: Extract the following information for each trending topic:
   - Topic title/name
   - Heat score or ranking
   - Topic URL (if available)
   - Brief description (if available)

4. **Validate Data**: Ensure you have at least 10-20 trending topics to analyze. If the API fails, inform the user and ask for an alternative endpoint or manual input.

### Phase 2: Deep Research for Each Topic

For each trending topic (process in batches of 5 to manage context):

1. **Web Search**: Use the WebSearch tool to find information:
   ```
   Query format: "[Topic Name] 最新新闻 2026" or "[Topic Name] news background"
   ```

2. **Compile Event Timeline**: From search results, extract:
   - What happened (key events)
   - When it happened (timeline)
   - Who is involved (people, organizations)
   - Why it's trending (significance)
   - Public reactions and impact

3. **Create Topic Summary**: Write a 2-3 paragraph summary for each topic including:
   - Background context
   - Current status
   - Why people care about it

### Phase 3: Product Innovation Analysis

For each topic with its research summary, perform AI analysis:

1. **Interest Score Analysis (80 points max)**:
   - Emotional resonance: Does it evoke strong feelings? (0-25 points)
   - Novelty factor: Is it fresh and unexpected? (0-25 points)
   - Viral potential: Could it spread further? (0-15 points)
   - Cultural relevance: Does it tap into zeitgeist? (0-15 points)

2. **Utility Score Analysis (20 points max)**:
   - Practical application: Can it solve real problems? (0-10 points)
   - Market demand: Is there genuine need? (0-10 points)

3. **Generate Product Ideas**: For each topic, create 1-2 product concepts:

   **Product Name**:
   - Creative, memorable, relevant to the trend
   - Should be in Chinese or bilingual

   **Core Features** (3-5 features):
   - Specific functionalities tied to the trend
   - Innovative approaches to leverage the trend
   - Technical feasibility considerations

   **Target Users**:
   - Specific demographics (age, interests, behaviors)
   - User pain points this addresses
   - Why they would care about this product

   **Innovation Angle**:
   - What makes this unique
   - How it capitalizes on the trend timing
   - Competitive advantages

4. **Calculate Final Score**: Sum interest + utility scores (max 100 points)

### Phase 4: HTML Report Generation

Generate a comprehensive HTML report with the following structure:

1. **HTML Structure**:
   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>微博热搜产品创意分析报告</title>
       <style>
           /* Styling will be added here */
       </style>
   </head>
   <body>
       <!-- Report content -->
   </body>
   </html>
   ```

2. **Report Header**:
   - Title: "微博热搜产品创意分析报告"
   - Generation date and time
   - Total number of topics analyzed
   - Summary statistics (average score, excellent count, good count)

3. **Topic List Layout**:
   - Sort topics by score (highest to lowest)
   - Each topic card should include:
     - Ranking badge
     - Topic title
     - Score badge with color coding
     - Event timeline section
     - Product idea section

4. **Score-Based Styling**:
   - **Excellent (80-100 points)**:
     - Background: Gradient gold/yellow (#FFD700 to #FFA500)
     - Border: 3px solid gold
     - Shadow: Large, prominent
     - Badge: "优秀" in bold
     - Font size: Larger for title

   - **Good (60-79 points)**:
     - Background: Light blue/green (#E8F5E9 to #E3F2FD)
     - Border: 2px solid #4CAF50
     - Shadow: Medium
     - Badge: "良好"

   - **Below 60 points**:
     - Background: Light gray (#F5F5F5)
     - Border: 1px solid #CCCCCC
     - Shadow: Subtle
     - Badge: Score only

5. **Topic Card Content Structure**:

   Each card should contain:

   **A. Header Section**:
   - Ranking number (e.g., "#1", "#2")
   - Topic title (large, bold)
   - Score badge (right-aligned)
   - Interest score breakdown
   - Utility score breakdown

   **B. Event Timeline Section**:
   - Section title: "📰 事件脉络"
   - Background summary (2-3 paragraphs)
   - Key events in chronological order
   - Current status and impact

   **C. Product Idea Section**:
   - Section title: "💡 产品创意"
   - Product name (highlighted)
   - Core features (bulleted list)
   - Target users (with demographics)
   - Innovation angle (why it's unique)

6. **CSS Styling Guidelines**:

   Use modern, clean CSS with:
   - CSS Grid or Flexbox for layout
   - Responsive design (mobile-friendly)
   - Smooth transitions and hover effects
   - Professional color palette
   - Clear typography hierarchy
   - Proper spacing and padding

7. **Save the Report**:
   - Filename format: `weibo-trend-report-YYYY-MM-DD.html`
   - Save to current working directory
   - Inform user of the file location

## Best Practices

### Scoring Guidelines

When analyzing topics, be objective and consistent:

- **High Interest (65-80 points)**: Topics with strong emotional impact, widespread discussion, celebrity involvement, or cultural significance
- **Medium Interest (40-64 points)**: Topics with moderate public interest, niche appeal, or regional significance
- **Low Interest (0-39 points)**: Topics with limited appeal, technical nature, or narrow audience

- **High Utility (15-20 points)**: Clear problem-solving potential, large market demand, practical applications
- **Medium Utility (8-14 points)**: Some practical value, moderate market potential
- **Low Utility (0-7 points)**: Limited practical application, entertainment-focused

### Product Idea Quality

Ensure product ideas are:
- **Specific**: Not vague concepts, but concrete products with clear features
- **Feasible**: Technically and commercially viable
- **Timely**: Capitalize on the trend while it's relevant
- **Differentiated**: Offer unique value, not just copying existing products

## Error Handling

Handle common issues gracefully:

1. **API Failures**:
   - If API returns error, ask user for alternative endpoint
   - Offer to proceed with manual topic input
   - Log error details for debugging

2. **Web Search Limitations**:
   - If search returns no results, try alternative queries
   - Use broader search terms if specific ones fail
   - Document topics that couldn't be researched

3. **Incomplete Data**:
   - Proceed with available information
   - Mark incomplete analyses in the report
   - Suggest manual review for low-confidence items

## Example Usage

### Example 1: Basic Usage

**User**: "请使用微博热搜分析技能，API地址是 https://api.example.com/weibo/hot"

**Expected Flow**:
1. Fetch trending topics from API
2. Research each topic (5 at a time)
3. Analyze and score each topic
4. Generate HTML report
5. Save as `weibo-trend-report-2026-02-10.html`

### Example 2: Product Idea Sample

**Topic**: "AI绘画工具爆火"

**Scores**:
- Interest: 72/80 (high novelty, strong viral potential)
- Utility: 16/20 (practical application, market demand)
- Total: 88/100 (Excellent)

**Product Idea**:
- **Name**: "创意灵感库 - AI设计助手"
- **Core Features**:
  - AI生成多风格设计稿
  - 一键导出商用格式
  - 设计历史版本管理
  - 团队协作与分享
- **Target Users**: 自媒体创作者、小型设计工作室、电商卖家（25-40岁）
- **Innovation Angle**: 结合热门AI绘画趋势，专注商用场景，降低设计门槛

## Limitations

This skill has the following limitations:

1. **API Dependency**: Requires a valid Weibo trending API endpoint
2. **Web Search Availability**: Requires WebSearch tool access (US region only)
3. **Language**: Primarily designed for Chinese content analysis
4. **Rate Limits**: May be limited by API and search rate limits
5. **Real-time Data**: Analysis is based on data at time of execution

## Technical Requirements

### Required Tools
- **Bash**: For API calls using curl
- **WebSearch**: For researching topic backgrounds
- **Write**: For generating HTML report file

### Output Format
- Single HTML file with embedded CSS
- UTF-8 encoding for Chinese characters
- Responsive design (mobile and desktop)
- No external dependencies (self-contained)

## Execution Summary

When this skill is invoked, follow this sequence:

1. **Confirm API endpoint** with user
2. **Fetch trending topics** (10-50 topics)
3. **Research in batches** (5 topics at a time to manage context)
4. **Analyze and score** each topic systematically
5. **Generate HTML report** with proper styling
6. **Save and notify** user of completion

### Important Notes

- **Batch Processing**: Process topics in groups of 5 to avoid context overflow
- **Progress Updates**: Inform user of progress after each batch
- **Quality Over Speed**: Take time to research thoroughly
- **Consistent Scoring**: Apply scoring criteria uniformly across all topics
- **Chinese Language**: All content should be in Chinese unless specified otherwise

