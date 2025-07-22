// 数据的递归遍历
export function traverseData(data: any[], callback: (item: any) => void) {
  data.forEach((item) => {
    callback(item)
    if (item.children && item.children.length > 0) {
      traverseData(item.children, callback)
    }
  })
}
// 获取所有的叶子节点
export function getLeafNodes(data: any[]): any[] {
  const leafNodes: any[] = []
  traverseData(data, (item) => {
    if (!item.children || item.children.length === 0) {
      leafNodes.push(item)
    }
  })
  return leafNodes
}
// 获取所有的父节点
export function getParentNodes(data: any[]): any[] {
  const parentNodes: any[] = []
  traverseData(data, (item) => {
    if (item.children && item.children.length > 0) {
      parentNodes.push(item)
    }
  })
  return parentNodes
}
// 获取所有的节点，树的扁平化
export function getAllNodes(data: any[]): any[] {
  const allNodes: any[] = []
  traverseData(data, (item) => {
    allNodes.push(item)
  })
  return allNodes
}
// 获取节点中的某个属性值
export function getNodeProperty(data: any[], property: string): any[] {
  const propertyValues: any[] = []
  traverseData(data, (item) => {
    if (item.hasOwnProperty(property)) {
      propertyValues.push(item[property])
    }
  })
  return propertyValues
}

//求树的深度
export function getTreeDepth(nodes: any[]): number {
  if (!nodes || nodes.length === 0) return 0
  let maxDepth = 0
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      const childDepth = getTreeDepth(node.children)
      maxDepth = Math.max(maxDepth, childDepth)
    }
  }

  return maxDepth + 1
}

//获取树中某个属性的最大值
export function getMaxPropertyValue(data: any[], property: string): number {
  let maxValue = -Infinity
  traverseData(data, (item) => {
    if (item.hasOwnProperty(property) && typeof item[property] === 'number') {
      if (item[property] > maxValue) {
        maxValue = item[property]
      }
    }
  })
  return maxValue === -Infinity ? 0 : maxValue
}

// 给每个节点添加父节点的引用
export function addParentReferences(data: any[], parent: any = null): void {
  data.forEach((item) => {
    item.parent = parent
    if (item.children && item.children.length > 0) {
      addParentReferences(item.children, item)
    }
  })
}

//标记出每个节点的深度
export function markNodeDepth(data: any[], depth: number = 0): void {
  data.forEach((item) => {
    if (item.children && item.children.length > 0) {
      markNodeDepth(item.children, depth + 1)
    }
    item.depth = depth
  })
}
