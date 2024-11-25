export default {
  description: `日历`,
  editors: {
    '.ant-picker-cell .ant-picker-cell-inner': {
      title: '日历项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
    '.ant-picker-cell-selected .ant-picker-cell-inner': {
      title: '选中日历项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
    '.ant-picker-content thead th': {
      title: '日历头部',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'padding'],
        }
      ]
    },
  },
  docs: require('./Calendar.md').default
}