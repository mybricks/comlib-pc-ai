export default {
  description: `折叠面板`,
  editors: {
    '.ant-collapse': {
      title: '折叠面板',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
  },
  docs: require('./Collapse.md').default
}