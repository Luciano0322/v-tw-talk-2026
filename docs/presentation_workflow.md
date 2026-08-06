# Vue Async Ownership 簡報製作 Workflow

> 狀態：P1 已完成（P1.1–P1.9 全部通過）；P2 收尾另見 [`presentation_p2_workflow.md`](./presentation_p2_workflow.md)
>
> 本文件封存 P1：內容骨架的決策與驗收紀錄；不在完成後混入 P2–P4 的實作歷史。
>
> 內容規格來源：[`vue-async-ownership-talk-proposal.md`](./vue-async-ownership-talk-proposal.md)

## 1. P1 目標

P1 的目標是建立一份可以在 Slidev 中完整導覽與試講的最小內容骨架：

- 35 張投影片順序成立。
- 活動定版資訊與核心論點正確。
- 每張投影片只有一個 audience outcome。
- 每張投影片都有可在 Presenter Mode 閱讀的 speaker notes。
- Diagram、code 與照片缺口使用明確 placeholder；Demo repository QR 使用正式資產。
- Slidev build 成功。

P1 不處理：

- 精緻 CSS 與最終視覺。
- 正式 Mermaid responsibility maps。
- 完整 code highlighting 或 Magic Move。
- Live Demo 自動化。
- 正式 screenshots。
- QR 的多裝置／實體投影掃描驗證與短網址。
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

Presenter notes 可讀性：

- 樣式只作用於 `.slidev-presenter .grid-section.note`，不影響 viewer、slides 或 export。
- Light mode 使用深色文字；dark mode 與系統深色偏好使用高對比亮灰文字。
- 非當前 click 可以淡化，但必須保持可讀；code、連結與粗體需要有額外色彩層次。

實作紀錄：

```text
Red evidence: dark Presenter Mode 中，notes 沿用 light prose foreground，講稿在黑底上呈現極低對比；使用者提供的實際 presenter screenshot 可觀察到整段文字接近背景色。
Green implementation: 新增根目錄 styles.css，以 presenter notes 的公開 DOM boundary 限定樣式；一般文字提高亮度、字重與行距，strong/code/link 分別提供白色、amber 與 cyan 層次，slidev-note-fade 改為仍可閱讀的 muted gray。
Verification: pnpm run build 成功（Slidev 52.18.0，659 modules transformed）；production `/presenter/6` 以 1717×797 dark-mode screenshot 確認 notes 為高對比亮色，slide canvas 與 presenter layout 未受影響。
Notes: 使用 CSS variables 同時支援 html.dark 與 prefers-color-scheme: dark；light mode 保留深色 foreground，避免白字白底。
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

- [x] P1.1 建立 Slidev 基礎骨架
- [x] P1.2 建立 Act 0：共同 async lifecycle model
- [x] P1.3 建立 Act 1：共同 Demo 與觀察範圍
- [x] P1.4 建立 Act 2：Pure Vue
- [x] P1.5 建立 Act 3：Pinia Action
- [x] P1.6 建立 Act 4：TanStack Query
- [x] P1.7 建立 Act 5：signal-kernel
- [x] P1.8 建立 Act 6：比較、結論與 Q&A
- [x] P1.9 完成 P1 全體驗收

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

- [x] `lang` 設為 `zh-TW`。
- [x] `duration` 設為 `40min`。
- [x] Title 使用活動定版標題。
- [x] 7 個 main section files 均存在並被引入。
- [x] Slidev starter pages 已完全移除。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: slides.md 仍為 Welcome to Slidev、duration 35min；只有 imported-slides.md 與 Counter.vue starter assets。
Green implementation: 建立活動定版 frontmatter、封面、7 個 section imports 與各 Act placeholder；移除 starter files。
Verification: pnpm run build 成功（Slidev 52.18.0，theme-default）。
Notes: P1.2 前 deck 為封面加 7 個 section placeholders；完整 35 張由後續 tasks 逐步替換。
```

### P1.2：建立 Act 0 — 共同 async lifecycle model

投影片：

> Slide 1–7

Audience outcome：

> 觀眾在看到任何方案前，能先用中立 vocabulary 描述 async work lifecycle，並在 30 秒內理解 Async Ownership 是 responsibilities 在 system boundaries 之間的配置。

實作範圍：

- Slide 1：活動定版封面。
- Slide 2：講者資訊。
- Slide 3：Promise 結束後仍持續存在的 responsibility。
- Slide 4：request-like 與 stream-like lifecycle。
- Slide 5：正式定義 Async Ownership，並建立 Vue reactivity、component lifecycle、application code 與 external work 的 responsibility distribution。
- Slide 6：Snapshot location、async policy 與 owner 的差異。
- Slide 7：用六個問題讀出 responsibility map，並加入 case-study disclaimer。

Acceptance：

