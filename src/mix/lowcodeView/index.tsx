import React, { useState, useLayoutEffect, useEffect, useMemo, useRef } from "react";
import context from "../context";
import Editor, { HandlerType } from "@mybricks/coder/dist/umd";
import lazyCss from "./index.lazy.less";

const css = lazyCss.locals;

interface Params {
  data: any;
}

const FILES = [
  "model.json",
  "style.less",
  "runtime.jsx",
  "config.js"
]

const FILES_MAP = {
  "model.json": "modelConfig",
  "style.less": "styleSource",
  "runtime.jsx": "runtimeJsxSource",
  "config.js": "configJsSource"
}

export default function LowcodeView(params: Params) {
  const [selectedFile, setSelectedFile] = useState<string>("model.json");

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

    const path =  `file:///${"组件id"}/${selectedFile}`;

    if (selectedFile === "runtime.jsx") {
      return {
        path,
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
    } else if (["model.json", "style.less"].includes(selectedFile)) {
      return {
        path,
        language: selectedFile.split(".").pop()
      }
    }

    return options;

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
    return decodeURIComponent(params.data[FILES_MAP[selectedFile]])
    // if (selectedFile === "runtime.jsx") {
    //   return decodeURIComponent(params.data[FILES_MAP])
    // }
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
      <div style={{ height: "100%", width: 800 }}>
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