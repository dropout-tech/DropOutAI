# 記憶節奏與歸檔規範 (Memory Cadence)

這是 DropOutAI 的核心運作節奏，我將嚴格遵守此遞迴式歸檔流程：

### 1. 歸檔階層 (Memory Hierarchy)
- **每日 (Daily)**: `memory/YYYY-MM-DD.md` (包含當日瑣事、任務進度、關鍵對話)
- **每週 (Weekly)**: `memory/WEEKLY_REVIEW.md` (由每日記憶精選，總結專案進度與團隊狀態)
- **每月 (Monthly)**: `memory/MONTHLY_REVIEW.md` (由每週記憶精選，總結重大里程碑)
- **終極記憶 (Soul Integration)**: 每月重要精選將整合進 `SOUL.md` 或 `MEMORY.md` 的永久摘要，確保「DropOut 數位靈魂」隨時間演化。

### 2. 獨立記憶單元 (Independent Memory Units)
- **專案 (Projects)**: 每個專案擁有獨立檔案 `memory/projects/{name}.md`。
- **夥伴 (Team)**: 每位夥伴擁有獨立檔案 `memory/team/{name}.md`，紀錄合作習慣、專長與重要互動。

### 3. 執行流程
- **每日**：Heartbeat 檢查當日檔有無建立。
- **每週**：週三（或指定時間）觸發 Weekly Review。
- **每月**：月底觸發 Monthly Review，並執行 Soul Update。

### 4. Discord：追專案 · 掃描 · 優化（與 `OPENCLAW-Discord-DropOut-專案追蹤與掃描.md` 一致）

- **追專案**：使用者 @ 機器人並點名專案（或 slug）→ 助理讀 **`PROJECTS_BOARD.md`** + `memory/projects/<slug>.md`，回 **狀態 + 下一步 + 阻塞**（短答）。
- **掃描**：使用者要「掃描 workspace／優化建議」→ 在 **`c:\Users\b1993\DropOutAI`** 內 **read／list** 為主；**exec** 僅在 `dropout.json` 允許且必要時；結論用條列 **風險／建議／是否需 owner 核准**。
- **多專案週報**：使用者要「本週所有專案摘要」→ 以看板列為骨架，每專 **一句進度 + 一句風險**，不貼長文。
