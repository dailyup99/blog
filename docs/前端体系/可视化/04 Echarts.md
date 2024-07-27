---
outline: deep
---

## **认识ECharts**

**什么是Echarts：**

ECharts （全称 EnterpriseCharts ）是企业级数据图表。官方的解释是：一个基于 JavaScript 的开源可视化图表库。

ECharts可以流畅的运行在PC和移动设备上，兼容当前绝大部分浏览器（IE6/7/8/9/10/11，chrome，firefox，Safari等）。

ECharts底层依赖轻量级的ZRender图形库，可提供直观，生动，可交互，可高度个性化定制的数据可视化图表。

**ECharts的历史：**

ECharts由百度团队开源

2018年初，捐赠给Apache基金会，成为Apache软件基金会孵化级项目。

2021年1月26日晚，Apache基金会官方宣布 ECharts 项目正式毕业，成为Apache顶级项目。

2021年1月28日，ECharts5 线上发布会举行

## **ECharts应用场景**

智慧城市、园区、航运、公安、机房、监所、电力、物业、应急管理等多个领域的数据可视化展示。

![image-20240503135400899](http://139.196.79.103:9001/myimages/imgs/image-20240503135400899.png)

## **ECharts 的特点**

丰富的图表类型

提供开箱即用的 20 多种图表和十几种组件，并且支持各种图表以及组件的任意组合；

强劲的渲染引擎

Canvas、SVG 双引擎一键切换，增量渲染等技术实现千万级数据的流畅交互；

简单易容，上手容易

直接通过编写配置，便可以生成各种图表，并且支持多种集成方式；

活跃的社区

活跃的社区用户保证了项目的健康发展，也贡献了丰富的第三方插件满足不同场景的需求；

## **初体验ECharts**

**集成 Echarts 的常见方式：**

1.通过 npm 获取 echarts：

```json
npm install echarts --save
```

2.通过 jsDelivr 等 CDN 引入

**初体验Echarts（容器必须设高度）**

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
  
  <!-- 4.ECharts 的容器( 必须要有高度,宽度是可选的 ) -->
  <div id="main" style="height: 400px"></div>

  <!-- 
    window.echarts = 
   -->
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
       // 1.基于准备好的dom，初始化 echarts实例
       var myChart = echarts.init(document.getElementById('main'));

      // 2.指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
          // ...
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 3.使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    }
  </script>
