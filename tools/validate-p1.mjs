import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sectionFiles = [
  'pages/00-intro.md',
  'pages/10-shared-demo.md',
  'pages/20-pure-vue.md',
  'pages/30-pinia.md',
  'pages/40-tanstack-query.md',
  'pages/50-signal-kernel.md',
  'pages/60-comparison.md',
]

const read = path => readFileSync(resolve(repoRoot, path), 'utf8')
const slidesSource = read('slides.md')
const sectionSources = new Map(sectionFiles.map(path => [path, read(path)]))
const deckSource = [slidesSource, ...sectionSources.values()].join('\n')
const visibleDeckSource = deckSource.replace(/<!--[\s\S]*?-->/g, '')
const failures = []

function check(condition, message) {
  if (!condition)
    failures.push(message)
}

const imports = [...slidesSource.matchAll(/^src:\s+\.\/(pages\/[^\r\n]+)$/gm)].map(match => match[1])
check(
  JSON.stringify(imports) === JSON.stringify(sectionFiles),
  `main section 順序錯誤：${imports.join(' -> ')}`,
)

const importedSlideCount = [...sectionSources.values()]
  .reduce((total, source) => total + (source.match(/^---\s*$/gm)?.length ?? 0), 0) / 2
const slideCount = 1 + importedSlideCount
check(slideCount === 35, `投影片應為 35 張，目前為 ${slideCount} 張`)

for (const field of ['Core', 'Time', 'Transition', 'Cut']) {
  const count = deckSource.match(new RegExp(`^${field}:`, 'gm'))?.length ?? 0
  check(count === 35, `${field} notes 應覆蓋 35 張，目前為 ${count} 張`)
}

for (const starterToken of ['Welcome to Slidev', 'Counter.vue', 'Learn More'])
  check(!deckSource.includes(starterToken), `仍殘留 Slidev starter content：${starterToken}`)

for (const officialText of [
  '從 Pinia Action 到 Async Resource：重新思考 Vue 應用中的非同步 Ownership',
  'v-taiwan Meetup #5 · Session 2',
  'Luciano Lee · 2026.08.15',
]) {
  check(slidesSource.includes(officialText), `缺少或誤植官方資訊：${officialText}`)
}

const modelFiles = [
  'pages/20-pure-vue.md',
  'pages/30-pinia.md',
  'pages/40-tanstack-query.md',
  'pages/50-signal-kernel.md',
]
const teachingFields = ['問題範圍', '規則宣告', '生命週期維持', 'Vue 的責任', '應用程式銜接', '成本／非目標']

for (const modelFile of modelFiles) {
  const source = sectionSources.get(modelFile)
  for (const field of teachingFields)
    check(source.includes(field), `${modelFile} 缺少 teaching-contract field：${field}`)
}

const responsibilityEvidence = new Map([
  ['pages/20-pure-vue.md', ['移動程式碼', '留在應用程式程式碼']],
  ['pages/30-pinia.md', ['移動：', '留下：']],
  ['pages/40-tanstack-query.md', ['移動：', '留下：']],
  ['pages/50-signal-kernel.md', ['移動：', '留下：']],
])

for (const [modelFile, evidence] of responsibilityEvidence) {
  const source = sectionSources.get(modelFile)
  for (const phrase of evidence)
    check(source.includes(phrase), `${modelFile} 沒有回答 responsibility ${phrase}`)
}

const ownershipDefinitionPrefix = 'Async Ownership 是一段非同步工作跨時間運行時'
const definitionCount = deckSource.split(ownershipDefinitionPrefix).length - 1
check(definitionCount >= 2, 'Slide 5 與 Slide 34 沒有使用同一套 Async Ownership 定義語彙')

const expectedPlaceholders = ['P1 photo placeholder', 'Live Demo placeholder']
for (const placeholder of expectedPlaceholders)
  check(visibleDeckSource.includes(placeholder), `缺少已登記的公開 placeholder：${placeholder}`)
check(!/\{\{[^}]+\}\}/.test(visibleDeckSource), '公開投影片仍有未替換的 {{template placeholder}}')

const qrAsset = 'public/qr/demo-repository.svg'
check(existsSync(resolve(repoRoot, qrAsset)), `缺少正式 QR 資產：${qrAsset}`)
check(deckSource.includes('/qr/demo-repository.svg'), '投影片沒有引用正式 QR 資產')
check(deckSource.includes('https://github.com/Luciano0322/vue-async-ownership'), '投影片缺少 Demo repo 的可讀 URL')

const timeValues = [...deckSource.matchAll(/^Time:\s+(\d+) 秒/gm)].map(match => Number(match[1]))
const formalSeconds = timeValues.reduce((total, seconds) => total + seconds, 0)
check(timeValues.length === 35, `Time budget 應有 35 筆，目前為 ${timeValues.length} 筆`)
check(
  formalSeconds <= 38 * 60,
  `正式內容時間 ${Math.floor(formalSeconds / 60)}:${String(formalSeconds % 60).padStart(2, '0')}，超過 38:00 上限`,
)

if (failures.length > 0) {
  console.error('P1 acceptance failed:\n')
  for (const failure of failures)
    console.error(`- ${failure}`)
  process.exitCode = 1
}
else {
  console.log(`P1 acceptance passed: ${slideCount} slides, notes ${formalSeconds}s (${Math.floor(formalSeconds / 60)}:${String(formalSeconds % 60).padStart(2, '0')}).`)
}
