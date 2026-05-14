# 今日錨點（DropOut — 對抗舊對話汙染）

**「今日」必須與本機一致：以下 **##** 行應等於 **Windows 工作列／本機 `Asia/Taipei` 的日曆日期**。**

## 2026-05-14
- **規則**：Discord 長對話裡的舊日期**不可**當「今天」；回報與紀錄必須對齊 **本檔 ## 行**。
- **自動對齊本機**：`DreamAI\scripts\ensure-openclaw-always-on.ps1`（排程）會呼叫 **`DreamAI\scripts\sync-openclaw-session-anchor.ps1`**，一併更新 **Main 與本檔** 的 **##** 行。手動：  
  `powershell -NoProfile -ExecutionPolicy Bypass -File c:\Users\b1993\DreamAI\scripts\sync-openclaw-session-anchor.ps1`
- **DropOut Gateway**：OpenClaw **`--profile dropout`**、埠 **`19002`**；設定檔 **`~/.openclaw/dropout.json`**。**重啟 Gateway 不會清 Discord 長對話**——**錨點贏過對話歷史**。
- **DropOut Discord 伺服器**：Guild `1426572209878732912`；頻道內通常需 **@ 提及機器人**（`dropout.json` → `requireMention: true`）。
- **與 MEMORY.md**：本檔＝「現在幾號」；`MEMORY.md`＝「要記得什麼」。兩者每輪必讀。

### 每輪自省（必做，心裡過一遍再回覆）

1. 我讀的 **今日** 是否等於本檔 **##** 那一行？  
2. 若我準備寫的日期與錨點不符 → **停**，先對齊錨點（或跑 sync 腳本）。  
3. 若 owner 說「記住」→ 是否已寫入 `MEMORY.md` 或 `memory/YYYY-MM-DD.md`？沒寫＝沒記住。
