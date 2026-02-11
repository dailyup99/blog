---
outline: deep
---

## **邂逅 SVG**

**什么是 SVG？维基百科介绍：**

SVG 全称为（Scalable Vector Graphics），即可缩放矢量图形。（矢量定义：既有大小又有方向的量。在物理学中称作矢

量，如一个带箭头线段：长度表示大小，箭头表示方向；在数学中称作向量。在计算机中，矢量图可无限放大而不变形）

SVG 是一种基于 XML 格式的矢量图，主要用于定义二维图形，支持交互和动画。

SVG 规范是万维网联盟(W3C) 自 1998 年以来开发的标准。

SVG 图像可在不损失质量的情况下按比例缩放，并支持压缩。

基于 XML 的 SVG 可轻松的用文本编辑器或矢量图形编辑器创建和编辑，并可以直接在浏览器显示。

**SVG 对浏览器的兼容性：**

![image-20230803214628581](../../images/image-20230803214628581.png)

## **SVG 历史**

SVG1.x 版本

SVG 是 W3C SVG 工作组于 1998 年开始开发 ，而 SVG 1.0 于 2001 年 9 月 4 日成为 W3C 推荐的标准。

SVG 1.1 于 2003 年 1 月 14 日成为 W3C 推荐的标准。 该版本增加了模块化规范的内容。除此之外，1.1 和 1.0 几乎没有区别。

SVG Tiny 1.2 于 2008 年 12 月 22 日成为 W3C 推荐标准，主要是为性能低的小设备生成图形，但是后来被 SVG 2 所弃用了。

SVG 1.1 第二版 于 2011 年 8 月 16 日发布，这次只是更新了勘误表和说明，并没有增加新功能 。

SVG 2.0 版本（推荐）

SVG 2.0 于 2016 年 9 月 15 日成为 W3C 候选推荐标准，最新草案于 2020 年 5 月 26 日发布。

