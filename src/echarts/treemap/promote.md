## 使用文档：矩形树图
矩形树图（Treemap），也称为矩形式树状结构图，是一种通过使用不同大小的矩形来展示层次结构数据的可视化图表。适合展示具有复杂层次和部分-整体关系的数据集。

包含图表：矩形树图

矩形树图的适用场景：
- 矩形树图：适合展示带层次和数据值的数据，比如磁盘的空间利用分析、部门的预算分析、不同页面的流量渠道分析等等

### 最佳实践-矩形树图

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
          type: 'treemap',
          itemStyle: {
            borderColor: '#fff' // 设置每个矩形的边框颜色
          },
          colorSaturation: [0.2, 0.9], // 设置本系列默认的节点的颜色饱和度选取范围
          levels: [ // 层级的特殊配置，矩形树图一般都需要配置
            {
              itemStyle: {
                borderWidth: 0,
                gapWidth: 3 // 『森林』的顶层配置，设置根节点之间的矩形间距为3
              }
            },
            {
              itemStyle: {
                gapWidth: 1 // 下一层配置，设置第二层子节点之间的矩形间距为1
              }
            },
            {
              itemStyle: {
                gapWidth: 1 // 再下一层配置，设置第三层子节点之间的矩形间距为1
              }
            },
          ],
          data: [
            name: 'C盘',
            value: 5000,
            children: [
              {
                name: 'folder_A',
                value: 2000,
                children: [
                  {
                    name: 'file',
                    value: 2000
                  }
                ]
              }
            ],
            name: 'D盘',
            value: 7000,
            children: [
              {
                name: 'file2',
                value: 7000
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