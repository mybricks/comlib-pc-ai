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

export const promtForAll = getPromteForAll({ promte: systemPrompts })


const KnowledgeMap = {
  Pie: require('./pie/promote.md').default,
  Line: require('./line/promote.md').default,
  Bar: require('./column/promote.md').default,
  Boxplot: require('./boxplot/promote.md').default,
  Candlestick: require('./candlestick/promote.md').default,
  Funnel: require('./funnel/promote.md').default,
  Gauge: require('./gauge/promote.md').default,
  Heatmap: require('./heatmap/promote.md').default,
  Radar: require('./radar/promote.md').default,
  Sankey: require('./sankey/promote.md').default,
  Scatter: require('./scatter/promote.md').default,
  Sunburst: require('./sunburst/promote.md').default,
  Tree: require('./tree/promote.md').default,
  Treemap: require('./treemap/promote.md').default
}

export const prompts = require('./common/prompt-summary.md').default;

export const loadKnowledge = (items) => {
  const rtn: any = []
  let libPush = false
  items.forEach(lib => {
    if (lib.from === 'echarts-for-react') {
      if (!libPush) {
        rtn.push({
          from: lib.from,
          item: 'base',
          knowledge: require('./common/promte-base.md').default.replace(/import ReactECharts from 'echarts-for-react'/g, `import { 图表占位 } from 'echarts-for-react'`).replace(/ReactECharts/g, '图表占位'),
        })
        libPush = true;
      }
      if (KnowledgeMap[lib.item]) {
        rtn.push({
          from: lib.from,
          item: lib.item,
          knowledge: KnowledgeMap[lib.item],
        })
      }
    }
  });

  return rtn
}

export default getAIEditor({ systemPrompts: prompts, loadKnowledge })
