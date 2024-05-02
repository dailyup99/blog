---
outline: deep
---

## **认识jQuery**

**jQuery 读音为：/dʒeɪkwɪəri/ （ 简称：jQ），是一个快速、小型且功能丰富的 JavaScript 库，官网对jQuery的描述：**

使HTML文档遍历、操作、事件处理、动画和 Ajax 之类的事情变得更加简单。

具有易于使用的 API，可在多种浏览器中使用。

jQuery 结合多功能性和可扩展性，改变了数百万人编写 JavaScript 的方式。

**jQuery官网：https://jquery.com/**

## **库(library)和框架(framework)的概念**

**随着JavaScript的普及，以及越来越多人使用JavaScript来构建网站和应用程序**

JavaScript社区认识到代码中存在非常多相同的逻辑是可复用的。

因此社区就开始对这些相同的逻辑的代码封装到一个JavaScript文件中。

这个封装好的JavaScript文件就可称为JavaScript库或JavaScript框架。

**库(library)**

JavaScript库是一个预先编写好并实现了一些特定功能的代码片段的集合。

一个库中会包含许多的函数、变量等，可根据需求引入到项目中使用。

一些常见的库有jQuery、Day.js、Lodash和React等

**框架（framework）**

JavaScript框架是一个完整的工具集，可帮助塑造和组织您的网站或应用程序。

提供一个结构来构建整个应用程序，开发人员可以在结构的规则内更安全、更高效地工作。

一些更常见的框架有：Bootstrap、Angular、Vue、Next.js等。

## **jQuery优点与缺点**

**jQuery的优点**

易于学习：相对于其它的前端框架，jQuery 更易于学习，它支持 JavaScript 的编码风格。

少写多做（Write less, do more）

* jQuery提供了丰富的功能(DOM操作、过滤器、事件、动画、Ajax等)。
* 可以编写更少可读的代码来提高开发人员的工作效率。

优秀的 API 文档：jQuery 提供了优秀的在线 API 文档。

跨浏览器支持：提供出色的跨浏览器支持 (IE9+)，无需编写额外代码。

**jQuery的缺点：**

jQuery代码库一直在增长（自 jQuery 1.5 起超过 200KB）

不支持组件化开发

jQuery 更适合DOM操作，当涉及到开发复杂的项目时，jQuery能力有限。

## **jQuery起源和历史**

**早在2005年8月22日，**John Resig 首次提出支持CSS选择器的JavaScript库，其语法比现有库（例如：Behaviour ）更简洁。

**在2006年之前，John Resig（一名从事自己项目的Web开发人员）对编写跨浏览器的JavaScript感到非常繁琐。**

2006年1月16日，John Resig在BarCamp的演讲中介绍了他的新库( jQuery )。

最后，我宣布了今晚发布的第二个新版本:jQuery: New Wave Javascript。简而言之，

这段代码彻底改变了Javascript与HTML交互的方式——它确实是一组令人惊叹的代码，

我已经投入了大量的时间和精力来实现它。我现在正在为网站编写文档，应该会在接下来的几天内准备好。

之后John Resig又花了 8 个月的时间完善jQuery库，直到2006-8-26才发布了 1.0 版本。

原本打算使用 JSelect（JavaScript Selectors）命名该库，但域名都已被占用。

## **Behaviour vs** **Selectors in JavaScript**

