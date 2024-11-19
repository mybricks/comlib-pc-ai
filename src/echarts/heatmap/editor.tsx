import {
  getAIEditor,
  getPromteForSingle,
  ECHARTS_KNOWLEDGES_MAP,
} from '../common'
export default getAIEditor({
  systemPrompts: getPromteForSingle({
    scope: '热力图',
    promte: ECHARTS_KNOWLEDGES_MAP.heatmap,
  }),
})
