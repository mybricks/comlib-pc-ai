export default {
  description: `单选框`,
  editors: {
    '.ant-radio-group': {
      title: '单选框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
    '.ant-radio-wrapper': {
      title: '选项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
  },
  docs: require('./Radio.md').default
}