export default {
  description: `树形选择器`,
  editors: {
    ':root': {
      title: '树形选择器',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'brder'],
        }
      ]
    },
  },
  docs: require('./TreeSelect.md').default
}