---
outline: deep
---

## 异步代码的困境

**在ES6出来之后，有很多关于Promise的讲解、文章，也有很多经典的书籍讲解Promise**

虽然等你学会Promise之后，会觉得Promise不过如此；

但是在初次接触的时候都会觉得这个东西不好理解；

**那么这里我从一个实际的例子来作为切入点：**

我们调用一个函数，这个函数中发送网络请求（我们可以用定时器来模拟）；

如果发送网络请求成功了，那么告知调用者发送成功，并且将相关数据返回过去；

如果发送网络请求失败了，那么告知调用者发送失败，并且告知错误信息；

```javascript
// 1.设计这样的一个函数
function execCode(counter, successCallback, failureCallback) {
    // 异步任务
    setTimeout(() => {
        if (counter > 0) { // counter可以计算的情况 
            let total = 0
            for (let i = 0; i < counter; i++) {
                total += i
            }
            // 在某一个时刻只需要回调传入的函数
            successCallback(total)
        } else { // 失败情况, counter有问题
            failureCallback(`${counter}值有问题`)
        }
    }, 3000)
}

// 2.ES5之前,处理异步的代码都是这样封装
execCode(100, (value) => {
    console.log("本次执行成功了:", value)
}, (err) => {
    console.log("本次执行失败了:", err)
})
```

设计这样一个函数并不好设计，很难形成一个统一规范；调用者也不好调用，需要知道是怎么设计才能调用。比如把counter参数放在中间，就不一样。

## Promise解决异步处理

```javascript
function execCode(counter) {
    const promise = new Promise((resolve, reject) => {
        // 异步任务
        setTimeout(() => {
            if (counter > 0) { // counter可以计算的情况 
                let total = 0
                for (let i = 0; i < counter; i++) {
                    total += i
                }
                // 成功的回调
                resolve(total)
            } else { // 失败情况, counter有问题
                // 失败的回调
                reject(`${counter}有问题`)
            }
        }, 3000)
    })

    return promise
}


const promise = execCode(100)
promise.then((value) => {
    console.log("成功有了结果: ", value)
})
promise.catch((err) => {
    console.log("失败有了错误: ", err)
})

const promise2 = execCode(-100)
promise2.then(value => {
    console.log("成功:", value)
})
promise2.catch(err => {
    console.log("失败:", err)
})

// 执行一次
execCode(255).then(value => {
    console.log("成功:", value)
}).catch(err => {
    console.log("失败:", err)
})
```

## **Promise的代码结构**

**我们来看一下Promise代码结构：**

