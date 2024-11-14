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
        renderFileTemplate:`
({env,data,inputs,outputs,slots})=>{
  useMemo(()=>{
    inputs['u_i6']((val)=>{//监听输入项
      data.title = val
    })
  },[])
  
  return (
    <div>
      <div>
        {data.logo}
      </div>
      <Button className={css.button} onClick={e=>{
        outputs['o_03'](data.title)
      }}>{data.title}</Button>
      <div>{slots['s_u01'].render()}</div>
    </div>
  )
}
        `,
        prompts:`
    优先基于 antd(Ant Design的5.21.4版本)进行开发，同时可以使用 @ant-design/icons(Ant Design提供的图标库).
    如果antd组件库中的组件不能满足需求，可以基于react、html进行开发。
    
    Ant Design组件库中，可以使用所有的antd中的组件，注意以下方面：
    1、尽量使用中等尺寸（size=middle)；
    2、尽量使用默认主题（theme=default)；
    3、所有组件都可以使用className属性，可以自定义样式；
        `,
        examples:`
<例子>
  [user]：一张200*100的图片
  [assistant]：好的，我将为您开发一个图片组件.
  \`\`\`render
  import css from 'style.less';
  import {comRef} from 'mybricks';
  
  export default comRef(({env,data,inputs})=>{
    return (
      <div>
        <img src='https://temp.im/200x100' alt="200*100" />
      </div>
    )
  },{
    type:'main',
    title:'图片'
  })
  \`\`\`
  
  **总结**
  这是一个图片组件，展示一张200*100的图片，当前没有任何配置项、输入项、输出项以及插槽.
</例子>

<例子>
  [user]：一个banner
  [assistant]：好的，我将使为您开发一个Banner组件，包括Logo与导航内容.
  \`\`\`model
  {
    "logo":"MyBricks低代码",
    "navs":[
      {"id":"main","title":"主页"},
      {"id":"help","title":"帮助"}
    ]
  }
  \`\`\`
  
  \`\`\`style
  .banner{
    width:100%;
    height:100%;
    display:flex;
    justify-content:space-between;
  }
  
  .logo{
    width:100px;
    height:30px;
  }
  
  .search{
    width:200px;
  }
  
  .navs{
    flex:1; 
    display:flex;
    
    .item{
      margin-left:10px;
    }
  }
  \`\`\`
  
  \`\`\`render
  import css from 'style.less';
  import {comRef} from 'mybricks';
  
  export default comRef(({data,inputs})=>{
    return (
      <div className={css.banner}>
        <div className={css.logo}>
          {data.logo}
        </div>
        <div className={css.search}>
          <input type="text" placeholder="搜索" />
        </div>
        <div className={css.navs}>
          {
            data.navs.map((nav,idx)=>{
              return (
                <div key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
                  {nav.title}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  },{
    type:'main',
    title:'Banner',
    selectors:[
      {
        selector:'.logo',
        title:'Logo',
        configs:[
          {
            title:'Logo',
            type:'text',
            value:{
              get({data}){
                return data.logo
              },
              set({data},val){
                data.logo = val
              }
            }
          }
        ]
      },
      {
        selector:'.search',
        title:'搜索'
      },
      {
        selector:'.navs',
        title:'导航栏'
      },
      {
        selector:'.navs .item',
        title:'导航项'
      }
    ]
  })
  \`\`\`
  
  **总结**
  这是一个Banner组件，包括Logo与导航内容。
</例子>

<例子>
  (当前选区在 logo(selector=.logo) 上)
  [user]：这里加个黑色的背景
  [assistant]：好的，我将为您在logo区域的样式上修改背景色，当前需要更新style文件，以下是style文件的所有内容.
  \`\`\`style
  .banner{
    width:100%;
    height:100%;
    display:flex;
    justify-content:space-between;
  }
  
  .logo{
    width:100px;
    height:30px;
    background-color:#000;
  }
  
  .search{
    width:200px;
  }
  
  .navs{
    flex:1; 
    display:flex;
    
    .item{
      margin-left:10px;
    }
  }
  \`\`\`
</例子>

<例子>
  (当前选区在 搜索(selector=.search) 上)
  [user]：我要配置这里的placeholder
  [assistant]：好的，我将为您在这个区域添加一个配置项，当前需要更新model及render文件.

  \`\`\`model
  {
    "logo":"MyBricks低代码",
    "search":{
      "placeholder":"搜索"
    },
    "navs":[
      {"id":"main","title":"主页"},
      {"id":"help","title":"帮助"}
    ]
  }
  \`\`\`

  \`\`\`render
  import css from 'style.less';
  import {comRef} from 'mybricks';
  
  export default comRef(({data,inputs})=>{
    return (
      <div className={css.banner}>
        <div className={css.logo}>
          {data.logo}
        </div>
        <div className={css.search}>
          <input type="text" placeholder={data.search.placeholder} />
        </div>
        <div className={css.navs}>
          {
            data.navs.map((nav,idx)=>{
              return (
                <div key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
                  {nav.title}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  },{
    type:'main',
    title:'Banner',
    selectors:[
      {
        selector:'.logo',
        title:'Logo',
        configs:[
          {
            title:'Logo',
            type:'text',
            value:{
              get({data}){
                return data.logo
              },
              set({data},val){
                data.logo = val
              }
            }
          }
        ]
      },
      {
        selector:'.search',
        title:'搜索',
        configs:[
          {
            title:'placeholder',
            type:'text',
            value:{
              get({data}){
                return data.search.placeholder
              },
              set({data},val){
                data.search.placeholder = val
              }
            }
          }
        ]
      },
      {
        selector:'.navs',
        title:'导航栏'
      },
      {
        selector:'.navs .item',
        title:'导航项'
      }
    ]
  })
  \`\`\`
  
  **总结**
  此次修改，在区域 搜索(selector=.search) 添加了一个配置项.
  
  以下是这个被添加的配置项的详细情况：
  title：placeholder
  type:text
</例子>

<例子>
  (当前选区在 搜索(selector=.search) 上)
  [user]：这里当值变化时，要输出当前值
  [assistant]：OK，没问题，我将在组件的outputs中添加一个输出项，并在当前搜索框上增加onChange事件，以通过该输出项输出当前的搜索框的值。
  仅需要修改render文件：
  \`\`\`render
  import css from 'style.less';
  import {comRef} from 'mybricks';
  import {useCallback} from 'react';
  
  export default comRef(({data,inputs,outputs})=>{
    const search = useCallback((e)=>{
      outputs['o_012'](e.target.value)
    },[])
    
    return (
      <div className={css.banner}>
        <div className={css.logo}>
          {data.logo}
        </div>
        <div className={css.search}>
          <input type="text" placeholder={data.search.placeholder} onChange={search}/>
        </div>
        <div className={css.navs}>
          {
            data.navs.map((nav,idx)=>{
              return (
                <div key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
                  {nav.title}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  },{
    type:'main',
    title:'Banner',
    outputs:[
      {id:'o_012',title:'搜索',schema:{type:'string'}}
    ],
    selectors:[
      {
        selector:'.logo',
        title:'Logo',
        configs:[
          {
            title:'Logo',
            type:'text',
            value:{
              get({data}){
                return data.logo
              },
              set({data},val){
                data.logo = val
              }
            }
          }
        ]
      },
      {
        selector:'.search',
        title:'搜索',
        configs:[
          {
            title:'placeholder',
            type:'text',
            value:{
              get({data}){
                return data.search.placeholder
              },
              set({data},val){
                data.search.placeholder = val
              }
            }
          }
        ]
      },
      {
        selector:'.navs',
        title:'导航栏'
      },
      {
        selector:'.navs .item',
        title:'导航项'
      }
    ]
  })
  \`\`\`
  
  **总结**
  此次修改，添加了一个输出项，并在搜索(selector=.search)中添加了一个事件，当值变化时触发。
  
  以下是这个被添加的输出项的详细情况：
  title：搜索
  schema:{type:'string'}
</例子>

<例子>
  [user]：根据输入显示导航列表
  [assistant]：好的，我将为您添加一个输入项，根据输入项的值显示导航。本次需要更新render文件：
  \`\`\`render
  import css from 'style.less';
  import {comRef} from 'mybricks';
  import {useMemo,useCallback} from 'react';
  
  export default comRef(({data,inputs,outputs})=>{
    useMemo(()=>{
      inputs['u_i6']((val)=>{
        data.navs = val
      })
    },[])
    
    const search = useCallback((e)=>{
      outputs['o_012'](e.target.value)
    },[])
    
    return (
      <div className={css.banner}>
        <div className={css.logo}>
          {data.logo}
        </div>
        <div className={css.search}>
          <input type="text" placeholder={data.search.placeholder} onChange={search}/>
        </div>
        <div className={css.navs}>
          {
            data.navs.map((nav,idx)=>{
              return (
                <div key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
                  {nav.title}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  },{
    type:'main',
    title:'Banner',
    inputs:[
      {
        id:'u_i6',
        title:'导航列表',
        schema:{
          type:'array',
          items:{
            type:'object',
            properties:{
              id:{
                type:'string'
              },
              title:{
                type:'string'
              }
            }
          }
        }
      }
    ],
    outputs:[
      {id:'o_012',title:'搜索',schema:{type:'string'}}
    ],
    selectors:[
      {
        selector:'.logo',
        title:'Logo',
        configs:[
          {
            title:'Logo',
            type:'text',
            value:{
              get({data}){
                return data.logo
              },
              set({data},val){
                data.logo = val
              }
            }
          }
        ]
      },
      {
        selector:'.search',
        title:'搜索',
        configs:[
          {
            title:'placeholder',
            type:'text',
            value:{
              get({data}){
                return data.search.placeholder
              },
              set({data},val){
                data.search.placeholder = val
              }
            }
          }
        ]
      },
      {
        selector:'.navs',
        title:'导航栏'
      },
      {
        selector:'.navs .item',
        title:'导航项'
      }
    ]
  })
  \`\`\`
  
  **总结**
  此次修改，在组件上添加一个输入项，根据输入项的值显示导航。
  
  以下是这个被添加的输入项的详细情况：
  title：导航列表
  schema:
    {
      type:'array',
      items:{
        type:'object',
        properties:{
          id:{
            type:'string'
          },
          title:{
            type:'string'
          }
        }
      }
    }
</例子>

<例子>
  (当前选区在 联系人描述(selector=.desc) 上)
  [user]：这里再拆分一下
  [assistant]：好的，我将当前选区的基础上拆分更具体的选区，以便于您的编辑操作。
  仅需要修改render文件：
  
  \`\`\`render
  import css from 'style.less';
  import {comRef} from 'mybricks';
  
  export default comRef(({data,inputs})=>{
    return (
      <div className={css.card}>
        <div className={css.name}>
          {data.name}
        </div>
        <div className={css.desc}>
          <div className={css.phone}>电话</div>
          <div className={css.address}>联系人地址</div>
        </div>
      </div>
    )
  },{
    type:'main',
    title:'联系人卡片',
    selectors:[
      {
        selector:'.name',
        title:'姓名'
      },
      {
        selector:'.desc',
        title:'描述'
      },
      {
        selector:'.desc .phone',
        title:'电话'
      },
      {
        selector:'.desc .address',
        title:'地址'
      }
    ]
  })
  \`\`\`
  
  **总结**
  本次在选区 描述(selector=.desc)上拆分了更具体的选区:
  - 电话(selector=.desc .phone)
  - 地址(selector=.desc .address)
</例子>

<例子>
  [user]：在下方添加一个饼图
  [assistant]：目前能够使用的类库中不包括饼图组件，我将为您添加一个插槽，您可以将其他饼图组件拖入其中。
  本次仅需要修改render文件
  \`\`\`render
  import css from 'style.less';
  import {comRef} from 'mybricks';
  
  export default comRef(({data,inputs,slots})=>{
    return (
      <div className={css.card}>
        <div className={css.name}>
          {data.name}
        </div>
        <div className={css.desc}>
          <div className={css.phone}>电话</div>
          <div className={css.address}>联系人地址</div>
        </div>
        <div>
          {slots['s_001'].render()}
        </div>
      </div>
    )
  },{
    type:'main',
    title:'联系人卡片',
    slots:[
      {id:'s_001',title:'饼图'}
    ],
    selectors:[
      {
        selector:'.name',
        title:'姓名'
      },
      {
        selector:'.desc',
        title:'描述'
      },
      {
        selector:'.desc .phone',
        title:'电话'
      },
      {
        selector:'.desc .address',
        title:'地址'
      }
    ]
  })
  \`\`\`
</例子>
        `
      }
    },
    loadKnowledge(items) {//加载知识库
      const rtn = []

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