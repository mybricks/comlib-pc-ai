export default {
  description: `头像`,
  editors: {
    '.ant-avatar': {
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
  docs: require('./Avator.md').default
}