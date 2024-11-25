export default {
  description: `二维码`,
  editors: {
    '.ant-qrcode': {
      title: '二维码',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
  },
  docs: require('./QRCode.md').default
}