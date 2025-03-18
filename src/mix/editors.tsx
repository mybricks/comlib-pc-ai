import {genAIEditor} from './../utils/ai-code'
import echartsForReact from './../utils/echarts-for-react'

import antdPrompt from './prompts/antd-summary.md'
import echartsPrompt from './prompts/echarts-summary.md'
import iconPrompt from "./prompts/icon-summary.md"
//import dndkitPrompt from "./prompts/dndkit-summary.md"
import {ANTD_KNOWLEDGES_MAP, ECHARTS_KNOWLEDGES_MAP, DNDKIT_KNOWLEDGES_MAP} from './knowledges'

// import * as dndCore from "@dnd-kit/core";
// import * as dndModifiers from '@dnd-kit/modifiers';
// import * as dndSortable from '@dnd-kit/sortable';
// import * as dndUtilities from '@dnd-kit/utilities';
import * as antd from "antd";


export default {
  '@init': (params) => {
    const {style, data, id, input, output} = params
    // style.width = 480
    // style.height = 420
  },
  '@resize': {
    options: ['width', 'height'],
  },
  // '@save'({data}) {
  //   const saveData = {}
  //   for (const key in data) {
  //     if (key.startsWith('_')) {//去除中间运行产生的数据
  //       saveData[key] = data[key]
  //     }
  //   }
  //
  //   return saveData
  // },
  '@ai': genAIEditor({
    prompts: iconPrompt + `\n` + antdPrompt + `\n` + echartsPrompt
    //+ `\n` + dndkitPrompt
    ,
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

          if (typeof ECHARTS_KNOWLEDGES_MAP['base']?.docs === 'string') {
            // @ts-ignore
            ECHARTS_KNOWLEDGES_MAP['base']?.docs = ECHARTS_KNOWLEDGES_MAP['base']?.docs.replace(/import ReactECharts from 'echarts-for-react'/g, `import { 图表占位 } from 'echarts-for-react'`).replace(/ReactECharts/g, '图表占位')
          }
          if (typeof ECHARTS_KNOWLEDGES_MAP['base'] === 'string') {
            ECHARTS_KNOWLEDGES_MAP['base'] = ECHARTS_KNOWLEDGES_MAP['base'].replace(/import ReactECharts from 'echarts-for-react'/g, `import { 图表占位 } from 'echarts-for-react'`).replace(/ReactECharts/g, '图表占位')
          }

          // echarts 需要一份 base 的文档
          rtn.push({
            lib: library,
            item: '基础知识',
            knowledge: ECHARTS_KNOWLEDGES_MAP['base'],
          })

          if (knowledge) {
            rtn.push({
              lib: library,
              item: now.item,
              knowledge,
            })
          }
        }

        // if (library.startsWith("@dnd-kit")) {
        //   const knowledge = DNDKIT_KNOWLEDGES_MAP[now.item.toUpperCase()]
        //   if (knowledge) {
        //     rtn.push({
        //       lib: library,
        //       item: now.item,
        //       knowledge,
        //     })
        //   }
        // }
      })

      return rtn
    },
    dependencies: {
      antd,
      'echarts-for-react': echartsForReact,
      // "@dnd-kit/core": dndCore,
      // '@dnd-kit/modifiers': dndModifiers,
      // '@dnd-kit/sortable': dndSortable,
      // '@dnd-kit/utilities': dndUtilities
    },
  }),
  ':slot': {},
}