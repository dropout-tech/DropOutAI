/**
 * Supabase 中繼客戶端：透過 DreamAI 本機中繼存取資料庫，不需要直連 Supabase。
 *
 * 用法（在 exec 裡執行）：
 *   node supabase-relay.js select profiles "*" 10
 *   node supabase-relay.js select profiles "display_name,role" 50
 *   node supabase-relay.js select profiles "*" 10 '{"role":"manager"}'
 *   node supabase-relay.js upsert profiles '{"display_name":"test","role":"member"}' display_name
 *   node supabase-relay.js update profiles '{"role":"manager"}' '{"display_name":"test"}'
 *   node supabase-relay.js insert profiles '{"display_name":"new","role":"intern"}'
 *
 * 環境變數（已在 ~/.openclaw/.env，Gateway 啟動時自動載入）：
 *   SUPABASE_RELAY_URL    http://127.0.0.1:38471/v1
 *   SUPABASE_RELAY_SECRET (Bearer token)
 */

const http = require("http");

const RELAY_URL = process.env.SUPABASE_RELAY_URL || "http://127.0.0.1:38471/v1";
const SECRET = process.env.SUPABASE_RELAY_SECRET;

if (!SECRET) {
  console.error("Missing SUPABASE_RELAY_SECRET env var.");
  process.exit(1);
}

const [, , op, table, ...rest] = process.argv;

if (!op || !table) {
  console.error("Usage: node supabase-relay.js <op> <table> [args...]");
  console.error("  select <table> [columns] [limit] [matchJson]");
  console.error("  upsert <table> <rowJson> [onConflict]");
  console.error("  update <table> <patchJson> <matchJson>");
  console.error("  insert <table> <rowJson>");
  process.exit(1);
}

function buildBody() {
  if (op === "select") {
    const columns = rest[0] || "*";
    const limit = Number(rest[1]) || 50;
    const match = rest[2] ? JSON.parse(rest[2]) : undefined;
    return { op, table, columns, limit, match };
  }
  if (op === "upsert") {
    const row = JSON.parse(rest[0]);
    const onConflict = rest[1] || undefined;
    return { op, table, row, onConflict };
  }
  if (op === "update") {
    const patch = JSON.parse(rest[0]);
    const match = JSON.parse(rest[1]);
    return { op, table, patch, match };
  }
  if (op === "insert") {
    const row = JSON.parse(rest[0]);
    return { op, table, row };
  }
  console.error("Unknown op:", op);
  process.exit(1);
}

const body = JSON.stringify(buildBody());
const url = new URL(RELAY_URL);

const opts = {
  hostname: url.hostname,
  port: url.port,
  path: url.pathname,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + SECRET,
    "Content-Length": Buffer.byteLength(body),
  },
};

const req = http.request(opts, (res) => {
  let d = "";
  res.on("data", (c) => (d += c));
  res.on("end", () => {
    try {
      const j = JSON.parse(d);
      console.log(JSON.stringify(j, null, 2));
      process.exit(j.ok ? 0 : 1);
    } catch {
      console.error("Invalid response:", d);
      process.exit(1);
    }
  });
});

req.on("error", (e) => {
  console.error("Relay connection failed:", e.message);
  process.exit(1);
});

req.write(body);
req.end();
