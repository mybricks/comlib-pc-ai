export default {
  description: `滑块`,
  editors: {
    '.ant-slider-rail': {
      title: '全部区间',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
    '.ant-slider-track': {
      title: '有值区间',
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