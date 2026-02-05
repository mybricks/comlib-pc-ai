import classLibrarySelection from "./tools/loadExtraComponentDocs"
import developMyBricksModule from "./tools/developMyBricksModule";
import answer from "./tools/answer";
import { createWorkspace } from "./workspace";

export default function ({ context }) {
  console.log("[@vibeCoding - context]", context);

  return {
    type: "vibeCoding",
    name: '智能组件助手',
    goal: '根据用户需要，开发可运行在MyBricks平台的模块',
    backstory: `基于React + Less`,
    request({ rxai, params, focus }: any) {
      const aiComParams = context.getAiComParams(focus.comId);
      console.log("[@request - params]", params);
      console.log("[@request - focus]", focus);
      console.log("[aiComParams]", aiComParams);

      params?.onProgress?.("start");


      const { focusArea } = aiComParams;

      let focusInfo = "";

      if (focusArea) {
        const cloneEl = focusArea.ele.cloneNode(true);
        cloneEl.innerHTML = '';
        cloneEl.innerText = focusArea.ele.innerText;
        const loc = JSON.parse(focusArea.ele.closest(`[data-loc]`).dataset.loc);
        const runtimeJsxSource = decodeURIComponent(aiComParams.data.runtimeJsxSource).replace(/import css from ['"][^'"]*style.less['"]/, 'const css = new Proxy({}, { get(target, key) { return key } })');

        focusInfo = `
<选区信息>
HTML Element: ${cloneEl.outerHTML}
Focus Area Code: ${runtimeJsxSource.slice(loc.jsx.start, loc.tag.end)}
</选区信息>
        `
      }
      // 创建workspace实例
      const workspace = createWorkspace({
        comId: focus.comId,
        aiComParams,
        libraryDocs: [] // 备用的类库文档（可选）
      });

      const extraParams = aiComParams.data.document ? {
        message: `参考图片一比一还原这个局部区域，当前组件需要完成的内容为页面中的局部部分，具体要还原的区域可以参考
<需求文档>
  ${aiComParams.data.document}
</需求文档>`,
        attachments: (window as any).myai_attachments ?? [],
      } : {}

      return new Promise((resolve, reject) => {
        rxai.requestAI({
          ...params,
          ...extraParams,
          emits: {
            write: () => { },
            complete: () => {
              resolve('complete');
              params?.onProgress?.("complete");
            },
            error: (error: any) => {
              reject(error);
              params?.onProgress?.("error");
            },
            cancel: () => { },
          },
          // 需求分析、重构（从0-1）、修改
          tools: [
            // classLibrarySelection({
            //   librarySummaryDoc: workspace.getAvailableLibraryInfo() || '',
            //   fileFormat: context.plugins.aiService.fileFormat,
            //   onOpenLibraryDoc: (libs) => {
            //     workspace.openLibraryDoc(libs)
            //   }
            // }),
            developMyBricksModule({
              execute(params) {
                console.log("[@开发模块 - execute]", params);
                const { files } = params;

                const fileToDataKey: Array<{ fileName: string; dataKey: string;}> = [
                  {
                    fileName: 'model.json', dataKey: 'modelConfig'
                  },
                  {
                    fileName: 'runtime.jsx', dataKey: 'runtimeJsxSource'
                  },
                  {
                    fileName: 'style.less', dataKey: 'styleSource'
                  },
                  {
                    fileName: 'config.js', dataKey: 'configJsSource'
                  },
                  {
                    fileName: 'com.json', dataKey: 'componentConfig'
                  },
                ];

                fileToDataKey.forEach(({ fileName, dataKey }) => {
                  const matchedFiles = files.filter((file: any) => file.fileName === fileName);
                  if (matchedFiles.length === 1) {
                    context.updateFile(focus.comId, { fileName, content: matchedFiles[0].content })
                  } else if (matchedFiles.length > 1) {
                    let current = decodeURIComponent(aiComParams.data[dataKey] || '');
                    for (let i = 0; i < matchedFiles.length; i+=2) {
                      const before = matchedFiles[i];
                      const after = matchedFiles[i + 1];

                      const index = current.indexOf(before.content);
                      if (index === -1) {
                        console.error(`[@开发模块 - 文件${fileName}替换失败]`, {
                          current,
                          before: before.content,
                          after: after.content,
                        });
                      }

                      if (before.content === "") {
                        current = after.content;
                      } else {
                        current = current.replace(before.content, after.content)
                      }
                    }
                    context.updateFile(focus.comId, { fileName, content: current })
                  }
                });
              }
            }),
            answer()
          ],
          formatUserMessage: (text: string) => {
            // const style = aiComParams?.style ?? {};
            // const wUnit = typeof style.width === 'number' ? 'px' : '';
            // const hUnit = typeof style.height === 'number' ? 'px' : '';
            // const componentInfo =
            //   style.widthFact != null && style.heightFact != null
            //     ? `宽度为${style.width ?? ''}${wUnit}，实际渲染宽度为${style.widthFact}px；高度为${style.height ?? ''}${hUnit}，实际渲染高度为${style.heightFact}px`
            //     : '暂无尺寸信息';
            // 组件信息：${componentInfo}

            return `
<注意>
1. 如果只是为了了解组件的现状，不需要通过历史记录，会在后续执行工具中提供
${focusInfo ? "2. 关注选区信息，用户信息是针对选区提出的" : ""}
</注意>
${focusInfo}
<用户消息>
${text}
</用户消息>
`
          },
          presetMessages: async () => {
            const content = await workspace.exportToMessage()
            return [
              {
                role: 'user',
                content
              },
              {
                role: 'assistant',
                content: '感谢您提供的知识，我会参考这些知识进行开发。'
              },
            ]
          },
        });
      })
    }
  }
}
