---
layout: default
clicks: 3
---

# 四張非同步 Ownership 權責圖
## 同一份非同步工作：責任移到哪裡，又留下什麼？

<ChapterHeader
  :index="7"
  title="比較與收斂"
  question="責任移到哪裡、留下什麼，又付出哪些成本？"
/>

<div class="mt-2 grid grid-cols-4 gap-3 text-center text-sm font-semibold">
  <div class="rounded-xl border border-sky-300 px-3 py-2 dark:border-sky-700">Pure Vue</div>
  <div class="rounded-xl border border-violet-300 px-3 py-2 dark:border-violet-700">Pinia Action</div>
  <div class="rounded-xl border border-amber-300 px-3 py-2 dark:border-amber-700">TanStack Query</div>
  <div class="rounded-xl border border-emerald-300 px-3 py-2 dark:border-emerald-700">signal-kernel</div>
</div>

<div v-if="$clicks === 0" class="mt-3 grid grid-cols-4 gap-3 text-sm leading-6">
  <div class="min-h-60 rounded-2xl bg-sky-50 p-4 dark:bg-sky-950">
    <div class="text-xs font-semibold text-sky-600 dark:text-sky-300">責任配置</div>
    <div class="mt-4 text-lg font-semibold">Vue 基礎機制＋應用程式</div>
    <div class="mt-4 opacity-75">響應式系統傳播狀態、元件生命週期定義消費端範圍，應用程式維持非同步正確性。</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-violet-50 p-4 dark:bg-violet-950">
    <div class="text-xs font-semibold text-violet-600 dark:text-violet-300">移動／留下</div>
    <div class="mt-4 text-lg font-semibold">共用流程 → Store</div>
    <div class="mt-4 opacity-75">競態、重載與串流清理仍由 actions 和 Vue 頁面維持。</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-amber-50 p-4 dark:bg-amber-950">
    <div class="text-xs font-semibold text-amber-600 dark:text-amber-300">移動／留下</div>
    <div class="mt-4 text-lg font-semibold">伺服器資料生命週期 → Query runtime</div>
    <div class="mt-4 opacity-75">路由來源、query options、投影、渲染與 Query 外的串流仍留在 Vue 和應用程式。</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950">
    <div class="text-xs font-semibold text-emerald-600 dark:text-emerald-300">移動／留下</div>
    <div class="mt-4 text-lg font-semibold">資源內部響應關係＋生命週期 → Graph runtime</div>
    <div class="mt-4 opacity-75">路由來源、領域規則、Graph lifetime 與 UI 仍留在 Vue 和應用程式。</div>
  </div>
</div>

<div v-else-if="$clicks === 1" class="mt-3 grid grid-cols-4 gap-3 text-xs leading-5">
  <div class="min-h-60 rounded-2xl bg-sky-50 p-4 dark:bg-sky-950">
    <div class="font-semibold text-sky-600 dark:text-sky-300">規則宣告</div>
    <div class="mt-2">component / composable</div>
    <div class="mt-5 font-semibold text-sky-600 dark:text-sky-300">誰維持生命週期</div>
    <div class="mt-2">Vue scope 加上應用程式自己的規則</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-violet-50 p-4 dark:bg-violet-950">
    <div class="font-semibold text-violet-600 dark:text-violet-300">規則宣告</div>
    <div class="mt-2">store 狀態／actions</div>
    <div class="mt-5 font-semibold text-violet-600 dark:text-violet-300">誰維持生命週期</div>
    <div class="mt-2">store 與應用程式規則</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-amber-50 p-4 dark:bg-amber-950">
    <div class="font-semibold text-amber-600 dark:text-amber-300">規則宣告</div>
    <div class="mt-2">query／mutation 設定</div>
    <div class="mt-5 font-semibold text-amber-600 dark:text-amber-300">誰維持生命週期</div>
    <div class="mt-2">Query 執行層；串流仍由 Vue composable 處理</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950">
    <div class="font-semibold text-emerald-600 dark:text-emerald-300">規則宣告</div>
    <div class="mt-2">Graph factory／resource 宣告</div>
    <div class="mt-5 font-semibold text-emerald-600 dark:text-emerald-300">誰維持生命週期</div>
    <div class="mt-2">Graph runtime；實例與外部橋接由 Graph owner 負責</div>
  </div>
