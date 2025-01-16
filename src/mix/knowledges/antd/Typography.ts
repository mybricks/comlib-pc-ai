import { getStyleOptions } from './../utils'

export default {
  description: `文本段落`,
  editors: {
    ':root': {
      title: '文本段落',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'border']),
        }
      ]
    },
  },
  docs: require('./Typography.md').default
}