![image-20230121081855236](http://139.196.79.103:9001/myimages/imgs/image-20230121081855236.png)

**上面Promise使用过程，我们可以将它划分成三个状态：**

*待定（pending）*: 初始状态，既没有被兑现，也没有被拒绝；

当执行executor中的代码时，处于该状态；

*已兑现（fulfilled）*: 意味着操作成功完成；

执行了resolve时，处于该状态，Promise已经被兑现；

*已拒绝（rejected）*: 意味着操作失败；

执行了reject时，处于该状态，Promise已经被拒绝；

```javascript
// 1.创建一个Promise对象
const promise = new Promise((resolve, reject) => {
    // 注意: Promise的状态一旦被确定下来, 就不会再更改, 也不能再执行某一个回调函数来改变状态
    // 1.待定状态 pending
    console.log("111111")
    console.log("222222")
    console.log("333333")

    // 2.兑现状态 fulfilled
    resolve()

    // 3.拒绝状态 rejected
    reject() // 这里不会触发catch的回调函数，因为状态已经确定了
})

promise.then(value => {
    console.log("成功的回调")
}).catch(err => {
    console.log("失败的回调")
})
```

## **Executor**

**Executor是在创建Promise时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数：**

```javascript
// executor
const promise2 = new Promise((resolve, reject) => {

})
```

**通常我们会在Executor中确定我们的Promise状态：**

通过resolve，可以兑现（fulfilled）Promise的状态，我们也可以称之为已决议（resolved）；

通过reject，可以拒绝（reject）Promise的状态；

**这里需要注意：一旦状态被确定下来，Promise的状态会被 锁死，该Promise的状态是不可更改的**

在我们调用resolve的时候，如果resolve传入的值本身不是一个Promise，那么会将该Promise的状态变成 兑现（fulfilled）；

在之后我们去调用reject时，已经不会有任何的响应了（并不是这行代码不会执行，而是无法改变Promise状态）；

## **resolve不同值的区别**

**情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数；**

```javascript
const promise = new Promise((resolve, reject) => {
    // 1.普通值
    resolve([
        {name: "macbook", price: 9998, intro: "有点贵"},
        {name: "iPhone", price: 9.9, intro: "有点便宜"},
    ])
})

promise.then(res => {
    console.log("then中拿到结果:", res)
})
```

**情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态：**

```javascript
const p = new Promise((resolve) => {
    // setTimeout(resolve, 2000)
    setTimeout(() => {
        resolve("p的resolve")
    }, 2000)
})

const promise = new Promise((resolve, reject) => {
    // 2.resolve(promise)
    // 如果resolve的值本身Promise对象, 那么当前的Promise的状态会有传入的Promise来决定
    resolve(p)
})

promise.then(res => {
    console.log("then中拿到结果:", res)
})
```

**情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结果来决定Promise的状态：**

```javascript
const promise = new Promise((resolve, reject) => {

// 3.resolve(thenable对象)
resolve({
        name: "kobe",
        then: function(resolve) {
            resolve(11111)
        }
    })
})

promise.then(res => {
    console.log("then中拿到结果:", res)
})
```

## **then方法 – 接受两个参数**

**then方法是Promise对象上的一个方法（实例方法）：**

它其实是放在Promise的原型上的 Promise.prototype.then

**then方法接受两个参数：**

fulfilled的回调函数：当状态变成fulfilled时会回调的函数；

reject的回调函数：当状态变成reject时会回调的函数；

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("success")
    // reject("failure")
})

// 推荐这种写法
promise.then(res => {
}).catch(err => {
})

// 1.then参数的传递方法: 可以传递两个参数
// 这种写法也是可以的
promise.then(res => {
    console.log("成功回调~", res)
}, err => {
    console.log("失败回调~", err)
})
```

## **then方法 – 多次调用**

**一个Promise的then方法是可以被多次调用的：**

每次调用我们都可以传入对应的fulfilled回调；

当Promise的状态变成fulfilled的时候，这些回调函数都会被执行；

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("success")
    // reject("failure")
})

promise.then(res => {
    console.log("成功回调~", res)
})
promise.then(res => {
    console.log("成功回调~", res)
})
promise.then(res => {
    console.log("成功回调~", res)
})
promise.then(res => {
    console.log("成功回调~", res)
})
```

## **catch方法 – 多次调用**

**catch方法也是Promise对象上的一个方法（实例方法）：**

它也是放在Promise的原型上的 Promise.prototype.catch

**一个Promise的catch方法是可以被多次调用的：**

每次调用我们都可以传入对应的reject回调；

当Promise的状态变成reject的时候，这些回调函数都会被执行；

```javascript
const promise = new Promise((resolve, reject) => {
    reject("failure")
})

promise.then(res => {
    console.log("成功的回调:", res)
}).catch(err => {
    console.log("失败的回调:", err)
})

promise.catch(err => {
    console.log("失败的回调:", err)
})
promise.catch(err => {
    console.log("失败的回调:", err)
})
promise.catch(err => {
    console.log("失败的回调:", err)
})
promise.catch(err => {
    console.log("失败的回调:", err)
})
```

## **then方法 – 返回值**

**then方法本身是有返回值的，它的返回值是一个Promise，所以我们可以进行如下的链式调用：**

