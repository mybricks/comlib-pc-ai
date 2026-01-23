import React from 'react';
import { genAIEditor } from './../utils/ai-code'
import echartsForReact from './../utils/echarts-for-react'

import antdPrompt from './prompts/antd-summary.md'
import echartsPrompt from './prompts/echarts-summary.md'
import iconPrompt from "./prompts/icon-summary.md"
//import dndkitPrompt from "./prompts/dndkit-summary.md"
import { ANTD_KNOWLEDGES_MAP, ECHARTS_KNOWLEDGES_MAP, DNDKIT_KNOWLEDGES_MAP } from './knowledges'
import { updateRender, updateStyle } from '../utils/ai-code/transform-umd'

// import * as dndCore from "@dnd-kit/core";
// import * as dndModifiers from '@dnd-kit/modifiers';
// import * as dndSortable from '@dnd-kit/sortable';
// import * as dndUtilities from '@dnd-kit/utilities';
import * as antd from "antd";
import LowcodeView from "./lowcodeView";
import lowcodeViewCss from "./lowcodeView/index.lazy.less";
import context from "./context";

export default {
  '@init': (params) => {
    const { style, data, id, input, output } = params
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

          // @ts-ignore
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
  ':root': {
    items({ data, env, id, input, output }, ...catalog) {
      console.log("[items - data]", data)

      // TODO: 临时代码
      if (!data.configs) {
        data.configs = []
      }
      if (!data.config) {
        data.config = {}
      }

      const items0 = data.configs.filter((config) => {
        return config.type !== "style"
      }).map(({ type, title, fieldName }) => {
        return {
          title,
          type,
          value: {
            get({ data }) {
              return data.config[fieldName];
            },
            set({ data }, value) {
              data.config[fieldName] = value;
            }
          }
        }
      })

      if (data.outputs) {
        items0.push({
          title: "事件",
          items: data.outputs.map(({ id, title }) => {
            return {
              title,
              type: '_Event',
              options: {
                outputId: id
              }
            }
          })
        })
      }

      items0.push({
        title: 'React',
        type: 'code',
        options: {
          title: '编辑自定义JSX',
          language: 'typescript',
          width: 600,
          minimap: {
            enabled: false
          },
          eslint: {
            parserOptions: {
              ecmaVersion: '2020',
              sourceType: 'module'
            }
          },
          babel: false,
          autoSave: false,
          preview: false,
          extraLib: data.extraLib,
          isTsx: true
        },
        value: {
          get({ data }) {
            return data._sourceRenderCode;
          },
          set({ data }, value) {
             data._sourceRenderCode = value;
             updateRender({ data }, decodeURIComponent(value))
          }
        }
      },
        {
          title: 'Less',
          type: 'code',
          options: {
            title: 'Less',
            language: 'less',
            width: 600,
            minimap: {
              enabled: false
            },
            autoSave: false,
            preview: false
          },
          value: {
            get({ data }) {
              return data._sourceStyleCode;
            },
            set({ data }, value) {
              data._sourceStyleCode = value;
              updateStyle({ data }, decodeURIComponent(value)
            )
            }
          }
        },)

      catalog[0].title = '常规';
      catalog[0].items = items0;
    },
    style({ data }) {
      return data.configs.filter((config) => {
        return config.type === "style"
      }).map(({ title, option }) => {
        return {
          title,
          ...option
        }
      })
    }
  },
 '@lowcode':{
    render(params, plugins){
      context.plugins = plugins;
      context.createVibeCodingAgent({ register: plugins.aiService.registerAgent })

      return (
        <LowcodeView {...params}/>
      )
    },
    useCSS(){
      return [
        lowcodeViewCss
      ]
    }
  },
  // "[data-loc]": {
  //   items(props, catalog0) {
  //     console.log("items - props", props);

  //     const { cn } = JSON.parse(props.focusArea.dataset.loc);

  //     const items0 = props.data.configs.filter((config) => {
  //       return config.type !== "style" && config.selector === `.${cn}`
  //     }).map(({ type, title, fieldName }) => {
  //       return {
  //         title,
  //         type,
  //         value: {
  //           get({ data }) {
  //             return data.config[fieldName];
  //           },
  //           set({ data }, value) {
  //             data.config[fieldName] = value;
  //           }
  //         }
  //       }
  //     })

  //     catalog0.title = '常规';
  //     catalog0.items = items0;
  //   },
  //   style(props) {
  //     console.log("style - props", props);
  //     const { cn } = JSON.parse(props.focusArea.dataset.loc);
  //     console.log(1, props.data.configs.filter((config) => {
  //       return config.type === "style" && config.selector === `.${cn}`
  //     }).map(({ title, option }) => {
  //       return {
  //         title,
  //         ...option
  //       }
  //     }))
  //     return props.data.configs.filter((config) => {
  //       return config.type === "style" && config.selector === `.${cn}`
  //     }).map(({ title, option }) => {
  //       return {
  //         title,
  //         ...option
  //       }
  //     })
  //   }
  // }
}