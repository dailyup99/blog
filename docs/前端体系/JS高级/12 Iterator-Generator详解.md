---
outline: deep
---

## **什么是迭代器？**

**迭代器**（iterator），使用户**在容器对象（container，例如链表或数组）上遍访的对象**，使用该接口无需关心对象的内部实现细节。

其行为像数据库中的光标，迭代器最早出现在1974年设计的CLU编程语言中；

在各种编程语言的实现中，迭代器的实现方式各不相同，但是基本都有迭代器，比如Java、Python等；

**从迭代器的定义我们可以看出来，迭代器是帮助我们对某个数据结构进行遍历的对象。**

**在JavaScript中，迭代器也是一个具体的对象，这个对象需要符合迭代器协议（iterator protocol）：**

迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式；

在JavaScript中这个标准就是一个特定的next方法；

**next方法有如下的要求：**

一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：

done（boolean）

如果迭代器可以产生序列中的下一个值，则为 false。（这等价于没有指定 done 这个属性。）

如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。

value

迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

## **迭代器的代码练习**

下面手动给数组names创建一个迭代器：

```javascript
const names = ["abc", "cba", "nba"]
    
// 给数组names创建一个迭代器(迭代器: names的迭代器)
let index = 0
const namesIterator = {
    next: function() {
        // done: Boolean
        // value: 具体值/undefined
        if (index < names.length) {
            return { done: false, value: names[index++] }
        } else {
            return { done: true } // value不写默认是undefined，可以省略
        }
    }
}

console.log(namesIterator.next()) // {done: false, value: 'abc'}
console.log(namesIterator.next()) // {done: false, value: 'cba'}
console.log(namesIterator.next()) // {done: false, value: 'nba'}
console.log(namesIterator.next()) // {done: true}
```

现在又有一个新数组nums，也想要创建一个迭代器：

```javascript
// 数组nums
const nums = [100, 24, 55, 66, 86]

let indexNum = 0
const numsIterator = {
    next: function() {
        // done: Boolean
        // value: 具体值/undefined
        if (indexNum < nums.length) {
            return { done: false, value: nums[indexNum++] }
        } else {
            return { done: true }
        }
    }
}
```

得重新写一遍，那么可以封装一个函数作为创建数组的迭代器。

```javascript
const names = ["abc", "cba", "nba"]
const nums = [100, 24, 55, 66, 86]

// 封装一个函数
function createArrayIterator(arr) {
    let index = 0
    return {
        next: function() {
            if (index < arr.length) {
                return { done: false, value: arr[index++] }
            } else {
                return { done: true }
            }
        }
    }
}

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

const numsIterator = createArrayIterator(nums)
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
```

## **可迭代对象**

**但是上面的代码整体来说看起来是有点奇怪的：**

我们获取一个数组的时候，需要自己创建一个index变量，再创建一个所谓的迭代器对象；

事实上我们可以对上面的代码进行进一步的封装，让其变成一个可迭代对象；

**什么又是可迭代对象呢？**

它和迭代器是不同的概念；

当一个对象实现了iterable protocol协议时，它就是一个可迭代对象；

这个对象的要求是必须实现 @@iterator 方法，在代码中我们使用 Symbol.iterator 访问该属性；

**当然我们要问一个问题，我们转成这样的一个东西有什么好处呢？**

当一个对象变成一个可迭代对象的时候，就可以进行某些迭代操作；

比如 for...of 操作时，其实就会调用它的 @@iterator 方法；