SVG2.x Change From SVG1.x ( https://www.w3.org/TR/SVG/changes.html )

## **SVG 优点**

**扩展好：**矢量图像在浏览器中放大缩小不会失真，可被许多设备和浏览器中使用。而光栅图像（PNG 、JPG）放大缩小会失真。

矢量图像是基于矢量的点、线、形状和数学公式来构建的图形，该图形是没有像素的，放大缩小是不会失真的。

光栅图像是由像素点构建的图像——微小的彩色方块，大量像素点可以形成高清图像，比如照片。图像像素越多，质量越高。

![image-20230804201936507](../../images/image-20230804201936507.png)

**灵活：**SVG 是 W3C 开发的标准，可结合其它的语言和技术一起使用，包括 CSS、JavaScript、 HTML 和 SMIL 。SVG 图像可以

直接使用 JS 和 CSS 进行操作，使用时非常方便和灵活，因为 SVG 也是可集成到 DOM 中的。

**可以动画：**SVG 图像可以使用 JS 、 CSS 和 SMIL 进行动画处理。对于 Web 开发人员来说非常的友好。

**轻量级：**与其它格式相比，SVG 图像的尺寸非常小。根据图像的不同，PNG 图像质量可能是 SVG 图像的 50 倍。

**可打印：**SVG 图像可以以任何分辨率打印，而不会损失图像质量。

**利于 SEO：**SVG 图像被搜索引擎索引。因此，SVG 图像非常适合 SEO（搜索引擎优化）目的。

**可压缩：**与其它图像格式一样，SVG 文件支持压缩。

**易于编辑：**只需一个文本编辑器就可以创建 SVG 图像。设计师通常会使用 Adobe Illustrator （AI）等矢量图形工具创建和编辑。

## **SVG 缺点**

**不适和高清图片制作**

SVG 格式非常适合用于徽标和图标（ICON）等 2D 图形，但不适用于高清图片，不适合进行像素级操作。

SVG 的图像无法显示与标准图像格式一样多的细节，因为它们是使用点和路径而不是像素来渲染的。

**SVG 图像变得复杂时，加载会比较慢**

**不完全扩平台**

尽管 SVG 自 1998 年以来就已经存在，并得到了大多数现代浏览器（桌面和移动设备）的支持，但它不适用于 IE8 及更低版

本的旧版浏览器。根据 caniuse 的数据，大约还有 5% 的用户在使用不支持 SVG 的浏览器。

![image-20230804202405595](../../images/image-20230804202405595.png)

## **SVG 应用场景**

**SVG 应用场景有哪些？ 下面是一些保证 SVG 优于其他图像格式的应用场景：**

SVG 非常适合显示矢量徽标（Logo）、图标（ICON）和其他几何设计。

SVG 适合应用在需适配多种尺寸的屏幕上展示，因为 SVG 的扩展性更好。

当需要创建简单的动画时，SVG 是一种理想的格式。

- SVG 可以与 JS 交互来制作线条动画、过渡和其他复杂的动画。
- SVG 可以与 CSS 动画交互，也可以使用自己内置的 SMIL 动画。

SVG 也非常适合制作各种图表（条形图、折线图、饼图、散点图等等），以及大屏可视化页面开发。

![image-20230804202550150](../../images/image-20230804202550150.png)

## **SVG 和 Canvas 的区别**

可扩展性：

- SVG 是基于矢量的点、线、形状和数学公式来构建的图形，该图形是没有像素的，放大缩小不会失真。
- Canvas 是由一个个像素点构成的图形，放大会使图形变得颗粒状和像素化（模糊）。
- SVG 可以在任何分辨率下以高质量的打印。Canvas 不适合在任意分辨率下打印。

渲染能力：

- 当 SVG 很复杂时，它的渲染就会变得很慢，因为在很大程度上去使用 DOM 时，渲染会变得很慢。
- Canvas 提供了高性能的渲染和更快的图形处理能力，例如：适合制作 H5 小游戏。
- 当图像中具有大量元素时，SVG 文件的大小会增长得更快（导致 DOM 变得复杂），而 Canvas 并不会增加太多。

灵活度：

- SVG 可以通过 JavaScript 和 CSS 进行修改，用 SVG 来创建动画和制作特效非常方便。
- Canvas 只能通过 JavaScript 进行修改，创建动画得一帧帧重绘。

使用场景：

- Canvas 主要用于游戏开发、绘制图形、复杂照片的合成，以及对图片进行像素级别的操作，如：取色器、复古照片。
- SVG 非常适合显示矢量徽标（Logo）、图标（ICON）和其他几何设计。

## **初体验 SVG**

**如何绘制一个 SVG 矢量图？ 绘制 SVG 矢量图常用有 4 种方式：**

- 方式一：在一个单独的 svg 文件中绘制，svg 文件可直接在浏览器预览或嵌入到 HTML 中使用（推荐）
- 方式二：直接在 HTML 文件中使用 svg 元素来绘制（推荐）
- 方式三：直接使用 JavaScript 代码来生成 svg 矢量图。
- 方式四：使用 AI（Adobe IIIustractor）矢量绘图工具来绘制矢量图，并导出为 svg 文件（推荐）

**SVG 初体验**

第一步：新建一个 svg 文件，在文件第一行编写 XML 文件声明

第二步：编写 一个\<svg>元素，并给该元素添加如下属性：

- version： 指定使用 svg 的版本，值为 1.0 和 1.1，并没有 2.0。
- baseProfile：SVG 2 之前，version 和 baseProfile 属性用来验证和识别 SVG 版本。而 SVG2 后不推荐使用这两个属性了。
- width / height ：指定 svg 画布（视口）的宽和高，默认值分别为 300 和 150，默认使用 px 单位。
- xmlns：给 svg 元素帮定一个命名空间（http://www.w3.org/2000/svg）
  - 意味着这个\<svg> 标签和它的子元素都属于该命名空间下。

第三步：在< svg >元素中添加 图形（比如：< rect >） 元素

第四步：在浏览器直接预览 或 嵌入到 HTML 中预览（嵌入 HTML 有 6 种方案）

## **XML 和 DTD 声明**

由于 SVG 是一个 XML 文件格式。在编写 XML 文档时，通常是推荐编写 XML 声明。因为在 XML 1.0 中，XML 声明是可选的，推荐写但不是强制性。

然而，在 XML 1.1 中，声明是强制性的，如果没有声明，则自动暗示该文档是 XML 1.0 文档。所以这里建议大家在编写 SVG 文件时也编写一个 XML 声明。

SVG 的 XML 声明格式：\<?xml version="1.0" encoding="UTF-8" standalone="no" ?>

- version 指定版本（必填）
- encoding 指定 XML 文档的编码（可选，默认是 UTF-8）
- standalone：指定当前 XML 文档是否依赖于外部标记声明（可选，使用该属性时，需和 DTD 声明一起用才有意义）。
  - 默认为 no：代表依赖外部标记声明
  - yes：代表依赖内部默认的标记声明

SVG 的文档类型声明（DTD），让解析器验证 XML 文件是否符合该规范，与 HTML5 文件的 DTD 声明类似。

- XML 中内部 DTD 声明（可选）
- XML 中外部 DTD 声明（可选）

\<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

## **SVG 文档结构**

**SVG1.1 文档结构：**https://www.w3.org/TR/SVG11/struct.html

第一行：包含一个 XML 声明。由于 SVG 文件是一个 XML 格式的，它应包含一个 XML 声明。

第二行：定义文档类型声明 (DTD)，这里依赖外部的 SVG1.1 文档类型，让解析器验证 XML 文件是否符合该规范。

```json
<!DOCTYPE svg PUBLIC “-//W3C//DTD SVG 1.1//EN” "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
```

<img src="../../images/image-20230805092512467.png" />

**SVG2.0 文档结构：**https://www.w3.org/TR/SVG2/struct.html#Namespace

SVG2 version 和 baseProfile 属性已删除，也不推荐写文档类型声明（DTD）。其中\<desc>元素是用来描述该文件的。

### 通过 svg 文件来创建 1.0 版本

注意：文件格式是 svg

```svg
<!-- 前面这两行可以不写，浏览器会默认添加 -->
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!--
 version="1.0"
 baseProfile="full" 正确渲染svg内容时所需要最小SVG语言概述(版本); full:正常的svg语言概述  basic:基本SVG语言概述  tiny: 轻量级SVG语言概述

 xmlns: 指定svg元素  和 svg内的子元素都是属于 http://www.w3.org/2000/svg 这个命名空间下

 -->
<svg
 version="1.0"
 baseProfile="full"
 width="100"
 height="100"
 xmlns="http://www.w3.org/2000/svg"
>
  <rect x="0" y="0" width="100" height="100"></rect>
  <title>我是svg title</title>
</svg>

```

### 通过 svg 文件来创建 2.0 版本

```svg
<?xml version="1.0" standalone="no" ?>
<svg
 width="100"
 height="100"
 xmlns="http://www.w3.org/2000/svg"
>
  <rect x="0" y="0" width="100" height="100"></rect>
</svg>
```

### 在 html 中创建 svg

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
    <!-- 1.创建svg 1.0 -->
    <svg
      version="1.0"
      baseProfile="full"
      width="100"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="100" height="100"></rect>
    </svg>

    <!-- 2.创建svg 2.0 -->
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100"></rect>
    </svg>

    <!-- 3.创建svg 2.0 简写 
      xmlns="http://www.w3.org/2000/svg" 这个命名空间浏览器的解析器会自动添加

      默认w 300px  h: 150px
    -->
    <svg>
      <rect x="0" y="0" width="100" height="100"></rect>
    </svg>
  </body>
</html>
```

## **JS 创建 SVG**

使用 JS 脚本来创建 SVG 时，创建的元素都是需要添加命名空间的。

比如：创建\<svg>或者\<rect>元素都需要添加命名空间（http://www.w3.org/2000/svg）

对于元素上的属性如果不带前缀的，命名空间赋值为 null。

因为在 XML1.1 命名空间规范中建议，不带前缀的属性（带前缀 xlink:href）命名空间的名称是没有值的，这时命名空间的值必须

使用 null 值。

创建 SVG 常用的 DOM2 API：

- createElementNS（ns，elname）：创建 SVG 元素
- setAttributeNS（ns，attrname，value）：给 SVG 元素添加属性
- getAttributeNS（ns，attrname）：获取 SVG 元素上的属性
- hasAttributeNS（ns, attrname）： 判断 SVG 元素上是否存在某个属性
- removeAttributeNS（ns，attname）：删除 SVG 元素上的某个属性
- 更多的 API：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Namespaces_Crash_Course

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
    <!-- 1.创建svg 2.0 -->
    <!-- 
    
    
  <svg
    width="100"
    height="100"
    xmlns="http://www.w3.org/2000/svg"
  > 
   <rect x="0" y="0" width="100" height="100"></rect>
  </svg>

-->

    <script>
      /**
       *
       * jQuery -> Snap.svg
       */
      window.onload = function () {
        // 1.创建svg 和 rect 元素
        let xmlns = "http://www.w3.org/2000/svg";
        let svgEl = document.createElementNS(xmlns, "svg");
        let rectEl = document.createElementNS(xmlns, "rect");

        // 2.给svg 和 rect 元素对象添加属性
        svgEl.setAttributeNS(null, "version", "1.0");
        svgEl.setAttributeNS(null, "width", 100);
        svgEl.setAttributeNS(null, "height", 100);

        rectEl.setAttributeNS(null, "width", 50);
        rectEl.setAttributeNS(null, "height", 50);

        // 3.将svg添加到 body上
        svgEl.appendChild(rectEl);
        document.body.appendChild(svgEl);
      };
    </script>
  </body>
</html>
```

## **HTML 引入 SVG**

方式一：img 元素

作为一张图片使用，不支持交互，只兼容 ie9 以上

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
    <!-- 在img中直接使用svg -->
    <img src="./rect.svg" alt="" />
  </body>
</html>
```

方式二：CSS 背景

作为一张背景图片使用，不支持交互

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 200px;
        height: 200px;
        background-image: url(./rect.svg);
        background-repeat: no-repeat;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

方式三：直接在 HTML 文件引用源文件

作为 HTML 的 DOM 元素，支持交互，只兼容 ie9 以上

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
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100"></rect>
    </svg>
  </body>
</html>
```

方式四：object 元素（了解）。

支持交互式 svg，能拿到 object 的引用，为 SVG 设置动画、更改其样式表等

方式五：iframe 元素（了解） 。

支持交互式 svg，能拿到 iframe 的引用，为 SVG 设置动画、更改其样式表等

方式六：embed 元素（了解） 。

支持交互式 svg，能拿到 embed 的引用，为 SVG 设置动画、更改其样式表等，对旧版浏览器有更好的支持。

<img src="../../images/image-20230805101354606.png" />

## **SVG Grid 和 坐标系**

**SVG 使用的坐标系统（网格系统）和 Canvas 的差不多。坐标系是以左上角为 (0,0) 坐标原点，坐标以像素为单位，x 轴正方向**

**是向右，y 轴正方向是向下。**

**SVG Grid（坐标系）**

\<svg>元素默认宽为 300px, 高为 150px。如右图所示，\<svg>元素默认被网格所覆盖。

![image-20230805102149705](../../images/image-20230805102149705.png)

通常来说网格中的一个单元相当于 svg 元素中的一像素。

基本上在 SVG 文档中的 1 个像素对应输出设备（比如显示屏）上的 1 个像素（除非缩放）。

\<svg>元素和其它元素一样也是有一个坐标空间的，其原点位于元素的左上角，被称为初始视口坐标系

\<svg>的 transform 属性可以用来移动、旋转、缩放 SVG 中的某个元素，如\<svg>中某个元素用了变形，该元素内部会建立
一个新的坐标系统，该元素默认后续所有变化都是基于新创建的坐标系统。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="100"></rect>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805102306042.png" />

## **SVG 坐标系单位**

SVG 坐标系统，在没有明确指定单位时，默认以像素为单位。

比如：\<rect x="0" y="0" width="100" height="100" />

定义一个矩形，即从左上角开始，向右延展 100px，向下延展 100px，形成一个 100\*100 大的矩形。

当然我们也可以手动指明坐标系的单位，比如：

<img src="../../images/image-20230805102550177.png" />

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="15cm" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100px" height="5cm"></rect>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805102619223.png" />

## **视口-viewport**

**视口（viewport）**

视口是 SVG 可见的区域（也可以说是 SVG 画布大小）。可以将视口视为可看到特定场景的窗口。

可以使用\<svg>元素的 width 和 height 属性指定视口的大小。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <!-- 
    通过给svg设置 width 和 height 来指定视口的大小(画布的大小)
    下面指定视口的大小为: 300 * 300
   -->
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="100"></rect>
    </svg>
  </body>
</html>
```

一旦设置了最外层 SVG 元素的宽度和高度，浏览器就会建立初始视口坐标系和初始用户坐标系。

**视口坐标系**

视口坐标系是在视口上建立的坐标系，原点在视口左上角的点(0, 0)，x 轴正向向右，y 轴正向下。

初始视口坐标系中的一个单位等于视口中的一个像素，该坐标系类似于 HTML 元素的坐标系。

**用户坐标系**（ 也称为当前坐标系或正在使用的用户空间，后面绘图都是参照该坐标系 ）

用户坐标系是建立在 SVG 视口上的坐标系。该坐标系最初与视口坐标系相同——它的原点位于视口的左上角。

使用 viewBox 属性，可以修改初始用户坐标系，使其不再与视口坐标系相同。

**为什么要有两个坐标系？**

因为 SVG 是矢量图，支持任意缩放。在用户坐标系统绘制的图形，最终会参照视口坐标系来进行等比例缩放。

## **视图框（viewBox）**

viewport 是 SVG 画布的大小，而 viewBox 是用来定义用户坐标系中的位置和尺寸 （该区域通常会被缩放填充视口）。

viewBox 也可理解为是用来指定用户坐标系大小。因为 SVG 的图形都是绘制到该区域中。用户坐标系可以比视口坐标系更小或更大，也可

以在视口内完全或部分可见。

一旦创建了视口坐标系（\<svg>使用 width 和 height），浏览器就会创建一个与其相同的默认用户坐标系。

我们可以使用 viewBox 属性指定用户坐标系的大小。

- 如果用户坐标系与视口坐标系具有相同的高宽比，它将 viewBox 区域拉伸以填充视口区域。
- 如果用户坐标系和视口坐标系没有相同的宽高比，可用 preserveAspectRatio 属性来指定整个用户坐标系统是否在视口内可见。

**viewBox 语法**

viewBox = \<min-x> \<min-y> \<width> \<height>，比如：viewBox =' 0 0 100 100'

- \<min-x>和\<min-y> 确定视图框的左上角坐标（不是修改用户坐标系的原点，绘图还是从原来的 0, 0 开始）
- \<width> \<height>确定该视图框的宽度和高度。
  - 宽度和高度不必与父\<svg>元素上设置的宽度和高度相同。
  - 宽度和高度负值无效，为 0 是禁用元素的显示。

## **视图框-viewBox-相同的宽高比**

**看一个 viewport 和 viewBox 有相同的宽高比的例子：**

在 viewBox 属性上设置视图框为视口大小的 1/4。

暂时不改变这个视图框左上角，将\<min-x>将\<min-y>设置为零。

视图框的宽度和高度将是视口宽度和高度的 1/4。

**那么，viewbox="0 0 100 100" 具体做什么的呢？**

指定画布可显示的区域，用户坐标系从 (0, 0) 的左上点到 (100, 100) 的点，默认单位是 px。

然后将 SVG 图形绘制到该 viewBox 区域。

viewBox 区域等比例被放大（放大不会失真）以填充整个视口。

用户坐标系映射到视口坐标系，因此——在这种情况下——1 个用户单位等于 4 个视口单位。

在 SVG 画布上绘制的任何内容都将相对于该用户坐标系进行绘制 。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="400" height="400" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50"></circle>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805110038873.png" />

绿色区域是视图框，红色区域是视口，绿色区域画出来的圆会等比例缩放填充到视口中。

## **视图框-viewBox-不同的宽高比**

**在 400\*400 的视口中，viewbox="0 0 200 100" 具体做什么的呢？**

保留视图框 viewBox 的宽高比，但视图框 viewBox 不会拉伸以覆盖整个视口区域。

视图框 viewBox 在视口内垂直和水平居中 。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="400" height="400" viewBox="50 50 100 100">
      <circle cx="50" cy="50" r="50"></circle>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805110616981.png" />

**想改变视口内的视框位置怎么办？**

给\<svg>添加 preserveAspectRatio 属性，该属性允许强制统一缩放视图框 viewBox

- preserveAspectRatio= "none", 强制拉伸图形以填充整个视口。
- preserveAspectRatio= “xMinYMin”, 图形在视口的最小 x 和 y 轴上显示
- ...

将 preserveAspectRatio 设置为 xMinYMin 的效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg
      width="400"
      height="400"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMinYMin"
    >
      <circle cx="50" cy="50" r="50"></circle>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805111023763.png" />

如果改为 none 效果如下：在 y 轴上被拉伸

<img src="../../images/image-20230805111115924.png" />

## **绘制-矩形 ( rect )**

**SVG 的基本形状**

在 SVG 画布中，如果要想插入一个形状，可以在文档中创建一个对应的元素。

不同的元素对应着不同的形状，并且可以使用不同的属性来定义图形的大小和位置。

SVG 所支持的基本形状有：矩形、圆形、椭圆、线条、折线、多边形、路径。

**下面用 SVG 来绘制一个矩形（rect）**

- \<rect>元素会在屏幕上绘制
- \<rect>元素有 6 个基本属性可以控制它在屏幕上的位置和形状。

**\<rect>元素 6 个基本属性**

- x ：矩形左上角的 x 轴位置
- y ：矩形左上角的 y 轴位置
- width ：矩形的宽度
- height ：矩形的高度
- rx ：圆角的 x 轴方位的半径
- y ：圆角的 y 轴方位的半径

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="50"></rect>

      <rect x="100" y="100" width="100" height="50" rx="20" ry="20"></rect>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805130039166.png" />

## **绘制-圆形 ( circle )**

**下面用 SVG 来绘制一个圆形（circle）**

\<circle>元素会在屏幕上绘制一个圆形。

\<circle>元素有 3 个基本属性用来设置圆形。

**\<circle>元素 3 个基本属性**

r ：圆的半径

cx ：圆心的 x 轴位置

cy ：圆心的 y 轴位置

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="50" fill="red"></circle>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805131936974.png" />

## **绘制-椭圆 ( ellipse )**

**下面用 SVG 来绘制一个椭圆（ellipse）**

\<ellipse>元素是 < circle > 元素更通用的形式，它可以分别缩放圆的 x 半径和 y 半径 。

x 半径和 y 半径 ，数学家通常称之为长轴半径和短轴半径

\< ellipse >元素有 4 个基本属性用来设置椭圆。

**\<ellipse>元素 4 个基本属性**

rx :椭圆的 x 轴半径

ry :椭圆的 y 轴半径

cx :椭圆中心的 x 轴位置

cy :椭圆中心的 y 轴位置

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="25" ry="50" fill="red"></ellipse>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805132131108.png" />

## **绘制-线条( line )**

**下面用 SVG 来绘制一条直线（line）**

\<line>元素是绘制直线。它取两个点的位置作为属性，指定这条线的起点和终点位置。

需描边才能显示，不支持填充和 Canvas 线条一样。

\<line >元素有 4 个基本属性用来设置线条。

**\<line>元素 4 个基本属性**

x1 :起点的 x 轴位置

y1 :起点的 y 轴位置

x2 :终点的 x 轴位置

y2 :终点的 y 轴位置

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 
      stroke , 而不是 fill
     -->
      <line
        x1="100"
        y1="100"
        x2="200"
        y2="100"
        stroke="red"
        stroke-width="5"
      ></line>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805132316388.png" />

## **绘制-折线( polyline )**

**下面用 SVG 来绘制一条直线（polyline）**

\<polyline>元素是一组连接在一起的直线。因为它可以有很多的点，折线的的所有点位置都放在一个 points 属性。

默认会填充黑色

\<polyline >元素有 1 个基本属性用来设置折线所有点位置。

**\<polyline>元素 1 个基本属性**

points : 点集数列。每个数字用空白、逗号、终止命令符或者换行符分隔开。

每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。

所以点列表 (0,0), (1,1) 和 (2,2) 可以写成这样：“0 0, 1 1, 2 2”。

支持格式： “0 0, 1 1, 2 2”或 “0 ，0 , 1， 1, 2， 2”或 “0 0 1 1 2 2”

推荐使用“0 0, 1 1, 2 2”，阅读性比较好

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 第1种写法 -->
      <polyline points="20 0, 80 50, 20, 100"></polyline>
      <!-- <polyline
        points="20 0, 80 50, 20, 100"
        fill="transparent"
        stroke="red"
      ></polyline> -->

      <!-- 第2种写法 -->
      <!-- <polyline points="20 0 80 50 20 100"></polyline> -->

      <!-- 第3种写法 -->
      <!-- <polyline points="20 ,0 ,80 ,50 ,20, 100"></polyline> -->
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805132706484.png" />

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 第1种写法 -->
      <!-- <polyline points="20 0, 80 50, 20, 100"></polyline> -->
      <polyline
        points="20 0, 80 50, 20, 100"
        fill="transparent"
        stroke="red"
      ></polyline>

      <!-- 第2种写法 -->
      <!-- <polyline points="20 0 80 50 20 100"></polyline> -->

      <!-- 第3种写法 -->
      <!-- <polyline points="20 ,0 ,80 ,50 ,20, 100"></polyline> -->
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805132559111.png" />

当使用 fill 为 transparent 时，发现折线到最后一个点没有闭合

## **绘制-多边型（polygon）**

**下面用 SVG 来绘制多边形（polygon）**

\<polygon>元素是和折线很像，它们都是由连接一组点集的直线构成。不同的是，< polygon > 的路径在最后一个点处自动

回到第一个点。需要注意的是，矩形也是一种多边形，也可以用多边形创建一个矩形。

默认会填充黑色

< polygon >元素有 1 个基本属性用来设置多边形线所有点位置。

**\<polygon>元素 1 个基本属性**

points :点集数列。每个数字用空白符、逗号、终止命令或者换行符分隔开。

每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。

所以点列表 (0,0), (1,1) 和 (2,2) 推荐写成这样：“0 0, 1 1, 2 2”。

路径绘制完后闭合图形，所以最终的直线将从位置 (2,2) 连接到位置 (0,0)。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="20 0, 80 50, 20 100"
        fill="transparent"
        stroke="red"
      ></polygon>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805133223448.png" />

## **绘制-路径（path）**

**下面用 SVG 来绘制路径（path）**

\<path>元素可能是 SVG 中最常见的形状。你可以用 < path >元素绘制矩形（直角矩形或圆角矩形）、圆形、椭圆、折线形、

多边形，以及一些其他的形状，例如贝塞尔曲线、2 次曲线等曲线。

默认会填充黑色，默认路径不会闭合

< path >元素有 1 个基本属性用来设置路径点的位置。

**\<path>元素 1 个基本属性**

d :一个点集数列，以及其它关于如何绘制路径的信息，必须 M 命令开头。

所以点列表 (0,0), (1,1) 和 (2,2) 推荐写成这样：“M 0 0, 1 1, 2 2”。

支持格式： “M 0 0, 1 1, 2 2”或 “M0 0, 1 1, 2 2” 或 “M 0 ，0 , 1， 1, 2， 2”或 “M 0 0 1 1 2 2”

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 1.使用path 绘制一个三角形 -->
      <!-- <path d="M 20 0, 80 50, 20 100" fill="transparent" stroke="red"></path> -->

      <!-- 1.使用path 绘制一个闭合的三角形 -->
      <!-- <path d="M 20 0, 80 50, 20 100 Z" fill="transparent" stroke="red"></path> -->

      <!-- 1.使用 path 绘图的命令:
      M  moveTo
      Z  close path
      L  lineTo  L可以省略
    -->
      <path
        d="M 20 0,L 80 50,L 20 100 Z"
        fill="transparent"
        stroke="red"
      ></path>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805133711476.png" />

## **SVG 路径 和 命令**

**SVG 路径（path） 和 命名**

\<path>元素是 SVG 基本形状中最强大的一个。 你可以用它创建线条，曲线，弧形等等。

\<path> 元素的形状是通过属性 d 定义的，属性 d 的值是一个 “命令 + 参数 ”的序列。

每一个命令都用一个关键字母来表示，比如，字母“M”表示的是“Move to”命令，当解析器读到这个命令时，它就知道你是打算

移动到某个点。跟在命令字母后面的，是你需要移动到的那个点的 x 和 y 轴坐标。比如移动到 (10,10) 这个点的命令，应该写成“M

10 10”命令。这一段字符结束后，解析器就会去读下一段命令。每一个命令都有两种表示方式，一种是用大写字母，表示采用绝对

定位。另一种是用小写字母，表示采用相对定位（例如：从上一个点开始，向上移动 10px，向左移动 7px）。

属性 d 采用的是用户坐标系统，**不需标明单位**。

**d 属性值支持的命令**

直线命令

- M / m：Move To
- L / l ：Line To
- Z / z：Close Path
- H / h：horizontal
- V / v：vertical

曲线命令

- C ：三次贝塞尔曲线
- S：简写三次贝塞尔曲线
- Q：二次贝塞尔曲线
- T：简写二次贝塞尔曲线

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 0,L 80 50,l 20 50 Z" fill="transparent" stroke="red"></path>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805134157107.png" />

## **绘制-图片**

**在 SVG 中绘制一张图片**

在\<image>元素的 href 属性引入图片 URL

<img src="../../images/image-20230805142240653.png" />

**注意事项**

image 元素没设置 x , y 值，它们自动被设置为 0。

image 元素没设置 height 、width 时，默认为图片大小。

width 、height 等于 0，将不会呈现这个图像。

需在 href 属性上引用外部的图像，不是 src 属性。

href 属性兼容性： https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href#browser_compatibility

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <!-- svg 2.0版本的语法 -->
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <image
        x="0"
        y="0"
        href="../images/googlelogo_color_92x30dp.png"
        width="100"
        height="100"
      ></image>
    </svg>

    <!-- svg 1.0版本的语法 -->
    <svg
      version="1.0"
      baseProfile="full"
      width="300"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <image
        x="0"
        y="0"
        xlink:href="../images/googlelogo_color_92x30dp.png"
        width="100"
        height="100"
      ></image>
    </svg>

    <!-- svg 2.0 + 1.0 版本的语法( 为了兼容以前的浏览器的写法 ) -->
    <svg
      version="1.0"
      baseProfile="full"
      width="300"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <image
        x="0"
        y="0"
        xlink:href="../images/googlelogo_color_92x30dp.png"
        href="../images/googlelogo_color_92x30dp.png"
        width="100"
        height="100"
      ></image>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805142424324.png" />

## **绘制-文字**

**下面我们来看一下如何在 SVG 画布中绘制文字。**

\<text>元素是用来在 SVG 画布中绘制文字用的。

**\<text>元素的基本属性**

x 和 y 属性决定了文本在用户坐标系中显示的位置。

text-anchor 文本流方向属性，可以有 start、middle、end 或 inherit 值，默认值 start

dominant-baseline 基线对齐属性 : 有 auto 、middle 或 hanging 值, 默认值：auto

<img src="../../images/image-20230805143457740.png" />

**\<text>元素的字体属性**

文本的一个至关重要的部分是它显示的字体。SVG 提供了一些属性，类似于 CSS 。下列的属性可以被设置为一个 SVG 属性或一个 CSS 属性：

font-family、font-style、font-weight、font-variant、font-stretch、font-size、font-size-adjust、kerning、letter-spacing、word-spacing 和 text-decoration。

fill 可以写在样式 style 里面，也可以写在 text 元素的属性上

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }

      /* text{
      fill: red;
    } */
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 1.在svg中绘制一个文字 -->
      <!-- <text x="100" y="100" font-size="50" fill="red">Ay</text> -->

      <!-- 2.文本的对齐方式 -->
      <!-- <text x="100" y="100" text-anchor="middle"  font-size="50" fill="red">Ay</text> -->

      <!-- 3.基线对齐方式 :
      有 auto 、middle 或 hanging 值, 默认值：auto
    -->
      <text
        x="100"
        y="100"
        dominant-baseline="middle"
        font-size="50"
        fill="red"
      >
        Ay
      </text>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805143730560.png" />

**其它文本相关的元素：**

**\<tspan>** 元素用来标记大块文本的子部分，它必须是一个 text 元素或别的 tspan 元素的子元素。

x 和 y 属性决定了文本在视口坐标系中显示的位置。

alignment-baseline 基线对齐属性：auto 、baseline、middle、hanging、top、bottom ... ,默认是 auto

![image-20230805143642983](../../images/image-20230805143642983.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }

      /* text{
      fill: red;
    } */
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 1.在svg中绘制一个文字 -->
      <text x="40" y="100" font-size="20">
        iPhone14
        <tspan fill="red">¥100</tspan>
      </text>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805143801168.png" />

## **元素的组合（g）**

**元素的组合**

\<g>元素是用来组合元素的容器。

添加到 g 元素上的变换会应用到其所有的子元素上。

添加到 g 元素的属性大部分会被其所有的子元素继承。

g 元素也可以用来定义复杂的对象，之后可以通过\<use>元素来引用它们

**\<g>元素的属性（该元素只包含全局属性）**

核心属性：id

样式属性：class 、style

Presentation Attributes（也可说是 CSS 属性，这些属性可写在 CSS 中，也可作为元素的属性用）：

- cursor, display, fill, fill-opacity, opacity,…
- stroke, stroke-dasharray, stroke-dashoffset, stroke-linecap, stroke-linejoin
- 更多表示属性：https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation

事件属性：onchange, onclick, ondblclick, ondrag…

动画属性：transform

更多：https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- <circle cx="50" cy="50" r="25" fill="transparent" stroke="red"></circle>
    <circle cx="80" cy="50" r="25" fill="transparent" stroke="red"></circle>
    <circle cx="110" cy="50" r="25" fill="transparent" stroke="red"></circle>
    <circle cx="140" cy="50" r="25" fill="transparent" stroke="red"></circle> -->

      <!-- 
      g 元素没有专有的属性,只有全局的属性
      全局属性:id  class  style fill stroke onclick
     -->
      <g fill="transparent" stroke="red">
        <circle cx="50" cy="50" r="25"></circle>
        <circle cx="80" cy="50" r="25"></circle>
        <circle cx="110" cy="50" r="25"></circle>
        <circle cx="140" cy="50" r="25"></circle>
      </g>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805150121544.png" />

## **图形元素的复用（defs）**

**SVG 是允许我们定义一些可复用元素的。**

即把可复用的元素定义在< defs >元素里面，然后通过\<use>元素来引用和显示。

这样可以增加 SVG 内容的易读性、复用性和利于无障碍开发。

**< defs >元素，定义可复用元素。**

例如：定义基本图形、组合图形、渐变、滤镜、样式等等。

在< defs >元素中定义的图形元素是不会直接显示的。

可在视口任意地方用\<use>来呈现在 defs 中定义的元素。

\<defs>元素没有专有属性，使用时通常也不需添加任何属性。

\<defs>定义的元素的坐标系参照哪个？用户坐标系

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 0.样式 -->
        <style>
          rect {
            fill: green;
          }
        </style>
        <!-- 1.定义了一个矩形 -->
        <rect id="rectangle" x="0" y="0" width="100" height="50"></rect>

        <!-- 2.定义了一个组合图形 -->
        <g fill="transparent" stroke="red">
          <circle cx="50" cy="50" r="25"></circle>
          <circle cx="80" cy="50" r="25"></circle>
          <circle cx="110" cy="50" r="25"></circle>
          <circle cx="140" cy="50" r="25"></circle>
        </g>
        <!-- 定义渐变 -->
        <!-- 滤镜 -->
      </defs>

      <!-- 在这里进行图形的复用 -->
    </svg>
  </body>
</html>
```

## **引入元素（use）**

**\<use>元素从 SVG 文档中获取节点，并将获取到的节点复制到指定的地方。**

\<use>等同于深度克隆 DOM 节点，克隆到 use 元素所在的位置。

克隆的节点是不可见的，当给\<use>元素应用 CSS 样式时须小心。因为克隆的 DOM 不能保证都会继承 \<use>元素上的 CSS

属性，但是 CSS 可继承的属性是会继承的。

**\<use>元素的属性**

href： 需要复制元素/片段的 URL 或 ID（支持跨 SVG 引用）。默认值：无

xlink:href：（SVG2.0 已弃用）需要复制的元素/片段的 URL 或 ID 。默认值：无

x / y ：元素的 x / y 坐标（相对复制元素的位置）。 默认值：0

width / height ：元素的宽和高（在引入 svg 或 symbol 元素才起作用）。 默认值：0

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 0.样式 -->
        <style>
          rect {
            fill: green;
          }
        </style>
        <!-- 1.定义了一个矩形 -->
        <rect id="rectangle" x="0" y="0" width="100" height="50"></rect>

        <!-- 2.定义了一个组合图形 -->
        <g id="logo" fill="transparent" stroke="red">
          <circle cx="50" cy="50" r="25"></circle>
          <circle cx="80" cy="50" r="25"></circle>
          <circle cx="110" cy="50" r="25"></circle>
          <circle cx="140" cy="50" r="25"></circle>
        </g>
        <!-- 定义渐变 -->
        <!-- 滤镜 -->
      </defs>

      <!-- 在这里进行图形的复用 -->
      <!-- <use href="#rectangle"></use> -->
      <!-- <use x="100" y="100"  href="#rectangle"></use> -->

      <!-- <use href="#logo"></use> -->
      <!-- <use x="100" y="100" href="#logo"></use> -->
    </svg>

    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 
      它的宽和高是没有生效的 ????  只用use引用的图形是 svg 或 symbol 才会起作用
     -->
      <use href="#rectangle" width="200" height="100"></use>
    </svg>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <use href="#logo"></use>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805150819769.png" />

## **图形元素复用（symbols）**

**\<symbol>元素和\<defs>元素类似，也是用于定义可复用元素，然后通过\<use>元素来引用显示。**

在\<symbol>元素中定义的图形元素默认也是不会显示在界面上。

\<symbol>元素常见的应用场景是用来定义各种小图标，比如：icon、logo、徽章等

**\<symbol>元素的属性**

viewBox：定义当前 \<symbol> 的视图框。

x / y ：symbol 元素的 x / y 坐标。 ；默认值：0

width / height：symbol 元素的宽度。 默认值：0

**\<symbol>和\<defs> 的区别**

\<defs>元素没有专有属性，而\<symbol>元素提供了更多的属性

比如： viewBox、 preserveAspectRatio 、x、y、width、height 等。

\<symbol>元素有自己用户坐标系，可以用于制作 SVG 精灵图。

\<symbol>元素定义的图形增加了结构和语义性，提高文档的可访问性。

**SVG ICON 文件-合并成 SVG 精灵图：**https://www.zhangxinxu.com/sp/svgo

没有使用 symbol

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 80 0,L 20 50, L 80 100 Z"></path>
    </svg>

    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20 0, 80 50, 20 100"></polygon>
    </svg>
  </body>
</html>
```

![image-20230805152214372](../../images/image-20230805152214372.png)

使用 symbol

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 1.ICON previous-->
      <symbol id="previous" viewBox="0 0 100 100">
        <path fill="currentColor" d="M 80 0,L 20 50, L 80 100 Z"></path>
      </symbol>

      <!-- 2.ICON next -->
      <symbol id="next" viewBox="0 0 100 100">
        <polygon points="20 0, 80 50, 20 100"></polygon>
      </symbol>

      <!-- 复用 -->
      <!-- <use href="#previous" width="100" height="100"></use> -->
    </svg>

    <!-- 复用 -->
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 直接在use上指定ICON的 width和 hegiht -->
      <use href="#previous" width="50" height="50"></use>
    </svg>

    <!-- 这个属于缩小 -->
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <use href="#previous"></use>
    </svg>

    <!-- 属于放大 -->
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <use href="#previous"></use>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805152643093.png" />

SVG 制作精灵图

首先，去阿里图标的官网去下载 svg

第二步，来到https://www.zhangxinxu.com/sp/svgo/这个网址，将下载好的svg拖拽进去

这样就能拿到 svg 的代码了，复制精灵图的代码，如下红色框所示

![image-20230805154239191](../../images/image-20230805154239191.png)

不过代码格式有点乱，百度搜索在线 xml 格式化，将上面的代码放进去

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
    <!-- 这就是一张SVG精灵图: App.vue 的template中 -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;">
      <symbol id="music" viewBox="0 0 1024 1024">
        <path
          fill="#d81e06"
          d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-992a480 480 0 1 0 480 480A480 480 0 0 0 512 32zm128 640a80 80 0 1 1 48-143.634V416l-224 64v192h-1.61A80.549 80.549 0 1 1 432 592.366V384a32 32 0 0 1 32-32l224-64a32 32 0 0 1 32 32v288h-1.61A80.018 80.018 0 0 1 640 672zm-256-64a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm304-288l-224 64v64l224-64v-64zm-48 224a48 48 0 1 0 48 48 48 48 0 0 0-48-48z"
        />
      </symbol>
      <symbol id="music_1" viewBox="0 0 1024 1024">
        <path
          fill="#d81e06"
          d="M512 56.89c251.351 0 455.11 203.759 455.11 455.11S763.352 967.11 512 967.11 56.89 763.352 56.89 512 260.648 56.89 512 56.89zm30.037 170.665h-3.185c-13.767 0-24.576 10.468-26.226 23.666-.057.683-.285 1.195-.341 1.878-.058.455-.285.853-.285 1.308v341.618c-14.962-7.964-31.687-12.914-49.778-12.914h-71.111c-58.88 0-106.666 47.787-106.666 106.667S332.23 796.445 391.11 796.445h71.111c58.88 0 106.667-47.787 106.667-106.667 0-2.447-.569-4.722-.74-7.111h.74V305.265l76.345 44.089a28.327 28.327 0 0 0 14.165 3.811c9.842 0 19.4-5.12 24.633-14.222 7.907-13.597 3.243-31.005-10.354-38.912l-116.451-67.186c-4.38-3.072-9.387-5.29-15.19-5.29zM462.223 640c27.42 0 49.777 22.357 49.777 49.778s-22.357 49.777-49.778 49.777h-71.111c-27.42 0-49.777-22.357-49.777-49.776 0-27.422 22.357-49.779 49.777-49.779h71.111z"
        />
      </symbol>
      <symbol id="shouye" viewBox="0 0 1024 1024">
        <path
          fill="#d81e06"
          d="M981.638 396.91c-.5-.64-1.057-1.196-1.613-1.78L638.747 62.002C605.173 22.225 560.25.362 512.1.362h-.14c-48.26.027-93.267 22.002-126.842 61.946L43.73 394.824a33.308 33.308 0 0 0-1.67 1.78C-5.504 453.822 2.674 495.046 11.77 514.545c9.123 19.5 35.549 52.211 109.93 52.211h38.47v433.962c0 12.85 10.375 23.254 23.198 23.254h654.684c12.823 0 23.198-10.403 23.198-23.254v-430.15c0-12.824-10.375-23.227-23.198-23.227-12.824 0-23.2 10.403-23.2 23.226v406.924H679.249c.139-1.112.64-2.086.64-3.226V756.88c0-90.069-53.547-152.961-130.236-152.961h-75.744c-71.794 0-130.18 58.47-130.18 130.319v240.027c0 1.14.473 2.114.64 3.226H206.566V543.53c0-12.851-10.376-23.255-23.199-23.255H121.7c-35.049 0-60.445-9.513-67.9-25.452-7.343-15.744 1.307-40.945 23.171-67.565l341.333-332.46c.584-.584 1.14-1.168 1.641-1.808 24.73-29.736 57.413-46.147 92.072-46.175h.084c34.52 0 67.148 16.3 91.821 45.924.5.585 1.057 1.197 1.614 1.753l341.194 333.072c21.891 26.62 30.598 51.766 23.282 67.399-7.427 15.855-32.768 25.312-67.844 25.312-12.823 0-23.199 10.404-23.199 23.255 0 12.823 10.376 23.226 23.2 23.226 74.408 0 100.75-32.628 109.873-52.072 9.068-19.443 17.219-60.584-30.403-117.774zM390.125 974.265V734.238c0-46.23 37.58-83.838 83.783-83.838h75.744c50.152 0 83.838 42.781 83.838 106.48v217.385c0 1.14.5 2.114.667 3.226h-244.7c.168-1.112.668-2.086.668-3.226z"
        />
      </symbol>
      <symbol id="touxiang-kong" viewBox="0 0 1024 1024">
        <path
          fill="#d81e06"
          d="M512 134.092c-208.758 0-377.908 169.15-377.908 377.908S303.242 889.908 512 889.908 889.908 720.758 889.908 512 720.758 134.092 512 134.092zm0 31.432c190.952 0 346.476 155.342 346.476 346.476 0 84.484-30.342 161.883-80.669 222.02-36.337-14.898-119.731-43.786-168.786-58.32-4.36-1.272-4.906-1.636-4.906-19.441 0-14.717 5.996-29.615 11.991-42.333 6.541-13.626 13.99-36.7 16.715-57.413 7.631-8.902 18.17-26.344 24.71-59.775 5.814-29.433 3.088-40.152-.727-50.145-.363-1.09-.908-2.18-1.09-3.089-1.454-6.904.545-42.696 5.632-70.494 3.452-19.077-.908-59.593-27.071-93.205-16.534-21.258-48.329-47.239-106.287-50.872h-31.795c-57.05 3.633-88.663 29.614-105.378 50.872-26.344 33.612-30.705 74.128-27.253 93.205 5.087 27.798 7.086 63.59 5.632 70.494-.363 1.272-.726 2.18-1.09 3.27-3.815 9.993-6.722 20.713-.726 50.146 6.722 33.43 17.078 50.872 24.709 59.775 2.725 20.712 10.356 43.605 16.715 57.413 4.724 9.993 6.904 23.619 6.904 42.878 0 17.987-.727 18.168-4.724 19.44-51.054 15.08-131.904 44.15-164.244 58.14-50.69-60.32-81.214-137.9-81.214-222.566 0-190.952 155.524-346.476 346.476-346.476z"
        />
      </symbol>
      <symbol id="Video" viewBox="0 0 1024 1024">
        <path
          fill="#d81e06"
          d="M39.385 1024V0h945.23v1024H39.385zM196.923 78.77h-78.77v78.768h78.77V78.77zm0 157.538h-78.77v78.769h78.77v-78.77zm0 157.538h-78.77v78.77h78.77v-78.77zm0 157.539h-78.77v78.769h78.77v-78.77zm0 157.538h-78.77v78.77h78.77v-78.77zm0 157.539h-78.77v78.769h78.77v-78.77zM748.308 78.769H275.692v393.846h472.616V78.77zm0 472.616H275.692V945.23h472.616V551.385zM905.846 78.769h-78.77v78.77h78.77v-78.77zm0 157.539h-78.77v78.769h78.77v-78.77zm0 157.538h-78.77v78.77h78.77v-78.77zm0 157.539h-78.77v78.769h78.77v-78.77zm0 157.538h-78.77v78.77h78.77v-78.77zm0 157.539h-78.77v78.769h78.77v-78.77z"
        />
      </symbol>
      <symbol id="video_1" viewBox="0 0 1024 1024">
        <path
          fill="#d81e06"
          d="M239.787 393.813c97.393 0 176.611-79.203 176.611-176.583S337.18 40.633 239.787 40.633c-97.366 0-176.583 79.218-176.583 176.597 0 97.38 79.203 176.583 176.583 176.583zm0-296.291c66.02 0 119.722 53.703 119.722 119.708s-53.703 119.694-119.722 119.694c-66.006 0-119.695-53.688-119.695-119.694 0-66.02 53.69-119.708 119.695-119.708z"
        />
        <path
          fill="#d81e06"
          d="M175.716 217.244l-.072-3.797c-.056-1.621-.056-1.621.3-3.484a14.25 14.25 0 0 0-11.293-16.655 14.308 14.308 0 0 0-16.655 11.293 36.978 36.978 0 0 0-.796 9.785l.057 2.844a14.236 14.236 0 0 0 28.459.014zm-1.024-29.354a14.194 14.194 0 0 0 11.832-6.315 64.014 64.014 0 0 1 53.263-28.444 14.222 14.222 0 1 0 0-28.445 92.43 92.43 0 0 0-76.9 41.06 14.236 14.236 0 0 0 11.805 22.144zm463.303 205.923c97.408 0 176.611-79.203 176.611-176.583S735.403 40.633 637.995 40.633c-97.366 0-176.583 79.218-176.583 176.597.014 97.38 79.232 176.583 176.583 176.583zm0-296.291c66.033 0 119.722 53.703 119.722 119.708s-53.689 119.694-119.722 119.694c-66.006 0-119.695-53.688-119.695-119.694.015-66.02 53.704-119.708 119.695-119.708z"
        />
        <path
          fill="#d81e06"
          d="M572.914 187.89a14.194 14.194 0 0 0 11.833-6.315 64 64 0 0 1 53.248-28.444 14.2 14.2 0 0 0 14.222-14.223 14.2 14.2 0 0 0-14.222-14.222 92.402 92.402 0 0 0-76.886 41.06 14.222 14.222 0 0 0 11.805 22.144zm406.343 268.956c-9.316-9.529-20.935-14.634-35.086-14.634-11.506 0-23.908 3.086-38.97 10.368a18042.596 18042.596 0 0 1-150.499 79.317l.697-10.667c.057-.697.085-2.787.085-3.498 0-55.34-44.23-103.254-98.588-103.254H128.711c-53.447 0-100.28 52.566-100.28 107.933v371.74c0 53.262 44.998 89.202 100.28 89.202h528.185c54.84 0 97.835-39.069 98.532-92.715-.015.057-.015.128-.029.029L753.92 867c37.788 18.944 96.498 49.38 150.94 78.051 1.55.825 2.973 1.536 4.665 2.077 14.806 4.551 26.596 7.68 37.96 7.751 20.266-.156 32.568-10.07 38.542-18.332 7.082-9.771 9.529-22.415 9.529-39.524v-384.17c0-11.336 1.45-38.002-16.3-56.008zm-38.898 439.566c-3.968-.938-8.206-2.26-11.164-3.171C737.877 792.519 731.22 792.348 722.773 792.348c-7.836 0-15.331 2.873-20.721 8.59-5.362 5.69-8.136 12.644-7.666 20.466l4.195 68.78c-.412 22.03-18.588 36.28-41.7 36.28h-528.17c-24.15 0-43.392-10.24-43.392-32.313v-371.74c0-24.093 21.177-51.044 43.392-51.044v-.014h528.185c22.315 0 41.202 22.3 41.685 45.468l-4.167 61.426a28.565 28.565 0 0 0 7.538 21.419 28.52 28.52 0 0 0 20.836 9.06c9.272 0 11.747-.03 208.17-105.089 3.883-1.877 6.827-2.958 8.96-3.584.342 2.546.57 6.287.484 11.876l-.043 384.483z"
        />
        <path
          fill="#d81e06"
          d="M755.413 890.652l.043-.867c0 .299-.043.583-.043.867zm192.498 64.27l-.427-.028-.44.029h.867zm-192.455-65.137l.014-.327-.014.327zM286.123 499.797H165.319c-28.544 0-51.555 35.2-51.555 61.511v72.278a14.222 14.222 0 1 0 28.444-.014v-72.278c0-13.24 12.715-33.038 23.111-33.038h120.804a14.222 14.222 0 1 0 0-28.459zm71.11.015h-14.221a14.222 14.222 0 1 0 0 28.444h14.222a14.222 14.222 0 1 0 0-28.444z"
        />
      </symbol>
    </svg>

    <!-- Vue 某个子组件 -->
    <svg width="50" height="50">
      <use href="#music"></use>
    </svg>
    <svg width="30" height="30">
      <use href="#music"></use>
    </svg>

    <svg width="30" height="30">
      <use href="#music_1"></use>
    </svg>

    <svg width="100" height="100">
      <use href="#shouye"></use>
    </svg>

    <svg width="400" height="400">
      <use href="#shouye"></use>
    </svg>
  </body>
</html>
```

## **填充和描边**

**如果想要给 SVG 中的元素上色，一般有两种方案可以实现：**

第一种：直接使用元素的属性，比如：填充（fill）属性、描边（stroke）属性等。

第二种：直接编写 CSS 样式，因为 SVG 也是 HTML 中的元素，也支持用 CSS 的方式来编写样式。

**第一种：直接使用元素的属性（填充和描边）**

在 SVG 中，绝大多数元素的上色都可通过 fill 和 stroke 两个属性来搞定。

- fill 属性：设置对象填充颜色。支持：颜色名、十六进制值、rgb、 rgba 。
- stroke 属性：设置绘制对象的边框颜色。支持：颜色名、十六进制值、rgb、 rgba 。

## **第一种：填充属性（fill）**

**fill 填充属性，专门用来给 SVG 中的元素填充颜色。**

fill =“color”。支持：颜色名、十六进制值、rgb、 rgba 、 currentColor （继承自身或父亲字体 color）。

**控制填充色的不透明**

fill-opacity = ”number ”， 该属性专门用来控制填充色的不透明，值为 0 到 1。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
        color: green;
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- <style>
        rect{
          color: red;
        }
      </style> -->
      </defs>

      <!-- 基本的使用 -->
      <!-- <rect x="10" y="10" width="100" height="100" 
     fill="red"
     fill-opacity="0.4"
    ></rect> -->

      <rect x="10" y="10" width="100" height="100" fill="currentColor"></rect>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805180950224.png" />

## **第一种：描边属性（stroke）**

**stroke 描边属性**

stroke = “color”： 指定元素边框填充颜色。

stroke-opacity = “number”：控制元素边框填充颜色的透明度。

stroke-width = “number”：指定边框的宽度。注意，边框是以路径为中心线绘制的。

stroke-linecap =“butt | square | round”：控制边框端点的样式。

stroke-linejoin = “miter | round | bevel”:控制两条线段连接处样式

stroke-dasharray =“number [, number , ….]”: 将虚线类型应用在边框上。

该值必须是用逗号分割的数字组成的数列，空格会被忽略。比如 3，5

- 第一个表示填色区域长度为 3
- 第二个表示非填色区域长度为 5

stroke-dashoffset：指定在 dasharray 模式下路径的偏移量。

值为 number 类型，除了可以正值，也可以取负值。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        fill="transparent"
        stroke="red"
        stroke-width="3"
        stroke-opacity="1"
      ></rect>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805181336098.png" />

stroke-linecap

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 
      stroke , 而不是 fill
     -->
      <line
        x1="100"
        y1="100"
        x2="200"
        y2="100"
        stroke="red"
        stroke-width="5"
        stroke-linecap="round"
      ></line>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805181436676.png" />

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 
      stroke , 而不是 fill
     -->
      <line
        x1="100"
        y1="100"
        x2="200"
        y2="100"
        stroke="red"
        stroke-width="5"
        stroke-linecap="round"
      ></line>

      <polyline
        points="20 0, 80 50, 20 100"
        stroke="red"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="transparent"
      ></polyline>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805181935136.png" />

stroke-dasharray

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 
      stroke , 而不是 fill
     -->
      <line
        x1="100"
        y1="80"
        x2="200"
        y2="80"
        stroke="red"
        stroke-width="10"
        stroke-dasharray="20, 10, 5"
      ></line>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805182316848.png" />

stroke-dashoffset

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }
      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 
      stroke , 而不是 fill dashoffset = 10向左偏移10px
     -->
      <line
        x1="100"
        y1="80"
        x2="200"
        y2="80"
        stroke="red"
        stroke-width="10"
        stroke-dasharray="100"
        stroke-dashoffset="10"
      ></line>
    </svg>
  </body>
