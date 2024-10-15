import { loadExternalAssetsDeps } from './../utils/ai-code/helper'

export function uuid(pre = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789', maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}


export async function polyfillChartsRuntime () {
  await loadExternalAssetsDeps([
    {
      name: 'echarts',
      deps: [
        {
          tag: 'script',
          url: 'https://assets.mybricks.world/mybricks_material_externals/echarts.min.js',
          library: 'echarts',
          fallbackUrls: [
            'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js'
          ]
        }
      ]
    }
  ]);
}

export function safeDecodeParseJsonCode(jsonCode: string) {
  try {
    return JSON.parse(decodeURIComponent(jsonCode))
  } catch (e) {
    console.error(e);
    return null;
  }
}
