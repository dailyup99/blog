---
outline: deep
---

## 1.CSS选择器及其优先级

| 选择器         | 格式          | 优先级权重 |
| -------------- | ------------- | ---------- |
| id选择器       | #id           | 100        |
| 类选择器       | .classname    | 10         |
| 属性选择器     | a[href="eee"] | 10         |
| 伪类选择器     | li:last-child | 10         |
| 标签选择器     | div           | 1          |
| 伪元素选择器   | li::after     | 1          |
| 相邻兄弟选择器 | h1+p          | 0          |
| 子选择器       | ul > li       | 0          |
| 后代选择器     | li a          | 0          |
| 通配符选择器   | *             | 0          |

对于选择器的优先级：

* 标签选择器、伪元素选择器：1
* 类选择器、伪类选择器、属性选择器：10
* id选择器：100
* 内联样式：1000

注意事项：

* !important声明的样式的优先级最高
* 如果优先级相同，则最后出现的样式生效
* 继承得到的样式的优先级最低
* 通用选择器（*）、子类选择器（>）、和相邻同胞选择器（+）并不在这个四个等级中，所以它们的权重为0；
* 样式表的来源不同时，优先级顺序为：内联样式>内部样式>外部样式>浏览器用户自定义样式>浏览器默认样式

## 2.CSS中可继承与不可继承属性有哪些？

**一、无继承性的属性**

1、display: 规定元素应该生成的框的类型

2、文本属性：

* vertical-align: 垂直文本对齐
* text-decoration: 规定添加到文本的装饰
* text-shadow: 文本阴影效果
* white-space: 空白符的处理
* unicode-bidi：设置文本的方向

3、盒子模型的属性：width、height、margin、border、padding

4、背景属性：background、background-color、background-image、background-repeat、background-position、background-attchment

5、定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

6、生成内容属性：content、counter-reset、counter-increment

7、轮廓样式属性：outline-style、outline-width、outline-color、outline

8、页面样式属性：size、page-break-before、page-break-after

9、声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

**二、有继承性的属性**

1.字体系列属性

* font-family: 字体系列
* font-weight: 字体的粗细
* font-size: 字体的大小
* font-style: 字体的风格

2.文本系列属性

* text-indent: 文本缩进
* text-aligin：文本对齐方式
* line-height: 行高
* word-spacing: 单词之间的间距
* letter-spacing: 中文或字母之间的间距
* text-transform:控制文本大小写（就是uppercase、lowercase、capitalize这三个）
* color：文本颜色

3.元素可见性

* visibility: 控制元素显示隐藏

4.列表布局属性

* list-style：列表风格，包括list-style-type、list-style-image等

5.光标属性

* cursor: 光标显示为何种形态

## 3.display的属性和作用

