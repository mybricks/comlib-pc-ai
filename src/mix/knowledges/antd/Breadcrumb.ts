export default {
  description: `面包屑`,
  editors: {
    '.ant-breadcrumb li': {
      title: '单项',
      items: [
        {
          title: '字体样式',
          type: 'style',
          options: ['font'],
        }
      ]
    }
  },
  docs: require('./Breadcrumb.md').default
}