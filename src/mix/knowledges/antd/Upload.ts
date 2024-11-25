export default {
  description: `上传`,
  editors: {
    '.ant-upload-wrapper': {
      title: '上传',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background'],
        }
      ]
    },
  },
  docs: require('./Upload.md').default
}