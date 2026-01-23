import {fitImage} from "./utils";

export default {
  role: 'imageDev',
  active: true,
  getImage({data, style}) {
    return data.image
  },
  execute(ctx: { data, style, env }, val) {
    fitImage(ctx, val.image)


    // const imageProcessor = env.imageProcessor
    // if (imageProcessor) {
    //   imageProcessor.read(val.image).then((img) => {
    //
    //     const nowWidth = style.width
    //     const nowHeight = style.height
    //
    //     const fitWidth = nowWidth * 2
    //     const fitHeight = nowHeight * 2
    //
    //     let newImg = img
    //     if (img.width > fitWidth || img.height > fitHeight) {
    //       newImg = img.resize({w: fitWidth})
    //     }
    //
    //     if (newImg.width !== fitWidth || newImg.height !== fitHeight) {
    //       newImg = newImg.contain({w: fitWidth, h: fitHeight})
    //     }
    //
    //     newImg.getBase64("image/png").then((base64) => {
    //       //console.log(base64)
    //
    //       data.image = base64
    //     })
    //   })
    // }

    //data.image = val.image
  },
  getPromptsAppend({data, style}) {
    return `notice:the current image size is:${style.width * 2}x${style.height * 2}。`
  }
}