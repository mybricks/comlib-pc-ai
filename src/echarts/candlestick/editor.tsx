import { getAIEditor, getPromteForSingle, ECHARTS_KNOWLEDGES_MAP } from '../common'
export default getAIEditor({
  systemPrompts: getPromteForSingle({
    scope: 'K线图',
    promte: ECHARTS_KNOWLEDGES_MAP.candlestick,
  }),
})
