---
outline: deep
---

## **什么是响应式？**

我们先来看一下响应式意味着什么？我们来看一段代码：

num有一个初始化的值，有一段代码使用了这个值；

那么在num有一个新的值时，这段代码可以自动重新执行；

```javascript
let num = 100

console.log(num * 2) // num变化时这两个console.log都会执行
console.log(num * num)

num = 200
```

上面的这样一种可以自动响应数据变量的代码机制，我们就称之为是响应式的。

那么我们再来看一下对象的响应式：

<img src="http://139.196.79.103:9001/myimages/imgs/image-20230603112812904.png" alt="image-20230603112812904" style="zoom:67%;" />

## **响应式函数设计**

首先，执行的代码中可能不止一行代码，所以我们可以将这些代码放到一个函数中：

<img src="http://139.196.79.103:9001/myimages/imgs/image-20230603112932753.png" alt="image-20230603112932753" style="zoom:67%;" />

那么我们的问题就变成了，当数据发生变化时，自动去执行某一个函数；

但是有一个问题：在开发中我们是有很多的函数的，我们如何区分一个函数需要响应式，还是不需要响应式呢？

```javascript
// 对象的响应式
const obj = {
  name: "why",
  age: 18
}

function foo() {
  console.log(obj.name)
  console.log(obj.age)
}


function bar() {
  console.log(obj.age + 100)
}

// 修改obj对象
obj.name = "kobe" // 当name发送改变只会调用foo函数，因为上面两个函数，只有foo函数依赖name
obj.age = 20 // 当age发生变化，会调用foo和bar函数，两个函数都依赖了age
```

## **响应式函数的实现watchFn**

但是我们怎么区分呢？

这个时候我们封装一个新的函数watchFn；

凡是传入到watchFn的函数，就是需要响应式的；

其他默认定义的函数都是不需要响应式的；

```javascript

const obj = {
  name: "why",
  age: 18
}


// function foo() {
//   console.log("foo:", obj.name)
//   console.log("foo", obj.age)
//   console.log("foo function")
// }

// function bar() {
//   console.log("bar:", obj.name + " hello")
//   console.log("bar:", obj.age + 10)
//   console.log("bar function")
// }


// 设置一个专门执行响应式函数的一个函数
const reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
  fn() // 函数传到watchFn会自动执行一次
}

watchFn(function foo() {
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
  console.log("foo function")
})


watchFn(function bar() {
  console.log("bar:", obj.name + " hello")
  console.log("bar:", obj.age + 10)
  console.log("bar function")
})

// 修改obj的属性
console.log("name发生变化-----------------------")
obj.name = "kobe"
reactiveFns.forEach(fn => {
  fn()
})
```

## **响应式依赖的收集**

目前我们收集的依赖是放到一个数组中来保存的，但是这里会存在数据管理的问题：

我们在实际开发中需要监听很多对象的响应式；

这些对象需要监听的不只是一个属性，它们很多属性的变化，都会有对应的响应式函数；

我们不可能在全局维护一大堆的数组来保存这些响应函数；

所以我们要设计一个类，这个类用于管理某一个对象的某一个属性的所有响应式函数：

相当于替代了原来的简单 reactiveFns 的数组；

每个响应式对象都有自己的数组

<img src="http://139.196.79.103:9001/myimages/imgs/image-20230603114558444.png" alt="image-20230603114558444" style="zoom:67%;" />

```javascript
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.push(fn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


const obj = {
  name: "why",
  age: 18
}


// 设置一个专门执行响应式函数的一个函数
const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()
}

watchFn(function foo() {
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
  console.log("foo function")
})


watchFn(function bar() {
  console.log("bar:", obj.name + " hello")
  console.log("bar:", obj.age + 10)
  console.log("bar function")
})

// 修改obj的属性
console.log("name发生变化-----------------------")
obj.name = "kobe"
dep.notify()

console.log("age发生变化-----------------------")
dep.notify()

console.log("name发生变化-----------------------")
obj.name = "james" // 这里改变了name之后忘了调用notify方法，所以需要监听name属性变化，自动调用notify方法
```

## **监听对象的变化**

那么我们接下来就可以通过之前学习的方式来监听对象的变量：

方式一：通过 Object.defineProperty的方式（vue2采用的方式）；

方式二：通过new Proxy的方式（vue3采用的方式）；

```javascript
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.push(fn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


const obj = {
  name: "why",
  age: 18
}



// 设置一个专门执行响应式函数的一个函数
const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()
}

// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      dep.notify()
    },
    get: function() {
      return value
    }
  })
})


// 方式二: new Proxy() -> Vue3


watchFn(function foo() {
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
  console.log("foo function")
})


watchFn(function bar() {
  console.log("bar:", obj.name + " hello")
  console.log("bar:", obj.age + 10)
  console.log("bar function")
})

// 修改obj的属性
console.log("name发生变化-----------------------")
obj.name = "kobe"

console.log("age发生变化-----------------------")
obj.age = 20

console.log("name发生变化-----------------------")
obj.name = "james"
```

## **对象的依赖管理**

我们目前是创建了一个Depend对象，用来管理对于name变化需要监听的响应函数：

但是实际开发中我们会有不同的对象，另外会有不同的属性需要管理；

我们如何可以使用一种数据结构来管理不同对象的不同依赖关系呢？

在前面我们刚刚学习过WeakMap，并且在学习WeakMap的时候我讲到了后面通过WeakMap如何管理这种响应式的数据依赖：

