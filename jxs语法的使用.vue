<script lang="jsx">
import { ref } from 'vue';

export default {
    name: 'jxs',
    setup() {
        let a = ref(10);
        let b = ref(20);

        // 事件绑定
        const confirm = () => {
            a.value++;
        }
        const confirmStep = (step) => {
            b.value += step;
        }
        return {
            a,
            b,
            confirm,
            confirmStep
        }
    },
    render() {
        const zks = 'background: #ccc;padding:25px;';

        // 访问 setup 内的变量
        const sum = this.a + this.b;
        // 可以绑定多个实例
        const btn = [
            <button onClick={this.confirm}>a+1</button>,
            // 携带参数
            <button onClick={() => this.confirmStep(2)}>b+2</button>
        ];

        const spanStyle="font-size: 25px;color: #fff;"
        return (
            <div style={zks} class={'zzks'}>
                <span style={spanStyle}>  a的值为{this.a}:b的值为:{this.b} a+b的值为:{sum}</span>
                <div class={'box'}>{btn}</div>
                <el-button type="primary">Primary</el-button>
            </div>
        );
    }
}
</script>


<style lang="scss" scoped>
*{
    margin: 10px;
}
.box {
    color: #fff;
    font-size: 25px;
    display: flex;
    align-items: center;
    button{
        width: 120px;
        height: 30px;
        cursor: pointer;
    }
}
</style>