/** 动态获取文件夹下所有的.md 文件 */
const requireModule = require.context('./../knowledge', false, /\.md$/);
const modules = requireModule.keys().reduce((modules, modulePath) => {
  // 获取模块名
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '\$1');
  // 导入模块，并设置为大写字母
  modules[moduleName.toUpperCase()] = requireModule(modulePath).default;
  return modules;
}, {});

/** antd 所有知识库 Map */
export const KnowledgesMap = modules

export default function getKnowledge(packageName: string, com: string) {
  if (packageName === 'antd') {
    const upperCom = com.toUpperCase()
    return KnowledgesMap[upperCom] ?? ''
  }
}