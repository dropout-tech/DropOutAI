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
