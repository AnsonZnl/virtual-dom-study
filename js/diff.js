function diff(odlTree, newTree) {
    // 声明变量 patches 用来存放补丁的对象
    let patches = {};
    // 第一次比较的 应该是树的第0个索引
    let index = 0;
    // 递归树
    walk(odlTree, newTree, index, patches)
    return patches;
}

function walk(oldNode, newNode, index, patches) {
    // 每一个元素都有一个补丁
    let current = [];

    if (!newNode) {
        // ----规则 1 新节点不存在----
        current.push({
            type: 'REMOVE',
            index
        })
    } else if (isString(oldNode) && isString(newNode)) {
        // 是文本节点
        if (oldNode !== newNode) {
            // 文本发生了变化
            current.push({
                type: 'TEXT',
                text: newNode
            })
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性变化
        // debugger
        let attr = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attr).length > 0) {
            // 有更新的属性
            current.push({
                type: 'ATTR',
                attr
            })
        }
        // 如果有子节点，递归子节点
        diffChildren(oldNode.children, newNode.children, patches)
    } else {
        // 都没有 说明节点被替换了
        current.push({
            type: "REPLACE",
            newNode
        })
    }
    // 当前节点有补丁
    if (current.length) {
        patches[index] = current;
    }
}
// 比较是否是 文本 类型
function isString(node) {
    return typeof node === 'string'
}
// 比较属性的差异
function diffAttr(oldProps, newProps) {
    let patch = {};
    // 1. 改变的属性
    // 判断新老属性的变更，把最后的变更放在patch中
    for (let key in oldProps) {
        if (oldProps[key] !== newProps[key]) {
            // 以新属性为准，因为新属性是最后的变更
            patch[key] = newProps[key]
        }
    }
    // 2. 新增的属性
    // 判断 假如新的属性，在老属性中没有，也添加patch
    for (let key in newProps) {
        if (!oldProps[key]) {
            patch[key] = newProps[key]
        }
    }
    return patch
}
// 基于一个num序号来实现的
let num = 0;
// 递归子节点
function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((e, i) => {
        walk(e, newChildren[i], ++num, patches)
    });
}

// https://www.cnblogs.com/wind-lanyan/p/9061684.html