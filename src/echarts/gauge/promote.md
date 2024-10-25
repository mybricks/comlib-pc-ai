### 使用文档：仪表盘
仪表盘是一种将多个数据视图（如图表、指针、数字显示器等）集成在一起的界面，用于实时或者近实时地监控和展示关键性能指标（KPIs）。它类似于汽车仪表盘，能够让用户快速了解当前的状态和性能。

包含图表：仪表盘、得分环


#### 最佳实践-仪表盘
```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      series: [
        {
          type: 'gauge',
          startAngle: 180, // 起始角度
          endAngle: 0, // 结束角度
          splitNumber: 10, // 仪表盘刻度的分割段数，默认为10
          progress: { // 进度条配置，一般情况下开启
            show: true, // 展示当前进度
            roundCap: true // 是否在两端显示成圆形
          },
          data: [
            { value: 80, name: 'score' },
          ],
          detail: {
            valueAnimation: true, // 开启标签的数字动画，一般都开启
          }
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

#### 最佳实践-多个指标在同一个仪表盘上绘制
在同一个仪表盘的轴上显示多个指标，绘制多个指标时，不要使用多个系列

注意：因为有多组数据，需要将多组数据的 title 和 detail 调整下位置防止互相遮挡，一般采用X轴偏倚，Y轴一致的思路，比如有三组数据，就分为左中右，左边用-40%，中间0%，右边 40%

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      series: [
        {
          type: 'gauge',
          startAngle: 200, // 起始角度
          endAngle: -10, // 结束角度
          splitNumber: 10, // 仪表盘刻度的分割段数，默认为10
          progress: { // 进度条配置
            show: true, // 展示当前进度
            overlap: true, // 多组数据时进度条是否重叠
            roundCap: true // 是否在两端显示成圆形
          },
          data: [ // 多组数据时，使用data的多个item项来绘制
            {
              value:80,
              name: 'A',
              title: { // 
                offsetCenter: ['-40%', '80%'] // 左移
              },
              detail: {
                offsetCenter: ['-40%', '95%'] // 左移
              }
            },
            {
              value: 55,
              name: 'B',
              title: {
                offsetCenter: ['0%', '80%'] // 中间
              },
              detail: {
                offsetCenter: ['0%', '95%'] // 中间
              }
            },
            {
              value: 90,
              name: 'C',
              title: {
                offsetCenter: ['40%', '80%'] // 右移
              },
              detail: {
                offsetCenter: ['40%', '95%'] // 右移
              }
            },
          ], 
          detail: {
            valueAnimation: true, // 开启标签的数字动画，一般都开启
          }
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