但是then方法返回的Promise到底处于什么样的状态呢？

**Promise有三种状态，那么这个Promise处于什么状态呢？**

当then方法中的回调函数本身在执行的时候，那么它处于pending状态；

当then方法中的回调函数返回一个结果时；

情况一：返回一个普通的值，那么它处于fulfilled状态，并且会将结果作为resolve的参数；

情况二：返回一个Promise；

情况三：返回一个thenable值；

当then方法抛出一个异常时，那么它处于reject状态；

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("aaaaaaa")
    // reject()
})

// 1.then方法是返回一个新的Promise, 这个新Promise的决议是等到then方法传入的回调函数有返回值时, 进行决议
// Promise本身就是支持链式调用
// then方法是返回一个新的Promise, 链式中的then是在等待这个新的Promise有决议之后执行的
promise.then(res => {
    console.log("第一个then方法:", res) // aaaaaaa
    return "bbbbbbbb" // 本质上是resolve("bbbbbbbb")
}).then(res => {
    console.log("第二个then方法:", res) // bbbbbbbb
    return "cccccccc"
}).then(res => {
    console.log("第三个then方法:", res) // cccccccc
})

promise.then(res => {
    console.log("添加第二个then方法:", res)
})

// 2.then方法传入回调函数的返回值类型
const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("why")
    }, 3000)
})

promise.then(res => {
    console.log("第一个Promise的then方法:", res)
    // 1.普通值
    // return "bbbbbbb" 相当于resolve("bbbbbbb")
    // 2.新的Promise
    // return newPromise 相当于resolve(newPromise)
    // 3.thenable的对象
    return {
        then: function(resolve) {
            resolve("thenable")
        }
    }
}).then(res => {
    console.log("第二个Promise的then方法:", res) // thenable
})
```

## **catch方法 – 返回值**

**事实上catch方法也是会返回一个Promise对象的，所以catch方法后面我们可以继续调用then方法或者catch方法：**

```javascript
const promise = new Promise((resolve, reject) => {
    // reject("error: aaaaa")
    resolve("aaaaaa")
})

// 1.catch方法也会返回一个新的Promise
promise.catch(err => {
    console.log("catch回调:", err)
    return "bbbbb"
}).then(res => {
    console.log("then第一个回调:", res) // bbbbb
    return "ccccc"
}).then(res => {
    console.log("then第二个回调:", res) // ccccc
})
```

下面代码在promise里面reject了，那么then方法都不会触发，会调用catch，所以会打印 catch回调被执行: error: aaaaa，在catch之前有4个promise，它会捕获最近的一个reject，但是在then方法里面没有办法写reject，我们可以使用throw抛出一个错误。

```javascript
const promise = new Promise((resolve, reject) => {
    reject("error: aaaaa")
})

// 2.catch方法的执行时机
promise.then(res => {
    console.log("then第一次回调:", res)
    throw new Error("第二个Promise的异常error") 
    return "bbbbbb"
}).then(res => {
    console.log("then第二次回调:", res)
    throw new Error("第三个Promise的异常error")
}).then(res => {
    console.log("then第三次回调:", res)
}).catch(err => {
    console.log("catch回调被执行:", err) // "error: aaaaa" 刚开始就reject了
})
```

```javascript
const promise = new Promise((resolve, reject) => {
    // reject("error: aaaaa")
    resolve("aaaaaa")
})

