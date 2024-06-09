---
outline: deep
---

## Vue脚手架启动

![image-20240609212348260](http://139.196.79.103:9001/myimages/imgs/image-20240609212348260.png)

## Vue脚手架加载配置

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240609212419768.png" alt="image-20240609212419768" style="zoom:67%;" />

如果只想看vue脚手架有什么webpack配置，可以执行

```json
vue inspect --mode=development > dev.config.js
vue inspect --mode=production > prod.config.js
```

## **什么是Gulp？**

**什么是Gulp？**
A toolkit to automate & enhance your workflow；

一个工具包，可以帮你自动化和增加你的工作流；

![image-20240609215407073](http://139.196.79.103:9001/myimages/imgs/image-20240609215407073.png)

## **Gulp和Webpack**

gulp的核心理念是**task runner**

可以定义自己的一系列任务，等待任务被执行；

基于文件Stream的构建流；

我们可以使用gulp的插件体系来完成某些任务；

webpack的核心理念是**module bundler**

webpack是一个模块化的打包工具；

可以使用各种各样的loader来加载不同的模块；

可以使用各种各样的插件在webpack打包的生命周期完成其他的任务；

**gulp相对于webpack的优缺点：**

gulp相对于webpack思想更加的简单、易用，更适合编写一些自动化的任务；

但是目前对于大型项目（Vue、React、Angular）并不会使用gulp来构建，比如默认gulp是不支持模块化的；

## **Gulp的基本使用**

**首先，我们需要安装gulp：**

```json
# 全局安装
npm install gulp -g
# 局部安装
npm install gulp
```

**其次，编写gulpfile.js文件，在其中创建一个任务：**

```javascript
// 编写简单的任务
const foo = async (cb) => {
  console.log("第一个gulp任务")
  cb()
}

// 导出的任务
module.exports = {
  foo,
}
```

**最后，执行gulp命令：**

```json
npx gulp foo
```

## **创建gulp任务**

每个gulp任务都是一个异步的JavaScript函数：

此函数可以接受一个callback作为参数，调用callback函数那么任务会结束；

或者是一个返回stream、promise、event emitter、child process或observable类型的函数；

任务可以是public或者private类型的：

**公开任务（Public tasks）** 从 gulpfile 中被导出（export），可以通过 gulp 命令直接调用；

**私有任务（Private tasks）** 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分；

异步任务

```javascript
// 编写异步的gulp任务
// async的时候bar函数会返回一个Promise
const bar = (cb) => {
  setTimeout(() => {
    console.log("bar任务被执行~")
    cb()
  }, 2000);
}

module.exports = {
  bar
}
```

补充：gulp4之前, 注册任务时通过gulp.task的方式进行注册的

```javascript
const gulp = require('gulp')

// 早期编写任务的方式(gulp4.x之前)
gulp.task('foo2', (cb) => {
 console.log("第二个gulp任务")
 cb()
})
```

## **默认任务**

我们可以编写一个默认任务：

```javascript
// 默认任务
module.exports.default = (cb) => {
  console.log("default task exec~")
  cb()
}
```

执行 gulp 命令：

```json
npx gulp
```

## **任务组合series和parallel**

**通常一个函数中能完成的任务是有限的（放到一个函数中也不方便代码的维护），所以我们会将任务进行组合。**

**gulp提供了两个强大的组合方法：**

series()：串行任务组合；

parallel()：并行任务组合；

```javascript
const { series, parallel } = require('gulp')

const foo1 = (cb) => {
  setTimeout(() => {
    console.log("foo1 task exec~")
    cb()
  }, 2000)
}

const foo2 = (cb) => {
  setTimeout(() => {
    console.log("foo2 task exec~")
    cb()
  }, 1000)
}

const foo3 = (cb) => {
  setTimeout(() => {
    console.log("foo3 task exec~")
    cb()
  }, 3000)
}

const seriesFoo = series(foo1, foo2, foo3)
const parallelFoo = parallel(foo1, foo2, foo3)


module.exports = {
  seriesFoo,
  parallelFoo
}
```

执行npx gulp seriesFoo，执行顺序是，foo1 foo2 foo3，按顺序执行，后面一个的执行要等前面的完成才能执行。

执行npx gulp parallelFoo，执行顺序是，foo2 foo1 foo3，并行执行，哪个先执行完就先打印哪个。

## **读取和写入文件**

**gulp 暴露了 src() 和 dest() 方法用于处理计算机上存放的文件。**

src() 接受参数，并从文件系统中读取文件然后生成一个Node流（Stream），它将所有匹配的文件读取到内存中并通过流

（Stream）进行处理；

由 src() 产生的流（stream）应当从任务（task函数）中返回并发出异步完成的信号；

dest() 接受一个输出目录作为参数，并且它还会产生一个 Node流(stream)，通过该流将内容输出到文件中；

**流（stream）所提供的主要的 API 是 .pipe() 方法，pipe方法的原理是什么呢？**

pipe方法接受一个 转换流（Transform streams）或可写流（Writable streams）；

那么转换流或者可写流，拿到数据之后可以对数据进行处理，再次传递给下一个转换流或者可写流；

## **glob文件匹配**

**src() 方法接受一个 glob 字符串或由多个 glob 字符串组成的数组作为参数，用于确定哪些文件需要被操作。**

glob 或 glob 数组必须至少匹配到一个匹配项，否则 src() 将报错；

**glob的匹配规则如下：**

(一个星号*)：在一个字符串中，匹配任意数量的字符，包括零个匹配；

```json
'*.js'
```

(两个星号**)：在多个字符串匹配中匹配任意数量的字符串，通常用在匹配目录下的文件；

```json
'scripts/**/*.js'
```

(取反!)：

由于 glob 匹配时是按照每个 glob 在数组中的位置依次进行匹配操作的；

所以 glob 数组中的取反（negative）glob 必须跟在一个非取反（non-negative）的 glob 后面；

第一个 glob 匹配到一组匹配项，然后后面的取反 glob 删除这些匹配项中的一部分；

```json
['scripts/**/*.js', '!scripts/vendor/']
```

读取src目录下所有以.js结尾的文件，然后拷贝一份到dist目录下

```javascript
const { src, dest } = require('gulp')

const copyFile = () => {
  // 1.读取文件 2.写入文件
  return src("./src/**/*.js").pipe(dest("./dist"))
}

module.exports = {
  copyFile
}
```

## **对文件进行转换**

**如果在这个过程中，我们希望对文件进行某些处理，可以使用社区给我们提供的插件。**

比如我们希望ES6转换成ES5，那么可以使用babel插件；

如果我们希望对代码进行压缩和丑化，那么可以使用uglify或者terser插件；

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240609223401261.png" alt="image-20240609223401261" style="zoom:67%;" />

babel可以单独创建一个babel.config.js进行配置

```javascript
module.exports = {
  presets: ["@babel/preset-env"]
}
```

```javascript
const { src, dest } = require('gulp')

const babel = require('gulp-babel')
const terser = require('gulp-terser')

const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel())
    .pipe(terser({ mangle: { toplevel: true } }))
    .pipe(dest("./dist"))
}

module.exports = {
  jsTask
}
```

## **Gulp的文件监听**

**gulp api 中的 watch() 方法利用文件系统的监控程序（file system watcher）将 与进行关联。**

使用watch之后，只有文件有改变，就会自动执行npx gulp jsTask。

```javascript
const { src, dest, watch } = require('gulp')

const babel = require('gulp-babel')
const terser = require('gulp-terser')

const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel())
    .pipe(terser({ mangle: { toplevel: true } }))
    .pipe(dest("./dist"))
}

// watch函数监听内容的改变
watch("./src/**/*.js", jsTask)

module.exports = {
  jsTask
}
```

## **Gulp案例**

**接下来，我们编写一个案例，通过gulp来开启本地服务和打包：**

打包html文件；

* 使用gulp-htmlmin插件；

使用gulp-htmlmin插件；

* 使用gulp-babel，gulp-terser插件；

打包less文件；

* 使用gulp-less插件；

html资源注入

* 使用gulp-inject插件；

开启本地服务器

* 使用browser-sync插件；

创建打包任务

创建开发任务

package.json

```json
"scripts": {
  "build": "gulp buildTask", // 打包任务
  "serve": "gulp serveTask"  // 开发任务
}
```

```javascript
const { src, dest, parallel, series, watch } = require("gulp");

const htmlmin = require("gulp-htmlmin");
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const less = require('gulp-less')

const inject = require('gulp-inject')
const browserSync = require('browser-sync')

// 1.对html进行打包
const htmlTask = () => {
  return src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
};

// 2.对JavaScript进行打包
const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser({ toplevel: true }))
    .pipe(dest('./dist'))
};

// 3.对less进行打包
const lessTask = () => {
  return src("./src/**/*.less")
    .pipe(less())
    .pipe(dest("./dist"))
}

// 4.在html中注入js和css
const injectTask = () => {
  return src('./dist/**/*.html')
    .pipe(inject(src(['./dist/**/*.js', './dist/**/*.css']), { relative: true }))
    .pipe(dest('./dist'))
}

// 5.开启一个本地服务器
const bs = browserSync.create()
const serve = () => {
  watch("./src/**", buildTask)

  bs.init({
    port: 8080,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist'
    }
  })
}

// 创建项目构建的任务
const buildTask = series(parallel(htmlTask, jsTask, lessTask), injectTask)
const serveTask = series(buildTask, serve)
// webpack搭建本地 webpack-dev-server

module.exports = {
  buildTask,
  serveTask
};
```

打包后的html想要注入js和css，打包之前的index.html需要做如下配置，gulp才知道将js和css注入到哪个位置。

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gulp Projecct</title>
  <!-- inject:css -->
  <!-- endinject -->
</head>
<body>
  <!-- inject:js -->
  <!-- endinject -->
</body>
</html>
```



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gulp Projecct</title>
  <!-- inject:css -->
  <!-- endinject -->
</head>
<body>
  <!-- inject:js -->
  <!-- endinject -->
</body>
</html>

