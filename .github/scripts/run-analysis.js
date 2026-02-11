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
const WEIBO_API_ENDPOINT = process.env.WEIBO_API_ENDPOINT;

if (!CLAUDE_API_KEY) {
  console.error('Error: CLAUDE_API_KEY environment variable is required');
  process.exit(1);
}

/**
 * Call Claude API
 */
async function callClaudeAPI(messages, systemPrompt) {
  return new Promise((resolve, reject) => {
    const url = new URL('/claude/aws/v1/messages', CLAUDE_API_BASE);

    const postData = JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8000,
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

    const systemPrompt = `You are a Weibo trend analysis expert. ${skillContent}`;

    const today = new Date().toISOString().split('T')[0];
    const userMessage = `Please execute the weibo-trend-analyzer skill.
API Endpoint: ${WEIBO_API_ENDPOINT || 'https://weibo.com/ajax/side/hotSearch'}

IMPORTANT: You must output the COMPLETE HTML code directly in your response.
Do NOT just describe the report or say you've saved it.
Output the full HTML starting with <!DOCTYPE html> and ending with </html>.
The HTML filename should be: weibo-trend-report-${today}.html`;

    console.log('Calling Claude API...');
    const response = await callClaudeAPI([{ role: 'user', content: userMessage }], systemPrompt);

    console.log('✅ Analysis completed');
    const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
    console.log('Response preview:', text.substring(0, 300) + '...');

    // Extract HTML content from response
    const htmlMatch = text.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);

    if (htmlMatch) {
      const htmlContent = htmlMatch[0];
      const reportFileName = `weibo-trend-report-${today}.html`;
      fs.writeFileSync(reportFileName, htmlContent, 'utf-8');
      const stats = fs.statSync(reportFileName);
      console.log(`\n✅ Report saved: ${reportFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.warn('\n⚠️  No HTML content found in response');
      console.log('Full response:', text);
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
