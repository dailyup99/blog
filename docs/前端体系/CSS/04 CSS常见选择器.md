---
outline: deep
---

## CSS选择器（selector）

选择器的种类繁多，大概可以这么归类

* 通用选择器（universal selector）
* 元素选择器（type selectors）
* 类选择器（class selectors）
*  id选择器（id selectors）
* 属性选择器（attribute selectors）
* 组合（combinators）
* 伪类（pseudo-classes）
* 伪元素（pseudo-elements）

## 通用选择器

所有的元素都会被选中;

一般用来给所有元素作一些通用性的设置

* 比如内边距、外边距;
* 比如重置一些内容;

效率比较低，尽量不要使用;

## 简单选择器

简单选择器是开发中用的最多的选择器:

* 元素选择器（type selectors）, 使用元素的名称;
* 类选择器（class selectors）, 使用 .类名 ;
* id选择器（id selectors）, 使用 #id;

## id注意事项

一个HTML文档里面的id值是唯一的，不能重复

id值如果由多个单词组成，单词之间可以用中划线-、下划线_连接，也可以使用驼峰标识

最好不要用标签名作为id值

## 属性选择器(attribute selectors)

拥有某一个属性 [att]

属性等于某个值 [att=val]

```css
/* 存在 title 属性的<a> 元素 */
a[title] {
  color: purple;
}
/* 存在 href 属性并且属性值匹配"https://example.org"的<a> 元素 */
a[href="https://example.org"] {
  color: green;
}
```

其他了解的(不用记)：

```css
[attr*=val]: 属性值包含某一个值val;
[attr^=val]: 属性值以val开头;
[attr$=val]: 属性值以val结尾;
[attr|=val]: 属性值等于val或者以val开头后面紧跟连接符-;
[attr~=val]: 属性值包含val, 如果有其他值必须以空格和val分割;
```

## 后代选择器（descendant combinator）

后代选择器一: 所有的后代(直接/间接的后代)

选择器之间以空格分割

```css
.box span {}
```

后代选择器二: 直接子代选择器(必须是直接自带)

选择器之间以 > 分割;

```css
.box > span {}
```

## 兄弟选择器

兄弟选择器一:相邻兄弟选择器

```css
<div class="one">哈哈哈</div>
<div>呵呵呵</div>
<div>嘿嘿嘿</div>
<div>嘻嘻嘻</div>
```

使用符号 + 连接

```css
.one + div {
    color: red;
}
```

结果只有呵呵呵字体变红色

兄弟选择器二: 普遍兄弟选择器 ~

使用符号 ~ 连接

```css
.one ~ div {
    color: red;
}
```

哈哈哈下面的三个div字体全部变红色

## 选择器组 – 交集选择器

交集选择器: 需要同时符合两个选择器条件(两个选择器紧密连接)

在开发中通常为了精准的选择某一个元素;

```css
<div class="one">哈哈哈</div>
<p class="one">呵呵呵</p>
```

上面两个的class一样，怎么将它们区分开来，使用交集选择器

```css
div .one {
    color: red;
}
```

并集选择器: 符合一个选择器条件即可(两个选择器以,号分割)

```css
<div class="one">哈哈哈</div>
<p class="two">呵呵呵</p>
```

在开发中通常为了给多个元素设置相同的样式;

```css
.one,.two {
    color: blue;
    font-size: 20px;
}
```

## 认识伪类

什么是伪类呢?

伪类是选择器的一种，它用于选择处于特定状态的元素;

常见的伪类有：

1.动态伪类（dynamic pseudo-classes）

 :link、:visited、:hover、:active、:focus

2.目标伪类（target pseudo-classes）

:target

3.语言伪类（language pseudo-classes）

:lang( )

4.元素状态伪类（UI element states pseudo-classes）

:enabled、:disabled、:checked

5.结构伪类（structural pseudo-classes）

:nth-child( )、:nth-last-child( )、:nth-of-type( )、:nth-lastof-type( )

:first-child、:last-child、:first-of-type、:last-of-type

:root、:only-child、:only-of-type、:empty

6.否定伪类（negation pseudo-classes）

:not()

所有的伪类: https://developer.mozilla.org/zhCN/docs/Web/CSS/Pseudo-classes

## 动态伪类（dynamic pseudo-classes)

使用举例

* a:link 未访问的链接

* a:visited 已访问的链接

* a:hover 鼠标挪动到链接上(重要)

* a:active 激活的链接（鼠标在链接上长按住未松开）

使用注意

* :hover必须放在:link和:visited后面才能完全生效
*  :active必须放在:hover后面才能完全生效
* 所以建议的编写顺序是 :link、:visited、:hover、:active

除了a元素，:hover、:active也能用在其他元素上

### 动态伪类 - :focus

:focus指当前拥有输入焦点的元素（能接收键盘输入）

文本输入框一聚焦后，背景就会变红色

因为链接a元素可以被键盘的Tab键选中聚焦，所以:focus也适用于a元素

动态伪类编写顺序建议为：:link、:visited、:focus、:hover、:active

直接给a元素设置样式，相当于给a元素的所有动态伪类都设置了

相当于a:link、a:visited、a:hover、a:active、a:focus的color都是red

## 伪元素（pseudo-elements）

常用的伪元素有

* :first-line、::first-line
* :first-letter、::first-letter
* :before、::before
* :after、::after

为了区分伪元素和伪类，建议伪元素使用2个冒号，比如::first-line

## 伪元素 - ::first-line - ::first-letter(了解)

::first-line可以针对首行文本设置属性

::first-letter可以针对首字母设置属性

## 伪元素 - ::before和::after(常用)

::before和::after用来在一个元素的内容之前或之后插入其他内容（可以是文字、图片)

常通过 content 属性来为一个元素添加修饰性的内容


