import * as types from "./types";

export default function({ constituency }) {
  return function () {
    const importRelyMap = new Map();

    return {
      visitor: {
        ImportDeclaration(path) {
          const { node } = path;
          node.specifiers.forEach((specifier) => {
            if (types.isImportSpecifier(specifier)) {
              importRelyMap.set(specifier.local.name, node.source.value);
            }
          })
        },
        VariableDeclarator(path) {
          const { id, init } = path.node;
          if (types.isIdentifier(id) && types.isMemberExpression(init)) {
            const name = path.node.id?.name;
            const relyName = path.node.init?.object?.loc?.identifierName;
            importRelyMap.set(name, relyName);
          }
        },
        JSXElement(path) {
          const { node } = path;
          const dataLocValueObject: any = {
            jsx:{start:node.start,end:node.end},
            tag:{end:node.openingElement.end},
          }
          const cn = node.openingElement.attributes.find((a) => a.name.name === "className")?.value?.expression?.property?.name;
  
          if (cn) {
            dataLocValueObject.cn = cn
            const { relyName, source } = findRelyAndSource(node.openingElement.name.name, importRelyMap);

            constituency.push({
              className: cn,
              component: relyName,
              source,
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
        },
        Program: {
          exit() {
            // 解析/遍历结束：整棵 AST 已访问完，importRecord 等已收集完毕
            console.log("[@importRelyMap]", { importRelyMap })
          }
        }
      }
    };
  }
}

function findRelyAndSource(relyName, importRelyMap) {
  const value = importRelyMap.get(relyName);
  if (value == null) {
    return { relyName, source: null };
  }
  // value 可能是 source（直接 import），也可能是另一个 relyName（解构自 Typography.Text）
  const nextValue = importRelyMap.get(value);
  if (nextValue !== undefined) {
    // value 仍是 relyName，继续递归，最终返回链末的 { relyName, source }
    return findRelyAndSource(value, importRelyMap);
  }
  // value 是 source，relyName 即为最后一个从 source 解构出来的 relyName
  // 除了三方库，就是html
  return { relyName, source: value || "html" };
}