![image-20230726194134122](http://139.196.79.103:9001/myimages/imgs/image-20230726194134122.png)

## **jQuery历史版本**

![image-20230726194200691](http://139.196.79.103:9001/myimages/imgs/image-20230726194200691.png)

## **为什么学习jQuery**

jQuery是一个非常受欢迎的JavaScript库，被全球约 7000 万个网站使用。它优秀的设计和架构思想非常值得我们去学习。

jQuery 的座右铭是“Write less , do more”，它易于学习， 非常适合JavaScript 开发人员学习的第一个库。

前端JavaScript库非常多，学习jQuery有利于我们学习和理解其它的JavaScript库（例如：Day.js、Lodash.js等）

许多大型科技公司，虽然他们现在不会直接使用jQuery来做项目，但在项目中仍然会借鉴很多jQuery设计思想。

因此，了解 jQuery 依然是一个好主意。

## **jQuery的安装**

**jQuery 本质是一个JavaScript 库。**

该库包含了：DOM操作、选择器、事件处理、动画和 Ajax 等核心功能。

现在我们可以简单的理解它就是一个JavaScript文件。

执行该文件中会给window对象添加一个jQuery函数（例如：window.jQuery）。

接着我们就可以调用jQuery函数，或者使用该函数上的类方法。

下面我们来看看jQuery安装方式有哪些？

方式一：在页面中，直接通过CDN的方式引入。

方式二：下载jQuery的源文件，并在页面中手动引入。

方式三：使用npm包管理工具安装到项目中（npm在Node基础阶段会讲解）

## **认识CDN**

**什么是CDN呢？CDN称之为内容分发网络（Content Delivery Network或Content Distribution Network，缩写：CDN）**

CDN它是一组分布在不同地理位置的服务器相互连接形成的网络系统。

通过这个网络系统，将Web内容存放在距离用户最近的服务器。

可以更快、更可靠地将Web内容(文件、图片、音乐、视频等)发送给用户。

CDN不但可以提高资源的访问速度，还可以分担源站的压力。

**更简单的理解CDN：**

CDN会将资源缓存到遍布全球的网站，用户请求获取资源时；

可就近获取CDN上缓存的资源，提高资源访问速度，同时分担源站压力。

**常用的CDN服务可以大致分为两种：**

自己购买的CDN服务：需要购买开通CDN服务（会分配一个域名）。

目前阿里、腾讯、亚马逊、Google等都可以购买CDN服务。

开源的CDN服务

国际上使用比较多的是unpkg、JSDelivr、cdnjs、BootCDN等。

## **方式一：CDN**

**jQuery使用CDN方式引入**

```javascript
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
```

这个地址在哪里找呢？

![image-20230726200752595](http://139.196.79.103:9001/myimages/imgs/image-20230726200752595.png)

![image-20230726200819217](http://139.196.79.103:9001/myimages/imgs/image-20230726200819217.png)

**下面实现一个 Hello jQuery 的案例：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <!-- 
    integrity: 防止资源被篡改,如果浏览器发现资源被篡改 就不会加载该资源
    crossorigin: 加载不同源的资源时,浏览器是否需要携带用户凭证信息( cookie, ssl 证书 等 )
      anonymous: 不需要携带用户凭证信息
      user-credentail: 需要携带用户凭证信息
   -->
  <!-- <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script> -->


  <!-- 
    1.使用CDN的方式引入
    执行下面的js文件
      1.window.jQuery 函数 -> 工厂函数
      2.window.$ 函数
   -->
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script>
    // console.log("%O", jQuery)
    // console.log($ === jQuery)

    // 需求:在页面上显示 Hello World
    // document.querySelector('body').textContent = 'Hello World'

    // var $body = jQuery('body')
    // $body.text('hello jQuery')

    $('body').text('hello jQuery')
  </script>

</body>
</html>
```

## **方式二：下载源码引入**

**下载jQuery的源码**

**官网下载：https://jquery.com/download/**

**CDN连接地址下载： https://releases.jquery.com/jquery/**

**GitHub仓库中下载：https://github.com/jquery/jquery**

**下面使用源码的方式引入jQuery：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <script src="../libs/jquery-3.6.0.js"></script>

  <script>
    $('body').text('hello jquery') // textContent
  </script>
</body>
</html>
```

## **方式三：npm安装（了解）**

**使用npm安装jquery到项目中（npm在Node基础阶段会讲解）**

## **jQuery初体验-计数器案例**

使用原生实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <button class="sub">-</button>
  <span class="counter">0</span>
  <button class="add">+</button>

  <script>
    var subEl = document.querySelector('.sub')
    var spanEl = document.querySelector('.counter')
    var addEl = document.querySelector('.add')
    var counter = 0
    subEl.addEventListener('click', function() {
      spanEl.innerText = --counter
    })
    addEl.addEventListener('click', function() {
      spanEl.innerText = ++counter
    })

  </script>
</body>
</html>
```

使用jQuery实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button class="sub">-</button>
  <span class="counter">0</span>
  <button class="add">+</button>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    
    var $sub = jQuery('.sub')
    var $span = jQuery('.counter')
    var $add = jQuery('.add')
    var counter = 0
    $sub.on('click', function() {
      $span.text(--counter)      
    })
    $add.on('click', function() {
      $span.text(++counter)
    })

  </script>
</body>
</html>
```

原生实现计数器存在的问题，假如我们把DOM元素放在script标签后面，代码就会报错，因为代码是从上往下执行的，此时DOM还没有解析，那么我们就需要等文档完全解析完成

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // 1.监听文档完全解析完成
      document.addEventListener("DOMContentLoaded", function () {
        var subEl = document.querySelector(".sub");
        var spanEl = document.querySelector(".counter");
        var addEl = document.querySelector(".add");
        var counter = 0;
        subEl.addEventListener("click", function () {
          spanEl.innerText = --counter;
        });
        addEl.addEventListener("click", function () {
          spanEl.innerText = ++counter;
        });
      });
    </script>

    <button class="sub">-</button>
    <span class="counter">0</span>
    <button class="add">+</button>
  </body>
</html>
```

## **jQuery监听文档加载**

**jQuery监听document的DOMContentLoaded事件的四种方案**

* **$( document ).ready( handler ) ：** deprecated
* **$( "document" ).ready( handler ) ：** deprecated
* **$().ready( handler ) ：**deprecated
* **$( handler ) ：推荐用这种写法，其它可以使用但是不推荐**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>

  //  var $doc =  $(document)
  //  // 方式 1:监听文档完全解析完成
  //  $doc.ready(function() {
  //   console.log('doc ready')
  //  })

   // 方式 2:监听文档完全解析完成
  // jQuery('document').ready(function(){
  //   console.log('doc ready')
  // })

   // 方式 3:监听文档完全解析完成
  // $().ready(function(){
  //   console.log('doc ready')
  // })

   // 方式 4:监听文档完全解析完成
  $(function() {
    console.log('doc ready')
  })

  </script>
</body>
</html>

```

我们用jQuery对上面的计数器进行一下优化

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="../libs/jquery-3.6.0.js"></script>
    <script>
      // 监听文档完全解析完成
      jQuery(function () {
        var $sub = jQuery(".sub");
        var $span = jQuery(".counter");
        var $add = jQuery(".add");

        var counter = 0;
        $sub.on("click", function () {
          $span.text(--counter);
        });
        $add.on("click", function () {
          $span.text(++counter);
        });
      });
    </script>

    <button class="sub">-</button>
    <span class="counter">0</span>
    <button class="add">+</button>
  </body>
</html>

```

**监听window的load事件，即网页所有资源（外部连接，图片等）加载完**

.load( handler ) ： This API has been removed in jQuery 3.0

$(window).on('load', handler) : 推荐写法

![image-20230726203215772](http://139.196.79.103:9001/myimages/imgs/image-20230726203215772.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <img src="https://jquery.com/jquery-wp-content/themes/jquery/content/donate.png" alt="">
  
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // $(window).load(function() {} ) // 3.0 remove

    // 1.监听整个HTML页面加载完成( 外部链接 和 图片资源.. )
    $(window).on('load', function() {
      console.log('图片加载完成')
    })
  </script>
</body>
</html>
```

## **jQuery与其它库的变量名冲突**

**和 jQuery库一样，许多JavaScript库也会使用 $ 作为函数名或变量名。**

在 jQuery 中，$ 是jQuery的别名。

如果我们在使用jQuery库之前，其它库已经使用了 $ 函数或者变量，这时就会出现冲突的情况。

这时我们可以通过调用jQuery中的noConflict函数来解决冲突问题。

jQuery在初始化前会先备份一下全局其它库的jQuery和$变量，调用noConflict函数只是恢复之前备份的jQuery和$变量。

![image-20230727052922719](http://139.196.79.103:9001/myimages/imgs/image-20230727052922719.png)

自己封装的工具定义了一个变量$，和jQuery的$冲突，只要执行jQuery.noConflict()，就能使用自己封装的$

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <!-- 
    给window 添加了 $ 变量
    window.$ = '我是hy-utils'
   -->
  <script src="./utils/hy-utils.js"></script>

  <!-- 
    给window 添加了 $ 变量
    window.$ = func 函数
    var _$ =
    var _jQuery =
   -->
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // console.log('%O', $)  // func 还是  '我是hy-utils'

    // 1.解决变量的冲突
    jQuery.noConflict() // window.$ =  _$
    console.log( $ ) // 我是hy-utils

  </script>
</body>
</html>
```

/utils/hy-utils.js

```javascript
var $ = '我是hy-utils'
```

自己封装的工具定义了一个变量jQuery，和jQuery的jQuery冲突，只要执行jQuery.noConflict(true)，就能使用自己封装的jQuery变量

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <!-- 
    给window 添加了 $ 变量
    window.$ = '我是hy-utils'
    window.jQuery = '我是hy-utils jQuery'
   -->
  <script src="./utils/hy-utils.js"></script>

  <!-- 
    给window 添加了 $ 变量
     var _$ = window.$
    var _jQuery = window.jQuery

    window.$ = func 函数
    window.jQuery = func 函数

   -->
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // console.log('%O', $)  // func 还是  '我是hy-utils'

    // 1.解决变量的冲突
    var newjQuery = jQuery.noConflict(true) // window.$ =  _$ ;  window.jQuery =  _jQuery
    console.log( $ ) // 我是hy-utils
    console.log( jQuery ) // 我是hy-utils

    console.log(newjQuery)

  </script>
</body>
</html>
```

/utils/hy-utils.js

```javascript
var jQuery = '我是hy-utils jQuery'
```

如果想要使用jQuery，怎么办呢？用一个变量接收

```javascript
var newjQuery = jQuery.noConflict(true)

console.log(newjQuery)
```

## **认识jQuery函数**

**jQuery是一个工厂函数( 别名$ )，调用该函数，会根据传入参数类型来返回匹配到元素的集合，一般把该集合称为jQuery对象。**

如果传入假值：返回一个空的集合。

如果传入选择器：返回在在document中所匹配到元素的集合。

如果传入元素：返回包含该元素的集合。

如果传入HTML字符串，返回包含新创建元素的集合。

如果传入回调函数：返回的是包含document元素集合, 并且当文档加载完成会回调该函数。

因为函数也是对象，所以该函数还包含了很多已封装好的方法。如：jQuery.noConflict、jQuery.ready等

jQuery函数的参数：

jQuery( selector [, context ] ) ：selector 是字符串选择器；context 是匹配元素时的上下文，默认值为 document

* jQuery( selector [, context ] )
* jQuery( element )
* jQuery( elementArray )
* jQuery()

jQuery( html [, ownerDocument ] )

* jQuery( html [, ownerDocument ] )
* jQuery( html )

jQuery( callback )

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul>
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>

    // 1.假值： ''  false  null undefined NAN....
    // console.log( jQuery('') )

    // 2.字符串（选择器）
    // console.log( jQuery('ul li') )

    // 3.字符串（ html string）
    // console.log( jQuery('<div>') ) // 创建了一个div元素
    // document.createElement('div')  

    // var $els = jQuery(`
    //   <div>我是div</div><p>我是一个p</p>
    // `)
    // $els.appendTo('body')
    // console.log($els)


    // 4.元素类型
    // var bodyEl = document.querySelector('body')
    // console.log(jQuery(bodyEl))


    // 5.监听文档的解析完成
    // var $doc =jQuery(function() {

    // })
    // console.log(jQuery($doc))

  </script>
</body>
</html>
```

## **认识jQuery对象**

**jQuery对象是一个包含所匹配到元素的集合，该集合是类数组(array-like)对象。**

jQuery对象是通过调用jQuery函数来创建的。

jQuery对象中会包含N（>=0）个匹配到的元素。

jQuery 对象原型中包含了很多已封装好的方法。例如：DOM操作、事件处理、动画等方法。

下面我们通过调用jQuery函数来新建一个jQuery对象，例如：

* $() 新建一个空的jQuery对象
* $(document) 新建一个包含document元素的jQuery对象
* $('选择器') 新建一个包含所选中DOM元素的jQuery对象

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <ul>
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <div>
    <ul>
      <li class="div-li"></li>
    </ul>
  </div>

   <script src="../libs/jquery-3.6.0.js"></script>
   <script>
    // 1.创建一个空的jQuery对象
    // console.log(jQuery())
    
    // 2.创建一个匹配到document元素的集合 -> jQuery对象
    // console.log(jQuery(document)) 

    // 3.创建匹配到多个li元素的集合 -> jQuery对象
    // 第二个参数表示上下文，默认是document，表示从document里面查找ul li
    // document.querySelector('div')表示从div里面查找ul li
    // console.log(jQuery('ul li'))
    // console.log(jQuery('ul li', document.querySelector('div')))


   </script>
</body>
</html>
```

## **jQuery对象 与 DOM Element的区别**

**jQuery对象与DOM Element的区别**

获取的方式不同

* DOM Element 是通过原生方式获取，例如：document.querySelector()
* jQuery对象是通过调用jQuery函数获取，例如：jQuery(' ')

jQuery对象是一个类数组对象，该对象中会包含所选中的DOM Element的集合。

jQuery对象的原型上扩展非常多实用的方法，DOM Element 则是W3C规范中定义的属性和方法。

![image-20230727060826844](http://139.196.79.103:9001/myimages/imgs/image-20230727060826844.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.获取jQuery对象
    // console.log(jQuery('body'))

    // 2.获取DOM Element对象
    console.log('%O', document.querySelector('body'))
  </script>
</body>
</html>
```

## **jQuery对象 与 DOM Element 的转换**

**jQuery对象转成DOM Element**

.get(index)： 获取 jQuery 对象中某个索引中的 DOM 元素。

* index一个从零开始的整数，指示要检索的元素。
* 如果index超出范围（小于负数元素或等于或大于元素数），则返回undefined。

.get() : 没有参数，将返回jQuery对象中所有DOM元素的数组。

**DOM Element转成jQuery对象**

调用jQuery函数或者$函数

例如：$(元素)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul>
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.jQuery对象 转成 DOM Element
    var $ul = jQuery('ul')
    // console.log($ul) 
    // 方式一
    // var ulEl = $ul[0]  // 将jQuery对象转成DOM Element
    // console.log('%O', ulEl)
    // 方式二
    // console.log($ul.get()) // 获取到匹配元素集合中所有的元素 [ul]
    // console.log($ul.get(0)) // 获取到匹配元素集合中某一个元素 ul
    

    // 2.DOM Element 转成  jQuery对象
    // var ulEL = document.querySelector('ul')
    // console.log(ulEL)
    // console.log(jQuery(ulEL)) // 目的：想调用jQuery对象中的方法

  </script>
</body>
</html>
```

## **jQuery架构设计图**

**在开始学习jQuery语法之前，我们先来了解一下jQuery的架构设计图。**

**jQuery架构设计图如下：**

![image-20230727185553589](http://139.196.79.103:9001/myimages/imgs/image-20230727185553589.png)

HyJquery.js

```javascript

// 立即执行函数（避免与全局变量冲突）
;(function(global, factory) {
  factory(global)
})(window, function(window) {

  function HYjQuery(selector) {
    return new HYjQuery.fn.init(selector)
  }

  // 原型方法
  HYjQuery.prototype = {
    constructor: HYjQuery,
    extend: function() {},
    text: function() {},
    ready: function() {}
    // 学习这里的的方法
  
  }
  // 类方法
  HYjQuery.noConflict = function() {}
  HYjQuery.isArray = function() {}
  HYjQuery.map = function() {}
  // 学习这里的类方法

  HYjQuery.fn = HYjQuery.prototype

  // 构造函数（创建jQuery对象）
  HYjQuery.fn.init = function(selector) { // css selector
    
    if(!selector){
      return this
    }
    // 拿到DOM Element源码
    var el = document.querySelector(selector)
    this[0] = el
    this.length = 1
    return this
  }

  HYjQuery.fn.init.prototype = HYjQuery.fn

  window.HYjQuery = window.$ = HYjQuery

})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <script src="./HYjQuery.js"></script>
  <script>

    // console.log("%O", HYjQuery)
    console.log("%O", HYjQuery('body') )
    console.log("%O", HYjQuery )

  </script>
</body>
</html>
```

## **jQuery的选择器(Selectors)**

**jQuery函数支持大部分的CSS选择器，语法：jQuery（'字符串格式的选择器'）**

* 1.通用选择器（*）
* **2.基本选择器（id, class, 元素）**
* 3.属性选择器（ [attr] , [atrr=”value ”] ）
* 4.后代选择器（div > span, div span）
* 5.兄弟选择器（div + span , div ~ span）
* 6.交集选择器（div.container）
* **7.伪类选择器（:nth-child()，:nth-of-type()，:not()， 但不支持状态伪类 :hover, :focus...）**
* 8.内容选择器（:empty，:has(selector)）, empty指选中的元素没有子元素或文本； has指选中的元素是否存在某个子元素
* 9.可见选择器（:visible, :hidden）
* **10.jQuery扩展选择器：（:eq(), :odd, :even, :first, :last ）**
* ...

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* ul li:nth-child(2){

    } */
  </style>
</head>
<body>

  <ul id="list">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>

    // 1.基本的选择器
    // console.log( $('.li-1') )
    // console.log( $('#list') )

    // 2.伪元素选择器
    // console.log($('ul li:nth-child(2)'))

    // 3.jQuery额外扩展的选择器
    // document.querySelector('ul li:eq(1)') // 不会生效
    // console.log($('ul li:eq(1)'))
    // console.log($('ul li:first') )
    // console.log($('ul li:last') )

    // console.log($('ul li:odd') )
    // console.log($('ul li:even') )

  </script>
</body>
</html>
```

## **VSCode生成代码片段**

在线生成代码片段地址：https://snippet-generator.app/

文件=>首选项=>配置用户代码片段，选择html.json就可以快速配置一个html的模板，如果是js，需要选择javascript

## **jQuery过滤器(Filtering) API**

**jQuery过滤器API ( 即jQuery原型上的方法 )**

1.eq(index): 从匹配元素的集合中，取索引处的元素， eq全称(equal 等于)，返回jQuery对象。

2.first() : 从匹配元素的集合中，取第一个元素，返回jQuery对象。

3.last(): 从匹配元素的集合中，取最后一个元素，返回jQuery对象。

4.not(selector): 从匹配元素的集合中，删除匹配的元素，返回jQuery对象。

5.filter(selector): 从匹配元素的集合中，过滤出匹配的元素，返回jQuery对象。

6.find(selector): 从匹配元素集合中，找到匹配的后代元素，返回jQuery对象。

7.is(selector|element| . ): 根据选择器、元素等检查当前匹配到元素的集合。集合中至少有一个与给定参数匹配则返回true。

8.odd() :将匹配到元素的集合减少为集合中的奇数，从零开始编号，返回jQuery对象。

9.even()：将匹配到元素的集合减少到集合中的偶数，从零开始编号，返回jQuery对象。

10.支持链式调用

...

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {

      // 1.eq()
      // console.log($('ul li:eq(2)') ) // selector
      // console.log( $('ul li').eq(2) ) // API -> 原型上的方法

      // 2.first()  last()
      // console.log( $('ul li').first() )
      // console.log( $('ul li').last() )

      // 3.not()
      // console.log($('ul li').not('.li-1') )
      // console.log($('ul li').not('.li-1, .li-2') )

      // 4. odd()  even()
      // console.log($('ul li').odd() )
      // console.log($('ul li').even() )

      // 5.filter()
      // console.log($('ul li').filter('.li-4') )
      // console.log($('ul li').filter('.li-4, .li-3') )

      // 6.jQuery原型上的方法，大部分支持链式调用
      var $el = $('ul li')
                .filter('.li-2, .li-3, .li-4')
                .eq(1)

      console.log($el)

      // new Promise()
      //   .then()
      //   .then()
      //   .then()
              

    })
  </script>
</body>
</html>
```

## **jQuery对文本的操作**

**.text()、.text(text)**

获取匹配到元素集合中每个元素组合的文本内容，包括它们的后代，或设置匹配到元素的文本内容。

相当于原生元素的textContent属性。

**.html()、html(htmlString)**

获取匹配到元素集合中第一个元素的HTML内容，包括它们的后代，或设置每个匹配元素的 HTML 内容。

相当于原生元素的innerHTML属性。

.**val()、.val(value)**

获取匹配到元素集合中第一个元素的当前值 或 设置每个匹配到元素的值。

该.val()方法主要用于获取input,select和等表单元素的值。

相当于获取原生元素的value属性。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5
      <span>我是span</span>
    </li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.拿到 ul 中所有的文本
      // console.log( $('ul').text() )
      console.log( $('ul li').text() )  // 

      // 2.设置 li 中的文本
     $('ul li').text('我是li')  // 会给匹配元素集合中所有的元素添加文本 （ 设置值：一般是给选中所有元素设置）


    })
  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.获取ul元素中的所有 html 内容
      console.log($('ul li').html() ) // 拿到匹配元素集合中的第一个元素（获取的时候 一般是拿到匹配元素集合中的第一个元素的数据 ）

      // 2.给设置 li 元素设置 html的内容（ 设置 ）
      $('ul li').html(`
        <p>我是p元素</p>
        <span>我是一个span</span>
      `)

    })
  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <input class="user" type="text" placeholder="请求输入用户名">
  <input class="password" type="text" placeholder="请求输入密码">

  <button class="login">登录</button>
  <button class="setUserPas">设置用户名密码</button>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.获取表单数据
      // $('.login').on('click', function() {})

      // 简写
      $('.login').click(function() {
        console.log( $('.user').val() )
        console.log( $('.password').val() )
      })

      // 2.给表单元素设置值
      $('.setUserPas').click(function() {
        $('.user').val('coder')
        $('.password').val('admin')
      })


    })
  </script>
</body>
</html>
```

## **jQuery对CSS的操作**

**.width()、.width(value)**

获取匹配到元素集合中第一个元素的宽度或设置每个匹配到元素的宽度。

**.height()、height(value)**

获取匹配到元素集合中第一个元素的高度或设置每个匹配到元素的高度。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.获取到元素的width
      // width: content ;  innerWidth:padding + content; outerWidth: border + padding + content
      console.log($('ul').width()) // 返回的结果是 number

      // 2.设置ul元素的width
      // $('ul').width(300)  // 直接给style设置一个width
      // $('ul').width('500px')  // 直接给style设置一个width

      // 3. width height  innerWidth innerHeight ......

    })
  </script>
</body>
</html>
```

**.css(propertyName)、.css(propertyNames)**

获取匹配到元素集中第一个元素样式属性的值，底层是调用getComputedStyle函数获取。

.css( "width" )和.width()之间的区别:

width()返回一个无单位的像素值（例如，400），而css()返回一个具有完整单位的值（例如，400px）

.**css(propertyName, value)、.css(properties)**

为每个匹配到元素设置一个 或 多个 CSS 属性**。**

调用css方法添加样式会直接把样式添加到元素的style属性上。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.获取ul元素的width
      // console.log( $('ul').css('width') )  // 返回的结果是 string 带单位 px
      // console.log( $('ul').css(['width', 'height']) )  // 返回的结果是 string 带单位 px 。 {width: '223px', height: '105px'}

      // 2.给ul元元素设置width
      // $('ul').css('width', '450px') // 设置的是一个属性
      
      // $('ul').css({  // 设置的是多个属性
      //   width: 100,
      //   height: 100,
      //   color: 'red'
      // })

      $('ul li')
        .css('color', 'green')
        .odd()
        .css({
          color: 'red'
        })
    })
  </script>
