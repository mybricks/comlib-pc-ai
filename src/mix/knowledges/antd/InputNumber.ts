export default {
  description: `数字输入框`,
  editors: {
    ':root': {
      title: '数字输入框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
  },
  docs: require('./InputNumber.md').default
}