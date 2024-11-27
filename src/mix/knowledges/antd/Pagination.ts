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
    },
    '.ant-pagination-options-size-changer .ant-select-selector': {
      title: '展示条数',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['padding', 'background', 'border'],
        }
      ]
    },
    '.ant-pagination-next .ant-pagination-item-link': {
      title: '下一页',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'border'],
        }
      ]
    },
    '.ant-pagination-prev .ant-pagination-item-link': {
      title: '上一页',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'border'],
        }
      ]
    }
  },
  docs: require('./Pagination.md').default
}