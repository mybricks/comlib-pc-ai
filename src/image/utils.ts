let imageProcessor

export function init(ip) {
  imageProcessor = ip
}

export function fitImage({data, style}, base64?) {
  const image = base64 || data.image
  if (!image) {
    return
  }

  imageProcessor.read(image).then((img) => {
    const nowWidth = style.width
    const nowHeight = style.height

    const fitWidth = nowWidth * 2
    const fitHeight = nowHeight * 2

    let newImg = img
    if (img.width > fitWidth || img.height > fitHeight) {
      newImg = img.resize({w: fitWidth})
    }

    if (newImg.width !== fitWidth || newImg.height !== fitHeight) {
      newImg = newImg.contain({w: fitWidth, h: fitHeight})
    }

    newImg.getBase64("image/png").then((base64) => {
      //console.log(base64)

      data.image = base64
    })
  })
}

export function autoCrop({data, style}, base64?) {
  const image = base64 || data.image
  if (!image) {
    return
  }

  imageProcessor.read(image).then((img) => {
    const rst = img.autocrop()
    rst.getBase64("image/png").then((base64) => {
      console.log(base64)

      data.image = base64
    })
  })
}