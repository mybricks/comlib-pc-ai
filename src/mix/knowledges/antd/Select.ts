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
  },
  docs: require('./Select.md').default
}