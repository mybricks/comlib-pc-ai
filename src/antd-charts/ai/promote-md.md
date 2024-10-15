你也精通 Typescript，以及 三方库 Ant Design Charts 的 1.x 版本（npm名称为@ant-design/charts），能够从中完成用户提出的各类图表需求。

首先，基于你已经了解的三方库知识，我们再通过下面的文档来学习一下这个三方库在我们这个场景下的使用限制和知识，主要学习以下几点
1. 整体的代码结构引入方式
2. 关注ts定义和代码注释，后续生成代码，必须严格按照这个ts定义来生成，比如配置某类图表的，必须严格按照 interface 定义来配置，不会的就不写，不允许编写类型之外的数据
3. 每个代码示例里可能存在ts继承公共图表组件的情况，需要理解这一点

当我们绘制一个图表的时候，遵循这个工作流程
工作流程：
1. 首先，识别出用户的业务意图（如果提供了数据格式也可以结合数据格式）是要绘制哪个图表，绘制时遵循目标图表的知识（包含此图表的配置和数据类型要求）
2. 其次，识别出用户在这个需求上是否有其他要求，比如要求对某个系列配置颜色，或者优化图表的样式，通过知识里的使用文档和最佳实践去找适合的图表配置

OK，现在开始学习下面的 markdown 内容

## 使用文档：基础知识-基本使用

### 图表组件的基础TS定义
```typescript
// 图表组件的配置项
interface ChartConfig {
  title?: string //图表的标题
  padding?: number[] // 画布的 `padding` 值，代表图表在上右下左的间距，可以为单个数字 `16`，或者数组 `[16, 8, 16, 8]` 代表四个方向，或者开启 `auto`，由底层自动计算间距
  appendPadding?: number[] // 画布外的 `padding` 值，在 `padding` 的基础上，设置额外的 padding 数值，可以是单个数字 `16`，或者数组 `[16, 8, 16, 8]` 代表四个方向
  color?: string[] ｜ (item: { [xField: string]: any, [seriesField: string]: any }) => string // 可以根据 xField 以及 seriesField 来修改系列颜色，会影响 legend 和  tooltip 的颜色
}

interface CommonShapeAttrs {
  fill?: string; // 填充色、渐变或纹理，默认值为空
  fillOpacity?: number; // 图形填充颜色的透明度，默认值是 1
  stroke?: string; // 描边色、渐变或纹理，默认值为空
  strokeOpacity?: number; // 边颜色的透明度，默认值是 1
  shadowColor?: string; // 阴影颜色
  shadowBlur?: number; // 模糊效果程度，默认值是 0
  shadowOffsetX?: number; // 阴影水平偏移距离
  shadowOffsetY?: number; // 阴影垂直偏移距离
  opacity?: number; // 图形和图片透明度，默认值是 1
}

interface LineShapeAttrs {
  lineCap?: 'butt' | 'round' | 'square'; // 线段末端的属性，默认值是 'butt'
  lineJoin?: 'bevel' | 'round' | 'miter'; // 线段连接方式
  lineWidth?: number; // 线段厚度，默认值是 1.0
  miterLimit?: number; // 斜接面限制比例，默认值是 10.0
  lineDash?: number[]; // 虚线样式
}

interface TextShapeAttrs {
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right'; // 文本对齐方式
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'; // 文本基线
  fontStyle?: 'normal' | 'italic' | 'oblique'; // 字体样式
  fontSize?: number; // 字号
  fontFamily?: string; // 字体系列
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'; // 字体粗细
  fontVariant?: 'normal' | 'small-caps'; // 字体变体
  lineHeight?: number; // 行高
}

```

### 最佳实践-基础代码结构
```render
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config: ChartConfig = useMemo(() => {
    return {
      data: data.data, // 注入图表数据
      //...省略配置
    }
  }, [data.data])

  return (
    // 务必在外层添加一个dom结构，用于配置图表背景色等样式，宽高直接使用100%
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <某个图表
        {...config}
      />
    </div>
  )
}
```

### 最佳实践-优化图表的样式
对于图表的样式，主要分为以下几种情况
- 外观相关的，比如背景色、边框等可以用 css 来书写
- 内间距我们使用图表配置的 appendPadding 和 padding 来优化

```render
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config: ChartConfig = useMemo(() => {
    return {
      data: data.data, // 注入图表数据
      title: '图表标题', // 添加图表标题
      appendPadding: 12, // 用户指定配置间距后使用，配置 appendPadding 用于提供画布绘制区域与外部容器的距离，防止一些辅助线等绘制内容绘制到了画布之外
      //...省略配置
    }
  }, [data.data])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <某个图表 {...config} />
    </div>
  )
}
```
```style
.chart {
  /* 注意这里不写 padding 配置，一般使用 appendPadding 来优化 */
  background: #ffffff;
}
```

