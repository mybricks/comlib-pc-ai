import React, {FunctionComponent, ReactElement, useCallback, useMemo} from 'react'
import * as antd from "antd";
import * as icons from "@ant-design/icons"
import {AIJsxRuntime} from './index'
import {copyToClipboard} from './../index'

import css from './runtime-card.less'

const IdlePlaceholder = ({title = 'AI 图表', orgName = 'MyBricks', examples = []}) => {
  const copy = useCallback((text) => {
    copyToClipboard(text).then((res) => {
      antd?.message
        ? antd?.message.success('复制成功')
        : alert('复制成功')
    })
  }, [])

  const CopyIcon = useCallback(() => {
    return (
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="16" height="16">
        <path
          d="M337.28 138.688a27.968 27.968 0 0 0-27.968 27.968v78.72h377.344c50.816 0 92.032 41.152 92.032 91.968v377.344h78.656a28.032 28.032 0 0 0 27.968-28.032V166.656a28.032 28.032 0 0 0-27.968-27.968H337.28z m441.408 640v78.656c0 50.816-41.216 91.968-92.032 91.968H166.656a92.032 92.032 0 0 1-91.968-91.968V337.28c0-50.816 41.152-92.032 91.968-92.032h78.72V166.656c0-50.816 41.152-91.968 91.968-91.968h520c50.816 0 91.968 41.152 91.968 91.968v520c0 50.816-41.152 92.032-91.968 92.032h-78.72zM166.656 309.312a27.968 27.968 0 0 0-27.968 28.032v520c0 15.424 12.544 27.968 27.968 27.968h520a28.032 28.032 0 0 0 28.032-27.968V337.28a28.032 28.032 0 0 0-28.032-28.032H166.656z"
          fill="#707070"></path>
      </svg>
    )
  }, [])

  return (
    <div className={css.tip}>
      {/*<div className={css.title}>{title}</div>*/}
      <div className={css.content}>
        欢迎使用 {orgName} {title}，
        <strong>请和我对话完成组件开发吧</strong>
      </div>
      <p>例如：</p>
      {examples.map((example) => {
        return (
          <div
            className={css.example}
            key={example}
            onClick={() => copy(example)}
          >
            {example} <CopyIcon/>
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

export const genAIRuntime = ({title, orgName, examples, dependencies, wrapper}: AIRuntimeProps) =>
  ({env, data, inputs, outputs, slots, logger, id}: RuntimeParams<any>) => {

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
        context: {React},
        logger
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
      let comp = ({children, env}) => <>{children}</>
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
          placeholder={<IdlePlaceholder title={title} orgName={orgName} examples={examples}/>}
          dependencies={{
            ...(dependencies ?? {}),
            'react': React,
            '@ant-design/icons': icons,
            'mybricks': env.mybricksSdk,
          }}
        />
      </Wrapper>
    )
  }
