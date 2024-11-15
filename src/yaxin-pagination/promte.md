# 类库
- 名称：customDesign


## Pagination 组件
采用分页的形式分割长列表，每次只加载一个页面

### 何时使用
- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

### API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| pageSize | 每页条数 | number | - |  |
| current | 当前页数 | number | - |  |
| limitOptions | 指定每页可以显示多少条 | string[] | [10, 20, 50, 100] |  |
| total | 数据总数 | number | - |  |
| maxPagerCount | 最大页数 | number | - |  |
| totalPageCount | 总页数 | number | - |  |
| currentPager | 默认当前页数 | number | - |  |
| inputPager | 跳转页数 | number | - |  |
| showGotoPager | 是否展示可以快速跳转到某页 | boolean | - |  |
| showSelectSize | 是否展示pageSize 切换器 | boolean | - |  |
| classes | 自定义样式类 | Classes | - |  |
| onChangePager | 页码或 pageSize 改变的回调, 参数是改变后的页码及每页条数 | function(current, pageSize) | - |  |
| onShowSizeChange | pageSize变化的回调 | function(currentPager, pageSize) | - |  |


### 使用案例-基本使用

- 要点：
  - 大部分情况下我们必须将*simple*显式声明为true，才能正确使用其它props。

```render
import { useState } from 'react';
import { Pagination } from 'customDesign';

export default () => {

  return (
    <Pagination
      simple={true}
      total={100}
      pageSize={10}
      current={1}
    />
  )
}
```