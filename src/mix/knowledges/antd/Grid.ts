import { getStyleOptions } from './../utils'

export default {
  description: `网格布局`,
  editors: {
    ':root': {
      title: '行列',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'border']),
        }
      ]
    },
    // '.ant-col': {
    //   title: '列',
    //   items: [
    //     {
    //       title: '样式',
    //       type: 'style',
    //       options: ['background', 'border'],
    //     }
    //   ]
    // },
    // '.ant-row': {
    //   title: '行',
    //   items: [
    //     {
    //       title: '样式',
    //       type: 'style',
    //       options: ['background', 'border'],
    //     }
    //   ]
    // },
  },
  docs: require('./Grid.md').default
}