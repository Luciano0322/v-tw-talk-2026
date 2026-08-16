---
theme: default
title: 從 Pinia Action 到 Async Resource：重新思考 Vue 應用中的非同步 Ownership
info: |
  V-Taiwan Meetup #5 · Session 2

  Luciano Lee
lang: zh-TW
drawings:
  persist: false
transition: fade
duration: 40min
layout: cover
class: text-center
---

# 從 Pinia Action 到 Async Resource

## 重新思考 Vue 應用中的非同步 Ownership

<div class="mt-12 opacity-70">
  v-taiwan Meetup #5 · Session 2
</div>

<div class="mt-2 opacity-70">
  Luciano Lee · 2026.08.15
</div>

<!--
Core: 「從 Pinia Action 到 Async Resource」描述的是 problem scope 展開，不是工具升級路線。
Time: 30 秒。
Talk track:
大家好，今天的題目是「從 Pinia Action 到 Async Resource」。
我想先補一個很重要點是：這個「從……到……」不是一定要大家從 Pinia 遷移到另一套工具，也不是之後四種方案的能力排名，沒有要採一捧一的環節。
我們會從 Vue 開發者熟悉的 action 與 composable 出發，把觀察尺度從一次非同步 workflow，逐步拉到 shared workflow、server-state 生命週期，以及跨 resource 的權責關係。
Transition: 在定義 ownership 以前，我先簡短交代自己為什麼會研究這個問題。
Cut: 若現場時間不足，只保留「problem scope 展開，不是工具升級」。
-->

---
src: ./pages/00-intro.md
---

---
src: ./pages/10-shared-demo.md
---

---
src: ./pages/20-pure-vue.md
---

---
src: ./pages/30-pinia.md
---

---
src: ./pages/40-tanstack-query.md
---

---
src: ./pages/50-signal-kernel.md
---

---
src: ./pages/60-comparison.md
---
