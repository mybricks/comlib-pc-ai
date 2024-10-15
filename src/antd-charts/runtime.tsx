import React, { useEffect, useMemo, useState } from 'react'
import { polyfillChartsRuntime } from './util'
import { AIJsxRuntime } from './../utils/ai-code/render'
import css from './runtime.less'

const LoadingStatus = ({ title = '加载中...' }) => {
  return <div className={css.tip}>{title}</div>
}

const IdlePlaceholder = () => {
  return (
    <div className={css.tip}>
      <div className={css.title}>AI 图表</div>
      <div className={css.content}>
        欢迎使用 MyBricks AI 图表组件，
        <strong>请通过右下角「对话框」提问生成组件</strong>
      </div>
      比如：
      <div className={css.example}>
        我想要一个杭州每个区的人口占比图
      </div>
      <div className={css.example}>
        我想要绘制一个电商公司近5年的销售额曲线
      </div>
    </div>
  )
}

export default ({ env, data, inputs, outputs, slots, logger, id }) => {
  const [loading, setLoading] = useState<string | undefined>('资源加载中...')
  useMemo(() => {
    polyfillChartsRuntime()
      .catch(() => {
        setLoading('图表资源加载失败，当前环境暂不支持此组件')
      })
      .finally(() => {
        setLoading(void 0)
      })
  }, [])

  useMemo(() => {
    if (env.edit) {
      data._editors = void 0
    }
  }, [])

  const scope = useMemo(() => {
    return {
      data,
      // data: new Proxy({}, {
      //   get(obj, key) {
      //     //debugger
      //
      //     if (!data['_defined']) {
      //       data['_defined'] = {}
      //     }
      //
      //     return data['_defined'][key]
      //   },
      //   set(obj, key, value) {
      //     if (!data['_defined']) {
      //       data['_defined'] = {}
      //     }
      //
      //     data['_defined'][key] = value
      //     return true
      //   }
      // }),
      inputs: new Proxy(
        {},
        {
          get(_, id) {
            if (env.runtime) {
              return (fn) => {
                inputs[id]((value, relOutputs) => {
                  fn(
                    value,
                    new Proxy(
                      {},
                      {
                        get(_, key) {
                          ///TODO
                        },
                      }
                    )
                  )
                })
              }

              // const inputId = data.inputs.find((input) => input.id === id)?.id
              //
              // if (inputId) {
              //   return (fn) => {
              //     inputs[inputId]((value, relOutputs) => {
              //       fn(value, new Proxy({}, {
              //         get(_, key) {
              //           const outputId = data.outputs.find((input) => input.id === key)?.key || ""
              //           return relOutputs[outputId]
              //         }
              //       }))
              //     })
              //   }
              // }

              return () => {}
            }
            return () => {}
          },
        }
      ),
      outputs: new Proxy(
        {},
        {
          get(obj, id) {
            if (env.runtime) {
              /////TODO 继续完成其他部分
              const rtn = outputs[id]

              if (rtn) {
                return rtn
              }
            }

            return () => {}
          },
        }
      ),
      slots: new Proxy(
        {},
        {
          get(obj, id) {
            const slotId = data.slots.find((slot) => slot.id === id)?.id
            if (slotId) {
              return slots[slotId]
            }
          },
        }
      ),
      env,
      context: { React },
    }
  }, [slots])

  const errorInfo = useMemo(() => {
    if (!!data._jsxErr) {
      return {
        title: 'JSX 编译失败',
        desc: data._jsxErr,
      }
    }

    if (!!data._cssErr) {
      return {
        title: 'Less 编译失败',
        desc: data._cssErr,
      }
    }
  }, [data._jsxErr, data._cssErr])

  if (!!loading) {
    return <LoadingStatus title={loading} />
  }

  return (
    <AIJsxRuntime
      env={env}
      id={id}
      styleCode={data._styleCode}
      renderCode={data._renderCode}
      renderProps={scope}
      errorInfo={errorInfo}
      placeholder={<IdlePlaceholder />}
    />
  )
}
