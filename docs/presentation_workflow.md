# Vue Async Ownership 簡報製作 Workflow

> 狀態：P1 尚未開始
>
> 本文件目前只追蹤 P1：內容骨架。P2–P4 等需求穩定後再補，不預先建立可能失效的 tasks。
>
> 內容規格來源：[`vue-async-ownership-talk-proposal.md`](./vue-async-ownership-talk-proposal.md)

## 1. P1 目標

P1 的目標是建立一份可以在 Slidev 中完整導覽與試講的最小內容骨架：

- 35 張投影片順序成立。
- 活動定版資訊與核心論點正確。
- 每張投影片只有一個 audience outcome。
- 每張投影片都有可在 Presenter Mode 閱讀的 speaker notes。
- Diagram、code、照片與 QR code 可以使用明確 placeholder。
- Slidev build 成功。

P1 不處理：

- 精緻 CSS 與最終視覺。
- 正式 Mermaid responsibility maps。
- 完整 code highlighting 或 Magic Move。
- Live Demo 自動化。
- 正式 screenshots。
- QR code 與短網址。
- PDF 與投影驗證。

## 2. 驗證 seams

P1 只在下列公開邊界驗證，不針對 Markdown 內部結構寫 implementation-coupled tests。

### 2.1 Slidev build

公開行為：

> 專案可以由 Slidev 讀取並成功產生 production build。

驗證方式：

```bash
pnpm run build
```

### 2.2 Deck navigation

公開行為：

> 觀眾可以依序看到 Slide 1–35，沒有 starter page、缺頁、重複頁或錯誤章節順序。

驗證方式：

- 檢查 7 個 main section files 均被 `slides.md` 引入。
- 在 Slidev Play Mode 從 Slide 1 導覽到 Slide 35。
- 核對 proposal 的 slide headings。

### 2.3 Presenter notes

公開行為：

> 講者能在 `/presenter` 看到每張投影片的講稿、預計時間、轉場與可刪內容。

每張 notes 至少包含：

```text
Core:
Time:
Transition:
Cut:
```

### 2.4 Proposal alignment

公開行為：

> 簡報呈現的立場、順序、限制與用語符合 proposal。

重點驗證：

- 官方標題沒有被改寫。
- 「從……到……」被解釋成 problem scope 展開，而不是工具升級。
- `Async Resource` 先作為 implementation-neutral concept。
- 四個 model 使用相同 teaching contract。
- signal-kernel 的收益、成本與 experimental maturity 同時呈現。

## 3. P1 工作規則

每個 task 使用同一個循環：

1. **Red**：先記錄目前缺少的可觀察結果，或確認現有 deck 不符合該 task 的 acceptance。
2. **Green**：只完成最小可講骨架；diagram、code 與素材先使用 placeholder。
3. **Review**：執行 acceptance checks、Slidev build，並更新實作紀錄。

限制：

- 一次只處理一個 task。
- 不提前實作下一個 Act 的視覺或 component。
- P1 不用字數、程式碼行數或動畫數量衡量完成度。
- 若 proposal 的 slide order 或論點改變，先更新 proposal，再更新本文件。
- 已完成 task 的 acceptance 若被改動，必須重新開啟並重新驗證。

## 4. P1 Task List

- [ ] P1.1 建立 Slidev 基礎骨架
- [ ] P1.2 建立 Act 0：共同 async lifecycle model
- [ ] P1.3 建立 Act 1：共同 Demo 與觀察範圍
- [ ] P1.4 建立 Act 2：Pure Vue
- [ ] P1.5 建立 Act 3：Pinia Action
- [ ] P1.6 建立 Act 4：TanStack Query
- [ ] P1.7 建立 Act 5：signal-kernel
- [ ] P1.8 建立 Act 6：比較、結論與 Q&A
- [ ] P1.9 完成 P1 全體驗收

## 5. P1 Tasks

### P1.1：建立 Slidev 基礎骨架

Audience outcome：

> 尚不評估內容；先確保整份簡報有穩定、可分段實作的容器。

Red：

- `slides.md` 仍是 Slidev starter。
- Frontmatter 仍使用 starter title 與 `duration: 35min`。
- 7 個 main section files 尚未建立。

實作範圍：

- 清除 starter pages。
- 將 global frontmatter 設為繁體中文、40 分鐘與活動定版標題。
- 建立以下 section files：

```text
pages/
  00-intro.md
  10-shared-demo.md
  20-pure-vue.md
  30-pinia.md
  40-tanstack-query.md
  50-signal-kernel.md
  60-comparison.md
```

- `slides.md` 只保留 global frontmatter、共用設定與 section imports。

Acceptance：

- [ ] `lang` 設為 `zh-TW`。
- [ ] `duration` 設為 `40min`。
- [ ] Title 使用活動定版標題。
- [ ] 7 個 main section files 均存在並被引入。
- [ ] Slidev starter pages 已完全移除。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.2：建立 Act 0 — 共同 async lifecycle model

投影片：

> Slide 1–7

Audience outcome：

> 觀眾在看到任何方案前，能先用中立 vocabulary 描述 async work lifecycle，並理解 ownership 是對 lifecycle invariants 負責。

