// render 方法可以将虚拟DOM转化为真是的DOM
function render(vDom) {
    let {
        type,
        props,
        children
    } = vDom;
    // 创建元素
    let el = document.createElement(type);
    // 遍历props，设置属性
    for (let key in props) {
        setAttr(el, key, props[key])
    }
    // 遍历子节点
    // 如果是虚拟DOM，就递归
    // 不是就是文本节点，直接创建
    children.forEach(childEl => {
        childEl = (childEl instanceof Element) ?
            render(childEl) :
            document.createTextNode(childEl);
        el.appendChild(childEl);
    });
    // 创建完毕返回节点
    return el;
}
// 设置属性
function setAttr(node, key, value) {
    if (key === 'value') {
        // 如果是value，则表明是input、textarea节点
        let tagName = node.tagName.toLowerCase();
        if (tagName == 'input' || tagName == 'textarea') {
            node.value = value;
        } else {
            node.setAttribute(key, value)
        }
    } else if (key === 'style') {
        // 直接设置的行内样式
        node.style.cssText = value
    } else {
        // 设置的属性 比如class、id、dataset等
        node.setAttribute(key, value)
    }
}