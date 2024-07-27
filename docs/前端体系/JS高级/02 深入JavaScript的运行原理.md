---
outline: deep
---

## JavaScript代码的执行

JavaScript代码下载好之后，是如何一步步被执行的呢？

我们知道，浏览器内核是由两部分组成的，以webkit为例：

WebCore：负责HTML解析、布局、渲染等等相关的工作；

JavaScriptCore：解析、执行JavaScript代码；

另外一个强大的JavaScript引擎就是V8引擎。

## V8引擎的执行原理

我们来看一下官方对V8引擎的定义：

V8是用C ++编写的Google开源高性能JavaScript和WebAssembly引擎，它用于Chrome和Node.js等。

它实现ECMAScript和WebAssembly，并在Windows 7或更高版本，macOS 10.12+和使用x64，IA-32，ARM或MIPS处理 器的Linux系统上运行。

V8可以独立运行，也可以嵌入到任何C ++应用程序中。

![image-20221231205529807](http://139.196.79.103:9001/myimages/imgs/image-20221231205529807.png)

## V8引擎的架构

V8引擎本身的源码非常复杂，大概有超过100w行C++代码，通过了解它的架构，我们可以知道它是如何对JavaScript执行的：

Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；

* 如果函数没有被调用，那么是不会被转换成AST的；

* Parse的V8官方文档：https://v8.dev/blog/scanner

Ignition是一个解释器，会将AST转换成ByteCode（字节码）

* 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；

* 如果函数只调用一次，Ignition会解释执行ByteCode；

* Ignition的V8官方文档：https://v8.dev/blog/ignition-interpreter

TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；

* 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，提高代码的执行性能；
* 但是，机器码实际上也会被还原为ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化（比如sum函数原来执 行的是number类型，后来执行变成了string类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；
* TurboFan的V8官方文档：https://v8.dev/blog/turbofan-jit

## V8引擎的解析图（官方）

![image-20221231210010417](http://139.196.79.103:9001/myimages/imgs/image-20221231210010417.png)

## V8执行的细节

那么我们的JavaScript源码是如何被解析（Parse过程）的呢？

Blink将源码交给V8引擎，Stream获取到源码并且进行编码转换；

Scanner会进行词法分析（lexical analysis），词法分析会将代码转换成tokens；

接下来tokens会被转换成AST树，经过Parser和PreParser：

Parser就是直接将tokens转成AST树架构；

PreParser称之为预解析，为什么需要预解析呢？

这是因为并不是所有的JavaScript代码，在一开始时就会被执行。那么对所有的JavaScript代码进行解析，必然会 影响网页的运行效率；

所以V8引擎就实现了Lazy Parsing（延迟解析）的方案，它的作用是将不必要的函数进行预解析，也就是只解析暂 时需要的内容，而对函数的全量解析是在函数被调用时才会进行；

比如我们在一个函数outer内部定义了另外一个函数inner，那么inner函数就会进行预解析；

生成AST树后，会被Ignition转成字节码（bytecode），之后的过程就是代码的执行过程（后续会详细分析）。

## JavaScript的执行过程

假如我们有下面一段代码，它在JavaScript中是如何被执行的呢？

```javascript
var message = "Global Message"

function foo() {
    var message = "Foo Message"
    console.log("foo function")
}

var num1 = 10
var num2 = 20
var result = num1 + num2
console.log(result)
```

## 初始化全局对象

js引擎会在执行代码之前，会在堆内存中创建一个全局对象：Global Object（GO）

* 该对象 所有的作用域（scope）都可以访问；
* 里面会包含Date、Array、String、Number、setTimeout、setInterval等等；
* 其中还有一个window属性指向自己；

![image-20230101084354259](http://139.196.79.103:9001/myimages/imgs/image-20230101084354259.png)

## 执行上下文（ Execution Contexts ）

js引擎内部有一个执行上下文栈（Execution Context Stack，简称ECS），它是用于执行代码的调用栈。

那么现在它要执行谁呢？执行的是全局的代码块：

全局的代码块为了执行会构建一个 Global Execution Context（GEC），全局执行上下文；

GEC会 被放入到ECS中 执行；

GEC被放入到ECS中里面包含两部分内容：

第一部分：在代码执行前，在parser转成AST的过程中，会将全局定义的变量、函数等加入到GlobalObject中，但是并不会 赋值；这个过程也称之为变量的作用域提升（hoisting）

第二部分：在代码执行中，对变量赋值，或者执行其他的函数；

## 认识VO对象（Variable Object）

每一个执行上下文会关联一个VO（Variable Object，变量对象），变量和函数声明会被添加到这个VO对象中。

当全局代码被执行的时候，VO就是GO对象了

# 全局代码执行过程（执行前）

![image-20230101085326854](http://139.196.79.103:9001/myimages/imgs/image-20230101085326854.png)

## 全局代码执行过程（执行后）

![image-20230101085434021](http://139.196.79.103:9001/myimages/imgs/image-20230101085434021.png)

## 函数如何被执行呢？

在执行的过程中执行到一个函数时，就会根据函数体创建一个函数执行上下文（Functional Execution Context，简称FEC）， 并且压入到EC Stack中。

因为每个执行上下文都会关联一个VO，那么函数执行上下文关联的VO是什么呢？

当进入一个函数执行上下文时，会创建一个AO对象（Activation Object）；

这个AO对象会使用arguments作为初始化，并且初始值是传入的参数；

这个AO对象会作为执行上下文的VO来存放变量的初始化；

## 函数的执行过程（执行前）

```javascript
var message = "Global Message"

function foo(num) {
    var message = "Foo Message"
    var age = 18
    var height = 1.88
    console.log("foo function")
}

foo(123)

var num1 = 10
var num2 = 20
var result = num1 + num2
console.log(result)
```

![image-20230101090506792](http://139.196.79.103:9001/myimages/imgs/image-20230101090506792.png)

## 函数的执行过程（执行后）

![image-20230101090543843](http://139.196.79.103:9001/myimages/imgs/image-20230101090543843.png)

## 函数代码的多次执行

```javascript
function foo(num) {
    var message = "Foo Message"
    var age = 18
    var height = 1.88
    console.log("foo function")
}

foo(123)
foo(321)
foo(111)
foo(222)
```

foo第一次执行123

![image-20230101135302365](http://139.196.79.103:9001/myimages/imgs/image-20230101135302365.png)

当foo第二次执行321时会创建一个新的函数执行上下文

![image-20230101135400702](http://139.196.79.103:9001/myimages/imgs/image-20230101135400702.png)

## 函数代码的相互调用

```javascript
var message = "Global Message"
var obj = {
    name: "why"
}

function bar() {
    console.log("bar function")
    var address = "bar"
    }

function foo(num) {
    var message = "Foo Message"

    bar()

    var age = 18
    var height = 1.88
    console.log("foo function")
}

foo(123)
```

foo和bar函数执行

![image-20230101140126731](http://139.196.79.103:9001/myimages/imgs/image-20230101140126731.png)

bar函数执行完毕，bar函数的执行上下文会从栈中弹出

![image-20230101140208827](http://139.196.79.103:9001/myimages/imgs/image-20230101140208827.png)

接着foo函数执行完毕，foo函数的执行上下文也会从栈中弹出

![image-20230101140302941](http://139.196.79.103:9001/myimages/imgs/image-20230101140302941.png)

## 作用域和作用域链（Scope Chain）

当进入到一个执行上下文时，执行上下文也会关联一个作用域链（Scope Chain）

作用域链是一个对象列表，用于变量标识符的求值；

当进入一个执行上下文时，这个作用域链被创建，并且根据代码类型，添加一系列的对象；

函数代码查找变量，有自己的message

```javascript
 // 1.函数中有自己的message
var message = "Global Message"

function foo() {
    console.log(message) // undefined
    var message = "foo message"
    }

foo()
```

![image-20230101142812585](http://139.196.79.103:9001/myimages/imgs/image-20230101142812585.png)

函数查找变量，没有自己的message

```javascript
// 2.函数中没有自己的message
var message = "Global Message"

debugger

function foo() {
    console.log(message) // Global Message
}

foo()


var obj = {
    name: "obj",
    bar: function() {
        var message = "bar message"
        foo()
    }
}

obj.bar()
```

![image-20230101143144750](http://139.196.79.103:9001/myimages/imgs/image-20230101143144750.png)

查找变量时，先在自己的AO中查找，找不到再去作用域链中查找，作用域链只跟函数定义的位置有关，和函数调用的位置无关。

## 函数代码多层嵌套

```javascript
var message = "global message"

function foo() {
    var name = "foo"
    function bar() {
        console.log(name)
    }
    return bar
}

var bar = foo()
bar()
```

![image-20230101150845468](http://139.196.79.103:9001/myimages/imgs/image-20230101150845468.png)

## 作用域提升面试题

作用域链只跟函数定义的位置有关，和函数调用的位置无关。

```javascript
// 1.面试题一:
var n = 100
function foo() {
    n = 200
}
foo() 
console.log(n) // 200
```

```javascript
// 2.面试题二:
var n = 100
function foo() {
    console.log(n) // undefined
    var n = 200
    console.log(n) // 200
}

foo()
```

```javascript
// 3.面试题三:
var n = 100

function foo1() {
    console.log(n) // 100
}
function foo2() {
    var n = 200
    console.log(n) // 200
    foo1()
}
foo2()
```

```javascript
// 4.面试题四:
var n = 100
function foo() {
    console.log(n) // undefined
    return
    var n = 200
    }
foo()
```

```javascript
// 5.在开发中可能会出现这样错误的写法
function foo() {
    message = "Hello World"
}
foo()
console.log(message) // Hello World
```

```javascript
 // 6.面试题五:
function foo() {
    var a = b = 100
    }
foo()
console.log(a) // 报错
console.log(b) // 100
```

