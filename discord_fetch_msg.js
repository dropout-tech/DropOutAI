/**
 * 單則訊息除錯。Token 同 discord_fetch.js，請用環境變數，勿硬編。
 */
const https = require("https");

function mustToken() {
  const t =
    process.env.DROPOUT_DISCORD_TOKEN ||
    process.env.DISCORD_BOT_TOKEN ||
    process.env.ZUOAO_DISCORD_TOKEN;
  if (!t || t.length < 20) {
    console.error(
      "請設定環境變數 DROPOUT_DISCORD_TOKEN 或 DISCORD_BOT_TOKEN。"
    );
    process.exit(1);
  }
  return t;
}

const channelId = process.env.DISCORD_FETCH_CHANNEL_ID || "1451325066171388127";
const messageId = process.env.DISCORD_FETCH_MESSAGE_ID || "1483473562382893258";
const token = mustToken();

const options = {
  hostname: "discord.com",
  port: 443,
  path: `/api/v10/channels/${channelId}/messages/${messageId}`,
  method: "GET",
  headers: {
    Authorization: `Bot ${token}`,
    "User-Agent": "DiscordBot (https://github.com/discord/discord-api-docs, 1.0.0)",
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    try {
      const msg = JSON.parse(data);
      console.log(`[${msg.timestamp}] ${msg.author.username}: ${msg.content}`);
    } catch (e) {
      console.log("Parse error:", e.message, data);
    }
  });
});
req.on("error", (e) => {
  console.error(e);
});
req.end();
