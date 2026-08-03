---
layout: default
clicks: 3
---

# 問題不只剩下 shared state

## 遠端資料還有 identity、freshness 與關係

<div class="mt-7 text-center text-2xl font-semibold">
  同一份資料被多人讀取時，還要回答：<span class="text-cyan-600 dark:text-cyan-300">「現在這份還有效嗎？」</span>
</div>

<div class="mt-7 grid grid-cols-3 gap-4">
  <div v-click="1" class="rounded-2xl border border-cyan-300 p-4 dark:border-cyan-700">
    <div class="text-sm font-semibold text-cyan-600 dark:text-cyan-300">IDENTITY</div>
    <div class="mt-2 text-lg font-semibold">這是哪一份遠端資料？</div>
    <div class="mt-3 font-mono text-sm">['users', keyword]</div>
    <div class="mt-2 text-sm opacity-65">來源改變，資料身分也跟著改變。</div>
  </div>

  <div v-click="2" class="rounded-2xl border border-cyan-300 p-4 dark:border-cyan-700">
    <div class="text-sm font-semibold text-cyan-600 dark:text-cyan-300">FRESHNESS</div>
    <div class="mt-2 text-lg font-semibold">cache 裡的資料還新嗎？</div>
    <div class="mt-3 text-sm">pending · stale · refreshing</div>
    <div class="mt-2 text-sm opacity-65">保留 snapshot，同時維持 request currentness。</div>
  </div>

  <div v-click="3" class="rounded-2xl border border-cyan-300 p-4 dark:border-cyan-700">
    <div class="text-sm font-semibold text-cyan-600 dark:text-cyan-300">RELATIONSHIP</div>
    <div class="mt-2 text-lg font-semibold">mutation 影響誰？</div>
    <div class="mt-3 text-sm">users list ↔ selected detail</div>
    <div class="mt-2 text-sm opacity-65">成功後，哪些相關資料需要失效與更新？</div>
  </div>
</div>

<div v-click="3" class="mt-5 rounded-xl bg-cyan-50 p-3 text-center text-lg font-semibold dark:bg-cyan-950">
  Pinia 沒有做錯；是問題範圍從 shared workflow，移到了 server-state lifecycle。
</div>

<!--
Core: TanStack Query 這一幕不是把 Pinia 排成較低階方案，而是把問題範圍從 shared workflow 轉成 server-state identity、freshness 與關係。
Time: 70 秒。
Talk track:
前一幕用 Pinia 把 shared snapshot 和 actions 集中起來，對多人共用的 client workflow 很合理。但當資料來自 server，我們還多了三種問題。
第一個 click 是 identity。users 不只是一個陣列；keyword 不同，就代表不同的遠端資料身分。
第二個 click 是 freshness。cache 可以保留上一份 snapshot，但 runtime 仍要知道 request 是否進行中、資料是否 stale，以及目前顯示的是 pending 還是 refreshing。
第三個 click 是 relationship。更新一位使用者後，users list 和 selected detail 都可能失效。這不是單純把一個 ref 換成另一個 store，而是開始描述遠端資料彼此的關係。
所以我不是要說 Pinia 不適合 async；Pinia 解的是 shared state 與 workflow。現在只是把鏡頭移到 server-state lifecycle，交給專門的 runtime。
Transition: 先把 TanStack Query 接手的邊界畫出來，再看 application 還要宣告什麼。
Cut: 若時間不足，可只點出 identity、freshness、relationship 三詞與最後一句 problem-scope change。
-->

---
layout: default
---

# TanStack Query 接手哪一段？

## Query runtime 管 server state；Vue 仍負責 consumer 與整合

<div class="tanstack-map mt-2">

```mermaid
flowchart LR
  Route["路由 query"] --> Sources["keyword / userId"]
  Sources --> Keys["query keys"]

  subgraph QueryOwner["TanStack Query · server-state lifecycle"]
    Keys --> Query["query lifecycle"]
    Query <--> Cache["query cache"]
    Query <--> API["Users API"]
    Mutation["update mutation"] --> API
    Mutation --> Invalidate["invalidate queries"]
    Invalidate --> Cache
  end

  Query --> Vue["Vue 投影 / render"]
  Sources --> Stream["獨立 stream composable"]
  Stream --> Vue
```

</div>