- [x] Slide 1 使用活動定版標題、活動名稱、場次、講者與日期。
- [x] 開場 notes 明確說明「從……到……」不是工具升級路線。
- [x] Slide 2 使用 `Luciano Lee / Senior Frontend Engineer / Creator of signal-kernel`，並顯示 Demo repository 文字連結。
- [x] 講者照片可以使用明確 placeholder，不阻擋 P1。
- [x] 共同模型沒有使用 query key、revision、observe 或 graph 定義 async work。
- [x] Request 與 Stream 沒有被描述成相同 state machine。
- [x] Slide 5 在 30 秒內明確定義 Async Ownership，不將它等同 state location 或單一 owner handoff。
- [x] Slide 5 分開 Vue reactivity、component lifecycle、application code、external work 與 UI consumer。
- [x] Slide 6 以 clicks 依序定義 snapshot、區分 Vue／async lifecycle，再導入 location／policy／owner。
- [x] Slide 7 顯示 `trigger / status / stale / invalidate / dispose / render`，並說明它們是分析座標而非 Ownership 定義。
- [x] Slide 7 明確標示 case study 不是 benchmark 或完整工具選型。
- [x] Slide 1–7 都有 `Core / Time / Transition / Cut` notes。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: 00-intro.md 只有一張 P1.2 placeholder；封面 notes 也只有欄位示意，無法完整試講。
Green implementation: 建立 Slide 1–7，加入共同 lifecycle、request/stream 差異、responsibility distribution、state location 與 ownership checklist；每張均加入完整 Talk track。
Verification: pnpm run build 成功；production bundle 已包含 Presenter noteHTML；Slide 1–7 notes time budget 合計 330 秒。
Notes: Slide 2 暫時使用 public/assets/speakers/avatar.png 完整講者卡，P2 再決定原始人像或裁切方式。Review 時將 Slide 3–4 的文字流程改為 Mermaid；1280×720 實際渲染後壓縮節點層級，避免雙欄圖底部裁切，正式 node styling 留到 P2。Slide 3 後續加入三次 click reveal：先從 Promise 的 pending／fulfilled／rejected 三態開始，再切換到完整 async lifecycle，最後揭露 ownership takeaway；production preview 的 clicks 0–3 均產生獨立畫面。Slide 4 也加入三次 click reveal：common framework boundary → request-like → stream-like → final comparison；以 control-flow handoff 與 lifecycle ownership 分離為主軸，production preview clicks 0–3 均產生獨立且完整的 1280×720 畫面。後續 review 重新開啟 P1.2，移除全域 frontmatter 後的空白首頁，讓 cover 回到 Slide 1；Slide 6 改為 location／policy／owner 三層問題，Slide 7 只保留六個 ownership questions，Demo 情境留給 P1.3。以 production preview 驗證 `/1`、`/6`、`/7`、`/8`，其中 `/8` 仍為 P1.3 placeholder。Slide 6 後續再加入兩次 click 過渡：先定義 async state 與 snapshot，再區分 Vue lifecycle 和 async lifecycle，最後才揭露 snapshot location／async policy／async lifecycle owner；用語同步記錄於根目錄 `CONTEXT.md`。
```

Slide 2 提前提供 Demo repository：

```text
Red evidence: Slide 2 只顯示講者 GitHub profile，觀眾無法在演講開始時直接開啟 Demo 原始碼對照。
Green implementation: 將左欄底部改為低視覺權重的 Demo Repo 卡片，顯示並連結到 github.com/Luciano0322/vue-async-ownership。Speaker notes 提醒觀眾可先開著對照，最後一頁仍會提供全場唯一 QR code。
Verification: `pnpm run build` 成功（Slidev 52.18.0，722 modules transformed）；production `/2` 以 1280×720 截圖確認姓名、職稱、研究主題、Demo Repo 卡片與右側照片均無裁切。
Notes: Slide 2 不新增 QR，避免開場就要求所有人拿手機掃描；連結是可選擇的同步參照入口。
```

Slide 6 過渡調整：

```text
Red evidence: 修改前 production `/6?clicks=0` 與 `/6?clicks=1` 的 1280×720 截圖 SHA-256 相同，證明沒有可觀察的 click 過渡。
Green implementation: 不增加 slide，以兩次 click 依序呈現 state → snapshot、Vue lifecycle vs async lifecycle、location／policy／owner。
Verification: pnpm run build 成功；production `/6?clicks=0..2` 產生三個不同的截圖 SHA-256，逐張確認標題、內容與底部均未裁切。
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

- [x] Slide 8 區分 request-like resource、mutation/invalidation 與 stream-like resource。
- [x] Slide 8 說明 route 提供 `keyword` 與 `userId` source。
- [x] Slide 9 列出四條正式 Demo routes。
- [x] Slide 9 說明共同 contract 控制 selected outcomes，不控制 maturity、ecosystem 或 application glue。
- [x] Live Demo 暫時只使用 route／screenshot placeholder。
- [x] Slide 8–9 都有 `Core / Time / Transition / Cut` notes。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: production `/8` 仍只有 P1.3 placeholder，`/9` 已進入 P1.4 placeholder；Search／Update／Activity、keyword／userId、四條 routes 與 comparison boundary 均未出現在公開 Slide DOM。
Green implementation: Slide 8 建立 request-like Search、mutation + invalidation Update、stream-like Activity 三欄觀察面，並固定 keyword／userId route source；Slide 9 建立四條正式 Demo routes、共同 selected outcomes、刻意不控制的 maturity／ecosystem／application glue，以及 route + fallback screenshot placeholder。兩張均補齊完整 presenter talk track。
Verification: `pnpm run build` 成功（Slidev 52.18.0，625 modules transformed）；production Slide 8 與 Slide 9 DOM 分別通過 7 項與 9 項公開內容 assertions；1280×720 production screenshots 均無裁切。
Notes: Slide 8–9 notes time budget 合計 125 秒。Slide 9 第一次視覺驗證發現巢狀 HTML 因四格縮排被當成 code block；DOM 文字雖存在，但觀眾看到的是原始標記。修正 Markdown 渲染結構後重新 build 與截圖 Green。Live Demo 目前只承諾 route navigation 與 fallback screenshot，公開 repo QR 留到 P4。
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

