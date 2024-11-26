export default {
  description: `分页`,
  editors: {
    '.ant-pagination': {
      title: '分页',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-pagination-item.ant-pagination-item-active a': {
      title: '当前页码',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
    '.ant-pagination-item:not(.ant-pagination-item-active) a': {
      title: '页码',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    }
  },
  docs: require('./Pagination.md').default
}