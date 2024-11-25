export default {
  description: `导航菜单`,
  editors: {
    '.ant-menu': {
      title: '导航菜单',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'background', 'border'],
        }
      ]
    },
  },
  docs: require('./Menu.md').default
}