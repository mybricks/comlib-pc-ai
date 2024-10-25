### 使用文档：树图
树图，也称为路径图，是一种特殊的层次类型，具有唯一的根节点，左子树，和右子树。适合展示具有复杂层次结构的数据。

包含图表：树图、路径图

#### 最佳实践-树图

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {}, // 默认开启鼠标悬浮提示
      series: [
        {
          type: 'tree',
          symbolSize: 10, // 标记的大小
          expandAndCollapse: true, // 子树折叠和展开的交互，树图一般都打开
          leaves: { // 叶子节点的特殊配置，一般都需要配置
            label: {
              position: 'right', // 标签位置放至右边，如果是从左到右的图，就往右边放，如果是从上到下的图，则往下边放
              verticalAlign: 'middle',
              align: 'left' // 文字从左到右排列
            }
          },
          orient: 'LR', // 树图中正交布局的方向，应有 水平 方向的 从左到右，从右到左；以及垂直方向的 从上到下，从下到上。取值分别为 'LR' , 'RL', 'TB', 'BT'。
          edgeShape: '', // 树图在 正交布局 下，边的形状。分别有曲线和折线两种，对应的取值是 curve 和 polyline
          emphasis: {
            focus: 'descendant' // 聚焦所有子孙节点，树图一般配置这个
          },
          data: [
            name: 'C盘',
            value: 3000
            children: [
              {
                name: 'folder_A',
                value: 3000
                children: [
                  {
                    name: 'file',
                    value: 2000
                  },
                  {
                    name: 'file2',
                    value: 1000
                  }
                ]
              }
            ],
            name: 'D盘',
            value: 3000
            children: [
              {
                name: 'folder_B',
                value: 3000
                children: [
                  {
                    name: 'file',
                    value: 3000
                  }
                ]
              }
            ]
          ],
        },
      ],
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
```
