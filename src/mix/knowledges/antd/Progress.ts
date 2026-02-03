export default {
  description: `进度条`,
  editors: {
    '.ant-progress-text[title]': {
      title: '进度文本',
      style: [
        {
          items: [
            {
              title: '样式',
              options: ['font'],
            }
          ]
        }
      ]
    },
  },
  docs: require('./Progress.md').default
}