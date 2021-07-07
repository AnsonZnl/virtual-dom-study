// patch

let allPatches;
let index2 = 0;

function patch(node, patches) {
    allPatches = patches;
    // 打补丁
    walk2(node)
}


function walk2(node) {
    let current = allPatches[index2++]
    let childNodes = node.childNodes;
    // 先序遍历 继续遍历递归子节点
    childNodes.forEach(child => walk2(child))
    if (current) {
        // debugger
        doPatch(node, current)
    }
}

//打补丁
function doPatch(node, patches) {
    // 遍历所有打过的补丁
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTR':
                for (let key in patch.attr) {
                    let value = patch.attr[key];
                    if (value) {
                        setAttr(node, key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = patch.newNode;
                newNode = (newNode instanceof Element) ? render(newNode) : document.createTextNode(newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    });
}