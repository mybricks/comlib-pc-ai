/** antd所有组件知识库 */
export const ANTD_KNOWLEDGES_MAP: Record<string, string> = (function () {
  const markdowns = require.context('./antd', false, /\.md$/);
  return markdowns.keys().reduce((modules, name) => {
    // 获取模块名
    const moduleName = name.replace(/^\.\/(.*)\.\w+$/, '$1')
    // 导入模块
    modules[moduleName.toUpperCase()] = markdowns(name).default
    return modules
  }, {})
})();

interface EchartsMap {
  
}

/** echarts所有组件知识库 */
export const ECHARTS_KNOWLEDGES_MAP: Record<string, string> = (function () {
  const markdowns = require.context('./echarts', false, /\.md$/);
  return markdowns.keys().reduce((modules, name) => {
    // 获取模块名
    const moduleName = name.replace(/^\.\/(.*)\.\w+$/, '$1')
    // 导入模块
    modules[moduleName] = markdowns(name).default
    return modules
  }, {})
})();

