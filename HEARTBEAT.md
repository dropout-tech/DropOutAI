# HEARTBEAT（DropOut 助理 — 精簡＋佇列＋節奏）

- **日期**：**先 read `CURRENT_SESSION_ANCHOR.md`**，以 **##** 行為準（與 **`DreamAI\scripts\sync-openclaw-session-anchor.ps1`**、本機台北日曆對齊）。**禁止**沿用 Discord 長對話裡的舊日期。
- **資產邊界**：**不要**把夢想一號／其他公司的內容當成本輪上下文；只處理 **DropOut** 與 **本 workspace 檔案**。
- **禁止洗版**：`memory/PENDING_DECISIONS.md` 裡已標 **已確認／已回覆／不再需要追問** 的列，**不要**在 Discord 重複追問。
- **禁止假快照**：不得複製歷史訊息裡的「晨報／郵件範本」當今日現況；有郵件／日曆內容須本輪 **gog**（若已授權）**真實輸出**後才可寫。

## 1. 先做（約 30 秒）

- 有人類訊息在等？→ **優先回覆**。
- 有明顯阻塞（權限、API、工具失敗）？→ **簡短回報**。
- 若無急事 → 進入工作模式。

## 2. 工作模式

1. 讀 **`MEMORY.md`**、**`tasks/QUEUE.md`**；掃一眼 **`memory/PENDING_DECISIONS.md`** 是否有新的「待確認」。
2. 依 **`memory/CADENCE.md`**：是否到了**週回顧／月回顧**時機？若是 → 更新 **`WEEKLY_REVIEW.md`** 或 **`MONTHLY_REVIEW.md`**（只根據本 repo，不從他公司複製）。
3. 若有 **Ready** 任務，挑一項推進並更新 **`tasks/QUEUE.md`**。
4. 無需發 Discord 時 → 回 **`HEARTBEAT_OK`**；需提醒 owner → **一句話**簡短（勿長篇範本）。

## 3. 省 token

- 詳細長文整理交給 owner 主動對話或週／月檔；Heartbeat **不**強制長報告。
- 接近上下文上限：收尾、把未竟事項寫進 **`MEMORY.md`** 或當日 **`memory/YYYY-MM-DD.md`**。

## 4. Discord 群組

- **`requireMention: true`** 時：若本輪 Heartbeat **沒有**被點名、且沒有待發現場通知 → **`HEARTBEAT_OK`** 即可，**不要**對閒聊插話。
