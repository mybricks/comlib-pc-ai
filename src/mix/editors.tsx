import React from 'react';
import LowcodeView from "./lowcodeView";
import lowcodeViewCss from "./lowcodeView/index.lazy.less";
import context from "./context";
import { ANTD_KNOWLEDGES_MAP } from "./knowledges";

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

export default function (props) {
  if (!props?.data) {
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

  if (data.runtimeJsxConstituency) {
    data.runtimeJsxConstituency.forEach(({ className, component }) => {
      const knowledge: any = ANTD_KNOWLEDGES_MAP[component.toUpperCase()];

      if (knowledge?.editors) {
        Object.entries(knowledge.editors).forEach(([key, value]) => {
          if (key === ":root") {
            focusAreaConfigs[`.${className}`] = value;
          } else {
            focusAreaConfigs[`.${className} ${key}`] = value;
          }
        })
      }
    })
  }

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