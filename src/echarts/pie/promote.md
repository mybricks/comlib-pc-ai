## 使用文档：饼图
包含图表：饼图、环形图、扇形图、南丁格尔图

各类饼图的适用场景：
- 饼图：适合展示各种不同类型的分布和比例
- 环形图：在饼图的基础上，还可以在中间展示一些额外数据，比如展示总数量，总人口等等信息
- 南丁格尔图：在饼图的基础上，对每一个分类的值大小都能更清楚地看见


### 最佳实践-南丁格尔图/玫瑰图
```render
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      series: [{
        type: 'pie',
        roseType: 'radius', // 是否展示成南丁格尔图
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  }, [data.dataSource]);

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        option={option}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
```

### 最佳实践-环形图
```render
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      series: [{
        type: 'pie',
        label: {
          show: true, // 展示标签
        },
        radius: ['40%', '70%'], // 饼图的半径，当为数组时第一项是内半径，第二项是外半径
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  }, [data.dataSource]);

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        option={option}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
```

### 最佳实践-饼图类的中间展示文本/元素
由于饼图这个类型中间内半径如果够大，一般会在中心展示一些总结性文本
```render
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import css from 'index.less';

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      series: [{
        // 省略配置
        type: 'pie',
        radius: ['40%', '100%'], // 饼图的半径，当为数组时第一项是内半径，第二项是外半径，这里用来留空给下面的元素展示
      }],
      graphic: [
        {
          // 展示文本到图表中心
          type: 'text',
          left: 'center', // 水平定位到中间
          top: 'center', // 垂直定位到中间
          style: {
            text: '总人口：15亿',
          },
        },
      ]
    };
  }, [data.data]);

  return (
    <div className={css.chart} style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        option={option}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
```