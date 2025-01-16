export default {
  description: `表单组件`,
  editors: {
    ':root': {
      title: '表单',
      com:'Form',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['background', 'font'],
        }
      ]
    }
  },
  docs: `
通用属性参考：[通用属性](/docs/react/common-props)

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配置 Form.Item 的 \`colon\` 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效) | boolean | true |  |
| disabled | 设置表单组件禁用，仅对 antd 组件有效 | boolean | false | 4.21.0 |
| component | 设置 Form 渲染元素，为 \`false\` 则不创建 DOM 节点 | ComponentType \\| false | form |  |
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看[示例](#form-demo-global-state) | [FieldData](#fielddata)\\[] | - |  |
| form | 经 \`Form.useForm()\` 创建的 form 控制实例，不提供时会自动创建 | [FormInstance](#forminstance) | - |  |
| feedbackIcons | 当 \`Form.Item\` 有 \`hasFeedback\` 属性时可以自定义图标 | [FeedbackIcons](#feedbackicons) | - | 5.9.0 |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |  |
| labelAlign | label 标签的文本对齐方式 | \`left\` \\| \`right\` | \`right\` |  |
| labelWrap | label 标签的文本换行方式 | boolean | false | 4.18.0 |
| labelCol | label 标签布局，同 \`<Col>\` 组件，设置 \`span\` \`offset\` 值，如 \`{span: 3, offset: 12}\` 或 \`sm: {span: 3, offset: 12}\` | [object](/components/grid-cn#col) | - |  |
| layout | 表单布局 | \`horizontal\` \\| \`vertical\` \\| \`inline\` | \`horizontal\` |  |
| name | 表单名称，会作为表单字段 \`id\` 前缀使用 | string | - |  |
| preserve | 当字段被删除时保留字段值。你可以通过 \`getFieldsValue(true)\` 来获取保留字段值 | boolean | true | 4.4.0 |
| requiredMark | 必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置 | boolean \\| \`optional\` \\| ((label: ReactNode, info: { required: boolean }) => ReactNode) | true | \`renderProps\`: 5.9.0 |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean \\| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) \\| { focus: boolean } | false |  |
| size | 设置字段组件的尺寸（仅限 antd 组件） | \`small\` \\| \`middle\` \\| \`large\` | - |  |
| validateMessages | 验证提示模板，说明[见下](#validatemessages) | [ValidateMessages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134) | - |  |
| validateTrigger | 统一设置字段触发验证的时机 | string \\| string\\[] | \`onChange\` | 4.3.0 |
| variant | 表单内控件变体 | \`outlined\` \\| \`borderless\` \\| \`filled\` | \`outlined\` | 5.13.0 |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid-cn#col) | - |  |
| onFieldsChange | 字段更新时触发回调事件 | function(changedFields, allFields) | - |  |
| onFinish | 提交表单且数据验证成功后回调事件 | function(values) | - |  |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | function({ values, errorFields, outOfDate }) | - |  |
| onValuesChange | 字段值更新时触发回调事件 | function(changedValues, allValues) | - |  |
| clearOnDestroy | 当表单被卸载时清空表单值 | boolean | false | 5.18.0 |

> 支持原生 form 除 \`onSubmit\` 外的所有属性。

## Form.Item

表单字段组件，用于数据双向绑定、校验、布局等。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配合 \`label\` 属性使用，表示是否显示 \`label\` 后面的冒号 | boolean | true |  |
| dependencies | 设置依赖字段，说明[见下](#dependencies) | [NamePath](#namepath)\\[] | - |  |
| extra | 额外的提示信息，和 \`help\` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | ReactNode | - |  |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any\\[]) => any | - |  |
| getValueProps | 为子元素添加额外的属性 (不建议通过 \`getValueProps\` 生成动态函数 prop，请直接将其传递给子组件) | (value: any) => Record<string, any> | - | 4.2.0 |
| hasFeedback | 配合 \`validateStatus\` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 此外，它还可以通过 Icons 属性获取反馈图标。 | boolean \\| { icons: [FeedbackIcons](#feedbackicons) } | false | icons: 5.9.0 |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | ReactNode | - |  |
| hidden | 是否隐藏字段（依然会收集和校验字段） | boolean | false | 4.4.0 |
| htmlFor | 设置子元素 label \`htmlFor\` 属性 | string | - |  |
| initialValue | 设置子元素默认值，如果与 Form 的 \`initialValues\` 冲突则以 Form 为准 | string | - | 4.2.0 |
| label | \`label\` 标签的文本，当不需要 label 又需要与冒号对齐，可以设为 null | ReactNode | - | null: 5.22.0 |
| labelAlign | 标签文本对齐方式 | \`left\` \\| \`right\` | \`right\` |  |
| labelCol | \`label\` 标签布局，同 \`<Col>\` 组件，设置 \`span\` \`offset\` 值，如 \`{span: 3, offset: 12}\` 或 \`sm: {span: 3, offset: 12}\`。你可以通过 Form 的 \`labelCol\` 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 | [object](/components/grid-cn#col) | - |  |
| messageVariables | 默认验证字段的信息，查看[详情](#messagevariables) | Record&lt;string, string> | - | 4.7.0 |
| name | 字段名，支持数组 | [NamePath](#namepath) | - |  |
| normalize | 组件获取值后进行转换，再放入 Form 中。不支持异步 | (value, prevValue, prevValues) => any | - |  |
| noStyle | 为 \`true\` 时不带样式，作为纯字段控件使用。当自身没有 \`validateStatus\` 而父元素存在有 \`validateStatus\` 的 Form.Item 会继承父元素的 \`validateStatus\` | boolean | false |  |
| preserve | 当字段被删除时保留字段值 | boolean | true | 4.4.0 |
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | boolean | false |  |
| rules | 校验规则，设置字段的校验逻辑。点击[此处](#form-demo-basic)查看示例 | [Rule](#rule)\\[] | - |  |
| shouldUpdate | 自定义字段更新逻辑，说明[见下](#shouldupdate) | boolean \\| (prevValue, curValue) => boolean | false |  |
| tooltip | 配置提示信息 | ReactNode \\| [TooltipProps & { icon: ReactNode }](/components/tooltip-cn#api) | - | 4.7.0 |
| trigger | 设置收集字段值变更的时机。点击[此处](#form-demo-customized-form-controls)查看示例 | string | \`onChange\` |  |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 \`parallel\` 时会并行校验 | boolean \\| \`parallel\` | false | \`parallel\`: 4.5.0 |
| validateDebounce | 设置防抖，延迟毫秒数后进行校验 | number | - | 5.9.0 |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string | - |  |
| validateTrigger | 设置字段校验的时机 | string \\| string\\[] | \`onChange\` |  |
| valuePropName | 子节点的值的属性。注意：Switch、Checkbox 的 valuePropName 应该是 \`checked\`，否则无法获取这个两个组件的值。该属性为 \`getValueProps\` 的封装，自定义 \`getValueProps\` 后会失效 | string | \`value\` |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 \`labelCol\`。你可以通过 Form 的 \`wrapperCol\` 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 | [object](/components/grid-cn#col) | - |  |
| layout | 表单项布局 | \`horizontal\` \\| \`vertical\` | - | 5.18.0 |

被设置了 \`name\` 属性的 \`Form.Item\` 包装的控件，表单控件会自动添加 \`value\`（或 \`valuePropName\` 指定的其他属性） \`onChange\`（或 \`trigger\` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 \`onChange\` 来做数据收集同步（你可以使用 Form 的 \`onValuesChange\`），但还是可以继续监听 \`onChange\` 事件。
2. 你不能用控件的 \`value\` 或 \`defaultValue\` 等属性来设置表单域的值，默认值可以用 Form 里的 \`initialValues\` 来设置。注意 \`initialValues\` 不能被 \`setState\` 动态更新，你需要用 \`setFieldsValue\` 来更新。
3. 你不应该用 \`setState\`，可以使用 \`form.setFieldsValue\` 来动态改变表单值。

### dependencies

当字段间存在依赖关系时使用。如果一个字段设置了 \`dependencies\` 属性。那么它所依赖的字段更新时，该字段将自动触发更新与校验。一种常见的场景，就是注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 \`dependencies\` 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。你可以参考[具体例子](#form-demo-dependencies)。

\`dependencies\` 不应和 \`shouldUpdate\` 一起使用，因为这可能带来更新逻辑的混乱。

### FeedbackIcons

\`({ status: ValidateStatus, errors: ReactNode, warnings: ReactNode }) => Record<ValidateStatus, ReactNode>\`


### messageVariables

你可以通过 \`messageVariables\` 修改 Form.Item 的默认验证信息。

\`\`\`render
imoprt react from 'react';
import { Form } from 'antd';
import { comRef } from 'mybricks';

export default comRef(({ data }) => {
  return (
    <Form>
      <Form.Item
        messageVariables={{ another: 'good' }}
        label="user"
        rules={[{ required: true, message: '$\{another\} is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        messageVariables={{ label: 'good' }}
        label={<span>user</span>}
        rules={[{ required: true, message: '$\{label\} is required' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}, {
  type: 'main',
  title: 'messageVariables的使用',
});
\`\`\`

自 \`5.20.2\` 起，当你希望不要转译 \`$\{\}\` 时，你可以通过 \`\\\\$\{\}\` 来略过：

\`\`\`typescript
{ required: true, message: '$\{label\} is convert, \\\\$\{label\} is not convert' }

// good is convert, $\{label\} is not convert
\`\`\`

## Form.List

为字段提供数组化管理。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| children | 渲染函数 | (fields: Field\\[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode | - |  |
| initialValue | 设置子元素默认值，如果与 Form 的 \`initialValues\` 冲突则以 Form 为准 | any\\[] | - | 4.9.0 |
| name | 字段名，支持数组。List 本身也是字段，因而 \`getFieldsValue()\` 默认会返回 List 下所有值，你可以通过[参数](#getfieldsvalue)改变这一行为 | [NamePath](#namepath) | - |  |
| rules | 校验规则，仅支持自定义规则。需要配合 [ErrorList](#formerrorlist) 一同使用。 | { validator, message }\\[] | - | 4.7.0 |


\`\`\`render
imoprt react from 'react';
import { Form } from 'antd';
import { comRef } from 'mybricks';

export default comRef(({ data }) => {
  return (
    <Form>
      <Form.List>
        {(fields) =>
          fields.map((field) => (
            <Form.Item {...field}>
              <Input />
            </Form.Item>
          ))
        }
      </Form.List>
    </Form>
  );
}, {
  type: 'main',
  title: 'Form组件中列表的使用',
});
\`\`\`

注意：Form.List 下的字段不应该配置 \`initialValue\`，你始终应该通过 Form.List 的 \`initialValue\` 或者 Form 的 \`initialValues\` 来配置。

## operation

Form.List 渲染表单相关操作函数。

| 参数   | 说明       | 类型                                               | 默认值      | 版本  |
| ------ | ---------- | -------------------------------------------------- | ----------- | ----- |
| add    | 新增表单项 | (defaultValue?: any, insertIndex?: number) => void | insertIndex | 4.6.0 |
| move   | 移动表单项 | (from: number, to: number) => void                 | -           |       |
| remove | 删除表单项 | (index: number \\| number\\[]) => void               | number\\[]   | 4.5.0 |

## Form.ErrorList

4.7.0 新增。错误展示组件，仅限配合 Form.List 的 rules 一同使用。参考[示例](#form-demo-dynamic-form-item)。

| 参数   | 说明     | 类型         | 默认值 |
| ------ | -------- | ------------ | ------ |
| errors | 错误列表 | ReactNode\\[] | -      |

## Form.Provider

提供表单间联动功能，其下设置 \`name\` 的 Form 更新时，会自动触发对应事件。查看[示例](#form-demo-form-context)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFormChange | 子表单字段更新时触发 | function(formName: string, info: { changedFields, forms }) | - |
| onFormFinish | 子表单提交时触发 | function(formName: string, info: { values, forms }) | - |

\`\`\`render
imoprt react from 'react';
import { Form } from 'antd';
import { comRef } from 'mybricks';

export default comRef(({ data }) => {
  return (
    <Form.Provider
      onFormFinish={(name) => {
        if (name === 'form1') {
          // Do something...
        }
      }}
    >
      <Form name="form1">...</Form>
      <Form name="form2">...</Form>
    </Form.Provider>
  );
}, {
  type: 'main',
  title: 'Form中Provider的使用',
});
\`\`\`

### FormInstance

| 名称 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| getFieldError | 获取对应字段名的错误信息 | (name: [NamePath](#namepath)) => string\\[] |  |
| getFieldInstance | 获取对应字段实例 | (name: [NamePath](#namepath)) => any | 4.4.0 |
| getFieldsError | 获取一组字段名对应的错误信息，返回为数组形式 | (nameList?: [NamePath](#namepath)\\[]) => FieldError\\[] |  |
| getFieldsValue | 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 \`getFieldsValue(true)\` 时返回所有值 | [GetFieldsValue](#getfieldsvalue) |  |
| getFieldValue | 获取对应字段名的值 | (name: [NamePath](#namepath)) => any |  |
| isFieldsTouched | 检查一组字段是否被用户操作过，\`allTouched\` 为 \`true\` 时检查是否所有字段都被操作过 | (nameList?: [NamePath](#namepath)\\[], allTouched?: boolean) => boolean |  |
| isFieldTouched | 检查对应字段是否被用户操作过 | (name: [NamePath](#namepath)) => boolean |  |
| isFieldValidating | 检查对应字段是否正在校验 | (name: [NamePath](#namepath)) => boolean |  |
| resetFields | 重置一组字段到 \`initialValues\` | (fields?: [NamePath](#namepath)\\[]) => void |  |
| scrollToField | 滚动到对应字段位置 | (name: [NamePath](#namepath), options: [ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)) => void |  |
| setFields | 设置一组字段状态 | (fields: [FieldData](#fielddata)\\[]) => void |  |
| setFieldValue | 设置表单的值（该值将直接传入 form store 中并且**重置错误信息**。如果你不希望传入对象被修改，请克隆后传入） | (name: [NamePath](#namepath), value: any) => void | 4.22.0 |
| setFieldsValue | 设置表单的值（该值将直接传入 form store 中并且**重置错误信息**。如果你不希望传入对象被修改，请克隆后传入）。如果你只想修改 Form.List 中单项值，请通过 \`setFieldValue\` 进行指定 | (values) => void |  |
| submit | 提交表单，与点击 \`submit\` 按钮效果相同 | () => void |  |
| validateFields | 触发表单验证，设置 \`recursive\` 时会递归校验所有包含的路径 | (nameList?: [NamePath](#namepath)\\[], config?: [ValidateConfig](#validatefields)) => Promise |  |

#### validateFields

\`\`\`typescript
export interface ValidateConfig {
  // 5.5.0 新增。仅校验内容而不会将错误信息展示到 UI 上。
  validateOnly?: boolean;
  // 5.9.0 新增。对提供的 \`nameList\` 与其子路径进行递归校验。
  recursive?: boolean;
  // 5.11.0 新增。校验 dirty 的字段（touched + validated）。
  // 使用 \`dirty\` 可以很方便的仅校验用户操作过和被校验过的字段。
  dirty?: boolean;
}
\`\`\`

## Hooks

### Form.useForm

\`type Form.useForm = (): [FormInstance]\`

创建 Form 实例，用于管理所有数据状态。

### Form.useFormInstance

\`type Form.useFormInstance = (): FormInstance\`

\`4.20.0\` 新增，获取当前上下文正在使用的 Form 实例，常见于封装子组件消费无需透传 Form 实例：


\`\`\`render
imoprt react from 'react';
import { Form } from 'antd';
import { comRef } from 'mybricks';

const Sub = () => {
  const form = Form.useFormInstance();

  return <Button onClick={() => form.setFieldsValue({})} />;
};

export default comRef(({ data }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Sub />
    </Form>
  );
}, {
  type: 'main',
  title: 'Form中useFormInstance的使用',
});
\`\`\`

### Form.useWatch

\`type Form.useWatch = (namePath: NamePath | (selector: (values: Store)) => any, formInstance?: FormInstance | WatchOptions): Value\`

\`5.12.0\` 新增 \`selector\`

用于直接获取 form 中字段对应的值。通过该 Hooks 可以与诸如 \`useSWR\` 进行联动从而降低维护成本：

\`\`\`render
imoprt react from 'react';
import { Form } from 'antd';
import { comRef } from 'mybricks';

export default comRef(({ data }) => {
  const [form] = Form.useForm();
  const userName = Form.useWatch('username', form);

  const { data: options } = useSWR(\`/api/user/$\{userName\}\`, fetcher);

  return (
    <Form form={form}>
      <Form.Item name="username">
        <AutoComplete options={options} />
      </Form.Item>
    </Form>
  );
}, {
  type: 'main',
  title: 'Form中useWatch的使用',
});
\`\`\`

如果你的组件被包裹在 \`Form.Item\` 内部，你可以省略第二个参数，\`Form.useWatch\` 会自动找到上层最近的 \`FormInstance\`。

\`useWatch\` 默认只监听在 Form 中注册的字段，如果需要监听非注册字段，可以通过配置 \`preserve\` 进行监听：

\`\`\`render
imoprt react from 'react';
import { Form } from 'antd';
import { comRef } from 'mybricks';

export default comRef(({ data }) => {
  const [form] = Form.useForm();

  const age = Form.useWatch('age', { form, preserve: true });
  console.log(age);

  return (
    <div>
      <Button onClick={() => form.setFieldValue('age', 2)}>Update</Button>
      <Form form={form}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}, {
  type: 'main',
  title: 'Form中useWatch的preserve使用',
});
\`\`\`

### Form.Item.useStatus

\`type Form.Item.useStatus = (): { status: ValidateStatus | undefined, errors: ReactNode[], warnings: ReactNode[] }\`

\`4.22.0\` 新增，可用于获取当前 Form.Item 的校验状态，如果上层没有 Form.Item，\`status\` 将会返回 \`undefined\`。\`5.4.0\` 新增 \`errors\` 和 \`warnings\`，可用于获取当前 Form.Item 的错误信息和警告信息：

\`\`\`render
imoprt react from 'react';
import { Form } from 'antd';
import { comRef } from 'mybricks';

const CustomInput = ({ value, onChange }) => {
  const { status, errors } = Form.Item.useStatus();
  return (
    <input
      value={value}
      onChange={onChange}
      className={\`custom-input-${status}\`}
      placeholder={(errors.length && errors[0]) || ''}
    />
  );
};

export default comRef(({ data }) => {
  return (
    <Form>
      <Form.Item name="username">
        <CustomInput />
      </Form.Item>
    </Form>
  )
}, {
  type: 'main',
  title: 'Form中useStatus的使用',
});
\`\`\`

#### 与其他获取数据的方式的区别

Form 仅会对变更的 Field 进行刷新，从而避免完整的组件刷新可能引发的性能问题。因而你无法在 render 阶段通过 \`form.getFieldsValue\` 来实时获取字段值，而 \`useWatch\` 提供了一种特定字段访问的方式，从而使得在当前组件中可以直接消费字段的值。同时，如果为了更好的渲染性能，你可以通过 Field 的 renderProps 仅更新需要更新的部分。而当当前组件更新或者 effect 都不需要消费字段值时，则可以通过 \`onValuesChange\` 将数据抛出，从而避免组件更新。

## Interface

### NamePath

\`string | number | (string | number)[]\`

### GetFieldsValue

\`getFieldsValue\` 提供了多种重载方法：

#### getFieldsValue(nameList?: true | [NamePath](#namepath)\\[], filterFunc?: FilterFunc)

当不提供 \`nameList\` 时，返回所有注册字段，这也包含 List 下所有的值（即便 List 下没有绑定 Item）。

当 \`nameList\` 为 \`true\` 时，返回 store 中所有的值，包含未注册字段。例如通过 \`setFieldsValue\` 设置了不存在的 Item 的值，也可以通过 \`true\` 全部获取。

当 \`nameList\` 为数组时，返回规定路径的值。需要注意的是，\`nameList\` 为嵌套数组。例如你需要某路径值应该如下：

\`\`\`typescript
// 单个路径
form.getFieldsValue([['user', 'age']]);

// 多个路径
form.getFieldsValue([
  ['user', 'age'],
  ['preset', 'account'],
]);
\`\`\`

#### getFieldsValue({ strict?: boolean, filter?: FilterFunc })

\`5.8.0\` 新增接受配置参数。当 \`strict\` 为 \`true\` 时会仅匹配 Item 的值。例如 \`{ list: [{ bamboo: 1, little: 2 }] }\` 中，如果 List 仅绑定了 \`bamboo\` 字段，那么 \`getFieldsValue({ strict: true })\` 会只获得 \`{ list: [{ bamboo: 1 }] }\`。

### FilterFunc

用于过滤一些字段值，\`meta\` 会返回字段相关信息。例如可以用来获取仅被用户修改过的值等等。

\`\`\`typescript
type FilterFunc = (meta: { touched: boolean; validating: boolean }) => boolean;
\`\`\`

### FieldData

| 名称       | 说明             | 类型                     |
| ---------- | ---------------- | ------------------------ |
| errors     | 错误信息         | string\\[]                |
| warnings   | 警告信息         | string\\[]                |
| name       | 字段名称         | [NamePath](#namepath)\\[] |
| touched    | 是否被用户操作过 | boolean                  |
| validating | 是否正在校验     | boolean                  |
| value      | 字段对应值       | any                      |

### Rule

Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据：

\`\`\`typescript
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
\`\`\`

| 名称 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| defaultField | 仅在 \`type\` 为 \`array\` 类型时有效，用于指定数组元素的校验规则 | [rule](#rule) |  |
| enum | 是否匹配枚举中的值（需要将 \`type\` 设置为 \`enum\`） | any\\[] |  |
| fields | 仅在 \`type\` 为 \`array\` 或 \`object\` 类型时有效，用于指定子元素的校验规则 | Record&lt;string, [rule](#rule)> |  |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | number |  |
| max | 必须设置 \`type\`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | number |  |
| message | 错误信息，不设置时会通过[模板](#validatemessages)自动生成 | string |  |
| min | 必须设置 \`type\`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | number |  |
| pattern | 正则表达式匹配 | RegExp |  |
| required | 是否为必选字段 | boolean |  |
| transform | 将字段值转换成目标值后进行校验 | (value) => any |  |
| type | 类型，常见有 \`string\` \\|\`number\` \\|\`boolean\` \\|\`url\` \\| \`email\`。更多请参考[此处](https://github.com/react-component/async-validator#type) | string |  |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 \`validateTrigger\` 的子集 | string \\| string\\[] |  |
| validator | 自定义校验，接收 Promise 作为返回值。[示例](#form-demo-register)参考 | ([rule](#rule), value) => Promise |  |
| warningOnly | 仅警告，不阻塞表单提交 | boolean | 4.17.0 |
| whitespace | 如果字段仅包含空格则校验不通过，只在 \`type: 'string'\` 时生效 | boolean |  |

### WatchOptions

| 名称     | 说明                                  | 类型         | 默认值                 | 版本  |
| -------- | ------------------------------------- | ------------ | ---------------------- | ----- |
| form     | 指定 Form 实例                        | FormInstance | 当前 context 中的 Form | 5.4.0 |
| preserve | 是否监视没有对应的 \`Form.Item\` 的字段 | boolean      | false                  | 5.4.0 |
  `
}