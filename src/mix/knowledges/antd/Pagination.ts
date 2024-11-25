export default {
  description: `分页`,
  editors: {
    '.ant-pagination': {
      title: '分页',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background'],
        }
      ]
    },
  },
  docs: require('./Pagination.md').default
}