![image-20230603120954445](http://139.196.79.103:9001/myimages/imgs/image-20230603120954445.png)

之前我们将obj对象的name和age属性的变化放在同一个dep对象里面，这样假如说：只修改name的情况下，但是有个函数没有依赖name，但是该函数也会被执行，类似下面这样。

```javascript
watchFn(function foo() {
  console.log("foo function")
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
})


watchFn(function bar() {
  console.log("bar function")
  console.log("bar:", obj.age + 10)
})
```

所以我们应该是name属性有自己的dep对象，age属性也有自己的dep对象。

但是，对于这样的数据结构该怎么管理呢？因为除了obj对象还有别的对象，比如user对象，user对象里面也有自己的属性需要监听。

我们可以使用WeakMap来实现，有一个objMap对象，obj对象对应map1对象，user对象对应map2对象，map1和map2对象里面放的是各自属性对应的dep对象，假如obj对象的name属性发生变化了，我们就可以通过调用objMap.get(obj).get(name).notify()来监听name的变化。

## **对象依赖管理的实现**

```javascript
/**
  * 1.dep对象数据结构的管理(最难理解)
    * 每一个对象的每一个属性都会对应一个dep对象
    * 同一个对象的多个属性的dep对象是存放一个map对象中
    * 多个对象的map对象, 会被存放到一个objMap的对象中
  * 2.依赖收集: 当执行get函数, 自动的添加fn函数
 */

class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.push(fn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


const obj = {
  name: "why",
  age: 18
}



// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}


// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get: function() {
      // 拿到obj -> key
      // console.log("get函数中:", obj, key)
      // 找到对应的obj对象的key对应的dep对象
      const dep = getDepend(obj, key)
      dep.addDepend(reactiveFn)

      return value
    }
  })
})


// 方式二: new Proxy() -> Vue3

watchFn(function foo() {
  console.log("foo function")
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
})


watchFn(function bar() {
  console.log("bar function")
  console.log("bar:", obj.age + 10)
})

// 修改obj的属性
// console.log("name发生变化-----------------------")
// obj.name = "kobe"  // name发生变化只会执行foo函数
console.log("age发生变化-----------------------")
obj.age = 20 
```

## **对Depend重构**

但是这里有两个问题：

问题一：如果函数中有用到两次key，比如name，那么这个函数会被收集两次；

问题二：我们并不希望将添加reactiveFn放到get中，因为它是属于Dep的行为；

所以我们需要对Depend类进行重构：

解决问题一的方法：不使用数组，而是使用Set；

解决问题二的方法：添加一个新的方法，用于收集依赖；

```javascript
class Depend {
  constructor() {
    this.reactiveFns = new Set() // 改成Set，它的key不能重复
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() { // 增加depend方法
    if (reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

const obj = {
  name: "why",
  age: 18,
  address: "广州市"
}

// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get: function() {
      // 拿到obj -> key
      // console.log("get函数中:", obj, key)
      // 找到对应的obj对象的key对应的dep对象
      const dep = getDepend(obj, key)
      // dep.addDepend(reactiveFn)
      dep.depend()

      return value
    }
  })
})


// 方式二: new Proxy() -> Vue3


// ========================= 业务代码 ========================
watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age) // 使用Set，这里依赖了2次age，但是只会执行一次
})

// watchFn(function() {
//   console.log(obj.address)
// })

// watchFn(function() {
//   console.log(obj.age)
//   console.log(obj.address)
// })

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"
```

## 多个对象响应式和Proxy代理

多个对象响应式

```javascript
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if (reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

// 方案一: Object.defineProperty() -> Vue2
function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
  
    Object.defineProperty(obj, key, {
      set: function(newValue) {
        value = newValue
        const dep = getDepend(obj, key)
        dep.notify()
      },
      get: function() {
        // 拿到obj -> key
        // console.log("get函数中:", obj, key)
        // 找到对应的obj对象的key对应的dep对象
        const dep = getDepend(obj, key)
        // dep.addDepend(reactiveFn)
        dep.depend()
  
        return value
      }
    })
  })  
  return obj
}

// 方式二: new Proxy() -> Vue3


// ========================= 业务代码 ========================
const obj = reactive({
  name: "why",
  age: 18,
  address: "广州市"
})

watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age)
})

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"


console.log("=============== user =================")
const user = reactive({
  nickname: "abc",
  level: 100
})

watchFn(function() {
  console.log("nickname:", user.nickname)
  console.log("level:", user.level)
})

user.nickname = "cba"
```

监听对象Proxy

```javascript
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if (reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

// 方案一: Object.defineProperty() -> Vue2
// function reactive(obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key]
  
//     Object.defineProperty(obj, key, {
//       set: function(newValue) {
//         value = newValue
//         const dep = getDepend(obj, key)
//         dep.notify()
//       },
//       get: function() {
//         // 拿到obj -> key
//         // console.log("get函数中:", obj, key)
//         // 找到对应的obj对象的key对应的dep对象
//         const dep = getDepend(obj, key)
//         // dep.addDepend(reactiveFn)
//         dep.depend()
  
//         return value
//       }
//     })
//   })  
//   return obj
// }

// 方式二: new Proxy() -> Vue3
function reactive(obj) {
  const objProxy = new Proxy(obj, {
    set: function(target, key, newValue, receiver) {
      // target[key] = newValue
      Reflect.set(target, key, newValue, receiver)
      const dep = getDepend(target, key)
      dep.notify()
    },
    get: function(target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    }
  })
  return objProxy
}


// ========================= 业务代码 ========================
const obj = reactive({
  name: "why",
  age: 18,
  address: "广州市"
})

watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age)
})

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"


console.log("=============== user =================")
const user = reactive({
  nickname: "abc",
  level: 100
})

watchFn(function() {
  console.log("nickname:", user.nickname)
  console.log("level:", user.level)
})

user.nickname = "cba"
```

Vue2主要是通过Object.defineProerty的方式来实现对象属性的监听；

Vue3主要是通过Proxy来监听数据的变化以及收集相关的依赖的。
