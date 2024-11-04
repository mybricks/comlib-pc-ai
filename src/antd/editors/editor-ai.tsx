import {transformLess} from "../transform";
import {getComponentFromJSX, updateRender, updateStyle} from "../utils";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      return `
    对于PC门户、后台管理系统等需求，首选基于 antd(Ant Design的5.21.4版本)进行开发，同时可以基于 @ant-design/icons(Ant Design提供的图标库)进行开发.
    如果antd组件库中的组件不能满足需求，可以基于react、html进行开发。
    
    Ant Design组件库中，可以使用所有的antd中的组件，总体约定如下：
    1、尽量使用中等尺寸（size=middle)；
    2、尽量使用默认主题（theme=default)；
    
    以下是对部分组件的补充说明：
    
    ## Button 按钮
    ### 何时使用
    标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
    
    在 Ant Design 中我们提供了五种按钮。
    
    - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
    - 默认按钮：用于没有主次之分的一组行动点。
    - 虚线按钮：常用于添加操作。
    - 文本按钮：用于最次级的行动点。
    - 链接按钮：一般用于链接，即导航至某位置。
    
    以及四种状态属性与上面配合使用。
    
    - 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
    - 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
    - 禁用：行动点不可用的时候，一般需要文案解释。
    - 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。
    
    
    ## FloatButton 悬浮按钮
    ### 何时使用
    - 用于网站上的全局功能；
    - 无论浏览到何处都可以看见的按钮。
        `
    },
    getComDocs() {
      debugger

      return `
 尽量采用antd组件库进行开发，对于antd(5.21.4)库，
    以下是对于这个组件库的补充说明：
    
    以下是一些组件的补充说明（markdown格式）：
    
    ### Table 表格API
    | 参数          | 说明    |    类型     | 默认值      |
    | :---          | :----:   |  :----:  |   ---: |
    
    
    ### Table 表格UI css selector
    | 名称         | css selector    |
    | :---        |    ----:   |
    | 表格      | .ant-table  |
    | 表头      | .ant-table-thead  |
    
    
    ### Tree 树形控件API
    | 参数          | 说明    |    类型     | 默认值      |
    | :---          | :----:   |  :----:  |   ---: |
    | allowDrop   | 是否允许拖拽时放置在该节点       | ({ dropNode, dropPosition }) => boolean  |    |
    | autoExpandParent   | 是否自动展开父节点       | boolean | false   |
    | blockNode   | 是否节点占据一行       | boolean | false   |
    | checkable   | 节点前添加 Checkbox 复选框       | boolean | false   |
    
    ### Tree 树形控件UI css selector
    | 名称         | css selector    |
    | :---        |    ----:   |
    | 节点      | .ant-tree-treenode  |
      `
    },
    preview(response: { render, style }, edtCtx, libs: { mybricksSdk }) {
      const {data} = edtCtx

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
              transformLess(response.style).then(css => {
                resolve(css)
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
          updateStyle({data}, response.style)
        }

        resolve()
      })
    }
  }
}