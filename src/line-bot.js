import line from '@line/bot-sdk';
import express from 'express';
import { config } from './config.js';
import { callModel } from './llm.js';
import { loadCoreContext, appendDaily } from './memory.js';

const lineConfig = {
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret,
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.line.channelAccessToken
});

export function startLineBot() {
  const app = express();

  app.post('/line/webhook', line.middleware(lineConfig), async (req, res) => {
    try {
      const events = req.body.events;
      for (const event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
          await handleText(event);
        }
      }
      res.status(200).send('OK');
    } catch (err) {
      console.error('LINE Webhook error:', err);
      res.status(500).end();
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`hermes line-bot listening on port ${port}`);
  });
}

async function handleText(event) {
  const userMessage = event.message.text;
  const replyToken = event.replyToken;

  try {
    const ctx = await loadCoreContext();
    const system = buildSystemPrompt(ctx);
    const reply = await callModel({ tier: 'daily', system, user: userMessage });

    await client.replyMessage({
      replyToken: replyToken,
      messages: [{ type: 'text', text: reply }],
    });

    const today = new Date().toLocaleDateString('sv-SE', { timeZone: config.timezone });
    await appendDaily(`LINE User: ${userMessage.slice(0, 80)}…`, today);
  } catch (err) {
    console.error('LINE reply failed', err);
  }
}

function buildSystemPrompt(ctx) {
  return [
    '你是 dodo / DropOut 助理（hermes 部署版）。',
    '你現在正在透過 LINE 與 owner 對話。',
    '硬規則：先讀錨點，禁止幻覺，禁止模擬，80/20 精簡回覆。',
    '',
    '## 今日錨點',
    ctx['CURRENT_SESSION_ANCHOR.md'],
    '',
    '## SOUL',
    ctx['SOUL.md'],
    '',
    '## AGENTS',
    ctx['AGENTS.md'],
    '',
    '## MEMORY',
    ctx['MEMORY.md'],
  ].join('\n');
}
