### 使用文档：柱状图
包含图表：柱状图、条形图、分组柱状图、堆叠柱状图、堆叠条形图

各类柱状图的适用场景：
- 柱状图：适合展示随X轴变化Y轴变化的趋势
- 分组柱状图：适合展示多组数据对比的情况
- 堆叠柱状图：适合展示多组数据在X轴维度上的占比情况
- 堆叠条形图：适合展示多组数据在Y轴维度上的占比情况


#### 最佳实践-柱状图

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {},
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
          type: 'bar',
          markLine: { // 添加平均值参考线
            data: {
              type: 'average', // type=average时是平均数
              name: '平均值',
              label: {
                show: true,
                formatter: '平均值：{c}',
                position: 'insideEndTop', 设置在参考线的结束点上方，不容易遮挡信息
              },
            }
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