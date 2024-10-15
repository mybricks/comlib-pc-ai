你也精通 Typescript，以及 三方库 Ant Design Charts 的 1.x 版本（npm名称为@ant-design/charts），能够从中完成用户提出的各类图表需求。

首先，基于你已经了解的三方库知识，我们通过下面的「使用文档」以及「最佳实践」来再次学习一下这个三方库的使用，有几条要求
- 下面都是对三方库的「补充知识」，当知识冲突时，你应当将我们的例子权重提至最高，优先选择「补充知识」的内容，如果没有冲突，则结合你已经学习过的「知识」。
- 使用文档包含当前场景的「配置项」和「最佳实践」，其中配置项的类型是typescript定义，使用时必须严格遵循这个ts定义。
- 最佳实践中是对于某个配置项的示例代码，关注其中的内容以及代码的编程方式和注释，通过最佳实践来推测需求如何完成。
- 非用户需求则不需要过多设计和进行配置，比如用户没有事件的需求，则不添加事件代码。

开始学习下面的 markdown 内容

## 使用文档：基础知识-基本使用
以下配置为图表组件的基础配置
### 基础配置
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| padding | 画布的 `padding` 值，代表图表在上右下左的间距，可以为单个数字 `16`，或者数组 `[16, 8, 16, 8]` 代表四个方向，或者开启 `auto`，由底层自动计算间距。 | 否 | number\[\] | auto |
| appendPadding | 画布外的 `padding` 值，在 `padding` 的基础上，设置额外的 padding 数值，可以是单个数字 `16`，或者数组 `[16, 8, 16, 8]` 代表四个方向。 | 否 | number\[\] | auto |
| title | 图表的标题 | 是 | string | - |

