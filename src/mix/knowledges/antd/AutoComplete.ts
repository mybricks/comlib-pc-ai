export default {
  description: `自动完成输入框`,
  editors: {
    ':root': {
      title: '输入框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    }
  },
  docs: require('./AutoComplete.md').default
}