export default {
  description: `进度条`,
  editors: {
    '.ant-progress-text[title]': {
      title: '进度文本',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['font'],
        }
      ]
    },
  },
  docs: require('./Progress.md').default
}