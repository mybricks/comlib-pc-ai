import {transformLess} from "../transform";
import {getComponentFromJSX, updateRender, updateStyle} from "../utils";

import { ANTD_KNOWLEDGES_MAP } from "./../../mix/knowledges";
import prompts from './../../mix/prompts/antd-summary.md'


export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      return {
        langs:`HTML、CSS、Javascript、react`,
    prompts,
    //     prompts:`
    // 优先基于 antd(Ant Design的5.21.4版本)进行开发，同时可以使用 @ant-design/icons(Ant Design提供的图标库).
    // 如果antd组件库中的组件不能满足需求，可以基于react、html进行开发。
    
    // Ant Design组件库中，可以使用所有的antd中的组件，注意以下方面：
    // 1、尽量使用中等尺寸（size=middle)；
    // 2、尽量使用默认主题（theme=default)；
    // 3、所有组件都可以使用className属性，可以自定义样式；
    //     `,
      }
    },
    loadKnowledge: (items) => {
      const rtn: any = []
      items.forEach(now => {
        const library = now.from || now.lib;
        if (!library.match(/react/)) {
          if (library === 'antd') {
            const upperCom = now.item.toUpperCase()
            const knowledge = ANTD_KNOWLEDGES_MAP[upperCom] ?? '';
            if (knowledge) {
              rtn.push({
                lib: library,
                item: now.item,
                knowledge
              })
            }
          }
        }
      })
    
      return rtn
    },
    preview(response: { id, render, style }, edtCtx, libs: { mybricksSdk }) {
      return new Promise((resolve, reject) => {
        if (response) {
          const rtn = (com, css) => {
            resolve({
              com,
              css
            })
          }

          Promise.all([
            new Promise((resolve, reject) => {
              getComponentFromJSX(response.render, libs).then(com => {
                resolve(com)
              })
            }),
            new Promise((resolve, reject) => {
              if (!response.style) { // 兼容空样式
                return resolve('')
              }
              transformLess(response.style).then(css => {
                const myContent = css.replaceAll('__id__', response.id)//替换模版
                resolve(myContent)
              })
            })
          ]).then(([com, css]) => {
            rtn(com, css)
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    execute({id, data, inputs, outputs, slots},
            response: { render, style }, {refresh} = {}) {
      return new Promise((resolve, reject) => {
        if (response.render) {
          updateRender({data}, response.render)
        }

        if (response.style) {
          updateStyle({id, data}, response.style)
        }

        resolve()
      })
    }
  }
}