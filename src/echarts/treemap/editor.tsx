import {
  getAIEditor,
  getPromteForSingle,
  ECHARTS_KNOWLEDGES_MAP,
} from '../common'
export default getAIEditor({
  systemPrompts: getPromteForSingle({
    scope: '矩形树图',
    promte: ECHARTS_KNOWLEDGES_MAP.treemap,
  }),
})
