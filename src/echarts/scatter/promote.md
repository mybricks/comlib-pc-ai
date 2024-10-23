## 使用文档：散点图
散点（气泡）图。直角坐标系上的散点图可以用来展现数据的 x，y 之间的关系，如果数据项有多个维度，其它维度的值可以通过不同大小的 symbol 展现成气泡图，也可以用颜色来表现。这些可以配合 visualMap 组件完成

包含图表：散点图、气泡图、涟漪散点图、涟漪气泡图

各类散点图的适用场景：
- 散点图：一般为固定点大小的图，适合展示二维数据的信息
- 气泡图：在散点图的基础上，还可以再通过不同大小的 symbol 来展示第三个维度的数据

### 最佳实践-散点图
多个系列的散点图进行对比

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      emphasis: {
        focus: 'series', // 多维对比时，一般开启鼠标悬浮高亮整个系列
      },
      tooltip: {}, // 开启默认的鼠标悬浮效果
      xAxis: {
        splitLine: { 
          show: true // 开启坐标轴背景的分割线，
        }
      },
      yAxis: {
        splitLine: { 
          show: true // 开启坐标轴背景的分割线，
        }
      },
      series: [
        {
          type: 'scatter', // 使用散点进行绘制
          symbolSize: 10, // 散点图一般固定散点的大小
          data: [
            ['一月', 2],
            ['二月', 6],
            ['三月', 9],
            ['四月', 10]
          ],
        },
        {
          type: 'scatter', // 使用散点进行绘制
          symbolSize: 10, // 散点图一般固定散点的大小
          data: [
            ['一月', 5],
            ['二月', 6],
            ['三月', 7],
            ['四月', 8]
          ],
          
        }
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

### 最佳实践-气泡图

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {}, // 开启默认的鼠标悬浮效果
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: function (data) { // 气泡图的点大小是动态的，由第三个维度的数值决定
            return Math.sqrt(data[2]);
          },
          data: [
            ['一月', 2, 10],
            ['二月', 6, 20],
            ['三月', 9, 40],
            ['四月', 10, 60]
          ],
          type: 'scatter' // 使用散点进行绘制
        },
        {
          symbolSize: function (data) { // 气泡图的点大小是动态的，由第三个维度的数值决定
            return Math.sqrt(data[2]);
          },
          data: [
            ['一月', 5, 12],
            ['二月', 6, 23],
            ['三月', 7, 50],
            ['四月', 8, 88]
          ],
          type: 'scatter' // 使用散点进行绘制
        }
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