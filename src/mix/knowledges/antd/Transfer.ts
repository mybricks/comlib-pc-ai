export default {
  description: `穿梭框`,
  editors: {
    '.ant-transfer': {
      title: '穿梭框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    },
  },
  docs: require('./Transfer.md').default
}