// import { CSS_LANGUAGE } from '../types'
// import { transformTsx, transformCss } from './../../utils/ai-code'
import { transformLess, getComponentFromJSX, updateRender, updateStyle } from './../../utils/ai-code/transform-umd'
export { default as getPromteForSingle } from './promte-for-single'
export { default as getPromteForAll } from './promte-for-all'

export { default as getChartRuntime } from './chart'

export const getAIEditor = ({ systemPrompts = '' }) => ({
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
        return systemPrompts
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
              getComponentFromJSX(response.render, libs),
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
