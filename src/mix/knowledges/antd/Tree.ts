export default {
  description: `树形控件`,
  editors: {
    '.ant-tree': {
      title: '树形控件',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
  },
  docs: require('./Tree.md').default
}