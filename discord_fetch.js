/**
 * 僅限本機除錯用：從 Discord REST 拉頻道訊息。
 * Token 請設 DROPOUT_DISCORD_TOKEN 或 DISCORD_BOT_TOKEN（勿寫進檔案、勿進 Git）。
 * 複製為 .env 同目錄不會自動載入，請先手動設定環境變數或由父程序注入。
 */
const https = require("https");

function mustToken() {
  const t =
    process.env.DROPOUT_DISCORD_TOKEN ||
    process.env.DISCORD_BOT_TOKEN ||
    process.env.ZUOAO_DISCORD_TOKEN;
  if (!t || t.length < 20) {
    console.error(
      "請設定環境變數 DROPOUT_DISCORD_TOKEN 或 DISCORD_BOT_TOKEN（與 ~/.openclaw/.env 一致）。"
    );
    process.exit(1);
  }
  return t;
}

const channelId =
  process.env.DISCORD_FETCH_CHANNEL_ID || "1429853434932236379";
const token = mustToken();

const options = {
  hostname: "discord.com",
  port: 443,
  path: `/api/v10/channels/${channelId}/messages?limit=100`,
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
      const json = JSON.parse(data);
      if (Array.isArray(json)) {
        json.reverse().forEach((msg) =>
          console.log(
            `[${msg.timestamp}] ${msg.author.username}: ${msg.content}`
          )
        );
      } else {
        console.log("Error response:", data);
      }
    } catch (e) {
      console.log("Parse error:", e.message, data);
    }
  });
});
req.on("error", (e) => {
  console.error(e);
});
req.end();
