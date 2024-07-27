---
outline: deep
---

## **Terser介绍和安装**

**什么是Terser呢？**

Terser是一个JavaScript的解释（Parser）、Mangler（绞肉机）/Compressor（压缩机）的工具集；

早期我们会使用 uglify-js来压缩、丑化我们的JavaScript代码，但是目前已经不再维护，并且不支持ES6+的语法；

Terser是从 uglify-es fork 过来的，并且保留它原来的大部分API以及适配 uglify-es和uglify-js@3等；

**也就是说，Terser可以帮助我们压缩、丑化我们的代码，让我们的bundle变得更小。**

**因为Terser是一个独立的工具，所以它可以单独安装：**

```json
# 全局安装
npm install terser -g
# 局部安装
npm install terser -D
```

## **命令行使用Terser**

**我们可以在命令行中使用Terser：**

```json
terser [input files] [options]
# 举例说明
terser js/file1.js -o foo.min.js -c -m
```

**我们这里来讲解几个Compress option和Mangle(乱砍) option：**

因为他们的配置非常多，我们不可能一个个解析，更多的查看文档即可；

https://github.com/terser/terser#compress-options

https://github.com/terser/terser#mangle-options

## **Compress和Mangle的options**

**Compress option：**

arrows：class或者object中的函数，转换成箭头函数；

arguments：将函数中使用 arguments[index]转成对应的形参名称；

dead_code：移除不可达的代码（tree shaking）；

其他属性可以查看文档；

**Mangle option**

toplevel：默认值是false，顶层作用域中的变量名称，进行丑化（转换）；

keep_classnames：默认值是false，是否保持依赖的类名称；

keep_fnames：默认值是false，是否保持原来的函数名称；

其他属性可以查看文档；

```json
npx terser ./src/abc.js -o abc.min.js -c 
arrows,arguments=true,dead_code -m 
toplevel=true,keep_classnames=true,keep_fnames=true
```

abc.js

```javascript
const message = "Hello World"
console.log(message)

function foo(num1, num2) {
  console.log("foo function exec~")
  console.log(arguments[0], arguments[1])
}
foo()

const obj = {
  name: "why",
  bar() {
    return "bar"
  }
}

// 不可达的代码
if (false) {
  console.log("哈哈哈哈哈")
  console.log("呵呵呵呵呵")
}

class Person {}
const p = new Person()
```

执行npx terser ./src/abc.js -o abc.min.js，就会在同级目录下多一个abc.min.js的文件，这个文件是abc.js压缩过后的代码。

abc.min.js，实际上是被压缩了，这里为了看的更清楚，格式化一下

```javascript
const o = "Hello World";
function foo(o, n) {
  console.log("foo function exec~"), console.log(o, n);
}
console.log(o), foo();
const n = { name: "why", bar: () => "bar" };
class Person {}
const c = new Person();
```

arrows=true之后，bar函数就变成了箭头函数；

arguments=true之后，就可以打印num1和num2；

dead_code=true之后，if (false)的代码就没了；

toplevel=true之后，代码就进行了丑化，一些变量名比如message就变成了o；

但是如果不想函数名被压缩，可以设置keep_classnames=true，可以发现foo函数名还在；

不想类名被压缩，设置keep_fnames=true，类名Person还在。

## **Terser在webpack中配置**

**真实开发中，我们不需要手动的通过terser来处理我们的代码，我们可以直接通过webpack来处理：**

在webpack中有一个minimizer属性，在production模式下，默认就是使用TerserPlugin来处理我们的代码的；

如果我们对默认的配置不满意，也可以自己来创建TerserPlugin的实例，并且覆盖相关的配置；

**首先，我们需要打开minimize，让其对我们的代码进行压缩（默认production模式下已经打开了）**

**其次，我们可以在minimizer创建一个TerserPlugin：**

extractComments：默认值为true，表示会将注释抽取到一个单独的文件中；

在开发中，我们不希望保留这个注释时，可以设置为false；

parallel：使用多进程并发运行提高构建的速度，默认值是true

* 并发运行的默认数量： os.cpus().length - 1；
* 我们也可以设置自己的个数，但是使用默认值即可；

