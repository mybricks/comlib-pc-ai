import React, {useRef} from 'react'
import {genAIRuntime} from './../utils/ai-code'
import echartsForReact from './../utils/echarts-for-react'
import {StyleProvider} from '@ant-design/cssinjs'


export default genAIRuntime({
  title: 'AI组件',
  examples: [
    '创建一个查询商品分类的表单',
    '一个用来表示员工所在地的表格',
    '一个卡片、内部有一个环形图用来表示销售类目占比，卡片右上角下拉选择可以切换不同门店',
    '绘制杭州今年每月的降水量面积图，用渐变色展示'
  ],
  dependencies: {
    antd: window['antd_5_21_4'],
    'echarts-for-react': echartsForReact,
    // '@dnd-kit/core': dndCore,
    // '@dnd-kit/modifiers': dndModifiers,
    // '@dnd-kit/sortable': dndSortable,
    // '@dnd-kit/utilities': dndUtilities
  },
  wrapper: ({ children, env }) => {
    const container = useRef(
      env.edit || env.runtime.debug
        ? document.querySelector('#_mybricks-geo-webview_')!.shadowRoot
        : null
    )
    return (
      <StyleProvider container={container.current!} hashPriority="high">
        {children}
      </StyleProvider>
    )
  },
})
