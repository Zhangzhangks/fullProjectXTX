//1. 组件支持 import {}from 调用  this.$message()调用


//1. 引入组件
import XtxMessage from './xtx-message.vue'
import { createVNode, render } from 'vue'

const div = document.createElement('div');
div.setAttribute('class', "xtx-container");
document.body.appendChild(div);
let timer = null
export default ({ text, type }) => {
    //1.创建虚拟节点
    const vender = createVNode(XtxMessage, { text, type })
    //2. 准备DOm
    render(vender, div)
    clearTimeout(timer)
    timer = setTimeout(() => {
        //3. 销毁
        render(null, div)
    }, 3000)
}