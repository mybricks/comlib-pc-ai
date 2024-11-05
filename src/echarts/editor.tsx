import { getAIEditor, getPromteForAll } from './common'

const systemPrompts = `
${require('./line/promote.md').default}
${require('./column/promote.md').default}
${require('./pie/promote.md').default}
${require('./radar/promote.md').default}
${require('./funnel/promote.md').default}
${require('./scatter/promote.md').default}
${require('./sunburst/promote.md').default}
${require('./heatmap/promote.md').default}
${require('./gauge/promote.md').default}
${require('./tree/promote.md').default}
${require('./treemap/promote.md').default}
${require('./sankey/promote.md').default}
${require('./boxplot/promote.md').default}
${require('./candlestick/promote.md').default}
`

export default getAIEditor({ systemPrompts: getPromteForAll({ promte: systemPrompts }) })
