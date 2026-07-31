# Vue Async Ownership

這份語彙表固定簡報用來描述 Vue 應用中非同步責任的核心詞彙，避免將資料位置、框架生命週期與非同步工作的生命週期混為一談。

## Language

**Async state**:
一份會隨非同步工作進度而改變的狀態，包含 status、data 與 error 等可觀察資訊。
_Avoid_: Request result, fetched data

**Snapshot**:
UI 在某一個時間點讀到的 async state；它不是另一套獨立的 state。
_Avoid_: State container, cached data

**Vue lifecycle**:
Vue consumer 從 mount、update 到 unmount 的存在期間。
_Avoid_: Async lifecycle

**Async lifecycle**:
Request、stream 或 resource 從 trigger、active 到 settle、refresh 或 dispose 的存在期間。
_Avoid_: Component lifecycle

**Async lifecycle owner**:
持續維持 async lifecycle 正確性的責任邊界，包括 currentness、status、stale 與 cleanup。
_Avoid_: State location, data owner

**Snapshot location**:
UI 可讀取的 snapshot 被保存或暴露的位置，例如 component、store、cache 或 graph。
_Avoid_: Async lifecycle owner

**Async policy**:
宣告非同步工作何時開始、重新整理、失效或處理錯誤的規則。
_Avoid_: Lifecycle, state