</body>
</html>
```

## **Class属性的操作**

**.addClass(className)、.addClass(classNames)、.addClass(funcntion)**

将指定的类添加到匹配元素集合中的每个元素，每次都是追加class。

底层调用的是setAttribute( "class", finalValue )方法添加class。

**.hasClass(className)**

是否给任意匹配到的元素分配了该类。

底层是通过getAttribute( "class" ).indexOf()来判断是否存在。

.removeClass()、.removeClass(className)、.removeClass(classNames)、.removeClass(function)

给匹配元素集中的每个元素删除单个类、多个类或所有类。

底层调用的是setAttribute( "class", finalValue )方法。

.toggleClass()、.toggleClass(className[,state])、.toggleClass(classNames[,state])

根据类的存在或状态参数的值，在匹配到元素的集合中，给每个元素添加或删除一个或多个类。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul class="active list">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <button class="toggle">切换class</button>
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.添加class
      // $('ul').addClass('list1 list2')
      // $('ul li').addClass(['list1', 'list2'])

      // 2.判断是否存在某个class
      // console.log($('ul').hasClass('active list') )

      // 3.删除class
      // $('ul').removeClass() // 删除全部
      // $('ul').removeClass('list') // 删除指定的某一个

      // 4.class的切换
      $('.toggle').click(function() {
        // $('ul').toggleClass()
        $('ul').toggleClass('active')
      })
     

    })
  </script>
</body>
</html>
```

