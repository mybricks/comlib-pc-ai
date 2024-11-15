import { transformLess, getComponentFromJSX, updateRender, updateStyle } from './../utils/ai-code/transform-umd'
import { Pagination } from './component/index'

export default {
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
          renderFileTemplate:``,
          prompts:`
      优先基于自定义组件库 customDesign 进行开发，同时可以使用 @ant-design/icons 的图标.
      如果 customDesign 组件库中的组件不能满足需求，可以基于react、html进行开发。
${require('./promte.md').default}
          `
        }
      },
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
              getComponentFromJSX(
                response.render,
                libs,
                { 'customDesign': { Pagination }
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
}