</div>

<div v-else-if="$clicks === 2" class="mt-3 grid grid-cols-4 gap-3 text-xs leading-5">
  <div class="min-h-60 rounded-2xl bg-sky-50 p-4 dark:bg-sky-950">
    <div class="font-semibold text-sky-600 dark:text-sky-300">Vue 的角色</div>
    <div class="mt-2">畫面呈現與區域整合</div>
    <div class="mt-5 font-semibold text-sky-600 dark:text-sky-300">串流邊界</div>
    <div class="mt-2">composable 在元件卸載時清理</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-violet-50 p-4 dark:bg-violet-950">
    <div class="font-semibold text-violet-600 dark:text-violet-300">Vue 的角色</div>
    <div class="mt-2">畫面呈現與流程協調</div>
    <div class="mt-5 font-semibold text-violet-600 dark:text-violet-300">串流邊界</div>
    <div class="mt-2">store action 啟動，頁面作用域負責清理</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-amber-50 p-4 dark:bg-amber-950">
    <div class="font-semibold text-amber-600 dark:text-amber-300">Vue 的角色</div>
    <div class="mt-2">route → query options，並消費 query／stream 結果</div>
    <div class="mt-5 font-semibold text-amber-600 dark:text-amber-300">串流邊界</div>
    <div class="mt-2">獨立 Vue composable；這是合理但不同的邊界</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950">
    <div class="font-semibold text-emerald-600 dark:text-emerald-300">Vue 的角色</div>
    <div class="mt-2">route → Graph source，並消費 Graph snapshot</div>
    <div class="mt-5 font-semibold text-emerald-600 dark:text-emerald-300">串流邊界</div>
    <div class="mt-2">串流 resource 加上應用程式取消訂閱轉接層</div>
  </div>
</div>

<div v-else class="mt-3 grid grid-cols-4 gap-3 text-xs leading-5">
  <div class="min-h-60 rounded-2xl bg-sky-50 p-4 dark:bg-sky-950">
    <div class="font-semibold text-sky-600 dark:text-sky-300">可見成本</div>
    <div class="mt-4">非同步規則需要手動維護；功能變大時容易分散。</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-violet-50 p-4 dark:bg-violet-950">
    <div class="font-semibold text-violet-600 dark:text-violet-300">可見成本</div>
    <div class="mt-4">store 集中協調，但競態、重新整理與清理仍是應用程式責任。</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-amber-50 p-4 dark:bg-amber-950">
    <div class="font-semibold text-amber-600 dark:text-amber-300">可見成本</div>
    <div class="mt-4">要理解 query／快取模型；其他非同步工作仍需合適邊界。</div>
  </div>
  <div class="min-h-60 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950">
    <div class="font-semibold text-emerald-600 dark:text-emerald-300">可見成本</div>
    <div class="mt-4">多一套響應式執行層、詞彙、轉接層、除錯與清理整合。</div>
  </div>
</div>

<div v-if="$clicks === 0" class="mt-3 rounded-xl bg-gray-100 p-2 text-center font-semibold dark:bg-gray-800">非同步 Ownership 的差異，是「責任 → 責任邊界」的配置如何改變。</div>
<div v-else-if="$clicks === 1" class="mt-3 rounded-xl bg-gray-100 p-2 text-center font-semibold dark:bg-gray-800">Ownership 不只看狀態放哪裡，也要看誰持續維持正確性。</div>
<div v-else-if="$clicks === 2" class="mt-3 rounded-xl bg-gray-100 p-2 text-center font-semibold dark:bg-gray-800">同一個畫面可以同時消費不同生命週期邊界。</div>
<div v-else class="mt-3 rounded-xl bg-gray-100 p-2 text-center font-semibold dark:bg-gray-800">不同問題範圍，用不同成本換取不同程度的清晰度。</div>

