import {loadBabel, loadLess, transformLess} from '../transform'
import aiEditors from "./editor-ai";

// TODO: 后面去掉
loadLess()
loadBabel()

export default {
  '@init': (params) => {
    const {style, data, id, input, output} = params;
    style.width = 'fit-content';
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height']
  },
  '@ai': aiEditors,
  ':slot': {},
  // '@copy'({data}) {
  //
  //   data._styleCode
  //
  //   transformLess(styleCode, {id}).then(css => {
  //     data._styleCode = encodeURIComponent(css)
  //     data._cssErr = '';
  //   }).catch(e => {
  //     data._cssErr = e?.message ?? '未知错误'
  //   })
  //
  //
  //   debugger
  // },
  // '@toJSON': ({data}) => {
  //   // 只保留运行时需要用的数据
  //   const {code, css, inputs, outputs, slots, _defined, _cssErr, _jsxErr} = data
  //   return {
  //     data: {
  //       code,
  //       css,
  //       inputs: inputs.map(({id}) => {
  //         return {
  //           id
  //         }
  //       }),
  //       outputs: outputs.map(({id}) => {
  //         return {
  //           id
  //         }
  //       }),
  //       slots: slots.map(({id}) => {
  //         return {
  //           id
  //         }
  //       }),
  //       _defined,
  //       _cssErr,
  //       _jsxErr
  //     }
  //   }
  // },

}