<div class="mt-3 grid grid-cols-2 gap-4 text-sm">
  <div class="rounded-xl border border-cyan-300 p-3 dark:border-cyan-700">
    <b class="text-cyan-600 dark:text-cyan-300">Query runtime 接手</b>
    <span class="ml-2 opacity-70">status · cancellation · stale result · cache interaction</span>
  </div>
  <div class="rounded-xl border p-3">
    <b>Application 仍宣告</b>
    <span class="ml-2 opacity-70">query function · invalidation meaning · stream bridge</span>
  </div>
</div>

<div class="mt-3 rounded-xl bg-gray-100 p-2 text-center font-semibold dark:bg-gray-800">
  Ownership 是重新分工，不是 application responsibility 消失。
</div>

<style>
.tanstack-map .mermaid {
  display: flex;
  height: 260px;
  align-items: center;
  justify-content: center;
}

.tanstack-map :deep(.mermaid svg) {
  width: auto;
  height: 260px;
  max-width: 100%;
  max-height: 260px;
}
</style>

<!--
Core: Query runtime 接手 query、cache、mutation 與 invalidation 的 lifecycle；route、Vue projection、query function 的 domain 意義與 callback stream bridge 仍由 application 組合。
Time: 90 秒。
Talk track:
從左邊開始。route query 仍然是 keyword 和 userId 的 source，Vue page 負責把它們投影成 query keys。
進到藍色邊界後，TanStack Query runtime 維持 request status、取消訊號、stale result 與 cache interaction；mutation 成功後，也由 runtime 執行 invalidation 對應的 cache lifecycle。
但 runtime 不會猜 API 怎麼呼叫，也不會猜更新一位使用者在 domain 上應該影響哪些 query。query function 與 invalidation meaning 仍是 application 宣告。
右下角的 activity 是 callback-style persistent subscription。在這份 Demo 裡，它用獨立 Vue composable 維持 subscribe、source switch 與 cleanup，然後同樣投影到 Vue。這是刻意的邊界，不是 TanStack Query 的缺陷。
這張圖的重點是 ownership 重新分工：application code 變少，是因為 lifecycle mechanics 移入 runtime；domain meaning 和 framework integration 沒有消失。
Transition: 接著先看 query key，因為 ownership 的第一步是讓 runtime 知道「這是哪一份資料」。
Cut: 可略過 mutation 支線細節，只保留 query key → query/cache → Vue，以及 stream composable 支線。
-->

---
layout: default
clicks: 3
---

# Query key 不只是一串字

## 它同時宣告遠端資料的 identity 與 reactive dependency

<div class="mt-3 grid grid-cols-[1.25fr_0.75fr] gap-6">
  <div>
    <div v-if="$clicks === 0" class="mb-2 text-xs font-semibold opacity-55">
      Curated from <code>useUsersQueryDemo.ts</code>
    </div>
    <div v-else-if="$clicks === 1" class="mb-2 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
      Step 1 · query key 宣告 identity 與 dependency
    </div>
    <div v-else-if="$clicks === 2" class="mb-2 text-xs font-semibold text-blue-600 dark:text-blue-300">
      Step 2 · query function 提供實際 work 與 cancellation signal
    </div>
    <div v-else class="mb-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
      Step 3 · placeholderData 保留前一份 snapshot
    </div>

<div v-if="$clicks === 0" class="tanstack-code">

```ts
const usersQueryKey = computed(
  () => ['users', keyword.value] as const,
)
const usersQuery = useQuery({
  queryKey: usersQueryKey,
  queryFn: ({ queryKey, signal }) =>
    api.fetchUsers({ keyword: queryKey[1], signal }),
  placeholderData: previousData => previousData,
})
```

</div>

<div v-else-if="$clicks === 1" class="tanstack-code tanstack-code-focus tanstack-code-focus-key">

```ts
const usersQueryKey = computed(
  () => ['users', keyword.value] as const,
)
const usersQuery = useQuery({
  queryKey: usersQueryKey,
  queryFn: ({ queryKey, signal }) =>
    api.fetchUsers({ keyword: queryKey[1], signal }),
  placeholderData: previousData => previousData,
})
```

</div>

<div v-else-if="$clicks === 2" class="tanstack-code tanstack-code-focus tanstack-code-focus-function">

```ts
const usersQueryKey = computed(
  () => ['users', keyword.value] as const,
)
const usersQuery = useQuery({
  queryKey: usersQueryKey,
  queryFn: ({ queryKey, signal }) =>
    api.fetchUsers({ keyword: queryKey[1], signal }),
  placeholderData: previousData => previousData,
})
```