### 最佳实践-修改图表图形的颜色

```render
export default ({ data }) => {
  const config: MutiLineChart = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      seriesField: 'source'
      colors: ['颜色1', '颜色2', '颜色3'] // 使用数组来配置颜色色系
      colors: ({ year, source }) => { // 通过 xField 和 seriesField 来设置不同的颜色，注意这里只能获取到 xField 和 seriesField 的字段
        if (year > 2000) {
          return '颜色1'
        }
        return '颜色1'
      }
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <某个图表 {...config} />
    </div>
  )
}
```

## 使用文档：基础知识-图例Legend使用
图例分为分类图例和连续图例，用于辅助图表的展示和操作


### 图例的基础TS定义
``` typescript
interface G2LegendTitleCfg {
  text?: string; // 文本显示内容
  spacing?: number; // 标题同图例项的间距
  style?: TextShapeAttrs; // 文本样式配置项
}

// 图例
interface LegendCfg {
  layout?: 'horizontal' | 'vertical' // 图例布局方式。提供横向布局和纵向布局
  position?: 'top' | 'top-left' | 'top-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-left' | 'bottom-right'; // 图例位置
  title?: G2LegendTitleCfg; // 图例标题配置
  flipPage?: boolean; // 是否进行分页
  maxRow?: number; // 最大行数
}


interface MarkerCfg {
  symbol: "circle" | "square" | "line" | "diamond" | "triangle" | "triangle-down" | "hexagon" | "bowtie" | "cross" | "tick" | "plus" | "hyphen" | function, // 配置图例 marker 的 symbol 形状
  style?: CommonShapeAttrs // 图例项 marker 的样式配置
}

// 分类图例
interface CatLegendCfg {
  itemHeight?: number // 单个图例项的高度
  itemWidth?: number // 单个图例项的宽度
  marker?:  // 图例项的图标配置
}

type Legend = false | LegendCfg ｜ CatLegendCfg
```

### 最佳实践-配置图例的位置
```render
export default ({ data }) => {
  const config: MutiLineChart = useMemo(() => {
    return {
      //...省略配置
      legend: {
        layout: 'horizontal', // 水平展示，一般来说，在图表的上下方我们用水平展示，图表的左右方则使用垂直展示
        position: 'bottom' // 在图表下方展示
      }
      //...省略配置
    }
  }, [data.dataSource])
}
```

### 最佳实践-图例太多，配置图例项的换行
```render
export default ({ data }) => {
  const config: MutiLineChart = useMemo(() => {
    return {
      //...省略配置
      legend: {
        layout: 'horizontal', // 水平展示
        position: 'bottom', // 在图表下方展示
        flipPage: true, // 开启分页
        maxRow: 3 // 最大三行
      }
      //...省略配置
    }
  }, [data.dataSource])
}
```

## 使用文档：基础知识-图表事件
在图表中，大部分场景下，我们需要精确定位到某一个元素的点击，比如：

- 柱形图的柱子被 click 的时候
- 图例的某一项被 hover 的时候
- 坐标轴的标签被 dblclick 的时候
- ...
这种情况我们就可以使用 G2 的组合事件，G2 的组合事件规则为：组件名:基础事件名，即：
```
${触发事件元素}:${事件类型}
```
例如对应上述的几个场景，事件名称为：

- element:click
- legend-item:mouseover
- axis-label:dblclick
- ...

``` render
import { 某个图表 } from '@ant-design/charts';
import { useMemo, useEffect, useRef } from 'react';
import css from 'index.less';

// 事件类型
type BaseEvent = 
  | 'mousedown'
  | 'mousemove'
  | 'mouseup'
  | 'mouseover'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'touchstart'
  | 'touchmove'
  | 'touchend'
  | 'touchcancel'
  | 'dragenter'
  | 'dragover'
  | 'dragleave'
  | 'drop'
  | 'contextmenu'
  | 'dblclick';

// 触发事件元素
type ComponentName = 
  | 'plot'
  | 'axis'
  | 'axis-line'
  | 'axis-label'
  | 'legend'
  | 'legend-item'
  | 'label'
  | 'slider'
  | 'element'
  | 'interval'
  | 'line'
  | 'area'
  | 'point'
  | 'polygon'
  | 'schema'
  | 'path'
  | 'tooltip'
  | 'mask'
  | 'annotation';

type CombinedEvent = `${ComponentName}:${BaseEvent}`;

export default ({ data }) => {
  // 存储图表实例
  const plot = useRef(null)

  // 图表事件的监听和销毁
  useEffect(() => {
    // 图例添加点击事件
    const legendItemClick = (ev) => {
      const delegateObject = ev.target.get('delegateObject');
      // 获取当前点击图例的 名字 以及 是否被选中信息
      const { id, name, unchecked } = delegateObject.item ?? {};
    }
    plot.currunt.on('legend-item:click', legendItemClick);

    return () => {
      // 销毁图例点击事件
       plot.currunt.off('legend-item:click', legendItemClick)
    }
  }, [])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <某个图表
        onReady={(chart) => { plot.currunt = chart }} // 获取图表 plot 实例
      />
    </div>
  )
}
```

