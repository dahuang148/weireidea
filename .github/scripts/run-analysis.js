#!/usr/bin/env node

/**
 * Weibo Trend Analysis using Third-party Claude API
 * This script runs the weibo-trend-analyzer skill via GitHub Actions
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_BASE = process.env.CLAUDE_API_BASE || 'https://code.newcli.com/claude/aws';
const WEIBO_API_ENDPOINT = process.env.WEIBO_API_ENDPOINT || 'https://apis.tianapi.com/weibohot/index?key=fb9e1bf78f44d1d927fcf18883d114fb';

if (!CLAUDE_API_KEY) {
  console.error('Error: CLAUDE_API_KEY environment variable is required');
  process.exit(1);
}

/**
 * Fetch Weibo trending topics
 */
async function fetchWeiboTrends() {
  return new Promise((resolve, reject) => {
    const url = new URL(WEIBO_API_ENDPOINT || 'https://weibo.com/ajax/side/hotSearch');

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://weibo.com'
      }
    };

    console.log(`Requesting: ${url.href}`);

    const req = https.request(options, (res) => {
      console.log(`Response status: ${res.statusCode}`);
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`API returned status ${res.statusCode}`);
          console.error('Response:', data.substring(0, 500));
          resolve([]);
          return;
        }

        try {
          const json = JSON.parse(data);

          // Handle tianapi.com response format
          if (json.code === 200 && json.result?.list) {
            const trends = json.result.list;
            console.log(`Parsed ${trends.length} trends from tianapi`);
            resolve(trends.map((t, index) => ({
              title: t.hotword || t.title,
              heat: t.hotwordnum || 0,
              rank: index + 1
            })));
          }
          // Handle weibo.com response format
          else if (json.data?.realtime) {
            const trends = json.data.realtime;
            console.log(`Parsed ${trends.length} trends from weibo`);
            resolve(trends.map(t => ({
              title: t.word || t.note,
              heat: t.num || 0,
              rank: t.rank || 0
            })));
          }
          else {
            console.error('Unknown response format:', JSON.stringify(json).substring(0, 200));
            resolve([]);
          }
        } catch (e) {
          console.error('Parse error:', e.message);
          console.error('Response:', data.substring(0, 500));
          resolve([]);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e.message);
      resolve([]);
    });

    req.setTimeout(10000, () => {
      console.error('Request timeout');
      req.destroy();
      resolve([]);
    });

    req.end();
  });
}

/**
 * Call Claude API
 */
async function callClaudeAPI(messages, systemPrompt) {
  return new Promise((resolve, reject) => {
    const url = new URL('/claude/aws/v1/messages', CLAUDE_API_BASE);

    const postData = JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 16000,
      system: systemPrompt,
      messages: messages
    });

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        } else {
          reject(new Error(`API error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('Starting Weibo Trend Analysis...');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`API Base: ${CLAUDE_API_BASE}`);

  try {
    const skillPath = path.join(__dirname, '../../skills/weibo-trend-analyzer/SKILL.md');
    const skillContent = fs.readFileSync(skillPath, 'utf-8');
    console.log('Skill loaded successfully');

    const systemPrompt = `You are a Weibo trend analysis and product innovation expert. You will receive Weibo trending topics data and generate creative product ideas based on social trends.`;

    const today = new Date().toISOString().split('T')[0];

    // First, fetch Weibo trending topics
    console.log('Fetching Weibo trending topics...');
    let weiboData = await fetchWeiboTrends();

    if (!weiboData || weiboData.length === 0) {
      console.warn('Failed to fetch real data, using fallback topics');
      // Use fallback data for demonstration
      weiboData = [
        { title: '人工智能发展趋势', heat: 5000000, rank: 1 },
        { title: '新能源汽车市场', heat: 4500000, rank: 2 },
        { title: '远程办公工具', heat: 4000000, rank: 3 },
        { title: '健康生活方式', heat: 3500000, rank: 4 },
        { title: '在线教育平台', heat: 3000000, rank: 5 }
      ];
    }

    console.log(`Fetched ${weiboData.length} trending topics`);

    const userMessage = `Based on these Weibo trending topics, generate a comprehensive HTML report with product innovation ideas.

Trending Topics:
${JSON.stringify(weiboData.slice(0, 20), null, 2)}

Requirements:
1. Analyze each topic and score it based on:
   - Interest Score (80%): How engaging and novel is this trend?
   - Utility Score (20%): How practical are products based on this trend?
2. Generate creative product ideas for high-scoring topics
3. Output COMPLETE HTML code (from <!DOCTYPE html> to </html>)
4. Use modern, beautiful styling with gradients and cards
5. Include topic rankings, scores, and product ideas

CRITICAL: Output the FULL HTML code directly. Do NOT use any tool calls or function calls.`;

    console.log('Calling Claude API...');
    const response = await callClaudeAPI([{ role: 'user', content: userMessage }], systemPrompt);

    console.log('✅ Analysis completed');
    const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
    console.log('Response length:', text.length, 'characters');
    console.log('Response preview:', text.substring(0, 300) + '...');

    // Extract HTML content from response (handle markdown code blocks)
    let htmlContent = null;

    // Try to extract from markdown code block first (more flexible matching)
    const markdownMatch = text.match(/```html\s*([\s\S]*?)```/i);
    if (markdownMatch) {
      htmlContent = markdownMatch[1].trim();
      console.log('Extracted HTML from markdown code block');
    }

    // If markdown extraction failed, try without closing ```
    if (!htmlContent && text.includes('```html')) {
      const startIndex = text.indexOf('```html') + 7;
      const endIndex = text.lastIndexOf('```');
      if (endIndex > startIndex) {
        htmlContent = text.substring(startIndex, endIndex).trim();
        console.log('Extracted HTML from partial markdown block');
      } else {
        // No closing ```, take everything after ```html
        htmlContent = text.substring(startIndex).trim();
        console.log('Extracted HTML without closing marker');
      }
    }

    // Try to extract raw HTML as fallback
    if (!htmlContent) {
      const htmlMatch = text.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);
      if (htmlMatch) {
        htmlContent = htmlMatch[0];
        console.log('Extracted raw HTML');
      }
    }

    if (htmlContent && htmlContent.includes('<!DOCTYPE html>')) {
      const reportFileName = `weibo-trend-report-${today}.html`;
      fs.writeFileSync(reportFileName, htmlContent, 'utf-8');
      const stats = fs.statSync(reportFileName);
      console.log(`\n✅ Report saved: ${reportFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.warn('\n⚠️  No valid HTML content found in response');
      console.log('Response starts with:', text.substring(0, 100));
      console.log('Response ends with:', text.substring(text.length - 100));
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
