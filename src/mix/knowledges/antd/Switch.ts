export default {
  description: `开关`,
  editors: {
    ':root': {
      title: '开关',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
  },
  docs: require('./Switch.md').default
}