import { getStyleOptions } from './../utils'

export default {
  description: `徽标数`,
  editors: {
    ':root': {
      title: '徽标',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'border']),
        }
      ]
    }
  },
  docs: require('./Badge.md').default
}