</div>

<div v-else class="tanstack-code tanstack-code-focus tanstack-code-focus-placeholder">

```ts
const usersQueryKey = computed(
  () => ['users', keyword.value] as const,
)
const usersQuery = useQuery({
  queryKey: usersQueryKey,
  queryFn: ({ queryKey, signal }) =>
    api.fetchUsers({ keyword: queryKey[1], signal }),
  placeholderData: previousData => previousData,
})
```

</div>
  </div>

  <div class="grid content-center gap-3 text-sm">
    <div class="rounded-xl border p-3" :class="$clicks === 1 ? 'border-cyan-400 bg-cyan-50 dark:border-cyan-600 dark:bg-cyan-950' : ''">
      <div class="font-mono font-semibold text-cyan-600 dark:text-cyan-300">queryKey</div>
      <div class="mt-1 opacity-70">keyword 改變 → identity 改變 → runtime 觀察新 query。</div>
    </div>
    <div class="rounded-xl border p-3" :class="$clicks === 2 ? 'border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-950' : ''">
      <div class="font-mono font-semibold text-blue-600 dark:text-blue-300">queryFn</div>
      <div class="mt-1 opacity-70">Application 定義 work；runtime 提供 cancellation signal。</div>
    </div>
    <div class="rounded-xl border p-3" :class="$clicks >= 3 ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950' : ''">
      <div class="font-mono font-semibold text-emerald-600 dark:text-emerald-300">placeholderData</div>
      <div class="mt-1 opacity-70">保留上一份資料，是 projection policy，不是另一套 state。</div>
    </div>
  </div>
</div>

<div class="mt-4 rounded-xl bg-cyan-50 p-3 text-center font-semibold dark:bg-cyan-950">
  Runtime 能維持 lifecycle，是因為 application 先把 identity 與 work 說清楚。
</div>

<style>
.tanstack-code {
  overflow: hidden;
  border-radius: 0.5rem;
}

.tanstack-code .slidev-code-wrapper,
.tanstack-code .slidev-code {
  margin: 0;
}

.tanstack-code .slidev-code {
  padding: 1rem 1.1rem;
  font-size: 13px;
  line-height: 1.5;
}

.tanstack-code-focus .line {
  opacity: 0.28;
}

.tanstack-code-focus-key .line:nth-child(-n+3),
.tanstack-code-focus-function .line:nth-child(n+6):nth-child(-n+7),
.tanstack-code-focus-placeholder .line:nth-child(8) {
  display: inline-block;
  width: calc(100% + 2.2rem);
  margin-left: -1.1rem;
  padding-left: 1.1rem;
  opacity: 1;
  background: rgba(34, 211, 238, 0.18);
  box-shadow: inset 3px 0 #22d3ee;
}

.tanstack-code-focus-function .line:nth-child(n+6):nth-child(-n+7) {
  background: rgba(59, 130, 246, 0.2);
  box-shadow: inset 3px 0 #60a5fa;
}

.tanstack-code-focus-placeholder .line:nth-child(8) {
  background: rgba(16, 185, 129, 0.18);
  box-shadow: inset 3px 0 #34d399;
}
</style>

<!--
Core: query key 同時表達 server-state identity 與 reactive dependency；runtime 接手 lifecycle mechanics，但 query function 和 placeholder projection 仍由 application 宣告。
Time: 100 秒。
Talk track:
先看完整片段。這是 Demo 真正使用的 users query，不需要手寫 watch、generation guard 或 status transition。
第一個 click 聚焦 usersQueryKey。它不是隨便取的 cache 名稱。users 是資源類型，keyword 是這份遠端資料的 identity dependency；computed 變動後，Vue adapter 讓 Query runtime 觀察新的 key。
第二個 click 聚焦 queryFn。application 仍要定義怎麼呼叫 Users API；runtime 把目前 request 的 AbortSignal 傳進來，因此 source 改變時，取消與舊結果處理不必再由 composable 手寫 generation guard。
第三個 click 聚焦 placeholderData。keyword 改變時可以暫時保留 previousData，畫面把它投影成 refreshing，而不是退回空白 pending。這是 snapshot projection policy，不是另建一份 state。
TanStack Query 幫我們少寫的，不只是 watch，而是 status、cancellation、stale result 和 cache interaction 這整段 lifecycle mechanics。
Transition: Query 描述怎麼讀；下一張 mutation 要描述「寫完之後，哪些遠端資料關係失效」。
Cut: 若時間不足，只講 queryKey 與 queryFn；placeholderData 留一句帶過。
-->

