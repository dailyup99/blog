---
outline: deep
---

## **认识rollup**

**我们来看一下官方对rollup的定义：**

Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, 

such as a library or application. 

Rollup是一个JavaScript的模块化打包工具，可以帮助我们编译小的代码到一个大的、复杂的代码中，比如一个库或者一个应用程序；

**我们会发现Rollup的定义、定位和webpack非常的相似：**

Rollup也是一个模块化的打包工具，但是Rollup主要是针对ES Module进行打包的；

另外webpack通常可以通过各种loader处理各种各样的文件，以及处理它们的依赖关系；

rollup更多时候是专注于处理JavaScript代码的（当然也可以处理css、font、vue等文件）；

另外rollup的配置和理念相对于webpack来说，更加的简洁和容易理解；

在早期webpack不支持tree shaking时，rollup具备更强的优势；

**目前webpack和rollup分别应用在什么场景呢？**

通常在实际项目开发过程中，我们都会使用webpack（比如react、angular项目都是基于webpack的）；

在对库文件进行打包时，我们通常会使用rollup（比如vue、react、dayjs源码本身都是基于rollup的，Vite底层使用Rollup）；

## **Rollup基本使用**

**我们可以先安装rollup：**

```json
# 全局安装
npm install rollup -g
# 局部安装
npm install rollup -D
```

**创建main.js文件，打包到bundle.js文件中：**

```json
# 打包浏览器的库
npx rollup ./src/main.js -f iife -o dist/bundle.js
# 打包AMD的库
npx rollup ./src/main.js -f amd -o dist/bundle.js
# 打包CommonJS的库
npx rollup ./src/main.js -f cjs -o dist/bundle.js
# 打包通用的库（必须跟上name）
npx rollup ./src/main.js -f umd --name mathUtil -o dist/bundle.js
```

## **Rollup的配置文件**

**我们可以将配置信息写到配置文件中rollup.config.js文件：**

**我们可以对文件进行分别打包，打包出更多的库文件（用户可以根据不同的需求来引入）：**

rollup.config.js

```javascript
module.exports = {
  // 入口
  input: "./lib/index.js",
  // 出口
  output: [
    {
      format: "umd",
      name: "whyUtils",
      file: "./build/bundle.umd.js"
    },
    {
      format: "amd",
      file: "./build/bundle.amd.js"
    },
    {
      format: "cjs",
      file: "./build/bundle.cjs.js"
    },
    {
      format: "iife",
      name: "whyUtils",
      file: "./build/bundle.browser.js"
    }
  ]
}
```

打包的时候执行

```json
npx rollup -c
```

## **解决commonjs和第三方库问题**

**安装解决commonjs的库：**

```json
npm install @rollup/plugin-commonjs -D
```

**安装解决node_modules的库：**

```json
npm install @rollup/plugin-node-resolve -D
```

**打包和排除lodash**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240610081448048.png" alt="image-20240610081448048" style="zoom:67%;" />

```javascript
// 默认lodash没有被打包是因为它使用commonjs, rollup默认情况下只会处理es module
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')

module.exports = {
  // 入口
  input: "./lib/index.js",
  // 出口
  output: {
    format: "umd",
    name: "whyUtils",
    file: "./build/bundle.umd.js",
    globals: {
      lodash: "_" // 自己的业务代码lodash需要打包
    }
  },
  external: ["lodash"], // 库文件不需要打包loadsh
  plugins: [
    commonjs(),
    nodeResolve(),
  ]
}
```

lib/index.js

```javascript
import { sum, mul } from './utils/math'
import { formatPrice } from './utils/format'
import _ from 'lodash'

function foo() {
  console.log("foo exection~")
  console.log(sum(20, 30))
  console.log(formatPrice())
  console.log(_.join(["abc", "cba"]))


  const message = "Hello World"
  console.log(message)
}

export {
  foo,
  sum,
  mul
}
```

lib/utils/format.js

使用的是commonjs

```javascript
function formatPrice() {
  return "¥" + 10000000
}


module.exports = {
  formatPrice
}
```

## **Babel转换代码**

**如果我们希望将ES6转成ES5的代码，可以在rollup中使用babel。**

**安装rollup对应的babel插件：**

```json
npm install @rollup/plugin-babel -D
```

**修改配置文件：**

需要配置babel.config.js文件；

babelHelpers

## **Teser代码压缩**

