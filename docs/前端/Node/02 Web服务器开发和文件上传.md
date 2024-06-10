---
outline: deep
---

## **认识Stream**

**什么是Stream（小溪、小河，在编程中通常翻译为流）呢？**

我们的第一反应应该是流水，源源不断的流动；

程序中的流也是类似的含义，我们可以想象当我们从一个文件中读取数据时，文件的二进制（字节）数据会源源不断的被读

取到我们程序中；

而这个一连串的字节，就是我们程序中的流；

**所以，我们可以这样理解流：**

是连续字节的一种表现形式和抽象概念；

流应该是可读的，也是可写的；

**在之前学习文件的读写时，我们可以直接通过 readFile或者 writeFile方式读写文件，为什么还需要流呢？**

直接读写文件的方式，虽然简单，但是无法控制一些细节的操作；

比如从什么位置开始读、读到什么位置、一次性读取多少个字节；

读到某个位置后，暂停读取，某个时刻恢复继续读取等等；

或者这个文件非常大，比如一个视频文件，一次性全部读取并不合适；

## **文件读写的Stream**

**事实上Node中很多对象是基于流实现的：**

http模块的Request和Response对象；

**官方文档：另外所有的流都是EventEmitter的实例。**

**那么在Node中都有哪些流呢？**

**Node.js中有四种基本流类型：**

Writable：可以向其写入数据的流（例如 fs.createWriteStream()）。

Readable：可以从中读取数据的流（例如 fs.createReadStream()）。

Duplex：同时为Readable和Writable（例如 net.Socket）。

Transform：Duplex可以在写入和读取数据时修改或转换数据的流（例如zlib.createDeflate()）。

**这里我们通过fs的操作，讲解一下Writable、Readable，另外两个大家可以自行学习一下。**

## **Readable**

**之前我们读取一个文件的信息：**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240108145451670.png" alt="image-20240108145451670" style="zoom:67%;" />

**这种方式是一次性将一个文件中所有的内容都读取到程序（内存）中，但是这种读取方式就会出现我们之前提到的很多问题：**

文件过大、读取的位置、结束的位置、一次读取的大小；

**这个时候，我们可以使用 createReadStream，我们来看几个参数，更多参数可以参考官网：**

start：文件读取开始的位置；

end：文件读取结束的位置；

highWaterMark：一次性读取字节的长度，默认是64kb；

```javascript
const fs = require('fs')

// 1.一次性读取
// 缺点一: 没有办法精准控制从哪里读取, 读取什么位置.
// 缺点二: 读取到某一个位置的, 暂停读取, 恢复读取.
// 缺点三: 文件非常大的时候, 多次读取.
// fs.readFile('./aaa.txt', (err, data) => {
//   console.log(data)
// })

// 2.通过流读取文件
// 2.1. 创建一个可读流
// start: 从什么位置开始读取
// end: 读取到什么位置后结束(包括end位置字节)
const readStream = fs.createReadStream('./aaa.txt', {
 start: 8,
 end: 22,
 highWaterMark: 3
})
// 可以通过监听data事件，获取读取到的数据
readStream.on('data', (data) => {
  console.log(data.toString())

  readStream.pause() // 暂停

  setTimeout(() => {
    readStream.resume() // 恢复
  }, 2000)
})
```

