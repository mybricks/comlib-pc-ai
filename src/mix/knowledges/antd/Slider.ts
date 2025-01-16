import { getStyleOptions } from "../utils";

export default {
  description: `滑块`,
  editors: {
    ':root': {
      title: '全部区间',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background']),
        }
      ]
    },
    '.ant-slider-track': {
      title: '有值区间',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background']),
        }
      ]
    },
  },
  docs: require('./Slider.md').default
}