```javascript
// 将infos变成一个可迭代对象
/*
      1.必须实现一个特定的函数: [Symbol.iterator]
      2.这个函数需要返回一个迭代器(这个迭代器用于迭代当前的对象)
    */
const infos = {
    friends: ["kobe", "james", "curry"],
    [Symbol.iterator]: function() {
        let index = 0
        const infosIterator = {
            next: function() {
                // done: Boolean
                // value: 具体值/undefined
                if (index < infos.friends.length) {
                    return { done: false, value: infos.friends[index++] }
                } else {
                    return { done: true }
                }
            }
        }
        return infosIterator
    }
}

// 可迭对象可以进行for of操作
for (const item of infos) {
    console.log(item) // "kobe" "james" "curry"
}

// 可迭代对象必然有一个[Symbol.iterator]函数
// 数组是一个可迭代对象
const students = ["张三", "李四", "王五"]
console.log(students[Symbol.iterator])
const studentIterator = students[Symbol.iterator]() // 返回一个迭代器
console.log(studentIterator.next())
console.log(studentIterator.next())
console.log(studentIterator.next())
console.log(studentIterator.next())
```

## 可迭代对象优化

上面的迭代器方法里面写infos.friends，假如某一天infos名字改了，infos.friends也得跟着改，我们可以做下优化：

```javascript
// 将infos变成一个可迭代对象
/*
      1.必须实现一个特定的函数: [Symbol.iterator]
      2.这个函数需要返回一个迭代器(这个迭代器用于迭代当前的对象)
    */
// 1.迭代infos中friends
const infos = {
    friends: ["kobe", "james", "curry"],
    [Symbol.iterator]: function() {
        let index = 0
        const infosIterator = {
            next: () => {
                if (index < this.friends.length) {
                    return { done: false, value: this.friends[index++] }
                } else {
                    return { done: true }
                }
            }
        }
        return infosIterator
    }
}
```

除了可以迭代infos中的数组，也可以迭代infos中的key和value

```javascript
// 2.迭代infos中的key/value
const infos = {
    name: "why",
    age: 18,
    height: 1.88,

    [Symbol.iterator]: function() {
        // const keys = Object.keys(this)
        // const values = Object.values(this)
        const entries = Object.entries(this)
        let index = 0
        const iterator = {
            next: function() {
                if (index < entries.length) {
                    return { done: false, value: entries[index++] }
                } else {
                    return { done: true }
                }
            }
        }
        return iterator
    }
}

// 可迭对象可以进行for of操作
for (const item of infos) {
    const [key, value] = item
    console.log(key, value)
}
```

## **原生迭代器对象**

**事实上我们平时创建的很多原生对象已经实现了可迭代协议，会生成一个迭代器对象的：**

String、Array、Map、Set、arguments对象、NodeList集合；

```javascript
// 1.数组
const names = ["abc", "cba", "nba"]
for (const name of names) {
    console.log(name)
}
console.log(names[Symbol.iterator]())

// 2.Set
const set = new Set(["abc", "cba", "nba"])
for (const item of set) {
    console.log(item)
}
const setIterator = set[Symbol.iterator]()
console.log(setIterator.next())
console.log(setIterator.next())
console.log(setIterator.next())
console.log(setIterator.next())

// 3.arguments
function foo() {
    for (const arg of arguments) {
        console.log(arg)
    }
}

foo(123, 321, 111, 222)
```

## **可迭代对象的应用**

**那么这些东西可以被用在哪里呢？**

**JavaScript中语法**：for ...of、展开语法（spread syntax）、yield*（后面讲）、解构赋值（Destructuring_assignment）；

**创建一些对象时**：new Map([Iterable])、new WeakMap([iterable])、new Set([iterable])、new WeakSet([iterable]);

**一些方法的调用**：Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable);

