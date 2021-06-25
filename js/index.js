// 描述虚拟DOM的JS对象
let jsDomObj = {
    type: 'ul',
    props: {
        class: 'list'
    },
    children: [
        createElement('li', {
            class: 'item'
        }, ['周杰伦']),
        createElement('li', {
            class: 'item'
        }, ['林俊杰']),
        createElement('li', {
            class: 'item'
        }, ['王力宏'])
    ]
}
// 通过createElement将JS对象转化为虚拟DOM
let virtualDom = createElement(jsDomObj.type, jsDomObj.props, jsDomObj.children);
// 打印 虚拟DOM
console.log('虚拟DOM\n', virtualDom);

// 渲染虚拟DOM得到真实的DOM结构
let el = render(virtualDom);

// 打印 真实DOM
console.log('真实DOM\n', el);

// 直接将DOM添加到页面内
renderDom(el, document.getElementById('root'));