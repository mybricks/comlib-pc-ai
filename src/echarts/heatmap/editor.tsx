import { getAIEditor, getPromteForSingle } from "../common";
export default getAIEditor({ systemPrompts: getPromteForSingle({ scope: '热力图', promte: require('./promote.md').default }) })