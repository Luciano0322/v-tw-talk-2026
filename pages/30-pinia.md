---
layout: default
clicks: 2
---

# Composable 已經能共享，為什麼還需要 Pinia？

## 都能共享，但共享邊界是否明確

<ChapterHeader
  :index="4"
  title="Pinia"
  question="共享能力已經存在；Pinia 讓 ownership 如何被命名？"
/>

<div class="mt-3 grid grid-cols-[1fr_auto_1fr] items-stretch gap-4">
  <div class="rounded-2xl border p-4">
    <div class="text-sm font-semibold opacity-55">COMPOSABLE</div>
    <div class="mt-2 text-xl font-semibold">可重用的功能邏輯</div>
    <div class="mt-3 grid gap-2 text-sm">
      <div class="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">元件內可以各自建立實例</div>
      <div class="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800"><code>module-scoped ref</code> 也能共享</div>
      <div class="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">共享慣例由應用程式自行約定</div>
    </div>
  </div>

  <div class="grid content-center text-center">
    <div class="text-xs font-semibold opacity-55">不是能力解鎖</div>
    <div class="my-2 text-4xl opacity-40">→</div>
    <div class="text-xs font-semibold text-amber-600 dark:text-amber-300">而是邊界明確化</div>
  </div>

  <div
    class="rounded-2xl border p-4 transition-all"
    :class="$clicks >= 1 ? 'border-amber-400 bg-amber-50 opacity-100 dark:bg-amber-950' : 'opacity-45'"
  >
    <div class="text-sm font-semibold text-amber-600 dark:text-amber-300">PINIA STORE</div>
    <div class="mt-2 text-xl font-semibold">具名的應用程式邊界</div>
    <div class="mt-3 grid gap-2 text-sm">
      <div class="rounded-lg border border-amber-200 px-3 py-2 dark:border-amber-800">穩定的 store identity</div>
      <div class="rounded-lg border border-amber-200 px-3 py-2 dark:border-amber-800">統一的 action 操作入口</div>
      <div class="rounded-lg border border-amber-200 px-3 py-2 dark:border-amber-800">多個 consumer 共用同一流程</div>
    </div>
  </div>
</div>

<div v-if="$clicks === 0" class="mt-3 rounded-xl bg-gray-100 p-3 text-center text-base font-semibold dark:bg-gray-800">
  Composable 在能力上已經做得到共享。
</div>
<div v-else-if="$clicks === 1" class="mt-3 rounded-xl bg-amber-50 p-3 text-center text-base font-semibold dark:bg-amber-950">
  Pinia 把共享狀態與流程變成大家都認得的 application store boundary。
</div>
<div v-else class="mt-3 rounded-xl bg-blue-50 p-3 text-center text-base font-semibold dark:bg-blue-950">
  先改變的是 shared ownership；非同步規則是否改變，下一張再看。
</div>

<!--
Core: Pinia 也是共享狀態，但還要建立操作與 store identity 明確的共識與邊界。
Time: 45 秒。
Talk track:
講到 Pinia，應該會有一些人覺得 Pinia 版本應該和剛才的 composable 很像，那其實是對的。
Composable 在能力上已經能共享狀態；把 ref 放到 module scope，或由應用程式建立 singleton，都可以跨元件使用。所以這裡不能說 composable 只能是 component-local，也不能說 Pinia 有甚麼黑魔法，讓原本不可能的事情突然變得可能。
Click 1：Pinia 的價值是把這件事變成具名的 application store boundary。我們得到穩定的 store identity、統一的 action 入口，以及多個 consumer 都能辨識的共享慣例。
Click 2：所以 async lifecycle 是一樣的。真正移動的是 shared snapshot 與 workflow ownership，再確認 request、mutation、stream 的正確性規則到底有沒有跟著移動。
Transition: 把 Composable 和 Pinia 的實作逐項放在一起，重複的地方正是這一章最重要的證據。
Cut: 只保留「Composable 也能共享；Pinia 讓共享邊界更明確」。
-->

---
layout: default
clicks: 2
---