**如果我们希望对代码进行压缩，可以使用@rollup/plugin-terser：**

```json
npm install @rollup/plugin-terser -D
```

**配置terser**

```javascript
// 默认lodash没有被打包是因为它使用commonjs, rollup默认情况下只会处理es module
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')

// 使用代码转换和压缩
const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')

module.exports = {
  // 入口
  input: "./lib/index.js",
  // 出口
  output: {
    format: "umd",
    name: "whyUtils",
    file: "./build/bundle.umd.js",
    globals: {
      lodash: "_"
    }
  },
  external: ["lodash"],
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
      exclude: /node_modules/
    }),
    terser()
  ]
}
```

babel.config.js

```javascript
module.exports = {
  presets: [
    ["@babel/preset-env"]
  ]
}
```

## **处理css文件**

**如果我们项目中需要处理css文件，可以使用postcss：**

```json
npm install rollup-plugin-postcss postcss -D
```

**配置postcss的插件**

```javascript
const postcss = require('rollup-plugin-postcss')

module.exports = {
  plugins: [
    postcss()
  ]
}
```

如果想要处理浏览器前缀，根目录下增加postcss.config.js，做如下配置：

```javascript
module.exports = {
  plugins: [require("postcss-preset-env")]
}
```

## **处理vue文件**

**处理vue文件我们需要使用rollup-plugin-vue插件：**

**但是注意：默认情况下我们安装的是vue3.x的版本，所以我这里指定了一下rollup-plugin-vue的版本；**

```json
npm install rollup-plugin-vue @vue/compiler-sfc -D
```

**使用vue的插件**

```javascript
const vue = require('rollup-plugin-vue')

module.exports = {
  plugins: [
    vue()
  ]
}
```

## **打包vue报错**

**在我们打包vue项目后，运行会报如下的错误：**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240610084658043.png" alt="image-20240610084658043" style="zoom:67%;" />

**这是因为在我们打包的vue代码中，用到 process.env.NODE_ENV，所以我们可以使用一个插件 rollup-plugin-replace 设置**

**它对应的值：**

```json
npm install @rollup/plugin-replace -D
```

**配置插件信息：**

```javascript
const replace = require('@rollup/plugin-replace')

module.exports = {
  plugins: [
    ...
    replace({
      "process.env.NODE_ENV": JSON.stringify('production')
    })
  ]
}
```

## **搭建本地服务器**

**第一步：使用rollup-plugin-serve搭建服务**

```json
npm install rollup-plugin-serve -D
```

**第二步：当文件发生变化时，自动刷新浏览器**

```json
npm install rollup-plugin-livereload -D
```

**第三步：启动时，开启文件监听**

```json
npx rollup -c -w
```

```javascript
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')

module.exports = {
  plugins: [
    serve({
      port: 8000,
      open: true,
      contentBase: "."
    }),
    livereload()
  ]
}
```

## **区分开发环境**

**我们可以在package.json中创建一个开发和构建的脚本：**

package.json

```json
"scripts": {
  "build": "rollup -c --environment NODE_ENV:production",
  "serve": "rollup -c --environment NODE_ENV:development -w"
}
```

rollup.config.js

```javascript
// 默认lodash没有被打包是因为它使用commonjs, rollup默认情况下只会处理es module
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')

// 使用代码转换和压缩
const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const postcss = require('rollup-plugin-postcss')
const vue = require('rollup-plugin-vue')
const replace = require('@rollup/plugin-replace')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')


const isProduction = process.env.NODE_ENV === "production"
const plugins = [
  commonjs(),
  nodeResolve(),
  babel({
    babelHelpers: "bundled",
    exclude: /node_modules/
  }),
  postcss(),
  vue(),
  replace({
    "process.env.NODE_ENV": JSON.stringify('production'),
    preventAssignment: true // 去除警告
  }),
]

if (isProduction) {
  plugins.push(terser())
} else {
  const extraPlugins = [
    serve({
      port: 8000,
      open: true,
      contentBase: "."
    }),
    livereload()
  ]
  plugins.push(...extraPlugins)
}

module.exports = {
  // 入口
  input: "./src/index.js",
  // 出口
  output: {
    format: "umd",
    name: "whyUtils",
    file: "./build/bundle.umd.js",
    globals: {
      lodash: "_"
    }
  },
  plugins: plugins
}
```

