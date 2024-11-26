export default {
  description: `时间选择器`,
  editors: {
    ':root': {
      title: '时间选择器',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border', 'padding'],
        }
      ]
    },
  },
  docs: require('./TimePicker.md').default
}