import React from "react";
import LowcodeView from "./view"
import lowcodeViewCss from "./view/index.lazy.less"

export default function (params: any) {
  const { context } = params;
  return {
    render(params, plugins){
      context.plugins = plugins;
      context.createVibeCodingAgent({ register: plugins.aiService.registerAgent })

      return (
        <LowcodeView {...params}/>
      )
    },
    useCSS(){
      return [
        lowcodeViewCss
      ]
    }
  }
}