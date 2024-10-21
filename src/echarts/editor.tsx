import { getAIEditor } from './common'

export default getAIEditor({ systemPrompts: require('./promote.md').default })
