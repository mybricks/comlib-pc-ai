export default {
  description: `进度条`,
  editors: {
    '.ant-progress': {
      title: '进度条',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background'],
        }
      ]
    },
  },
  docs: require('./Progress.md').default
}