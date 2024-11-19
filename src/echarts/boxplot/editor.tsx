import { getAIEditor, getPromteForSingle, ECHARTS_KNOWLEDGES_MAP } from '../common'

export default getAIEditor({
  systemPrompts: getPromteForSingle({
    scope: '盒须图',
    promte: ECHARTS_KNOWLEDGES_MAP.boxplot,
  }),
})