```javascript
// 1.用在特定的语法上
const names = ["abc", "cba", "nba"]
const info = {
    name: "why",
    age: 18,
    height: 1.88,
    [Symbol.iterator]: function() {
        const values = Object.values(this)
        let index = 0
        const iterator = {
            next: function() {
                if (index < values.length) {
                    return { done: false, value: values[index++] }
                } else {
                    return { done: true }
                }
            }
        }
        return iterator
    }
}

function foo(arg1, arg2, arg3) {
    console.log(arg1, arg2, arg3)
}

foo(...info) // info已经变成可迭代对象

// 2.一些类的构造方法中, 也是传入的可迭代对象
const set = new Set(["aaa", "bbb", "ccc"])
const set2 = new Set("abc")
console.log(set2)
const set3 = new Set(info)
console.log(set3)


// 3.一些常用的方法
const p1 = Promise.resolve("aaaa")
const p2 = Promise.resolve("aaaa")
const p3 = Promise.resolve("aaaa")
const pSet = new Set()
pSet.add(p1)
pSet.add(p2)
pSet.add(p3)
Promise.all(pSet).then(res => {
    console.log("res:", res)
})

function bar() {
    // console.log(arguments)
    // 将arguments转成Array类型
    const arr = Array.from(arguments)
    console.log(arr)
}

bar(111, 222, 333)
```

## **自定义类的迭代**

**在前面我们看到Array、Set、String、Map等类创建出来的对象都是可迭代对象：**

在面向对象开发中，我们可以通过class定义一个自己的类，这个类可以创建很多的对象：

如果我们也希望自己的类创建出来的对象默认是可迭代的，那么在设计类的时候我们就可以添加上 @@iterator 方法；

```javascript
class Person {
    constructor(name, age, height, friends) {
        this.name = name
        this.age = age
        this.height = height
        this.friends = friends
    }

    // 实例方法
    running() {}
    [Symbol.iterator]() {
        let index = 0
        const iterator = {
            next: () => {
                if (index < this.friends.length) {
                    return { done: false, value: this.friends[index++] }
                } else {
                    return { done: true }
                }
            }
        }
        return iterator
    }
}

const p1 = new Person("why", 18, 1.88, ["curry", "kobe", "james", "tatumu"])
const p2 = new Person("kobe", 30, 1.98, ["curry", "james", "aonier", "weide"])

for (const item of p2) {
    console.log(item)
}
```

## **迭代器的中断**

**迭代器在某些情况下会在没有完全迭代的情况下中断：**

比如遍历的过程中通过break、return、throw中断了循环操作；

比如在解构的时候，没有解构所有的值；

**那么这个时候我们想要监听中断的话，可以添加return方法：**

```javascript
class Person {
    constructor(name, age, height, friends) {
        this.name = name
        this.age = age
        this.height = height
        this.friends = friends
    }

    // 实例方法
    running() {}
    [Symbol.iterator]() {
        let index = 0
        const iterator = {
            next: () => {
                if (index < this.friends.length) {
                    return { done: false, value: this.friends[index++] }
                } else {
                    return { done: true }
                }
            },
            return: () => {
                console.log("监听到迭代器中断了")
                return { done: true } // 得返回一个对象，否则会报错
            }
        }
        return iterator
    }
}


const p1 = new Person("why", 18, 1.88, ["curry", "kobe", "james", "tatumu"])

for (const item of p1) {
    console.log(item) // curry kobe
    if (item === "kobe") {
        break
    }
}
```

## **什么是生成器？**

**生成器是ES6中新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候继续执行、暂停执行等。**

平时我们会编写很多的函数，这些函数终止的条件通常是返回值或者发生了异常。

**生成器函数也是一个函数，但是和普通的函数有一些区别：**

首先，生成器函数需要在function的后面加一个符号：*

其次，生成器函数可以通过yield关键字来控制函数的执行流程：

最后，生成器函数的返回值是一个Generator（生成器）：

✓ 生成器事实上是一种特殊的迭代器；

```javascript
/*
      生成器函数: 
        1.function后面会跟上符号: *
        2.代码的执行可以被yield控制
        3.生成器函数默认在执行时, 返回一个生成器对象
          * 要想执行函数内部的代码, 需要生成器对象, 调用它的next操作
          * 当遇到yield时, 就会中断执行
    */

// 1.定义了一个生成器函数
function* foo() {
    console.log("1111")
    console.log("2222")
    yield 
    console.log("3333")
    console.log("4444")
    yield
    console.log("5555")
    console.log("6666")
}

// 2.调用生成器函数, 返回一个 生成器对象
const generator = foo()
// 调用next方法
generator.next() // 1111 2222 
generator.next() // 3333 4444
generator.next() // 5555 6666
```

