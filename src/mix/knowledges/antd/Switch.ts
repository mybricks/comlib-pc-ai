import { getStyleOptions } from './../utils'

export default {
  description: `开关`,
  editors: {
    ':root': {
      title: '开关',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background']),
        }
      ]
    },
  },
  docs: require('./Switch.md').default
}