// 2.catch方法的执行时机
promise.then(res => {
    console.log("then第一次回调:", res) // 这里会打印
    // throw new Error("第二个Promise的异常error") 
    return "bbbbbb"
}).then(res => {
    console.log("then第二次回调:", res) // 这里也会打印
    throw new Error("第三个Promise的异常error")
}).then(res => {
    console.log("then第三次回调:", res) // 这里不会打印，上一个then返回的promise抛出错误了，相当于reject
}).catch(err => {
    console.log("catch回调被执行:", err) // 这里第一个reject了就打印 第三个Promise的异常error
})
```

## **finally方法**

**finally是在ES9（ES2018）中新增的一个特性：表示无论Promise对象无论变成fulfilled还是rejected状态，最终都会被执行**

**的代码。**

**finally方法是不接收参数的，因为无论前面是fulfilled状态，还是rejected状态，它都会执行。**

```javascript
const promise = new Promise((resolve, reject) => {
    // pending

    // fulfilled
    resolve("aaaa")

    // rejected
    // reject("bbbb")
})

promise.then(res => {
    console.log("then:", res)
    // foo()
}).catch(err => {
    console.log("catch:", err)
    // foo()
}).finally(() => {
    console.log("哈哈哈哈")
    console.log("呵呵呵呵")
})


function foo() {
    console.log("哈哈哈哈")
    console.log("呵呵呵呵")
}
```

## Promise类方法 - resolve方法

**前面我们学习的then、catch、finally方法都属于Promise的实例方法，都是存放在Promise的prototype上的。**

下面我们再来学习一下Promise的类方法。

**有时候我们已经有一个现成的内容了，希望将其转成Promise来使用，这个时候我们可以使用 Promise.resolve 方法来完成。**

Promise.resolve的用法相当于new Promise，并且执行resolve操作：

```javascript
// 实例方法
// const promise = new Promise((resolve) => {
//   // 进行一系列的操作
//   resolve("result")
// })
// promise.catch

// 类方法
const studentList = []
const promise = Promise.resolve(studentList)

promise.then(res => {
    console.log("then结果:", res)
})
// Promise.resolve("Hello World")
// 相当于
// new Promise((resolve) => {
//   resolve("Hello World")
// })
```

**resolve参数的形态：**

情况一：参数是一个普通的值或者对象

情况二：参数本身是Promise

情况三：参数是一个thenable

## Promise类方法 - **reject方法**

**reject方法类似于resolve方法，只是会将Promise对象的状态设置为reject状态。**

**Promise.reject的用法相当于new Promise，只是会调用reject：**

```javascript
// 类方法
const promise = Promise.reject("rejected error")
promise.catch(err => {
    console.log("err:", err)
})
// 相当于
// new Promise((_, reject) => {
//   reject("rejected error")
// })
```

**Promise.reject传入的参数无论是什么形态，都会直接作为reject状态的参数传递到catch的。**

## Promise类方法 - **all方法**

**另外一个类方法是Promise.all：**

它的作用是将多个Promise包裹在一起形成一个新的Promise；

新的Promise状态由包裹的所有Promise共同决定：

当所有的Promise状态变成fulfilled状态时，新的Promise状态为fulfilled，并且会将所有Promise的返回值组成一个数组；

当有一个Promise状态为reject时，新的Promise状态为reject，并且会将第一个reject的返回值作为参数；

```javascript
// 创建三个Promise
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("p1 resolve")
        reject("p1 reject error")
    }, 3000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p2 resolve")
    }, 2000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p3 resolve")
    }, 5000)
})

// all:全部/所有
Promise.all([p1, p2, p3]).then(res => {
    console.log("all promise res:", res) // 三个都是resolve的情况下会返回一个数组
}).catch(err => {
    console.log("all promise err:", err) // 中间只要有一个reject，最终会变成reject
})
```

## Promise类方法 - allSettled方法

**all方法有一个缺陷：当有其中一个Promise变成reject状态时，新Promise就会立即变成对应的reject状态。**

那么对于resolved的，以及依然处于pending状态的Promise，我们是获取不到对应的结果的；

**在ES11（ES2020）中，添加了新的API Promise.allSettled：**

该方法会在所有的Promise都有结果（settled），无论是fulfilled，还是rejected时，才会有最终的状态；

并且这个Promise的结果一定是fulfilled的；

```javascript
// 创建三个Promise
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("p1 resolve")
        reject("p1 reject error")
    }, 3000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p2 resolve")
    }, 2000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p3 resolve")
    }, 5000)
})