</html>
```

<img src="../../images/image-20230805182419978.png" />

## **第二种：CSS 样式**

**直接编写 CSS 样式实现填充和描边**

除了定义元素的属性外，你也可以通过 CSS 来实现填充和描边（CSS 样式可写在 defs 中，也可写在 HTML 头部或外部等）。

语法和 HTML 里使用 CSS 一样，需要注意的是：需要把 background-color、border 改成 fill 和 stroke

不是所有的属性都能用 CSS 来设置，上色和填充的部分是可以用 CSS 来设置。

比如，fill，stroke，stroke-dasharray 等可以用 CSS 设置；比如，路径的命令则不能用 CSS 设置。

**哪些属性可以使用 CSS 设置，哪些不能呢？**

SVG 规范中将属性区分成 Presentation Attributes 和 Attributes 属性。

- Presentation Attributes 属性( 支持 CSS 和元素用 )：https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation
- Attributes 属性（只能在元素用）： https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
- 提示：这些属性是不需要去记的，用多了就记住了，在忘记时测试一下就知道了。

**CSS 给 SVG 中的元素填充、描边和上色，支持如下 4 种编写方式：**

方式一：内联（行内） CSS 样式，写在元素的 style 属性上

方式二：内嵌（内部） CSS 样式，写在 \<defs>中的 \<style>标签中

方式三：内嵌（内部） CSS 样式，写在\<head>中的\<style>标签中

方式四：外部 CSS 样式文件，写在 .css 文件中

**CSS 样式优先级别：**内联的 style > defs 中的 style > 外部 / head 内部 > 属性 fill

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
        color: green;
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <!-- 1.行内的样式 -->
      <rect x="10" y="10" width="100" height="100" style="fill:red;"></rect>
    </svg>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
        color: green;
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 1.行内的样式 -->
        <style>
          .rectangle {
            fill: green;
            stroke: red;
          }
        </style>
      </defs>

      <rect class="rectangle" x="10" y="10" width="100" height="100"></rect>
    </svg>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
        color: green;
      }

      /* 1.行内的样式 */
      .rectangle {
        fill: blue;
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect class="rectangle" x="10" y="10" width="100" height="100"></rect>
    </svg>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
        color: green;
      }
    </style>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect class="rectangle" x="10" y="10" width="100" height="100"></rect>
    </svg>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      ul {
        margin: 0;
        padding: 0;
      }

      body {
        background-image: url(../images/grid.png);
      }
      svg {
        background-color: rgba(255, 0, 0, 0.1);
        color: green;
      }

      /* 1.行内的样式 */
      .rectangle {
        fill: blue;
      }
    </style>
  </head>
  <body>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 1.行内的样式 -->
        <style>
          .rectangle {
            fill: green;
          }
        </style>
      </defs>

      <!-- 1.行内的样式 -->
      <!-- <rect class="rectangle" x="10" y="10" width="100" height="100"
     style="fill:red;"
    ></rect> -->

      <rect
        class="rectangle"
        x="10"
        y="10"
        width="100"
        height="100"
        fill="pink"
      ></rect>
    </svg>
  </body>
</html>
```
