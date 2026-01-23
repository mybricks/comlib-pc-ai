import {fitImage, autoCrop} from './utils'

export default {
  '@init': (params) => {
    const {style, data, id, input, output} = params
    style.width = 200
    style.height = 100
  },
  "@resize": {
    options: ['width', 'height'],
    value: {
      set(ctx, obj) {
        if (obj.state === 'finish') {
          fitImage(ctx)
        }
      }
    }
  },
  ":root": [
    {
      title: '参考图片',
      type: 'ImageSelector',
      description: '图片地址或内容(base64)',
      value: {
        get({data}) {
          return data.image
        },
        set({data}, value: string) {
          data.image = value
        }
      }
    },
    // null,
    // {
    //   title: '编辑',
    //   items: [
    //     {
    //       title: '突出主体',
    //       type: 'button',
    //       description: '剪除多余背景，突出主体',
    //       value: {
    //         set(ctx) {
    //           autoCrop(ctx)
    //         }
    //       }
    //     }
    //   ]
    // }
  ]
}