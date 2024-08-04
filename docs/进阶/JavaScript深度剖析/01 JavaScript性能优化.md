---
outline: deep
---

## Performance工具

### 为什么使用Performance工具

* GC的目的是为了实现内存空间的良性循环
* 良性循环的基石是合理使用
* 即刻关注才能确定是否合理
* Performance提供多种监控方式

### Performance使用步骤

随便打开一个网站，然后点击下面的按钮，memory记得勾选上

![image-20240804162348486](http://139.196.79.103:9001/myimages/imgs/202408041623563.png)

点击停止录制，就可以看到走势图，如果有升有降是比较正常

![image-20240804162455497](http://139.196.79.103:9001/myimages/imgs/202408041624549.png)

### 监控内存的几种方式

#### 浏览器任务管理器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">Add</button>

    <script>
      const oBtn = document.getElementById("btn");

      oBtn.onclick = function () {
        let arrList = new Array(1000000);
      };
    </script>
  </body>
</html>
```

按快捷键Shift+Esc，默认js使用内存没有展示，可以鼠标右键勾选

![image-20240804163104763](http://139.196.79.103:9001/myimages/imgs/202408041631816.png)

如果js使用的内存，也就是小括号实际大小里面的数值一直在增大，那么我们就可以判断内存是有问题。

#### Timeline时序图记录

浏览器任务管理器只能查看内存是否有问题，但是具体哪里有问题就没有办法定位。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">Add</button>

    <script>
      const arrList = [];

      function test() {
        for (let i = 0; i < 1000000; i++) {
          document.body.appendChild(document.createElement("p"));
        }
        arrList.push(new Array(1000000).join("x"));
      }

      document.getElementById("btn").addEventListener("click", test);
    </script>
  </body>
</html>
```

打开浏览器的Performance，然后点击几次Add按钮，然后点击stop

![image-20240804163950285](http://139.196.79.103:9001/myimages/imgs/202408041639365.png)

这里可以只勾选js heap，方便只查看JS内存的走势，可以看到有升有降，比较正常；如果看到这条线一直增长那么内存就有问题

![image-20240804164058749](http://139.196.79.103:9001/myimages/imgs/202408041640813.png)

可以拖动滑块，定位到哪里内存有问题

![image-20240804164427568](http://139.196.79.103:9001/myimages/imgs/202408041644617.png)

#### 堆快照查找分离DOM

什么是分离DOM

* 界面元素存活在DOM树上
* 垃圾对象时的DOM节点
* 分离状态的DOM节点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">Add</button>

    <script>
      var tmpEle;

      function fn() {
        var ul = document.createElement("ul");
        for (var i = 0; i < 10; i++) {
          var li = document.createElement("li");
          ul.appendChild(li);
        }
        tmpEle = ul;
      }

      document.getElementById("btn").addEventListener("click", fn);
    </script>
  </body>
</html>
```

在没有点击Add按钮的情况下，点击Take snapshot

<img src="http://139.196.79.103:9001/myimages/imgs/202408041650597.png" alt="image-20240804165010538" style="zoom:67%;" />

然后搜索deta，搜索不到任何内容

![image-20240804165039931](http://139.196.79.103:9001/myimages/imgs/202408041650968.png)

接着去点击Add按钮，然后切换到Profirles，再次点击Take snapshot

![image-20240804165316918](http://139.196.79.103:9001/myimages/imgs/202408041653971.png)

会发现快照2会搜索出来内容，就是创建出来的DOM节点

那么，如何解决呢，清空tmpEle即可

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">Add</button>

    <script>
      var tmpEle;

      function fn() {
        var ul = document.createElement("ul");
        for (var i = 0; i < 10; i++) {
          var li = document.createElement("li");
          ul.appendChild(li);
        }
        tmpEle = ul;

        tmpEle = null; // 清空
      }

      document.getElementById("btn").addEventListener("click", fn);
    </script>
  </body>
</html>
```

此时，我们点击Add按钮，然后再次生成快照3，搜索deta发现没有搜索到任何内容，也就说明内存得到了释放。

![image-20240804165651393](http://139.196.79.103:9001/myimages/imgs/202408041656429.png)

### 判断是否存在频繁GC

Timeline中频繁的上升下降

任务管理器中数据频繁的增加减小

## 代码优化

### 避免全局变量

全局变量的特点

* 全局变量挂载在window下
* 全局变量至少有一个引用计数
* 全局变量存活更久，但持续占用内存

### 避免全局查找

全局查找相关

* 目标变量不存在于当前作用域内，通过作用域链向上查找
* 减少全局查找降低时间消耗
* 减少不必要的全局变量定义
* 全局变量数据局部化

```javascript
// 变量局部化（全局、局部）
// 这样可以提高代码的执行效率（减少了数据访问时需要查找的路径）
// 数据的存储和读取

var i,
  str = "";
function packageDom() {
  for (i = 0; i < 1000; i++) {
    str += i;
  }
}
packageDom();

function packageDom() {
  let str = "";
  for (let i = 0; i < 1000; i++) {
    str += i;
  }
}
packageDom();
```

### JSBench使用

打开https://jsbench.me/

![image-20240804173139985](http://139.196.79.103:9001/myimages/imgs/202408041731040.png)

这个网站主要用来对比2个JS的执行效率，可以看到下面的执行效率更高，看opt/s的数值，越大效率越高。before和after是名字，自定义即可。需要注意的点是最好只打开一个tab标签，否则有可能影响结果，还有需要多测试几次。

### 缓存数据

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="skip" class="skip"></div>

    <script>
      // 缓存数据：对于需要多次使用的数据进行提前保存，后序进行使用

      var oBox = document.getElementById("skip");

      // 假设在当前的函数体当中需要对className的值进行多次使用，那么我们就可以将它提前缓存起来
      function hasClassName(ele, cls) {
        console.log(ele.className);
        return ele.className === cls;
      }

      console.log(hasClassName(oBox, "skip"));

      function hasClassName(ele, cls) {
        var clsName = ele.className;
        console.log(clsName);
        return clsName === cls;
      }

      console.log(hasClassName(oBox, "skip"));
    </script>
  </body>
</html>
```

![image-20240804175713507](http://139.196.79.103:9001/myimages/imgs/202408041757580.png)

### 减少访问层级

```javascript
function Person() {
  this.name = "zce";
  this.age = 40;
}

let p1 = new Person();
console.log(p1.age);

function Person() {
  this.name = "zce";
  this.age = 40;
  this.getAge = function () {
    return this.age;
  };
}
let p1 = new Person();
console.log(p1.getAge());
```

![image-20240804180500344](http://139.196.79.103:9001/myimages/imgs/202408041805406.png)

### 减少判断层级

```javascript
function doSomething (part, chapter) {
  const parts = ['ES2016', '工程化', 'Vue', 'React', 'Node']
  if (part) {
    if (parts.includes(part)) {
      console.log('属于当前课程')
      if (chapter > 5) {
        console.log('您需要提供 VIP 身份')
      }
    }
  } else {
    console.log('请确认模块信息')
  }
}

doSomething('ES2016', 6)

function doSomething (part, chapter) {
  const parts = ['ES2016', '工程化', 'Vue', 'React', 'Node']
  if (!part) {
    console.log('请确认模块信息')
    return 
  }
  if (!parts.includes(part)) return
  console.log('属于当前课程')
  if (chapter > 5) {
    console.log('您需要提供 VIP 身份')
  }
}

doSomething('ES2016', 6)
```

doSomething('ES2016', 6)可以放进测试用例里面

![image-20240804182051261](http://139.196.79.103:9001/myimages/imgs/202408041820338.png)

### 减少循环体活动

```javascript

// var test = () => {
//   var i
//   var arr = ['zce', 38, '我为前端而活']
//   for(i=0; i<arr.length; i++) {
//     console.log(arr[i])
//   }
// }

var test = () => {
  var i
  var arr = ['zce', 38, '我为前端而活']
  var len = arr.length
  for(i=0; i<len; i++) {
    console.log(arr[i])
  }
}

var test = () => {
  var arr = ['zce', 38, '我为前端而活']
  var len = arr.length
  while(len--) {
    console.log(arr[len])
  }
}
test()
```

### 字面量与构造式

```javascript
// let test = () => {
//   let obj = new Object()
//   obj.name = 'zce'
//   obj.age = 38
//   obj.slogan = '我为前端而活'
//   return obj
// }

// let test = () => {
//   let obj = {
//     name: 'zce',
//     age: 38,
//     slogan : '我为前端而活'
//   }
//   return obj
// }
// console.log(test())

var str1 = 'zce说我为前端而活'
var str2 = new String('zce说我为前端而活')


console.log(str1)
console.log(str2)
```

