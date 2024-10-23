## 使用文档：旭日图

旭日图擅长展示不同层级的数据，并且能够表达数据的层级和归属关系。

包含图表：旭日图

### 最佳实践-旭日图

```render
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import css from 'index.less'

export default ({ data }) => {
  const option = useMemo(() => {
    return {
      // 省略配置
      tooltip: {}, // 旭日图默认开启鼠标悬浮提示
      series: [
        {
          type: 'sunburst',
          label: {
            // 开启标签显示
            show: true,
            position: 'inside', // 旭日图默认将label显示在内部
          },
          data: [
            {
              name: '动作',
              value: 300,
              children: [
                {
                  name: '侏罗纪公园',
                  value: 100,
                },
                {
                  name: '复仇者联盟',
                  value: 200,
                },
              ],
            },
            {
              name: '喜剧',
              value: 200,
              children: [
                {
                  name: '死亡诗社',
                  value: 100,
                },
                {
                  name: '大话西游',
                  value: 100,
                },
              ],
            },
          ],
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
