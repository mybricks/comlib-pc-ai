export default {
  description: `步骤条`,
  editors: {
    ':root': {
      title: '步骤条',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'font'],
        }
      ]
    },
    '.ant-steps-item .ant-steps-item-title': {
      title: '步骤标题',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-steps-item .ant-steps-item-icon': {
      title: '步骤图标',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'font'],
        }
      ]
    },
    '.ant-steps-item .ant-steps-item-description': {
      title: '步骤描述',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-steps-item-active .ant-steps-item-title': {
      title: '当前步骤标题',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-steps-item-active .ant-steps-item-icon': {
      title: '当前步骤图标',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background', 'font'],
        }
      ]
    },
    '.ant-steps-item-active .ant-steps-item-description': {
      title: '当前步骤描述',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
  },
  docs: require('./Steps.md').default
}