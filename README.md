# 小兔仙完整项目重构

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