- [x] Vue reactive tracking、watch scheduling、scope cleanup、projection 與 rendering 沒有被抹去。
- [x] Manual policy 沒有被描述成沒有 owner。
- [x] Slide 11 以 clicks 從 composable boundary、watch happy path 與 request race 推導 generation guard。
- [x] Code 使用 VS Code Dark+ 語法色彩，並以獨立 clicks 聚焦 generation 發號與 commit guard。
- [x] Composable 被描述成 organization／reuse boundary，不被自動等同 ownership transfer。
- [x] Responsibility footer 包含六個 teaching-contract fields。
- [x] Takeaway 說明 Pure Vue 對 local feature 是完整且合理的選擇。
- [x] Code 只使用 placeholder 或 8–16 行 curated excerpt。
- [x] Slide 10–14 都有 `Core / Time / Transition / Cut` notes。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: production `/10` 只有 P1.4 placeholder，且 Vue scope、manual policy、composable boundary、六欄 responsibility footer 與 local-feature takeaway 均未出現在公開輸出；`/11` 已直接進入 P1.5 placeholder。
Green implementation: Slide 10 明確列出 Vue 維持的 reactive consumer responsibilities；Slide 11 先以 13 行 curated excerpt 標示 immediate、pending/refreshing、generation 與 success/error policy；Slide 12 區分 organization/reuse boundary 與 ownership transfer；Slide 13 建立 Mermaid responsibility map 與六欄 teaching contract；Slide 14 將 Pure Vue 收斂為完整且合理的 local boundary。五張均加入完整 presenter talk track。
Verification: `pnpm run build` 成功（Slidev 52.18.0，642 modules transformed）；production chunks 通過 14 項公開內容／notes assertions，且不再包含 P1.4 placeholder；production Slide 10–14 產生五個不同的 1280×720 screenshots。
Notes: Slide 10–14 初版 notes time budget 合計 300 秒。第一次視覺驗證發現 Slide 11 的 `Policy declared by` footer 下緣被裁切；縮小右欄 cards、gap 與 footer spacing 後重新 build，第二次 screenshot 已完整顯示。其餘四張無裁切；P2 再處理 Mermaid node typography 與全域視覺 polish。
```

Slide 11 教學順序調整：

```text
Red evidence: 修改前 production `/11?clicks=0` 與 `/11?clicks=1` 的 1280×720 screenshot SHA-256 相同，只有完整 snippet，沒有從 composable 建立到 generation guard 的可觀察過渡。
Green implementation: 保留單一 slide，以三次 click 依序呈現 useVueUsersDemo scaffold、watch happy path、a → b request race、實際命名的 generation guard；講稿明確區分 generation 與 Vue reactivity。
Verification: Slide 11 template 通過 Markdown-to-Vue compiler 檢查；`pnpm run build` 成功（643 modules transformed）；production `/11?clicks=0..3` 產生四個不同的 screenshot SHA-256，逐幕以 1280×720 確認標題、程式碼、race timeline 與 footer 均完整。
Notes: Slide 11 時間由 75 秒調整為 100 秒，P1.4 notes time budget 合計由 300 秒調整為 325 秒。第一次 Green build 揭露巢狀 HTML 在 code panel 後因四格縮排被 Markdown 視為 code block；移除結構標籤縮排並加入 template compiler preflight 後通過。
```

Slide 11 程式碼主題與 generation guard 聚焦：

```text
Red evidence: Slide 11 原本使用未經 Shiki tokenization 的 raw pre/code，production seam 只有 clicks 0–3；完整 implementation 畫面沒有分開聚焦 generation 發號與 commit guard。
Green implementation: 新增 setup/shiki.ts，將簡報 code block 統一為 Shiki dark-plus；Slide 11 增加 clicks 4–5，先聚焦 ++latestRequestGeneration，再聚焦 success/error 的 currentness guard。講稿明確說明 guard 不阻止 request 並行，只阻止 stale request 進入 commit 區段。
Verification: Markdown-to-Vue compiler preflight 通過；pnpm run build 成功（Slidev 52.18.0，643 modules transformed）；production /11?clicks=0、3、4、5 產生四個不同的 1280×720 screenshot SHA-256，Dark+ token 色彩、藍色 generation highlight、綠色 commit highlight、標題與 footer 均完整顯示。
Notes: 一開始使用 Slidev code meta {2} / {8-12,14-15}，它會參與 code-click navigation，與頁面 $clicks 疊加後造成 direct-link 自動捲動；改以 Shiki token output 上的本頁 CSS line focus 後，不再消耗額外 click。Slide 11 時間由 100 秒調整為 115 秒，P1.4 notes time budget 合計由 325 秒調整為 340 秒。
```

Slide 13 中文可讀性調整：

```text
Red evidence: responsibility map 的標題、Mermaid nodes 與六欄 teaching contract 大量使用英文，繁體中文受眾需要先翻譯欄位才能理解責任關係。
Green implementation: 將可見敘事改為中文直述，只保留 watch、composable、API、ref、computed 等需要與程式碼對照的術語；講稿與 proposal 同步更新。
Verification: pnpm run build 成功（Slidev 52.18.0，643 modules transformed）；production /13 以 1280×720 確認 Mermaid 中文節點與六欄 footer 均完整、無裁切。
Notes: 六欄改成觀眾可以直接回答的問題：問題範圍、規則由誰宣告、生命週期由誰維持、Vue 仍負責什麼、應用程式還要補上什麼、代價與非目標。
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

