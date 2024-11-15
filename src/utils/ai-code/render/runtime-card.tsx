import React, { FunctionComponent, ReactElement, useCallback, useMemo } from 'react'
import { AIJsxRuntime } from './index'
import { copyToClipboard } from './../index'

import css from './runtime-card.less'

const IdlePlaceholder = ({ title = 'AI 图表', orgName = 'MyBricks', examples = [] }) => {
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
        欢迎使用 {orgName} {title}，
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

interface AIRuntimeProps {
  /** 组件名称 */
  title: string,
  /** 组织名 */
  orgName?: string,
  /** 建议的例子 */
  examples: string[],
  /** 组件运行时的依赖 */
  dependencies?: Record<string, any>,
  wrapper?: FunctionComponent<{ children: ReactElement, env: any }>,
}

export const genAIRuntime = ({ title, orgName, examples, dependencies, wrapper }: AIRuntimeProps) =>
  ({ env, data, inputs, outputs, slots, logger, id }: RuntimeParams<any>) => {

    useMemo(() => {
      if (env.edit) {
        data._editors = void 0
      }
    }, [])

    const scope = useMemo(() => {
      return {
        data,
        inputs: new Proxy({}, {
          get(_, id) {
            if (env.runtime) {
              return (fn) => {
                inputs[id]((value, relOutputs) => {
                  fn(value, new Proxy({}, {
                    get(_, key) {
                      ///TODO
                    }
                  }))
                })
              }
              return () => {
              }
            }
            return () => {
            }
          }
        }),
        outputs: new Proxy({}, {
          get(obj, id) {
            if (env.runtime) {
              const rtn = outputs[id]
  
              if (rtn) {
                return rtn
              }
            }
  
            return () => {
            }
          }
        }),
        slots: new Proxy({}, {
          get(obj, id) {
            const rtn = slots[id]
  
            if (rtn) {
              return rtn
            } else {
              return {
                render() {
  
                }
              }
            }
          }
        }),
        env,
        context: {React}
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

    const Wrapper = useMemo(() => {
      let comp = ({ children, env }) => <>{children}</>
      if (wrapper) {
        // @ts-ignore
        comp = wrapper;
      }
      return comp
    }, [wrapper])


    return (
      <Wrapper env={env}>
        <AIJsxRuntime
          env={env}
          id={id}
          styleCode={data._styleCode}
          renderCode={data._renderCode}
          renderProps={scope}
          errorInfo={errorInfo}
          placeholder={<IdlePlaceholder title={title} orgName={orgName} examples={examples} />}
          dependencies={{
            ...(dependencies ?? {}),
            'react': React,
            '@ant-design/icons': window['icons'],
            'mybricks': env.mybricksSdk,
          }}
        />
      </Wrapper>
    )
  }
