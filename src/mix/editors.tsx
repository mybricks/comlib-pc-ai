import React from 'react';
import { genAIEditor } from './../utils/ai-code'
import echartsForReact from './../utils/echarts-for-react'

import antdPrompt from './prompts/antd-summary.md'
import echartsPrompt from './prompts/echarts-summary.md'
import iconPrompt from "./prompts/icon-summary.md"
import { ANTD_KNOWLEDGES_MAP, ECHARTS_KNOWLEDGES_MAP } from './knowledges'

import * as antd from "antd";
import LowcodeView from "./lowcodeView";
import lowcodeViewCss from "./lowcodeView/index.lazy.less";
import context from "./context";

function evalConfigJsCompiled(code: string) {
  const evalStr = `
    let result;
    ${code.replace('export default', 'result =')};
    result; // 最后一行返回结果
  `;
  
  try {
    return eval(evalStr);
  } catch (error) {
    console.error('eval执行失败：', error);
    return null;
  }
}

function detectJsonIndent(jsonStr: string): string | number {
  const match = jsonStr.match(/\n([ \t]+)/);
  if (match) return match[1];
  return 2;
}

export default {
  '@init': (params) => {
    const { style, data, id, input, output } = params
    // style.width = 480
    // style.height = 420
  },
  '@resize': {
    options: ['width', 'height'],
  },
  // '@save'({ data }) {
  //   console.log("[@save - data]", data);
  
  //   return data
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
    items({ data  }, ...catalog) {
      const items0: any[] = [];
      let componentConfig: any = {};

      try {
        componentConfig = JSON.parse(decodeURIComponent(data.componentConfig));
      } catch {}

      let configs = {};

      try {
        configs = evalConfigJsCompiled(decodeURIComponent(data.configJsCompiled));
        const rootConfig = configs[':root'];
        items0.push(...rootConfig.items.map((item) => {
          return {
            ...item,
            value: {
              get({ data }) {
                return item.value.get({ data: JSON.parse(decodeURIComponent(data.modelConfig)) });
              },
              set({ data }, value) {
                const rawConfig = decodeURIComponent(data.modelConfig);
                const model = JSON.parse(rawConfig);
                item.value.set({ data: model }, value);
                data.modelConfig = encodeURIComponent(JSON.stringify(model, null, detectJsonIndent(rawConfig)));
              }
            }
          }
        }))
      } catch {}

      if (componentConfig.outputs?.length) {
        items0.push({
          title: "事件",
          items: componentConfig.outputs.map(({ id, title }) => {
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


      catalog[0].title = '常规';
      catalog[0].items = items0;
    },
    // style({ data }) {
    //   return data.configs.filter((config) => {
    //     return config.type === "style"
    //   }).map(({ title, option }) => {
    //     return {
    //       title,
    //       ...option
    //     }
    //   })
    // }
  },
 '@lowcode':{
    render(params, plugins){
      console.log("[@lowcode - render - params]", params);
      context.setAiComParams(params.model.runtime.id, params);
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
  // '@toJSON'({ data, scenes }){
  //   console.log("@toJSON: ", data)
  //   return {
  //     data
  //   }
  // },
}