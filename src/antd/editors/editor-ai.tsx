import {transformLess} from "../transform";
import {getComponentFromJSX, updateRender, updateStyle} from "../utils";
import getKnowledge from "./knowledge";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      return {
        langs:`HTML、CSS、Javascript、react`,
    prompts: `
使用下方声明的类库，我们会补充一些类库的知识，每一个类库可能包含<知识文档>、<额外能力>、<规则>、<使用步骤> 等信息。
# 类库 antd
- 别名：Ant Design
- 版本：5.21.4
- 建议使用的图标库：@ant-design/icons

## 组件摘要
当我们要引用某些组件类型时，我们需要通过\`\`\`import { Button, Table } from 'antd'\`\`\`的方式引用不同的组件类型。
<常用组件类型>
- 按钮：*Button*组件，按钮组件，常用于标记一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
- 表格：*Table*组件，展示行列数据的组件，常用于展现大量结构化数据，对数据进行排序、搜索、分页、自定义操作等复杂行为。
- 输入框：*Input*组件，文本输入组件，允许用户输入和编辑文本信息。
- 选择器：*Select*组件，下拉选择组件，用于从预设的选项中选择一个或多个值。
- 单选按钮：*Radio*组件，单选按钮组件，用于在一组选项中选择一个值。
- 复选框：*Checkbox*组件，复选框组件，用于在一组选项中选择一个或多个值。
- 开关：*Switch*组件，开关组件，用于开启或关闭某个选项。
- 滑块：*Slider*组件，滑块组件，用于在一定范围内选择一个值。
- 日期选择器：*DatePicker*组件，日期选择组件，用于选择日期。
- 时间选择器：*TimePicker*组件，时间选择组件，用于选择时间。
- 级联选择器：*Cascader*组件，级联选择组件，用于多层次选择。
- 树形选择器：*TreeSelect*组件，树形选择组件，用于树形结构的数据选择。
- 表单：*Form*组件，表单组件，用于数据收集、验证和提交。
- 网格布局：*Grid*组件，网格布局组件，用于创建复杂页面布局。
- 布局容器：*Layout*组件，布局容器组件，用于页面的基本布局结构。
- 折叠面板：*Collapse*组件，折叠面板组件，用于内容的折叠展开。
- 标签页：*Tabs*组件，标签页组件，用于标签切换。
- 面包屑：*Breadcrumb*组件，面包屑组件，用于显示导航路径。
- 分页：*Pagination*组件，分页组件，用于数据分页显示。
- 步骤条：*Steps*组件，步骤条组件，用于显示操作步骤。
- 菜单：*Menu*组件，导航菜单组件，用于导航和操作列表。
- 抽屉：*Drawer*组件，抽屉组件，用于抽屉式的页面或面板。
- 对话框：*Modal*组件，模态对话框组件，用于弹出对话框。
- 悬浮提示：*Tooltip*组件，悬浮提示组件，用于提供文字提示信息。
- 气泡卡片：*Popover*组件，气泡卡片组件，用于弹出气泡内容。
- 卡片：*Card*组件，卡片组件，用于内容的卡片式展示。
- 走马灯：*Carousel*组件，走马灯组件，用于轮播展示内容。
- 树形控件：*Tree*组件，树形控件组件，用于展示树形结构数据。
- 列表：*List*组件，列表组件，用于展示列表数据。
- 头像：*Avatar*组件，头像组件，用于展示用户头像或图标。
- 徽标数：*Badge*组件，徽标数组件，用于展示未读消息数等。
- 日历：*Calendar*组件，日历组件，用于日期的展示和选择。
- 描述列表：*Descriptions*组件，描述列表组件，用于展示描述性信息。
- 空状态：*Empty*组件，空状态组件，用于空数据的展示。
- 图片：*Image*组件，图片组件，用于图片的展示。
- 分割线：*Divider*组件，分割线组件，用于区隔内容。
- 统计数值：*Statistic*组件，统计数值组件，用于展示统计数据。
- 二维码：*QRCode*组件，二维码组件，用于生成和展示二维码。
- 悬浮按钮：*FloatButton*组件，悬浮按钮组件，用于页面中的快速操作。
- 弹性布局：*Flex*组件，弹性布局组件，提供灵活的布局方式。
- 间距：*Space*组件，间距组件，用于调整组件之间的空间。
- 分隔面板：*Splitter*组件，分隔面板组件，用于分割面板内容。
- 穿梭框：*Transfer*组件，穿梭框组件，用于数据的转移和选择。
- 上传：*Upload*组件，上传组件，用于文件上传。
- 全局提示：*Message*组件，全局提示组件，用于全局信息提示。
- 通知提醒框：*Notification*组件，通知提醒框组件，用于通知提醒。
- 气泡确认框：*Popconfirm*组件，气泡确认框组件，用于弹出确认操作。
- 进度条：*Progress*组件，进度条组件，用于展示进度。
- 结果：*Result*组件，结果组件，用于展示操作结果。
- 骨架屏：*Skeleton*组件，骨架屏组件，用于数据加载时的占位显示。
- 加载中：*Spin*组件，加载中组件，用于显示加载状态。
- 固钉：*Affix*组件，固钉组件，用于固定页面元素。
</常用组件类型>

## 额外能力
1. 有非常高的审美造诣，在用户提出配色/颜色选择需求时，你会考虑莫兰迪色系、清新自然系、海洋湖泊系等热门色系。

## 规则
1. 尽量使用antd类库中的组件，如果用户指定/业务分析出来的目标组件不属于antd类库中的组件，则可以使用react代码替代。
2. 当有样式需求时，第一时间考虑组件本身带有的的 color 或者 size
3. 知识文档是对你本身知识的查漏补缺，请尽量学习、使用其中的配置项和代码示例。
4. 遵循代码规范，不会写出一些例如中文变量名这样的不合规范的代码。

## 使用步骤
分析用户提出的业务需求，使用antd类库中的组件，运用<组件摘要>、<知识文档>和<额外能力>，严格遵循<规则>，按照「模拟数据模型」「组件配置」「功能点实现」三个步骤来使用*antd*完成用户的业务需求。

## 知识文档
`,
    //     prompts:`
    // 优先基于 antd(Ant Design的5.21.4版本)进行开发，同时可以使用 @ant-design/icons(Ant Design提供的图标库).
    // 如果antd组件库中的组件不能满足需求，可以基于react、html进行开发。
    
    // Ant Design组件库中，可以使用所有的antd中的组件，注意以下方面：
    // 1、尽量使用中等尺寸（size=middle)；
    // 2、尽量使用默认主题（theme=default)；
    // 3、所有组件都可以使用className属性，可以自定义样式；
    //     `,
      }
    },
    loadKnowledge(items) {//加载知识库
      const rtn: any = []

      items.forEach(now => {
        if (!now.from.match(/react/)) {
          const knowledge = getKnowledge(now.from, now.item)
          if (knowledge) {
            rtn.push({
              from: now.from,
              item: now.item,
              knowledge
            })
          }
        }
      })

      return rtn
    },
    preview(response: { id, render, style }, edtCtx, libs: { mybricksSdk }) {
      return new Promise((resolve, reject) => {
        if (response) {
          const rtn = (com, css) => {
            resolve({
              com,
              css
            })
          }

          Promise.all([
            new Promise((resolve, reject) => {
              getComponentFromJSX(response.render, libs).then(com => {
                resolve(com)
              })
            }),
            new Promise((resolve, reject) => {
              if (!response.style) { // 兼容空样式
                return resolve('')
              }
              transformLess(response.style).then(css => {
                const myContent = css.replaceAll('__id__', response.id)//替换模版
                resolve(myContent)
              })
            })
          ]).then(([com, css]) => {
            rtn(com, css)
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    execute({id, data, inputs, outputs, slots},
            response: { render, style }, {refresh} = {}) {
      return new Promise((resolve, reject) => {
        if (response.render) {
          updateRender({data}, response.render)
        }

        if (response.style) {
          updateStyle({id, data}, response.style)
        }

        resolve()
      })
    }
  }
}