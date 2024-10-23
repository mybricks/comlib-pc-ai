import { getAIEditor, getPromteForSingle } from "../common";
export default getAIEditor({ systemPrompts: getPromteForSingle({ scope: '矩形树图', promte: require('./promote.md').default }) })