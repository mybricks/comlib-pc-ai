export default {
  description: `穿梭框`,
  editors: {
    ':root': {
      title: '穿梭框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'border'],
        }
      ]
    },
    '.ant-transfer-list-header': {
      title: '穿梭框顶部',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'padding', 'border'],
        }
      ]
    },
    '.ant-transfer-list-header-selected': {
      title: '计数',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-transfer-list-header-title': {
      title: '标题',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-transfer-list-search': {
      title: '搜索框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'border', 'background'],
        }
      ]
    },
    '.ant-transfer-operation .ant-btn': {
      title: '操作项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'border', 'background'],
        }
      ]
    }
  },
  docs: require('./Transfer.md').default
}