## **attributes和property属性的操作**

**.attr(attributeName)**

获取匹配元素集和中第一个元素的属性值，底层调用了原生的 getAttribute() API

**.attr(attributeName, value)、.attr(attributes)**

为每个匹配元素设置一个或多个属性，底层调用了原生的 setAttribute() API

**.removeAttr(attributeName)**

在匹配到元素的集中，给每个元素删除一个属性。

底层调用了原生的 removeAttribute() API

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list"
      name="liujun" age="17"
  >
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.获取attribute属性  ul
      // console.log($('ul').attr('id'))
      // console.log($('ul').attr('name'))

      // 2.设置 attribute属性 ul
      // $('ul').attr('id', 'box')

      // $('ul').attr({   // 设置多个属性
      //   id: 'container',
      //   class: "panel",
      //   name: 'coder'
      // })

      // 3.删除 attribute属性 ul
      // $('ul').removeAttr('id')
      // $('ul').removeAttr('name')




    })
  </script>
</body>
</html>
```

**.prop(propertyName)**

获取匹配到元素集合中第一个元素的属性值

**.prop(propertyName，value)、.prop(propertys)**

为每个匹配元素设置一个或多个属性。

removeProp(**propertyName**)

删除匹配元素集的属性,( 只能删除用户自定义添加的prop，不能删除元素本身的属性 )。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel"
     name="liujun"
  >
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <input type="text">

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.获取property属性  ul
      console.log("%O", document.querySelector('input') )

      // console.log($('ul').prop('id') )
      // console.log($('ul').prop('name') )

      // console.log($('ul').prop('nodeName') )
      // console.log($('ul').prop('nodeType') )

      // 2.设置property属性  input
      // $('input').prop('disabled', true)

      $('input').prop({
        disabled: true,
        placeholder: '请输入用户名',
        jQuery_liujun_123: '自定义的属性' // 缓存 click  data
      })

      // 3.删除property属性 input
      $('input').removeProp('jQuery_liujun_123') // 只能删除 自定义的属性
    })
  </script>
</body>
</html>
```

