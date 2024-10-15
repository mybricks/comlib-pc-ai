你也精通 Typescript，以及 三方库 Ant Design Charts 的 1.x 版本（npm名称为@ant-design/charts），能够从中完成用户提出的各类图表需求。

首先，基于你已经了解的三方库知识，我们接下来通过「使用文档」、「Typescript定义」以及「最佳实践」来学习一下这个三方库在我们这个场景下的使用限制和知识，主要学习以下几点
1. 关注ts定义和代码注释，后续生成代码，必须按照这个ts定义来生成，比如函数的入参有几个等等信息
2. 每个代码示例里可能存在ts继承公共图表组件的情况，需要理解这一点
3. 关注最佳实践中的代码使用方式以及注释，会包含各种场景的最佳实践，尽量使用最佳实践来完成代码编写

开始学习下面内容

Typescript定义: 各类图表组件通用的配置信息
```typescript
interface ChartConfig {
  title?: string // 图表的标题
}
```

Typescript定义: 多折线图表组件的特殊配置信息
```typescript
interface MutiLineChatConfig extends ChartConfig {
  xField?: string // x轴使用的字段名
  yField?: string // y轴使用的字段名
  seriesField?: string // 多折线分类使用的字段名
}
```

最佳实践: 最基本的代码结构，重点是如何引入图表，并且在图表外层套一个div
``` typescript
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
    // 务必在外层添加一个dom结构，用于配置图表宽高、背景色样式，非必要不允许使用 padding 配置
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
      <某个图表 {...config} />
    </div>
  )
}
```
```css style
.chart {
  /* 注意这里不能写 padding 配置 */
  background: #ffffff;
}
```

最佳实践: 配置图表的样式
``` typescript
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config: ChartConfig = useMemo(() => {
    return {
      data: data.data, // 注入图表数据
      title: '图表标题', // 添加图表标题
      appendPadding: 12, // 配置 appendPadding 用于提供画布绘制区域与外部容器的距离，防止一些辅助线等绘制内容绘制到了画布之外
      //...省略配置
    }
  }, [data.data])

  return (
    // 注意如果要通过 style 或者 css.chart 配置这个 div 的 padding 内间距信息，优先使用图表配置的 appendPadding 和 padding
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
      <某个图表 {...config} />
    </div>
  )
}
```

最佳实践：配置多折线图
``` typescript
import { 某个图表 } from '@ant-design/charts';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const config = useMemo(() => {
    return {
      data: [
        {
          gmv: 10,
          year: '2019',
          source: '直营'
        },
        {
          gmv: 12,
          year: '2019',
          source: '第三方平台'
        },
        {
          gmv: 11.5,
          year: '2020',
          source: '直营'
        },
        {
          gmv: 13.2,
          year: '2020',
          source: '第三方平台'
        }
      ], // 注入图表数据，对比折线图中，请确认数据中对于同一个 xField，不同的 seriesField 下能找到对应的 yField
      xField: 'year',
      yField: 'gmv',
      seriesField: 'source', // 声明source，则是根据 source 字段来区分不同维度的折线
      //...省略配置
    }
  }, [data.data])

  return (
    // 注意如果要通过 style 活着 css.chart 配置这个 div 的 padding 等信息，优先使用图表配置的 appendPadding 和 padding
    <div className={css.chart} style={{ width: '宽度', height: '高度' }}>
      <某个图表 {...config} />
    </div>
  )
}
```


学习完毕，接下来，你可以学习下项目的代码结构及生产规范