</body>
</html>
```

精简版

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **ECharts 渲染原理**

浏览器端的图表库大多会选择 SVG 或者 Canvas 进行渲染。

ECharts 最开始时一直都是使用 Canvas 绘制图表。直到 ECharts v4.0 版本，才发布支持 SVG 渲染器。

SVG 和 Canvas 这两种使用方式在技术上是有很大的差异的，EChart能够做到同时支持，主要归功于 ECharts 底层库 ZRender 的抽象和实现。

ZRender 是二维轻量级的绘图引擎，它提供 Canvas、SVG、VML 等多种渲染方式。

因此，Echarts 可以轻松的互换SVG 渲染器 和 Canvas 渲染器。切换渲染器只须在初始化图表时设置 renderer 参数 为canvas或svg即可。

## **选择哪种渲染器**

Canvas 更适合绘制图形元素数量较多的图表。如，热力图、炫光尾迹特效、地理坐标系、平行坐标系上的大规模线图等。

SVG 具有重要的优势：它的内存占用更低、适配性、扩展性性好，放大缩小图表不会模糊。

选择哪种渲染器？ 可以根据软硬件环境、数据量、功能需求综合考虑：

* 在软硬件环境较好，数据量不大的场景下，两种渲染器都可以适用，并不需要太多纠结。

* 在软硬件环境较差，出现性能问题需要优化的场景下，可以通过试验来确定使用哪种渲染器。比如有这些经验：

  * 在需要创建很多 ECharts 实例且浏览器易崩溃的情况下（可能因为 Canvas 数量多导致内存占用超出手机承受能力），可

    以使用 SVG 渲染器来进行改善。

  * 数据量较大（经验判断 > 1k）、较多交互时，建议选择 Canvas 渲染器。

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      // 切换为svg的渲染器( 默认是canvas )
      let myChart = echarts.init(document.getElementById('main'), null, { renderer: 'svg' });
      let option = {
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **认识option配置项( 组件 )**

backgroundColor ：设置直角坐标系内绘图区域的背景

grid 选项 ：直角坐标系内绘图区域

yAxis 选项 ：直角坐标系 grid 中的 y 轴

xAxis 选项 ：直角坐标系 grid 中的 x 轴

title **：**图表的标题

legend：图例，展现了不同系列的标记、颜色和名字

tooltip：提示框

toolbox：工具栏，提供操作图表的工具

series：系列，配置系列图表的类型和图形信息数据

visualMap：视觉映射，可以将数据值映射到图形的形状、大小、颜色等

geo：地理坐标系组件。用于地图的绘制，支持在地理坐标系上绘制散点图，线集。

![image-20240503141310175](http://139.196.79.103:9001/myimages/imgs/image-20240503141310175.png)

![image-20240503141324325](http://139.196.79.103:9001/myimages/imgs/image-20240503141324325.png)

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **Grid网格配置 （组件）**

**grid 选项 ：**直角坐标系内绘图区域

show : 是否显示直角坐标系网格。 boolean类型。

left、right、top、bottom： grid 组件离容器左右上下的距离。 string | number类型。

containLabel：grid 区域是否包含坐标轴的刻度标签。 boolean类型。

backgroundColor： Color类型，网格背景色，默认透明。

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        // ECharts的背景
        backgroundColor: 'rgba(255, 0, 0, 0.1)',

        // grid 网格组件( 绘图区域 )
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          // top: 0,
          // bottom: 0,
          left: 0,
          // right: 0,
          containLabel: false,
        },

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **坐标系配置（组件）**

**xAxis 选项 ：**直角坐标系 grid 中的 x 轴

* show 是否显示 x 轴。 : boolean 类型。
* name：坐标轴名称。
* type ： 坐标轴类型。 string 类型。
  * value 数值轴，适用于连续数据。
  * category 类目轴，适用于离散的类目数据。类目数据可来源 xAxis.data 、series.data 或 dataset.source 之一 。
* data：类目数据，在类目轴（type: 'category'）中有效。 array 类型
* axisLine： 坐标轴轴线相关设置。 object 类型
* axisTick：坐标轴刻度相关设置。 object 类型
* axisLabel：坐标轴刻度标签的相关设置。 object 类型
* splitLine：坐标轴在 grid 区域中的分隔线。 object 类型
* ...

 

**yAxis 选项 ：**直角坐标系 grid 中的 y 轴，参数基本和 xAxis 差不多。

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          show: true,
          name: "类目坐标",

          type: "category", // 类目坐标才有data选项  
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        
          axisLine: { // 坐标轴轴线相关设置。
            show: true,
            lineStyle: {
              color: "red",
              width: 3,
            },
          },

          axisLabel: { // 坐标轴刻度标签的相关设置。
            show: true,
            color: "green",
            fontSize: 16,
          },

          axisTick: {  // 坐标轴刻度相关设置。
            show: true,
            length: 10,
            lineStyle: {
              color: "blue",
              width: 3,
            },
          },

          splitLine: { // 坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: "orange",
              width: 1,
            },
          }, 
            
          
        },
        yAxis: {
          name: '数量 / 件'
          // type: "value",
        },
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

![image-20240503142345695](http://139.196.79.103:9001/myimages/imgs/image-20240503142345695.png)

## **series 系列图配置（组件）**

**series：系列，配置系列图表的类型和图形信息数据。object[] 类型，每个object具体配置信息如下**

name：系列名称，用于tooltip的显示，legend 的图例筛选等

type：指定系列图表的类型，比如：柱状图、折线图、饼图、散点图、地图等

data：系列中的数值内容数组。数组中的每一项称为数据项 **。**

* 一维数组: [ value ， value ] 。（一维数组是二维数组的简写 ）
* 二维数组。
  * [ [index, value ]， [index, value ] ] ， 注意 index 从 0 开始
  * [ [*x*, y, value ]， [ *x*, y ， value ] ]， 注意这里的x 和 y 可以表示x轴和y轴，也可以表示 经度 和 纬度。
* 对象类型( 推荐 )。[ { value: x， name: x， label: { }，itemStyle:{}、 emphasis:{} .... } ]

label：图形上的文本标签（就近原则，data中的比series优先级高）

itemStyle：图形样式。

emphasis：高亮的图形样式和标签样式。

coordinateSystem：该系列使用的坐标系，默认值为二维的直角坐标系（笛卡尔坐标系）



data

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            label: { 
              show: true
            },
            // 方式一
            // data: [5, 20, 36, 10, 10, 20],
              
                   
            // 方式二
            // data: [
            //   // x index ,  y value
            //   [2, 36],
            //   [3, 10],
            //   [4, 10],
            //   [5, 20],
            //   [0, 5],
            //   [1, 20],
            // ],

            // 方式三(推荐)
            // data: [
            //   {
            //     value: 5,
            //     name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
            //     // ....
            //     // ....
            //   },
            //   {
            //     value: 20,
            //     name: "羊毛衫",
            //   },
            //   {
            //     value: 36,
            //     name: "雪纺衫",
            //   },
            //   {
            //     value: 10,
            //     name: "裤子",
            //   },
            //   {
            //     value: 10,
            //     name: "高跟鞋",
            //   },
            //   {
            //     value: 20,
            //     name: "袜子",
            //   },
            // ],
                    

            // 方式四
            // data: [
            //   {
            //     value: [0, 5], // 数组第一项为x轴值，第二项为y轴值
            //     name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
            //   },
            //   {
            //     value: [1, 20],
            //     name: "羊毛衫",
            //   },
            //   {
            //     value: [2, 36],
            //     name: "雪纺衫",
            //   },
            //   {
            //     value: [3, 10],
            //     name: "裤子",
            //   },
            //   {
            //     value: [4, 10],
            //     name: "高跟鞋",
            //   },
            //   {
            //     value: [5, 20],
            //     name: "袜子",
            //   },
            // ],


            // 方式五(地理坐标系推荐)
   			    data: [
              {
                value: [0, 5, 500], // 第一项为x轴或纬度值，第二项为y或维度轴值，第三项以后为扩展值
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
              },
              {
                value: [1, 20, 400],
                name: "羊毛衫",
              },
              {
                value: [2, 36, 200],
                name: "雪纺衫",
              },
              {
                value: [3, 10, 100],
                name: "裤子",
              },
              {
                value: [4, 10, 600],
                name: "高跟鞋",
              },
              {
                value: [5, 20, 300],
                name: "袜子",
              },
            ],
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

type

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'scatter', // line:折线图 bar:柱状图 scatter:散点图 pie:饼图 
            label: { 
              show: true
            },
            // 方式一
            // data: [5, 20, 36, 10, 10, 20],
              
            // 方式三(推荐)
            data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
              },
              {
                value: 20,
                name: "羊毛衫",
              },
              {
                value: 36,
                name: "雪纺衫",
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],
                 

          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

饼图pie

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        
        xAxis: {
          show: false,
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'pie', // line bar scatter pie
            label: { 
              show: true
            },
          // 设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
          // center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            
            // 百分比是参照容器高宽中较小一项( 感觉是直径 )
            radius: ["0%", "80%"], // 饼图的半径。数组的第一项是内半径，第二项是外半径。
            roseType: "area", //area玫瑰图(南丁格尔图)。 圆心角一样，通过半径展现数据大小(默认false)


            // 方式三(推荐)
            data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
              },
              {
                value: 20,
                name: "羊毛衫",
              },
              {
                value: 36,
                name: "雪纺衫",
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],
                 

          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

label

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",
              
            label: { // 系列图形上的文本标签
              show: true,
              position: [10, 10], // 支持的类型可以查文档，不同type的position的值会有些差异
              color: "red",
              fontSize: 20,
            },
            
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

itemStyle

data里面的itemStyle优先级高

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",
              
            itemStyle: { // 系列图形的样式
              color: "green",
              // borderColor: "orange",
              // borderWidth: 4,
              // opacity: 0.4,
            },
            
             // 方式三(推荐)
            data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
                // label ....
                itemStyle: { // 系列图形的样式
                  color: "red",
                },
              },
              {
                value: 20,
                name: "羊毛衫",
                itemStyle: { // 系列图形的样式
                  color: "orange",
                },
              },
              {
                value: 36,
                name: "雪纺衫",
                itemStyle: { // 系列图形的样式
                  color: "pink",
                },
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],
                    
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **series 高亮的样式( emphasis )**

鼠标悬浮到图形元素上时，高亮的样式。

默认情况高亮的样式是根据普通样式自动生成。但是也可自己定义

自定义主要是通过 emphasis 属性来定制。

emphsis 的结构和普通样式结构相同，如左图：

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240503145507942.png" alt="image-20240503145507942" style="zoom: 67%;" />

ECharts4以前，高亮和普通样式的写法，如右图

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240503145531539.png" alt="image-20240503145531539" style="zoom:67%;" />

这种写法 **仍然被兼容**，但是不再推荐了

多数情况下，开发者只配置普通状态下的样式，让高亮的样式是根据普通样式自动生成。

data里面的emphasis优先级高

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",
              
            label: {
              show: true,
            },
            itemStyle: {
              color: 'green'    
            },
            emphasis: { // 图形高亮( label、labelLine、itemStyle、lineStyle、areaStyle... )
              label: {
                show: true,
                color: 'red'
              },
              itemStyle: {
                color: 'orange'    
              },
              // .....
            },
            
             // 方式三(推荐)
            data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
                
                emphasis: { // 图形高亮( label、labelLine、itemStyle、lineStyle、areaStyle... )
                  label: {
                    show: true,
                    color: 'blue'
                  },
                  itemStyle: {
                    color: 'pink'    
                  },
                },

              },
              {
                value: 20,
                name: "羊毛衫",
              },
              {
                value: 36,
                name: "雪纺衫",
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],
                    
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **标题、图例、提示配置（组件）**

title**：**图表的标题。object 类型。

* text、top、left....

legend：图例，展现了不同系列的标记、颜色和名字。object 类型。

* show、icon、formatter、textStyle、itemWidth 、itemGap...

tooltip：提示框组件。object 类型。

* show、 trigger、axisPointer.....

title

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },

        title: {
          show: true,
          text: "Echart 5 条形图",
          left: 20,
          top: 10,
          // subtext: '第二个标题'
          // ....
        },
              

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",
 
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

legend

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        legend: {
          show: true,
          // width: 100,
          // itemWidth: 20
          icon: 'circle',  // round circle ...

          // formatter: 'liu-{name}'
          formatter: function(name) {
            console.log(name)
            // 富文本的语法: {style_name|content}
            return name + '{percentageStyle| 40%}'
          },
          textStyle: {
            rich: { // 给富文本添加样式
              percentageStyle: {
                color: 'red',
                fontSize: 12
                // css 样式
              }
            }
          }

        },
        xAxis: {
          show: false,
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'pie', // line bar scatter pie
            label: { 
              show: true
            },
   
            // 方式三(推荐)
            data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
              },
              {
                value: 20,
                name: "羊毛衫",
              },
              {
                value: 36,
                name: "雪纺衫",
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],
                 

          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

tooltip

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },

        tooltip: {
          show: true,
          // 使用了 trigger ，一般也结合 axisPointer
          trigger: "axis",  // 默认是 item
          axisPointer: {
            type: "shadow", //  (默认是竖线 line)  (横线 + 竖线 cross)  (横线 + 竖线 shadow)
          },
          // formatter: '<div style="color:red">haha</div>'
        },

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **Color 和 渐变色**

**ECharts中 Color 支持的格式：**

RGB、RGBA、关键字、十六进制格式

**ECharts中的渐变色**

线性渐变，前四个参数分别是（ x, y ）,（ x2, y2 ） 范围从 0 – 1。

径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },

        tooltip: {
          show: true,
          // 使用了 trigger ，一般也结合 axisPointer
          trigger: "axis",  // 默认是 item
          axisPointer: {
            type: "shadow", //  (默认是竖线 line)  (横线 + 竖线 cross)  (横线 + 竖线 shadow)
          },
          // formatter: '<div style="color:red">haha</div>'
        },

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            // 图形的颜色
            itemStyle: {
              color: {
                // 渐变
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "red",
                  },
                  {
                    offset: 1,
                    color: "blue",
                  },
                ],
              }
            },
             data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
                 // 图形的颜色
                itemStyle: {
                 color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#20FF89",
                      },
                      {
                        offset: 1,
                        color: "rgba(255, 255, 255, 0)",
                      },
                    ],
                    false
                  ),
                },
              },
              {
                value: 20,
                name: "羊毛衫",
              },
              {
                value: 36,
                name: "雪纺衫",
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],
                   
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **柱形图**

**ECharts 绘制 柱状图**

![image-20240503152432973](http://139.196.79.103:9001/myimages/imgs/image-20240503152432973.png)

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      
      var option = {
        backgroundColor: "rgb(40,46,72)",
        grid: {
          left: "5%",
          right: "10%",
          top: "30%",
          bottom: "5%",
          containLabel: true, // grid 区域是否包含坐标轴的刻度标签
        },
        tooltip: {},

        xAxis: {
          name: "月份",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#42A4FF",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "white",
          },
          type: 'category',
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        },
        yAxis: {
          name: "个",
          nameTextStyle: {
            color: "white",
            fontSize: 13,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#42A4FF",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#42A4FF",
            },
          },
          axisLabel: {
            color: "white",
          },
        },
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 17,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#01B1FF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#033BFF", // 100% 处的颜色
                  },
                ]
              },
            },
            data: [500, 2000, 3600, 1000, 1000, 2000, 4000],
          },
        ],
      };

      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **折线图**

**ECharts 绘制 折线图**

![image-20240503152512690](http://139.196.79.103:9001/myimages/imgs/image-20240503152512690.png)

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'), 'dark');
      
      let option = {
        grid: {
          left: "5%",
          right: "1%",
          top: "20%",
          bottom: "15%",
          containLabel: true, // grid 区域是否包含坐标轴的刻度标签
        },
        legend: {
          bottom: "5%",

          itemGap: 40,
          itemWidth: 30,
          itemHeigth: 12,

          textStyle: {
            color: "#64BCFF",
          },
          icon: "rect",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#20FF89",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: "#64BCFF",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "#64BCFF",
            },
          },
        ],
        series: [
          // 第一条折线图
          {
            name: "正常",
            type: "line",
            smooth: true,  // 是否平滑曲线显示。
            symbolSize: 5, // 标记的大小
            showSymbol: false,

            itemStyle: {
              color: "#20FF89",
            },
            // 区域填充样式。设置后显示成区域面积图。
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#20FF89",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
                false
              ),
            },
            data: [200, 200, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
          },
          
          // 第二条折线图 (  n 个系列图 )
          {
            name: "异常",
            type: "line",
            smooth: true, // 是否平滑曲线显示。
            symbolSize: 5, // 标记的大小，可以设置成诸如 10 这样单一的数字
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            itemStyle: {
              // 折线的颜色
              color: "#EA9502",
            },
            // 折线区域的颜色
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#EA9502",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
              },
            },
            data: [500, 300, 202, 258, 280, 660, 320, 202, 308, 280, 660, 420],
          },
        ],
      }; 
      
      
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **饼图**

**ECharts 绘制 饼图**

![image-20240503153033644](http://139.196.79.103:9001/myimages/imgs/image-20240503153033644.png)

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
     
      // =====准备数据=====
      let pieDatas = [
        {
          value: 100,
          name: "广州占比",
          percentage: "5%",
          color: "#34D160",
        },
        {
          value: 200,
          name: "深圳占比",
          percentage: "4%",
          color: "#027FF2",
        },
        {
          value: 300,
          name: "东莞占比",
          percentage: "8%",
          color: "#8A00E1",
        },
        {
          value: 400,
          name: "佛山占比",
          percentage: "10%",
          color: "#F19610",
        },
        {
          value: 500,
          name: "中山占比",
          percentage: "20%",
          color: "#6054FF",
        },
        {
          value: 600,
          name: "珠海占比",
          percentage: "40%",
          color: "#00C6FF",
        },
      ];

      // 将 pieDatas 格式的 数据映射为 系列图所需要的数据格式
      let data = pieDatas.map((item) => {
        return {
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color, 
          },
        };
      });

      // 求出总数
      let total = pieDatas.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      // =====准备数据=====

      // 2.指定图表的配置项和数据
      var option = {
        backgroundColor: "rgb(40,46,72)",
        // 标题组件
        title: {
          text: `充电桩总数`,
          top: "50%",
          left: "50%",
          padding: [-20, 0, 0, -45],
          textStyle: {
            fontSize: 19,
            color: "white",
          },

          // subtext: `2100`,
          // subtextStyle : {
          //   color: 'red'
          // },

          // 副标题使用-富文本语法：{style_name|value}， 注意不能有空格
          subtext: `{totalSty|${total}}`,
          subtextStyle: {
            rich: {
              totalSty: {
                fontSize: 19,
                color: "white",
                width: 90,
                align: "center",
              },
            },
          },
        },

        legend: {
          orient: "vertical",
          right: "10%",
          top: "18%",

          itemGap: 10,
          itemWidth: 16,
          itemHeigth: 16,
          icon: "rect",

          // 自定义图例的名称
          formatter: function (name) {
            // 图例文本格式化 + 富文本定制样式  
            var currentItem = pieDatas.find((item) => item.name === name);
            return (
              "{nameSty|" +
              currentItem.name +
              "}\n" +
              "{numberSty|" +
              currentItem.value +
              "个 }" +
              "{preSty|" +
              currentItem.percentage +
              "}"
            );
          },
          textStyle: {
            rich: {
              nameSty: {
                fontSize: 12,
                color: "#FFFFFF",
                padding: [10, 14],
              },
              numberSty: {
                fontSize: 12,
                color: "#40E6ff",
                padding: [0, 0, 0, 14],
              },
              preSty: {
                fontSize: 12,
                color: "#40E6ff",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            radius: ["30%", "75%"], // 饼图的半径。数组的第一项是内半径，第二项是外半径。
            label: {
              show: false,
            },
            // data: [  { name: '',   value: '',   itemStyle }  ],
            data: data,
            roseType: "area", //  area 玫瑰图, 圆心角一样，通过半径展现数据大小( 默认为false )
          },
        ],
      };
      

      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **地图-绘制**

ECharts 可以使用 GeoJSON 格式的数据作为地图的轮廓，可以获取第三方的 GeoJSON 数据注册到 ECharts 中：

* https://github.com/echarts-maps/echarts-china-cities-js/tree/master/js/shape-with-internal-borders
* https://datav.aliyun.com/portal/school/atlas/area_selector

 

ECharts绘制地图步骤（方式一）：

* 1.拿到GeoJSON数据
* 2.注册对应的地图的GeoJSON数据（调用setOption前注册）
* 3.配置geo选项。

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <!-- 
    1.导入了一个中国的 geo json
    window.china_geojson = {}
  -->
  <script src="./geojson/china_geojson.js"></script>
  <script>
    window.onload = function() {
      // 2.注册一下中国地图的 geo json ( 需要在setOption之前调用 )
      echarts.registerMap('中国', { geoJSON: china_geojson })
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        // 3.在 echarts 中展示中国地图
        geo: {
          map: '中国'
        },
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

ECharts绘制地图步骤（方式二）：

* 1.拿到GeoJSON数据
* 2.注册对应的地图的GeoJSON数据（调用setOption前注册）
* 3.配置map series。

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <!-- 
    1.导入了一个中国的 geo json
    window.china_geojson = {}
  -->
  <script src="./geojson/china_geojson.js"></script>
  <script>
    window.onload = function() {
      // 2.注册一下中国地图的 geo json ( 需要在setOption之前调用 )
      echarts.registerMap('中国', { geoJSON: china_geojson })

      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        // 3.在 echarts 中展示中国地图
        series: [
          {
            type: 'map', // 系列图是 地图
            map: '中国' // 展示中国地图( 因为只注册一个中国地图 )
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **geo 和 map series绘制地图的区别**

**geo地理坐标系组件**

会生成一个 geo 地理坐标系组件

地理坐标系组件用于地图的绘制

支持在地理坐标系上绘制散点图，线集

该坐标系可以共其它系列复用

注意：其他系列在复用该地理坐标系时，series的itemStyle等样式将不起作用

**map series**

默认情况下，map series 会自己生成内部专用的 geo 地理坐标系组件

地理坐标系组件用于地图的绘制

地图主要用于地理区域数据的可视化，配合data使用

配合 visualMap 组件用于展示不同区域的人口分布密度等数据

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <!-- 
    1.导入了一个中国的 geo json
    window.china_geojson = {}
  -->
  <script src="./geojson/china_geojson.js"></script>
  <script>
    window.onload = function() {
      // 2.注册一下中国地图的 geo json ( 需要在setOption之前调用 )
      echarts.registerMap('中国', { geoJSON: china_geojson })

      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        // 3.在 echarts 中展示中国地图
        geo: [
          {
            map: '中国', // 全局的地图( 创建一个地理坐标系统, 供其它系列复用该坐标系 )
            roam: true,
          }
        ],

        series: [
          {
            type: 'map', // 系列图是 地图(创建一个地理坐标系统, 用来展示数据 )
            map: '中国', // 
            roam: true,
            
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **地图-着色**

地图着色，可以通过 itemStyle 属性中的 areaColor 和 borderColor 属性。

areaColor ：地图区域的颜色；

borderColor：图形（边界）的描边颜色。

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <!-- 
    1.导入了一个中国的 geo json
    window.china_geojson = {}
  -->
  <script src="./geojson/china_geojson.js"></script>
  <script>
    window.onload = function() {
      // 2.注册一下中国地图的 geo json ( 需要在setOption之前调用 )
      echarts.registerMap('中国', { geoJSON: china_geojson })
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        tooltip: {},
        // 3.在 echarts 中展示中国地图
        // geo: {
        //   map: '中国',
        //   // =======地图着色=========
        //   itemStyle: {
        //     areaColor: "#023677", // 地图区域的颜色。
        //     borderColor: "#1180c7", // 图形的描边颜色。
        //   },
            
        //   emphasis: {
        //     itemStyle: {
        //       areaColor: "#4499d0",
        //     },
        //     label: {
        //       color: "white",
        //     },
        //   },
        //   // =======地图着色=========
        // },

        series: [
          {
            
            type: 'map', // 系列图是 地图(创建一个地理坐标系统, 用来展示数据 )
            map: '中国', // 
            roam: true,
            // =======地图着色=========
            itemStyle: {
              areaColor: "#023677", // 地图区域的颜色。
              borderColor: "#1180c7", // 图形的描边颜色。
            },
              
            emphasis: {
              itemStyle: {
                areaColor: "#4499d0",
              },
              label: {
                color: "white",
              },
            },
              // =======地图着色=========
          }
        ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **地图-数据可视化**

给地图添加数据，并可视化展示

添加一个map series

配置地图样式

添加地图所需的数据

添加 visualMap 视觉映射

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style></style>
  </head>
  <body>
    <div id="main" style="height: 600px"></div>

    <script src="../libs/echarts-5.3.3.js"></script>
    <script src="./geojson/china_geojson.js"></script>
    <script>
      // 注册地图
      echarts.registerMap("中国", { geoJSON: china_geojson });
      // 1.基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"), null, {
        renderer: "svg",
      });

      var data = [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 180 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];



      // 2.指定图表的配置项和数据
      var option = {
        
        tooltip: {},
        grid: {},


        // 1.视觉数据映射
        visualMap: [
          {
            // type: "continuous", // 连续型视觉映射组件 (默认)
            // type: "piecewise", // 分段型视觉映射组件
            left: "20%",
            seriesIndex: [0], // 指定取哪个系列的数据
            // 定义 在选中范围中 的视觉元素, 对象类型。
            inRange: {
              color: ["#04387b", "#467bc0"], // 映射组件和地图的颜色(一般和地图色相近)
            },
          },
        ],


        series: [
          {
            name: "中国地图",
            type: "map",
            map: "中国",
            data,
            // data: [
            //   { name: "广东", value: 123 },
            //   { name: "广西", value: 59 },
            //   { name: "海南", value: 14 },
            //   // ....
            //   // ...
            // ],
            itemStyle: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              itemStyle: { areaColor: "#4499d0" },
              label: { color: "white" },
            },
            select: {
              label: { color: "white" },
              itemStyle: { areaColor: "#4499d0" },
            },
          },
        ],
      };
      myChart.setOption(option);
    </script>
  </body>
</html>
```

