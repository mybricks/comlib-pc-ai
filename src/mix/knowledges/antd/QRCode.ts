export default {
  description: `二维码`,
  editors: {
    ':root': {
      title: '二维码',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['background', 'border', 'padding'],
        }
      ]
    },
  },
  docs: require('./QRCode.md').default
}