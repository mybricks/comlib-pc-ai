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

## 使用文档-图形元素 graphic
graphic 是原生图形元素组件。可以支持的图形元素包括：
image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group。

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

## 使用文档-提示框组件 tooltip
提示框组件常常用于鼠标悬浮，展示具体的信息，可以设置在多种地方：
- 可以设置在全局，即 option.tooltip
- 可以设置在坐标系中，即 grid.tooltip、polar.tooltip、single.tooltip
- 可以设置在系列中，即 series.tooltip
- 可以设置在系列的每个数据项中，即 series.data.tooltip

主要属性如下
- tooltip
- tooltip.show
  - 默认值: true
  - 类型: boolean
  - 描述: 是否显示提示框组件。
- tooltip.trigger
    - 默认值: 'item'
    - 类型: string
    - 可选：
      - 'item'
      数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
      - 'axis'
      坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。可以通过 axisPointer.axis 指定坐标轴。
      - 'none'
      什么都不触发
    - 描述: 触发类型。
- tooltip.axisPointer
    - 类型: Object
    - 描述: 坐标轴指示器配置项。是配置坐标轴指示器的快捷方式。实际上坐标轴指示器的全部功能，都可以通过轴上的 axisPointer 配置项完成（例如 xAxis.axisPointer 或 angleAxis.axisPointer）。但是使用 tooltip.axisPointer 在简单场景下会更方便一些
    - 配置示例-直线指示器
      ```javascript
      tooltip: {
        axisPointer: {
          type: 'line'
        }
      }
      ```
    - 配置示例-十字准星指示器
      ```javascript
      tooltip: {
        axisPointer: {
          type: 'cross'
        }
      }
      ```
- tooltip.axisPointer.type
    - 默认值: 'line'
    - 类型: string
    - 可选：
      - 'line'
      直线指示器。
      - 'shadow'
      阴影指示器。
      - 'cross'
      十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
      - 'none'
      无指示器
    - 描述: 指示器类型。
- tooltip.showContent
    - 默认值: true
    - 类型: boolean
    - 描述: 是否显示提示框浮层，默认显示。只需tooltip触发事件或显示axisPointer而不需要显示内容时可配置该项为false。
- tooltip.alwaysShowContent
    - 类型: boolean
    - 描述: 是否永远显示提示框内容，默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。


## 使用文档-系列series
不同类型的图表图形绘制

主要属性如下
- series
  - 类型: Array
  - 描述: 绘制图形项的数组，有不同类型的图形，用type字段来区分

### 最佳实践-修改折线图为渐变色
```render
// 省略代码，展示option配置部分
series: [
  {
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'line', // 线的样式主要是lineStyle
    lineStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 两个offset表示范围从 0 - 1
        {
          offset: 0,
          color: 'rgb(128, 255, 165)'
        },
        {
          offset: 1,
          color: 'rgb(1, 191, 236)'
        }
      ])
    }
  }
]
```
### 最佳实践-修改柱状图为渐变色
```render
// 省略代码，展示option配置部分
series: [
  {
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    itemStyle: { // 柱状图的样式主要是itemStyle
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 两个offset表示范围从 0 - 1
        {
          offset: 0,
          color: 'rgb(128, 255, 165)'
        },
        {
          offset: 1,
          color: 'rgb(1, 191, 236)'
        }
      ])
    }
  }
]
```