terserOptions：设置我们的terser相关的配置

* compress：设置压缩相关的选项；
* mangle：设置丑化相关的选项，可以直接设置为true；
* toplevel：顶层变量是否进行转换；
* keep_classnames：保留类的名称；
* keep_fnames：保留函数的名称；

```javascript
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    // 代码优化: TerserPlugin => 让代码更加简单 => Terser
    minimizer: [
      // JS压缩的插件: TerserPlugin
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: true,
            unused: true
          },
          mangle: true,
          // toplevel: false
          keep_fnames: true
        }
      }),
    ]
  }
}
```

unused（默认为true，为true就会进行tree shaking，删除无效代码）设置为false的意思是，比如下面的abc.js

```javascript
function sum(num1, num2) {
  return num1 + num2
}
```

定义了函数但是没有被使用，如果也想要被打包，就可以设置unused设置为false。

## **CSS的压缩**

**另一个代码的压缩是CSS：**

CSS压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等；

CSS的压缩我们可以使用另外一个插件：css-minimizer-webpack-plugin；

css-minimizer-webpack-plugin是使用cssnano工具来优化、压缩CSS（也可以单独使用）；

**第一步，安装 css-minimizer-webpack-plugin：**

```json
npm install css-minimizer-webpack-plugin -D
```

**第二步，在optimization.minimizer中配置**

```javascript
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    // 代码优化: TerserPlugin => 让代码更加简单 => Terser
    minimizer: [
      // JS压缩的插件: TerserPlugin
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: true,
            unused: true
          },
          mangle: true,
          // toplevel: false
          keep_fnames: true
        }
      }),
      // CSS压缩的插件: CSSMinimizerPlugin
      new CSSMinimizerPlugin({
        // parallel: true // 默认是true，可以不用配置
      })
    ]
  }
}

```

## 导出公共配置的函数

目前我们对webpack进行配置是在webpack.config.js中，如果我们想自定义配置，比如放在config/comm.config.js，就要进行如下配置：

之前的webpack.config.js配置如下：

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: false,
  // entry: './src/index.js',
  entry: './src/main.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, './build'),
    // placeholder
    filename: 'js/[name]-bundle.js',
    // 单独针对分包的文件进行命名
    chunkFilename: 'js/[name]_chunk.js',
    // publicPath: 'http://coderwhycdn.com/'
  },
  // 排除某些包不需要进行打包
  // externals: {
  //   react: "React",
  //   // key属性名: 排除的框架的名称
  //   // value值: 从CDN地址请求下来的js中提供对应的名称
  //   axios: "axios"
  // },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.jsx', '.ts']
  },
  devServer: {
    static: ['public', 'content'],
    port: 3000,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  // 优化配置
  optimization: {
    // 设置生成的chunkId的算法
    // development: named
    // production: deterministic(确定性)
    // webpack4中使用: natural
    chunkIds: 'deterministic',
    // runtime的代码是否抽取到单独的包中(早Vue2脚手架中)
    runtimeChunk: {
      name: "runtime"
    },
    // 分包插件: SplitChunksPlugin
    splitChunks: {
      chunks: "all",
      // 当一个包大于指定的大小时, 继续进行拆包
      // maxSize: 20000,
      // // 将包拆分成不小于minSize的包
      // minSize: 10000,
      minSize: 10,

      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        utils: {
          test: /utils/,
          filename: "js/[id]_utils.js"
        },
        vendors: {
          // /node_modules/
          // window上面 /\
          // mac上面 /
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id]_vendors.js"
        }
      }
    },
    minimize: true,
    // 代码优化: TerserPlugin => 让代码更加简单 => Terser
    minimizer: [
      // JS压缩的插件: TerserPlugin
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: true,
            unused: true
          },
          mangle: true,
          // toplevel: false
          keep_fnames: true
        }
      }),
      // CSS压缩的插件: CSSMinimizerPlugin
      new CSSMinimizerPlugin({
        // parallel: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.ts$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', 开发阶段
          MiniCssExtractPlugin.loader, // 生产阶段
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ProvidePlugin({
      axios: ['axios', 'default'],
      // get: ['axios', 'get'],
      dayjs: 'dayjs'
    }),
    // 完成css的提取
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name]_chunk.css'
    })
  ]
}
```

我们可以把module.exports的对象单独抽取为一个变量，变成下面这样

这里有个需要注意的点：output路径需要改为../build

```javascript
const commonConfig = {
  ...
  output: {
    path: path.resolve(__dirname, '../build'), // 这里配置需要修改
  },
  ...
}

