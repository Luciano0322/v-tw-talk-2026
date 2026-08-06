---
layout: default
clicks: 3
---

<ChapterHeader
  :index="2"
  title="共同 Demo｜同一個 Dashboard，三種非同步工作"
  question="路由固定 keyword 與 userId；畫面依序觀察 request、mutation 與 stream。"
/>

<div class="relative mx-auto mt-2 h-[430px] w-full overflow-hidden rounded-xl border border-slate-600 bg-[#06111f] shadow-xl">
  <img
    src="/screenshots/dashboard-default.png"
    alt="Pure Vue Dashboard 的固定 default 情境，包含搜尋、更新使用者與活動串流"
    class="h-full w-full object-cover object-top"
  />

  <div class="absolute right-2 top-2 rounded-md bg-slate-950/85 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
    畫面呈現結果；Ownership 要看誰持續維持正確性
  </div>

  <div
    v-if="$clicks === 1"
    class="absolute left-[6.3%] top-[14.2%] h-[10.8%] w-[87.3%] rounded-lg border-[3px] border-sky-300 shadow-[0_0_0_9999px_rgba(2,6,23,0.66)]"
  >
    <div class="absolute -top-7 left-0 rounded bg-sky-300 px-2 py-1 text-xs font-bold text-slate-950">
      REQUEST｜keyword 改變後重新搜尋
    </div>
  </div>

  <div
    v-else-if="$clicks === 2"
    class="absolute left-[30%] top-[48%] h-[10.7%] w-[38.2%] rounded-lg border-[3px] border-amber-300 shadow-[0_0_0_9999px_rgba(2,6,23,0.66)]"
  >
    <div class="absolute -top-7 left-0 rounded bg-amber-300 px-2 py-1 text-xs font-bold text-slate-950">
      MUTATION｜更新成功後，哪些資料要同步？
    </div>
  </div>

  <div
    v-else-if="$clicks === 3"
    class="absolute left-[6.3%] top-[71.1%] h-[20.5%] w-[61.9%] rounded-lg border-[3px] border-emerald-300 shadow-[0_0_0_9999px_rgba(2,6,23,0.66)]"
  >
    <div class="absolute -top-7 left-0 rounded bg-emerald-300 px-2 py-1 text-xs font-bold text-slate-950">
      STREAM｜userId 改變時切換來源並清理訂閱
    </div>
  </div>
</div>

<!--
Core: 共同 Dashboard 同時包含 request、mutation 與 stream；route 的 keyword 與 userId 讓 source change 可以被重複操作。
Time: 65 秒。
Talk track:
先看這張固定情境的實際 Dashboard。後面四種做法面對的是同一個畫面，而且不是只有一個 fetch。現在先不用讀右側所有狀態，我會一次只聚焦一塊。
Click 1：Search users 是 request query。keyword 改變後會重新取得列表，也必須避免較舊的結果覆蓋目前畫面。
Click 2：Update user 是 mutation。成功以後還要決定哪些資料受到影響，以及由誰宣告 invalidate 或 refresh。備援截圖也保留了更新成功後列表、detail 與 status 同步的結果。
Click 3：User activity 是 stream-like resource。userId 改變時不只要訂閱新的 source，也要停止舊 subscription。這張 default 情境刻意顯示 connected，避免把 disconnect 誤認為正常結果。
我把 keyword 與 userId 放進 route，是為了讓同一組 source change 可以在四個 model 間重現；這裡固定的是可觀察情境，不是內部實作。
Transition: 接著把這個 Dashboard 放進四條正式 route，並先界定這份比較到底控制了什麼。
Cut: 只說三種工作名稱，以及 keyword / userId 讓 source change 可重現。
-->

---
layout: default
clicks: 2
---

# 四條路由，控制選定結果

## 同一畫面、API 與路由狀態；不是控制實驗

<div class="mt-6 grid grid-cols-[1.05fr_1fr] gap-6">
<div>
<div class="mb-3 text-sm font-semibold opacity-55">正式 Demo 路由</div>

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

<div class="grid content-start gap-4">
<div v-if="$clicks === 0" class="mt-16 rounded-xl border border-dashed p-5 text-center text-lg font-semibold opacity-60">
先確認路由相同；再問哪些結果真的受到控制。
</div>
<div v-click="1" class="rounded-xl border border-sky-300 p-4 dark:border-sky-700">
<div class="font-semibold">共同限制下控制</div>
<div class="mt-2 text-sm leading-6 opacity-75">
可見的情境 · 路由來源<br>
等待中／重新整理中／成功／錯誤<br>
過期結果保護 · 資料更新 · 串流來源切換
</div>
</div>

<div v-click="2" class="rounded-xl border border-amber-300 p-4 dark:border-amber-700">
<div class="font-semibold">刻意不控制</div>
<div class="mt-2 text-sm leading-6 opacity-75">
抽象層次 · 執行層成熟度<br>
生態系 · 應用程式銜接
</div>
<div class="mt-2 text-sm font-semibold">所以這不是效能評測，也不是工具排名。</div>
</div>
</div>
</div>

<div class="mt-3 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-xs dark:bg-gray-800">
<span>固定截圖：<code>scenario=default</code> · <code>keyword=a</code> · <code>userId=1</code></span>
<span class="font-semibold">Demo repo QR → 結尾</span>
</div>

<!--
Core: 四條路由重複相同的觀眾可見情境與選定結果；共同契約不等於控制實驗，也不能推導工具排名。
Time: 50 秒。
Talk track:
四種做法各自有一條對應路由，並共用 keyword、userId，所以我可以在相同來源狀態下切換實作方式。上一張截圖也是從這組 default route 產生，不需要離開簡報才能確認共同畫面。
Click 1：共同限制下只固定觀眾能看到的選定結果，例如等待中、重新整理中、錯誤、過期結果保護、資料更新結果與串流來源切換。
Click 2：它沒有控制抽象層次、執行層成熟度、生態系或應用程式銜接；這些差異本來就是各種實作方式的一部分。
所以後面看到的程式碼量與權責圖，應該被當成架構案例，而不是效能評測或全面的工具選型結論。
主線會留在簡報內，用固定截圖走共同正常流程；若現場追問操作細節，四條 route 仍保留相同情境。競態或串流切換軌跡留到後面的收斂段落。
Transition: 比較邊界固定以後，先看 Pure Vue 的非同步 Ownership 基準：Vue 響應式系統、元件生命週期與應用程式程式碼如何共同承擔同一段工作。
Cut: 只念四條路由，並保留「選定結果相同，不代表控制成熟度、生態系或應用程式銜接」。
-->
