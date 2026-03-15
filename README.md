# DropOutAI

琢奧科技 (DropOut) 專用 **OpenClaw 機器人 workspace**，與 [DreamAI](https://github.com/DreamOne09/DreamAI)（夢想一號）分開存放。

## 內容

- **USER.md** — DropOut 助理的角色與說明。
- **MEMORY.md** — 持久記憶與跨 session 摘要，由助理寫入，隨此 repo 備份至 GitHub。
- **memory/** — 可建立子目錄存放更多記憶或專案筆記。

## 本機設定

本機執行 DropOut Gateway 時，`~/.openclaw/zuoao.json` 的 `agents.defaults.workspace` 應指向此目錄（例如 `c:/Users/b1993/DropOutAI`），MEMORY 會寫入此處，push 至此 repo 即完成備份。

## 相關

- **DreamAI**（夢想一號 Chapa、Guardian、腳本與文件）：<https://github.com/DreamOne09/DreamAI>
