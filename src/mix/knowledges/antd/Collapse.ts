import { getStyleOptions } from './../utils'

export default {
  description: `折叠面板`,
  editors: {
    ':root': {
      title: '折叠面板',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'border']),
        }
      ]
    },
    '.ant-collapse-header': {
      title: '头部区域',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'padding']),
        }
      ]
    },
    '.ant-collapse-content-box': {
      title: '内容区域',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'padding']),
        }
      ]
    }
  },
  docs: require('./Collapse.md').default
}