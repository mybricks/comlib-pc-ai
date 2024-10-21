import React, {useEffect, useMemo} from 'react';
import {polyfillRuntime} from './util'

polyfillRuntime();

const ErrorStatus = ({title = '未知错误', children = null, onError}) => {
  onError(title)//向外抛出错误

  return (
    <div style={{color: 'red'}}>
      {title}
      <br/>
      {children}
    </div>
  )
}

interface CssApi {
  set: (id: string, content: string) => void
  remove: (id: string) => void
}

export default ({env, data, inputs, outputs, slots, logger, id, onError}) => {
  useMemo(() => {
    if (env.edit) {
      data._editors = void 0
    }
  }, [])

  const appendCssApi = useMemo<CssApi>(() => {
    let cssApi = {
      set: (id: string, content: string) => {
        const el = document.getElementById(id);
        if (el) {
          el.innerText = content
          return
        }
        const styleEle = document.createElement('style')
        styleEle.id = id;
        styleEle.innerText = content
        document.head.appendChild(styleEle);
      },
      remove: (id: string) => {
        const el = document.getElementById(id);
        if (el && el.parentElement) {
          el.parentElement.removeChild(el)
        }
      }
    }
    if ((env.edit || env.runtime?.debug) && env.canvas?.css) {
      cssApi = env.canvas.css
    }
    return cssApi
  }, [env])

  // 注入 CSS 代码
  useMemo(() => {
    if (data._styleCode) {
      appendCssApi.set(`mbcrcss_${id}`, decodeURIComponent(data._styleCode))
    }
  }, [data._styleCode, appendCssApi])

  // 卸载 CSS 代码
  useEffect(() => {
    return () => {
      // mbcrcss = mybricks_custom_render缩写
      appendCssApi.remove(`mbcrcss_${id}`)
    }
  }, [])

  const errorInfo = useMemo(() => {
    if (!!data._jsxErr) {
      return {
        title: 'JSX 编译失败',
        tip: data._jsxErr
      }
    }

    if (!!data._cssErr) {
      return {
        title: 'Less 编译失败',
        tip: data._cssErr
      }
    }
  }, [data._jsxErr, data._cssErr])

  const ReactNode = useMemo(() => {
    if (errorInfo) return errorInfo.tip;
    if (data._renderCode) {
      try {
        eval(decodeURIComponent(data._renderCode))

        const rt = window[`mbcrjsx_${id}`]
        return rt?.default;
      } catch (error) {
        return error?.toString()
      }
    } else {
      return function () {
        return (
          <div>欢迎使用MyBricks AI组件</div>
        )
      }
    }
  }, [data._renderCode, errorInfo])

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
          if (env.runtime) {/////TODO 继续完成其他部分
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
          const slotId = data.slots.find((slot) => slot.id === id)?.id
          if (slotId) {
            return slots[slotId]
          }
        }
      }),
      env,
      context: {React}
    }
  }, [slots])

  const container = document.querySelector("#_mybricks-geo-webview_")!.shadowRoot
  // const container = null

  // return (
  //   <StyleProvider container={container!}>
  //     <Button type="primary">hello</Button>
  //   </StyleProvider>
  // )

  return (
    <>
      {typeof ReactNode === 'function' ? (
        <ReactNode {...scope} />
      ) : (
        <ErrorStatus title={errorInfo?.title} onError={onError}>{ReactNode}</ErrorStatus>
      )}
    </>
  )
};
