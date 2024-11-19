import {
  getAIEditor,
  getPromteForSingle,
  ECHARTS_KNOWLEDGES_MAP,
} from '../common'
export default getAIEditor({
  systemPrompts: getPromteForSingle({
    scope: '仪表盘',
    promte: ECHARTS_KNOWLEDGES_MAP.gauge,
  }),
})
