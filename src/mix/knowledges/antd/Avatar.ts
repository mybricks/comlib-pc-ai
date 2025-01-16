import { getStyleOptions } from './../utils'

export default {
  description: `头像`,
  editors: {
    ':root': {
      title: '头像',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'border']),
        }
      ]
    }
  },
  docs: require('./Avatar.md').default
}