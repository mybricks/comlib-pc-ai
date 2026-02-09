import classLibrarySelection from "./tools/loadExtraComponentDocs"
import developMyBricksModule from "./tools/developMyBricksModule";
import readModuleCode from "./tools/read-module-code";
import answer from "./tools/answer";
import { createWorkspace } from "./workspace";

/**
 * 更新组件文件
 * @param files 文件数组，每个文件包含 fileName 和 content
 * @param comId 组件ID
 * @param context 上下文对象，包含 updateFile 和 getAiComParams 方法
 */
function updateComponentFiles(files: Array<{ fileName: string; content: string }>, comId: string, context: any) {
  const aiComParams = context.getAiComParams(comId);
  
  const fileToDataKey: Array<{ fileName: string; dataKey: string }> = [
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
      context.updateFile(comId, { fileName, content: matchedFiles[0].content })
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
      context.updateFile(comId, { fileName, content: current })
    }
  });

  // 清空需求文档
  aiComParams.data.document = '';
}

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

      // 判断是否作为工具被调用（被上级agent调用）
      const asSubAgentTool = !!params.asTool;

      params?.onProgress?.("start");

      const { focusArea } = aiComParams ?? {};

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
Selector: ${focus.focusArea.selector}
</选区信息>
        `
      }
      // 创建workspace实例
      const workspace = createWorkspace({
        comId: focus.comId,
        aiComParams,
        libraryDocs: [] // 备用的类库文档（可选）
      });

      const hasAttachments = Array.isArray(params.attachments) && params.attachments?.length > 0;

      return new Promise((resolve, reject) => {
        // 基础配置（放在 Promise 内，以便 emits 能正确使用 resolve/reject）
        const baseConfig = {
          ...params,
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
        };

        // asTool模式，直接被上级agent调用
        const AsToolModeConfig = {
        ...baseConfig,
        planList: [`${developMyBricksModule.toolName} -mode restore`],
        tools: [
          developMyBricksModule({
            enabledBatch: true,
            hasAttachments,
            onOpenCodes: () => {
              workspace.openModuleCodes()
            },
            execute(p) {
              // 兼容旧的调用方式
              if (params.onDevelopModule) {
                return params.onDevelopModule(p, (comId, files) => updateComponentFiles(files, comId, context));
              }
            }
          }),
          answer()
        ],
        formatUserMessage: (text: string) => {
          const style = aiComParams?.style ?? {};
          const wUnit = typeof style.width === 'number' ? 'px' : '';
          const hUnit = typeof style.height === 'number' ? 'px' : '';
          const componentInfo =
            style.widthFact != null && style.heightFact != null
              ? `宽度为${style.width ?? ''}${wUnit}，实际渲染宽度为${style.widthFact}px；高度为${style.height ?? ''}${hUnit}，实际渲染高度为${style.heightFact}px`
              : '暂无尺寸信息';

          return `<当前组件的信息>
${componentInfo}
</当前组件的信息>
<用户消息>
${text}
</用户消息>
`;
        },
        };

        // agent模式配置
        const AgentModeConfig = {
          ...baseConfig,
          tools: [
            // classLibrarySelection({
            //   librarySummaryDoc: workspace.getAvailableLibraryInfo() || '',
            //   fileFormat: context.plugins.aiService.fileFormat,
            //   onOpenLibraryDoc: (libs) => {
            //     workspace.openLibraryDoc(libs)
            //   }
            // }),
            readModuleCode({
              onOpenCodes: () => {
                workspace.openModuleCodes()
              }
            }),
            developMyBricksModule({
              hasAttachments,
              onOpenCodes: () => {
                workspace.openModuleCodes()
              },
              execute(p) {
                // 默认模式：直接更新组件文件
                console.log("[@开发模块 - execute]", p);
                const { files } = p;

                updateComponentFiles(files, focus.comId, context);
              }
            }),
            answer()
          ],
          formatUserMessage: (text: string) => {
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
        };

        const config = asSubAgentTool ? AsToolModeConfig : AgentModeConfig;
        rxai.requestAI(config);
      });
    }
  }
}
