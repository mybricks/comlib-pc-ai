import {transformLess} from "../transform";
import {getComponentFromJSX, updateRender, updateStyle} from "../utils";
import getKnowledge from "./knowledge";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      return {
        langs:`HTML、CSS、Javascript、react`,
        renderFileTemplate:`
({env,data,inputs,outputs,slots})=>{
  useMemo(()=>{
    inputs['u_i6']((val)=>{//监听输入项
      data.title = val
    })
  },[])
  
  return (
    <div>
      <div>
        {data.logo}
      </div>
      <Button className={css.button} onClick={e=>{
        outputs['o_03'](data.title)
      }}>{data.title}</Button>
      <div>{slots['s_u01'].render()}</div>
    </div>
  )
}
        `,
        prompts:`
    优先基于 antd(Ant Design的5.21.4版本)进行开发，同时可以使用 @ant-design/icons(Ant Design提供的图标库).
    如果antd组件库中的组件不能满足需求，可以基于react、html进行开发。
    
    Ant Design组件库中，可以使用所有的antd中的组件，注意以下方面：
    1、尽量使用中等尺寸（size=middle)；
    2、尽量使用默认主题（theme=default)；
    3、所有组件都可以使用className属性，可以自定义样式；
        `
      }
    },
    loadKnowledge(items) {//加载知识库
      const rtn = []

      items.forEach(now => {
        if (!now.from.match(/react/)) {
          const knowledge = getKnowledge(now.from, now.item)
          if (knowledge) {
            rtn.push({
              from: now.from,
              item: now.item,
              knowledge
            })
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