// webpack允许导出一个函数
module.exports = function(env) {
  const isProduction = env.production
  if (isProduction) {
    console.log("生产环境")
  } else {
    console.log("开发环境")
  }
  return commonConfig
}
```

还有需要修改package.json的配置

```json
{
  "scripts": {
    "build": "webpack --config ./config/comm.config.js --env production",
    "serve": "webpack serve --config ./config/comm.config.js --env development",
  },
}
```

这样执行npm run build，isProduction为true是生产环境，npm run server，isProduction为false是开发环境。

## 开发和生产环境分离

首先，需要安装webpack-merge

```json
npm install webpack-merge -D
```

config/comm.config.js

开发和生产环境都需要的配置放在config/comm.config.js中

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const devConfig = require('./dev.config')
const prodConfig = require('./prod.config')

/**
 * 抽取开发和生产环境的配置文件
 * 1.将配置文件导出的是一个函数, 而不是一个对象
 * 2.从上向下查看所有的配置属性应该属于哪一个文件
 * * comm/dev/prod
 * 3.针对单独的配置文件进行定制化
 * * css加载: 使用的不同的loader可以根据isProduction动态获取
 */

const getCommonConfig = function(isProdution) {
  return {
    entry: './src/main.js',
    output: {
      clean: true,
      path: path.resolve(__dirname, '../build'),
      // placeholder
      filename: 'js/[name]-bundle.js',
      // 单独针对分包的文件进行命名
      chunkFilename: 'js/[name]_chunk.js',
      // publicPath: 'http://coderwhycdn.com/'
    },
    resolve: {
      extensions: ['.js', '.json', '.wasm', '.jsx', '.ts']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
          }
        },
        {
          test: /\.ts$/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            // // 'style-loader', //开发阶段
            // MiniCssExtractPlugin.loader, // 生产阶段
            isProdution ? MiniCssExtractPlugin.loader: 'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new ProvidePlugin({
        axios: ['axios', 'default'],
        // get: ['axios', 'get'],
        dayjs: 'dayjs'
      })
    ]
  }  
}


// webpack允许导出一个函数
module.exports = function(env) {
  const isProduction = env.production
  let mergeConfig = isProduction ? prodConfig: devConfig
  return merge(getCommonConfig(isProduction), mergeConfig)
}
```

config/dev.config.js

开发环境配置

```javascript
module.exports = {
  mode: 'development',
  devServer: {
    static: ['public', 'content'],
    port: 3000,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  plugins: [
  ]
}
```

config/prod.config.js

```javascript
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  // 优化配置
  optimization: {
    chunkIds: 'deterministic',
    // runtime的代码是否抽取到单独的包中(早Vue2脚手架中)
    runtimeChunk: {
      name: "runtime"
    },
    // 分包插件: SplitChunksPlugin
    splitChunks: {
      chunks: "all",
      minSize: 10,

      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        utils: {
          test: /utils/,
          filename: "js/[id]_utils.js"
        },
        vendors: {
          // /node_modules/
          // window上面 /\
          // mac上面 /
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id]_vendors.js"
        }
      }
    },
    minimize: true,
    // 代码优化: TerserPlugin => 让代码更加简单 => Terser
    minimizer: [
      // JS压缩的插件: TerserPlugin
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: true,
            unused: true
          },
          mangle: true,
          // toplevel: false
          keep_fnames: true
        }
      }),
      // CSS压缩的插件: CSSMinimizerPlugin
      new CSSMinimizerPlugin({
        // parallel: true
      })
    ]
  },
  plugins: [
    // 完成css的提取
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name]_chunk.css'
    })
  ]
}
```

## **什么是Tree Shaking**

**什么是Tree Shaking呢？**

Tree Shaking是一个术语，在计算机中表示消除死代码（dead_code）；