---
layout: default
clicks: 4
---

# Invalidation 是 domain relationship

## Application 指出「誰受影響」；runtime 維持 cache lifecycle

<div class="mt-3 grid grid-cols-[1.25fr_0.75fr] gap-6">
  <div>
    <div v-if="$clicks === 0" class="mb-2 text-xs font-semibold opacity-55">
      先不用記 API；先找出四個責任角色
    </div>
    <div v-else-if="$clicks === 1" class="mb-2 text-xs font-semibold text-violet-600 dark:text-violet-300">
      Step 1 · mutationFn：實際要執行的遠端 work
    </div>
    <div v-else-if="$clicks === 2" class="mb-2 text-xs font-semibold text-amber-600 dark:text-amber-300">
      Step 2 · list key：這次更新影響所有 users variants
    </div>
    <div v-else-if="$clicks === 3" class="mb-2 text-xs font-semibold text-orange-600 dark:text-orange-300">
      Step 3 · detail key：只影響目前 selected user
    </div>
    <div v-else class="mb-2 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
      Step 4 · application 宣告關係；runtime 執行 cache lifecycle
    </div>

<div
  class="tanstack-code tanstack-code-small"
  :class="{
    'tanstack-code-focus tanstack-code-focus-mutation': $clicks === 1,
    'tanstack-code-focus tanstack-code-focus-list': $clicks === 2,
    'tanstack-code-focus tanstack-code-focus-detail': $clicks === 3,
    'tanstack-code-focus tanstack-code-focus-runtime': $clicks >= 4,
  }"
>

```ts
const updateMutation = useMutation({
  mutationFn: params => api.updateUser(params),
  onSuccess: async () => {
    const invalidations = [
      queryClient.invalidateQueries({ queryKey: ['users'] }),
    ]

    if (userId.value !== null) {
      invalidations.push(queryClient.invalidateQueries({
        queryKey: ['user', userId.value],
      }))
    }

    await Promise.all(invalidations)
  },
})
```

</div>
  </div>

  <div class="grid min-h-[315px] content-center">
    <div v-if="$clicks === 0" class="grid grid-cols-2 gap-3 text-center text-sm">
      <div class="rounded-xl border p-3"><b>1 · Work</b><br><code>mutationFn</code></div>
      <div class="rounded-xl border p-3"><b>2 · Timing</b><br><code>onSuccess</code></div>
      <div class="rounded-xl border p-3"><b>3 · Relationship</b><br><code>queryKey</code></div>
      <div class="rounded-xl border p-3"><b>4 · Handoff</b><br><code>invalidateQueries</code></div>
      <div class="col-span-2 mt-2 rounded-xl bg-gray-100 p-3 text-base font-semibold dark:bg-gray-800">
        先認角色，再讀語法。
      </div>
    </div>
    <div v-else-if="$clicks === 1" class="rounded-2xl border border-violet-300 p-5 dark:border-violet-700">
      <div class="text-sm font-semibold text-violet-600 dark:text-violet-300">MUTATION WORK</div>
      <div class="mt-3 text-xl font-semibold">怎麼寫入遠端資料？</div>
      <div class="mt-4 rounded-xl bg-violet-50 p-3 font-mono text-sm dark:bg-violet-950">
        params → api.updateUser(params)
      </div>
      <div class="mt-3 text-sm opacity-70">Query runtime 維持 mutation status；API work 仍由 application 提供。</div>
    </div>
    <div v-else-if="$clicks === 2" class="rounded-2xl border border-amber-300 p-5 dark:border-amber-700">
      <div class="text-sm font-semibold text-amber-600 dark:text-amber-300">LIST RELATIONSHIP</div>
      <div class="mt-3 text-xl font-semibold">所有 users list 都可能過期</div>
      <div class="mt-4 rounded-xl bg-amber-50 p-3 font-mono text-base dark:bg-amber-950">['users']</div>
      <div class="mt-3 text-sm opacity-70">Prefix key 會比對不同 keyword 的 users query variants。</div>
    </div>
    <div v-else-if="$clicks === 3" class="rounded-2xl border border-orange-300 p-5 dark:border-orange-700">
      <div class="text-sm font-semibold text-orange-600 dark:text-orange-300">DETAIL RELATIONSHIP</div>
      <div class="mt-3 text-xl font-semibold">目前 detail 也可能過期</div>
      <div class="mt-4 rounded-xl bg-orange-50 p-3 font-mono text-base dark:bg-orange-950">['user', userId]</div>
      <div class="mt-3 text-sm opacity-70">只有存在 selected user 時，才宣告這條精確關係。</div>
    </div>
    <div v-else class="grid gap-3">
      <div class="rounded-2xl border border-amber-300 p-4 dark:border-amber-700">
        <div class="text-sm font-semibold text-amber-600 dark:text-amber-300">APPLICATION 決定</div>
        <div class="mt-2 text-sm"><code>['users']</code> 與 <code>['user', userId]</code> 是受影響的 domain relationships</div>
      </div>
      <div class="text-center text-2xl opacity-40">↓</div>
      <div class="rounded-2xl border border-cyan-300 p-4 dark:border-cyan-700">
        <div class="text-sm font-semibold text-cyan-600 dark:text-cyan-300">QUERY RUNTIME 維持</div>
        <div class="mt-2 text-sm">比對 cache entries → 標記 stale → active query refetch</div>
      </div>
    </div>
  </div>
