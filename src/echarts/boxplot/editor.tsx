import { getAIEditor, getPromteForSingle } from "../common";
export default getAIEditor({ systemPrompts: getPromteForSingle({ scope: '盒须图', promte: require('./promote.md').default }) })