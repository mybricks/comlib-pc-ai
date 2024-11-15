import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { polyfillChartsRuntime } from './../util'
import { AIJsxRuntime } from './../../utils/ai-code/render'
import { copyToClipboard } from './../../utils/ai-code'
import echartsForReact from './../../utils/echarts-for-react'
import { Data } from './../types'

import css from './chart.less'

const LoadingStatus = ({ title = '加载中...' }) => {
  return <div className={css.tip}>{title}</div>
}

const IdlePlaceholder = ({ title = 'AI 图表', examples = [] }) => {
  const copy = useCallback((text) => {
    copyToClipboard(text).then((res) => {
      window?.antd?.message
        ? window?.antd?.message.success('复制成功')
        : alert('复制成功')
    })
  }, [])

  const CopyIcon = useCallback(() => {
    return (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5474"
      >
        <path
          d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
          p-id="5475"
          fill="#555555"
        ></path>
        <path
          d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
          p-id="5476"
          fill="#555555"
        ></path>
        <path
          d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
          p-id="5477"
          fill="#555555"
        ></path>
      </svg>
    )
  }, [])

  return (
    <div className={css.tip}>
      <div className={css.title}>{title}</div>
      <div className={css.content}>
        欢迎使用 MyBricks AI 图表组件，
        <strong>请通过右下角「对话框」提问生成组件</strong>
      </div>
      比如：
      {examples.map((example) => {
        return (
          <div
            className={css.example}
            key={example}
            onClick={() => copy(example)}
          >
            - {example} <CopyIcon />
          </div>
        )
      })}
    </div>
  )
}

export default ({ title, examples }) =>
  ({ env, data, inputs, outputs, slots, logger, id }: RuntimeParams<Data>) => {
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
        placeholder={<IdlePlaceholder title={title} examples={examples} />}
        dependencies={{ 'echarts-for-react': echartsForReact }}
      />
    )
  }
