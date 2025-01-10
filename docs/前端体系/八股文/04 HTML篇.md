---
outline: deep
---

## 1.src和href的区别

src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。

src指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所做位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本、img图片和frame等元素。

```javascript
<script src="js.js"></script>
```

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，这也是为什么将js脚本放在底部而不是头部。

href指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果在文档中添加

```css
<link href="common.css" rel="stylesheet" />
```

那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式。

## 2.什么是SEO？为什么SEO对于一个网站至关重要？

SEO是搜索引擎优化。

因为现在我们很多的开发网站，类似于门户网站或者功能网站，一方面我们需要通过营销宣传来提升我们产品的知名度，另一方面靠自然搜索结果获取流量也是非常重要的过程。

所以我们需要在了解一定的搜索引擎自然排名机制的基础上，对我们的网站进行内部和外部的调整优化，让用户在使用关键字搜索时我们的网站可以尽量高的提升自然排名，获取更多的流量，从而达到我们的预期以及品牌的知名度。

## 3.SEO有哪些关键点？你在日常开发中，都采取了哪些措施来进行SEO呢？

目前在国内针对百度有一个很直接的SEO方式就是给钱，当然也有通过不给钱的方式来提升网站关键字排名的方案。

**方式一：SSR服务端渲染**

因为我之前企业的项目都是基于现代的框架，比如Vue、React来开发，大部分元素是由客户端js动态生成。很多的搜索引擎在爬虫时只能抓取静态的HTML源代码，而不会执行js，因此动态生成的内容无法被爬虫索引。另外很多的搜索情况不会等待一部分数据加载完成后再进行抓取，也会导致我们网站的很多关键信息不能完整的收录。

为了确保网站的SEO优化，我们之前的项目需要SEO优化的都采用了SSR技术。SSR能够在服务器上指向js并渲染出完整的HTML页面，然后将其发送给客户端。这样，爬虫在抓取网站时就能获取到完整的页面内容，从而提升SEO效果。

如果是开发初期就进行SEO优化的话，我们一般会直接选择一些比较成熟的SSR框架，比如对于Vue来说选择Nuxt.js，对于React来说选择Next.js。

**方式二：准确的TDK描述**

TDK就是我们常说的title、description、keywords

* title（标题）：也就是网站显示的标题，不仅仅用户会看到，搜索引擎通常会首先检索和收录title信息，所以title至关重要。title一般不需要过长，多个关键词之间使用"|"或"-"分割，会被搜索引擎提取和收录。

* description:（描述）：这是对网页内容的简短描述，通常在搜索引擎结果页中标题下方显示。描述应概述页面内容，包含相关关键词，并吸引用户点击。

* keywords（关键词）：这是网页内容中重要的词汇，反映了页面的主题和内容，每个关键字都要有对应的内容匹配。虽然现代搜索引擎（如Google）对关键词的重视程度已经降低，但在某些情况下，合理使用关键词仍然有助于SEO。

**方式三：语义化的HTML元素、图片alt、h1、h2的合理使用**

* 语义化是指使用具有明确含义的HTML元素，搜索引擎在爬取网站时，也会更加容易理解网站的内容以便进行收录，从侧面也能印证我们的网页更加的规范。而且这不仅有助于搜索引擎理解网页内容，还能提高网页的可读性和可维护性。

* 包括Header、Nav、Aside、Article、Footer元素，这些都能帮助爬虫更好的获取页面内容，理解网页。

图片要求必须加alt规范

* 我们要求每个前端在使用图片时，必须加上和图片相关的alt，一方面是图片无法显示时用户可以看到提升，另一方面也有利于SEO优化。

重要的h1/h2/h3等的使用

* h1、h2、h3等HTML标题标签在SEO中起着非常重要的作用。这些标签有助于搜索引擎理解网页内容的结构和层次，从而准确地索引和评估页面的相关性。

**方式四：编写合理的robots.txt文件**

robots.txt是一个存放在网站根目录中的文本文件，其主要作用是告诉搜素引擎爬虫哪些部分的网站可以被抓取以及哪些部分不应该被抓取。

为什么需要robots.txt？

* 通过指示搜索引擎忽略不重要的文件或目录，可以让搜索引擎更专注于重要内容的抓取和索引。

* 当然也可以避免一些敏感或私有内容被无意中索引。

