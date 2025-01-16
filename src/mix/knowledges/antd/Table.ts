import { getStyleOptions } from './../utils'

export default {
  description: `表格组件`,
  editors: {
    ':root': {
      title: '表格',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'border']),
        }
      ]
    },
    '.ant-table-thead': {
      title: '表头',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background']),
        }
      ]
    },
    '.ant-table-thead .ant-table-cell': {
      title: '列',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'font']),
        }
      ]
    },
    ...(require('./Pagination.ts')?.default?.editors ?? {}),
  },
  docs: require('./Table.md').default + require('./Pagination.md').default,
}