最早的想法起源于LISP，用于消除未调用的代码（纯函数无副作用，可以放心的消除，这也是为什么要求我们在进行函数式

编程时，尽量使用纯函数的原因之一）；

后来Tree Shaking也被应用于其他的语言，比如JavaScript、Dart；

**JavaScript的Tree Shaking：**

对JavaScript进行Tree Shaking是源自打包工具rollup（后面我们也会讲的构建工具）；

这是因为Tree Shaking依赖于ES Module的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）；

webpack2正式内置支持了ES2015模块，和检测未使用模块的能力；

在webpack4正式扩展了这个能力，并且通过 package.json的 sideEffects属性作为标记，告知webpack在编译时，哪里文

件可以安全的删除掉；

webpack5中，也提供了对部分CommonJS的tree shaking的支持；

https://github.com/webpack/changelog-v5#commonjs-tree-shaking

## **webpack实现Tree Shaking**

**事实上webpack实现Tree Shaking采用了两种不同的方案：**

usedExports：通过标记某些函数是否被使用，之后通过Terser来进行优化的；

sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用；

## **usedExports**

**将mode设置为development模式：**

为了可以看到 usedExports带来的效果，我们需要设置为 development 模式

因为在 production 模式下，webpack默认的一些优化会带来很大的影响。

**设置usedExports为true和false对比打包后的代码：**

在usedExports设置为true时，会有一段注释：unused harmony export mul；

这段注释的意义是什么呢？告知Terser在优化时，可以删除掉这段代码；

**这个时候，我们讲 minimize设置true：**

usedExports设置为false时，mul函数没有被移除掉；

usedExports设置为true时，mul函数有被移除掉；

**所以，usedExports实现Tree Shaking是结合Terser来完成的。**

生成环境usedExports默认为true

demo/math.js

```javascript
export function sum(num1, num2) {
  return num1 + num2
}

export function mul(num1, num2) {
  return num1 * num2
}
```

demo.js

```javascript
import { sum } from './demo/math'

console.log(sum(20, 30))
```

其中sum函数被引用了，mul函数没有被引用。

```javascript
module.exports = {
  mode: 'development',
  devtool: false,
  // 优化配置
  optimization: {
    // 导入模块时, 分析模块中的哪些函数有被使用, 哪些函数没有被使用.
    usedExports: true,
  }
}
```