## **自定义data-xx属性的操作**

**.data()、.data(key)**

获取匹配元素集中第一个元素的自定义属性的值

**.data(key, value) 、.data(obj)**

为每个匹配元素设置一个或多个自定义属性

**.removeData([name])**

会删除data()函数给匹配元素属性添加的数据 和 data()函数绑定的自定义属性。

data函数添加的属性会被移除，但是如果属性同时在签上定义了就不会被移除。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel"
    data-name="liujun" data-age="17"
  >
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.获取data属性 ul
      console.log($('ul').data() )  //  {age: 17, name: 'liujun'}
      // console.log($('ul').data('age') )
      
      // 2.设置data属性 ul
      // $('ul').data('name', 'coder')
      $('ul').data({  // 调用data()函数只能修改 缓存中的数据
        name: 'coder',
        age: '18',
        height: '1.66'  // 动态添加的data-xx属性
      })

      // 3.删除data属性
      // $('ul').removeData('name')  // 只能删除 缓存中的数据
      $('ul').removeData(['name', 'age', 'height'])  // 只能删除 缓存中的数据


      console.log( $('ul').data('name') )
      console.log("%O", $('ul').get(0) )


    })
  </script>
</body>
</html>
```

## **jQuery的DOM操作-插入内容**

**.append(content [, content] ) 、append( function )**

将参数的内容插入到匹配元素集中每个元素的末尾。

content 的类型: DOM element, text node, array of elements and text nodes, HTML string, or jQuery object

.**prepend(content [, content] ) 、prepend( function )**

将参数的内容插入到匹配元素集中每个元素的开头。

**.after(content [, content] ) 、after( function )**

在匹配元素集中的每个元素之后，插入由参数指定的内容。

**.before(content [, content])、before( function )**

在匹配元素集中的每个元素之前，插入由参数指定的内容。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">

    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>

  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.在ul的尾部插入文本
      // $('ul').append('文本')
      // $('ul').prepend('文本')

      // $('ul').before('文本')
      // $('ul').after('文本')

    })
  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">

    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>

  </ul>

  <li class="li-6"> 我是li-6 </li>
  
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 方式一: 在ul的尾部插入文本
      // $('ul').append('文本')

      // 方式二: 插入html字符串
      // $('ul').append(`
      //   <li class="li-6">我是li-6</li>
      //   <li class="li-7">我是li-7</li>
      // `)

      // 方式三: 插入的是jQuery对象
      // var liEl = document.createElement('li')
      // var $li = $('<li>').addClass('li-6').text('我是li-6')
      // $('ul').append($li)

      // 方式四: 插入的是元素对象
      // var liEl = document.createElement('li')
      // liEl.className = 'li-6'
      // liEl.innerText = '我是li-6'
      // $('ul').append(liEl)

      //  方式五: 选中页面上的元素插入到ul中
      $('ul').append( $('.li-6') ) // move, 不是clone

    })
  </script>
