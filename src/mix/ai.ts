import { updateRender, updateStyle } from '../utils/ai-code/transform-umd'

export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: 'AI组件是一个高度灵活且可定制的组件，允许用户通过自然语言对话和附件图片来生成符合其需求的自定义组件。用户可以描述所需组件的功能、外观和行为和上传附件图片，AI组件将根据这些描述生成相应的代码。',
    usage: `AI组件是一个高度灵活且可定制的组件，允许用户通过自然语言对话和附件图片来生成符合其需求的自定义组件。用户可以描述所需组件的功能、外观和行为和上传附件图片，AI组件将根据这些描述生成相应的代码。
组件运行时：基于React、Less技术栈实现

开发需知：
- 当要求要求根据附件中的图片进行开发时，注意结果与图片中的样式的对齐，包括文字图片等要素、布局、颜色、字体、间距、边框、阴影等。
- 如果需求带有图片，请在设计开发中作为重要参考，进行详细的需求及设计分析，逐步思考，给出答案。

注意：
 - 需要严格区分需求是对当前组件的实现，还是对外部调用和其它组件配置的实现。
 - 如果需求中涉及到输出事件，请务必通过“添加输出项”功能来创建对应的输出项，以便在代码中使用，输出事件要被用于搭建事件逻辑。
 - 当前用户消息只关注并作用于AI组件本身，例如**还原图片**、**开发xx功能/组件**、**实现xx事件**等，只能通过配置AI组件来实现，禁止无关工具或操作。
`,
    injectUserMessage: true,
    aiRole: "expert",
  },
  editors: {
    ":root": [
      {
        title: "组件runtime代码",
        type: "jsx-runtime-code-editor",
        description: `基于react框架编写组件的运行时代码，关注<使用说明>
**data._renderCode**内容是当前组件runtime经过babel编译、encodeURIComponent转译后的代码

在runtime代码中直接通过入参data属性即可获取组件的配置项数据

更新组件runtime代码的参数如下：
\`\`\`typescript
/** 基于react框架编写组件的运行时代码 */
type Value = string;
\`\`\`

注意：
 - 必须编写高可读性的源代码`,
        value: {
          set({ data }, value) {
            updateRender({ data }, value)
            console.log("[写runtime代码]", value)
          }
        }
      },
      {
        title: "组件样式代码",
        type: "less-code-editor",
        description: `基于Less框架编写组件的样式代码，关注<使用说明>
**data._styleCode**内容是当前组件经过less编译、encodeURIComponent转译后的样式代码

更新组件样式代码的参数如下：
\`\`\`typescript
/** 基于Less框架编写组件的样式代码 */
type Value = string;
\`\`\`

注意：
 - 必须编写高可读性的源代码
 - 更新样式代码后按需同步实现对应的runtime代码
 `,
        value: {
          set({ data }, value) {
            updateStyle({ data }, value)
            console.log("[写less代码]", value)
          }
        }
      },
      {
        title: "更新输出项",
        type: "updateOutput",
        description: `添加组件的输出项，用于内部触发组件的各类事件
**data.outputs**内容是当前输出项列表

更新输出项的参数如下：
\`\`\`typescript
interface Params {
  id: string; // 输出项id
  title: string; // 输出项语义化名称
  /**
   * 操作类型
   * undefined - 根据是否存在id判断是添加或更新
   * delete - 删除id对应的输出项
   */
  updateType: "delete" | undefined;
}
\`\`\`

注意：
 - 更新输出项后按需同步实现对应的runtime代码
`,
        value: {
          set({ data, outputs }, value) {
            const index = data.outputs.findIndex((output) => output.id === value.id);
            const isDelete = value.updateType === "delete";

            if (index !== -1) {
              // 配置项存在
              if (isDelete) {
                // 删除
                outputs.remove(value.id);
                data.outputs.splice(index, 1);
              } else {
                // 更新
                data.outputs[index] = value;
                const output = outputs.get(value.id);
                output.setTitle(value.title);
              }
            } else {
              // 配置项目不存在
              if (!isDelete) {
                // 更新，判断下更保险
                outputs.add(value.id, value.title);
                data.outputs.push(value);
              }
            }

            console.log("[更新输出项]", value)
          }
        }
      },
      {
        title: "更新输入项",
        type: "updateInput",
        description: `更新组件的输入项，用于外部调用组件的各类api
**data.inputs**内容是当前输入项列表

更新输入项的参数如下：
\`\`\`typescript
interface Params {
  id: string; // 输入项id
  title: string; // 输入项语义化名称
  /**
   * 操作类型
   * undefined - 根据是否存在id判断是添加或更新
   * delete - 删除id对应的输入项
   */
  updateType: "delete" | undefined;
}
\`\`\`

注意：
 - 更新输入项后按需同步实现对应的runtime代码
`,
        value: {
          set({ data, inputs }, value) {
            const index = data.inputs.findIndex((input) => input.id === value.id);
            const isDelete = value.updateType === "delete";

            if (index !== -1) {
              // 配置项存在
              if (isDelete) {
                // 删除
                inputs.remove(value.id);
                data.inputs.splice(index, 1);
              } else {
                // 更新
                data.inputs[index] = value;
                const input = inputs.get(value.id);
                input.setTitle(value.title);
              }
            } else {
              // 配置项目不存在
              if (!isDelete) {
                // 更新，判断下更保险
                inputs.add(value.id, value.title);
                data.inputs.push(value);
              }
            }

            console.log("[更新输入项]", value)
          }
        }
      },
      {
        title: "更新配置项",
        type: "updateConfig",
        description: `更新一个组件的配置项，配置项用于组件的配置编辑，可以理解为是组件的props
**data.configs**内容是当前配置项列表

更新配置项的参数如下：
\`\`\`typescript
type Params = TextParams | StyleParams;
/**
 * 操作类型
 * undefined - 根据是否存在key判断是添加或更新
 * delete - 删除key对应的配置项
 */
type UpdateType = "delete" | undefined;

intreface ConfigBase {
  /** 配置项的语义化标题 */
  title: string;
  /** 需要配置的语义化字段，对应到组件的入参的data[fieldName] */
  fieldName: string;
  /** 唯一的key，没有业务语义，用于查询对应的配置项 */
  key: string;
  updateType: UpdateType;
}

/** 
 * 文本类型配置
 */
intreface TextParams extends ConfigBase {
  type: "text";
}

/**
 * 样式配置
 */
interface StyleParams {
  /** 配置项的语义化标题 */
  title: string;
  type: "style";
  /** 样式编辑器配置 */
  option: {
    /**
     * 需要支持的配置内容
     * font - 字体配置
     * background - 背景配置
     */
    options: string[];
    /** 样式作用于目标元素的 css selector，多个target代表样式同时作用于多个目标元素 */
    target: string[];
  };
  /** 唯一的key，没有业务语义，用于查询对应的配置项 */
  key: string;
  updateType: UpdateType;
}
\`\`\`

注意：
 - 样式相关的配置必须使用**样式配置**
 - 更新配置项后按需同步实现对应的runtime代码
        `,
        value: {
          set({ data }, value) {
            console.log("[修改配置项]", value)
            const index = data.configs.findIndex((config) => config.key === value.key);
            const isDelete = value.updateType === "delete";

            if (index !== -1) {
              // 配置项存在
              if (isDelete) {
                // 删除
                data.configs.splice(index, 1);
              } else {
                // 更新
                data.configs[index] = value;
              }
            } else {
              // 配置项目不存在
              if (!isDelete) {
                // 更新，判断下更保险
                data.configs.push(value);
              }
            }

            console.log("[data.configs]", data.configs)
          }
        }
      }
    ]
  }
}