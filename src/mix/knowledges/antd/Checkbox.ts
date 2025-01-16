import { getStyleOptions } from './../utils'

export default {
  description: `复选框`,
  editors: {
    ':root': {
      title: '复选框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font']),
        }
      ]
    },
  },
  docs: require('./Checkbox.md').default
}