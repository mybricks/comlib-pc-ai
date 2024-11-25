export default {
  description: `统计数值`,
  editors: {
    '.ant-statistic': {
      title: '统计数值',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'font'],
        }
      ]
    },
  },
  docs: require('./Statistic.md').default
}