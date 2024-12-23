export default {
  description: `表格组件`,
  editors: {
    '.ant-table': {
      title: '表格',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    },
    '.ant-table-thead': {
      title: '表头',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
    '.ant-table-thead .ant-table-cell': {
      title: '列',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'font'],
        }
      ]
    },
    ...(require('./Pagination.ts')?.default?.editors ?? {}),
  },
  docs: require('./Table.md').default + require('./Pagination.md').default,
}