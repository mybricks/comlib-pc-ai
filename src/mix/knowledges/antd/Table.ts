import { getStyleOptions } from './../utils'

export default {
  description: `表格组件`,
  editors: {
    ':root': {
      title: '表格'
    },
    '.ant-table-thead': {
      title: '表头'
    },
    '.ant-table-thead .ant-table-cell': {
      title: '列'
    },
    ...(require('./Pagination.ts')?.default?.editors ?? {}),
  },
  docs: require('./Table.md').default + require('./Pagination.md').default,
}