export default {
  description: `树形控件`,
  editors: {
    '.ant-tree': {
      title: '树形控件',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['background'],
        }
      ]
    },
    '.ant-tree .ant-tree-switcher': {
      title: '节点开关',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font'],
        }
      ]
    },
    '.ant-tree .ant-tree-node-content-wrapper': {
      title: '节点内容',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'padding'],
        }
      ]
    },
    '.ant-tree .ant-tree-indent-unit': {
      title: '缩进',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['size'],
        }
      ]
    }
  },
  docs: require('./Tree.md').default
}