## **生成器函数执行**

**我们发现下面的生成器函数foo的执行体压根没有执行，它只是返回了一个生成器对象。**

那么我们如何可以让它执行函数中的东西呢？调用next即可；

我们之前学习迭代器时，知道迭代器的next是会有返回值的；

但是我们很多时候不希望next返回的是一个undefined，这个时候我们可以通过yield来返回结果；

```javascript
// 1.定义了一个生成器函数
function* foo() {
    console.log("执行内部代码:1111")
    console.log("执行内部代码:2222")
    yield "aaaa"
    console.log("执行内部代码:3333")
    console.log("执行内部代码:4444")
    yield "bbbb"
    console.log("执行内部代码:5555")
    console.log("执行内部代码:6666")
    yield "cccc"
    return undefined
}

// 2.调用生成器函数, 返回一个 生成器对象
const generator = foo()
// 调用next方法
// 执行到第一个yield并且暂停
console.log(generator.next()) // { done: false, value: "aaaa" }
// 执行到第二个yield并且暂停
console.log(generator.next()) // { done: false, value: "bbbb" }
// 执行到第三个yield并且暂停
console.log(generator.next()) //  { done: false, value: "cccc" }
// 执行剩余的代码
console.log(generator.next()) // {done: true, value: undefined}
```

```javascript
// 1.定义了一个生成器函数
function* foo() {
    console.log("执行内部代码:1111")
    console.log("执行内部代码:2222")
    yield "aaaa"
    console.log("执行内部代码:3333")
    console.log("执行内部代码:4444")
    return "bbbb" // 这里是return
    console.log("执行内部代码:5555")
    console.log("执行内部代码:6666")
    yield "cccc"
    return undefined
}

// 3.在中间位置直接return, 结果
console.log(generator.next()) // { done: false, value: "aaaa" }
console.log(generator.next()) // { done: true, value: "bbbb" }
console.log(generator.next()) // { done: true, value: undefined }
console.log(generator.next()) // { done: true, value: undefined }
console.log(generator.next()) // { done: true, value: undefined }
console.log(generator.next()) // { done: true, value: undefined }
```

## **生成器传递参数 – next函数**

**函数既然可以暂停来分段执行，那么函数应该是可以传递参数的，我们是否可以给每个分段来传递参数呢？**

答案是可以的；

我们在调用next函数的时候，可以给它传递参数，那么这个参数会作为上一个yield语句的返回值；

注意：也就是说我们是为本次的函数代码块执行提供了一个值；

```javascript
// 1.定义了一个生成器函数
function* foo(name1) {
    console.log("执行内部代码:1111", name1)
    console.log("执行内部代码:2222", name1)
    const name2 = yield "aaaa"
    console.log("执行内部代码:3333", name2) // next2
    console.log("执行内部代码:4444", name2) // next2
    const name3 = yield "bbbb"
    console.log("执行内部代码:5555", name3) // next3
    console.log("执行内部代码:6666", name3) // next3
    yield "cccc"
    return undefined
}

// 2.调用生成器函数, 返回一个 生成器对象
const generator = foo("next1") // 第一次传入的参数一般写在函数调用这里
// 4.给函数每次执行的时候, 传入参数
console.log(generator.next())
console.log(generator.next("next2"))
console.log(generator.next("next3"))
```

## **生成器提前结束 – return函数**

**还有一个可以给生成器函数传递参数的方法是通过return函数：**

return传值后这个生成器函数就会结束，之后调用next不会继续生成值了；

