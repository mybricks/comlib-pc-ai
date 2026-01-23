import React from 'react';
import LowcodeView from "./lowcodeView";
import lowcodeViewCss from "./lowcodeView/index.lazy.less";
import context from "./context";

<<<<<<< HEAD
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
=======
import css from './test.lazy.less'

import LowCodeView from './LowcodeView'
>>>>>>> fb23122 (for lazy.less)

<<<<<<< HEAD
export default function (props) {
  console.log("[@editors - props]", props);
=======
export default {
  '@init': (params) => {
    const { style, data, id, input, output } = params
    // style.width = 480
    // style.height = 420
  },
  '@resize': {
    options: ['width', 'height'],
  },
<<<<<<< HEAD
  // '@save'({ data }) {
  //   console.log("[@save - data]", data);
  
  //   return data
=======
  '@lowcode':{
    render({data},{aiService}){
      return (
        <LowCodeView/>
      )
    },
    useCSS(){
      return [
        css
      ]
    }
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
>>>>>>> fb23122 (for lazy.less)
  // },
  '@ai': genAIEditor({
    prompts: iconPrompt + `\n` + antdPrompt + `\n` + echartsPrompt
    //+ `\n` + dndkitPrompt
    ,
    loadKnowledge: (items) => {
      const rtn: any = []
      items.forEach((now) => {
        const library = now.from || now.lib
>>>>>>> dd8b4ef (for lazy.less)

  if (!props) {
    return {};
  }

  const { data } = props;
  const focusAreaConfigs: any = {};
  try {
    const configs = evalConfigJsCompiled(decodeURIComponent(data.configJsCompiled));

    Object.entries(configs).forEach(([key, value]: any) => {
      const items: any[] = [];
      // [TODO] 样式编辑
      // const style: any[] = [];

      value.items?.forEach((item) => {
        items.push({
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
        })
      })

      focusAreaConfigs[key] = {
        items,
      }

      // value.style?.forEach((item) => {

      // })
    })
  } catch {}

  try {
    const componentConfig = JSON.parse(decodeURIComponent(data.componentConfig));
    if (componentConfig.outputs?.length) {
      const eventsConfig = {
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
      }

      if (!focusAreaConfigs[':root']) {
        focusAreaConfigs[':root'] = {
          items: [eventsConfig]
        }
      } else {
        focusAreaConfigs[':root'].items.push(eventsConfig);
      }
    }
  } catch {}

  return {
    ...focusAreaConfigs,
    /** 可调整宽高 */
    '@resize': {
      options: ['width', 'height'],
    },
    /** 代码编辑器面板 */
   '@lowcode':{
      render(params, plugins){
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
    /** 初始化 */
    // '@init': () => {},
    /** 保存的回调 */
    // '@save'() {},
    /** toJSON的回调 */
    // '@toJSON'(){},
  }
}