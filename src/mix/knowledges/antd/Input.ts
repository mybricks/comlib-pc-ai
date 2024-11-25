export default {
  description: `输入框`,
  editors: {
    '.ant-input': {
      title: '输入框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
  },
  docs: require('./Input.md').default
}