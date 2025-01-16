import { getStyleOptions } from './../utils'

export default {
  description: `图片`,
  editors: {
    ':root': {
      title: '图片',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'border']),
        }
      ]
    },
  },
  docs: require('./Image.md').default
}