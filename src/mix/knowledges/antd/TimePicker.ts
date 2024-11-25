export default {
  description: `时间选择器`,
  editors: {
    '.ant-picker': {
      title: '时间选择器',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    },
  },
  docs: require('./TimePicker.md').default
}