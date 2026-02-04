export default function({ constituency }) {
  return function () {
    const componentToSource = new Map();
    return {
      visitor: {
        ImportDeclaration(path) {
          const { node } = path;
          const source = node.source.value
  
          for (const spec of node.specifiers) {
            if (spec.type === 'ImportSpecifier') {
              const name = spec.imported?.name ?? spec.local.name
              // [TODO] 目前默认引入组件都是解构的
              if (source !== 'react') {
                // react是默认的依赖，不处理
                componentToSource.set(name, source);
              }
            }
          }
        },
        JSXElement(path) {
          const { node } = path;
          const dataLocValueObject: any = {
            jsx:{start:node.start,end:node.end},
            tag:{end:node.openingElement.end},
          }
  
          const classNameNode = node.openingElement.attributes.find((a) => a.name.name === "className")
  
          const cn = classNameNode?.value?.expression?.property?.name;
  
          if (cn) {
            dataLocValueObject.cn = cn
  
            constituency.push({
              className: cn,
              component: node.openingElement.name.name,
              // 除了三方库，就是html
              source: componentToSource.get(node.openingElement.name.name) || "html",
            })
  
            node.openingElement.attributes.push({
              type: 'JSXAttribute',
              name: {
                type: 'JSXIdentifier',
                name: 'data-cn',
              },
              value: {
                type: 'StringLiteral',
                value: cn,
                extra: { 
                  raw: `"${cn}"`,
                  rawValue: cn
                }
              }
            })
          }
  
          const dataLocValue = JSON.stringify(dataLocValueObject)
  
          node.openingElement.attributes.push({
            type: 'JSXAttribute',
            name: {
              type: 'JSXIdentifier',
              name: 'data-loc',
            },
            value: {
              type: 'StringLiteral',
              value: dataLocValue,
              extra: { 
                raw: `"${dataLocValue}"`,
                rawValue: dataLocValue
              }
            }
          })                  
        }
      }
    };
  }
}