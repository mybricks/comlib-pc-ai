export default {
  description: `走马灯`,
  editors: {
    ':root': {
      title: '走马灯',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    },
  },
  docs: require('./Carousel.md').default
}