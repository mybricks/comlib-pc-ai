export default {
  description: `头像`,
  editors: {
    ':root': {
      title: '头像',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    }
  },
  docs: require('./Avatar.md').default
}