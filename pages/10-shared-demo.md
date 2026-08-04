---
layout: default
---

# 同一個 Dashboard，三種非同步工作

## 路由提供可重現的來源：`keyword` + `userId`

<div class="mt-7 grid grid-cols-3 gap-5">
  <div class="rounded-xl border p-5">
    <div class="text-sm font-semibold opacity-55">請求型工作</div>
    <div class="mt-2 text-xl font-semibold">搜尋使用者</div>
    <div class="mt-1 font-mono text-sm opacity-65">來源：keyword</div>
    <div class="mt-5 text-sm leading-6 opacity-75">
      等待中 · 重新整理中<br>
      成功 · 錯誤<br>
      過期結果保護
    </div>
  </div>

  <div class="rounded-xl border p-5">
    <div class="text-sm font-semibold opacity-55">資料更新（MUTATION）＋失效</div>
    <div class="mt-2 text-xl font-semibold">更新使用者</div>
    <div class="mt-1 font-mono text-sm opacity-65">來源：userId＋表單</div>
    <div class="mt-5 text-sm leading-6 opacity-75">
      更新中 · 成功 · 錯誤<br>
      受影響的資料<br>
      失效／重新整理
    </div>
  </div>

  <div class="rounded-xl border p-5">
    <div class="text-sm font-semibold opacity-55">串流型工作</div>
    <div class="mt-2 text-xl font-semibold">使用者活動</div>
    <div class="mt-1 font-mono text-sm opacity-65">來源：userId</div>
    <div class="mt-5 text-sm leading-6 opacity-75">
      持續中 · 事件 · 錯誤<br>
      來源切換<br>
      取消訂閱／清理
    </div>
  </div>
</div>

<div class="mt-7 rounded-xl bg-gray-100 p-4 text-center dark:bg-gray-800">
  <span class="font-semibold">共同 UI 只是觀察面。</span>
  三種工作仍有不同的生命週期責任。
</div>

<!--
Core: 共同 Dashboard 同時包含 request、mutation 與 stream；route 的 keyword 與 userId 讓 source change 可以被重複操作。
Time: 65 秒。
Talk track:
後面四種做法都會面對同一個 Dashboard，而且不是只有一個 fetch。
Search users 是 request-like resource，keyword 改變時會重新取得列表，也必須避免較舊的結果覆蓋目前畫面。
Update user 是 mutation；成功以後還要決定哪些資料受到影響，以及由誰宣告 invalidate 或 refresh。
User activity 則是 stream-like resource。userId 改變時不只要訂閱新的 source，也要停止舊 subscription。
我把 keyword 與 userId 放進 route，是為了讓同一組 source change 可以在四個 model 間重現；這裡固定的是可觀察情境，不是內部實作。
Transition: 接著把這個 Dashboard 放進四條正式 route，並先界定這份比較到底控制了什麼。
Cut: 只說三種工作名稱，以及 keyword / userId 讓 source change 可重現。
-->

---
layout: default
---

# 四條路由，控制選定結果

## 同一 UI、API 與路由狀態；不是控制實驗

<div class="mt-6 grid grid-cols-[1.05fr_1fr] gap-6">
<div>
<div class="mb-3 text-sm font-semibold opacity-55">正式 Demo routes</div>

<div class="grid gap-2 font-mono text-sm">
<div class="rounded-lg border px-4 py-3">
<span class="inline-block w-52">/examples/vue</span>
<span class="font-sans opacity-65">Pure Vue</span>
</div>
<div class="rounded-lg border px-4 py-3">
<span class="inline-block w-52">/examples/pinia</span>
<span class="font-sans opacity-65">Pinia Action</span>
</div>
<div class="rounded-lg border px-4 py-3">
<span class="inline-block w-52">/examples/query</span>
<span class="font-sans opacity-65">TanStack Query</span>
</div>
<div class="rounded-lg border px-4 py-3">
<span class="inline-block w-52">/examples/signal-kernel</span>
<span class="font-sans opacity-65">signal-kernel</span>
</div>
</div>

<div class="mt-3 rounded-lg bg-gray-100 px-4 py-3 font-mono text-xs dark:bg-gray-800">
?keyword=a&amp;userId=1&amp;scenario=default
</div>
</div>

<div class="grid gap-4">
<div class="rounded-xl border p-4">
<div class="font-semibold">共同 contract 控制</div>
<div class="mt-2 text-sm leading-6 opacity-75">
user-visible scenario · route source<br>
pending / refreshing / success / error<br>
stale protection · update · stream switch
</div>
</div>

<div class="rounded-xl border p-4">
<div class="font-semibold">刻意不控制</div>
<div class="mt-2 text-sm leading-6 opacity-75">
abstraction level · runtime maturity<br>
ecosystem · application glue
</div>
<div class="mt-2 text-sm font-semibold">所以這不是 benchmark，也不是工具排名。</div>
</div>
</div>
</div>

<div class="mt-5 flex items-center justify-between rounded-xl border border-dashed px-4 py-3 text-sm opacity-65">
  <span>Live Demo placeholder：route navigation + fallback screenshot</span>
  <span>Demo repo QR → P4</span>
</div>

<!--
Core: 四條 route 重複相同的 user-visible scenario 與 selected outcomes；共同 contract 不等於控制實驗，也不能推導工具排名。
Time: 60 秒。
Talk track:
四種做法各自有一條正式 route，並共用 keyword、userId 和 scenario，所以我可以在相同 source state 下切換 model。
共同 contract 只固定觀眾能看到的 selected outcomes，例如 pending、refreshing、error、stale protection、update 結果與 stream source switch。
它沒有控制 abstraction level、runtime maturity、ecosystem 或 application glue；這些差異本來就是各 model 的一部分。
所以後面看到的程式碼量與 responsibility map，應該被當成 architecture case study，而不是 benchmark 或全面的工具選型結論。
現場 Demo 會先走一次共同 happy path；race 或 stream-switch trace 留到後面的收斂段落。現在仍保留 route 與 fallback screenshot placeholder，QR 在最後製作階段補上。
Transition: 比較邊界固定以後，先看 Pure Vue 的 Async Ownership baseline：Vue reactivity、component lifecycle 與 application code 如何共同承擔同一段工作。
Cut: 只念四條 routes，並保留「selected outcomes 相同，不代表控制 maturity、ecosystem 或 glue」。
-->
