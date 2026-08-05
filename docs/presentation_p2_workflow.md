# Vue Async Ownership 簡報 P2 Workflow

> 狀態：P2 已完成（P2.1–P2.4 全部通過）
>
> 內容規格來源：[`vue-async-ownership-talk-proposal.md`](./vue-async-ownership-talk-proposal.md)
>
> P1 歷史：[`presentation_workflow.md`](./presentation_workflow.md)

## 1. P2 重新盤點

P2 原本負責正式 code walkthrough、四張平行 responsibility maps 與四模型 comparison。P1 在逐頁 review 時已提前完成以下工作：

- Pure Vue、Pinia、TanStack Query 與 signal-kernel 的 curated code walkthrough。
- Shiki `dark-plus` 語法色彩與 click-based line focus。
- 四張 Mermaid responsibility maps，以及固定六欄中文 teaching contract。
- 四模型 responsibility configuration comparison。

因此 P2 不重新製作已通過的內容，只補兩個可觀察缺口：

1. code excerpt 必須能追溯到 Demo repository 的 canonical source；
2. 每段 code 必須一致回答 policy、enforcement mechanism 與 omitted glue。

## 2. 驗證 seams

P2 只驗證兩個公開邊界：

- Demo repository 的實作檔案是 code excerpt 的 canonical source。
- Slidev production pages 是觀眾實際看到 code、來源、責任說明與圖表的輸出。

驗收不限制 Markdown 的 CSS 寫法、元件拆分或 code excerpt 的內部儲存方式。

## 3. Task List

- [x] P2.1 建立 canonical code provenance
- [x] P2.2 補齊 code responsibility contracts
- [x] P2.3 複核平行 maps 與 comparison
- [x] P2.4 完成 P2 全體驗收

## 4. Tasks

### P2.1：建立 canonical code provenance

Acceptance：

- [x] Pure Vue 指向 `src/examples/vue-baseline/useVueUsersDemo.ts`。
- [x] Pinia 指向 `src/examples/pinia-action/userDemo.store.ts` 與 `PiniaActionPage.vue`。
- [x] TanStack Query 指向 `src/examples/tanstack-query/useUsersQueryDemo.ts`。
- [x] signal-kernel 指向 `src/examples/signal-kernel/usersGraph.ts`。
- [x] 驗收同時確認 canonical source 與 deck excerpt 共享責任錨點，而不要求逐字複製完整 production file。

實作紀錄：

```text
Red evidence: `pnpm run test:p2` 首次執行時，四個 model 共缺少 5 個完整 canonical source paths；部分頁面只有檔名，Pure Vue 與 signal-kernel 沒有可見來源。
Green implementation: Slides 11、17、21、22、27 顯示 Demo repository 內的完整相對路徑。驗收以 generation guard、Pinia reload／cleanup、query key／invalidation、observe／revision target 等 literal anchors 同時比對 deck 與 canonical source。
Verification: `pnpm run test:p2` 通過 4 models、5 canonical source files。
```

### P2.2：補齊 code responsibility contracts

Acceptance：

- [x] 每段 code 都以可見標示或講稿交代 `規則宣告 / 維持機制 / 省略的銜接`；Slide 27 為避免版面溢出，改由講稿收斂 ownership 分工。
- [x] Pure Vue 交代 watch／generation guard 與未展示的 detail／mutation／stream。
- [x] Pinia 分別交代 update→reload 與 currentness／stream cleanup。
- [x] TanStack Query 分別交代 query read policy 與 mutation invalidation relationship。
- [x] signal-kernel 交代 Application 宣告影響範圍、runtime 推進 revision、Graph 決定 Resource 重跑；adapter／teardown 留給下一張接續。

實作紀錄：

```text
Red evidence: 第二個 `test:p2` slice 缺少全部 18 個 code-contract statements，證明既有頁面雖能口頭解釋責任，但沒有一致的公開標示。
Green implementation: 六段 code walkthrough 使用相同三欄中文結構；保留各 model 的實際責任差異，不把 runtime automation 說成 application knowledge 消失。
Verification: `pnpm run test:p2` 通過 6 responsibility contracts；P1 acceptance 仍維持 35 slides、37:35 time budget。
```

### P2.3：複核平行 maps 與 comparison

Acceptance：

- [x] 四個 model 均有 `問題範圍 / 規則宣告 / 生命週期維持 / Vue 的責任 / 應用程式銜接 / 成本／非目標`。
- [x] comparison 同時呈現 Pure Vue、Pinia、TanStack Query 與 signal-kernel。
- [x] comparison 使用 problem scope／cost 結論，不使用工具升級路線。

實作紀錄：

```text
Audit result: 此範圍已在 P1.4–P1.8 提前完成，不需要重畫或改變論點。P2 acceptance 將既有公開契約納入可重跑檢查。
```

### P2.4：完成 P2 全體驗收

Acceptance：

- [x] `pnpm run test:p2` 通過。
- [x] `pnpm run test:p1` 通過，P2 沒有破壞 P1 內容與 38 分鐘限制。
- [x] canonical Demo tests 通過。
- [x] `pnpm run build` 通過。
- [x] 程式碼投影片的 production click states 在 1280×720 無 overflow。
- [x] `git diff --check` 通過。

實作紀錄：

```text
P2 contract: 4 maps、5 canonical source files、6 code responsibility contracts、1 comparison 全部通過。
Demo verification: Vue baseline、Pinia store、TanStack Query composable、signal-kernel users graph 與 dashboard routes 共 5 files／78 tests 通過。
Slidev verification: production build 成功（Slidev 52.18.0，722 modules transformed）。Slides 11、17、21、22、27 共 21 個 click states 在 1280×720 通過來源、contract 文字與畫布邊界檢查。
Regression: P1 acceptance 仍為 35 slides、2255 秒（37:35）；`git diff --check` 通過。
```

## 5. P2 完成邊界

P2 完成代表 code excerpts、responsibility maps 與 comparison 已能正式上台講解。以下工作不屬於 P2：

- 講者原始人像與最終裁切。
- Live Demo 的 16:9 fallback screenshots 與離線備援。
- 實際手機／投影 QR 掃描。
- 不暫停彩排與 PDF export。

這些項目留給 P3：Demo 與備援，以及 P4：彩排與交付驗收。