實作範圍：

- Slide 1：活動定版封面。
- Slide 2：講者資訊。
- Slide 3：Promise 結束後仍持續存在的 responsibility。
- Slide 4：request-like 與 stream-like lifecycle。
- Slide 5：Vue 環境中的 responsibility distribution。
- Slide 6：State location 與 lifecycle ownership 的差異。
- Slide 7：共同 ownership checklist 與 case-study disclaimer。

Acceptance：

- [ ] Slide 1 使用活動定版標題、活動名稱、場次、講者與日期。
- [ ] 開場 notes 明確說明「從……到……」不是工具升級路線。
- [ ] Slide 2 使用 `Luciano Lee / Senior Frontend Engineer / Creator of signal-kernel`。
- [ ] 講者照片可以使用明確 placeholder，不阻擋 P1。
- [ ] 共同模型沒有使用 query key、revision、observe 或 graph 定義 async work。
- [ ] Request 與 Stream 沒有被描述成相同 state machine。
- [ ] Slide 5 分開 source、Vue scope、application policy、runtime、external work 與 consumer。
- [ ] Slide 7 顯示 `trigger / status / stale / invalidate / dispose / render`。
- [ ] Slide 7 明確標示 case study 不是 benchmark 或完整工具選型。
- [ ] Slide 1–7 都有 `Core / Time / Transition / Cut` notes。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.3：建立 Act 1 — 共同 Demo 與觀察範圍

投影片：

> Slide 8–9

Audience outcome：

> 觀眾知道四種 model 面對相同 UI、API、route state 與 selected outcomes，但這不是控制實驗或工具排名。

實作範圍：

- Slide 8：Search、Update、Activity 三種 async work。
- Slide 9：四條 Demo routes 與 selected-outcome boundary。

Acceptance：

- [ ] Slide 8 區分 request-like resource、mutation/invalidation 與 stream-like resource。
- [ ] Slide 8 說明 route 提供 `keyword` 與 `userId` source。
- [ ] Slide 9 列出四條正式 Demo routes。
- [ ] Slide 9 說明共同 contract 控制 selected outcomes，不控制 maturity、ecosystem 或 application glue。
- [ ] Live Demo 暫時只使用 route／screenshot placeholder。
- [ ] Slide 8–9 都有 `Core / Time / Transition / Cut` notes。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.4：建立 Act 2 — Pure Vue

投影片：

> Slide 10–14

Audience outcome：

> 觀眾理解 Pure Vue 是完整的 local boundary；Vue 維持 reactivity 與 scope，application composable 宣告 async policy。

實作範圍：

- Slide 10：Vue 原本已經擁有什麼。
- Slide 11：Application code 宣告的 async policy。
- Slide 12：抽成 composable 是否改變 ownership。
- Slide 13：Pure Vue responsibility map placeholder。
- Slide 14：Pure Vue takeaway。

Acceptance：

- [ ] Vue reactive tracking、watch scheduling、scope cleanup、projection 與 rendering 沒有被抹去。
- [ ] Manual policy 沒有被描述成沒有 owner。
- [ ] Composable 被描述成 organization／reuse boundary，不被自動等同 ownership transfer。
- [ ] Responsibility footer 包含六個 teaching-contract fields。
- [ ] Takeaway 說明 Pure Vue 對 local feature 是完整且合理的選擇。
- [ ] Code 只使用 placeholder 或 8–16 行 curated excerpt。
- [ ] Slide 10–14 都有 `Core / Time / Transition / Cut` notes。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.5：建立 Act 3 — Pinia Action

投影片：

> Slide 15–18

Audience outcome：

> 觀眾理解 Pinia 改變 shared state 與 workflow boundary，但 server-state lifecycle semantics 仍由 application-defined actions 維持。

實作範圍：

- Slide 15：為什麼自然會想到 Pinia。
- Slide 16：Store boundary 改變什麼。
- Slide 17：Action 集中 policy，但仍由 application 編排。
- Slide 18：Pinia responsibility map 與 takeaway。

Acceptance：

- [ ] Pinia 沒有被簡化成「把 ref 搬進 store」。
- [ ] Store lifetime 與 component lifetime 被明確區分。
- [ ] Action 被描述成清楚的 shared workflow boundary。
- [ ] Race guard、status、reload target 與 stream cleanup 仍標示為 application policy。
- [ ] 沒有宣稱 Pinia 只能使用這一種 async architecture。
- [ ] Responsibility footer 包含六個 teaching-contract fields。
- [ ] Slide 15–18 都有 `Core / Time / Transition / Cut` notes。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.6：建立 Act 4 — TanStack Query

投影片：

> Slide 19–23

Audience outcome：

> 觀眾理解 Query runtime 維持 server-state lifecycle；application 宣告 query、mutation 與 invalidation meaning，callback stream 可以合理地留在 Vue composable。

實作範圍：

- Slide 19：Shared state 與 server state 的 problem-scope 差異。
- Slide 20：TanStack Query responsibility map placeholder。
- Slide 21：Query key 與 server-state identity。
- Slide 22：Mutation 與 invalidation relationship。
- Slide 23：Query＋Vue stream composable boundary。