# 搬進 Store 後，非同步規則有變嗎？

## Composable 與 Pinia 的 async correctness 對照

<div class="mt-5 grid grid-cols-[150px_1fr_1fr] gap-2 text-sm">
  <div></div>
  <div class="rounded-xl bg-blue-50 p-3 text-center text-lg font-semibold dark:bg-blue-950">Composable</div>
  <div class="rounded-xl bg-amber-50 p-3 text-center text-lg font-semibold dark:bg-amber-950">Pinia</div>

  <div class="grid content-center font-semibold opacity-55">狀態位置</div>
  <div class="rounded-lg border px-3 py-2 font-mono">feature refs</div>
  <div
    class="rounded-lg border px-3 py-2 font-mono transition-all"
    :class="$clicks >= 2 ? 'border-amber-400 bg-amber-50 dark:bg-amber-950' : ''"
  >store refs</div>

  <div class="grid content-center font-semibold opacity-55">操作入口</div>
  <div class="rounded-lg border px-3 py-2 font-mono">composable function</div>
  <div
    class="rounded-lg border px-3 py-2 font-mono transition-all"
    :class="$clicks >= 2 ? 'border-amber-400 bg-amber-50 dark:bg-amber-950' : ''"
  >named action</div>

  <div class="grid content-center font-semibold opacity-55">舊結果保護</div>
  <div
    class="rounded-lg border px-3 py-2 font-mono transition-all"
    :class="$clicks === 1 ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : ''"
  >generation guard</div>
  <div
    class="rounded-lg border px-3 py-2 font-mono transition-all"
    :class="$clicks === 1 ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : ''"
  >generation guard</div>

  <div class="grid content-center font-semibold opacity-55">更新後同步</div>
  <div
    class="rounded-lg border px-3 py-2 transition-all"
    :class="$clicks === 1 ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : ''"
  >手動重新載入</div>
  <div
    class="rounded-lg border px-3 py-2 transition-all"
    :class="$clicks === 1 ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : ''"
  >手動重新載入</div>

  <div class="grid content-center font-semibold opacity-55">串流清理</div>
  <div
    class="rounded-lg border px-3 py-2 transition-all"
    :class="$clicks === 1 ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : ''"
  >明確呼叫 cleanup</div>
  <div
    class="rounded-lg border px-3 py-2 transition-all"
    :class="$clicks === 1 ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : ''"
  >page／store 明確清理</div>
</div>

<div v-if="$clicks === 0" class="mt-4 rounded-xl bg-gray-100 p-3 text-center text-lg font-semibold dark:bg-gray-800">
  先不要比較 API；只看誰在維持非同步正確性。
</div>
<div v-else-if="$clicks === 1" class="mt-4 rounded-xl bg-blue-50 p-3 text-center text-lg font-semibold dark:bg-blue-950">
  競態、重載與清理規則幾乎相同，仍由 application code 維持。
</div>
<div v-else class="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
  <div class="rounded-xl bg-amber-50 p-3 dark:bg-amber-950">
    <b>真正移動</b><br>shared snapshot · workflow entry · store identity
  </div>
  <div class="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
    <b>沒有自動移動</b><br>race · reload relationship · stream cleanup
  </div>
</div>

<!--
Core: 主要改變共享邊界，request、mutation 與 stream 的正確性規則大多仍由 application code 維持。
Time: 60 秒。
Talk track:
先把兩種方式的 API 攤開來對比，把兩邊維持非同步正確性的方法逐項對齊。
狀態從 feature refs 進入 store refs，function 也成為具名 action；這兩項改變了共享位置與操作入口。
Click 1：但舊結果仍靠 generation guard，更新成功後仍手動重新載入 list 和 detail，串流也仍需要明確 cleanup。如果剛才 Pure Vue 已經理解這些規則，這裡不需要再學一次。
Click 2：所以精確的講不是「所有 lifecycle 都沒變」。Store 可以活得比 component 久，consumer lifetime 邊界確實不同；但 request、mutation、stream 的語意與正確性規則並沒有因為搬進 Pinia 就自動換一個 owner。
Transition: 後面範例就不重複 generation guard 和 onUnmounted；只看一個真正能證明 Pinia 價值與限制的 update action。
Cut: 直接顯示第二次 click，只念「sharing boundary 改變；correctness rules 大致不變」。
-->