所以，如果网站不编写robots.txt，可能会降低网站的SEO效率，因为搜索引擎会花费更多时间和资源在不重要的页面上。

**方式五：HTTPS**

自2014年以来，Google已将HTTPS作为其搜索排名的信号之一。这意味着，使用HTTPS的网站在搜素结果中可能会获得比非HTTPS网站更好的排名。

而且HTTPS也有利于用户的安全，在用户使用网站时也会增加信任度。

**方式六：内部链接和外部链接**

内部链接是指从一个页面到同一网站内另一个页面的链接。它可以提高网站导航、增加网站的权重、提升网站的索引。

外部链接是指从一个网站指向另一个网站的链接。在网页中放合适的外部链接，也有利于提升网站的权重指数，容易被搜索引擎收录。

**其他方式**

当然还有其他一些细节，比如sitmap文件、网站导航、响应式处理，都在某种程度上能提高网站的权重。另外还有一些企业还会专门请一些SEO的专员来进行SEO优化的操作，每个企业情况不太一样。

## 4.对HTML语义化的理解

语义化是指根据内容的结构化，选择合适的标签。通俗来讲就是用正确的标签做正确的事情。

语义化的优点如下：

* 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。除此之外，语义累还支持读屏软件，根据文章可以自动生成目录；
* 对开发者友好，使用语义累标签增强了可读性，结构更加清晰，开发者能够清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

```html
<header></header> 头部
<nav></nav> 导航栏
<section></section> 区块（有语义化的div）
<main></main> 主要区域
<article></article> 主要内容
<aside></aside> 侧边栏
<footer></footer> 底部
```

## 5.DOCTYPE（文档类型）的作用

DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明。它的目的是告诉浏览器应该以什么样的文档类型定义来解析文档，不同的渲染模式会影响浏览器对CSS代码甚至js脚本的执行。它必须声明在HTML文档的第一行。

浏览器渲染页面的两种模式：

* 标准模式，默认模式，浏览器使用W3C的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
* 怪异模式，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

## 6.script标签中defer和async的区别

如果没有defer或async属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就开始加载和执行，这样就阻塞了后续文档的加载。

defer和async属性都是去异步加载外部的js脚步文件，它们都不会阻塞页面的解析，其区别如下：

* 执行顺序：多个带async属性的标签，不能保证加载的顺序；多个defer属性的标签，按照加载顺序执行；
* 脚本是否并行执行：async属性，表示后续文档的加载和执行与js脚本的加载和执行是并行进行的，即异步执行；defer属性，加载后续文档的过程和js脚本的加载是并行进行的，js脚本需要等到所有元素解析完成之后才执行，在DOMContentLoaded事件触发执行之前。

## 7.常用的meta标签有哪些？

meta标签由name和content属性定义，用来描述网页文档的属性，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些name作为大家使用的共识，开发者还可以自定义name。

常用的meta标签：

（1）charset，用来描述HTML文档的编码类型：

```html
<meta chaset="UTF-8" />
```

（2）keywords，页面关键词

```html
<meta name="keywords" content="关键词" />
```

（3）description，页面描述

```html
<meta name="description" content="页面描述内容" />
```

（4）refresh，页面重定向和刷新：

```html
<meta http-equiv="refresh" content="0;url=" />
```

（5）viewport，适配移动端，可以控制视口的大小和比列

```html
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1" />
```

其中，content参数有以下几种：

* width viewport: 宽度（数值/device-width）
* height viewport: 高度（数值/device-height）
* initial-scale：初始缩放比例
* maximum-scale: 最大缩放比例
* minimum-scale：最小缩放比例
* user-scalable: 是否允许用户缩放（yes/no）

（6）搜索引擎搜索方式：

```html
<meta name="robots" content="index, follow" />
```

其中，conent参数有以下几种：

* all，文件将被检索，且页面上的链接可以被查询
* none，文件将不被检索，且页面上的链接不可以被查询
* index，文件将被检索
* follow，页面上的链接可以被查询
* noindex，文件将不被检索
* nofollow，页面上的链接不可以被查询

## 8.HTML5有哪些更新?

新增特性：

（1）新增语义化标签：nav、header、footer、aside、section、article

（2）音频、视频标签：audio、video

