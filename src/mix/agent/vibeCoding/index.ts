import classLibrarySelection from "./tools/classLibrarySelection"
import developMyBricksModule from "./tools/developMyBricksModule";
import { updateRender, updateStyle } from "../../../utils/ai-code/transform-umd";

export default function ({ context }) {
  console.log("[context]", context);
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
      return new Promise((resolve, reject) => {
        rxai.requestAI({
          ...params,
          emits: {
            write: () => {},
            complete: () => {
              resolve('complete');
              params?.onProgress?.("complete");
            },
            error: (error: any) => {
              reject(error);
              params?.onProgress?.("error");
            },
            cancel: () => {},
          },
          // 需求分析、重构（从0-1）、修改
          tools: [
            classLibrarySelection({
              fileFormat: context.plugins.aiService.fileFormat,
              execute(params) {
                console.log("[@类库选型 - execute]", params);
              }
            }), 
            developMyBricksModule({
              execute(params) {
                console.log("[@开发模块 - execute]", params);
                const { files } = params;
                files.forEach((file: any) => {
                  const { fileName, content } = file;
                  switch (fileName) {
                    case "runtime.jsx":
                      updateRender({ data: aiComParams.data }, content);
                      break;
                    case "style.less":
                      updateStyle({ data: aiComParams.data }, content);
                      break;
                    case "model.json":
                      aiComParams.data["model"] = content;
                      break;
                    case "config.js":
                      aiComParams.data["config"] = content;
                      break;
                    default:
                      break;
                  }
                })
              }
            })
          ],
          presetMessages: () => {
            console.log("[@获取presetMessages]")
            return [
              {
                role: 'user',
                content: `hello`
              },
              {
                role: 'assistant',
                content: 'world'
              },
            ]
          },
        });
      })
    }
  }
}
