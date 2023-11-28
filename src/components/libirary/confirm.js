import XtxConfirmBox from './xtx-confirm.vue'
import message from './message';
import { createVNode, render } from 'vue'

const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm');
document.body.appendChild(div)
export default ({ title, message }) => {
    return new Promise((resolve, reject) => {
        const cancelCallback = () => {
            render(null, div)
            reject(new Error('cancel'))
        }
        const confirmCallback = () => {
            render(null, div)
            resolve('')
        }
        const vender = createVNode(XtxConfirmBox, { title, message, cancelCallback, confirmCallback })
        render(vender, div)
    })
}