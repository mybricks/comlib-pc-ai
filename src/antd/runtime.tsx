import React, {useEffect, useMemo, useRef} from 'react';
import {polyfillRuntime} from './util'
import { StyleProvider } from "@ant-design/cssinjs";

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
  const container = useRef((env.edit || env.runtime.debug) ? document.querySelector("#_mybricks-geo-webview_")!.shadowRoot : null);
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
        //console.log(decodeURIComponent(data._renderCode))
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
      slots,
      env,
      context: {React}
    }
  }, [slots])


  return (
    <>
      {typeof ReactNode === 'function' ? (
        <StyleProvider container={container.current!} hashPriority="high">
          <ReactNode {...scope} />
        </StyleProvider>
      ) : (
        <ErrorStatus title={errorInfo?.title} onError={onError}>{ReactNode}</ErrorStatus>
      )}
    </>
  )
};