<!--
Core: 四種實作改變的是 Async responsibilities 在 Vue、application code、store、Query runtime 與 Graph runtime 之間的配置，不是成熟度階梯。
Time: 100 秒。
Talk track:
初始畫面先用同一個句型結算 responsibility movement。Pure Vue 是 baseline：Vue reactivity 傳播狀態、component lifecycle 定義 consumer scope、application code 維持 async correctness。Pinia 把 shared workflow 移到 store。TanStack Query 把 server-state lifecycle 移到 Query runtime，但 route sources、query option derivation 與 UI 仍在 Vue。signal-kernel 再把 Resource 內部的 reactive dependency propagation 與 async lifecycle 集中到 Graph runtime，但 route source、domain policy、Graph lifetime 與 UI 仍在 Vue 和 Application。
第一個 click 比較規則在哪裡宣告、誰真的維持生命週期。兩個 runtime 都需要 Application 宣告更新影響範圍；差異不在有沒有 invalidation，而在它進入 query records 或 Graph revisions。第二個 click 比較 Vue 的角色：TanStack 版本由 Vue 把 route 轉成 query options；signal-kernel 版本由 Vue 把 route 寫入 Graph source。第三個 click 公開成本：Graph 帶來第二套 reactive runtime、詞彙、adapter、除錯與 teardown 整合。這裡沒有便利性的勝負，只有不同的 responsibility-to-owner mapping。
Transition: 既然四份實作的責任配置不同，接著先界定「40 次通過」究竟能證明什麼。
Cut: 時間不足時保留 problem scope 與 cost 兩個畫面，口頭略過中間兩個 click。
-->

---
layout: default
clicks: 2
---

# 40 次通過，證明的是共同結果
## 不是架構排名

<div class="mt-7 flex items-center justify-center gap-5 font-mono">
  <div class="rounded-2xl border px-6 py-5 text-center">
    <div class="text-4xl font-bold">4</div>
    <div class="mt-2 text-xs opacity-65">種 Ownership 模型</div>
  </div>
  <div class="text-3xl opacity-50">×</div>
  <div class="rounded-2xl border px-6 py-5 text-center">
    <div class="text-4xl font-bold">10</div>
    <div class="mt-2 text-xs opacity-65">個契約案例</div>
  </div>
  <div class="text-3xl opacity-50">=</div>
  <div class="rounded-2xl bg-emerald-100 px-7 py-5 text-center dark:bg-emerald-950">
    <div class="text-4xl font-bold text-emerald-700 dark:text-emerald-300">40</div>
    <div class="mt-2 text-xs">次契約執行</div>
  </div>
</div>

<div v-if="$clicks === 0" class="mt-6 rounded-xl bg-gray-100 p-3 text-center text-lg font-semibold dark:bg-gray-800">
  固定使用者看見的結果，才有比較責任配置的共同基準。
</div>

<div v-else-if="$clicks === 1" class="mt-5 grid grid-cols-3 gap-4 text-center text-sm">
  <div class="rounded-xl border p-4">
    <div class="text-3xl font-bold">8</div>
    <div class="mt-2">共同非同步行為</div>
    <div class="mt-2 text-xs opacity-65">請求、競態、更新、串流</div>
  </div>
  <div class="rounded-xl border p-4">
    <div class="text-3xl font-bold">1</div>
    <div class="mt-2">共同畫面契約</div>
    <div class="mt-2 text-xs opacity-65">路由與 dashboard 畫面</div>
  </div>
  <div class="rounded-xl border p-4">
    <div class="text-3xl font-bold">1</div>
    <div class="mt-2">模型說明案例</div>
    <div class="mt-2 text-xs opacity-65">各自揭露 Ownership 責任</div>
  </div>
</div>

