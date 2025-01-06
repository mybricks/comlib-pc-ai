export default {
  description: `级联选择器`,
  editors: {
    ':root': {
      title: '级联选择器',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    },
  },
  docs: require('./Cascader.md').default
}