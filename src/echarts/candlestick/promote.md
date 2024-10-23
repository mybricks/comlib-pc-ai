## 使用文档：K线图
K线图，又称为蜡烛图，是一种用于展示金融市场价格变动的图表。它能够展示特定时间段内的开盘价、收盘价、最高价和最低价。K线图的每个“蜡烛”代表了一定时间内的价格走势，包括实体部分（开盘价和收盘价之间的区域）和影线部分（最高价和最低价的连线）。

包含图表：K线图、蜡烛图


### 最佳实践-K线图

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      xAxis: {
        data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
      },
      yAxis: {},
      series: [
        {
          type: 'candlestick',
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42]
          ]
        }
      ]
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
```