- [x] Pinia 沒有被簡化成「把 ref 搬進 store」。
- [x] Store lifetime 與 component lifetime 被明確區分。
- [x] Action 被描述成清楚的 shared workflow boundary。
- [x] Race guard、status、reload target 與 stream cleanup 仍標示為 application policy。
- [x] 沒有宣稱 Pinia 只能使用這一種 async architecture。
- [x] Responsibility footer 包含六個 teaching-contract fields。
- [x] Slide 15–18 都有 `Core / Time / Transition / Cut` notes。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: production build 仍包含 `P1.5 placeholder`，Slide 15 只有 Act 標題，Slide 16 已直接進入 P1.6 placeholder；shared workflow、store/component lifetime、action policy 與六欄 responsibility contract 均不可見。
Green implementation: Slide 15 從單一功能推導 shared workflow boundary；Slide 16 以 Mermaid 與 lifetime timeline 區分 store 接走的責任和不會自動獲得的 semantics；Slide 17 以一次 click 先展示 Demo 真實 update → reload action，再揭露 generation guard 與 page onUnmounted cleanup；Slide 18 使用中文 responsibility map 與六欄 teaching contract 收斂立場。
Verification: `pnpm run build` 成功（Slidev 52.18.0，658 modules transformed）；production `/15`、`/16`、`/17?clicks=0`、`/17?clicks=1`、`/18` 產生五個不同的 1280×720 screenshot SHA-256，標題、Mermaid、Dark+ code、footer 與 takeaway 均完整。
Notes: Slide 15–18 notes time budget 合計 300 秒。第一次視覺驗證發現 Slide 15、16、17 click 0 下緣裁切，Slide 17 click 1 的 generation guard 出現水平捲軸；縮短 Mermaid 高度與垂直 spacing、將長程式行換行後，第二輪 production screenshots 均無裁切或捲軸。Pinia 採中性描述：它完整解決 shared client workflow 問題，但不預設 server-state lifecycle semantics；Demo 只是其中一種 architecture。
```

Slide 16 累積式 reveal 調整：

```text
Red evidence: production `/16?clicks=0..3` 的四張 1280×720 screenshots 具有完全相同的 SHA-256；所有責任、非自動 semantics 與 lifetime 對照同時出現，沒有可觀察的逐步堆疊。
Green implementation: Slide 16 增加三個明確 v-click；初始只保留 boundary map，接著依序 reveal「Store 確實接走」、「不會自動獲得」，最後揭露 store/component lifetime 與結論。所有容器保留 layout space，click 時不重新排版。
Verification: `pnpm run build` 成功（Slidev 52.18.0，658 modules transformed）；production `/16?clicks=0..3` 產生四個不同的 1280×720 screenshot SHA-256，依序只增加指定區塊，最終畫面與原始完整內容一致，且無裁切或 layout shift。
Notes: Slide 16 時間由 70 秒調整為 85 秒，P1.5 notes time budget 合計由 300 秒調整為 315 秒。
```

### P1.6：建立 Act 4 — TanStack Query

投影片：

> Slide 19–23

Audience outcome：

> 觀眾理解 Query runtime 維持 server-state lifecycle；application 宣告 query、mutation 與 invalidation meaning，callback stream 可以合理地留在 Vue composable。

實作範圍：

- Slide 19：Shared state 與 server state 的 problem-scope 差異。
- Slide 20：TanStack Query responsibility map。
- Slide 21：Query key 與 server-state identity。
- Slide 22：Mutation 與 invalidation relationship。
- Slide 23：Query＋Vue stream composable boundary。

Acceptance：

- [x] Query key 被描述成 identity 與 dependency，不只是一個字串。
- [x] Query runtime 負責 status、cancellation、stale result 與 cache interaction。
- [x] Application 仍負責 query function 與 invalidation 的 domain meaning。
- [x] Callback-style stream 位於 Query boundary 外，但沒有被描述成 TanStack Query 的缺陷。
- [x] 明確說出 `Query + Vue composable` 已是完整有效的 architecture。
- [x] 轉場說明 TanStack Query → signal-kernel 是 async ownership representation 的改變，不是能力升級。
- [x] Slide 23 明確區分 Query server-state lifecycle 與 Vue reactivity，並說明 Vue Query adapter 的連接角色。
- [x] Responsibility footer 包含六個 teaching-contract fields。
- [x] Slide 19–23 都有 `Core / Time / Transition / Cut` notes。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: production `/19` 仍包含 `P1.6 placeholder`，`/20` 已進入 `P1.7 placeholder`；server-state problem scope、Query ownership map、query-key identity、invalidation relationship 與 Query＋Vue stream boundary 尚未存在。
Green implementation: Slide 19 用三個 clicks 依序建立 identity、freshness、relationship；Slide 20 補上 Query runtime / application / Vue stream composable responsibility map；Slide 21 以 Demo 真實 `useUsersQueryDemo.ts` 片段與三個 code-focus clicks 說明 queryKey、queryFn、placeholderData；Slide 22 對齊 mutation invalidation 實作；Slide 23 將 Query server-state runtime 與 Vue reactivity 並列，說明 Vue Query adapter、computed input/projection 與 Query 外 stream watch 的責任。
Verification: `pnpm run build` 成功（Slidev 52.18.0，678 modules transformed）；production `/19?clicks=0..3`、`/20`、`/21?clicks=0..3`、`/22?clicks=0..4`、`/23?clicks=0..2` 皆以 1280×720 截圖驗證，Mermaid、Dark+ code、line focus、responsibility footer 與轉場均無裁切或 raw HTML。
Notes: Slide 19–23 分別配置 70、90、100、100、100 秒，共 460 秒；每張都有 Core / Time / Talk track / Transition / Cut。Callback stream 被描述為這份 Demo 的刻意 boundary，而不是 TanStack Query 缺陷；computed/watch 被描述成 input、projection 與 stream composition glue，不被誤稱為手動追蹤 response currentness。
```

