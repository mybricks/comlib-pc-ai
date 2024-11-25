export default {
  description: `滑块`,
  editors: {
    '.ant-slider': {
      title: '滑块',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
  },
  docs: require('./Slider.md').default
}