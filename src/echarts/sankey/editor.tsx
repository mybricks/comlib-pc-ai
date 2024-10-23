import { getAIEditor, getPromteForSingle } from "../common";
export default getAIEditor({ systemPrompts: getPromteForSingle({ scope: '桑基图', promte: require('./promote.md').default }) })