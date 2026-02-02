import {CSS_LANGUAGE} from './types'
import React from 'react'

export function getComponentFromJSX(jsxCode, libs: { mybricksSdk }, dependencies = {}): Promise<Function> {
  return new Promise((resolve, reject) => {
    transformTsx(jsxCode).then(code => {
      try {
        const rtn = runRender(code, {
            'react': React,
            '@ant-design/icons': window['icons'],
            'dayjs': window['dayjs'] ?? window['moment'],
            'mybricks': libs.mybricksSdk,
            ...dependencies,
          }
        )
        resolve(rtn)
      } catch (ex) {
        reject(ex)
        return
      }
    }).catch(ex => {
      reject(ex)
    })
  })
}

export function transformTsx(code): Promise<string> {
  return new Promise((resolve, reject) => {
    let transformCode

    try {
      const options = {
        presets: [
          [
            "env",
            {
              "modules": "commonjs"//umd->commonjs
            }
          ],
          'react'
        ],
        plugins: [
          ['proposal-decorators', {legacy: true}],
          'proposal-class-properties',
          [
            'transform-typescript',
            {
              isTSX: true
            }
          ],
          function() {
            return {
              visitor: {
                JSXElement(path) {
                  const { node } = path;
                  const dataLocValueObject: any = {
                    jsx:{start:node.start,end:node.end},
                    tag:{end:node.openingElement.end},
                  }

                  const classNameNode = node.openingElement.attributes.find((a) => a.name.name === "className")

                  if (classNameNode) {
                    dataLocValueObject.cn = classNameNode.value.value;
                  }

                  const dataLocValue = JSON.stringify(dataLocValueObject)

                  node.openingElement.attributes.push({
                    type: 'JSXAttribute',
                    name: {
                      type: 'JSXIdentifier',
                      name: 'data-loc',
                    },
                    value: {
                      type: 'StringLiteral',
                      value: dataLocValue,
                      extra: { 
                        raw: `"${dataLocValue}"`,
                        rawValue: dataLocValue
                      }
                    }
                  })

                  const comId = uuid();

                  node.openingElement.attributes.push({
                    type: 'JSXAttribute',
                    name: {
                      type: 'JSXIdentifier',
                      name: 'data-com-id',
                    },
                    value: {
                      type: 'StringLiteral',
                      value: comId,
                      extra: { 
                        raw: `"${comId}"`,
                        rawValue: comId
                      }
                    }
                  })
                }
              }
            };
          }
          //transformImportPlugin()
        ]
      }

      if (!window.Babel) {
        loadBabel()
        reject('当前环境 BaBel编译器 未准备好')
      } else {
        transformCode = window.Babel.transform(code, options).code
      }

    } catch (error) {
      reject(error)
    }

    return resolve(transformCode)
  })
}

export function transformLess(code): Promise<string> {
  return new Promise((resolve, reject) => {
    let res = ''
    try {
      if (window?.less) {

        if (!code || code.length === 0) {
          return resolve('')
        }

        window.less.render(code, {}, (error, result) => {
          if (error) {
            console.error(error)
            res = ''

            reject(`Less 代码编译失败: ${error.message}`)
          } else {
            res = result?.css
          }
        })
      } else {
        loadLess() // 重试
        reject('当前环境无 Less 编译器，请联系应用负责人')
      }
    } catch (error) {
      reject(error)
    }

    return resolve(res)
  }) as any
}

export function updateRender({data}, renderCode) {
  transformTsx(renderCode.replace(/import css from ['"][^'"]*style.less['"]/, 'const css = new Proxy({}, { get(target, key) { return key } })')).then(code => {
    data.runtimeJsxCompiled = encodeURIComponent(code)
    data.runtimeJsxSource = encodeURIComponent(renderCode)
    data._jsxErr = ''
  }).catch(e => {
    data._jsxErr = e?.message ?? '未知错误'
  })
}

export function updateStyle({data}, styleCode) {
  transformLess(styleCode).then(css => {
    data.styleCompiled =  encodeURIComponent(css)
    data.styleSource = encodeURIComponent(styleCode)
    data._cssErr = '';
  }).catch(e => {
    data._cssErr = e?.message ?? '未知错误'
  })
}


async function requireFromCdn(cdnUrl) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = cdnUrl
    document.body.appendChild(el)
    el.onload = () => {
      resolve(true)
    }
    el.onerror = () => {
      reject(new Error(`加载${cdnUrl}失败`))
    }
  })
}

async function loadLess() {
  if (window?.less) {
    return
  }
  await requireFromCdn('https://f2.beckwai.com/udata/pkg/eshop/fangzhou/asset/less/4.2.0/less.js')
}

async function loadBabel() {
  if (window?.Babel) {
    return
  }

  await requireFromCdn('https://f2.beckwai.com/udata/pkg/eshop/fangzhou/asset/babel/standalone/7.24.7/babel.min.js')
}


function runRender(code, dependencies) {
  const wrapCode = `
          (function(exports,require){
            ${code}
          })
        `

  const exports = {
    default: null
  }

  const require = (packageName) => {
    return dependencies[packageName]
  }

  eval(wrapCode)(exports, require)

  return exports.default
}

export function uuid(pre = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789', maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}