// 类方法: allSettled
Promise.allSettled([p1, p2, p3]).then(res => {
    console.log("all settled:", res)
})

// 最终会打印
[
    {status: 'rejected', reason: 'p1 reject error'},
    {status: 'fulfilled', value: 'p2 resolve'},
    {status: 'fulfilled', value: 'p3 resolve'}
]
```

## **race方法**

**如果有一个Promise有了结果，我们就希望决定最终新Promise的状态，那么可以使用race方法：**

race是竞技、竞赛的意思，表示多个Promise相互竞争，谁先有结果，那么就使用谁的结果；

```javascript
// 创建三个Promise
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p1 resolve")
        // reject("p1 reject error")
    }, 3000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("p2 resolve")
        reject("p2 reject error")
    }, 2000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p3 resolve")
    }, 5000)
})


// 类方法: race方法
// 特点: 会等到一个Promise有结果(无论这个结果是fulfilled还是rejected)
Promise.race([p1, p2, p3]).then(res => {
    console.log("race promise:", res)
}).catch(err => {
    console.log("race promise err:", err) // p2 reject error 最先有结果
})
```

## **any方法**

**any方法是ES12中新增的方法，和race方法是类似的：**

any方法会等到一个fulfilled状态，才会决定新Promise的状态；

```javascript
// 创建三个Promise
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p1 resolve")
    }, 3000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("p2 reject error")
    }, 2000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p3 resolve")
    }, 5000)
})

// 类方法: any方法
Promise.any([p1, p2, p3]).then(res => {
    console.log("any promise res:", res) // p1 resolve 返回第一个resolve
})
```

如果所有的Promise都是reject的，那么也会等到所有的Promise都变成rejected状态；

**如果所有的Promise都是reject的，那么会报一个AggregateError的错误。**

```javascript
// 创建三个Promise
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("p1 resolve")
        reject("p1 reject error")
    }, 3000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("p2 resolve")
        reject("p2 reject error")
    }, 2000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("p3 resolve")
        reject("p3 reject error")
    }, 5000)
})

// 类方法: any方法
Promise.any([p1, p2, p3]).then(res => {
    console.log("any promise res:", res)
}).catch(err => {
    console.log("any promise err:", err) // any promise err: AggregateError: All promises were rejected
})

```

## 手写Promise

### 结构的设计

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED
        this.value = value // 保留传进来的参数1111
        console.log("resolve被调用")
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason // 保留传进来的参数2222
        console.log("reject被调用")
      }
    }

    executor(resolve, reject)
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  resolve(1111) // 状态设计是为了保证resolve调用，后面的reject就不生效了；反之，如果reject先调用，resolve就不生效
  reject(2222)
})
```

先调用resolve状态就变成了fulfilled，执行reject，状态不是pending，代码不会执行。

### then方法设计

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED
        queueMicrotask(() => {
          this.value = value
          this.onFulfilled(this.value)
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        queueMicrotask(() => {
          this.reason = reason
          this.onRejected(this.reason)
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // reject(2222)
  resolve(1111)
})

// 调用then方法
promise.then(res => {
  console.log("res:", res)
}, err => {
  console.log("err:", err)
})
```

这里使用了queueMicrotask这个让要执行的代码变成微任务，就会延后执行。为什么要延后执行呢？

假如说不用queueMicrotask，代码执行顺序是什么呢？

```javascript
class HYPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined

        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_FULFILLED
                this.value = value
                this.onFulfilled(this.value)
            }
        }

        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                this.reason = reason
                this.onRejected(this.reason)
            }
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        this.onFulfilled = onFulfilled
        this.onRejected = onRejected
    }
}

const promise = new HYPromise((resolve, reject) => {
    console.log("状态pending")
    // reject(2222)
    resolve(1111)
})