![image-20240601213954224](http://139.196.79.103:9001/myimages/imgs/image-20240601213954224.png)

从上图可以看到设置usedExports为true之后，mul函数就被移除了。

## **sideEffects**

**sideEffects用于告知webpack compiler哪些模块时有副作用的：**

副作用的意思是这里面的代码有执行一些特殊的任务，不能仅仅通过export来判断这段代码的意义；

副作用的问题，在讲React的纯函数时是有讲过的；

**在package.json中设置sideEffects的值：**

如果我们将sideEffects设置为false，就是告知webpack可以安全的删除未用到的exports；

如果有一些我们希望保留，可以设置为数组；

**比如我们有一个format.js、style.css文件：**

该文件在导入时没有使用任何的变量来接受；

那么打包后的文件，不会保留format.js、style.css相关的任何代码；

demo/parse-lyric.js

```javascript
export function parseLyric(lyricString) {
  return []
}

export function test() {

}

// 模块的副作用代码
// 推荐: 在平时编写模块的时候, 尽量编写纯模块
window.lyric = "哈哈哈哈哈"
```

demo.js

```javascript
// 2.只导入模块, 但是没有引入任何的内容
import "./demo/parse-lyric"
```

打包之后发现parseLyric和test都被删除了，但是window.lyric并没有被删除，因为这个是有副作用的代码。

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601215554605.png" alt="image-20240601215554605" style="zoom:67%;" />

假如，我们把demo/parse-lyric.js中的

```javascript
window.lyric = "哈哈哈哈哈"
```

删掉，那么再次打包，会发现整个模块依然没有被删除掉

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601215758731.png" alt="image-20240601215758731" style="zoom:80%;" />

如果我们想将整个模块删除掉，可以在package.json中进行配置

package.json

```json
{
  "sideEffects": false,
}
```

设置为false告诉webpack，所有的文件都没有副作用，那么再次打包整个文件就会被删除。

但是假如

```javascript
window.lyric = "哈哈哈哈哈"
```

这行副作用代码没有被删除，别的地方需要使用到，设置sideEffects为false，就会把整个文件删除，那么引用的地方就会报错。

所以，推荐: 在平时编写模块的时候, 尽量编写纯模块，不要有副作用代码。

当然，我们也可以给sideEffects配置为一个数组

package.json

```json
{
  "sideEffects": [
    "./src/demo/parse-lyric.js" // 告诉webpack这个文件存在副作用代码，这样打包的时候不会被tree shaking掉
  ],
}
```

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601221154134.png" alt="image-20240601221154134" style="zoom:67%;" />

我们除了引入js，还会引入css

```javascript
// 3.import css文件
import "./css/style.css"
```

假如sideEffects设置为false，那么css也会被tree shaking掉，所以，也需要在sideEffects中把css配置进去

```json
{
  "sideEffects": [
    "*.css"
  ],
}
```

这样css就会被保留下来。

## **Webpack中tree shaking的设置**

**所以，如何在项目中对JavaScript的代码进行TreeShaking呢（生成环境）？**

在optimization中配置usedExports为true，来帮助Terser进行优化；

在package.json中配置sideEffects，直接对模块进行优化；

## **CSS实现Tree Shaking**

**上面我们学习的都是关于JavaScript的Tree Shaking，那么CSS是否也可以进行Tree Shaking操作呢？**

CSS的Tree Shaking需要借助于一些其他的插件；

在早期的时候，我们会使用PurifyCss插件来完成CSS的tree shaking，但是目前该库已经不再维护了（最新更新也是在4年前

了）；

目前我们可以使用另外一个库来完成CSS的Tree Shaking：PurgeCSS，也是一个帮助我们删除未使用的CSS的工具；

**安装PurgeCss的webpack插件：**

```json
npm install purgecss-webpack-plugin -D
```

## **配置PurgeCss**

**配置这个插件（生产环境）：**

paths：表示要检测哪些目录下的内容需要被分析，这里我们可以使用glob；

注意：这里安装的glob如果使用最新的8.x版本会有问题，所以我们安装7.x的版本

8.x的版本打印

```json
glob.sync(`${path.resolve(__dirname, '../src')}/**/*`, { nodir: true })
```

发现是个空数组，也就找不到文件

```json
npm install glob@7.* -D
```

默认情况下，Purgecss会将我们的html标签的样式移除掉，如果我们希望保留，可以添加一个safelist的属性；

```javascript
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

module.exports = {
  plugins: [
    // 对CSS进行TreeShaking
    new PurgeCSSPlugin({
      // 找到src的所有文件，但是不包括文件夹(nodir: true)
      paths: glob.sync(`${path.resolve(__dirname, '../src')}/**/*`, { nodir: true }),
      safelist: function() {
        return {
          standard: ["html", "body"] // 保留html和body的样式
        }
      }
    })
  ]
}
```

**purgecss也可以对less文件进行处理（所以它是对打包后的css进行tree shaking操作）；**

## **Scope Hoisting**

**什么是Scope Hoisting呢？**

Scope Hoisting从webpack3开始增加的一个新功能；

功能是对作用域进行提升，并且让webpack打包后的代码更小、运行更快；

**默认情况下webpack打包会有很多的函数作用域，包括一些（比如最外层的）IIFE：**

无论是从最开始的代码运行，还是加载一个模块，都需要执行一系列的函数；

Scope Hoisting可以将函数合并到一个模块中来运行；

**使用Scope Hoisting非常的简单，webpack已经内置了对应的模块：**

在production模式下，默认这个模块就会启用；

在development模式下，我们需要自己来打开该模块；

```javascript
module.exports = {
  mode: 'development',
  devtool: false,
  plugins: [
    // 作用域提升
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```

没有配置之前，想要拿到sum函数，需要跨作用域。

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601223850464.png" alt="image-20240601223850464" style="zoom:80%;" />

配置之后在一个模块里面，直接使用。

![image-20240601223720676](http://139.196.79.103:9001/myimages/imgs/image-20240601223720676.png)

## **什么是HTTP压缩？**

**HTTP压缩是一种内置在 服务器 和 客户端 之间的，以改进传输速度和带宽利用率的方式；**

**HTTP压缩的流程什么呢？**

第一步：HTTP数据在服务器发送前就已经被压缩了；（可以在webpack中完成）

第二步：兼容的浏览器在向服务器发送请求时，会告知服务器自己支持哪些压缩格式；

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601224348617.png" alt="image-20240601224348617" style="zoom:80%;" />

第三步：服务器在浏览器支持的压缩格式下，直接返回对应的压缩后的文件，并且在响应头中告知浏览器；

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601224408512.png" alt="image-20240601224408512" style="zoom:67%;" />

## **目前的压缩格式**

**目前的压缩格式非常的多：**

compress – UNIX的“compress”程序的方法（历史性原因，不推荐大多数应用使用，应该使用gzip或deflate）；

deflate – 基于deflate算法（定义于RFC 1951）的压缩，使用zlib数据格式封装；

gzip – GNU zip格式（定义于RFC 1952），是目前使用比较广泛的压缩算法；

br – 一种新的开源压缩算法，专为HTTP内容的编码而设计；

## **Webpack对文件压缩**

开发环境如果想要进行压缩，设置compress为true即可。

```javascript
module.exports = {
  mode: 'development',
  devServer: {
    ...
    compress: true,
    ...
  },
}
```

**webpack中相当于是实现了HTTP压缩的第一步操作，我们可以使用CompressionPlugin。**

**第一步，安装CompressionPlugin：**

```json
npm install compression-webpack-plugin -D
```

**第二步，使用CompressionPlugin即可：**

```javascript
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  mode: 'production',
  devtool: false,
	plugins: [
    // 对打包后的文件(js/css)进行压缩
    new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: 'gzip'
    })
  ]
}
```

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601232551547.png" alt="image-20240601232551547" style="zoom:67%;" />

## **HTML文件中代码的压缩**

我们之前使用了**HtmlWebpackPlugin**插件来生成HTML的模板，事实上它还有一些其他的配置：

**inject：设置打包的资源插入的位置**

true、 false 、body、head，默认是插入到head中

**cache：设置为true，只有当文件改变时，才会生成新的文件（默认值也是true）**

**minify：默认会使用一个插件html-minifier-terser**

webpack.comm.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getCommonConfig = function(isProdution) {
  return {
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html',
          cache: true,
          minify: isProdution? {
            // 移除注释
            removeComments: true,
            // 移除属性
            removeEmptyAttributes: true,
            // 移除默认属性
            removeRedundantAttributes: true,
            // 折叠空白字符
            collapseWhitespace: true,
            // 压缩内联的CSS
            minifyCSS: true,
            // 压缩JavaScript
            minifyJS: {
              mangle: {
                toplevel: true
              }
            }
          }: false // 开发环境不压缩
        }),
      ]
  }
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .btn {
      font-size: 30px;
    }
  </style>