（3）数据存储：localStorage、sessionStorage

（4）canvas（画布）、Geolocation（地理定位）、websocket（通信协议）

（5）input标签新增属性，placeholder（提示信息）、autocomplete、autofocus（自动获取焦点）、required（要求输入框不能为空）

autocomplete：自动完成，有两种状态值，on和off，使用这个属性有两个前提：

* 表单必须提交过
* 必须有name属性

（6）history API: go、forward、back、pushstate

移除元素：

* 纯表现的元素：basefont，big，center，font，s，strike，tt，u；
* 对可用性产生负面影响的元素：frame，frameset，noframes

## 9.行内元素有哪些？块级元素有哪些？空(void)元素有哪些？

行内元素有：a b span img input select strong；

块级元素有：div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p；

空元素，即没有内容的HTML元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

常见的有：

```html
<br> <hr> <img> <input> <link> <meta>
```

鲜见的有：

```html
<area> <base> <col> <colgroup> <command> <embed> <keygen> <param> <source> <track> <wbr>
```

## 10.说一下web worker

Web Worker是HTML5提供的一项技术，它允许在Web应用程序中创建后台线程，以便在主线程上执行的任务不会阻塞用户界面的响应。Web Worker可以执行耗时的计算、处理大量数据、执行网络请求等任务，以提高Web应用程序的性能和响应速度。

Web Worker的主要特点包括：

1、后台线程：Web Worker在后台运行，不会阻塞主线程，保证了用户界面的流畅性。

2、独立的全局上下文：Web Workder拥有独立的全局上下文，与主线程隔离，不能直接访问DOM，但可以通过消息传递与主线程通信。

3、异步消息传递：Web Worker通过postMessage()方法向主线程发送消息，通过onmessage事件接收主线程发送的消息。

```javascript
// 主线程代码
// 创建Web Worker
const workder = new Worker('workder.js');

// 监听Web Worker发送消息
workder.onmessage = function(event) {
    console.log('Received message from worker:', event.data);
}

// 向Web Worker发送消息
worker.postMessage('Hello from main thread!');

// worker.js代码
// 监听主线程发送的消息
self.onmessage = function(event) {
    console.log('Received message from main thread:', event.data);
    
    // 模拟耗时的操作
    const result = calculate(event.data);
    
    // 向主线程发送消息
    self.postMessage(result);
}

// 执行耗时的操作
function calculdate(data) {
    // ...
    return result;
}

```

## 11.iframe有哪些优点和缺点?

iframe元素会创建包含另外一个文档的内联框架（即行内框架）。

优点：

* 用来加载速度较慢的内容（比如广告）
* 使脚本可以并行下载
* 可以实现跨子域通信

父级页面：

```javascript
var iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage({ param1: 'value1', param2: 'value2'}, 'https://example.com')
```

iframe页面：

```javascript
window.addEventListener('message', function(event) {
	if (event.origin === 'https://example.com') {
		// 处理从父级页面发送的消息
		var data = event.data;
		var parma1 = data.param1;
		var param2 = data.param2;
	}
})
```

缺点：

* iframe会阻塞主页面的onload事件
* 无法被一些搜索引擎识别
* 会产生很多页面，不容易管理

## 12.head标签有什么作用，其中什么标签必不可少？

<head\>标签用于定义文档的头部，它是所有头部元素的容器。<head\>中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在Web中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在head部分：<base\> <link\> <meta\> <script\> <style\> <title\>

其中，<title\>定义文档的标题，它是head部分中唯一必需的元素。

## 13.canvas和svg的区别

（1）SVG

SVG可缩放矢量图形是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加js事件处理器。在SVG中，每个被绘制的图形均被视为对象。如果SVG对象的属性发生变化，那么浏览器能够自动重现图形。

其特点如下：

* 不依赖分辨率
* 支持事件处理器
* 最适合带有大型渲染区域的应用程序（比如谷歌地图）
* 复杂度高会减慢渲染速度（任何过度使用DOM的应用都不快）
* 不适合游戏应用

（2）Canvas

Canvas是画布，通过js来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

其特点如下：

* 依赖分辨率
* 不支持事件处理器
* 弱的文本渲染能力
* 能够以.png或.jpg格式保存结果图像
* 最适合图形密集型的游戏，其中的许多对象会被频繁重绘