```javascript
function* foo(name1) {
    console.log("执行内部代码:1111", name1)
    console.log("执行内部代码:2222", name1)
    const name2 = yield "aaaa"
    console.log("执行内部代码:3333", name2)
    console.log("执行内部代码:4444", name2)
    const name3 = yield "bbbb"
    console.log("执行内部代码:5555", name3)
    console.log("执行内部代码:6666", name3)
    yield "cccc"

    console.log("最后一次执行")
    return undefined
}

const generator = foo("next1")

// 1.generator.return提前结束函数
console.log(generator.next())
console.log(generator.return("next2")) // {value: 'next2', done: true} 执行内部代码:3333后面的都不会执行
console.log("-------------------")
console.log(generator.next("next3"))
console.log(generator.next("next4"))
```

## **生成器抛出异常 – throw函数**

**除了给生成器函数内部传递参数之外，也可以给生成器函数内部抛出异常：**

抛出异常后我们可以在生成器函数中捕获异常；

但是在catch语句中不能继续yield新的值了，但是可以在catch语句外使用yield继续中断函数的执行；

```javascript
// 2.generator.throw向函数抛出一个异常
console.log(generator.next())
console.log(generator.throw(new Error("next2 throw error"))) // 直接报错，执行内部代码:3333后面的都不会执行
console.log("-------------------")
console.log(generator.next("next3"))
console.log(generator.next("next4"))
```

## **生成器替代迭代器**

**我们发现生成器是一种特殊的迭代器，那么在某些情况下我们可以使用生成器来替代迭代器：**

**事实上我们还可以使用yield\*来生产一个可迭代对象：**

这个时候相当于是一种yield的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值；

```javascript

// 1.对之前的代码进行重构(用生成器函数)
const names = ["abc", "cba", "nba"]
const nums = [100, 22, 66, 88, 55]

function* createArrayIterator(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i]
    }
    // yield arr[0]
    // yield arr[1]
    // yield arr[2]
    // return undefined
}

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

const numsIterator = createArrayIterator(nums)
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())

// 2.生成器函数, 可以生成某个范围的值
// [3, 9)
function* createRangeGenerator(start, end) {
    for (let i = start; i < end; i++) {
        yield i
    }
}

const rangeGen = createRangeGenerator(3, 9)
console.log(rangeGen.next())
console.log(rangeGen.next())
console.log(rangeGen.next())
console.log(rangeGen.next())
console.log(rangeGen.next())
console.log(rangeGen.next())
console.log(rangeGen.next())
console.log(rangeGen.next())
```

## **自定义类迭代 – 生成器实现**

**在之前的自定义类迭代中，我们也可以换成生成器：**

```javascript
// 1.yield*替换之前的方案
const names = ["abc", "cba", "nba"]
const nums = [100, 22, 66, 88, 55]

function* createArrayIterator(arr) {
    yield* arr
}

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

// 2.yield替换类中的实现
class Person {
    constructor(name, age, height, friends) {
        this.name = name
        this.age = age
        this.height = height
        this.friends = friends
    }

    // 实例方法
    *[Symbol.iterator]() {
        yield* this.friends
    }
}

const p = new Person("why", 18, 1.88, ["kobe", "james", "curry"])
for (const item of p) {
    console.log(item)
}

const pIterator = p[Symbol.iterator]()
console.log(pIterator.next())
console.log(pIterator.next())
console.log(pIterator.next())
console.log(pIterator.next())
```

## **异步处理方案**

**学完了我们前面的Promise、生成器等，我们目前来看一下异步代码的最终处理方案。**

首先，我们模拟一个网络请求：

```javascript
// 封装请求的方法: url -> promise(result)
function requestData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, 2000)
    })
}

// 1.发送一次网络请求
requestData("http://why").then(res => {
    console.log("res:", res)
})
```

**案例需求：**

我们需要向服务器发送网络请求获取数据，一共需要发送三次请求；

第二次的请求url依赖于第一次的结果；

