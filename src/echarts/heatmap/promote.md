## 使用文档：热力图
热力图，主要通过颜色去表现数值的大小，它通过颜色的变化来表示数值的大小或密度，不同的颜色或色彩深浅代表了数据的不同值或密度，必须要配合 visualMap 组件使用

包含图表：热力图、日历热力图、地图热力图


### 最佳实践-笛卡尔坐标系下的热力图
在笛卡尔坐标系下的展示

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {}, // 开启默认的鼠标悬浮效果
      xAxis: {
        splitArea: {
          show: true // 在X轴展示分割区域，热力图一般开启
        }
      },
      yAxis: {
        splitArea: {
          show: true // 在Y轴展示分割区域，热力图一般开启
        }
      },
      visualMap: { // 热力图必须开启的颜色映射选项，
        min: 0,
        calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
        orient: 'horizontal',
        left: 'center', // visualMap 组件离容器左侧的距离
        bottom: 0 // visualMap 组件离容器下侧的距离
      },
      series: [
        {
          type: 'heatmap'
          data: [
            [0, '一月', 100],
            [1, '一月', 36],
            [3, '一月', 30],
            [4, '一月', 50],
            [0, '二月', 100],
            [1, '二月', 30],
            [3, '二月', 480],
            [4, '二月', 30],
          ],
          emphasis: {
            itemStyle: { // 鼠标悬浮时添加阴影用于高亮块
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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

### 最佳实践-日历坐标系下的热力图
在日历坐标系下的展示，自动以一年的所有日期作日历轴

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {}, // 开启默认的鼠标悬浮效果
      visualMap: { // 热力图必须开启的颜色映射选项，
        min: 0, // 颜色最小值
        max: 10000, // 颜色最大值
        type: 'piecewise', // 使用分段型视觉组件
        orient: 'horizontal', // visualMap 组件 水平展示
        left: 'center', // visualMap 组件离容器左侧的距离
        bottom: 0 // visualMap 组件离容器下侧的距离
      },
      calendar: { // 使用日历坐标轴
        cellSize: ['auto', 13], // 日历每格框的大小，可设置单值 或数组 第一个元素是宽 第二个元素是高。 支持设置自适应：auto, 默认为高宽均为20
        range: '2017', // 必填，日历坐标的范围 支持多种格式，某一年为 '2017'、某个月为 '2017-02'、某个区间为 ['2017-01-02', '2017-02-23']
        itemStyle: {
          borderWidth: 0.5
        },
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: [
            [echarts.time.format('2017-01-01', '{yyyy}-{MM}-{dd}', false), 80], // 数据日历轴必须使用 YYYY-MM-dd 格式的数据，可以使用 echarts.time.format 来格式化
            [echarts.time.format('2017-01-02', '{yyyy}-{MM}-{dd}', false), 90],
          ],
          emphasis: {
            itemStyle: { // 鼠标悬浮时添加阴影用于高亮块
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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