</div>

<div v-if="$clicks < 4" class="mt-3 rounded-xl bg-gray-100 p-3 text-center text-lg font-semibold dark:bg-gray-800">
  Invalidation 的語法不重要；先看懂 mutation 與 server state 的關係。
</div>
<div v-else class="mt-3 rounded-xl bg-amber-50 p-3 text-center text-lg font-semibold dark:bg-amber-950">
  Invalidation 移走了 cache mechanics，沒有移走 application 的 domain knowledge。
</div>

<style>
.tanstack-code {
  overflow: hidden;
  border-radius: 0.5rem;
}

.tanstack-code .slidev-code-wrapper,
.tanstack-code .slidev-code {
  margin: 0;
}

.tanstack-code .slidev-code {
  padding: 0.85rem 1rem;
  font-size: 11px;
  line-height: 1.35;
}

.tanstack-code-focus .line {
  opacity: 0.25;
}

.tanstack-code-focus-mutation .line:nth-child(-n+2),
.tanstack-code-focus-list .line:nth-child(n+3):nth-child(-n+6),
.tanstack-code-focus-detail .line:nth-child(n+8):nth-child(-n+12),
.tanstack-code-focus-runtime .line:nth-child(14) {
  display: inline-block;
  width: calc(100% + 2rem);
  margin-left: -1rem;
  padding-left: 1rem;
  opacity: 1;
  background: rgba(139, 92, 246, 0.2);
  box-shadow: inset 3px 0 #a78bfa;
}

.tanstack-code-focus-list .line:nth-child(n+3):nth-child(-n+6) {
  background: rgba(245, 158, 11, 0.18);
  box-shadow: inset 3px 0 #fbbf24;
}

.tanstack-code-focus-detail .line:nth-child(n+8):nth-child(-n+12) {
  background: rgba(249, 115, 22, 0.18);
  box-shadow: inset 3px 0 #fb923c;
}

.tanstack-code-focus-runtime .line:nth-child(14) {
  background: rgba(34, 211, 238, 0.18);
  box-shadow: inset 3px 0 #22d3ee;
}
</style>

<!--
Core: 先把 unfamiliar TanStack Query syntax 拆成 mutation work、success timing、list/detail relationships 與 runtime handoff；application 用 query keys 宣告受影響的 domain relationship，Query runtime 執行 matching、stale marking 與 active refetch。
Time: 100 秒。
Talk track:
如果你沒用過 TanStack Query，先不要逐字讀 API。初始畫面只找四個角色：mutationFn 是 work，onSuccess 是 timing，queryKey 描述 relationship，invalidateQueries 把後續 lifecycle 交給 runtime。
第一個 click 聚焦 mutationFn。Application 仍然提供 api.updateUser；Query runtime 接手 mutation 的 pending、success 與 error status，但不會替我們猜實際 work。
第二個 click 聚焦 ['users']。這個 prefix key 表達所有 keyword 對應的 users list variants 都可能因更新而過期。
第三個 click 聚焦 ['user', userId]。只有目前存在 selected user 時，才把這個精確 detail relationship 加進 invalidations。
第四個 click 聚焦 Promise.all。到這裡 application 已經說完「誰受影響」；runtime 接著比對 cache entries、標記 stale，並讓 active queries refetch。Promise.all 只是讓 mutation 的 success workflow 等這些 invalidations 完成。
這個 domain relationship 不可能由 generic runtime 自己猜出來。所以 invalidation 不是「不用思考更新後要做什麼」，而是把「誰受影響」和「如何維持 cache correctness」分成兩個 owner。
Transition: 最後把 callback stream 放回圖裡，確認這份 architecture 的完整邊界與成本。
Cut: 若時間不足，略過初始四角色與 Promise.all，只保留 mutationFn、兩個 query keys，以及 application/runtime 分工。
-->