---
layout: default
clicks: 2
---

# 只看一個 Action：update → reload

## Workflow 共享了；資料關係仍由應用程式宣告

<div class="mt-4 grid grid-cols-[1.25fr_0.75fr] gap-6">
<div>
<div class="mb-2 text-xs font-semibold opacity-55">
來源 · <code>src/examples/pinia-action/userDemo.store.ts</code>
</div>

<div class="pinia-code">

```ts
async function updateUser(userId, patch) {
  await api.updateUser({ userId, patch })

  await Promise.all([
    fetchUsers(currentKeyword),
    fetchUserDetail(userId),
  ])
}
```

</div>
</div>

<div class="grid content-start gap-3">
<div class="rounded-xl border border-amber-300 p-3 dark:border-amber-700">
<div class="text-sm font-semibold text-amber-600 dark:text-amber-300">共用工作流程入口</div>
<div class="mt-2 text-sm leading-6 opacity-75">
任何 consumer 更新 user，都能呼叫同一條 action。
</div>
</div>

<div v-click="1" class="rounded-xl border border-blue-300 p-3 dark:border-blue-700">
<div class="text-sm font-semibold text-blue-600 dark:text-blue-300">同步哪些資料？</div>
<div class="mt-2 font-mono text-sm">users list + selected detail</div>
<div class="mt-2 text-sm opacity-65">由這份 action 明確列出</div>
</div>

<div v-click="2" class="rounded-xl border p-3">
<div class="text-sm font-semibold">Pinia 不會自行推導</div>
<div class="mt-2 text-sm leading-6 opacity-70">
server-state identity<br>
invalidation relationship
</div>
</div>
</div>
</div>

<div class="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center text-sm">
<div class="rounded-xl bg-amber-50 p-3 font-semibold dark:bg-amber-950">共享：workflow entry point</div>
<div class="text-2xl opacity-40">≠</div>
<div class="rounded-xl bg-gray-100 p-3 font-semibold dark:bg-gray-800">自動擁有：race · status · reload · cleanup</div>
</div>

<style>
.pinia-code {
  overflow: hidden;
  border-radius: 0.5rem;
}

.pinia-code .slidev-code-wrapper,
.pinia-code .slidev-code {
  margin: 0;
}

.pinia-code .slidev-code {
  padding: 1rem 1.1rem;
  font-size: 14px;
  line-height: 1.55;
}
</style>

<!--
Core: Pinia action 讓 update workflow 有共用入口，但 reload relationship 與其他 async 語意仍由 application implementation 宣告。
Time: 50 秒。
Talk track:
updateUser 現在是整個 application 共用的流程 entry point；不管哪個 consumer 更新 user，都可以走同一條 action。
Click 1：但 update 成功後要同步 users list 和 selected detail，是我們在 Promise.all 裡明確列出的關係。換一個 feature，reload 項目完全可能不同。
Click 2：Pinia 不會把這兩份資料辨識成具有 server-state identity 的 cache，也不會把這段操作理解成失效。這是 Pinia 的本身職責，他沒有要替 application 預設這層語意。
Generation guard、status transition 和 stream cleanup 仍然存在，只是不再重複示範；Pure Vue 章節已經證明它們如何運作。
Transition: 我們可以接著看責任轉移的圖表。
Cut: 只講 action 是共用入口，以及 reload list/detail 仍由 application 決定。
-->

---
layout: default
clicks: 2
---

# Pinia 的 Ownership Delta

## 共享邊界改變；非同步語意大致不變