</body>
</html>
```

## **jQuery的DOM操作-插入内容**

**.appendTo(target)**

将匹配元素集中的每个元素插入到目标元素的末尾。

target的类型：A selector, element, HTML string, array of elements, or jQuery object。

.**prependTo(target)**

将匹配元素集中的每个元素插入到目标元素的开头。

**.insertAfter(target)**

在目标元素之后，插入匹配元素集中的每个元素。

.**insertBefore(target)**

在目标元素之前，插入匹配元素集中的每个元素。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">

    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>

  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
     // 1.给ul的尾部插入内容
     $('<li>')
      .addClass('li-6')
      .text('我是li-6')  // 创建一个li元素

      // .appendTo( $('ul') )
      // .prependTo( $('ul') )
      // .insertBefore( $('ul') )
      .insertAfter( $('ul') )

    })
  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">

    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>

  </ul>

   <li class="li-7">我是li-7</li>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
     // 1.给ul的尾部插入内容
     $('<li>')
      .addClass('li-6')
      .css('color', 'red')
      .text('我是li-6')  // 创建一个li元素(必须是一个jQuery对象)

      // 方式一: 支持 jQuery对象
      // .appendTo( $('ul') )

      // 方式二: 支持 字符串类型的选择器
      // .appendTo( 'ul' )

      // 方式三: 支持 元素对象
      .appendTo( document.querySelector('ul') )


      $('.li-7').appendTo('ul')  // append

    })
  </script>
</body>
</html>
```

