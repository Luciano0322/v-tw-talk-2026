# Vue Async Ownership

這份語彙表固定簡報用來描述 Vue 應用中非同步責任的核心詞彙，避免將資料位置、框架生命週期與非同步工作的生命週期混為一談。

## Language

**Async Ownership**:
一段非同步工作跨時間運行時，觸發、狀態傳播、生命週期正確性、UI 消費與清理責任在系統邊界之間的配置。
_Avoid_: State ownership, single-owner handoff

**Async responsibility**:
Async Ownership 中可被分配的一項責任，例如 trigger、status、stale、invalidate、dispose 或 render。
_Avoid_: Feature ownership, tool capability

**Owner**:
在相關生命週期內，持續維持某項 async responsibility 正確性的責任邊界；同一段非同步工作可以有多個 owner。
_Avoid_: State location, API caller, data holder

**Responsibility map（權責分布圖）**:
將 async responsibilities 對應到 owners、lifetimes 與維持機制的表示方式；用來比較責任配置，不表示工具等級。
_Avoid_: Ownership hierarchy, upgrade path

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

**Snapshot location**:
UI 可讀取的 snapshot 被保存或暴露的位置，例如 component、store、cache 或 graph。
_Avoid_: Owner

**Async policy**:
宣告非同步工作何時開始、重新整理、失效或處理錯誤的規則。
_Avoid_: Lifecycle, state

**Revision（失效版本節點）**:
Graph 中代表某個領域資料關係需要重新驗證的響應式版本節點；它不是資料、快取或 Mutation 結果。
_Avoid_: Cached value, mutation result, manual refetch counter

**Graph-internal ownership（Graph 內部權責）**:
由框架外的 Graph 邊界持續維持 resource 依賴傳播與非同步生命週期；不包含外部輸入來源、領域規則、Graph 實例生命週期或 UI 呈現。
_Avoid_: Total ownership, application ownership