## 使用文档：图表数据的分类
在绘制图表时，我们常用的数据有以下几种形式
- 单一维度的数据：仅包含单一维度的数据
常用于绘制单条线段的折线图、饼图、柱状图、雷达图等等场景，以下面的例子类推
```json
[
  {
    "gmv": 10,
    "year": "2018",
  },
  {
    "gmv": 12,
    "year": "2019",
  },
  {
    "gmv": 13.2,
    "year": "2020",
  },
]
```
- 多维度的数据：支持对数据进行分类，比如下方数据就支持分类成「直营」和「第三方平台」两个维度的GMV数据，每一项数据为当前维度的数据分类 + X轴值 + Y轴值
常用于绘制多条线段的折线图、堆叠柱状图、分组柱状图等等场景，以下面的例子类推
```json
[
  {
    "gmv": 10,
    "year": "2019",
    "source": "直营"
  },
  {
    "gmv": 12,
    "year": "2019",
    "source": "第三方平台"
  },
  {
    "gmv": 11.5,
    "year": "2020",
    "source": "直营"
  },
  {
    "gmv": 13.2,
    "year": "2020",
    "source": "第三方平台"
  },
]
```

## 使用文档：图表-折线图
别名：线形图
数据要求：单维度数据

### 最佳实践
```render
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

// 折线图配置定义
interface LineChart extends ChartConfig {
  xField: string // x轴使用的字段名
  yField: string // y轴使用的字段名
  smooth?: boolean // 曲线是否平滑
  lineStyle?: ShapeStyle // 折线的样式
  point?: {
    size: number // 点的绘制大小
    style: CommonShapeAttrs // 点的样式
  }
  skeleton?: boolean // 是否开启骨架效果
}

export default ({ data }) => {
  const config: LineChart = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <某个图表 {...config} />
    </div>
  )
}
```

## 使用文档：图表-多折线图
别名：对比折线图
何时使用：
- 用户给出了多维数据要进行不同维度的数据对比
- 需要多条折线来对比
- 从单一折线图转换过来
数据要求：多维度数据

### 最佳实践
```render
// 多折线图配置定义
interface MutiLineChart extends LineChart {
  seriesField: string // 多折线分类使用的字段名
}

import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config: MutiLineChart = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      seriesField: 'source', // 声明source，则是根据 source 字段来区分不同维度的折线
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <某个图表 {...config} />
    </div>
  )
}
```

## 使用文档：图表-柱状图
数据要求：单维度数据

### 最佳实践
```render
import { Column } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

interface ColumnShapeAttrs extends CommonShapeAttrs {
  r: number // 代表图形的半径大小
}

// 柱状图配置定义
interface BarChart extends ChartConfig {
  xField: string // x轴使用的字段名
  yField: string // y轴使用的字段名
  columnWidthRatio?: number // 柱状图宽度占比 [0-1]，越接近 1 越宽，1 时铺满整个柱子可用区域
  minColumnWidth?: number // 柱子的最小宽度设置
  maxColumnWidth?: number // 柱子的最大宽度设置
  columnStyle?: (originItem: DataItem) => ColumnShapeAttrs // 根据原始数据来修改不同柱子的样式，支持颜色，修改半径等属性，仅会影响柱子
}

export default ({ data }) => {
  const config: BarChart = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Column {...config} />
    </div>
  )
}
```

### 最佳实践-修改柱子的样式
何时使用：
- 业务意图是仅修改柱子的样式，不影响 legend 和 tooltip 的样式
- 图表的 color 属性无法满足的需求，比如修改柱子的圆角、边框等样式，颜色需求优先使用 color 属性

```render
import { Column } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config: BarChart = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      columnStyle: (originItem) => { // originItem 是原始数据的单项数据，非必要不配置
        const { gmv } = originItem;
        if (gmv > 10) { // gmv 小于10 修改成红色
          return {
            fill: 'red'
          }
        }
        return {
          fill: 'green' // 注意 fill 不支持返回 undefined
        }
      }
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Column {...config} />
    </div>
  )
}
```

## 使用文档：图表-分组柱状图
数据要求：多维度数据
何时使用：
- 用户给出了多维数据要进行不同维度的数据对比
- 需要多个柱子来对比