## **jQuery的DOM操作-移除/替换/克隆**

**.empty(): 删除匹配元素集的所有子节点，自身不会删除。**

**.remove( ) 、.remove( [selector] )**

删除匹配的元素集，自身也会删除。

selector参数：字符串类型选择器。筛选匹配元素集的元素来删除

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.删除ul中的后代元素
      // $('ul').empty()

      // 2.删除ul 以及后代元素
      // $('ul').remove()
      
      // $('ul li').remove('字符串选择器')

      // $('ul li').remove('.li-1, .li-2') // 支持
      // $('ul li').remove(['.li-1', '.li-2'])  // 不支持

    })
  </script>
</body>
</html>
```

**.replaceAll(target):** 用匹配到的元素集替换每个目标元素。

**.replaceWidth(newContent)、.replaceWidth( function )**

用新内容替换匹配元素集中的每个元素，并返回被移除的元素集。

newConten参数的类型： HTML string, DOM element, array of DOM elements, or jQuery object

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
  </ul>

  <li class="li-6">li-6</li>
  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.将li替换为 span元素 .replaceAll(target)
      // $('<span>')
      //   .addClass('content')
      //   .text('我是span')
      //   .css('color', 'red') // 创建一个span元素( jQuery对象 )

      //   .replaceAll( 'ul li' ) // 将li元素替换为span 
      //   replaceAll参数: 1.字符串类型的选择器  2. $('ul li') jQuery对象  3. 元素对象

      // 2.将li替换为 span元素 .replaceWidh( content )
      var $span = $('<span>').text('我是span')
      // $('ul li').replaceWith( $span )
      $('ul li').replaceWith('<span>我是span</span>')
        //   replaceWith 参数: 1.字符串文本/html字符串  2. $('ul li') jQuery对象  3. 元素对象

    })
  </script>
</body>
</html>
```

