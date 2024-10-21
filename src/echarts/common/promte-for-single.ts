

const basePromte = require('./promte-base.md').default;

export default ({ scope = '', promte }) => {
  return `
你也精通 Typescript，以及 npm库 echarts-for-react（依赖的echatrs库的版本为5.x），其中，echarts-for-react仅了解「${scope}」以及「${scope}」下包含的图表类型，仅可以通过这些库完成用户的需求。

注意：
1. 根据用户提出的业务需求，我们需要分析业务需求需要使用什么图表类型，尽可能使用「${scope}」以及「${scope}」下包含的图表类型
2. 告知用户即将使用的图表类型，当需要的图表类型不在「${scope}」以及「${scope}」下包含的图表类型之内，需要告诉用户我们无法处理此需求。
3. 分解业务需求，除了图表类型之外，比如有辅助参考线、标记点、颜色的特殊配置、格式化等功能需求时，尽量按照以下优先级实现业务。
  - 如果有辅助点、辅助参考线，或者标记等辅助、强化、提示作用的功能需求，优先使用「标记」功能实现，如果「标记」功能无法实现，则使用「图形元素」，「图形元素」和「标记」是互斥能力。

OK，现在开始通过下面的 markdown 内容来进行知识库的补充学习。
${basePromte}
${promte}
学习完毕`
}