<div v-else class="mt-5 grid grid-cols-2 gap-5 text-sm leading-6">
  <div class="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-950">
    <div class="text-lg font-semibold text-emerald-700 dark:text-emerald-300">可以證明</div>
    <div class="mt-3">四份實作都達成這組被選定的 UI、路由、回應與串流結果。</div>
  </div>
  <div class="rounded-2xl bg-rose-50 p-5 dark:bg-rose-950">
    <div class="text-lg font-semibold text-rose-700 dark:text-rose-300">不能證明</div>
    <div class="mt-3">架構優越、完整等價、框架獨立、生態成熟度，或所有專案情境。</div>
  </div>
  <div class="col-span-2 rounded-xl border p-3 text-center font-semibold">
    測試控制結果；Ownership 仍要從程式碼與責任圖閱讀。
  </div>
</div>

<!--
Core: 40 是四個 model 各跑十個契約案例，不是四十個彼此不同的功能。它建立共同結果基準，卻不能替架構清晰度或工具成熟度背書。
Time: 45 秒。
Talk track:
這個數字要主動降溫。每個 model 跑相同十個案例：八個共同 async behavior、一個共同 dashboard surface，以及一個把該 model ownership notes 顯示出來的說明案例。它可以證明 selected outcomes 一致，讓我們不是拿四個不同需求硬比；但它不能證明 signal-kernel 比其他工具優越，也不能證明四者完整等價。Ownership 的差異要回到 code path 和 responsibility map 閱讀。
Transition: 有了共同結果與責任差異，真正的選擇問題就變成：你的 problem scope 到底在哪裡？
Cut: 可只講公式與最後一句限制，略過十個案例的拆解。
-->

---
layout: default
clicks: 3
---

# 先看問題，再選非同步權責邊界
## 這是問題範圍的適配，不是完整工具選型

<div class="mt-5 grid grid-cols-2 gap-4 text-sm leading-6">
  <div class="rounded-2xl border p-5 transition-all" :class="$clicks === 0 ? 'border-sky-400 bg-sky-50 opacity-100 dark:bg-sky-950' : 'opacity-40'">
    <div class="text-lg font-semibold text-sky-600 dark:text-sky-300">Pure Vue</div>
    <div class="mt-2 font-semibold">區域功能，生命週期容易看完</div>
    <div class="mt-2 opacity-75">需求留在一個 component / composable，低抽象成本就是優勢。</div>
  </div>
  <div class="rounded-2xl border p-5 transition-all" :class="$clicks === 1 ? 'border-violet-400 bg-violet-50 opacity-100 dark:bg-violet-950' : 'opacity-40'">
    <div class="text-lg font-semibold text-violet-600 dark:text-violet-300">Pinia Action</div>
    <div class="mt-2 font-semibold">多個畫面共用客戶端工作流程</div>
    <div class="mt-2 opacity-75">需要明確的 store state、action 與跨元件協調入口。</div>
  </div>
  <div class="rounded-2xl border p-5 transition-all" :class="$clicks === 2 ? 'border-amber-400 bg-amber-50 opacity-100 dark:bg-amber-950' : 'opacity-40'">
    <div class="text-lg font-semibold text-amber-600 dark:text-amber-300">TanStack Query</div>
    <div class="mt-2 font-semibold">伺服器資料有 identity、cache 與 freshness</div>
    <div class="mt-2 opacity-75">需要 query 生命週期、mutation 與失效更新的成熟語意。</div>
  </div>
  <div class="rounded-2xl border p-5 transition-all" :class="$clicks === 3 ? 'border-emerald-400 bg-emerald-50 opacity-100 dark:bg-emerald-950' : 'opacity-40'">
    <div class="text-lg font-semibold text-emerald-600 dark:text-emerald-300">明確 Graph</div>
    <div class="mt-2 font-semibold">非同步關係需要在框架消費前成立</div>
    <div class="mt-2 opacity-75">值得把 source、衍生狀態、resource 與 effect 建成可觀察的關係圖。</div>
  </div>