Slide 22 漸進講解補強：

```text
Red evidence: production `/22?clicks=0..4` 的五張 1280×720 screenshots 具有完全相同的 SHA-256；mutation work、list/detail invalidation 與 runtime handoff 同時出現，沒有局部閱讀焦點。
Green implementation: Slide 22 增加四個 clicks；初始先列出 Work / Timing / Relationship / Handoff 四個角色，接著依序 highlight mutationFn、users prefix key、selected detail key 與 Promise.all runtime handoff。右側卡片同步用初學者語言解釋每段責任，最後才收斂 application/runtime 分工。
Verification: `pnpm run build` 成功（Slidev 52.18.0，678 modules transformed）；production `/22?clicks=0..4` 產生五個不同的 screenshot SHA-256，1280×720 下 Dark+ line focus、右側卡片與底部 takeaway 均無裁切、raw HTML 或 layout overflow。
Notes: Slide 22 時間由 80 秒調整為 100 秒，P1.6 notes time budget 由 420 秒調整為 440 秒。若現場需壓縮，Cut 會略過初始四角色與 Promise.all，只保留 mutationFn、兩個 query keys 與 application/runtime 分工。
```

Slide 23 server-state / Vue reactivity 邊界重整：

```text
Red evidence: 現有 `/23` 仍以 cross-resource tracing 作為下一章切入點，且 deck 中找不到「server-state lifecycle 與 Vue reactivity」、「async state 成為 reactive graph」等教學主句，沒有呈現使用者預期的 model transition。
Green implementation: Slide 23 保留兩個 clicks。初始並列 Query runtime 與 Vue reactivity；第一個 click 說明 computed query options、reactive query result refs、computed view projection 與 Query 外 stream watch；第二個 click 固定 async lifecycle、UI reactivity、adapter/composition glue 三個 boundary，最後提問 async state 能否先成為 graph node。
Verification: `pnpm run build` 成功（Slidev 52.18.0，701 modules transformed）；`/23` 的三個 click branches 均通過 Vue template compilation，預期主句可由 public deck source 搜尋到。
Notes: Slide 23 維持 100 秒。技術界線固定為「Vue Query adapter 已讓 response snapshot 可被 Vue 追蹤」；computed/watch 是 adaptation/composition，不是 TanStack Query 缺少 reactive update 的補救。
```

### P1.7：建立 Act 5 — signal-kernel

投影片：

> Slide 24–29

Audience outcome：

> 觀眾能從 TanStack Query 的伺服器狀態執行層＋Vue 轉接模型，理解 signal-kernel 如何讓非同步狀態先成為響應式 graph 節點，再由 Vue 作為輸入邊界與 UI 消費端。

實作範圍：

- Slide 24：從 Query 轉接模型轉向「非同步狀態成為響應式 Graph」。
- Slide 25：signal-kernel 定義、必要語彙、版本與成熟度。
- Slide 26：Users graph、借用式轉接層與明確的 Graph 擁有者。
- Slide 27：Resource `observe` 與 Mutation `invalidates` 的完整 revision 循環，以及列表／特定明細的作用範圍。
- Slide 28：解除 Vue 消費關係與 Graph 生命週期 ownership。
- Slide 29：響應式 Graph 清晰度、第二套執行層與轉接成本。

Acceptance：

