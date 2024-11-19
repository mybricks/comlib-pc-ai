import { genAIEditor } from './../utils/ai-code'
import echartsForReact from './../utils/echarts-for-react'

import antdPrompt from './prompts/antd-summary.md'
import echartsPrompt from './prompts/echarts-summary.md'
import { ANTD_KNOWLEDGES_MAP, ECHARTS_KNOWLEDGES_MAP } from './knowledges'

export default {
  '@init': (params) => {
    const { style, data, id, input, output } = params
    style.width = 480
    style.height = 420
  },
  '@resize': {
    options: ['width', 'height'],
  },
  '@ai': genAIEditor({
    prompts: antdPrompt + `\n` + echartsPrompt,
    loadKnowledge: (items) => {
      const rtn: any = []
      items.forEach((now) => {
        const library = now.from || now.lib

        // 加载antd知识
        if (library === 'antd') {
          const knowledge = ANTD_KNOWLEDGES_MAP[now.item.toUpperCase()]
          if (knowledge) {
            rtn.push({
              lib: library,
              item: now.item,
              knowledge,
            })
          }
        }

        // 加载echarts知识
        if (library === 'echarts-for-react') {
          const knowledge = ECHARTS_KNOWLEDGES_MAP[now.item.toLowerCase()]

          // echarts 需要一份 base 的文档
          rtn.push({
            lib: library,
            item: 'base',
            knowledge: ECHARTS_KNOWLEDGES_MAP['base'].replace(/import ReactECharts from 'echarts-for-react'/g, `import { 图表占位 } from 'echarts-for-react'`).replace(/ReactECharts/g, '图表占位'),
          })

          if (knowledge) {
            rtn.push({
              lib: library,
              item: now.item,
              knowledge,
            })
          }
        }
      })

      return rtn
    },
    dependencies: {
      antd: window['antd_5_21_4'],
      'echarts-for-react': echartsForReact,
    },
  }),
  ':slot': {},
}