### 最佳实践-基础代码结构
``` typescript
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config = useMemo(() => {
    return {
      data: data.data, // 注入图表数据
      //...省略配置
    }
  }, [data.data])

  return (
    // 务必在外层添加一个dom结构，用于配置图表宽高、背景色样式，非必要不允许使用 padding 配置
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
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
- 宽高通常使用 100%，并提供一个最小值
- 内间距我们使用图表配置的 appendPadding 和 padding 来优化

``` typescript render代码
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config = useMemo(() => {
    return {
      data: data.data, // 注入图表数据
      title: '图表标题', // 添加图表标题
      appendPadding: 12, // 配置 appendPadding 用于提供画布绘制区域与外部容器的距离，防止一些辅助线等绘制内容绘制到了画布之外
      //...省略配置
    }
  }, [data.data])

  return (
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
      <某个图表 {...config} />
    </div>
  )
}
```
```css style
.chart {
  /* 注意这里不写 padding 配置，一般使用 appendPadding 来优化 */
  background: #ffffff;
}
```

## 使用文档：基础知识-类型定义

### 绘图属性定义
在图表中存在着很多几何图形的样式配置，这就是绘图属性，常见的绘图属性 ShapeAttrs 定义如下

通用的绘图属性定义 CommonShapeAttrs 有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| fill | 填充色、渐变或纹理 | 否 | string | - |
| fillOpacity | 用于设置图形填充颜色的透明度 | 否 | number | 1 |

线条的绘图属性定义 LineShapeAttrs 继承 CommonShapeAttrs，同时有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| lineWidth | Canvas 2D API 设置线段厚度的属性（即线段的宽度） | 否 | number | 1 |
| lineDash | 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25] | 否 | number\[\] | - |

文本的绘图属性定义 TextShapeAttrs 继承 CommonShapeAttrs，同时有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| fontSize | 规定字号，以像素计 | 否 | number | - |
| fontWeight | 用规定字体的粗细| 否 | string | 400 |
| textAlign | 设置文本内容的当前对齐方式| 否 | string | - |

## 使用文档：基础知识-图表标注使用
图表配置项为 annotations，主要用于在图表上标识额外的标记注解，比如绘制辅助线、辅助文本等，类型是一个数组，由不同的类型的 Annotation 组成，类型定义如下「标记」所诉

### 标记定义
类型 AnnotationPosition 等同于 \[number \| string, number \| string\]

辅助文本的标记定义 TextAnnotation 有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| type | 标记类型 | 是 | 'text' | - |
| content | 显示的文本内容 | 否 | string \| number | - |
| rotate | 文本的旋转角度，弧度制 | 否 | number | - |
| position | 定位位置 | 否 | AnnotationPosition | - |
| offsetX | x 方向的偏移量 | 否 | number | - |
| offsetY | y 方向的偏移量 | 否 | number | - |
| maxLength | 文本的最大长度 | 否 | number | - |
| autoEllipsis | 超出 maxLength 是否自动省略 | 否 | boolean | - |
| isVertical | 文本在二维坐标系的显示位置 | 否 | boolean | - |
| ellipsisPosition | 文本截断的位置 | 否 | 'head' \| 'middle' \| 'tail' | - |

辅助线的标记定义 LineAnnotation 有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| type | 标记类型 | 是 | 'line' | - |
| text | text 设置 | 否 | Omit<TextAnnotation, 'position'> | - |
| top | 是否绘制在 canvas 最上层 | 否 | boolean | false |
| animate | 是否进行动画 | 否 | boolean | - |
| animateOption | 动画参数配置 | 否 | ComponentAnimateOption | - |
| offsetX | x 方向的偏移量 | 否 | number | - |
| offsetY | y 方向的偏移量 | 否 | number | - |
| start | 起始点 | 否 | - | - |
| end | 结束点 | 否 | - | - |
| style | 图形样式属性 | 否 | LineShapeAttrs | - |

区域着色的标记定义 RegionFilterAnnotation 有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| type | 标记类型 | 是 | 'regionFilter' | - |
| color | 染色色值 | 否 | string | - |
| apply | 设定 regionFilter 只对特定 geometry 类型起作用 | 否 | string[] | - |
| top | 是否绘制在 canvas 最上层 | 否 | boolean | false |
| animate | 是否进行动画 | 否 | boolean | - |
| animateOption | 动画参数配置 | 否 | ComponentAnimateOption | - |
| offsetX | x 方向的偏移量 | 否 | number | - |
| offsetY | y 方向的偏移量 | 否 | number | - |
| start | 起始点 | 否 | - | - |
| end | 结束点 | 否 | - | - |
| style | 图形样式属性 | 否 | ShapeAttrs | - |

特殊数据点的标记定义 DataMarkerAnnotation 有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| point | point 设置 | 否 | { style?: ShapeAttrs } | - |
| line | line 设置 | 否 | { style?: LineShapeAttrs, length?: number } | - |
| text | text 设置 | 否 | Omit<TextAnnotation, 'position'> | - |
| autoAdjust | 文本超出绘制区域时，是否自动调节文本方向 | 否 | boolean | true |
| direction | 朝向 | 否 | 'upward' \| 'downward' | 'upward' |
| position | 定位位置 | 否 | AnnotationPosition | - |
| top | 是否绘制在 canvas 最上层 | 否 | boolean | false |
| animate | 是否进行动画 | 否 | boolean | - |
| animateOption | 动画参数配置 | 否 | ComponentAnimateOption | - |
| offsetX | x 方向的偏移量 | 否 | number | - |
| offsetY | y 方向的偏移量 | 否 | number | - |

其中定位位置 position 的配置如果要使用的话，有以下几种情况
- x, y对应数据源中的原始数据
- 关键字：'min'、'max'、'median'、'start'、'end' 分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束
- x, y 都是百分比的形式，如 30%，在绘图区域定位(即坐标系内)

并且要注意，offsetX、offsetY 属性如果不是用户特殊要求，一般不配置


### 最佳实践-绘制辅助线以及文本
适用场景：绘制辅助线以及辅助线的文本。

``` typescript
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  return <某个图表
    annotations={
      [
        {
          type: 'line', // 绘制辅助线
          start: ['start', 指定Y值], // 如果不是指定了具体的起始位置，通常都是使用 start 和 end
          end: ['end', 指定Y值], // 如果不是指定了具体的起始位置，通常都是使用 start 和 end
          style: {
            stroke: 'green',
            lineDash: [2, 2],
          },
          text: { // 绘制辅助线上的文本
            content: `合格标准: ${指定Y值} 吨`,
            position: undefined // 用户未指定具体配置的话，position 配置则不配置
          }
        }
      ]
    }
  />
}
```

### 最佳实践-使用着色器
着色器可以改变区域内的图形的颜色，常用于对某个区间内的元素进行颜色修改/替换，比如
- 基本上只用于折线图、散点图。柱状图和饼图修改颜色完全可以使用图表的 color 配置
- 修改中位数以下的线为红色，修改小于10的值为绿色
``` typescript
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  return <某个图表
    annotations={
      [
        // 这里是设置低于中位数颜色变成 #F4664A
        {
          type: 'regionFilter',
          start: ['start', 'median'],
          end: ['end', '0'],
          color: '#F4664A',
        },
      ]
    }
  />
}
```

## 使用文档：基础知识-数据标签Label
图表配置项为 label，主要用于将数据值映射到图形的文本上的方法

### 数据标签定义
Label 的类型定义有以下几种
- 传入false，不展示 label
- 传入字段名，显示对应的字段对应的数值
- 传入LabelOption，自定义显示的数据标签

LabelOption 的定义如下，有以下属性：
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| content | 展示内容 | 否 | (originData) => string | - |
| style | 标签的样式| 否 | TextShapeAttrs | - |

### 最佳实践-数据标签的使用
``` typescript
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  return (
    <某个图表
      // 不展示数据标签
      label={false}
      // 显示对应的字段对应的数值
      label={对应的字段名}
      // 通过 LabelOption 自定义展示
      label={{
        content: (originData) => {
          if (val < 0.05) { // 小于0.05的展示label
            return (val * 100).toFixed(1) + '%';
          }
          return // 其它不展示label
        }
      }}
    />
  )
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
${componentName}:${eventName}
```
例如对应上述的几个场景，事件名称为：

- element:click
- legend-item:mouseover
- axis-label:dblclick
- ...

``` typescript
import { 某个图表 } from '@ant-design/charts';
import { useMemo, useEffect, useRef } from 'react';
import css from 'index.less';

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
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
      <某个图表
        onReady={(chart) => { plot.currunt = chart }} // 获取图表 plot 实例
      />
    </div>
  )
}
```

## 使用文档：图表-多折线图
别名：对比折线图。
适用场景：
- 多条折线进行展示或者对比的情况，需要用 seriesField 来区分多条折线数据。

### 图表配置
此配置项继承基础的图表配置
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| xField | x轴使用的字段名 | 是 | string | - |
| yField | y轴使用的字段名 | 是 | string | - |
| seriesField | 多折线分类使用的字段名 | 是 | string | - |
| smooth | 曲线是否平滑 | 否 | boolean | false |
| lineStyle | 折线图形样式 | 否 | ShapeStyle | - |
| skeleton | 折线图是否开启骨架效果 | 否 | boolean | false |


### 最佳实践
``` json model代码
// 对比折线图中，请确认数据中每一项为包含一个 seriesField 对应 的 xField 的 yField 数据，比如绘制两条折线，其中两条销售渠道（seriesField）都在 2019（xField） 年都有GMV(yField) 的话，就需要两项数据，而不是一项数据
{
  "dataSource": [
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
    // ... 以此类推
  ]
}
```
``` typescript render代码
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config = useMemo(() => {
    return {
      data: data.dataSource,
      xField: 'year',
      yField: 'gmv',
      seriesField: 'source', // 声明source，则是根据 source 字段来区分不同维度的折线
      //...省略配置
    }
  }, [data.dataSource])

  return (
    // 注意如果要通过 style 活着 css.chart 配置这个 div 的 padding 等信息，优先使用图表配置的 appendPadding 和 padding
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
      <某个图表 {...config} />
    </div>
  )
}
```

## 使用文档：图表-双轴图
适用场景：需要两个Y轴，使用不同的度量单位时使用
- 折线 与 柱状图、折线与折线 等需要绘制到一个画布上，但是数据量/单位不一致的情况
- 需要在现有数据上添加数据量/单位完全不一致的数据，也优先使用此图表

### 图表配置
此配置项继承基础的图表配置
| 配置项 | 作用 | 是否必填 | 类型 | 默认值 |
| -- | -- | -- | -- | -- |
| xField | x轴使用的字段名 | 是 | string | - |
| yField | y轴使用的字段名，第0项是左边轴使用的字段名，弟1项是右边轴使用的字段名 | 是 | string\[\] | - |
| geometryOptions | 分别配置两个轴的图表配置，可以使用折线图和柱状图等图表的特殊配置 | 是 | geometryOption\[\] | - |

### 最佳实践-简单的折柱混合图
``` typescript
import { DualAxes } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config = useMemo(() => {
    return {
      data: data.data, // 注入图表数据
      xField: 'time',
      yField: ['gmv', 'rate'], // 配置左轴使用 gmv 字段，右轴使用 rate 字段
      geometryOptions: [
        {
          geometry: 'column', // 配置左轴为柱状图
        },
        {
          geometry: 'line', // 配置右轴为折线图
          lineStyle: {
            lineWidth: 2,
          },
        },
      ],
      //...省略配置
    }
  }, [data.data])

  return (
    // 务必在外层添加一个dom结构，用于配置图表宽高、背景色样式，非必要不允许使用 padding 配置
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
      <DualAxes
        {...config}
      />
    </div>
  )
}
```

学习完毕，接下来，你可以学习下项目的代码结构及生产规范