<div class="mt-5 grid grid-cols-2 gap-5">
  <div class="rounded-2xl border border-amber-300 p-5 dark:border-amber-700">
    <div class="text-sm font-semibold text-amber-600 dark:text-amber-300">移動到 STORE</div>
    <div class="mt-3 grid gap-2 text-center text-sm">
      <div class="rounded-lg bg-amber-50 p-2 dark:bg-amber-950">共用狀態快照</div>
      <div class="rounded-lg bg-amber-50 p-2 dark:bg-amber-950">共用 workflow 與 action 入口</div>
      <div class="rounded-lg bg-amber-50 p-2 dark:bg-amber-950">跨 consumer 的 store identity</div>
    </div>
  </div>

  <div
    class="rounded-2xl border p-5 transition-all"
    :class="$clicks >= 1 ? 'border-blue-300 bg-blue-50 opacity-100 dark:border-blue-700 dark:bg-blue-950' : 'opacity-45'"
  >
    <div class="text-sm font-semibold text-blue-600 dark:text-blue-300">仍由應用程式維持</div>
    <div class="mt-3 grid gap-2 text-center text-sm">
      <div class="rounded-lg border border-blue-200 p-2 dark:border-blue-800">競態與狀態轉換</div>
      <div class="rounded-lg border border-blue-200 p-2 dark:border-blue-800">更新後的重載關係</div>
      <div class="rounded-lg border border-blue-200 p-2 dark:border-blue-800">串流來源與清理時機</div>
    </div>
  </div>
</div>

<div class="mt-3 grid grid-cols-3 gap-2 text-[10px] leading-4">
  <div class="rounded-lg border px-3 py-2"><b>問題範圍</b><br>共用客戶端狀態與流程</div>
  <div class="rounded-lg border px-3 py-2"><b>規則宣告</b><br>store actions＋頁面整合</div>
  <div class="rounded-lg border px-3 py-2"><b>生命週期維持</b><br>Pinia／Vue 響應機制＋應用程式碼</div>
  <div class="rounded-lg border px-3 py-2"><b>Vue 的責任</b><br>路由轉接 · 互動 · 渲染</div>
  <div class="rounded-lg border px-3 py-2"><b>應用程式銜接</b><br>競態 · 重載 · 狀態 · 串流清理</div>
  <div class="rounded-lg border px-3 py-2"><b>成本／非目標</b><br>手動編排 · 不預設 server-state 語意</div>
</div>

<div v-if="$clicks === 0" class="mt-3 rounded-xl bg-amber-50 p-3 text-center text-base font-semibold dark:bg-amber-950">
  移動：共用狀態快照／流程／identity → Store
</div>
<div v-else-if="$clicks === 1" class="mt-3 rounded-xl bg-blue-50 p-3 text-center text-base font-semibold dark:bg-blue-950">
  留下：競態／狀態／重載／串流清理 → Actions＋Vue 頁面
</div>
<div v-else class="mt-3 rounded-xl bg-gray-100 p-3 text-center text-base font-semibold dark:bg-gray-800">
  Composable → Pinia：sharing boundary 改變；async model 大致不變。
</div>

<!--
Core: Pinia 把 shared snapshot、workflow entry 與 store identity 移到具名 Store；async correctness 仍由 application actions 與 Vue page integration 維持。
Time: 40 秒。
Talk track:
最後不重走整張流程圖，因為流程上是相同的，我們只看相較於 composable 的 ownership 變動。
一開始先看左邊：共用 snapshot、workflow entry point 與跨 consumer identity，確實移進具名的 Pinia Store。這是實質的 ownership 移動，不只是換檔案位置。
Click 1：右邊是沒有自動移動的部分。競態、狀態轉換、update 後的 reload relationship，以及 stream cleanup，仍由 actions 和 Vue page integration 維持。
Click 2：所以 Composable 到 Pinia 改變了 sharing boundary，但 async model 大致不變。Pinia 已完整解決 shared application workflow 的問題；它沒有說自己要擁有 server-state lifecycle semantics。
Transition: 如果下一個問題不再只是共享 workflow，而是資料開始具有 identity、freshness、cache 與 invalidation 語意，那才需要問：非同步 lifecycle 本身能不能換一個 owner？
Cut: 只念「移動」與「留下」兩欄，再進 TanStack Query。
-->
