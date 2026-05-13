import { startBot } from './discord-bot.js';
import { startLineBot } from './line-bot.js';

// 同時啟動 Discord 與 LINE 服務
console.log('Starting hermes multi-channel services...');

startBot();
startLineBot();