Acceptance：

- [ ] Query key 被描述成 identity 與 dependency，不只是一個字串。
- [ ] Query runtime 負責 status、cancellation、stale result 與 cache interaction。
- [ ] Application 仍負責 query function 與 invalidation 的 domain meaning。
- [ ] Callback-style stream 位於 Query boundary 外，但沒有被描述成 TanStack Query 的缺陷。
- [ ] 明確說出 `Query + Vue composable` 已是完整有效的 architecture。
- [ ] 轉場說明 TanStack Query → signal-kernel 是 problem-scope change，不是能力升級。
- [ ] Responsibility footer 包含六個 teaching-contract fields。
- [ ] Slide 19–23 都有 `Core / Time / Transition / Cut` notes。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.7：建立 Act 5 — signal-kernel

投影片：

> Slide 24–29

Audience outcome：

> 觀眾先理解 signal-kernel 的必要 vocabulary，再判斷 explicit graph 對 cross-resource relationship clarity 的收益與成本。

實作範圍：

- Slide 24：Problem scope 再次改變。
- Slide 25：signal-kernel 定義、vocabulary、版本與 maturity。
- Slide 26：Users graph placeholder。
- Slide 27：Resource dependency excerpt placeholder。
- Slide 28：Vue responsibility 與 application glue。
- Slide 29：Graph clarity 與 cost。

Acceptance：

- [ ] signal-kernel 只在共同 lifecycle model 建立後才被介紹。
- [ ] `source / resource / revision / observe` 有最小且一致的定義。
- [ ] 顯示 Demo 實際使用的三個 package versions。
- [ ] 顯示 `experimental · pre-1.0 · author-maintained`。
- [ ] Graph factory framework-independent 與 graph instance lifetime 被分開描述。
- [ ] Runtime responsibility 與 callback subscribe/unsubscribe bridge 被分開描述。
- [ ] Source-switch teardown 與尚未證明的 component-unmount teardown 被誠實區分。
- [ ] Graph clarity 與 vocabulary、runtime、adapter、debugging、maturity、teardown cost 同頁出現。
- [ ] Responsibility footer 包含六個 teaching-contract fields。
- [ ] Slide 24–29 都有 `Core / Time / Transition / Cut` notes。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.8：建立 Act 6 — 比較、結論與 Q&A

投影片：

> Slide 30–35

Audience outcome：

> 觀眾能用 problem scope 與 lifecycle ownership 選擇 boundary，理解四種 model 可以共存，並帶走 explicit ownership 而不是工具排名。

實作範圍：

- Slide 30：四種 ownership configuration。
- Slide 31：Same selected outcomes，different responsibility maps。
- Slide 32：Boundary 與 problem-scope fit。
- Slide 33：四種 boundary 可以共存。
- Slide 34：結論。
- Slide 35：Q&A 與 QR placeholder。

Acceptance：

- [ ] 四種 model 使用平行比較，不使用升級箭頭或階梯。
- [ ] Slide 31 正確解釋 40 次 contract executions 的來源。
- [ ] Contract 沒有被用來證明 ownership、clarity 或 architecture superiority。
- [ ] Slide 32 使用 problem-solution fit，不宣稱完整工具選型。
- [ ] Slide 33 明確說明 `These are scopes, not levels`。
- [ ] Slide 34 將 explicit ownership 設為結論，signal-kernel 只是可運行實驗。
- [ ] Slide 35 只使用 QR 與短網址 placeholder。
- [ ] Slide 30–35 都有 `Core / Time / Transition / Cut` notes。
- [ ] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence:
Green implementation:
Verification:
Notes:
```

### P1.9：完成 P1 全體驗收

Audience outcome：

> 35 張內容骨架可以從頭到尾試講，且沒有因分檔、缺稿或論點漂移而中斷。

Acceptance：

- [ ] Slidev starter content 已完全移除。
- [ ] Slide 1–35 連續存在，沒有缺號或重複。
- [ ] 7 個 main section files 順序正確。
- [ ] 每張只有一個主要 audience outcome。
- [ ] 每張都有 `Core / Time / Transition / Cut` speaker notes。
- [ ] `/presenter` 可以顯示所有 speaker notes。
- [ ] 官方標題、活動、場次、講者與日期正確。
- [ ] 四個 model 均包含六個 teaching-contract fields。
- [ ] 所有 diagram、code、照片與 QR 缺口都有明確 placeholder。
- [ ] 正式內容的 notes time budget 合計不超過 38 分鐘。
- [ ] `pnpm run build` 成功。
- [ ] `git diff --check` 通過。

實作紀錄：

```text
Slide count:
Notes coverage:
Build:
Presenter check:
Time-budget total:
Open placeholders:
```

## 6. P1 完成條件

只有在 P1.1–P1.9 全部完成並留下驗收紀錄後，P1 才能標示完成。

P1 完成不代表簡報已可正式上台；它只代表：

> 內容順序、共同語言、speaker notes 與最小 Slidev deck 已經成立，可以安全進入 P2 的 code、diagram 與視覺製作。
