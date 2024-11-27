export default {
  description: `下拉选择器`,
  editors: {
    '.ant-select-selector': {
      title: '下拉选择器',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
    '.ant-select:not(.ant-select-disabled):hover .ant-select-selector': {
      title: '下拉选择器悬浮态',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
    '.ant-select-item.ant-select-item-option': {
      title: '下拉项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'padding'],
        }
      ]
    }
  },
  docs: require('./Select.md').default
}