---
layout: default
clicks: 2
---

# 完整的 server state，分散的關係圖

## Query + Vue 已完整；但 cross-resource tracing 還沒有共同模型

<div class="mt-2 min-h-[170px]">
  <div v-if="$clicks === 0" class="grid grid-cols-2 gap-4 text-sm">
    <div class="rounded-2xl border border-cyan-300 p-2 dark:border-cyan-700">
      <div class="font-semibold text-cyan-600 dark:text-cyan-300">TANSTACK QUERY RUNTIME</div>
      <div class="mt-2 grid grid-cols-2 gap-2">
        <div class="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950">request lifecycle</div>
        <div class="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950">cache identity</div>
        <div class="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950">mutation status</div>
        <div class="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950">invalidation / refetch</div>
      </div>
    </div>
    <div class="rounded-2xl border border-blue-300 p-2 dark:border-blue-700">
      <div class="font-semibold text-blue-600 dark:text-blue-300">VUE STREAM COMPOSABLE</div>
      <div class="mt-2 grid grid-cols-2 gap-2">
        <div class="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">callback subscription</div>
        <div class="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">event accumulation</div>
        <div class="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">source-switch cleanup</div>
        <div class="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">error projection</div>
      </div>
    </div>
  </div>
  <div v-else-if="$clicks === 1" class="grid grid-cols-2 gap-3 text-sm">
    <div class="rounded-xl border p-2"><b>Route → Query</b><br><span class="opacity-65">source 與 query keys 在 page / options 銜接</span></div>
    <div class="rounded-xl border p-2"><b>Mutation → Queries</b><br><span class="opacity-65">受影響 targets 寫在 onSuccess</span></div>
    <div class="rounded-xl border p-2"><b>Selected user → Detail + Stream</b><br><span class="opacity-65">同一 source 連到 query 與另一個 composable</span></div>
    <div class="rounded-xl border p-2"><b>Stream → Vue scope</b><br><span class="opacity-65">source switch 與 cleanup 由 watch / scope 維持</span></div>
    <div class="col-span-2 rounded-xl bg-amber-50 p-2 text-center text-base font-semibold dark:bg-amber-950">
      每一段都正確；但 tracing 必須跨 page、query options 與 stream composable。
    </div>
  </div>
  <div v-else class="grid grid-cols-2 gap-3 text-[13px] leading-tight">
    <div class="rounded-xl border border-cyan-300 p-2 dark:border-cyan-700">
      <div class="font-semibold text-cyan-600 dark:text-cyan-300">TANSTACK QUERY 的完整範圍</div>
      <div class="mt-1 text-base font-semibold">Server-state lifecycle</div>
      <div class="mt-1 opacity-70">identity · cache · mutation · invalidation · refetch</div>
      <div class="mt-1 rounded-lg bg-cyan-50 p-1 text-center text-xs dark:bg-cyan-950">成熟且專門；signal-kernel 不取代這項優勢</div>
    </div>
    <div class="rounded-xl border border-emerald-300 p-2 dark:border-emerald-700">
      <div class="font-semibold text-emerald-600 dark:text-emerald-300">SIGNAL-KERNEL 補的範圍</div>
      <div class="mt-1 text-base font-semibold">Cross-resource relationship model</div>
      <div class="mt-1 opacity-70">route source · request · mutation · stream · derived snapshot</div>
      <div class="mt-1 rounded-lg bg-emerald-50 p-1 text-center text-xs dark:bg-emerald-950">在進入 Vue 前，先成為同一張可追蹤的 graph</div>
    </div>
  </div>
</div>