## **地图-涟漪特效散点图**

给地图添加涟漪特效的散点图数据，并可视化展示

* 添加一个effectScatter series

* 指定使用的地理坐标系
* 添加地图所需的数据
* 修改标记的大小和样式
* 修改默认的tooltip提示

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <!-- 
    1.导入了一个中国的 geo json
    window.china_geojson = {}
  -->
  <script src="./geojson/china_geojson.js"></script>
  <script>
    window.onload = function() {
      // 2.注册一下中国地图的 geo json ( 需要在setOption之前调用 )
      echarts.registerMap('中国', { geoJSON: china_geojson })

      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        // 3.在 echarts 中展示中国地图
       geo: [
        {
          map: '中国'
        }
       ],
       series: [
        {
          name: "散点图",
          type: "effectScatter", 

          geoIndex: 0, // geo 支持数组，默认是 0
          coordinateSystem: "geo", // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
          data: [
            {
              name: "广东",
              value: [113.280637, 23.125178, 93],
            },
            {
              name: "北京",
              value: [116.405285, 39.904989, 199],
            },
            // {
            //   name: "天津",
            //   value: [117.190182, 39.125596, 99],
            // },
          ],


                        
           // ====== 散点大小和着色========   
           symbolSize: function (val) {
            console.log(val)
              return val[2] / 10;  // 控制散点图的大小
           },

            itemStyle: {
              color: "green",
              shadowBlur: 10,
              shadowColor: "yellow",
            },
           // ====== 散点大小和着色========   

        }
       ]
      };
      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

