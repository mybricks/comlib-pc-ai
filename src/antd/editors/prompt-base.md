### 使用文档-基础使用
使用antd类库的各种组件完成需求，这是组件的基础框架。

```render
import React from 'react';
import { Button } from 'antd';
import { comRef } from 'mybricks'; // 如果使用comRef请引用comRef

export default ({ data }) => {
  return (
    <Button color={data.color}>点击我</Button>
  )
}
```


### 使用文档-Button按钮
介绍：按钮用于开始一个即时操作。
何时使用：标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

#### 最佳实践-调整按钮的样式
场景：我们优先通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `color` -> `variant` -> `loading` -> `disabled`。实在还没有成功的情况下，我们用className 和 style 属性来强制修改样式。
要点：
- 设置*type*属性来切换不同的样式。
- 设置*danger*属性来表明是一个危险颜色的按钮。

```render
import React from 'react';
import { Button } from 'antd';

export default () => {
  return (
    <Button type="primary">主样式按钮</Button>
    <Button type="text">文本样式按钮</Button>
    <Button type="dashed">虚线样式按钮</Button>
    <Button danger>危险颜色按钮</Button>
  )
}
```

### 使用文档-Typography排版
介绍：内置的各类文本的排版格式。
何时使用：
- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。
- 当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。

属性：Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [editable](#editable) | false | [editable](#editable) |
| ellipsis | 自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等 | boolean \| [ellipsis](#ellipsis) | false | [ellipsis](#ellipsis) |

#### 最佳实践-可复制文本段落
场景：快速支持一段文本段落的复制功能。
要点：
- 设置*copyable*属性用于自动在文本后面添加图标以及支持复制功能。

```render
import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Paragraph copyable>This is a copyable text.</Paragraph>
  )
}
```

#### 最佳实践-可编辑的文本段落
场景：快速支持一段文本段落的可编辑功能，右侧编辑按钮点击即可编辑。
要点：
- 设置*editable*属性用于自动在文本后面添加编辑图标以及支持点击后编辑功能。

```render
import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Paragraph editable>This is a editable text.</Paragraph>
  )
}
```


### 使用文档-面包屑
介绍：：显示当前页面在系统层级结构中的位置，并能向上返回。
何时使用：
- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

#### 最佳实践-基础面包屑
场景：使用面包屑展示层级结构。
要点：
- 设置*items*属性配置层级数据

```render
import React from 'react';
import { Breadcrumb } from 'antd';

export default () => {
  return (
    <Breadcrumb
      separator=">" // 使用>符号作为分隔符
      items={[ // 配置层级数据
        {
          title: 'Home',
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: 'An Application',
        },
      ]}
    />
  )
}
```


### 使用文档-下拉菜单
介绍：向下弹出的列表。
何时使用：当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。
- 用于收罗一组命令操作。
- Select 用于选择，而 Dropdown 是命令集合。

#### 最佳实践-基础使用
场景：在下拉菜单中支持各类样式的按钮。

```render
import React from 'react';
import { Dropdown } from 'antd';

export default () => {
  return (
    <Dropdown
      menu={[
        { key: 1, label: 'My Account', disabled: true }, // 不可点击的按钮
        { type: 'divider' }, // 分割线
        { key: 2, label: 'Profile', extra: '⌘P' } // 带有额外文本的按钮，在右侧展示⌘P字样
      ]}
    >
      <a onClick={(e) => e.preventDefault()}>Hover me</a> // 可以是各类JSX元素
    </Dropdown>
  )
}

```
