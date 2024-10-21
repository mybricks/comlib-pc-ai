import { transformTsx, transformCss } from './../../utils/ai-code'
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
              const renderCode = response.render

              transformTsx(renderCode, { id })
                .then((code) => {
                  data._renderCode = code
                  data._jsxErr = ''
                })
                .catch((e) => {
                  data._jsxErr = e?.message ?? '未知错误'
                })
            }

            if (response.style) {
              transformCss(response.style, data.cssLan, { id })
                .then((css) => {
                  data._styleCode = css
                  data._cssErr = ''
                })
                .catch((e) => {
                  data._cssErr = e?.message ?? '未知错误'
                })
            }

            resolve(true)
          }
        })
      },
    },
  },
})
