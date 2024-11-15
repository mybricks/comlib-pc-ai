// import { CSS_LANGUAGE } from '../types'
// import { transformTsx, transformCss } from './../../utils/ai-code'
import { transformLess, getComponentFromJSX, updateRender, updateStyle } from './../../utils/ai-code/transform-umd'
export { default as getPromteForSingle } from './promte-for-single'
export { default as getPromteForAll } from './promte-for-all'

export { default as getChartRuntime } from './chart'

import echartsForReact from './../../utils/echarts-for-react'

export const getAIEditor = ({ systemPrompts = '', loadKnowledge = (items) => '' }) => ({
  '@init': (params) => {
    const { style, data, id, input, output } = params
    style.width = 480
    style.height = 420
  },
  '@resize': {
    options: ['width', 'height'],
  },
  '@ai': {
    ':root': {
      active: true,
      role: 'comDev', //定义AI的角色
      getSystemPrompts() {
        return {
          langs:`HTML、CSS、Javascript、react`,
  //         renderFileTemplate:`
  // ({env,data,inputs,outputs,slots})=>{
  //   useMemo(()=>{
  //     inputs['u_i6']((val)=>{//监听输入项
  //       data.title = val
  //     })
  //   },[])
    
  //   return (
  //     <div>
  //       <div>
  //         {data.logo}
  //       </div>
  //       <Button className={css.button} onClick={e=>{
  //         outputs['o_03'](data.title)
  //       }}>{data.title}</Button>
  //       <div>{slots['s_u01'].render()}</div>
  //     </div>
  //   )
  // }
  //         `,
          prompts: `${systemPrompts}`,
        }
      },
      loadKnowledge,
      preview(response: { render, style }, edtCtx, libs: { mybricksSdk }) {
        return new Promise((resolve, reject) => {
          if (response) {
            const rtn = (com, css) => {
              resolve({
                com,
                css
              })
            }
            Promise.all([
              getComponentFromJSX(response.render, libs, {
                'echarts-for-react': echartsForReact
              }),
              transformLess(response.style)
            ]).then(([com, css]) => {
              rtn(com, css)
            }).catch(e => {
              reject(e)
            })
          }
        })
      },
      execute(
        { id, data, inputs, outputs, slots },
        response: { render; style }
      ) {
        return new Promise((resolve, reject) => {
          if (response) {
            if (!(response.render || response.style)) {
              resolve(true)
              return
            }

            if (response.render) {
              updateRender({data}, response.render)
            }
    
            if (response.style) {
              updateStyle({data}, response.style)
            }

            resolve(true)
          }
        })
      },
    },
  },
})
