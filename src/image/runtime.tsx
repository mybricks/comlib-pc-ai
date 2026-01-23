import React, {useEffect} from 'react'
import css from './css.less'

import {fitImage, init} from './utils'

export default function AIImg(props: { data, style, env }) {
  const {data, style, env} = props
  const imagePath = data.image

  const imageProcesser = env.edit?.imageProcesser

  useEffect(() => {
    if (imageProcesser) {
      init(imageProcesser)
    }
  }, [imageProcesser])

  useEffect(() => {
    if (!data._inited) {
      if (imageProcesser && imagePath) {
        data._inited = true
        fitImage(props)
      }
    }
  }, [imageProcesser, imagePath])

  if (imagePath) {
    return (
      <div className={css.aiImg}>
        <img src={imagePath} alt={data.alt}/>
      </div>
    )
  } else {
    return (
      <div className={css.aiImg}>
        {/*<textarea onKeyDown={e => {*/}
        {/*  //当回车时*/}
        {/*  if (e.keyCode === 13) {*/}
        {/*    debugger*/}
        {/*  }*/}
        {/*}}>*/}

        {/*</textarea>*/}
      </div>
    )
  }
}