第三次的请求url依赖于第二次的结果；

以此类推；

我们可以使用下面的方法：

```javascript
/*
      需求: 
        1.发送一次网络请求, 等到这次网络请求的结果
        2.发送第二次网络请求, 等待这次网络请求的结果
        3.发送第三次网络请求, 等待这次网络请求的结果
    */
// 方式一: 层层嵌套(回调地狱 callback hell)
function getData() {
    // 1.第一次请求
    requestData("why").then(res1 => {
        console.log("第一次结果:", res1)

        // 2.第二次请求
        requestData(res1 + "kobe").then(res2 => {
            console.log("第二次结果:", res2)

            // 3.第三次请求
            requestData(res2 + "james").then(res3 => {
                console.log("第三次结果:", res3)
            })
        })
    })
}
```

上面这种方法存在回调地狱，来看第二种方法解决回调地狱问题：

```javascript
// 方式二: 使用Promise进行重构(解决回调地狱)
// 链式调用
function getData() {
    requestData("why").then(res1 => {
        console.log("第一次结果:", res1)
        return requestData(res1 + "kobe")
    }).then(res2 => {
        console.log("第二次结果:", res2)
        return requestData(res2 + "james")
    }).then(res3 => {
        console.log("第三次结果:", res3)
    })
}
```

方式二虽然解决了回调地狱问题，但是代码不够优雅，可阅读性不强；

来看方式三

```javascript
 // 方式三: 最终代码
function* getData() {
    const res1 = yield requestData("why")
    console.log("res1:", res1)

    const res2 = yield requestData(res1 + "kobe")
    console.log("res2:", res2)

    const res3 = yield requestData(res2 + "james")
    console.log("res3:", res3)
}

const generator = getData()
generator.next().value.then(res1 => {
    generator.next(res1).value.then(res2 => {
        generator.next(res2).value.then(res3 => {
            generator.next(res3)
        })
    })
})
```

上面的方式三其实就是方式四的语法糖：

```javascript
// 方式四: async/await的解决方案
async function getData() {
    const res1 = await requestData("why")
    console.log("res1:", res1)

    const res2 = await requestData(res1 + "kobe")
    console.log("res2:", res2)

    const res3 = await requestData(res2 + "james")
    console.log("res3:", res3)
}

const generator = getData()
```

## **自动执行generator函数**

**目前我们的写法有两个问题：**

第一，我们不能确定到底需要调用几层的Promise关系；

第二，如果还有其他需要这样执行的函数，我们应该如何操作呢？

**所以，我们可以封装一个工具函数execGenFn自动执行生成器函数：**

```javascript
// 封装请求的方法: url -> promise(result)
function requestData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, 2000)
    })
}

// 生成器的处理方案
function* getData() {
    const res1 = yield requestData("why")
    console.log("res1:", res1)

    const res2 = yield requestData(res1 + "kobe")
    console.log("res2:", res2)

    const res3 = yield requestData(res2 + "james")
    console.log("res3:", res3)

    const res4 = yield requestData(res3 + "curry")
    console.log("res4:", res4)

    const res5 = yield requestData(res4 + "tatumu")
    console.log("res5:", res5)
}

// const generator = getData()
// generator.next().value.then(res1 => {
//   generator.next(res1).value.then(res2 => {
//     generator.next(res2).value.then(res3 => {
//       generator.next(res3).value.then(res4 => {
//         generator.next(res4)
//       })
//     })
//   })
// })

// 自动化执行生成器函数(了解)
function execGenFn(genFn) {
    // 1.获取对应函数的generator
    const generator = genFn()
    // 2.定义一个递归函数
    function exec(res) {
        // result -> { done: true/false, value: 值/undefined }
        const result = generator.next(res)
        if (result.done) return
        result.value.then(res => {
            exec(res)
        })
    }
    // 3.执行递归函数
    exec()
}

execGenFn(getData)
```

