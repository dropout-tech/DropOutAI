# DropOutAI

**DropOut** 專用 **OpenClaw 機器人 workspace**，與 [DreamAI](https://github.com/DreamOne09/DreamAI)（夢想一號）分開存放。  
Gateway 設定檔：**`~/.openclaw/dropout.json`**（CLI：**`--profile dropout`**，埠 **19002**）。

- **要在 Discord 啟用 Bot**：請依序做 **[DISCORD-啟用步驟.md](./DISCORD-啟用步驟.md)**。  
- **與 DreamAI「方法對齊、記憶分離」**：見 **[OPERATIONS-DREAMAI-PARITY.md](./OPERATIONS-DREAMAI-PARITY.md)**、**[memory/CADENCE.md](./memory/CADENCE.md)**。  
- **要把整套 dodo 人格 + 全量記憶遷移到雲端（Zeabur）的 `hermes` agent**：兩份配套文件
  - **[HERMES-MIGRATION.md](./HERMES-MIGRATION.md)** — 部署藍圖、程式骨架、9 項驗收清單（13 章）。
  - **[HERMES-BUNDLE.md](./HERMES-BUNDLE.md)** — hermes 必讀的所有 `.md` 一次打包（7 個 Tier、含身份／規則／核心記憶／團隊／專案／節奏／任務／工作計畫）。

---

## 換機與復原 OpenClaw（完整操作說明）

> 與 **[DreamAI／README.md](https://github.com/DreamOne09/DreamAI/blob/main/README.md)**（搜尋「換機與復原」）、 **[DreamAI／OPENCLAW-換機與復原.md](https://github.com/DreamOne09/DreamAI/blob/main/OPENCLAW-換機與復原.md)** 為同一份流程；**本節在 DropOut 倉庫再寫一次**，方便只 clone 本 repo 時也能獨立復原。Main 用的腳本與 nightly push 定義在 **DreamAI** 倉庫。

### 兩條腿走路（一定要先懂）

| 類型 | 內容 | 怎麼備份／還原 |
|------|------|----------------|
| **A. GitHub** | **DropOutAI**（本 repo）的 **MEMORY、AGENTS、memory/、tasks/** 等 + **DreamAI** 的腳本與文件 | 平常 `git push` 兩邊；新機分別 `git clone` |
| **B. 本機 `~/.openclaw\`**（不進公開 Git） | **`dropout.json`**、**`openclaw.json`**（Main）、**`guardian.json`**、**`.env`**、Main 的 **`workspace*`**、sessions、skills、cron | **換機前加密備份整包**；新機覆蓋到 `%USERPROFILE%\.openclaw\`（Windows）或對應 home |

- **只有 A**：你有 **本 repo 的長期記憶與規則檔**，但 **沒有** `dropout.json`、**`DROPOUT_DISCORD_TOKEN`**、LLM 金鑰 → **DropOut／Main Gateway 無法原樣啟動**。  
- **只有 B**：設定在，但 repo 舊；新機仍應 **clone 兩倉庫再 `git pull`**。

### 平常該養成的習慣

1. **本 repo** 與 **DreamAI** 都要能 **push 成功**（DreamAI 內 **`install-nightly-git-push-task.bat`** 會每晚推兩邊；見該倉庫 `logs\nightly-git-push.log`）。  
2. **勿將 token 寫進 Git**：**`DROPOUT_DISCORD_TOKEN`** 只放在 **`~/.openclaw/.env`**。  
3. **定期加密備份** **`%USERPROFILE%\.openclaw`** 整包。  
4. **`dropout.json`** 內 **`agents.defaults.workspace`** 必須指向 **本機 DropOutAI 目錄**；換路徑後要改。

### 換機前一天（舊電腦）

1. **DreamAI**、**DropOutAI** 各自 **`git push`**。  
2. 備份 **`~/.openclaw\`**（含 **`dropout.json`、`.env`、`openclaw.json`** 等）+ 若有 **DreamAI 目錄下的 `.env`**（中繼）一併加密保存。  
3. **gog** 新機多半需重授權：DreamAI 倉庫 **`scripts\gog-auth-dropout.ps1`**（[GOG-OAUTH-公司分離](https://github.com/DreamOne09/DreamAI/blob/main/GOG-OAUTH-公司分離.md)）。  
4. 記下 **DropOut Bot token** 所在位置（僅 `.env`，勿依賴聊天記錄）。

### 新電腦：建議順序

1. **環境**：Node 22+、`npm install -g openclaw@latest`、Git、（可選）DreamAI 的 **uv／gogcli** 依主倉庫 README。  
2. **Clone**：**[dropout-tech/DropOutAI](https://github.com/dropout-tech/DropOutAI)** 與 **[DreamOne09/DreamAI](https://github.com/DreamOne09/DreamAI)**；路徑改變時請改 **`dropout.json` 的 workspace**、DreamAI 腳本中的硬路徑、**`nightly-git-push-repos.ps1`**。  
3. **還原 `~/.openclaw`**：舊機備份覆蓋到新機；確認 **`.env`** 含 **`DROPOUT_DISCORD_TOKEN`**（及與 Main 共用的 **`GEMINI_API_KEY`**／**`DEEPSEEK_API_KEY`** 等）。  
4. **`openclaw --profile dropout doctor`** 與（Main）**`openclaw doctor`**；必要時 **`doctor --fix`**。  
5. **啟動 DropOut**：**`DreamAI\run-dropout.bat`** 或 `openclaw --profile dropout gateway --port 19002`；Main／排程／托盤依 **DreamAI README**。  
6. **排程**：在 **DreamAI** 目錄重跑 **`install-openclaw-automation.bat`**、**`install-nightly-git-push-task.bat`**（若要延續每晚雙 repo push）。

### 復活程度怎麼看（DropOut 視角）

| 項目 | 靠什麼還原 |
|------|------------|
| 人格／規則 | 本 repo 的 **SOUL.md、AGENTS.md** + `~/.openclaw` 內 **`dropout.json`** 行為 |
| 長期記憶 | 本 repo 的 **MEMORY.md、memory/**（隨 Git）；Main 的記憶在 **`~/.openclaw/workspace`** |
| 短期對話 | `.openclaw\agents\`（有備份才有） |
| 同一隻 DropOut bot | **`.env` 的 token** 正確即可 |

### 相關

- **DreamAI** 主倉庫（腳本、資安、GOG 分線）：<https://github.com/DreamOne09/DreamAI>  
- **OPERATIONS-DREAMAI-PARITY.md** — 兩邊設定差異，避免復原後搞混 Main／DropOut

---

## 邀請 DropOut 機器人進 Discord 伺服器

請用「**含 scope=bot**」的完整網址，否則會沒有反應或變成登入頁：

```
https://discord.com/oauth2/authorize?client_id=1482656699977564400&scope=bot&permissions=8
```

- `scope=bot`：表示要**邀請機器人**，缺這個 Discord 不會顯示「選擇伺服器加入」。
- `permissions=8`：管理員權限（你已勾選管理員可沿用）；若只要基本發言/讀訊可改為 `permissions=412317240384`。
- **請確認 `client_id` 與 Developer Portal 裡「這一個」DropOut Application 相同**；若你換過 App 或重建 Bot，請用 **OAuth2 → URL Generator** 重新產生邀請連結。

### 開通 DropOut Discord 頻道 — 檢查清單

| 步驟 | 說明 |
|------|------|
| 1. Token | 在 **`~/.openclaw/.env`** 設定 **`DROPOUT_DISCORD_TOKEN`**（勿提交 Git）。舊變數名 **`ZUOAO_DISCORD_TOKEN`** 仍會被排程自動對應到 **`DROPOUT_DISCORD_TOKEN`**，建議改寫成新名稱。 |
| 2. 邀請進對的伺服器 | Bot 必須在 **Guild ID 與 `dropout.json` 一致** 的伺服器（目前 **`1426572209878732912`**）。若不同，請改 **`~/.openclaw/dropout.json`** → `channels.discord.guilds` 的 key。 |
| 3. Developer Portal 意圖 | Bot 分頁啟用 **Message Content Intent**。 |
| 4. 頻道權限 | 目標頻道內 Bot 角色需能：**檢視頻道、讀取訊息歷史、發送訊息、嵌入連結、附加檔案**（視用途調整）。 |
| 5. 提及機器人 | `dropout.json` 內該 guild 為 **`"requireMention": true`** 時，須在頻道 **@DropOut 助理** 才會觸發。 |
| 6. Gateway | **`19002`** 有在聽：排程會救回；或 **`run-dropout.bat`** / `openclaw --profile dropout gateway --port 19002`。 |
| 7. 仍無反應 | 查 Gateway 視窗或日誌；**`openclaw --profile dropout doctor`**；防火牆。 |

### 與夢想一號（DreamAI）同級的「進化」

本 repo 已具備與 Chapa workspace 對齊的檔案與習慣：

- **`CURRENT_SESSION_ANCHOR.md`** — 今日日期；與 **`DreamAI\scripts\sync-openclaw-session-anchor.ps1`** 一併更新（排程每 10 分）。
- **`AGENTS.md`**、**`SOUL.md`**、**`HEARTBEAT.md`** — 每輪流程、禁止幻覺、**防 Prompt 注入**、群組禮儀。
- **`memory/`**、**`tasks/QUEUE.md`**、**`MEMORY.md`** — 持久記憶與佇列。

**差異**：**`dropout.json`** 目前 **deny** `gateway`、`cron`、`sessions_spawn`、`sessions_send` 等，與 Main 不同；**`heartbeat`** 已設（約每 2 小時）。**模型策略**與 DreamAI 對齊：**DeepSeek 日常主力** + **Gemini 分級** + **`nano-banana-pro` 生圖**。**Cron** 仍預設無（因 deny `cron`）。改設定後請**重啟 19002**。

## 內容

- **CURRENT_SESSION_ANCHOR.md** — 今日錨點（對抗 Discord 長對話舊日期）；與本機日曆同步。
- **AGENTS.md**、**SOUL.md**、**HEARTBEAT.md** — 行為、安全與週期自檢（與 DreamAI  Chapa 同級結構）。
- **USER.md** — DropOut 助理的角色與說明。
- **MEMORY.md** — 持久記憶與跨 session 摘要，由助理寫入，隨此 repo 備份至 GitHub。
- **memory/** — 每日流水、**CADENCE（日／週／月節奏）**、**PENDING_DECISIONS**、週月模板。
- **tasks/QUEUE.md** — 任務佇列。
- **DISCORD-啟用步驟.md**、**OPERATIONS-DREAMAI-PARITY.md** — 上線與與 DreamAI 方法對照說明。

## 本機設定

本機執行 DropOut Gateway 時，`~/.openclaw/dropout.json` 的 `agents.defaults.workspace` 應指向此目錄（例如 `c:/Users/b1993/DropOutAI`），MEMORY 會寫入此處，push 至此 repo 即完成備份。

## 相關

- **DreamAI**（夢想一號 Chapa、Guardian、腳本與文件）：<https://github.com/DreamOne09/DreamAI>
