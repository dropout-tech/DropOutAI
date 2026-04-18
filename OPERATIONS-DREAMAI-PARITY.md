# 與 DreamAI 對齊的是「方法」，不是「記憶」

## 已對齊（工具與操作）

| 面向 | 說明 |
|------|------|
| **錨點** | `CURRENT_SESSION_ANCHOR.md` + `DreamAI\scripts\sync-openclaw-session-anchor.ps1`（與本機台北日曆）。 |
| **每輪流程** | `AGENTS.md`：錨點 → SOUL → USER → 當日 memory → MEMORY.md。 |
| **SOUL 寫法** | 解題終點、禁止幻覺、防注入、邊界、**智慧選模分級**（細節以 **`~/.openclaw/dropout.json`** 為準）。 |
| **模型策略（與 Main 同邏輯）** | **DeepSeek Chat** 日常主力 → **Gemini 3.1 Flash Lite／2.5 Pro** 中度 → **Gemini 3.1 Pro** 深度 → **`nano-banana-pro`** 圖像／創意。 |
| **Heartbeat** | `HEARTBEAT.md` + **`dropout.json` → `agents.defaults.heartbeat`**（約 2 小時、活躍時段內）。 |
| **佇列** | `tasks/QUEUE.md`。 |
| **待決策表** | `memory/PENDING_DECISIONS.md`（結構同 Main，內容只放 **DropOut**）。 |
| **日／週／月節奏** | `memory/CADENCE.md` + `WEEKLY_REVIEW.md` + `MONTHLY_REVIEW.md`。 |
| **GitHub** | 獨立 repo；DreamAI 的 nightly push 腳本會一併 push **本目錄**（各自 `origin`）。 |

## 刻意不同（公司資產隔離）

| 項目 | 說明 |
|------|------|
| **記憶內容** | **零**從 `~/.openclaw/workspace`（夢想一號）複製條目過來。 |
| **workspace 路徑** | 僅 **`c:\Users\b1993\DropOutAI`**。 |
| **設定檔** | **`~/.openclaw/dropout.json`**（CLI **`--profile dropout`**），與 Main 的 `openclaw.json` 分開。 |
| **Discord Token 環境變數** | **`DROPOUT_DISCORD_TOKEN`**（舊名 **`ZUOAO_DISCORD_TOKEN`** 仍可由排程相容載入）。 |
| **工具權限** | DropOut Gateway **deny** `cron`／`gateway` 等（較緊）；要與 Main 完全同款須自行評估後改設定。 |
| **gog／Google** | **`~/.openclaw/dropout.json` → `env.GOG_CLIENT=dropout`**；token 與 GCP OAuth 邊界須與夢想一號的 **`dreamcube`** 分開。操作步驟：**[GOG-OAUTH-公司分離.md](../DreamAI/GOG-OAUTH-公司分離.md)**。不預設能存取 `hi@dreamcube.tw`。 |
| **`approvals.exec`（關鍵）** | **可**與 Main 同為 **`enabled: false`**（本機已對齊時，Discord 生圖不再卡核准）。若改回 **`true`**，生圖會再等核准，易被誤認成「頻道不能生圖」。詳見 **[行為對照](../DreamAI/OPENCLAW-DreamAI-DropOutAI-行為對照.md)** §2、§5。 |

## 與夢想一號「行為對照」（設定差異一覽）

完整對照表（含生圖、`exec` 核准、workspaceOnly）：**[OPENCLAW-DreamAI-DropOutAI-行為對照.md](../DreamAI/OPENCLAW-DreamAI-DropOutAI-行為對照.md)**。  
維護任一方 `openclaw.json`／`dropout.json` 時，建議同步掃一眼該檔，避免兩邊體感漂移。

---

## Cron（晨報／晚審查）

- **Main**：可用 OpenClaw **`cron`** 做定時任務。  
- **DropOut**：預設 **無**（被 deny）。週期整理請用 **Heartbeat + `CADENCE.md`**，或之後在 **`dropout.json`** 放寬 `tools.deny` 後再建 cron（險自負）。