</head>
<body>
  <!-- react的root -->
  <div id="root"></div>
	
  <div class=""></div>
  <input type="text">
	
  <!-- <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.2.0/axios.min.js"></script> -->
  <script src="https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script>
    const message = "hello html"
    console.log(message)
  </script>
</body>
</html>
```

removeComments 设置为true，上面的注释会被移除。

removeEmptyAttributes设置为true，class ="" 会被移除。

removeRedundantAttributes设置为true，input中的type="text"会被移除。

collapseWhitespace设置为true，空白字符会被移除。

minifyCSS设置为true，style中的样式会被压缩。

## **分析一：打包的时间分析**

**如果我们希望看到每一个loader、每一个Plugin消耗的打包时间，可以借助于一个插件：speed-measure-webpack-plugin**

注意：该插件在最新的webpack版本中存在一些兼容性的问题（和部分Plugin不兼容）

截止2021-3-10日，但是目前该插件还在维护，所以可以等待后续是否更新；

我这里暂时的做法是把不兼容的插件先删除掉，也就是不兼容的插件不显示它的打包时间就可以了；

**第一步，安装speed-measure-webpack-plugin插件**

```json
npm install speed-measure-webpack-plugin -D
```

**第二步，使用speed-measure-webpack-plugin插件**

创建插件导出的对象 SpeedMeasurePlugin；

使用 smp.wrap 包裹我们导出的webpack配置；

webpack.comm.js

```javascript
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

