import { getStyleOptions } from './../utils'

export default {
  description: `数字输入框`,
  editors: {
    ':root': {
      title: '数字输入框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'border']),
        }
      ]
    },
  },
  docs: require('./InputNumber.md').default
}