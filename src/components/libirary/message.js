//1. 引入组件
import XtxMessage from './xtx-message.vue'
import { createVNode, nextTick, render } from 'vue'

const div = document.createElement('div');
div.setAttribute('class', 'xtx-message-Container')
document.body.appendChild(div)

//2. 导出一个函数
export default ({ type, text, showClose, duration = 2000 }) => {
    //3. 使用createvnode函数创建组件
    const vender = createVNode(XtxMessage, { type, text })
    let timer = null;
    if (showClose) {
        nextTick(() => {
            let guanbi = document.querySelector('.xtx-message-Container').querySelector('.guanbi')
            guanbi.addEventListener('click', () => {
                clearTimeout(timer)
                render(null, div)
            })
        })
    }
    //4.创建一个容器存放vender节点
    //5. 使用render函数渲染组件
    render(vender, div)
    //6. 创建定时器然后销毁
    timer = setTimeout(() => {
        render(null, div)
        clearTimeout(timer)
    }, duration)
}