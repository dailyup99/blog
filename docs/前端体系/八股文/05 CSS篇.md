---
outline: deep
---

## 1.CSS选择器及其优先级

![image-20250104163804658](http://139.196.79.103:9001/myimages/imgs/20250104173052796.png)

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

5、定位属性：fload、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

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



