import React, { useState, useLayoutEffect, useEffect, useMemo, useRef } from "react";
import context from "../context";
import Editor, { HandlerType } from "@mybricks/coder/dist/umd";
import lazyCss from "./index.lazy.less";

const css = lazyCss.locals;

interface Params {

}

const FILES = [
  "model.json",
  "style.less",
  "runtime.jsx",
  "config.js"
]

export default function LowcodeView(params: Params) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useLayoutEffect(() => {
    // console.log("[@LowcodeView - params]", params)
  }, [])

  useEffect(() => {
    console.log("[@LowcodeView - params]", params)
  }, [selectedFile])

  const coderOptions = useMemo(() => {
    // console.log("[@selectedFile]", selectedFile)
    // console.log("[@params]", params)
    let options = {} as any

    if (selectedFile === "runtime.jsx") {
      return {
        path: `file:///${"组件id"}/${selectedFile}`,
        language: 'typescript',
        encodeValue: false,
        //height: 300,
        minimap: {
          enabled: false
        },
        eslint: {
          parserOptions: {
            ecmaVersion: '2020',
            sourceType: 'module'
          }
        },
        babel: false,
        //comments: Comments,
        autoSave: false,
        preview: false,
        //extraLib: data.extraLib,
        isTsx: true
      }
    }

    return options;
    // if (curFile.type === 'jsx') {
    //   const path = `file:///${curFile._model.id}/${curFile.name}.tsx`

    //   options = {
    //     path,
    //     language: 'typescript',
    //     encodeValue: false,
    //     //height: 300,
    //     minimap: {
    //       enabled: false
    //     },
    //     eslint: {
    //       parserOptions: {
    //         ecmaVersion: '2020',
    //         sourceType: 'module'
    //       }
    //     },
    //     babel: false,
    //     //comments: Comments,
    //     autoSave: false,
    //     preview: false,
    //     //extraLib: data.extraLib,
    //     isTsx: true
    //   }
    // } else if (curFile.type === 'js') {
    //   options = {
    //     path: `file:///${curFile._model.id}/${curFile.name}.js`,
    //     language: 'javascript',
    //     //height: 300,
    //   }
    // } else {
    //   let path = `file:///${curFile._model.id}/${curFile.name}.${curFile.type}`;

    //   options = {
    //     path,
    //     language: curFile.type,
    //   }
    // }

    // return options
  }, [selectedFile])

  const code = useMemo(() => {
    if (selectedFile === "runtime.jsx") {
      return decodeURIComponent(params.data['_sourceRenderCode'])
    }
  }, [selectedFile])

  const codeIns = useRef<HandlerType>(null)

  return (
    <div className={css['lowcode-view']}>
      <div className={css['file-list']}>
        {FILES.map((file, index) => (
          <div
            key={index}
            className={`${css['file-item']} ${selectedFile === file ? css['file-item-active'] : ""}`}
            onClick={() => setSelectedFile(file)}
          >
            {file}
          </div>
        ))}
      </div>
      <div style={{ height: 500, width: 500}}>
        <Editor
          ref={codeIns}
          value={code}
          {...coderOptions}
          options={{
            fontSize: 12,
            scrollbar: {
              horizontal: "auto",
              vertical: "auto",
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            }
          }}
          theme={'light'}
          wrapperClassName={css.coder}
          //height={'auto'}
          onChange={(value) => {
            // curFile._content = value

            // if (value !== curFile.content) {
            //   curFile._updated = true
            // } else {
            //   curFile._updated = false
            // }
          }}

          onMount={(editor, monaco) => {
            // console.log("编辑器初始化: ", {
            //   editor,
            //   monaco
            // })
            // console.log("类型提示: ", {
            //   LegacyLib,
            //   extraLib
            // })
            // setEditor(editor);
            // setMonaco(monaco);
          }}
        >
        </Editor>
      </div>
    </div>
  )
}