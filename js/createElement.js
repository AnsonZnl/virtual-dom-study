// 创建虚拟的DOM的方法，返回一个使用JS对象描述的虚拟节点
function createElement(type, props, children) {
    return new Element(type, props, children)
}