</div>

<div class="mt-4 rounded-xl bg-gray-100 p-3 text-center text-xs leading-5 dark:bg-gray-800">
  尚未評估：SSR、Devtools、bundle、效能、團隊熟悉度、生態系與長期成熟度。<br>
  <b>所以這張只能回答邊界是否適合，不能代替完整選型。</b>
</div>

<!--
Core: 邊界選擇要從 problem scope 出發。Pure Vue、Pinia、TanStack Query 與 explicit graph 各自對不同複雜度來源提供清晰度，沒有單一解能覆蓋所有評估面向。
Time: 50 秒。
Talk track:
依序用四個 click 對準四種問題。若 async lifecycle 能在區域 scope 看完，Pure Vue 最直接。若同一個 client workflow 被多個 component 使用，Pinia 提供共享 ownership 入口。若困難來自 server entity identity、cache、freshness 與 mutation，TanStack Query 的 problem model 最貼近。只有當 async sources、derived state、resources 與 effects 的關係需要在 Vue mount 之前存在，而且框架只應成為 consumer，explicit graph 才開始值得付出成本。最後提醒這不是完整工具評選；我們沒有用這個 demo 測 SSR、Devtools、效能、生態或團隊學習成本。
Transition: 而且真實專案通常不會只選一個；這些邊界可以同時存在。
Cut: 每個模型只念粗體條件，最後保留「不能代替完整選型」。
-->

---
layout: default
clicks: 1
---

# 可以共存，不需要排成階梯
## 同一個應用，可能同時需要多種責任範圍

<div class="mt-6 grid grid-cols-2 gap-4 text-sm">
  <div class="rounded-2xl border border-sky-300 p-5 dark:border-sky-700">
    <div class="font-semibold text-sky-600 dark:text-sky-300">Pure Vue</div>
    <div class="mt-2">畫面呈現與元件範圍</div>
  </div>
  <div class="rounded-2xl border border-violet-300 p-5 dark:border-violet-700">
    <div class="font-semibold text-violet-600 dark:text-violet-300">Pinia</div>
    <div class="mt-2">共享的客戶端工作流程</div>
  </div>
  <div class="rounded-2xl border border-amber-300 p-5 dark:border-amber-700">
    <div class="font-semibold text-amber-600 dark:text-amber-300">TanStack Query</div>
    <div class="mt-2">伺服器資料生命週期</div>
  </div>
  <div class="rounded-2xl border border-emerald-300 p-5 dark:border-emerald-700">
    <div class="font-semibold text-emerald-600 dark:text-emerald-300">明確 Graph</div>
    <div class="mt-2">框架消費以前的非同步依賴模型</div>
  </div>
</div>

<div v-click class="mt-5 rounded-2xl bg-gradient-to-r from-sky-100 via-amber-100 to-emerald-100 p-4 text-center text-xl font-semibold dark:from-sky-950 dark:via-amber-950 dark:to-emerald-950">
  這些是不同問題範圍，不是不同工具等級。
</div>

<!--
Core: 四種模式可以在同一個應用中共存。它們是 scopes，不是 levels，也不是從舊方案升級到新方案的路線圖。
Time: 35 秒。
Talk track:
請不要把前面的出場順序讀成升級階梯。Vue 可以持續負責 presentation 與 component scope；Pinia 管 client workflow；TanStack Query 管符合 server-state problem model 的資料；某些 domain 再選擇 explicit graph。邊界能重疊，但每一段都要說清楚誰宣告規則、誰維持 lifecycle，以及 consumer 離開時清理什麼。
Transition: 因此這場真正要帶走的，不是工具名稱，而是一個 ownership 判斷原則。
Cut: 只保留最後一句結論即可。
-->

---
layout: center
clicks: 2
---

# 先畫出非同步 Ownership，再選擇邊界

