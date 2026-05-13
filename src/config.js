export const config = {
  discord: {
    token: required('DISCORD_TOKEN'),
    clientId: required('DISCORD_CLIENT_ID'),
    guildId: required('DISCORD_GUILD_ID'),
    ownerId: required('DISCORD_OWNER_ID'),
    requireMention: process.env.REQUIRE_MENTION !== 'false',
  },
  line: {
    channelAccessToken: required('LINE_CHANNEL_ACCESS_TOKEN'),
    channelSecret: required('LINE_CHANNEL_SECRET'),
    channelId: required('LINE_CHANNEL_ID'),
  },
  llm: {
    deepseekKey: required('DEEPSEEK_API_KEY'),
    geminiKey: required('GEMINI_API_KEY'),
  },
  github: {
    token: required('GITHUB_TOKEN'),
    repo: required('GITHUB_REPO'),
    branch: process.env.GITHUB_BRANCH || 'main',
  },
  timezone: process.env.TIMEZONE || 'Asia/Taipei',
};

function required(key) {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
}