<div v-if="$clicks === 0" class="mt-2 grid grid-cols-6 gap-2 text-[9px] leading-3">
  <div class="rounded-lg border px-2 py-2"><b>問題範圍</b><br>server state + stream</div>
  <div class="rounded-lg border px-2 py-2"><b>Policy</b><br>options + composable</div>
  <div class="rounded-lg border px-2 py-2"><b>Lifecycle owner</b><br>Query runtime + Vue</div>
  <div class="rounded-lg border px-2 py-2"><b>Vue 仍負責</b><br>source + projection + render</div>
  <div class="rounded-lg border px-2 py-2"><b>Application glue</b><br>fn + invalidation + bridge</div>
  <div class="rounded-lg border px-2 py-2"><b>成本 / 非目標</b><br>query/cache model</div>
</div>
<div v-else-if="$clicks === 1" class="mt-2 grid grid-cols-3 gap-2 text-xs">
  <div class="rounded-lg border px-3 py-2"><b>Location</b><br>page · options · composable</div>
  <div class="rounded-lg border px-3 py-2"><b>Policy</b><br>每個 boundary 各自正確</div>
  <div class="rounded-lg border px-3 py-2"><b>Tracing cost</b><br>跨檔案重建完整關係</div>
</div>
<div v-else class="mt-1 grid grid-cols-3 gap-2 text-[10px] leading-3">
  <div class="rounded-lg border px-3 py-1"><b>Server-state maturity</b> · TanStack Query</div>
  <div class="rounded-lg border px-3 py-1"><b>Relationship visibility</b> · signal-kernel graph</div>
  <div class="rounded-lg border px-3 py-1"><b>Graph cost</b> · vocabulary · runtime · adapter</div>
</div>

<div v-if="$clicks === 0" class="mt-2 rounded-xl bg-emerald-50 p-2 text-center text-lg font-semibold dark:bg-emerald-950">
  Query + Vue composable，是這份 Demo 完整且有效的 architecture。
</div>
<div v-else-if="$clicks === 1" class="mt-2 rounded-xl bg-amber-50 p-2 text-center text-lg font-semibold dark:bg-amber-950">
  尚未解決的不是 cache；是 cross-resource relationships 沒有一等表示。
</div>
<div v-else class="mt-1 rounded-xl bg-emerald-50 p-1 text-center text-base font-semibold dark:bg-emerald-950">
  signal-kernel 比較完整的是 relationship model；不是全面的 server-state capability。
</div>

<!--
Core: Query + Vue composable 已完整處理 Demo 的 server state 與 callback stream；仍然隱含的是跨 page、query options 與 stream composable 的 cross-resource relationships。signal-kernel 比較完整的是 relationship model，不是全面的 server-state capability。
Time: 100 秒。
Talk track:
第一幕先把結論說完整：Query runtime 維持 request、cache、mutation 與 invalidation；Vue stream composable 維持 callback subscription、event accumulation、source switch 與 cleanup。兩個 owner 協作，已是這份 Demo 完整且有效的 architecture。
第一個 click 再問「那還缺什麼」。Route 到 query keys、mutation 到 invalidation targets、selected user 同時連到 detail 和 stream、stream cleanup 連到 Vue scope；每段都正確，但 relationships 分散在 page、query options 與 stream composable。要理解一次 source change 的完整影響，tracing 仍要跨多個 boundary。
所以尚未解決的不是 cache，也不是 TanStack Query 不會處理 async；而是 cross-resource relationships 沒有一個一等、共同的表示方式。
第二個 click 才比較兩個 scope。TanStack Query 在 server-state lifecycle 上成熟且專門，signal-kernel 不取代 identity、cache、mutation、invalidation 與 refetch 的生態優勢。signal-kernel 的提案是：把 route source、request、mutation、stream 與 derived snapshot 的關係，在進入 Vue consumer 前先放進同一張 graph。
因此我可以說 signal-kernel 的 relationship model 對這個 problem scope 比較完整；不能說它全面比 TanStack Query 完整。代價仍是 graph vocabulary、runtime、adapter、debugging 與 maturity。
初始畫面保留六個 responsibility fields；後兩幕只留下與 tracing、scope 對比直接相關的欄位，避免結論被 footer 稀釋。
Transition: 下一幕先不看 API；先看 cross-resource relationship 這個新 problem scope 長什麼樣。
Cut: 若時間不足，保留第一幕的完整方案與第二個 click 的兩欄 scope 對比；第一個 click 的四條 tracing 可口頭濃縮成一句。
-->
