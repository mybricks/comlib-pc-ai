export default {
  description: `日期选择器`,
  editors: {
    ':root': {
      title: '日期选择器',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border', 'padding'],
        }
      ]
    },
    '.anticon-calendar': {
      title: '图标',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    }
  },
  docs: require('./DatePicker.md').default
}