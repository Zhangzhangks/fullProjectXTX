<script lang="jsx">
import { useVModel } from '@vueuse/core'
import { computed, provide, ref, toRefs } from 'vue'
export default {
    name: 'XtxTabs',
    // jsx语法，它能够让我们创建节点和写html一样
    // 1. 动态插值表达式{} 2. 尽量三元表示式做判断，使用map来遍历 3.事件使用原始方式绑定
    // 默认插槽节点
    props: {
        modelValue: {
            type: [Number, String],
            default: 0
        }

    },
    setup(props, { emit }) {

        const { modelValue: activeName } = toRefs(props);
        const toggle = (name, index, e) => {
            // console.log(name, index, e);
            emit('update:modelValue', name)
            emit('tab-click', { name, index }, e)
        }

        provide('activeName', activeName);

        return { toggle }
    },
    render() {
        const panels = this.$slots.default();
        // console.log(panels);
        // 支持动静结合 v-for渲染和直接渲染
        const content = []
        panels.forEach(item => {
            // 静态 v-for的初始渲染
            if (item.type.name === "XtxTabsPanel") {
                content.push(item)
            } else {
                item.children.forEach(ele => {
                    // console.log(ele);
                    content.push(ele)
                });

            }
        })

        const nav = <nav>{
            content.map((item, index) => {
                return <a class={{ active: item.props.name === this.modelValue }} href='javascript:;'
                    onClick={($event) => this.toggle(item.props.name, index, $event)}>{item.props.label}</a>
            })
        }
        </nav>


        return <div class={'xtx-tabs'}>{[nav, panels]}</div>
    }
}
</script>
<style scoped lang="scss">
.xtx-tabs {
    background: #fff;

    >nav {
        height: 60px;
        line-height: 60px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        >a {
            width: 110px;
            border-right: 1px solid #f5f5f5;
            text-align: center;
            font-size: 16px;

            &.active {
                border-top: 2px solid $xtxColor;
                height: 60px;
                background: #fff;
                line-height: 56px;
            }
        }
    }
}
</style>