# 任務管理協定 (Task Management Protocol)

為確保 DropOut 專案具備「可控管性 (Controllability)」，我們將採行 **「任務生命週期管理」**。

### 1. 核心檔案系統
*   `tasks/QUEUE.md`: 活躍任務清單 (Active Tasks)
*   `tasks/BACKLOG.md`: 待規劃任務 (Backlog)
*   `tasks/ARCHIVE.md`: 已完成/已歸檔任務 (Completed)
*   `tasks/logs/`: 執行紀錄日誌 (Daily Logs)

### 2. 討論串規範 (Thread Rule)
*   **複雜任務**: 凡指涉「架構設計」、「系統開發」、「大規模歸檔」等複雜任務，必須開立獨立 Discord 討論串。
*   **決策邊界**: 若不確定是否需開新討論串，請詢問 dodo。

### 3. 任務定義格式 (Task Format)
```markdown
- [ ] **[ID] 任務名稱**
  - **負責人**: @User / @Agent
  - **討論串**: [連結]
  - **優先級**: P0/P1/P2
```

### 3. 管理循環 (Control Loop)
*   **指派**: 你 @DropOutAI 指派任務 -> 我寫入 `tasks/QUEUE.md` -> 確認。
*   **追蹤**: 每日 Heartbeat 檢查狀態，若有進度卡住，我會主動於 Discord 提醒。
*   **完成**: 任務完成後由我移至 `tasks/ARCHIVE.md`，並同步歸檔至專案頁面。

### 4. 你的授權控管
對於重要任務 (P0)，我將啟動 `approvals` 機制：
- 若任務涉及刪除資料、寄出外部郵件或修改設定，我必須等待你的 `/approve` 指令才執行。
