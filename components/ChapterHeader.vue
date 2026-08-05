<script setup lang="ts">
const props = withDefaults(defineProps<{
  index: number
  title: string
  question: string
  total?: number
}>(), {
  total: 7,
})

const chapterNumber = String(props.index).padStart(2, '0')
const chapterTotal = String(props.total).padStart(2, '0')
</script>

<template>
  <div
    class="chapter-header"
    :aria-label="`第 ${props.index} 章，共 ${props.total} 章：${props.title}`"
  >
    <div class="chapter-header__number">
      {{ chapterNumber }} <span>/ {{ chapterTotal }}</span>
    </div>
    <div>
      <div class="chapter-header__title">{{ props.title }}</div>
      <div class="chapter-header__question">{{ props.question }}</div>
    </div>
  </div>
</template>

<style scoped>
.chapter-header {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.35rem;
  border-left: 4px solid rgb(96 165 250);
  background: rgb(59 130 246 / 10%);
  padding: 0.42rem 0.75rem;
  color: inherit;
}

.chapter-header__number {
  min-width: 3.25rem;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1;
}

.chapter-header__number span {
  font-size: 0.58rem;
  opacity: 0.55;
}

.chapter-header__title {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.chapter-header__question {
  margin-top: 0.1rem;
  font-size: 0.62rem;
  opacity: 0.72;
}
</style>