<div class="mt-7 max-w-4xl rounded-2xl bg-emerald-50 p-6 text-center text-2xl font-semibold leading-10 dark:bg-emerald-950">
  非同步 Ownership 是一段非同步工作跨時間運行時，<br>
  各項責任在系統邊界之間如何被配置與承擔。
</div>

<div v-if="$clicks === 0" class="mt-6 text-center text-lg opacity-70">
  它不是資料放在哪裡，也不是哪個 API 發出了 request。
</div>

<div v-else-if="$clicks === 1" class="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
  <div class="rounded-xl border p-3"><b>哪些責任移動了？</b></div>
  <div class="rounded-xl border p-3"><b>哪些仍留在原邊界？</b></div>
  <div class="rounded-xl border p-3"><b>誰用什麼機制維持正確？</b></div>
</div>

<div v-else class="mt-5 max-w-4xl">
  <div class="rounded-xl border border-amber-300 p-3 text-center text-sm dark:border-amber-700">
    signal-kernel 不是這場的答案；它只是把這組想法做成可執行的實驗。
  </div>
  <div class="mt-3 rounded-xl bg-gray-100 p-3 text-center text-lg font-semibold dark:bg-gray-800">
    你的非同步責任分布在哪裡？<br>這張配置圖仍容易理解、測試與維持嗎？
  </div>
</div>

<!--
Core: 結論是讓 Async Ownership 可被讀出：每項 responsibility 都能指出 owner、lifetime 與維持 correctness 的 mechanism；signal-kernel 只是其中一種可運行實驗。
Time: 40 秒。
Talk track:
結尾原樣回收開場定義：Async Ownership 是一段非同步工作跨時間運行時，各項責任在系統邊界之間如何被配置與承擔。它不是 state location，也不是 API caller。
第一個 click 給三個檢查方向：哪些責任移動、哪些仍留在原 boundary，以及真正由誰、透過什麼 mechanism 維持 correctness。好的配置不要求全部集中，但每項責任都必須讀得出 owner 與 lifetime。
signal-kernel 是我把 Resource 內部的 reactive dependency propagation 與 async lifecycle 移進 Graph runtime 的 runnable experiment，不是所有 Vue 專案的標準答案。它沒有消除 Application 的 domain policy，也沒有接手 route source、Graph lifetime 或 UI；它用額外 runtime、vocabulary 與 integration cost，換取一張我認為更容易閱讀的 responsibility map。最後把問題交還給觀眾：你的 async responsibilities 現在分布在哪裡？這張配置圖仍容易理解、測試與維持嗎？
Transition: 正式內容到這裡，接著開放提問；Demo repo 會放在最後一頁。
Cut: 保留主結論與最後問題，中間三個 ownership 問題可略過。
-->

---
layout: center
---

# Q&A
## 提問與交流

<div class="mt-6 flex items-center justify-center gap-9">
  <div class="h-52 w-52 rounded-2xl bg-white p-2 shadow-lg">
    <img src="/qr/demo-repository.svg" alt="Demo repository QR code" class="h-full w-full" />
  </div>
  <div class="max-w-md text-left">
    <div class="text-lg font-semibold">Demo repository</div>
    <div class="mt-3 rounded-xl bg-gray-100 px-4 py-3 font-mono text-sm dark:bg-gray-800">github.com/Luciano0322/vue-async-ownership</div>
    <div class="mt-4 text-sm opacity-65">Pure Vue · Pinia · TanStack Query · signal-kernel</div>
  </div>
</div>

<!--
Core: 正式內容結束後保留提問與 Demo repository 入口；全場只使用這個已驗證的 repository QR code。
Time: 0 秒（不計入 40 分鐘正式內容）。
Talk track:
感謝大家。接下來開放提問；這裡的 QR code 會帶大家到 Demo repository，裡面有 Pure Vue、Pinia、TanStack Query 與 signal-kernel 四種實作。
Transition: 無。
Cut: Q&A 頁不刪除；若現場網路不穩，提醒觀眾可手動輸入旁邊的 GitHub URL。
-->
