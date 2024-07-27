---
outline: deep
---

## 认识CSS

CSS表示层叠样式表（Cascading Style Sheet，简称：CSS，又称为又称串样式列表、级联样式表、串接样式表、阶层式样式表） 是为网页添加样式的代码。

MDN解释：CSS 也不是真正的编程语言，甚至不是标记语言。它是一门样式表语言；

## 如何将CSS样式应用到元素上？

* 内联样式（inline style）
* 内部样式表（internal style sheet）、文档样式表（document style sheet）、内嵌样式表（embed style sheet）
* 外部样式表（external style sheet）

## 内联样式（inline style）

内联样式表存在于HTML元素的style属性之中

```css
<div style="color: red; font-size: 20px;">我是div元素</div>
```

CSS样式之间用分号;隔开，建议每条CSS样式后面都加上分号;

## 内部样式表（internal style sheet）

将CSS放在HTML文件head元素里的style元素之中

## 外部样式表（external style sheet）

外部样式表（external style sheet） 是将css编写一个独立的文件中，并且通过link元素引入进来

使用外部样式表主要分成两个步骤：

第一步：将css样式在一个独立的css文件中编写（后缀名为.css）；

第二步：通过元素引入进来；

```html
<head>
    <link rel="stylesheet" href="xxx.css">
</head>
```

## @import

可以在style元素或者CSS文件中使用@import导入其他的CSS文件

```css
@import url(xxx.css)
```

## CSS 的注释

/* 注释内容 */

## 额外知识补充

### link元素

link元素是外部资源链接元素，规范了文档与外部资源的关系，link元素通常是在head元素中

最常用的链接是样式表（CSS）；

此外也可以被用来创建站点图标（比如 “favicon” 图标）；

ink元素常见的属性：

* href：此属性指定被链接资源的URL。 URL 可以是绝对的，也可以是相对的。
* rel：指定链接类型，常见的链接类型：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types
  * icon：站点图标；
  * stylesheet：CSS样式；

### 认识进制

通俗理解：当数字达到某个值时，进一位(比如从1位变成2位)

按照进制的概念，来理解一下十进制：

当数字到9的时候，用一位已经表示不了了，那么就进一位变成2位

按照上面的来理解，二进制、八进制、十六进制：

* 二进制：当数字到1的时候，用一位已经表示不了了，那么就进一位。
* 八进制：当数字到7的时候，用一位已经表示不了了，那么就进一位。
* 十六进制：等等，用一位如何表示十六个数字呢？a(10)、b(11)、c(12) 、 d(13) 、 e(14) 、 f(15)

### 如何表示二进制、八进制、十六进制?

二进制（0b开头, binary）：其中的数字由0、1组成

八进制（0o开头, Octonary）：其中的数字由0~7组成

十六进制（0x开头, hexadecimal）：其中的数字由0~9和字母a-f组成（大小写都可以）

### CSS颜色的表示方法

color的取值：https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value#%E8%AF%AD%E6%B3%95

RGB颜色：

RGB是一种色彩空间，通过R（red，红色）、G（green，绿色）、B（blue，蓝色）三原色来组成了不同的颜色；

也就是通过调整这三个颜色不同的比例，可以组合成其他的颜色；

RGB各个原色的取值范围是 0~255；

### RGB的表示方法

方式一：十六进制符号：#RRGGBB[AA]

R（红）、G（绿）、B （蓝）和A （alpha）是十六进制字符（0–9、A–F）；A是可选的。

比如：#ff0000等价于#ff0000ff

方式二：十六进制符号：#RGB[A]

R（红）、G（绿）、B （蓝）和A （alpha）是十六进制字符（0–9、A–F）；

三位数符号（#RGB）是六位数形式（#RRGGBB）的减缩版

比如：#f09和#ff0099表示同一颜色

四位数符号（#RGBA）是八位数形式（#RRGGBBAA）的减缩版

比如：#0f38和#00ff3388表示相同颜色

### Chrome浏览器开发者工具

方式一：右键 – 检查

方式二：快捷键 – F12