...
// webpack允许导出一个函数
module.exports = function(env) {
  const isProduction = env.production
  let mergeConfig = isProduction ? prodConfig: devConfig
  const finalConfig = merge(getCommonConfig(isProduction), mergeConfig)
  return smp.wrap(finalConfig)
}
```

## **分析二：打包后文件分析**

**方案一：生成一个stats.json的文件**

package.json

```json
{
  "scripts": {
    "build": "webpack --config ./config/comm.config.js --env production --profile --json=stats.json",
  }
}
```

**通过执行npm run build可以获取到一个stats.json的文件：**

这个文件我们自己分析不容易看到其中的信息；

可以放到 `https://github.com/webpack/analyse`，进行分析

目前，这个仓库打开之后有个分析地址，已经失效

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240601234932504.png" alt="image-20240601234932504" style="zoom:67%;" />

只能把这个项目clone下来，然后安装依赖跑起来，把生成的stats.json拖进去，就可以看到分析信息

![image-20240601235047070](http://139.196.79.103:9001/myimages/imgs/image-20240601235047070.png)

## **分析二：打包后文件分析**

**方案二：使用webpack-bundle-analyzer工具**

另一个非常直观查看包大小的工具是webpack-bundle-analyzer。

**第一步，我们可以直接安装这个工具：**

```json
npm install webpack-bundle-analyzer -D
```

**第二步，我们可以在webpack配置中使用该插件：**

**在打包webpack的时候，这个工具是帮助我们打开一个8888端口上的服务，我们可以直接的看到每个包的大小。**

比如有一个包时通过一个Vue组件打包的，但是非常的大，那么我们可以考虑是否可以拆分出多个组件，并且对其进行懒加载；

比如一个图片或者字体文件特别大，是否可以对其进行压缩或者其他的优化处理；

```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    // 对打包后的结果进行分析
    new BundleAnalyzerPlugin()
  ]
}
```

## **Webpack的启动流程**

![image-20240602195234881](http://139.196.79.103:9001/myimages/imgs/image-20240602195234881.png)

## **Webpack源码阅读**

第一步：下载webpack的源码

https://github.com/webpack/webpack

第二步：安装项目相关的依赖

```json
npm install
```

第三步：编写自己的源代码

这里我创建了一个 why 文件夹，里面存放了一些代码

第四步：编写webpack的配置文件

webpack.config.js

第五步：编写启动的文件build.js

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240602001956927.png" alt="image-20240602001956927" style="zoom:67%;" />

```javascript
const webpack = require('../webpack');
const config = require("./webpack.config");

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats);
  }
});
```

## **创建Compiler**

![image-20240602202049214](http://139.196.79.103:9001/myimages/imgs/image-20240602202049214.png)

## **Compiler中run方法执行的Hook**

![image-20240602202118752](http://139.196.79.103:9001/myimages/imgs/image-20240602202118752.png)

## **Compilation对Module的处理**

![image-20240602202139917](http://139.196.79.103:9001/myimages/imgs/image-20240602202139917.png)

## **module的build阶段**

![image-20240602202158384](http://139.196.79.103:9001/myimages/imgs/image-20240602202158384.png)

## **输出asset阶段**

![image-20240602202216182](http://139.196.79.103:9001/myimages/imgs/image-20240602202216182.png)

## **Compiler和Compilation的区别**

Compiler和Compilation的区别

在webpack构建的之初就会创建的一个对象, 并且在webpack的整个生命周期都会存在(before - run - beforeCompiler - compile -

make - finishMake - afterCompiler - done)

只要是做webpack的编译, 都会先创建一个Compiler

Compilation是到准备编译模块(比如main.js), 才会创建Compilation对象

主要是存在于 compile - make 阶段主要使用的对象

watch -> 源代码发生改变就需要重新编译模块

Compiler可以继续使用(如果我修改webpack的配置, 那么需要重新执行run run build)

Compilation需要创建一个新的Compilation对象