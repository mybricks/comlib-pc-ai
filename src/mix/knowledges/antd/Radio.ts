import { getStyleOptions } from './../utils'

export default {
  description: `单选框`,
  editors: {
    '.ant-radio-wrapper': {
      title: '选项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font']),
        }
      ]
    },
    '.ant-radio-button-wrapper': {
      title: '按钮式选项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'border', 'padding']),
        }
      ]
    }
  },
  docs: require('./Radio.md').default
}