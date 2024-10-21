## 使用文档：基础知识-基本使用

### 最佳实践-基础代码结构

```render
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      //...省略其它图表配置
    }
  }, [data.dataSource])

  return (
    // 务必在外层添加一个dom结构，用于配置图表背景色等样式，宽高直接使用100%
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        option={option}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
```

## 使用文档：基础知识-图表事件

```render
import ReactECharts from 'echarts-for-react';
import { useMemo, useCallback } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      //...省略其它图表配置
    }
  }, [data.dataSource])

  // 定义图表Ready的回调，常用来获取echarts实例
  const onChartReady = useCallback((echarts) => {
    console.log('echarts is ready', echarts);
  }, [])

  // 定义图表点击事件的回调
  const onChartClick = useCallback((param, echarts) => {
    console.log(param, echarts);
  }, [])

  return (
    <ReactECharts
      option={option}
      onChartReady={onChartReady}
      onEvents={{
        'click': onChartClick,
        }}
    />
  )
}
```

## 使用文档-颜色的使用

### 最佳实践-使用 color 属性改变绘制图形的颜色

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      color: ['#5470C6', '#EE6666'], // 声明调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
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

### 最佳实践-使用渐变色

渐变色可以被使用在任意声明 color 的地方

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

// 渐变色声明
const linearColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 两个offset表示范围从 0 - 1
  {
    offset: 0,
    color: 'rgb(128, 255, 165)'
  },
  {
    offset: 1,
    color: 'rgb(1, 191, 236)'
  }
])

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      series: [
        {
          type: '绘制类型',
          color: linearColor // 图形使用渐变色绘制
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

## 使用文档-视觉映射 visialMap

视觉映射组件，用于进行视觉编码
如果包含以下工给你需求，可以考虑使用视觉映射来完成
- 对一个连续型的绘制图形分段进行不同颜色/样式的展示

## 使用文档-标记的使用

如果包含以下功能需求，可以考虑使用标记来完成
- 需要绘制一条额外的提示/辅助线条，比如平均值参考线、极值参考线、最小值参考线等，可以支持在任意点中绘制一条直线以及展示文本
- 需要绘制一个额外的提示/辅助区域，可以支持在任意区间绘制一个矩形用于辅助提示
- 需要绘制一个额外的提示/标记点，可以强调任意一个已绘制的点

### 最佳实践-使用 markArea 绘制辅助区

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      xAxis: {
        type: 'category',
        data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      },
      series: [
        {
          type: 'line',
          data: [10, 20, 30, 60, 56, 56, 56, ...],
          markArea: { // 使用 markArea 展示一天内最佳的跑步时间
            itemStyle: {
              color: ['rgba(255, 173, 177, 0.4)', 'rgba(173, 155, 255, 0.4)'] // 设置两个不同的颜色，上午最佳跑步时间颜色为半透明红色，晚上最佳跑步时间颜色为半透明蓝色
            },
            data: [
              [
                {
                  name: '上午最佳跑步时间',
                  xAxis: '8:00' // 要匹配 X 轴数据类型
                },
                {
                  xAxis: '10:00' // 要匹配 X 轴数据类型
                }
              ],
              [
                {
                  name: '晚上最佳跑步时间',
                  xAxis: '17:00' // 要匹配 X 轴数据类型
                },
                {
                  xAxis: '21:00' // 要匹配 X 轴数据类型
                }
              ]
            ]
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

### 最佳实践-使用 markPoint 绘制辅助点

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      xAxis: {
        type: 'category',
        data: [1, 2, 3, 4, 5, 6, 7],
      },
      series: [
        {
          type: 'line',
          data: [], // 系列数据
          markPoint: { // markPoint 是一类 serie 系列的子属性之一
            data: [
              { name: '最小', type: 'min' }, // 类型一：使用一个点强调展示最小值，为当前系列数据的最小值
              { name: '最大', type: 'max' }, // 类型二：使用一个点强调展示最大值，为当前系列数据的最大值
              { name: '平均', type: 'average' }, // 类型三：使用一个点强调展示平均值，为当前系列数据的平均值
              { name: '某个坐标', coord: [5, 20] }, // 类型四：绘制某个坐标的值
            ],
          },
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

### 最佳实践-使用 markLine 绘制辅助参考线
```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      xAxis: {
        type: 'category',
        data: [1, 2, 3, 4, 5, 6, 7],
      },
      series: [
        {
          type: 'line',
          data: [], // 系列数据
          markLine: { // markLine 是一类 serie 系列的子属性之一
            data: [
              {
                type: 'average', // type=average时是平均数
                name: '平均值',
                label: { formatter: '平均值：{c}' },
              }, // 类型一：绘制一个平均值参考线，并且展示格式化其展示信息
              {
                name: 'Y 轴值为 100 的水平线',
                yAxis: 100,
              }, // 类型二：绘制 Y值为 100 的水平线
              [
                {
                  name: '两个坐标之间的标线',
                  coord: [10, 20],
                }, // 起点
                {
                  coord: [20, 30],
                }, // 终点
              ], // 类型三：绘制两个坐标之间的参考线
            ],
          },
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

## 使用文档-图形元素 graphic
graphic 是原生图形元素组件。可以支持的图形元素包括：
image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group。

> 注意： 一般来说，我们优先使用标记来实现功能

### 最佳实践-元素相对定位

```render
import ReactECharts from 'echarts-for-react'
import { useMemo, useCallback } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      //...省略其它图表配置
      graphic: [
        {
          // 将图片定位到最下方的中间：
          type: 'text',
          left: 'center', // 水平定位到中间
          bottom: '10%', // 定位到距离下边界 10% 处
          style: {
            text: '我是位于图表中心的文本',
          },
        },
        {
          // 将图片定位到最下方的中间：
          type: 'text',
          left: 'center', // 水平定位到中间
          bottom: '10%', // 定位到距离下边界 10% 处
          style: {
            text: '我是位于图表中心的文本',
          },
        },
        {
          // 将旋转过的 group 整体定位右下角：
          type: 'group',
          right: 0, // 定位到右下角
          bottom: 0, // 定位到右下角
          rotation: Math.PI / 4,
          children: [
            {
              type: 'rect',
              left: 'center', // 相对父元素居中
              top: 'middle', // 相对父元素居中
              shape: {
                width: 190,
                height: 90,
              },
              style: {
                fill: '#fff',
                stroke: '#999',
                lineWidth: 2,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: 'rgba(0,0,0,0.3)',
              },
            },
            {
              type: 'text',
              left: 'center', // 相对父元素居中
              top: 'middle', // 相对父元素居中
              style: {
                fill: '#777',
                text: ['This is text', '这是一段文字', 'Print some text'].join(
                  '\n'
                ),
                font: '14px Microsoft YaHei',
              },
            },
          ],
        },
      ],
    }
  }, [data.dataSource])

  return <ReactECharts option={option} />
}
```