最终案例

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <!-- 
    1.导入了一个中国的 geo json
    window.china_geojson = {}
  -->
  <script src="./geojson/china_geojson.js"></script>
  <script>
    window.onload = function() {
      let mapName = '中国'
      // 2.注册一下中国地图的 geo json ( 需要在setOption之前调用 )
      echarts.registerMap(mapName, { geoJSON: china_geojson })
      
      let myChart = echarts.init(document.getElementById('main'));
     
      var data = [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 154 },
        { name: "江苏", value: 102 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 101 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 120 },
        { name: "广东", value: 193 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];

      var geoCoordMap = {};
      /*获取地图数据*/
      myChart.showLoading();
      // console.log(echarts.getMap(mapName));

      // 1.先拿到地图的 geo json 对象
      var mapFeatures = echarts.getMap(mapName).geoJson.features;
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      myChart.hideLoading();
      console.log("data=>", data);
      console.log("geoCoordMap=>", geoCoordMap);

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: [...geoCoord, data[i].value],
            });
          }
        }
        console.log("res=>", res);
        return res;
      };



      // 2.指定图表的配置项和数据
      var option = {
        tooltip: {}, // 提示框

        // visualMap: {  // 视觉映射组件
        //   left: "20%",
        //   seriesIndex: [0],
        //   inRange: {
        //     color: ["#04387b", "#467bc0"], // 蓝绿
        //   },
        // },

        geo: {  // 注册一个地理坐标系组件( 给散点图用 )
          map: "中国",
          roam: false,
          label: { show: false },
          aspectScale: 0.75,  // 缩放地图
          itemStyle: {
            areaColor: "#023677",
            borderColor: "#1180c7",
          },
          emphasis: {
            itemStyle: { areaColor: "#4499d0" },
            label: { color: "white" },
          },
        },
        series: [
          {
            name: "中国地图",
            type: "map",
            map: "中国",
            data,  // 给地图填充数据

            // 地图样式
            itemStyle: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              itemStyle: { areaColor: "#4499d0" },
              label: { color: "white" },
            },
            select: {
              label: { color: "white" },
              itemStyle: { areaColor: "#4499d0" },
            },
            // 地图样式
          },
            
          {
            name: "散点图充电桩",
            type: "effectScatter",

            // 散点图使用的坐标系: geo定义的坐标系组件
            geoIndex: 0,
            coordinateSystem: "geo", // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
            
            
            data: convertData(data),

            symbolSize: function (val) {
              return val[2] / 10;
            },

            itemStyle: {
              color: "yellow",
              shadowBlur: 10,
              shadowColor: "yellow",
            },
            tooltip: {
              show: true,
              trigger: "item",
              formatter: function (params) {
                console.log(params);
                var data = params.data;
                return `${params.seriesName} <div style="margin:5px 0px;"/> ${data.name} ${data.value[2]}`;
              },
            },
          },
        ],
      };



      myChart.setOption(option);
    }
  </script>
