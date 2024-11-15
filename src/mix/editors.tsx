import { genAIEditor } from './../utils/ai-code'
import echartsForReact from './../utils/echarts-for-react'

import { loadKnowledge as loadChartsKnowledge, prompts as chartsPrompts } from './../echarts/editor'
import { loadKnowledge as loadAntdKnowledge, prompts as antdPrompts } from './../antd/editors/editor-ai'

const prompts = antdPrompts + `\n` + chartsPrompts;

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
    prompts,
    loadKnowledge: (items) => {
      const chart_rtns = loadChartsKnowledge(items);
      const antd_rtns = loadAntdKnowledge(items);
      return chart_rtns.concat(antd_rtns)
    },
    dependencies: {
      antd: window['antd_5_21_4'],
      'echarts-for-react': echartsForReact,
    }
  }),
  ':slot': {},
}