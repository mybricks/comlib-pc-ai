import { getAIEditor, getPromteForAll, ECHARTS_KNOWLEDGES_MAP } from './common'

const systemPrompts = `
${ECHARTS_KNOWLEDGES_MAP.line}
${ECHARTS_KNOWLEDGES_MAP.column}
${ECHARTS_KNOWLEDGES_MAP.pie}
${ECHARTS_KNOWLEDGES_MAP.radar}
${ECHARTS_KNOWLEDGES_MAP.funnel}
${ECHARTS_KNOWLEDGES_MAP.scatter}
${ECHARTS_KNOWLEDGES_MAP.sunburst}
${ECHARTS_KNOWLEDGES_MAP.heatmap}
${ECHARTS_KNOWLEDGES_MAP.gauge}
${ECHARTS_KNOWLEDGES_MAP.tree}
${ECHARTS_KNOWLEDGES_MAP.treemap}
${ECHARTS_KNOWLEDGES_MAP.sankey}
${ECHARTS_KNOWLEDGES_MAP.boxplot}
${ECHARTS_KNOWLEDGES_MAP.candlestick}
`

export const promtForAll = getPromteForAll({ promte: systemPrompts })

export const prompts = require('./common/prompt-summary.md').default;

export const loadKnowledge = (items) => {
  const rtn: any = []
  let libPush = false
  items.forEach(lib => {
    const library = lib.from || lib.lib;
    if (library === 'echarts-for-react') {
      if (!libPush) {
        rtn.push({
          lib: library,
          item: 'base',
          knowledge: ECHARTS_KNOWLEDGES_MAP.base.replace(/import ReactECharts from 'echarts-for-react'/g, `import { 图表占位 } from 'echarts-for-react'`).replace(/ReactECharts/g, '图表占位'),
        })
        libPush = true;
      }
      const knowledge = ECHARTS_KNOWLEDGES_MAP[lib.item.toLowerCase()]
      if (knowledge) {
        rtn.push({
          lib: library,
          item: lib.item,
          knowledge,
        })
      }
    }
  });

  return rtn
}

export default getAIEditor({ systemPrompts: prompts, loadKnowledge })
