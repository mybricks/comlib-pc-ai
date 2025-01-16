import { getStyleOptions } from './../utils'

export default {
  description: `级联选择器`,
  editors: {
    ':root': {
      title: '级联选择器',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'border']),
        }
      ]
    },
  },
  docs: require('./Cascader.md').default
}