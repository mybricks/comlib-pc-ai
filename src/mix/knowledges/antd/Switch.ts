export default {
  description: `开关`,
  editors: {
    '.ant-switch.ant-switch-checked:not(.ant-switch-disabled)': {
      title: '开关',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
  },
  docs: require('./Switch.md').default
}