export default {
  description: `徽标数`,
  editors: {
    '.ant-scroll-number': {
      title: '徽标',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    }
  },
  docs: require('./Badge.md').default
}