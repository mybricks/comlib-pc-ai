# Skeleton

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Skeleton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否展示动画效果 | boolean | false |
| avatar | 是否显示头像占位图 | boolean \| [SkeletonAvatarProps](#skeletonavatarprops) | false |
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | boolean | - |
| paragraph | 是否显示段落占位图 | boolean \| [SkeletonParagraphProps](#skeletonparagraphprops) | true |
| round | 为 true 时，段落和标题显示圆角 | boolean | false |
| title | 是否显示标题占位图 | boolean \| [SkeletonTitleProps](#skeletontitleprops) | true |

### SkeletonAvatarProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否展示动画效果，仅在单独使用头像骨架时生效 | boolean | false |
| shape | 指定头像的形状 | `circle` \| `square` | - |
| size | 设置头像占位图的大小 | number \| `large` \| `small` \| `default` | - |

### SkeletonTitleProps

| 属性  | 说明                 | 类型             | 默认值 |
| ----- | -------------------- | ---------------- | ------ |
| width | 设置标题占位图的宽度 | number \| string | -      |

### SkeletonParagraphProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 设置段落占位图的行数 | number | - |
| width | 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | number \| string \| Array&lt;number \| string> | - |

### SkeletonButtonProps

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| active | 是否展示动画效果 | boolean | false |  |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false | 4.17.0 |
| shape | 指定按钮的形状 | `circle` \| `round` \| `square` \| `default` | - |  |
| size | 设置按钮的大小 | `large` \| `small` \| `default` | - |  |

### SkeletonInputProps

| 属性   | 说明             | 类型                            | 默认值 |
| ------ | ---------------- | ------------------------------- | ------ |
| active | 是否展示动画效果 | boolean                         | false  |
| size   | 设置输入框的大小 | `large` \| `small` \| `default` | -      |