**.clone()、.clone( withDataAndEvents )**

对匹配的元素集执行深度复制，底层是调用了elem.cloneNode( true )来复制元素。

withDataAndEvents参数 **:** 布尔值，是否复制该元素的事件处理程序和数据，默认值为false。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <ul id="list" class="panel">
    <li class="li-1">li-1</li>
    <li class="li-2">li-2</li>
    <li class="li-3">li-3</li>
    <li class="li-4">li-4</li>
    <li class="li-5">li-5</li>
    
  </ul>

  <li class="li-6">li-6</li>

  <script src="../libs/jquery-3.6.0.js"></script>
  <script>
    // 1.监听文档完全解析完成
    $(function() {
      // 1.将li-6克隆到ul元素的尾部
      // var $newLi = $('.li-6').clone() // 属于克隆一个li元素
      // $newLi.appendTo('ul')

      // 简写
      // $('.li-6').clone().appendTo('ul')

      // 2.将li-6克隆到 ul元素的尾部( 将li-6的事件处理函数和data自定义属性一起拷贝过去 )
      $('.li-6')
        .data({
          name: 'liujun',
          age: '17'
        })
        .click(function() {
          console.log( 'li-6' )
        })
        // 开始克隆
        .clone(true)
        .appendTo('ul')
         
      console.log("%O", $('.li-6').get(0))
    })
  </script>
</body>
</html>
```

