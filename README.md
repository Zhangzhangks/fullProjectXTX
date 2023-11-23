# 小兔仙完整项目重构

# 1. vue/core 的 useIntersectionObserver 的底层原理

// 创建观察对象实例
const observer = new IntersectionObserver(callback[, options])
// callback 被观察 dom 进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中 isIntersecting 判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是 document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个 dom
// unobserve(dom) 停止观察那个 dom
import defaultImg from '@/assets/images/200.png'
// 指令
const defineDirective = (app) => {
// 图片懒加载指令
app.directive('lazyload', {
mounted (el, binding) {
const observer = new IntersectionObserver(([{ isIntersecting }]) => {
if (isIntersecting) {
observer.unobserve(el)
el.onerror = () => {
el.src = defaultImg
}
el.src = binding.value
}
}, {
threshold: 0.01
})
observer.observe(el)
}
})
}

# 2. animated 新三方组件库的使用 animate**animated animate**backInRight

:key 的作用是虚拟节点，监听不同节点来实现动画
<Transition enter-active-class="animate__animated  animate__backInRight"
            leave-active-class="animate__animated animate__backOutRight">
<XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
</Transition>

# 1. scss 的混入

在 VScode 中 Sass 和 Less 混入、命名空间、继承语法的编码差异让我们一起对比揭露吧

混入语法
命名空间语法
继承语法
总结 1.混入语法
混入即不同的 CSS 组合到一起在 SCSS 中。

SCSS 的混入运用@mixin——@include；CSS 文件中不生成所引入模块。

SCSS.scss 的混入语法代码，如下所示：

@mixin show{display: block;}
@mixin hide($color){
display: none;
color: $color;
}
.box1{
width: 100px;
@include show;
@include hide(red);
}
SCSS.css 的混入语法代码代码显示如下：

.box1 {
width: 100px;
display: block;
display: none;
color: red;
}
LESS 的混入运用.show{}——.show()；且 CSS 文件中生成所引入模块，如果想要隐藏在 LESS 中给所引模块加（）

LESS.less 的混入语法代码，如下所示：

.show{display: block;}
.hide(@color){
color: @color;
}
.box1{
width: 100px;
.show;
.hide(red);
}
LESS.css 的混入语法代码代码显示如下：

.show {
display: block;
}
.box1 {
width: 100px;
display: block;
color: red;
} 2.命名空间语法
只针对 LESS 文件起作用，首先用#命名再调用。

LESS.less 的命名空间语法代码，如下所示：

#mm(){
.show{display:inline-block;}
}
.box2{
#mm.show;
}
LESS.css 的命名空间语法代码显示如下：

.box2 {
display: inline-block;
} 3.继承语法
SCSS 的继承运用@extend，继承语法代码，如下所示：

.line{
display: inline;
}
.box2{@extend .line;}
.box3{@extend .line;}
SCSS.css 的继承语法代码代码显示如下：

.line, .box2, .box3 {
display: inline;
}
LESS 的继承运用&:extend( )，LESS.less 继承语法代码，如下所示：

.line{display: inline-block;}
.box3{&:extend(.line);}
.box4{&:extend(.line);}
LESS.css 的继承语法代码代码显示如下：

.line,
.box3,
.box4 {
display: inline-block;
} 4.总结：
混入语法：SCSS 运用@mixin——@include；LESS 运用.show{}——.show()；
命名空间语法：只针对 LESS 文件起作用，首先用#命名再调用；
继承语法：SCSS 运用@extend，LESS 运用&:extend( )。