</body>
</html>
```

## **Echarts 常见 API**

**全局 echarts 对象，在 script 标签引入 echarts.js 文件后获得，或者在 AMD 环境中通过 require('echarts') 获得。**

* echarts. init( dom， theme， opts )：创建echartsInstance实例
* echarts. registerMap( mapName， opts )：注册地图
* echarts. getMap( mapName )：获取已注册地图

**通过 echarts.init 创建的实例（echartsInstance）**

* echartsInstance. setOption(opts)：设置图表实例的配置项以及数据，万能接口。
* echartsInstance. getWidth()、 echartsInstance. getHeight()：获取 ECharts 实例容器的宽高度。
* echartsInstance. resize(opts)：改变图表尺寸，在容器大小发生改变时需要手动调用。
* echartsInstance. showLoading()、 echartsInstance. hideLoading()：显示和隐藏加载动画效果。
* echartsInstance. dispatchAction( )：触发图表行为，例如：图例开关、显示提示框showTip等
* echartsInstance. dispose：销毁实例，销毁后实例无法再被使用
* echartsInstance. on()：通过 on 方法添加事件处理函数，该文档描述了所有 ECharts 的事件列表。



自动触发Action实现提示框轮播

会自动触发提示，然后轮播

![image-20240503164036626](http://139.196.79.103:9001/myimages/imgs/image-20240503164036626.png)

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        
        tooltip: {
          position: 'top', // top
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);

      // 1.实现提示框轮播的功能
      setInterval(function () {
        autoToolTip();
      }, 1000);

      let index = 0; // 0-5
      
      function autoToolTip() {
        index++;
        if (index > 5) {
          index = 0;
        }
        // 1.显示提示框
        myChart.dispatchAction({
          type: "showTip", // 触发的action type
          seriesIndex: 0, // 系列的 索引
          dataIndex: index,// 数据项的 索引
          position: "top", // top
        });
      }
    }
  </script>
</body>
</html>
```

