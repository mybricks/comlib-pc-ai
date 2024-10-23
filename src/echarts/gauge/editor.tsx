import { getAIEditor, getPromteForSingle } from "../common";
export default getAIEditor({ systemPrompts: getPromteForSingle({ scope: '仪表盘', promte: require('./promote.md').default }) })