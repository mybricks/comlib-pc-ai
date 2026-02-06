interface ToReactParams {
  id: string;
  data: {
    componentConfig?: string;
    configJsCompiled?: string;
    configJsSource?: string;
    modelConfig?: string;
    runtimeJsxCompiled?: string;
    runtimeJsxSource?: string;
    styleCompiled?: string;
    styleSource?: string;
    _cssErr?: string;
    _jsxErr?: string;
  };
  style?: any;
}

interface FileItem {
  name: string;
  content: string;
}

interface ToReactResult {
  jsx: string;
  componentName: string;
  files: FileItem[];
}

/**
 * 生成唯一的组件名称（基于 id）
 */
function generateComponentName(id: string): string {
  // 将 id 转换为合法的组件名称（PascalCase）
  // 例如: "u_abc123" -> "UAbc123"
  const cleaned = id.replace(/[^a-zA-Z0-9]/g, '_');
  const pascalCase = cleaned
    .split('_')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  return pascalCase || 'AiMixComponent';
}

/**
 * 生成组件的唯一标识符
 */
function generateUUID(id: string): string {
  // 直接使用传入的 id 作为 uuid
  return id;
}

/**
 * 解码组件配置字符串
 */
function decodeConfig(configStr?: string): any {
  if (!configStr) return {};
  
  try {
    // 解码 URL 编码的字符串
    const decoded = decodeURIComponent(configStr);
    return JSON.parse(decoded);
  } catch (e) {
    console.error('Failed to decode config:', e);
    return {};
  }
}

/**
 * 提取导入语句和移除源码中的导入
 */
function extractImports(sourceCode: string): { imports: string; code: string } {
  const lines = sourceCode.split('\n');
  const importLines: string[] = [];
  const codeLines: string[] = [];
  
  for (const line of lines) {
    if (line.trim().startsWith('import ')) {
      importLines.push(line);
    } else {
      codeLines.push(line);
    }
  }
  
  return {
    imports: importLines.join('\n'),
    code: codeLines.join('\n')
  };
}

export default function toReact({ id, data, style }: ToReactParams): ToReactResult {
  const componentName = generateComponentName(id);
  const uuid = id; // 直接使用传入的 id 作为 uuid
  const files: FileItem[] = [];
  
  // 1. 处理组件主文件 (index.tsx)
  const runtimeJsxSource = data.runtimeJsxSource || '';
  const { imports, code } = extractImports(runtimeJsxSource);
  
  const componentContent = `${imports}
import React from 'react';
import './style.css';

${code}

export default ${componentName};
`;
  
  files.push({
    name: 'index.tsx',
    content: componentContent.trim()
  });
  
  // 2. 处理样式文件 (style.css)
  const styleContent = data.styleSource || data.styleCompiled || '';
  files.push({
    name: 'style.css',
    content: styleContent
  });
  
  // 3. 处理配置文件 (config.ts) - 如果存在
  if (data.configJsSource) {
    const configContent = `${data.configJsSource}`;
    files.push({
      name: 'config.ts',
      content: configContent
    });
  }
  
  // 4. 处理模型配置 (model.json) - 如果存在
  if (data.modelConfig) {
    const modelConfig = decodeConfig(data.modelConfig);
    files.push({
      name: 'model.json',
      content: JSON.stringify(modelConfig, null, 2)
    });
  }
  
  // 5. 生成父级使用的 JSX
  const componentConfig = decodeConfig(data.componentConfig);
  const propsArray: string[] = [`id="${uuid}"`];
  
  // 根据 componentConfig 添加属性
  if (componentConfig.inputs) {
    Object.keys(componentConfig.inputs).forEach(key => {
      propsArray.push(`${key}={${key}}`);
    });
  }
  
  const jsx = `<${componentName} ${propsArray.join(' ')} />`;
  
  return {
    jsx,
    componentName,
    files
  };
}