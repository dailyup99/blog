---
outline: deep
---

## **认识Stream**

**什么是Stream（小溪、小河，在编程中通常翻译为流）呢？**

我们的第一反应应该是流水，源源不断的流动；

程序中的流也是类似的含义，我们可以想象当我们从一个文件中读取数据时，文件的二进制（字节）数据会源源不断的被读取到我们程序中；

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
 highWaterMark: 3 // 每次读取3个字节
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

## 可读流的其他事件

```javascript
const fs = require('fs')

// 1.通过流读取文件
const readStream = fs.createReadStream('./aaa.txt', {
 start: 8,
 end: 22,
 highWaterMark: 3
})


// 2.监听读取到的数据
readStream.on('data', (data) => {
  console.log(data.toString())
})

// 3.补充其他的事件监听
readStream.on('open', (fd) => {
  console.log('通过流将文件打开~', fd)
})

readStream.on('end', () => {
  console.log('已经读取到end位置')
})

readStream.on('close', () => {
  console.log('文件读取结束, 并且被关闭')
})
```

## **Writable**

**之前我们写入一个文件的方式是这样的：**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240617232521594.png" alt="image-20240617232521594" style="zoom:67%;" />

**这种方式相当于一次性将所有的内容写入到文件中，但是这种方式也有很多问题：**

比如我们希望一点点写入内容，精确每次写入的位置等；

**这个时候，我们可以使用 createWriteStream，我们来看几个参数，更多参数可以参考官网：**

flags：默认是w，如果我们希望是追加写入，可以使用 a或者 a+；

start：写入的位置；

## **Writable的使用**

**我们进行一次简单的写入**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240617232912162.png" alt="image-20240617232912162" style="zoom:67%;" />

**你可以监听open事件：**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240617232929485.png" alt="image-20240617232929485" style="zoom:67%;" />

## **close的监听**

**我们会发现，我们并不能监听到 close 事件：**

这是因为写入流在打开后是不会自动关闭的；

我们必须手动关闭，来告诉Node已经写入结束了；

并且会发出一个 finish 事件的；

**另外一个非常常用的方法是 end：end方法相当于做了两步操作： write传入的数据和调用close方法；**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240617233058882.png" alt="image-20240617233058882" style="zoom:67%;" />

```javascript
const fs = require('fs')

// 1.一次性写入内容
// fs.writeFile('./bbb.txt', 'hello world', {
//   encoding: 'utf-8',
//   flag: 'a+'
// }, (err) => {
//   console.log('写入文件结果:', err)
// })

// 2.创建一个写入流
const writeStream = fs.createWriteStream('./ccc.txt', {
  flags: 'a'
})

writeStream.on('open', (fd) => {
  console.log('文件被打开', fd)
})

writeStream.write('coderwhy')
writeStream.write('aaaa')
writeStream.write('bbbb', (err) => {
  console.log("写入完成:", err)
})

writeStream.on('finish', () => {
  console.log('写入完成了')
})

writeStream.on('close', () => {
  console.log('文件被关闭~')
})

// 3.写入完成时, 需要手动去掉用close方法
// writeStream.close()

// 4.end方法: 
// 操作一: 将最后的内容写入到文件中, 并且关闭文件
// 操作二: 关闭文件
writeStream.end('哈哈哈哈')
```

## 可写流的start属性

```javascript
const fs = require('fs')

const writeStream = fs.createWriteStream('./ddd.txt', {
  // mac上面是没有问题
  // flags: 'a+',
  // window上面是需要使用r+
  flags: 'r+',
  start: 5 // 如果想在第5个位置写入，window上必须使用r+
})

writeStream.write('my name is why')
writeStream.close()
```

## **pipe方法**

**正常情况下，我们可以将读取到的 输入流，手动的放到 输出流中进行写入：**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240617233733538.png" alt="image-20240617233733538" style="zoom:67%;" />

**我们也可以通过pipe来完成这样的操作：**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240617233744414.png" alt="image-20240617233744414" style="zoom:67%;" />

文件的拷贝流操作

```javascript
const fs = require('fs')

// 1.方式一: 一次性读取和写入文件
// fs.readFile('./foo.txt', (err, data) => {
//   console.log(data)
//   fs.writeFile('./foo_copy01.txt', data, (err) => {
//     console.log('写入文件完成', err)
//   })
// })


// 2.方式二: 创建可读流和可写流
// const readStream = fs.createReadStream('./foo.txt')
// const writeStream = fs.createWriteStream('./foo_copy02.txt')

// readStream.on('data', (data) => {
//   writeStream.write(data)
// })

// readStream.on('end', () => [
//   writeStream.close()
// ])

// 3.在可读流和可写流之间建立一个管道 将foo.txt拷贝一份到foo_copy03.txt
const readStream = fs.createReadStream('./foo.txt')
const writeStream = fs.createWriteStream('./foo_copy03.txt')

readStream.pipe(writeStream)
```

