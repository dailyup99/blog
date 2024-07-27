---
outline: deep
---

## JavaScript的编写方式

位置一：HTML代码行内（不推荐）

```js
<!-- 1.编写位置一：编写在html内部（了解） -->
<a href="#" onclick="alert('百度一下')">百度一下</a>
<a href="javascript: alert('百度一下')">百度一下</a>
```

位置二：script标签中

```js
<!-- 2.编写位置二：编写在script元素之内 -->
<a class="google" href="#">Google一下</a>

<script>
    var googleAEl = document.querySelector(".google");
googleAEl.onclick = function () {
    alert("Google一下");
};
</script>
```

位置三：外部的script文件

需要通过script元素的src属性来引入JavaScript文件

```js
 <!-- 3.编写位置三：独立的js文件 -->
<a class="bing" href="#">bing一下</a>
<script src="./js/bing.js"></script>
```

js/bing.js

```js
// 获取元素
var bingAEl = document.querySelector(".bing");

// 监听元素的点击
bingAEl.onclick = function () {
  alert("bing一下");
};
```

## \<noscript>元素

如果运行的浏览器不支持JavaScript, 那么我们如何给用户更好的提示呢?

* 针对早期浏览器不支持 JavaScript 的问题，需要一个页面优雅降级的处理方案;
* 最终， 元素出现，被用于给不支持 JavaScript 的浏览器提供替代内容;

下面的情况下, 浏览器将显示包含在中的内容:

* 浏览器不支持脚本;
* 浏览器对脚本的支持被关闭。

在浏览器的设置=>隐私设置和安全性，可以设置是否使用JavaScript

![image-20221126211225042](http://139.196.79.103:9001/myimages/imgs/image-20221126211225042.png)

当设置不允许网站使用JavaScript时，下面这段代码生效

```js
<noscript>
    <h1>您的浏览器不支持JavaScript，请打开或者更换浏览器~</h1>
</noscript>
```

否则，script中的代码生效

```js
<script>
    alert("您的浏览器正在运行JavaScript代码")
</script>
```

## JavaScript编写的注意事项

注意一: script元素不能写成单标签

* 在外联式引用js文件时，script标签中不可以写JavaScript代码，并且script标签不能写成单标签；
* 即不能写成\<script src="index.js" />

注意二: 省略type属性

* 在以前的代码中，\<script>标签中会使用 type=“text/javascript”；

* 现在可不写这个代码了，因为JavaScript 是所有现代浏览器以及 HTML5 中的默认脚本语言；

注意三: 加载顺序

* 作为HTML文档内容的一部分，JavaScript默认遵循HTML文档的加载顺序，即自上而下的加载顺序；

* 推荐将JavaScript代码和编写位置放在body子元素的最后一行；

```js
<h1 class="title">我是标题</h1>
<p>我是段落, 哈哈哈哈</p>

<!-- 普通的元素 -->
<script>
    var titleEl = document.querySelector(".title")
alert(titleEl)
</script>
```

注意四: JavaScript代码严格区分大小写

* HTML元素和CSS属性不区分大小写，但是在JavaScript中严格区分大小写；

后续补充：script元素还有defer、async属性

## JavaScript的交互方式

JavaScript有如下和用户交互的手段：

最常见的是通过console.log, 目前大家掌握这个即可;

![image-20221126212002417](http://139.196.79.103:9001/myimages/imgs/image-20221126212002417.png)

```js
// 1.交互方式一: alert函数
alert("Hello World");

// 2.交互方式二: console.log函数, 将内容输出到控制台中(console)
// 使用最多的交互方式
console.log("Hello Coderwhy");

// 编写的JavaScript代码出错了
// message.length

// 3.交互方式三: document.write()
document.write("Hello Kobe");

// 4.交互方式四: prompt函数, 作用获取用户输入的内容
var result = prompt("请输入你的名字: ");
alert("您刚才输入的内容是:" + result);
```

## Chrome的调试工具

在前面我们利用Chrome的调试工具来调试了HTML、CSS，它也可以帮助我们来调试JavaScript。

当我们在JavaScript中通过console函数显示一些内容时，也可以使用Chrome浏览器来查看：

![image-20221126212059419](http://139.196.79.103:9001/myimages/imgs/image-20221126212059419.png)

另外补充几点：

* 1.如果在代码中出现了错误，那么可以在console中显示错误；
* 2.console中有个 > 标志，它表示控制台的命令行
  * 在命令行中我们可以直接编写JavaScript代码，按下enter会执行代码；
  * 如果希望编写多行代码，可以按下shift+enter来进行换行编写；
* 3.在后续我们还会学习如何通过debug方式来调试、查看代码的执行流程；

## JavaScript语句和分号

语句是向浏览器发出的指令，通常表达一个操作或者行为（Action）。

* 语句英文是Statements；
* 比如我们前面编写的每一行代码都是一个语句，用于告知浏览器一条执行的命令；

通常每条语句的后面我们会添加一个分号，表示语句的结束：

* 分号的英文是semicolon
* 当存在换行符（line break）时，在大多数情况下可以省略分号；
* JavaScript 将换行符理解成“隐式”的分号；
* 这也被称之为自动插入分号（an automatic semicolon）；

推荐：

* 前期在对JavaScript语法不熟悉的情况推荐添加分号；
*  后期对JavaScript语法熟练的情况下，任意！

## JavaScript的注释

在HTML、CSS中我们都添加过注释，JavaScript也可以添加注释。

JavaScript的注释主要分为三种：

* 单行注释
* 多行注释
* 文档注释（VSCode中需要在单独的JavaScript文件中编写才有效）

注意：JavaScript也不支持注释的嵌套

```js
	// 1.单行注释

    // 2.多行注释
    /* 
     我是一行注释
     我是另外一行注释
    */

    // 3.文档注释
    /**
     * 和某人打招呼，这是对函数的描述
     * @param {string} name 姓名 对参数的说明 {类型} 字段 代表什么意思
     * @param {number} age 年龄
     */
    function sayHello(name, age) {

    }

    sayHello()
```

文档注释需要在单独的js文件才能打出来，在js文件中输入/**，然后按回车

## VSCode插件和配置

推荐一个VSCode的插件：（个人经常使用的）

* ES7+ React/Redux/React-Native snippets
* 这个插件是在react开发中会使用到的，但是经常用到它里面的打印语句；

console.log的快速编写

```js
// 推荐方式一: log -> enter
console.log("Hello World");

// 推荐方式二: react插件 -> clg -> enter
console.log("Hello World")
```

另外再推荐一个插件：

* Bracket Pair Colorizer 2，但是该插件已经不再推荐使用了；
* 因为VSCode已经内置了该功能，我们可以直接通过VSCode的配置来达到插件的效果；
* 如何配置呢？

这个插件的作用是，让我们的js和CSS代码中的花括号迅速匹配，找到开始和结束的花括号

设置方法如下：

文件=>首选项=>设置=>点击下面的图标

![image-20221126215850791](http://139.196.79.103:9001/myimages/imgs/image-20221126215850791.png)

```js
"editor.bracketPairColorization.enabled": true,
"editor.guides.bracketPairs": "active"
```

将上面这两行代码放入打开的settings.json文件中

现在查看函数，可以快速找到开始和结束的花括号

![image-20221126220230840](http://139.196.79.103:9001/myimages/imgs/image-20221126220230840.png)