// 调用then方法
promise.then(res => {
    console.log("res:", res)
}, err => {
    console.log("err:", err)
})
```

执行new HYPromise会执行resolve方法，那么就会执行this.onFulfilled方法，但是这会根本没有这个方法，直接报错；所以需要保证执行this.onFulfilled方法的时候，promise.then方法已经执行了才行。

### then方法优化一

当前的then方法如果只调用一次是没有问题，但是如果调用多次，那么只会执行最后一次的调用。因为下一次的执行会把上一次的覆盖掉。

```javascript
// 调用then方法
promise.then(res => {
  console.log("res:", res)
}, err => {
  console.log("err:", err)
})

promise.then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})
```

如果调用多次，是应该将调用的函数存到数组里面，然后执行resolve或reject方法的时候，遍历数组执行里面的每个函数。

还有个问题，当promise状态确定之后，使用定时器延迟执行，那么这个时候是不会执行的。因为resolve或reject方法是要状态为pending的情况下才会执行。

那么就需要在then方法根据状态来进行调用。

```javascript
// 在确定Promise状态之后, 再次调用then
setTimeout(() => {
  promise.then(res => {
    console.log("res3:", res)
  }, err => {
    console.log("err3:", err)
  })
}, 1000)
```

针对上面两个问题，对代码进行优化。

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return // 状态不是pending就返回，延迟执行的在then方法中执行
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => { // 这个是针对多次调用的优化
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    // 1.如果在then调用的时候, 状态已经确定下来 这个是针对状态确定下来的优化
    if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value)
    }
    if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason)
    }

    // 2.将成功回调和失败的回调放到数组中
    if (this.status === PROMISE_STATUS_PENDING) {
      this.onFulfilledFns.push(onFulfilled)
      this.onRejectedFns.push(onRejected)
    }
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  resolve(1111) // resolved/fulfilled
  reject(2222)
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
}, err => {
  console.log("err:", err)
})

promise.then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})

// const promise = new Promise((resolve, reject) => {
//   resolve("aaaaa")
// })

// 在确定Promise状态之后, 再次调用then
setTimeout(() => {
  promise.then(res => {
    console.log("res3:", res)
  }, err => {
    console.log("err3:", err)
  })
}, 1000)
```

### then方法优化二

需要支持then的链式调用，根据上一次then方法的返回结果决定下一个then。

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
      // 返回一个新的promise
    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        // try {
        //   const value = onFulfilled(this.value)
        //   resolve(value)
        // } catch(err) {
        //   reject(err)
        // }
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        // try {
        //   const reason = onRejected(this.reason)
        //   resolve(reason)
        // } catch(err) {
        //   reject(err)
        // }
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => { // 这里改造成回调函数，拿到上面返回的this.value
          // try {
          //   const value = onFulfilled(this.value)
          //   resolve(value)
          // } catch(err) {
          //   reject(err)
          // }
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          // try {
          //   const reason = onRejected(this.reason)
          //   resolve(reason)
          // } catch(err) {
          //   reject(err)
          // }
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // resolve(1111) // resolved/fulfilled
  reject(2222)
  // throw new Error("executor error message")
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
  return "aaaa"
  // throw new Error("err message")
}, err => {
  console.log("err1:", err)
  return "bbbbb"
  // throw new Error("err message")
}).then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})
```

### catch方法设计

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // 默认函数抛出异常
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledFns.push(() => { // 这里需要判空
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    this.then(undefined, onRejected) // 可以直接调用then方法，第一个参数传undefined
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // resolve(1111) // resolved/fulfilled
  reject(2222)
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res:", res) 
}).catch(err => {
  console.log("err:", err)
})
```

```javascript
promise.then(res => {
  console.log("res:", res) 
})
这里没有传第2个参数，相当于undefined, 需要给一个默认函数，抛出一个异常，调用catch方法的时候才会触发reject
```