![image-20250104190120919](http://139.196.79.103:9001/myimages/imgs/20250104190120946.png)

## 4.display的block、inline和inline-block的区别

（1）**block**：会独占一行，多个元素会另起一行，可以设置width、height、margin、padding属性；

（2）**inline**：元素不会独占一行，设置width、height属性无效。但可以设置水平方向的margin和padding属性，不能设置垂直方向的padding和margin；

（3）**inline-block**：将对象设置为inline对象，但对象的内容作为block对象呈现，之后的内联对象会被排列在一行内。

对于行内元素和块级元素，其特点如下：

**（1）行内元素**

* 设置宽高无效
* 可以设置水平方向的margin和padding属性，不能设置垂直方向的margin和padding
* 不会自动换行

**（2）块级元素**

* 可以设置宽高
* 设置margin和padding都有效
* 可以自动换行
* 多个块级，默认排列从上到下

## 5.隐藏元素的方法有哪些？

**display: none**，渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件；

**visibility: hidden**，元素在页面中仍占据空间，但是不会响应绑定的监听事件；

**opacity: 0**，将元素的透明度设置为0，以此来实现元素的隐藏。元素在页面中仍占据空间，并且能够响应元素绑定的监听事件；

**position: absolute**，通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏；

**z-index: 负值**，来使其他元素遮盖住该元素，以此来实现隐藏；

**clip/clip-path**，使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件；

```css
.hide {
  clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);
}
```

**transform: scale(0,0)**，将元素缩放为0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

display：none会引起重排和重绘；visibility: hidden不会触发重排，但是会触发重绘；opacity: 0不会触发重排，不一定会触发重绘。

> 如果利用 animation 动画，对 opacity 做变化（animation会默认触发GPU加速），则只会触发 GPU 层面的 composite，不会触发重绘

## 6.link和@import的区别

两者都是外部引用CSS的方式，它们的区别如下：

* link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS
* link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载
* link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持
* link支持使用js控制DOM去改变样式；而@import不支持

## 7.display: none与visibility: hidden的区别

这两个属性都是让元素隐藏，不可见。两者区别如下：

**（1）在渲染树中**

* `display:none`会让元素完全从渲染树中消失，渲染时不会占据任何空间
* `visibility:hidden`不会让元素从渲染树中消失，渲染的元素还会占据相应的空间，只是内容不可见

**（2）是否是继承属性**

* `display: none`是非继承属性，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示；
* `visibility: hidden`是继承属性，子孙节点消失是由于继承了hidden，通过设置`visibility: visible`可以让子孙节点显示；

（3）修改常规文档流中元素的display通常会造成文档的重排，但是修改visibility属性只会造成本元素的重绘；

（4）如果使用读屏器，设置为`display：none`的内容不会被读取，设置为`visibility:hidden`的内容会被读取

## 8.伪元素和伪类的区别和作用

伪元素：在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此被称为“伪”元素。例如：

```css
p::before {content:"第一章:";}
p::after {content:"Hot!";}
p::first-line {background:red;}
p::first-letter {font-size:30px;}
```

伪类：将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：

```css
a:hover {color: #FF00FF;}
p:first-child {color: red;}
```

## 9.对盒模型的理解

CSS3中盒模型有以下两种：标准盒子模型、IE盒子模型

![image-20250105135232698](http://139.196.79.103:9001/myimages/imgs/20250105135239801.png)

![image-20250105135254258](http://139.196.79.103:9001/myimages/imgs/20250105135254303.png)

盒模型都是四个部分组成的，分别是margin、border、padding和content。

标准盒模型和IE盒模型区别在于设置width和height时，所对应的范围不同。

* 标准盒模型的width和height属性的范围只包含了content
* IE盒模型的width和height属性的范围包含了border、padding和content

可以通过修改元素的box-sizing属性来改变元素的盒模型：

* box-sizing: content-box表示标准盒模型（默认值）
* box-sizing: border-box表示IE盒模型（怪异盒模型）

## 10.CSS3中有哪些新特性

* 新增各种CSS选择器
  * 新的属性选择器，如[attr^=value]（属性值以特定字符串开始）
  * 结构性伪类，如:nth-child、：nth-last-child、:first-of-type
* 背景和边框
  * 边框圆角（border-radius）
  * 边框图片（border-image）
  * 多重背景，支持在单个元素上使用多个背景图片
* 文本效果
  * 文本阴影（text-shadow）
  * 文本溢出（text-overflow）
* 转移和动画
  * 2D和3D转换（transfrom），包括旋转（rotate）、缩放（scale）、倾斜（skew）和平移（translate）
  * CSS动画（animation）

* 线性渐变（linear-gradient）

## 11.对CSSSprites的理解

CSSSprits（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的background-image，background-repeat，background-position属性的组合进行背景定位。

优点：

* 利用CSS Sprites能很好地减少网页的http请求，从而大大提高了页面的性能，这是CSS Sprites最大的优点
* CSS Sprites能减少图片的字节，把3张图片合并成一张图片的字节总是小于3张图片的字节总和

缺点：

* 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止模块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，容易出现背景断裂
* CSSSprites在开发的时候相对来说优点麻烦，需要借助photoshop或其他工具来对每个背景单元测量其准确的位置
* 维护方面：CSS Sprites在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的CSS，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动CSS

## 12.什么是物理像素，逻辑像素和像素密度

* 物理像素也称为设备像素，是显示屏幕的最小物理单位，也就是说它是实际的物理存在的单位，是由设备的硬件决定
* 但是我们知道现在的显示器也好，手机也好，它们的分辨率也就是物理像素差别非常大，我们开发者如果面向物理像素开发就需要先考虑每个设备的真实分辨率，开发的难度就会大大提升
* 所以操作系统和浏览器就抽象出另外的一种像素，我们称之为逻辑像素，也被称之为设备独立像素
* 逻辑像素是一个抽象的单位，用于在编程中统一不同设备的显示标准。这样，无论设备的物理像素如何，使用逻辑像素单位开发的界面都能保持相对一致的大小和视觉效果
* 当然这个过程中还衍生出很多不同的概念，比如PPI（物理像素的密度，每英寸的物理像素数量），DPR（设备像素比，也就是一个逻辑像素对应的物理像素数量），DPI（每英寸打印点数，它主要应用于打印领域）

## 13.为什么在移动端使用@2x、@3x的图片？

目前在移动端设备中，有非常多高分辨率的设备。为了适应不同的像素密度，UI设计师通常需要为开发者提供多个版本的图像资源。

通常标记为@1x、@2x、@3x：

* @1x图像：基本尺寸，适用于低分辨率设备
* @2x图像：是基本图像尺寸的2倍，适用于中等分辨率设备，device-pixel-ratio为2的设备
* @3x图像，是基本图像尺寸的3倍，适用于高分辨率设备，device-pixel-ratio为3的设备

如果都使用的@1x的图片，在高分辨率下图像会非常模糊，模糊的图像可能会使得产品显得粗糙，影响用户对应用品质的整体感觉。

我们开发Web可以通过媒体查询来设置不同的图像：

MDN上-webkit-min-device-pixel-radio其实是一个非标准的特性，也就意味着不建议在生产环境使用；它推荐我们使用另外一个特性: resolution

```html
<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <style>
     .box {
         width: 132px;
         height: 171px;
         background-color: red;
         background-image: url(./img/zznh.png);
         background-size: cover;
      }
     /* 针对2x屏幕 */
     @media only screen and (min-resolution: 2dppx) {
        .box {
            background-image: url('./img/zznh@2x.png'); 
          }
        }
     /* 针对3x屏幕 */
     @media only screen and (min-resolution: 3dppx) {
        .box {
            background-image: url('./img/zznh@3x.png'); 
          }
        }
     </style>
</head>
<body>
	<div class="box"></div>
</body>
</html>
```

## 14.对line-height的理解及其赋值方式

**（1）line-height的概念**

* line-height指一行文本的高度，包含了字间距，实际上是下一行基线到上一行基线距离
* 如果一个标签没有定义height属性，那么其最终表现的高度由line-height决定
* 一个容器没有设置高度，那么撑开容器高度的是line-height，而不是容器内的文本内容
* 把line-height值设置为height一样大小的值可以实现单行文字的垂直居中
* line-height和height都能撑开一个高度

**（2）line-height的赋值方式**

* 带单位：px是固定值，而em会参考父元素font-size计算自身的行高
* 纯数字：会把比例传递给后代。例如，父级行高为1.5，子元素字体为18px，则子元素行高为1.5*18=27px
* 百分比：将计算后的值传递给后代

## 15.CSS优化和提高性能的方法有哪些？

**加载性能：**

（1）CSS压缩：将写好的CSS进行打包压缩，可以减小文件体积

（2）CSS单一样式：当需要下边距和左边距的时候，很多时候会选择使用margin: top 0 bottom 0；但margin-bottom: bottom;margin-left:left;执行效率会更高

（3）减少使用@import，建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载

**选择器性能：**

（1）关键选择器，选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分），CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；

（2）如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签；

（3）避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择；

（4）尽量少的去对标签进行选择，而是用class；

（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素；

（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则；

**渲染性能：**

（1）慎重使用高性能属性：浮动、定位；

（2）尽量减少页面重排、重绘；

（3）去除空规则：{}，空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少CSS文档体积；

（4）属性值为0时，不加单位；

（5）属性值为浮动小数0.**，可以省略小数点之前的0；

（6）标准化各种浏览器前缀：带浏览器前缀的在前，标准属性在后；

（7）不使用@import前缀，它会影响CSS的加载速度；

（8）选择器优化嵌套，尽量避免层级过深；

（9）CSS雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用；

（10）正确使用display属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也会影响解析性能；

（11）不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能；

**可维护性、健壮性：**

（1）将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高CSS的可维护性；

（2）样式与内容分离：将CSS代码定义到外部CSS中

## 16.CSS预处理器/后处理器是什么？为什么要使用它们？

**预处理器**，比如less，sass，stylus，用来预编译sass或者less，增加了css代码的复用性。层级，mixin，变量，继承，循环，函数等对编写以及开发UI组件都极为方便。

**层级或嵌套**

```less
.a {
    &.b {
        color: red;
    }
}
```

**变量**

less

```css
@red: #c00;

strong {
    color: @red;
}
```

sass

```css
$red: #c00;

strong {
    color: $red;
}
```

**混入（mixin）**

less

```css
.alert {
    font-wight: 700;
}

.highlight(@color: red) {
    font-size: 1.2em;
    color: @color;
}

.heads-up {
    .alert;
    .heighlight(red);
}
```

sass

```css
@mixin large-text {
    ...
}

.page-title {
    @include large-text;
}
```

**继承**

less

```css
.box_border {
    border: 5px solid #f00;
}

.box {
    &:extend(.box_border);
}
```

sass

```css
.alert {
    ...
}

.alert-success {
    @extend .alert;
}
```

**后处理器**，如：postCss，通常是在完成的样式表中根据css规范处理css，让其更加有效。目前最常做的是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

使用原因：

* 结构清晰，便于扩展
* 可以很方便的屏蔽浏览器私有语法的差异
* 可以轻松实现多重继承
* 完美的兼容了CSS代码，可以应用到老项目中

## 17.单行、多行文本溢出隐藏

* 单行文本溢出

```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
white-space: nowrap; //规定段落中的文本不进行换行
```

* 多行文本溢出

```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
display: -webkit-box; // 作为弹性伸缩盒子模型显示
-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp: 3; // 显示的行数
```

## 18.对媒体查询的理解

```css
<!-- link元素中的CSS媒体查询-->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />
<!-- 样式表中的CSS媒体查询 -->
<style>
@media (min-width: 320px) and (max-width: 375px) {
    .box { font-size: 15px; }
}
@media (min-width: 375px) and (max-width: 414px) {
    .box { font-size: 18px; }
}
@media (min-width: 414px) and (max-width: 480px) {
    .box { font-size: 21px; }
}
@media (min-width: 480px) {
    .box { font-size: 24px; }
}
</style>
```

@media可以针对不同的屏幕尺寸设置不同的样式，特别是需要设置设计响应式的页面，@medias是非常有用的。当重置浏览器大小的过程中，页面会根据浏览器的宽度和高度重新渲染页面。

## 19.如何判断元素是否到达可视区域？

以图片显示为例：

* window.inerHeight是浏览器可视区域高度
* document.body.scrollTop || document.documentElement.scrollTop是浏览器滚动过的距离
* img.offsetTop是元素顶部距离文档顶部的高度（包括滚动条的距离）
* 内容到达显示区域：img.offsetTop < window.innerHeight + document.body.scrollTop

![image-20250105184558683](http://139.196.79.103:9001/myimages/imgs/20250105184558755.png)

## 20.z-index属性在什么情况下会失效？

通常z-index的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另外一个的上方或者下方出现。z-index值越大就越是在上层。z-index元素的position属性需要是relative，absolute或者fixed。

z-index属性在下列情况下会失效：

* 父元素position为releative时，子元素的z-index失效。解决：父元素position改为absolute或static；
* 元素没有设置position属性为非static属性。解决：设置该元素的position属性为releative，absolute或者是fixed中的一种；
* 元素在设置z-index的同时还设置了float浮动。解决：float去除，改为display: inline-block

## 21.对requestAnimationFrame的理解

实现动画效果的方法比较多，js中可以通过定时器setTimeout来实现，CSS3中可以使用transition和animation来实现，HTML5中的canvas也可以实现。除此之外，HTML5提供一个专门用于请求动画的API，那就是requestAnimationFrame，顾名思义就是请求动画帧。

语法：window.requestAnimationFrame(callback)；其中，callback是下一次重绘之前更新动画帧所调用的函数。该回调函数会被传入DOMHighResTimeStamp参数，它表示requestAnimationFrame()开始去执行回调函数的时刻。该方法属于宏任务，所以会在执行完微任务之后再去执行。

取消动画：使用cancelAnimationFrame()来取消执行动画，该方法接收一个参数——requestAnimationFrame默认返回的id，只需要传入这个id就可以取消动画了。

优势：

* CPU节能：使用setInterval实现的动画，当页面被隐藏或最小化时，setInterval仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处于未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销
* 函数节流：在高频率事件（resize, scroll等）中，为了防止一个刷新时间间隔内发生多次函数执行，requestAnimationFrame可保证每个刷新间隔内，函数只执行以此，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次是没有意义的，因为多数显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来
* 减少DOM操作：requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在以此重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。

setTimeout执行动画的缺点：它通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象，原因是：

* setTimeout任务被放入异步队列，只有当主线程任务执行任务完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚
* setTimeout的固定时间间隔不一定与屏幕刷新间隔时间相同，会引起丢帧

## 22.transition和animation的区别

* transition是过渡属性，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于flash的补间动画，设置一个开始关键帧，一个结束关键帧
* animation是动画属性，它的实现不需要触发事件，设定好时间之后就可以自己执行，且可以循环一个动画。它也类似于falsh的补间动画，但是它可以设置多个关键帧（用@keyframe定义）完成动画

## 23.对CSS工程化的理解

CSS工程化是为了解决以下问题：

1.宏观设计：CSS代码如何组织、如何拆分、模块结构怎样设计？

2.编码优化：怎样写出更好的CSS？

3.构建：如何处理CSS，才能让它的打包结果最优？

4.可维护性：代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都能轻松接手？

以下三个方向是时下比较流行的、普适性非常好的CSS工程化实践：

* 预处理器：less、sass等
* 重要的工程化插件：postCss
* webpack loader等

**（1）预处理器：为什么要用预处理器？它的出现是为了解决什么问题？**

预处理器，其实就是CSS世界的“轮子”。随着前端业务复杂度的提供，前端工程中对CSS提出了以下诉求：

1.宏观设计上：我们希望能优化CSS文件的目录结构，对现有的CSS文件实现复用；

2.编码优化上：我们希望能写出结构清晰、简明易懂的CSS，需要它具有一目了然的嵌套层级关系，而不是无差别的一铺到底写法；我们希望它具有变量特征、计算能力、循环能力等等更强的可编程性，这样我们可以少写一些无用代码；

3.可维护性上：更强的可编程性意味着更优质的代码结构，实现复用意味着更简单的目录结构和更强的拓展能力，这两点如果能做到，自然会带来更强的可维护性。

这三点是传统CSS所做不到的，也正是预处理器所解决掉的问题。预处理器普遍会具备这样的特征：

* 嵌套代码的能力，通过嵌套来反映不同CSS属性之间的层级关系
* 支持定义CSS变量
* 提供计算函数
* 允许对代码片段进行extend和mixin
* 支持循环语句的使用
* 支持将CSS文件模块化，实现复用

**（2）PostCss：PostCss是如何工作的？我们在什么场景下会使用PostCss?**

PostCss仍然是一个对CSS进行解析和处理的工具，它会对CSS做这样的事情：

它和预处理器的不同就在于，预处理器处理的是类CSS，而PostCss处理的就是CSS本身。Babel可以将高版本的JS代码转换为低版本的JS代码。PostCss做的是类似的事情：它可以编译尚未被浏览器广泛支持的先进的CSS语法，还可以自动为一些需要额外兼容的语法增加前缀。更强的是，由于PostCss有着强大的插件机制，支持各种各样的扩展，极大地强化了CSS的能力。

PostCss在业务中的使用场景非常多：

* 提高CSS代码的可读性：PostCss其实可以做类似预处理器能做的工作
* 当我们的CSS代码需要适配低版本浏览器时，PostCss的Autoprefixer插件可以帮助我们自动增加浏览器前缀
* 允许我们编写面向未来的CSS：PostCss能够帮助我们编写CSS next代码

**（3）Webpack能处理CSS吗？如何实现？**

* Webpack在裸奔状态下，是不能处理CSS的，Webpack本身是一个面向js且只能处理js代码的模块化打包工具
* Webpack在loader的辅助下，是可以处理CSS的

如何用Webpack实现对CSS的处理：

* 使用css-loader和style-loader
  * css-loader：导入CSS模块，对CSS代码进行编译处理
  * style-loader：创建style标签，把CSS内容写入标签

在实际使用中，css-loader的执行顺序一定要安排在style-loader的前面。因为只有完成了编译过程，才可以对css代码进行插入；若提前插入了未编译的代码，那么webpack是无法理解这坨东西的，它会无情报错。

## 24.常见的CSS布局单位

常见的布局单位包括像素（px），百分比（%），em，rem，vw/vh

（1）像素（px）是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS像素和物理像素：

* CSS像素：为web开发者提供，在CSS中使用的一个抽象单位
* 物理像素：只与设备的硬件密度有关，任何设备的物理像素都是固定的

（2）百分比（%），当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。

（3）em和rem相对于px更具灵活性，它们都是相对长度单位，它们之间的区别：em相对于父元素，rem相对于根元素。

* em：文本相对长度单位。相对于当前对象内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（默认16px）（相对父元素的字体大小倍数）。
* rem：rem是CSS3新增的一个相对单位，相对于根元素（html元素）的font-size的倍数。作用：利用rem可以实现简单的响应式布局，可以利用html元素中字体的大小与屏幕间的比值来设置font-size的值，以此实现当屏幕分辨率变化时元素也随之变化。

（4）vw/vh是与视图窗口有关的单位，vw表示相对于视图窗口的宽度，vh表示相对于视图窗口高度，除了vw和vh外，还有vmin和vmax两个相关的单位。

* vw：相对于视窗的宽度，视窗宽度是100vw
* vh：相对于视窗的高度，视窗高度是100vh
* vmin：vw和vh中的较小值
* vmax：vw和vh中的较大值

vw/vh和百分比很类似，两者的区别：

* 百分比（%）：大部分相对于祖先元素，也有相对于自身的情况，比如（border-radius、translate等）
* vw/vm：相对于视窗的尺寸

## 25.px、em、rem的区别及使用场景

三者的区别：

* px是固定的像素，一旦设置了就无法因为适应页面大小而改变
* em和rem相对于px更具有灵活性，它们是相对长度单位，其长度不是固定的，更适用于响应式布局
* em是相对于其父元素来设置字体大小，这样就会存在一个问题，进行任何元素设置，都有可能需要知道它父元素的大小。而rem是相对于根元素，这样就意味着，只需要在根元素确定一个参考值

使用场景：

* 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用px即可。
* 对于需要适配各种移动设备，使用rem，例如需要适配iPhone和iPad等分辨率差别比较大的设备

## 26.两栏布局的实现

一般两栏布局指的是左边一栏宽度固定，右边一栏宽度自适应，两栏布局的具体实现：

* 利用浮动，将左边元素宽度设置为200px，并且设置左浮动。将右边元素的margin-left设置为200px，宽度设置为auto（默认为auto，撑满整个父元素）

```css
.outer {
	height: 100px;
}

.left {
    float: left;
    width: 200px;
    background-color: red;
}

.right {
    margin-left: 200px;
    width: auto;
    background-color: blue;
}
```

* 利用浮动，左侧元素设置固定大小，并左浮动，右侧元素设置overflow:hidden，这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠

```css
.left {
    float: left;
    width: 200px;
    height: 200px;
    background-color: red;
}

.right {
    height: 300px;
    overflow: hidden;
    background-color: blue;
}
```

* 利用flex布局，将左边元素设置为固定宽度200px，将右边的元素设置为flex为1

```css
.outer {
    display: flex;
    height: 100px;
}
.left {
    width: 200px;
    background: red;
}
.right {
    flex: 1;
    background: blue;
}
```

* 利用绝对定位，将父元素设置为相对定位，左边元素设置为absolute定位，并且设置宽度为200px。将右边元素的margin-left的值设置为200px。

```css
.outer {
    position: relative;
    height: 100px;
}
.left {
    position: absolute;
    width: 200px;
    height: 100px;
    background-color: red;
}

.right {
    margin-left: 200px;
    background-color: blue;
}
```

* 利用绝对定位，将父元素设置为相对定位。左边元素宽度设置为200px，右边元素设置为绝对定位，左边定位为200px，其余方向定位为0。

```css
.outer {
    position: relative;
    height: 100px;
}
.left {
    width: 200px;
    height: 100px;
    background-color: red;
}

.right {
    position: absolute;
    top: 0;
    left: 200px;
    bottom: 0;
    right: 0;
    background-color: blue;
}
```

## 27.三栏布局的实现

三栏布局一般指的是页面中一共有三栏，左右两栏宽度固定，中间自适应的布局，三栏布局的具体实现：

* 利用绝对定位，左右两栏设置为绝对定位，中间设置对应方向大小的margin的值

```css
.outer {
    position: relative;
    height: 100px;
  }
  .left {
    width: 100px;
    height: 100px;
    position: absolute;
    background-color: red;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100px;
    background-color: blue;
  }

  .center {
    margin-left: 100px;
    margin-right: 200px;
    height: 100px;
    background-color: green;
  }
```

* 利用flex布局，左右两栏设置固定大小，中间一栏设置为flex: 1

```css
.outer {
    display: flex;
    height: 100px;
}

.left {
    width: 100px;
    background: red;
}

.right {
    width: 100px;
    background: blue;
}

.center {
    flex: 1;
    background: green;
}
```

* 利用浮动，左右两栏设置固定大小，并且设置对应方向的浮动。中间一栏设置左右两个方向的margin值，注意这种方式，**中间一栏必须放到最后**

```css
.outer {
    height: 100px;
  }
  .left {
    float: left;
    width: 100px;
    height: 100px;
    background-color: red;
  }

  .right {
    float: right;
    width: 200px;
    height: 100px;
    background-color: blue;
  }

  .center {
    margin-left: 100px;
    margin-right: 200px;
    height: 100px;
    background-color: green;
  }
```

* 圣杯布局，利用浮动和负边距来实现。父级元素设置左右的padding，三列均设置向左浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到下一行，通过设置margin负值将其移动到上一行，再利用相对定位，定位到两边。

```css
.outer {
    height: 100px;
    padding-left: 100px;
    padding-right: 200px;
  }
  .left {
    position: relative;
    left: -100px;
    float: left;
    margin-left: -100%;
    width: 100px;
    height: 100px;
    background-color: red;
  }

  .right {
    position: relative;
    left: 200px;
    float: right;
    margin-left: -200px;
    width: 200px;
    height: 100px;
    background-color: blue;
  }

  .center {
    float: left;
    width: 100%;
    height: 100px;
    background-color: green;
  }
```

* 双飞翼布局，双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的margin值来实现的，而不是通过父元素的padding来实现的。本质上来说，也是通过浮动和外边距负值来实现的。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>双飞翼布局</title>
    <style>
      .outer {
        height: 100px;
      }
      .left {
        float: left;
        margin-left: -100%;
        width: 100px;
        height: 100px;
        background-color: red;
      }

      .right {
        float: right;
        margin-left: -200px;
        width: 200px;
        height: 100px;
        background-color: blue;
      }

      .wrapper {
        float: left;
        width: 100%;
        height: 100px;
        background-color: green;
      }

      .center {
        margin-left: 100px;
        margin-right: 200px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="wrapper">
        <div class="center">中</div>
      </div>
      <div class="left">左</div>
      <div class="right">右</div>
    </div>
  </body>
</html>
```

## 28.水平垂直居中的实现

* 利用绝对定位，先将元素的左上角通过top: 50%和left: 50%定位到页面的中心，然后再通过translate来调整元素的中心点到页面的中心。该方法需要考虑到浏览器兼容问题。

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% -50%);
}
```

* 利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。该方法适用于盒子有宽高的情况：

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

* 利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。该方法适用于盒子宽高已知的情况

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px; /*自身高度一半*/
    margin-left: -50px; /*自身宽度一半*/
}
```

* 使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对齐，然后它的子元素也可以实现垂直和水平的居中。该方法要考虑兼容的问题，在移动端用的比较多

```css
.parent {
    dispaly: flex;
    justify-content: center;
    align-items: center;
}
```

## 29.对flex布局的理解及其使用场景

flex是flexibleBox的缩写，意为“弹性布局”，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为flex布局。行内元素也可以使用flex布局。注意，设为flex布局以后，子元素的float、clear和vertical-align属性将失效。采用flex布局的元素，称为flex容器，简称“容器”。它的所有子元素自动成为容器成员，成为flex项目，简称“项目”。容器默认存在两根轴：水平的主轴和垂直的交叉轴，项目默认沿水平主轴排列。

以下6个属性设置在**容器**上：

* flex-direction属性决定主轴的方向（即项目的排列方向）
* flex-wrap属性定义，如果一条轴排不下，如何换行
* flex-flow属性是flex-direction和flex-wrap属性的简写形式，默认值为row nowrap
* justify-content属性定义了项目在主轴上的对齐方式
* align-items属性定义项目在交叉轴上如何对齐
* aligin-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

以下6个属性设置在**项目**上：

* order属性定义项目的排列顺序。数值越小，排列越靠前，默认值为0
* flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
* flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
* flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
* flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto
* align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的aligin-items属性，如果没有父元素，则等同于stretch

## 30.flex:1表示什么

flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。flex:1表示flex: 1 1 0%。

* 第一个参数表示：flex-grow定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
* 第二个参数表示，flex-shrink定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
* 第三个参数表示，flex-basis给上面两个属性分配多余空间之前，计算项目是否有多余空间，默认值为auto，即项目本身的大小

## 31.响应式设计的概念及其基本原理

响应式设计是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

关于原理：基本原理是通过媒体查询（@media）检测不同的设备屏幕尺寸做处理。

关于兼容：页面头部必须有meta声明的viewport

```html
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
```

## 32.实现“品”字布局

品字布局就像下图这样：

![image-20250106121146269](http://139.196.79.103:9001/myimages/imgs/20250106121153361.png)

（1）浮动实现

我们可以使用定位实现，对于上面的1，使用margin让它水平居中；下面的两个使用浮动即可实现，其HTML结构如下：

```html
<div class="div1"></div>
<div class="div2"></div>
<div class="div3"></div>
```

CSS代码如下：

```css
div{ 
  width:100px; 
  height:100px; 
  font-size:40px; 
  line-height:100px; 
  color:#fff; 
  text-align:center;
}

.div1{ 
  background:red; 
  margin:0 auto;
}

.div2{ 
  background: green; 
  float:left; 
  margin-left: 50%;
}

.div3{ 
  background: blue; 
  float:left; 
  margin-left: -200px;
}
```

该方法是在三个盒子的宽高都知道的情况下才能实现

（2）inline-block实现

HTML结构如下：

```html
<div class="div1"></div>
<div class="div2"></div>
<div class="div3"></div>
```

这里将div设置了inline-block，实际上和上面的float的作用是一样的，就是让下面的两个块不换行。使用CSS样式如下：

```css
div{ 
  width:100px; 
  height:100px; 
  font-size:40px; 
  line-height:100px; 
  color:#fff; 
  text-align:center;
}

.div1{ 
  background:red; 
  margin:0 auto;
}

.div2{ 
  background: green; 
  display: inline-block;
  margin-left: 50%;
}

.div3{ 
  background: blue; 
  display: inline-block;
  margin-left: -200px;
}
```

## 33.实现九宫格布局

实现效果如下：

![image-20250106123613591](http://139.196.79.103:9001/myimages/imgs/20250106123613639.png)

首先，定义好通用的HTML结构：

```html
<div class="box">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
  </ul>
</div>
```

公共样式：

```css
ul {
	padding: 0;
}

li { 
	list-style: none;
  	text-align: center;
	border-radius: 5px;
	background: skyblue;
}
```

（1）flex布局

使用flex布局需要设置一个flex-wrap: wrap使得盒子该换行的时候进行换行。由于我们给每个元素都设置了下边距和右边距，所以最后同一列（3/6/9）的右边和最后一行（7/8/9）的下边撑大了ul，所以这里使用类型选择器来消除它们的影响。最终的实现代码如下：

```css
ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

li {
  width: 30%;
  height: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
}

li:nth-of-type(3n){ 
  margin-right: 0;
}

li:nth-of-type(n+7){ 
  margin-bottom: 0;
}
```

（2）grid实现

grid布局相对于flex布局来说，实现九宫格就更加容易了，只需要设置几个属性即可：

```css
ul {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30% 30% 30%; 
  grid-template-rows: 30% 30% 30%; 
  grid-gap: 5%; 
}
```

其中grid-template-columns属性用来设置每一列中单个元素的宽度，grid-template-rows属性用来设置每一列中单个元素的高度，grid-gap属性用来设置盒子之间的间距。

（3）float实现

这里首先需要给父元素的div设置一个宽度，宽度值为：盒子宽 * 3 + 间距 * 2；然后给每个盒子设置固定的宽高，为了让它换行，可以使用float来实现，由于子元素的浮动，形成了BFC，所以父元素ul使用overflow: hidden；来消除浮动带来的影响。最终的实现代码如下：

```css
ul {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

li {
  float: left;
  width: 30%;
  height: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
}

li:nth-of-type(3n){ 
  margin-right: 0;
}

li:nth-of-type(n+7){ 
  margin-bottom: 0;
}
```

（4）inline-block实现

其实inline-block的作用和上面float的作用是一样的，都是用来让元素换行的，实现代码如下：

```css
ul {
  width: 100%;
  height: 100%;
  letter-spacing: -10px;
}

li {
  width: 30%;
  height: 30%;
  display: inline-block;
  margin-right: 5%;
  margin-bottom: 5%;
}

li:nth-of-type(3n){ 
  margin-right: 0;
}

li:nth-of-type(n+7){ 
  margin-bottom: 0;
}
```

需要注意的是，设置为inline-block的元素之间可能会出现间隙，就可能出现下面这种情况：

![image-20250106130235666](http://139.196.79.103:9001/myimages/imgs/20250106130235717.png)

这里使用了letter-spacding属性来消除这种影响，该属性可以用来增加或减少字符间的空白（字符间距）。也可以给ul设置font-size: 0来消除盒子之间的字符间距：

```css
ul {
    font-size: 0;
}
```

（5）表格布局

HTML结构：

```html
<ul class="table">
  <li>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </li>
  <li>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </li>
  <li>
    <div>7</div>
    <div>8</div>
    <div>9</div>
  </li>
</ul>
```

首先，给父元素设置为table布局，然后使用border-spacing设置单元格之间的间距，最后将li设置为表格行，将div设置为表格单元格，CSS样式如下：

```css
.table {
  width: 100%;
  height: 100%;
  display: table;
  border-spacing: 10px;
}

li {
  display: table-row; 
}

div {
  width: 30%;
  height: 30%;
  display: table-cell;
  text-align: center;
  border-radius: 5px;
  background: skyblue;
}
```

## 34.为什么需要清除浮动？清除浮动的方式

浮动的定义：非IE浏览器下，容器不设置高度且子元素浮动时，容器高度不能被内容撑开。此时，内容会溢出到容器外面从而影响页面布局。这种现象被称为浮动（溢出）。

浮动的工作原理：

* 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
* 浮动元素碰到包含它的边框或者其他浮动元素的边框停留

浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现的该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现“高度塌陷”。

浮动元素引起的问题？

* 父元素的高度无法被撑开，影响与父元素同级的元素
* 与浮动元素同级的非浮动元素会跟随其后
* 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构

清除浮动的方式如下：

* 给父级div定义height属性
* 最后一个浮动元素之后添加一个空的div标签，并添加clear: both样式
* 包含浮动元素的父级标签添加overflow: hidden或者overflow:auto
* 使用:after伪元素。由于IE6-7不支持:after，使用zoom: 1触发hasLayout

```css
.clearfix:after {
    content: "\200B";
    dispaly: table;
    height: 0;
    clear: both;
}
.clearfix {
    *zoom: 1;
}
```

## 35.对BFC的理解，如何创建BFC

问题一：

* 在标准流中，我们所有的盒子，不管是块级盒子还是行内盒子，它们都属于某一个FC（格式化上下文），块级盒子属于BFC（块级格式化上下文），行内级元素属于IFC（行内格式化上下文）。

* 通俗来讲：BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其他环境中的物品。如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。

创建BFC的条件： 

* 根元素: body
* 元素设置浮动：float除了none以外的值
* 元素设置绝对定位：position（absolute、fixed）
* display值为：inline-block、table-cell、table-caption、flex等
* overflow值为：hidden、auto、scroll

BFC特点：

* 垂直方向上，自上而下排列，和文档流的排列方式一致
* 在BFC中上下相邻的两个容器的margin会重叠
* 计算BFC的高度时，需要计算浮动元素的高度
* BFC区域不会与浮动的容器发生重叠
* BFC是独立的容器，容器内部元素不会影响外部元素
* 每个元素的左margin值和容器的左border相接触

BFC的作用：

* 解决margin的重叠问题：由于BFC是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为BFC，就解决了margin重叠的问题
* 解决高度塌陷的问题：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。解决这个问题，只需要把父元素变成一个BFC。常用的办法是给父元素设置overflow: hidden。
* 创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应

```css
.left {
    width: 100px;
    height: 200px;
    background: red;
    float: left;
}
.right {
    height: 300px;
    background: blue;
    overflow: hidden;
}

<div class="left"></div>
<div class="right"></div>
```

左侧设置float:left，右侧设置overflow: hidden。这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。

## 36.什么是margin重叠问题？如何解决？

两个块级元素的上外边距和下外边距可能合并（折叠）为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，浮动的元素和绝对定位这种脱离文档流的外边距不会折叠。重叠只会出现在垂直方向。

计算原则：

折叠合并后外边距的计算原则如下：

* 如果两者都是正数，那么就取最大者
* 如果是一正一负，就会正值减去负值的绝对值
* 如果都是负值时，用0减去两个钟绝对值大的那个

解决办法：

对于折叠的情况，主要有两种：兄弟间重叠和父子间重叠

（1）兄弟之间重叠

* 底部元素变为行内盒子：`display: inline-block`
* 底部元素设置浮动：`float`
* 底部元素的position的值为`absolute/fixed`

（2）父子之间重叠

* 父元素加入：`overflow: hidden`
* 父元素添加透明框：`border: 1px solid transparent`
* 子元素变为行内盒子：`display: inline-block`
* 子元素加入浮动属性或定位

## 37.position的属性有哪些，区别是什么？

position有以下属性值：

| 属性值   | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| absolute | 生成绝对定位的元素，相对于static定位以外的一个父元素进行定位。元素的位置通过left、top、right、bottom属性进行规定 |
| relative | 生成相对定位的元素，相对于其原来的位置进行定位。元素的位置通过left、top、right、bottom属性进行规定 |
| fixed    | 生成绝对定位的元素，指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如回到顶部的按钮一般都是使用此定位方式 |
| static   | 默认值，没有定位，元素出现在正常的文档流中，会忽略top，bottom，left，right或者z-index声明，块级元素从上往下纵向排布，行级元素从左向右排列 |
| inherit  | 规定父元素继承position属性的值                               |

前面三者的定位方式如下：

* relative：元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素
* fixed：元素的定位是相对于window（或者iframe）边界的，和其他元素没有关系。但是它具有破坏性，会导致其他元素位置的变化
* absolute：元素的定位相对于前面两者要复杂许多。如果为absolute设置了top、left，浏览器会根据什么去确定它的纵向和横向的偏移量呢？答案是浏览器会递归查找该元素的所有父元素，如果找到一个设置了`position: relative/absolute/fixed`的元素，就以该元素为基准定位，如果没找到，就以浏览器边界定位。

## 38.display、float、position的关系

总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优先级最高，有它存在的时候，浮动不起作用，"display"的值也需要调整；其次，元素的"float"特性的值不是"none"的时候或者它是根元素的时候，调整"display"的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，"dispaly"特性值同设置值。

## 39.实现一个三角形

CSS绘制三角形主要用到的是border属性，也就是边框。

平时在给盒子设置边框时，往往都设置很窄，就可能误以为边框是由矩形组成的。实际上，border属性是由三角形组成的，下面看一个例子：

```css
div {
    width: 0;
    height: 0;
    border: 100px solid;
    border-color: orange blue red green;
}
```

将元素的长宽都设置为0，显示出来的效果是这样的：

![image-20250106164020562](http://139.196.79.103:9001/myimages/imgs/20250106164020616.png)

所以可以根据border这个特性来绘制三角形：

**（1）三角1**

```css
div {
    width: 0;
    height: 0;
    border-top: 50px solid red;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
}
```

![image-20250106164211701](http://139.196.79.103:9001/myimages/imgs/20250106164211750.png)

**（2）三角2**

```css
div {
    width: 0;
    height: 0;
    border-bottom: 50px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
}
```

![image-20250106164520150](http://139.196.79.103:9001/myimages/imgs/20250106164520202.png)

**（3）三角3**

```css
div {
    width: 0;
    height: 0;
    border-left: 50px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
```

![image-20250106164531266](http://139.196.79.103:9001/myimages/imgs/20250106164531316.png)

**（4）三角4**

```css
div {
    width: 0;
    height: 0;
    border-right: 50px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
```

![image-20250106164653545](http://139.196.79.103:9001/myimages/imgs/20250106164653593.png)

**（5）三角5**

```css
div {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}
```

![image-20250106165513417](http://139.196.79.103:9001/myimages/imgs/20250106165513470.png)

## 40.实现一个扇形

用CSS实现扇形的思路和三角形基本一致，就是多了一个圆角的样式，实现一个90度的扇形：

```css
div {
    border: 100px solid transparent;
    width: 0;
    height: 0;
    border-radius: 100px;
    border-top-color: red;
}
```

![image-20250106165944171](http://139.196.79.103:9001/myimages/imgs/20250106165944225.png)

## 41.实现一个圆和半圆

**（1）实现圆：**

```css
div {
    background-color: red;
    height: 100px;
    width: 100px;
    border-radius: 50%;
}
```

**（2）实现半圆**

```css
div {
    background-color: red;
    width: 100px;
    height: 50px;
    border-radius: 0px 0px 100px 100px;
}
```

![image-20250106170608374](http://139.196.79.103:9001/myimages/imgs/20250106170608426.png)

## 42.实现一个宽高自适应的正方形

* 利用vw来实现

```css
.square {
    width: 10%;
    height: 10vw;
    background: red;
}
```

* 利用元素的margin/padding百分比是相对父元素width的性质来实现

```css
.square {
    width: 20%;
    height: 0;
    padding-top: 20%;
    background: red;
}
```

* 利用子元素的margin-top的值来实现：

```css
.square {
    width: 30%;
    overflow: hidden;
    background: red;
}
.square::after {
    content: '';
    dispaly: block;
    margin-top: 100%;
}
```

## 43.画一条0.5px的线

* 采用transform: scale()的方式，该方法用来定义元素的2D缩放转换

```css
transform: scale(0.5, 0.5);
```

* 采用meta viewport的方式

```css
<meta name="viewport" content="width=device-width, initial-scale=0.5,minmum-scale=0.5, maxmum-scale=0.5"
```

这样就能缩放到原来的0.5倍，如果是1px那么就会变成0.5px。viewport只针对于移动端，只在移动端上才能看到效果。

## 44.如何解决1px问题？

1px问题指的是：在一些Retina屏幕的机型上，移动端1px会变得很粗，呈现出不止1px的效果。原因很简单——CSS中的1px并不能和移动设备上的1px划等号。它们之间的比例关系有一个专门的属性来描述：

```html
window.devicePixelRatio = 设备的物理像素 / CSS像素
```

打开Chrome浏览器，启动移动端调试模式，在控制台输出这个devicePixelRatio的值。这里选中iPhone6/7/8这系列的机型，输出的结果是2：

![image-20250107001344572](http://139.196.79.103:9001/myimages/imgs/20250107001344690.png)

这就意味着设置的1px CSS像素，在这个设备上实际会用2个物理像素单元来进行渲染，所以实际看到的一定会比1px粗一些。

**解决1px问题的三种思路：**

**思路一：直接写0.5px**

如果之前1px的样式这样写：

```css
border: 1px solid #333;
```

可以先在js中拿到window.devicePixelRatio的值，然后把这个值通过JSX或者模板语法给到CSS的data里，达到这样的效果（这里使用JSX语法做示范）：

```javascript
<div id="container" data-device={{window.devicePixelRatio}}></div>
```

然后就可以在CSS中用属性选择器来命中devicePixelRatio为某一值的情况，比如说这里尝试命中devicePixelRatio为2的情况：

```css
#container[data-device="2"] {
    border: 0.5px solid #333;
}
```

直接把1px改成1/devicePixelRatio后的值，这是目前为止最为简单的一种方法。这种方法的缺陷在于兼容性不行，IOS系统需要8及以上的版本，安卓系统则直接不兼容。

**思路二：伪元素先放大后缩小**

这个方法的可行性更高，兼容性更好。唯一的缺点是代码会变多。

思路是**先放大、后缩小：在目标元素的后面追加一个::after伪元素，让这个元素布局为absolute之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border值设为1px。接着借助CSS动画特效中的缩放能力，把整个伪元素缩小为原来的50%。此时，伪元素的宽高刚好可以和原有目标元素对齐，而border也缩小为了1px的二分之一，间接地实现了0.5px的效果。**

```css
#container[data-device="2"] {
    position: relative;
}

#container[data-device="2"]::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    content: "";
    transform: scale(0.5);
    transform-origin: left top;
    box-sizing: border-box;
    border: 1px solid #333;
}
```

**思路三：viewport缩放来解决**

这个思路就是对meta标签里几个关键属性下手：

```html
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5，user-scalable=no">
```

这里针对像素比为2的页面，把整个页面缩放为了原来的1/2大小。这样，本来占用2个物理像素的1px样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用js代码实现如下：

```javascript
const scale = 1 / window.devicePixelRatio;
// 这里的metaEl指的是meta标签对应的DOM
metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
```

这样解决了，但这样做的副作用也很大，整个页面被缩放了。这时1px已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也无差别缩小掉了。

## 45.设置小于12px的字体

在谷歌下设置字体大小为12px及以下时，显示都是一样大小，都是默认12px。

解决办法：

* 使用Webkit内核的-webkit-text-size-adjust的私有CSS属性来解决，只要加了-webkit-text-size-adjust: none；字体大小就不受限制了。但是chrome更新到27版本之后就不可以用了。所以高版本chrome谷歌浏览器已经不再支持-webkit-text-size-adjust样式，所以要使用时谨慎用。
* 使用CSS3的transform缩放属性-webkit-transform: scale(0.5);注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用display: block/inline-block/...
* 使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观

## 46.移动端点击300ms的延迟出现的原因是什么？你的解决方案是什么？

移动端点击300ms延迟的主要原因是浏览器在用户点击屏幕后会等待300ms，以判断用户是否会进行双击（例如缩放页面）。这是由于早期移动端浏览器为了模拟双击缩放功能而设计的机制。

具体来说，当用户触摸屏幕时，浏览器并不能立即判断用户是否要进行单机还是双击操作。因此，它会等待大约300ms，看看用户是否会再次点击屏幕。如果在300ms内发生了第二次点击，则浏览器会将其解释为双击操作；否则，则将其解释为单击操作。这导致了300ms的延迟。

**解决方案：**

1.禁用缩放：最简单直接的解决方案是在viewport meta标签中设置width=device-width和user-scalable=no来禁用缩放功能。这会告诉浏览器不需要监听缩放功能，从而消除300ms的延迟

```html
<meta name="viewport" content="width=device-wdith, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

注意：禁用缩放可能会影响用户体验，尤其是在内容需要缩放的情况下。

2.使用FastClick库（已过时，但仍有项目在用）：FastClick是一个轻量级的库，它可以消除移动端浏览器上的300ms点击延迟。它通过监听touchstart和touchend事件来模拟点击事件，并在touchend事件触发时立即触发模拟的click事件，从而绕过了浏览器的300ms等待时间。虽然曾经很流行，但现在由于浏览器的改进和新的解决方案出现，已经不再推荐使用。

3.使用指针事件：指针事件提供了一种更现代化的方法来处理所有的输入类型，包括触摸、鼠标和手写笔。由于指针事件的设计考虑了触摸设备，因此它们不会有300ms的延迟。然而，浏览器兼容性需要考虑。

4.CSS touch-action属性：touch-action属性允许开发者控制浏览器对触摸手势的默认行为。将touch-action设置为none可以阻止浏览器对触摸事件的默认处理，包括双击缩放，从而消除300ms延迟。

```css
.element {
    touch-action: none;
}
```

这是目前推荐的解决方案之一，因为它简单有效且对用户体验的影响最小。

5.使用框架/库内置的解决方案：许多现代前端框架和库，例如React、Vue和Angular，都内置了处理移动端点击延迟的机制。使用这些框架/库时，通常不需要手动处理300ms延迟问题。

## 47.通常会采取哪些措施来确保网站或者应用在不同的浏览器上的兼容性？

其实在现代工程化的开发架构下，大多数的浏览器兼容性问题是可以通过工程化的配置选项来解决的。

* 1.比如browserslist可以配置目标的浏览器或者Node环境，然后在不同的工具中起作用，比如autoprefixer/babel/postcss-preset-env等，在进行了正确的配置后，开发的Vue或者React项目在进行打包时，会自动根据目标环境来添加CSS前缀、Babel代码转换等
* 2.如果我们想要额外的适配，通常在项目中我们还会引入normalize.css和polyfills来添加特定的CSS、JS的适配问题
* 3.还有一些需要针对移动的，比如移动端点击300ms的延迟、移动端1px边框的问题，都可以在特定环境或者需求下来解决
* 4.当遇到问题时，很重要的事我们需要多查询caniuse的网站来确定某些特性的兼容性
* 5.另外如果针对特定的用户使用的是不同的浏览器和设备时，我们需要使用特定的工具，比如BrowserStack这样的工具来进行测试，遇到特定问题时，及时的解决和处理。

比如之前我们在开发中借助transform实现动画效果，使用的是复合属性，transform: translate(10px , 20px) scale(1.5);

但是这种复合属性在IE11上是有问题，因为它并不支持，所以我们就必须对它拆分属性，首先设置translate，在它的外层再包裹一个容器，用来设置scale属性。

如果还是不能解决，也可以通过js代码来处理，可以更加精准的根据不同的浏览器来调整CSS的动画效果。



