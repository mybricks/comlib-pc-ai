export default {
  description: `面包屑`,
  editors: {
    ':root': {
      title: '面包屑',
      items: [
        {
          title: '字体样式',
          type: 'style',
          options: ['background', 'padding', 'border'],
        }
      ]
    },
    '.ant-breadcrumb li>a': {
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