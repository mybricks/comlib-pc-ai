import React from 'react';
import LowcodeView from "./lowcodeView";
import lowcodeViewCss from "./lowcodeView/index.lazy.less";
import context from "./context";
import { ANTD_KNOWLEDGES_MAP } from "./knowledges";
import { parseLess, stringifyLess } from "./utils/transform/less";
import { deepClone } from "./utils/normal";
import { MYBRICKS_KNOWLEDGES_MAP, HTML_KNOWLEDGES_MAP } from "./context/constants";

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
        ...value,
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
    data.runtimeJsxConstituency.forEach(({ className, component, source }) => {
      if (typeof className === 'string') {
        // [TODO] 兼容，后续去除
        className = [className]
      }
      let knowledge: any = null;

      if (source === "antd") {
        knowledge = ANTD_KNOWLEDGES_MAP[component.toUpperCase()];
      } else if (source === "mybricks") {
        knowledge = MYBRICKS_KNOWLEDGES_MAP[component.toUpperCase()];
      } else if (source === "html") {
        knowledge = HTML_KNOWLEDGES_MAP[component.toUpperCase()];
      }

      if (knowledge?.editors) {
        Object.entries(knowledge.editors).forEach(([key, oriValue]: any) => {
          const value = deepClone(oriValue);
          if (value.style?.length) {
            value.style.forEach((style) => {
              const styleItems: any[] = style.items;
              const items: any = [];
              styleItems?.forEach((item) => {
                if (item.type === '_resizer') {
                  let cssObj = {};
                  let cssObjKey = ""
                  items.push({
                    ...item,
                    value: {
                      get() {
                        console.log("[@_resizer -get]");
                      },
                      set(params, value, status) {
                        if (status.state === 'start') {
                          let { cn } = JSON.parse(params.focusArea.dataset.loc);
                          if (typeof cn === 'string') {
                            // [TODO] 兼容，后续去除
                            cn = [cn]
                          }
                          cn = cn[0]
                          const aiComParams = context.getAiComParams(params.id);
                          cssObj = parseLess(decodeURIComponent(aiComParams.data.styleSource));
                          cssObjKey = `.${cn}`;
                        } else if (status.state === 'ing') {
                          Object.entries(value).forEach(([key, value]) => {
                            cssObj[cssObjKey][key] = `${value}px`;
                          })
                          const cssStr = stringifyLess(cssObj);
                          context.updateFile(params.id, { fileName: 'style.less', content: cssStr })
                        }
                      }
                    }
                  })
                } else {
                  className.forEach((className) => {
                    items.push({
                      ...item,
                      valueProxy: {
                        set(params, value) {
                          const comId = props.model?.runtime?.id || props.id;
                          const aiComParams = context.getAiComParams(comId);
                          const cssObj = parseLess(decodeURIComponent(aiComParams.data.styleSource));
                          const selector = params.selector;
      
                          if (!cssObj[selector]) {
                            cssObj[selector] = {};
                          }
      
                          Object.entries(value).forEach(([key, value]) => {
                            cssObj[selector][key] = value;
                          })
      
                          const cssStr = stringifyLess(cssObj);
                          context.updateFile(comId, { fileName: 'style.less', content: cssStr })
                        }
                      },
                      target: `.${className}${item.target || ""}`,
                      domTarget: `.${className}`
                    })
                  })
                }
              })
              style.items = items;
            })
          }

          let selector = key === ":root" ? `.${className[0]}` : `.${className[0]} ${key}`;

          if (!focusAreaConfigs[selector]) {
            focusAreaConfigs[selector] = value;
          } else {
            focusAreaConfigs[selector].style = value.style;
          }
          if (!focusAreaConfigs[selector].items && !focusAreaConfigs[selector].style?.length) {
            // 没有配置项并且没有style，添加默认的空style编辑，保证是一个选区
            focusAreaConfigs[selector].style = [
              {
                items: []
              }
            ]
          }

          if (!focusAreaConfigs[selector].title) {
            focusAreaConfigs[selector].title = selector;
          }
        })
      }
    })
  }

  context.setAiComParams(props.id, props);

  return {
    ...focusAreaConfigs,
    /** 可调整宽高 */
    '@resize': {
      options: ['width', 'height'],
    },
    /** 代码编辑器面板 */
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
    /** 初始化 */
    // '@init': () => {},
    /** 保存的回调 */
    // '@save'() {},
    /** toJSON的回调 */
    // '@toJSON'(){},
  }
}