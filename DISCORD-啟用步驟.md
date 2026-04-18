# DropOut 助理 — Discord 啟用（依序做）

照順序勾選；**先做 1～3 再測頻道**，可省一半除錯時間。

---

## 1. 確認 Bot 與伺服器是「同一組」

1. 打開 [Discord Developer Portal](https://discord.com/developers/applications) → 選 **DropOut 專用 Application**。  
2. 記下 **Application ID**（＝ OAuth 邀請裡的 `client_id`）。  
3. 確認 README 裡的邀請連結 **`client_id=`** 與這個 Application **一致**；不一致請用 **OAuth2 → URL Generator** 重新產生邀請網址。

---

## 2. Bot 意圖（Intents）

在該 Application → **Bot**：

- 開啟 **Message Content Intent**（大多數讀內文情境需要）。

---

## 3. Token 與本機環境

1. 在 **`C:\Users\b1993\.openclaw\.env`** 設定（勿提交 Git）：  
   **`DROPOUT_DISCORD_TOKEN=你的_Bot_Token`**  
2. 若你仍使用舊變數 **`ZUOAO_DISCORD_TOKEN`**，排程 **`ensure-openclaw-always-on.ps1`** 會把它帶入 **`DROPOUT_DISCORD_TOKEN`**，但**建議改寫成新名稱**。  
3. **不要**把 token 寫進 `dropout.json`（已用 env 讀取）。  
4. 排程啟動 19002 前會載入 `.env`；手動開 Gateway 時請在同一環境或先設好變數。

---

## 4. Guild ID 必須一致

1. Discord 開 **開發者模式** → 右鍵 **DropOut 伺服器** → **複製伺服器 ID**。  
2. 打開 **`C:\Users\b1993\.openclaw\dropout.json`** → `channels.discord.guilds`。  
3. **物件的 key** 必須等於這個 Guild ID（目前範例：`1426572209878732912`）。

---

## 5. 把 Bot 邀進伺服器

1. 用 **含 `scope=bot`** 的邀請網址（見本 repo **`README.md`**）。  
2. 選 **DropOut** 那台伺服器完成授權。  
3. 在測試頻道確認 Bot **在線**。

---

## 6. 頻道權限（單一真理來源）

**不要**在這裡各寫一套開關。Bot 在**所有**目標頻道應具備的權限、以及「類別同步／全頻道一致」操作，一律以 DreamAI 專案內為準：

👉 **`c:\Users\b1993\DreamAI\OPENCLAW-Discord-權限與頻道-單一來源.md`**（第 2～3 節：權限矩陣＋全頻道同步）

DropOut 與 Main 是**兩隻不同 Bot**，但**同一套矩陣**各自套在對應角色上即可。

### 6.1 與夢想一號「行為一致」：生圖／exec（必讀）

若出現 **DM 或 Control UI 可以、Discord 頻道不行**（尤其 **生圖**），除了頻道權限外，多半是 **設定差異** 而非「頻道壞掉」：

👉 **`c:\Users\b1993\DreamAI\OPENCLAW-DreamAI-DropOutAI-行為對照.md`**

重點：DropOut 預設可能對 **Discord** 開 **`exec` 核准** → **nano-banana 生圖會等核准**；與 Main 不同。請依該檔 §5 決定是否與 Main 對齊。

---

## 7. 啟動 Gateway（埠 19002）

擇一：

- 雙擊 **`c:\Users\b1993\DreamAI\run-dropout.bat`**，或  
- 終端機：`openclaw --profile dropout gateway --port 19002`（工作目錄建議 **`C:\Users\b1993\.openclaw`**）。

確認本機 **`19002` 正在 Listen**（工作排程最多約 10 分鐘也會自動救回）。

> **自 `zuoao` 改名後**：OpenClaw 狀態目錄可能變成 **`~/.openclaw-dropout`**（與舊 `~/.openclaw-zuoao` 分開），**Discord session 會重新開始**，屬正常現象。

---

## 8. 在頻道裡怎麼叫它

`dropout.json` 內該 guild 若為 **`"requireMention": true`**：

- 你必須 **@DropOut 助理**（或 Bot 顯示名稱）**加上你的問題**，否則可能完全不觸發。

若要「不用 @ 也回」，可把該項改為 **`requireMention: false`**（群組訊息量大時較吵，需自評）。

---

## 9. 第一次測試訊息（建議原文）

在 DropOut 測試頻道輸入（請自行 @ 你的 Bot）：

```text
@DropOut助理 請先讀 CURRENT_SESSION_ANCHOR.md、AGENTS.md 第一段，用一句話回我：今日錨點日期與你的 workspace 路徑。
```

若成功 → 代表 **Token、Guild、權限、Gateway、mention** 至少主路徑 OK。

---

## 10. 仍失敗時

1. 看 **跑 Gateway 的那個視窗** 或 `openclaw logs` 是否有 Discord / auth 錯誤。  
2. 本機執行：**`openclaw --profile dropout doctor`**。  
3. 對照 **`OPERATIONS-DREAMAI-PARITY.md`** 確認沒誤用 Main 的 token 或 profile。

---

完成後即可在 DropOut 頻道常態使用；**記憶只寫入本 repo**，與夢想一號 Chapa **分開**。