- [x] signal-kernel 只在共同 lifecycle model 建立後才被介紹。
- [x] `server state` 與較廣義的 `async state` 沒有被當成完全同義詞。
- [x] `source / resource / revision / computed / observe` 有最小且一致的定義。
- [x] Resource 被描述為同時具有 async lifecycle、snapshot 與 reactive dependencies 的 graph node。
- [x] Slide 27 同時顯示 Resource 讀取端 `observe` 與 Mutation 寫入端 `invalidates`，不只留下 query-like flow。
- [x] Revision 被定義為「需要重新驗證」的響應式版本節點，而不是資料、快取或 Mutation 結果。
- [x] Application 的領域失效語意、執行層的成功時機／版本推進、Graph 的依賴重跑與 Vue 快照消費已分開。
- [x] Vue Query adapter 與 signal-kernel Vue adapter 的角色被分開描述。
- [x] computed/watch 被描述為 input、projection 或 stream composition，不被誤稱為手動追蹤 response。
- [x] 顯示 Demo 實際使用的三個 package versions。
- [x] 以中文顯示「實驗階段 · 1.0 前版本 · 由作者維護」。
- [x] 可見標題、卡片標籤與結論句以繁體中文為主，只保留 API、程式識別字與必要技術詞。
- [x] Graph factory、graph instance owner 與 Vue consumer lifetime 被分開描述。
- [x] Runtime responsibility 與 callback subscribe/unsubscribe bridge 被分開描述。
- [x] Vue 被描述成 input boundary 與 UI consumer，而不是完全消失。
- [x] Vue scope dispose 停止 adapter observer，以及 adapter 不自動 cancel resource，都被描述成已證明的 borrowed-consumer contract。
- [x] Source-switch resource cleanup 與 graph-owner disposal policy 被分開描述。
- [x] Graph clarity 與兩個 reactive runtimes、vocabulary、adapter、debugging、maturity、explicit ownership、external teardown policy 同頁出現。
- [x] Responsibility footer 包含六個 teaching-contract fields。
- [x] Slide 24–29 都有 `Core / Time / Transition / Cut` notes。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: P1.7 初版雖已完成六張投影片，但主線是 cross-resource tracing；deck source 找不到「server-state lifecycle 與 Vue reactivity」、「async state 成為 reactive graph」、「Vue 是 input boundary 與 UI consumer」與「兩個 reactive runtime」四個必要 acceptance phrases。
Green implementation: Slide 24 先並列 Query runtime→Vue adapter 與 graph→Vue consumer；Slide 25 定義 async resource graph node、vocabulary、真實版本與 maturity；Slide 26 用 users graph 顯示 async reactivity 先於 Vue adapter；Slide 27 用 input/observe/run 三個 focus clicks 說明 source、revision、runtime snapshot propagation；Slide 28 用 input adapter、graph、output adapter 建立 Vue borrowed-consumer boundary；Slide 29 同頁結算 graph ownership 收益、兩套 runtime、adapter、explicit graph ownership 與 external teardown policy。
Verification: 第一次 Green build 因 Slide 28 的 raw pre/code markup 被 Vue parser 判定未閉合而失敗；改成 Vue-safe 的 font-mono blocks 後，`pnpm run build` 成功（Slidev 52.18.0，701 modules transformed）。Public deck source 已包含四個 acceptance phrases，Slide 23–29 的 click branches 全部通過 Slidev/Vue production compilation。
Notes: Slide 24–29 分別配置 70、75、80、95、100、80 秒，共 500 秒。所有 maturity、adapter、instance lifetime 與 teardown claim 都以 Demo 原始碼和既有 tests 為界；不宣稱 TanStack Query 缺少 Vue reactivity，也不把 component unmount 誤當成 framework-neutral graph 的預設 dispose signal。
```

Slide 27 讀寫循環補強：

```text
Red evidence: Slide 27 只顯示 users Resource 的 input / observe / run；雖然口說提到 Mutation 會推進 revision，畫面沒有 updateUser invalidates，觀眾無法看到 revision 由誰、在什麼時機推進，也無法連成 Mutation 回到 Resource 的完整循環。
Green implementation: Slide 27 維持三個 clicks 與單張結構；依序聚焦 Resource observe、Mutation invalidates，以及 usersRevision / userRevision.target(userId) 的作用範圍。右側加入「Mutation 成功 → invalidates → revision 推進 → observe 感知 → Resource 重新執行」循環，並將 revision 定義為需要重新驗證的響應式版本節點。
Verification: `pnpm run build` 成功（Slidev 52.18.0，721 modules transformed）；`/27?clicks=0..3` 的四個狀態均以 1280×720 截圖驗證，兩段程式碼、局部 highlight、讀寫循環與底部結論條沒有 raw HTML 或內容裁切。
Notes: 不新增投影片，Slide 27 維持 95 秒。原本的 run 生命週期說明縮短，改用來釐清 Application 宣告領域影響、執行層維持成功時機與版本推進、Graph 決定重跑對象、Vue 消費快照的 ownership 分工。
```

Slide 28 graph-owner 語意修正：

```text
Red evidence: `/28` 最終 click 仍顯示「尚未證明 component unmount 自動 dispose graph」，並把 graph/component lifetime integration 描述成缺口；這與 @signal-kernel/vue 已驗證的 borrowed-consumer contract 不一致。
Green implementation: Slide 26 將 page-setup placement 改述為「owner 仍應明確宣告」；Slide 28 改為「Vue detach consumer，不接管 graph lifetime」，並列 Vue scope dispose 停止 observer、adapter 不呼叫 resource.cancel、graph owner 決定 instance lifetime 三個 boundary；Slide 29 將成本改成 explicit graph ownership 與 external teardown policy。
Verification: `@signal-kernel/vue` 的完整 adapter test 9/9 通過；最小化重跑的 observer disposal、resource non-cancellation、stream policy 三項 tests 3/3 通過。Slidev production build 通過後，`/26–29` public routes 作為 deck seam。
Notes: Framework-neutral 不代表 graph 沒有 lifetime，而是 Vue consumer 無權替 graph owner 決定 lifetime。Source switch cleanup 是 resource behavior；graph 最終 disposal 是 application ownership contract。
```

P1.7 中文可讀性調整：

```text
Red evidence: Slide 24–29 的可見內容仍有 18 個英文主標、卡片標籤或結論句，包括 QUERY RUNTIME、INPUT/OUTPUT ADAPTER、GRAPH RUNTIME/OWNER、GRAPH BUYS/COSTS，以及多個 async/reactive/consumer/lifetime 標題。
Green implementation: 將敘述性 vocabulary 改為繁體中文：非同步狀態、響應式圖、轉接層、消費端、執行層、狀態快照、依賴關係、擁有者與清理規則；保留 signal-kernel、QueryObserver、source/resource/revision/computed/observe、API 與程式碼識別字。Presenter notes 同步改成中文句子承載概念。
Verification: 英文主標與卡片標籤的靜態檢查由 18 項降為 0；`pnpm run build` 成功（Slidev 52.18.0，701 modules transformed），Slide 24–29 的 Mermaid、click branches 與 Vue template 均通過 production compilation。
Notes: Ownership 與 Graph 仍保留，因為它們是全場主題與模型名稱；API 名稱不翻譯，以免失去與原始碼對照能力。中文化不改變 server state、async state、consumer lifetime 與 graph ownership 的既有語意。
```

### P1.8：建立 Act 6 — 比較、結論與 Q&A

投影片：

> Slide 30–35

Audience outcome：

> 觀眾能用 problem scope 與 lifecycle ownership 選擇 boundary，理解四種 model 可以共存，並帶走 explicit ownership 而不是工具排名。

實作範圍：

- Slide 30：四種 Ownership 配置。
- Slide 31：共同結果與不同責任圖。
- Slide 32：Ownership 邊界與問題範圍適配。
- Slide 33：四種邊界可以共存。
- Slide 34：結論。
- Slide 35：Q&A、單一 Demo repository QR 與可手動輸入的 GitHub URL。

Acceptance：

- [x] 四種 model 使用平行比較，不使用升級箭頭或階梯。
- [x] Slide 31 正確解釋 40 次 contract executions 的來源。
- [x] Contract 沒有被用來證明 ownership、clarity 或 architecture superiority。
- [x] Slide 32 使用 problem-solution fit，不宣稱完整工具選型。
- [x] Slide 33 明確說明「這些是不同問題範圍，不是不同工具等級」。
- [x] Slide 34 將 explicit ownership 設為結論，signal-kernel 只是可運行實驗。
- [x] Slide 35 只使用單一 Demo repository QR 與可手動輸入的 GitHub URL。
- [x] Slide 30–35 都有 `Core / Time / Transition / Cut` notes。
- [x] `pnpm run build` 成功。

實作紀錄：

```text
Red evidence: `pages/60-comparison.md` 只有一張 `P1.8 placeholder`，因此 `/30` 沒有比較內容，`/31–35` 也不存在。另以 demo repo 的 `dashboard-routes.spec.ts` 核對，每個 model 實際執行 10 個案例：8 個共同非同步行為、1 個共同畫面契約、1 個 Ownership 說明案例。
Green implementation: 建立 Slide 30–35。Slide 30 以四欄和三個 click 平行比較問題範圍、規則位置、生命週期維護者、Vue／stream 邊界與成本；Slide 31 限制 40 次契約執行的證據範圍；Slide 32–34 依序收斂適用情境、共存關係與 explicit Ownership 結論；Slide 35 維持單一 QR 與短網址 placeholder。六張都補上 `Core / Time / Talk track / Transition / Cut`。
Verification: Demo repo 的 `pnpm exec vitest run src/examples/__tests__/dashboard-routes.spec.ts` 實際通過 1 個檔案、40 個測試；簡報的 `pnpm run build` 成功（Slidev 52.18.0，721 modules transformed）。靜態檢查確認六張 frontmatter、click 狀態、notes、40 次來源、工具選型限制、非升級結論與兩個 repo placeholders 都存在，舊 placeholder 與工具勝負語意不存在。Slide 30–34 的 notes 時間合計 300 秒，符合 Act 6 的 5 分鐘配置；Slide 35 不計入正式內容。
Notes: 可見標題與核心論述以繁體中文為主，保留產品名、Ownership、Graph 與必要 API 詞彙。P1.9 仍需在 Slidev presenter / slideshow 中做完整視覺、click 順序與 38 分鐘彩排驗收。
```

Slide 35 Demo repository QR 定稿：

```text
Red evidence: Slide 35 仍顯示 {{DEMO_REPO_QR}} 與 {{DEMO_REPO_URL}}，無法在會後導向已公開的 Demo repository。
Green implementation: canonical URL 固定為 https://github.com/Luciano0322/vue-async-ownership；產生高容錯、高對比、保留 quiet zone 的 public/qr/demo-repository.svg。Slide 35 改用單一 QR，並同時顯示 github.com/Luciano0322/vue-async-ownership 作為無法掃描時的 fallback。
Verification: 獨立 jsQR decoder 從 SVG 讀回完整 canonical URL；Slidev production build 成功（722 modules transformed）；production `/35` 以 1280×720 截圖確認 QR、URL 與輔助文字無裁切或異常換行。
Notes: 程式解碼驗證編碼內容，不取代活動前的實際設備驗收；仍需以至少兩支手機及投影畫面掃描。
```

Async Ownership 主線補強（P1.9 前置）：

```text
Red evidence: 全稿沒有一句正式的 `Async Ownership 是……` 定義；Slide 6 使用單數 async lifecycle owner，Slide 7 又允許六項責任由不同 owner 承擔，導致 Ownership 在開場像單一 boundary、在結尾又變成抽象 correctness principle。各 model 也沒有固定回答「哪些責任移動、哪些責任留下」。
Green implementation: `CONTEXT.md` 固定 `Async Ownership / Async responsibility / Owner` 三層語彙。Slide 5 在 Vue async 情境中定義責任配置；Slide 6 區分 location／policy／owner；Slide 7 將六個問題定位成 responsibility map 的分析座標。Pure Vue、Pinia、TanStack Query、signal-kernel 均以「移動／留下」收尾；Slide 30 與 Slide 34 原樣回收相同定義。
Verification: Production build 成功（Slidev 52.18.0，721 modules transformed）；靜態內容契約確認開場與結論含相同定義、Pure Vue 明列 Vue primitives／application code 分工，另外三個 model 均含移動／留下句型；`git diff --check` 通過。
Resolved in P1.9: 先以驗收腳本留下 40 分 20 秒的 Red evidence，再刪減重複轉場與較重段落的正式時間配置；Green 後合計 37 分 35 秒，不以加快語速處理。
```

中文化與 map 結構對齊（P1.9 前置）：

```text
Red evidence: Pure Vue、Pinia、TanStack Query 與 signal-kernel 的 map 分別使用 `VUE OWNS / APPLICATION OWNS`、`shared workflow / client state`、`Policy / Lifecycle owner / Application glue` 與其他混合標籤；Slide 4、8、23、30 也由英文卡片承擔主要概念，中文聽眾必須先翻譯才能理解權責差異。
Green implementation: 四個 model 的 map 固定成 `問題範圍 / 規則宣告 / 生命週期維持 / Vue 的責任 / 應用程式銜接 / 成本／非目標` 六欄中文結構。Slide 4 的請求／串流接力、Slide 8 的三種非同步工作、Pure Vue composable／takeaway、Pinia boundary、TanStack Query runtime／adapter 與 signal-kernel Graph boundary 都改由中文解釋概念；保留產品名、API 與 `queryKey / mutation / resource / revision / computed / observe` 等程式碼識別字。
Verification: 四個 map 的六個欄位各出現 4 次；舊的 `VUE OWNS / APPLICATION OWNS / Policy / Lifecycle owner / Application glue / SERVER-STATE MODEL / VUE REACTIVITY MODEL / TANSTACK QUERY RUNTIME` 可見主標籤為 0；Slidev production build 成功（721 modules transformed），`git diff --check` 通過。
Notes: 這輪採中文概念＋英文識別字，不追求逐字全譯。P1.9 已在 production slideshow／presenter 與 1280×720 viewport 驗證所有 35 張及 85 個 click states，沒有偵測到較長中文、程式碼或 SVG 超出投影片畫布。
```

### P1.9：完成 P1 全體驗收

Audience outcome：

> 35 張內容骨架可以從頭到尾試講，且沒有因分檔、缺稿或論點漂移而中斷。

Acceptance：

- [x] Slidev starter content 已完全移除。
- [x] Slide 1–35 連續存在，沒有缺號或重複。
- [x] 7 個 main section files 順序正確。
- [x] 每張只有一個主要 audience outcome。
- [x] 每張都有 `Core / Time / Transition / Cut` speaker notes。
- [x] `/presenter` 可以顯示所有 speaker notes。
- [x] 官方標題、活動、場次、講者與日期正確。
- [x] 四個 model 均包含六個 teaching-contract fields。
- [x] 四個 model 的 map 均使用 `問題範圍 / 規則宣告 / 生命週期維持 / Vue 的責任 / 應用程式銜接 / 成本／非目標` 六欄中文結構。
- [x] 四個 model 均能回答「哪些 async responsibilities 移動了」與「哪些仍留在 Vue 或 application code」。
- [x] Slide 5 的 30 秒定義與 Slide 34 的結論使用同一套 Async Ownership 語彙。
- [x] 所有 diagram、code、照片與其餘素材缺口都有明確 placeholder；QR 已改為正式資產。
- [x] 正式內容的 notes time budget 合計不超過 38 分鐘。
- [x] `pnpm run build` 成功。
- [x] `git diff --check` 通過。

實作紀錄：

```text
Red evidence: 新增 `pnpm run test:p1` 後，第一輪只有 time budget 失敗；35 張正式內容合計 2420 秒（40:20），超過 38:00 acceptance 140 秒。
Green implementation: 收斂重複的 lifecycle 鋪陳、model 轉場與結尾比較段，保留每張既有 Core 與 Cut 路徑；同時修正開場 notes 錯字及「QR 尚未補上」的過期描述。
Slide count: 35；Slide 1–35 production routes 全部存在，7 個 section imports 順序正確。
Notes coverage: 35/35 均有 Core / Time / Transition / Cut；四個 model 的六欄 map、責任移動／留下與開場／結論 ownership 語彙契約均通過。
Build: `pnpm run build` 成功（Slidev 52.18.0，722 modules transformed）；`git diff --check` 通過。
Presenter check: production `/presenter` 顯示全部四種 notes markers；production `/1–35` 共驗證 85 個 click states，在 1280×720 下沒有標題、文字、程式碼、圖片或 SVG overflow。
Time-budget total: 2255 秒（37:35），低於 38:00 上限，並替 40 分鐘正式內容保留 2:25 緩衝。
Open placeholder: `P1 photo placeholder`；共同 Demo 已改用固定 default 情境截圖，Demo repository QR 也已是正式資產並保留可手動輸入 URL。
Non-blocking follow-up: CLI PDF export 目前需要額外安裝 `playwright-chromium`；PDF 與現場投影本來就不在 P1 範圍，留待 P2／交付前驗收。
```

## 6. P1 完成條件

只有在 P1.1–P1.9 全部完成並留下驗收紀錄後，P1 才能標示完成。

P1 完成不代表簡報已可正式上台；它只代表：

> 內容順序、共同語言、speaker notes 與最小 Slidev deck 已經成立，可以安全進入 P2 的 code、diagram 與視覺製作。
