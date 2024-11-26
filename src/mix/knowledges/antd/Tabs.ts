export default {
  description: `标签页`,
  editors: {
    ':root': {
      title: '标签页',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
  },
  docs: require('./Tabs.md').default
}