### finally方法设计

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected
	
    // 当调用catch方法时，onFulfilled为undefined，需要将值返回出去，才能执行finally
    const defaultOnFulfilled = value => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    // 需要将catch方法的返回值传递出去
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  resolve(1111) // resolved/fulfilled
  // reject(2222)
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
  return "aaaaa"
}).then(res => {
  console.log("res2:", res)
}).catch(err => {
  console.log("err:", err)
}).finally(() => {
  console.log("finally")
})
```

### resolve和reject方法

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = value => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  // 直接调用HYPromise即可
  static resolve(value) {
    return new HYPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new HYPromise((resolve, reject) => reject(reason))
  }
}

HYPromise.resolve("Hello World").then(res => {
  console.log("res:", res)
})

HYPromise.reject("Error Message").catch(err => {
  console.log("err:", err)
})
```

### all和allSettled方法

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = value => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  static resolve(value) {
    return new HYPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new HYPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    // 问题关键: 什么时候要执行resolve, 什么时候要执行reject
    // 只要有一个reject就会reject，只有所有都是resolve才会resolve
    return new HYPromise((resolve, reject) => {
      const values = []
      promises.forEach(promise => {
        promise.then(res => {
          values.push(res)
          if (values.length === promises.length) {
            resolve(values)
          }
        }, err => {
          reject(err)
        })
      })
    })
  }
  
  // 不管成功失败，都是resolve，但是要等到每个promise都有结果
  static allSettled(promises) {
    return new HYPromise((resolve) => {
      const results = []
      promises.forEach(promise => {
        promise.then(res => {
          results.push({ status: PROMISE_STATUS_FULFILLED, value: res})
          if (results.length === promises.length) {
            resolve(results)
          }
        }, err => {
          results.push({ status: PROMISE_STATUS_REJECTED, reason: err})
          if (results.length === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }
}

const p1 = new Promise((resolve) => {
  setTimeout(() => { resolve(1111) }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => { reject(2222) }, 2000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => { resolve(3333) }, 3000)
})
// HYPromise.all([p1, p2, p3]).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

HYPromise.allSettled([p1, p2, p3]).then(res => {
  console.log(res)
})
```

### race和any方法

```javascript
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = value => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  static resolve(value) {
    return new HYPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new HYPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    // 问题关键: 什么时候要执行resolve, 什么时候要执行reject
    return new HYPromise((resolve, reject) => {
      const values = []
      promises.forEach(promise => {
        promise.then(res => {
          values.push(res)
          if (values.length === promises.length) {
            resolve(values)
          }
        }, err => {
          reject(err)
        })
      })
    })
  }

  static allSettled(promises) {
    return new HYPromise((resolve) => {
      const results = []
      promises.forEach(promise => {
        promise.then(res => {
          results.push({ status: PROMISE_STATUS_FULFILLED, value: res})
          if (results.length === promises.length) {
            resolve(results)
          }
        }, err => {
          results.push({ status: PROMISE_STATUS_REJECTED, value: err})
          if (results.length === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static race(promises) {
    return new HYPromise((resolve, reject) => {
      promises.forEach(promise => {
        // promise.then(res => {
        //   resolve(res)
        // }, err => {
        //   reject(err)
        // })
        promise.then(resolve, reject)
      })
    })
  } 

  static any(promises) {
    // resolve必须等到有一个成功的结果
    // reject所有的都失败才执行reject
    const reasons = []
    return new HYPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, err => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons))
          }
        })
      })
    })
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => { reject(1111) }, 3000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => { reject(2222) }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => { reject(3333) }, 3000)
})


// HYPromise.race([p1, p2, p3]).then(res => {
//   console.log("res:", res)
// }).catch(err => {
//   console.log("err:", err)
// })

HYPromise.any([p1, p2, p3]).then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err.errors)
})
```

