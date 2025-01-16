import { getStyleOptions } from './../utils'

export default {
  description: `标签页`,
  editors: {
    ':root': {
      title: '标签页',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'border']),
        }
      ]
    },
    '.ant-tabs-tab': {
      title: '标签项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'padding', 'border']),
        }
      ]
    },
    '.ant-tabs-tab.ant-tabs-tab-active': {
      title: '选中项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'padding', 'border']),
        }
      ]
    },
    '.ant-tabs-ink-bar': {
      title: '指示条',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background']),
        }
      ]
    },
    '.ant-tabs-extra-content': {
      title: '额外区域',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'padding', 'font']),
        }
      ]
    }
  },
  docs: require('./Tabs.md').default
}