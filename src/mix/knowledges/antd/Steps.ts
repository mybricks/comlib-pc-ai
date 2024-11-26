export default {
  description: `步骤条`,
  editors: {
    ':root': {
      title: '步骤条',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'font'],
        }
      ]
    },
  },
  docs: require('./Steps.md').default
}