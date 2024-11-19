import {
  getAIEditor,
  getPromteForSingle,
  ECHARTS_KNOWLEDGES_MAP,
} from '../common'
export default getAIEditor({
  systemPrompts: getPromteForSingle({
    scope: '桑基图',
    promte: ECHARTS_KNOWLEDGES_MAP.sankey,
  }),
})
