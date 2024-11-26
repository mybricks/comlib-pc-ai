export default {
  description: `折叠面板`,
  editors: {
    ':root': {
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
  docs: require('./DatePicker.md').default
}