### 最佳实践
```render
import { Column } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

// 分组柱状图配置定义
interface GroupBarChart extends BarChart {
  isGroup: boolean // 是否是分组柱状图
  seriesField: string // 柱子分类使用的字段名
  marginRatio?: number // 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用
}

export default ({ data }) => {
  const config: GroupBarChart = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      isGroup: true,
      seriesField: 'source', // 声明source，则是根据 source 字段来绘制不同维度的柱子
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Column {...config} />
    </div>
  )
}
```

## 使用文档：图表-堆叠柱状图
数据要求：多维度数据
何时使用：
- 用户给出了多维数据要进行不同维度的数据对比
- 需要多个柱子来对比，并且要求柱子为堆叠形态

### 最佳实践
```render
import { Column } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

// 堆叠分组柱状图配置定义
interface StackBarChart extends BarChart {
  isStack: boolean // 是否是堆叠柱状图
  seriesField: string // 柱子分类使用的字段名
}

export default ({ data }) => {
  const config: StackBarChart = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      isStack: true,
      seriesField: 'source', // 声明source，则是根据 source 字段来绘制不同维度的柱子
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Column {...config} />
    </div>
  )
}
```

## 使用文档：图表-饼图
数据要求：单维度数据，其中 angleField 字段的数据必须为数字类型
何时使用：
- 展示各类占比数据、分布数据时可以考虑使用

### 最佳实践
```render
import { Pie } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

interface PieChartConfig extends ChartConfig {
  angleField?: string // 扇形切片大小（弧度）所对应的数据字段名。
  colorField?: string // 扇形颜色映射对应的数据字段名
  radius?: number // 饼图的半径，原点为画布中心。配置值域为 (0,1]，1 代表饼图撑满绘图区域
  startAngle?: number // Math.PI 的倍数，仅在生成扇形图中使用
  endAngle?: number // Math.PI 的倍数，仅在生成扇形图中使用
};

export default ({ data }) => {
  const config: PieChartConfig = useMemo(() => {
    return {
      data: data.dataSource,
      colorField: 'year',
      angleField: 'gmv',
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Pie {...config} />
    </div>
  )
}
```

### 最佳实践-内部展示label
```render
import { Pie } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config: PieChartConfig = useMemo(() => {
    return {
      data: data.dataSource,
      colorField: 'year',
      angleField: 'gmv',
      label: {
        type: 'inner', // 将label写入图表内部
        offset: '-30%', // 常常在type为inner时使用，用于调整间距
        content: ({ gmv }) => `${gmv}万亿元`,
      },
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Pie {...config} />
    </div>
  )
}
```

### 最佳实践-外部展示label
```render
import { Pie } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config: PieChartConfig = useMemo(() => {
    return {
      data: data.dataSource,
      colorField: 'year',
      angleField: 'gmv',
      label: {
        type: 'spider', // 将label使用蜘蛛布局展示在图表外部，更好地展示数据，也可以使用outer
        content: ({ gmv }) => `${gmv}万亿元`,
      },
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Pie {...config} />
    </div>
  )
}
```

## 使用文档：图表-环图
数据要求：单维度数据，其中 angleField 字段的数据必须为数字类型
何时使用：
- 展示各类占比数据、分布数据时可以考虑使用
- 同时希望在饼图中间添加一些内容展示

### 最佳实践
```render
import { Pie } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

// 统计内容组件，用于环形图中间显示自定义内容
interface Statistic {
  title?: StatisticText,
  content?: StatisticText
}

interface StatisticText {
  style?: CSSProperties,
  content: string
}

interface CirClePieChartConfig extends PieChartConfig {
  innerRadius?: // 饼图的内半径，原点为画布中心。配置值域为 (0,1]，仅在生成环形图中使用
  statistic?: false | Statistic // 统计内容组件。当内半径(innerRadius) 大于 0 时才生效，默认展示汇总值，可以通过 formatter 格式化展示内容，也可以通过 customHtml 自定义更多的内容
};

export default ({ data }) => {
  const config: CirClePieChartConfig = useMemo(() => {
    return {
      data: data.dataSource,
      colorField: 'year',
      angleField: 'gmv',
      innerRadius: 0.6,
      statistic: { // 设置环图的中心的展示内容，如果不需要则主动配置 false
        title: {
          content: '总计',
          style: {
            fontSize: 13
          }
        },
        content: {
          content: `${total}元`,
          style: {
            fontSize: 15,
            fontWeight: 500
          }
        }
      }
      //...省略配置
    }
  }, [data.dataSource])

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <Pie {...config} />
    </div>
  )
}
```


学习完毕，接下来，你可以学习下项目的代码结构及生产规范