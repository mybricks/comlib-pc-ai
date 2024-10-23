## 使用文档：折线图
折线图是用折线将各个数据点标志连接起来的图表，用于展现数据的变化趋势

包含图表：折线图、面积图、多折线图、堆叠折线图、堆叠面积图，阶梯折线图

各类折线图的适用场景：
- 折线图：适合展示随X轴变化Y轴变化的趋势
- 面积图：在折线图的基础上，添加面积区域
- 多折线图：在折线图的基础上，绘制多个系列的折线数据来做系列的对比
- 多折线图：在面积图的基础上，绘制多个系列的折线数据来做系列的对比
- 堆叠折线图：在多折线图的基础上，启用堆叠功能
- 堆叠面积图：在多面积图的基础上，启动堆叠功能

### 最佳实践-折线图

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {
        trigger: 'axis', // 鼠标悬浮时使用坐标轴触发展示内容，在折线图中常用axis类型
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
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

### 最佳实践-面积图

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {
        trigger: 'axis', // 鼠标悬浮时使用坐标轴触发展示内容，在面积图中常用axis类型
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          showSymbol: false, // 面积图我们通常不展示原点
          areaStyle: {},
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
