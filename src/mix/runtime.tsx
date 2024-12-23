import React, { useRef } from 'react'
import { genAIRuntime } from './../utils/ai-code'
import echartsForReact from './../utils/echarts-for-react'
import { StyleProvider } from '@ant-design/cssinjs'
import * as dndCore from '@dnd-kit/core';
import * as dndModifiers from '@dnd-kit/modifiers';
import * as dndSortable from '@dnd-kit/sortable'; 
import * as dndUtilities from '@dnd-kit/utilities';


export default genAIRuntime({
  title: 'AI组件',
  examples: [
    '生成一个登录表单',
    '生成一个内部是销售类目占比环形图的卡片，卡片右上角下拉选择可以切换不同门店的数据',
    '绘制一个图书馆书本借用次数的玫瑰图',
    '使用雷达图展示MBTI不同人格在男性女性间占比的对比',
    '绘制杭州今年每月的降水量面积图，用渐变色展示'
  ],
  dependencies: {
    antd: window['antd_5_21_4'],
    'echarts-for-react': echartsForReact,
    '@dnd-kit/core': dndCore,
    '@dnd-kit/modifiers': dndModifiers,
    '@dnd-kit/sortable': dndSortable,
    '@dnd-kit/utilities': dndUtilities
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
