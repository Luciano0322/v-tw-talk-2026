import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const talkRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const demoRoot = resolve(talkRoot, '..', 'vue-async-ownership')
const failures = []

const read = path => readFileSync(path, 'utf8')
const check = (condition, message) => {
  if (!condition)
    failures.push(message)
}

const codeSources = [
  {
    model: 'Pure Vue',
    page: 'pages/20-pure-vue.md',
    sources: [
      {
        path: 'src/examples/vue-baseline/useVueUsersDemo.ts',
        anchors: ['++latestRequestGeneration', 'requestGeneration === latestRequestGeneration'],
      },
    ],
  },
  {
    model: 'Pinia',
    page: 'pages/30-pinia.md',
    sources: [
      {
        path: 'src/examples/pinia-action/userDemo.store.ts',
        anchors: ['fetchUsers(currentKeyword)', 'requestGeneration === latestUsersRequestGeneration'],
      },
      {
        path: 'src/examples/pinia-action/PiniaActionPage.vue',
        anchors: ['store.subscribeActivity(currentUserId)', 'onUnmounted(() => store.unsubscribeActivity())'],
      },
    ],
  },
  {
    model: 'TanStack Query',
    page: 'pages/40-tanstack-query.md',
    sources: [
      {
        path: 'src/examples/tanstack-query/useUsersQueryDemo.ts',
        anchors: ['queryKey: usersQueryKey', 'queryClient.invalidateQueries({'],
      },
    ],
  },
  {
    model: 'signal-kernel',
    page: 'pages/50-signal-kernel.md',
    sources: [
      {
        path: 'src/examples/signal-kernel/usersGraph.ts',
        anchors: ['observe: usersRevision.get', 'userRevision.target(input.userId)'],
      },
    ],
  },
]

for (const model of codeSources) {
  const pagePath = resolve(talkRoot, model.page)
  const pageSource = read(pagePath)

  for (const sourceContract of model.sources) {
    const sourcePath = resolve(demoRoot, sourceContract.path)
    check(existsSync(sourcePath), `${model.model} canonical source 不存在：${sourceContract.path}`)

    if (!existsSync(sourcePath))
      continue

    const canonicalSource = read(sourcePath)
    check(pageSource.includes(sourceContract.path), `${model.model} 投影片沒有顯示完整來源：${sourceContract.path}`)

    for (const anchor of sourceContract.anchors) {
      check(canonicalSource.includes(anchor), `${model.model} canonical source 缺少錨點：${anchor}`)
      check(pageSource.includes(anchor), `${model.model} curated excerpt 缺少錨點：${anchor}`)
    }
  }
}

const codeResponsibilityContracts = [
  {
    model: 'Pure Vue',
    page: 'pages/20-pure-vue.md',
    statements: [
      '規則宣告：watch trigger／status／generation',
      '維持機制：Vue watch scope＋generation guard',
      '省略的銜接：detail／mutation／stream',
    ],
  },
  {
    model: 'Pinia update',
    page: 'pages/30-pinia.md',
    statements: [
      '規則宣告：update → reload targets',
      '維持機制：Pinia action',
      '省略的銜接：route adaptation／API error mapping',
    ],
  },
  {
    model: 'Pinia currentness',
    page: 'pages/30-pinia.md',
    statements: [
      '規則宣告：currentness／stream cleanup',
      '維持機制：generation guard＋Vue onUnmounted',
      '省略的銜接：store setup／component rendering',
    ],
  },
  {
    model: 'TanStack Query read',
    page: 'pages/40-tanstack-query.md',
    statements: [
      '規則宣告：queryKey／queryFn／placeholderData',
      '維持機制：Query runtime＋Vue Query adapter',
      '省略的銜接：route input／view projection／stream',
    ],
  },
  {
    model: 'TanStack Query write',
    page: 'pages/40-tanstack-query.md',
    statements: [
      '規則宣告：mutationFn＋affected query keys',
      '維持機制：Mutation／Query cache lifecycle',
      '省略的銜接：route userId／UI status projection',
    ],
  },
  {
    model: 'signal-kernel',
    page: 'pages/50-signal-kernel.md',
    statements: [
      '規則宣告：observe＋invalidates',
      '維持機制：Resource runtime＋Graph dependencies',
      '省略的銜接：Vue adapter／Graph owner teardown',
    ],
  },
]

for (const contract of codeResponsibilityContracts) {
  const pageSource = read(resolve(talkRoot, contract.page))

  for (const statement of contract.statements)
    check(pageSource.includes(statement), `${contract.model} code contract 缺少：${statement}`)
}

const teachingFields = ['問題範圍', '規則宣告', '生命週期維持', 'Vue 的責任', '應用程式銜接', '成本／非目標']

for (const model of codeSources) {
  const pageSource = read(resolve(talkRoot, model.page))

  for (const field of teachingFields)
    check(pageSource.includes(field), `${model.model} responsibility map 缺少：${field}`)
}

const comparisonSource = read(resolve(talkRoot, 'pages/60-comparison.md'))
for (const modelName of ['Pure Vue', 'Pinia', 'TanStack Query', 'signal-kernel'])
  check(comparisonSource.includes(modelName), `四模型 comparison 缺少：${modelName}`)
check(
  comparisonSource.includes('不同問題範圍，用不同成本換取不同程度的清晰度。'),
  '四模型 comparison 缺少 problem-scope／cost 的中立結論',
)
check(
  !comparisonSource.includes('Pure Vue → Pinia → TanStack Query → signal-kernel'),
  '四模型 comparison 不可使用工具升級路線',
)

if (failures.length > 0) {
  console.error('P2 acceptance failed:\n')
  for (const failure of failures)
    console.error(`- ${failure}`)
  process.exitCode = 1
}
else {
  console.log('P2 acceptance passed: 4 maps, 5 canonical source files, 6 code contracts, 1 comparison.')
}
