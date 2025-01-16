import { getStyleOptions } from './../utils'

export default {
  description: `走马灯`,
  editors: {
    ':root': {
      title: '走马灯',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'border']),
        }
      ]
    },
  },
  docs: require('./Carousel.md').default
}