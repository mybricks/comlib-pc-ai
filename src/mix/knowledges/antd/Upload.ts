export default {
  description: `上传`,
  editors: {
    '.ant-upload-wrapper .ant-upload button': {
      title: '上传按钮',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'border', 'padding', 'background'],
        }
      ]
    },
    '.ant-upload-wrapper .ant-upload-select': {
      title: '上传卡片',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['border', 'background'],
        }
      ]
    },
    '.ant-upload-select button div': {
      title: '提示文本',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-upload-select button .anticon': {
      title: '提示图标',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-upload-wrapper .ant-upload-list-item-done': {
      title: '已上传文件',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['border', 'padding', 'background'],
        }
      ]
    },
  },
  docs: require('./Upload.md').default
}