地图-下钻，指的是比如点击广东省就会变成广东省的地图

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
   <button onclick="back()"> 返回 > 中国地图</button>
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <!-- 
    1.导入了一个中国的 geo json
    window.china_geojson = {}
  -->
  <script src="./geojson/china_geojson.js"></script>
  <script src="./geojson/guangdong_geojson.js"></script>

  <script>
    let myChart = null
    let option = {}
    window.onload = function() {
      // 2.注册一下中国地图的 geo json ( 需要在setOption之前调用 )
      echarts.registerMap('中国', { geoJSON: china_geojson })

       myChart = echarts.init(document.getElementById('main'));
       option = {
        // 3.在 echarts 中展示中国地图
        series: [
          {
            type: 'map', // 系列图是 地图
            map: '中国', // 展示中国地图( 因为只注册一个中国地图 )
            roam: true
          }
        ]
      };
      myChart.setOption(option);


      // 1.地图下钻的功能
      myChart.on('click', function(event) {
        // console.log(event)
        // event.name == 广东
        if(event.name === '广东'){
          if(!echarts.getMap(event.name)){
            console.log('注册地图')
            echarts.registerMap(event.name, { geoJSON: guangdong_geojson})
          }
          option.series[0].map = event.name // 将中国地图切换为广东地图
          myChart.setOption(option)
        }
      })
    }
    function back() {
      option.series[0].map ='中国' 
      myChart.setOption(option)
    }
    
  </script>
</body>
</html>
```

## **响应式 Echarts 图表**

响应式图片的实现步骤：

1.图表只设置高度，宽度设置为100% 或 不设置。

2.监听窗口的resize事件，即监听窗口尺寸的变化（需节流）。

3.当窗口大小改变时，然后调用 echartsInstance.resize 改变图表的大小。

另外需要注意的是：

在容器节点被销毁时，可以调用 echartsInstance.dispose 以销毁echarts的实例释放资源，避免内存泄漏。

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
  
  <div id="main" style="height: 400px"></div>
  <script src="../libs/echarts-5.3.3.js"></script>
  <script>
    window.onload = function() {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        grid: {
          show: true,
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        

        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);

      // 1.响应式图表
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  </script>
</body>
</html>
```

