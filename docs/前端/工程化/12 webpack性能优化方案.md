---
outline: deep
---

## **如何使用webpack性能优化？**

**webpack作为前端目前使用最广泛的打包工具，在面试中也是经常会被问到的。**

**比较常见的面试题包括：**

可以配置哪些属性来进行webpack性能优化？

前端有哪些常见的性能优化？（问到前端性能优化时，除了其他常见的，也完全可以从webpack来回答）

**webpack的性能优化较多，我们可以对其进行分类：**

* 优化一：打包后的结果，上线时的性能优化。（比如分包处理、减小包体积、CDN服务器等）
* 优化二：优化打包速度，开发或者构建时优化打包速度。（比如exclude、cache-loader等）

**大多数情况下，我们会更加侧重于优化一，这对于线上的产品影响更大。**

**在大多数情况下webpack都帮我们做好了该有的性能优化：**

比如配置mode为production或者development时，默认webpack的配置信息；

但是我们也可以针对性的进行自己的项目优化；

**接下来，我们来学习一下webpack性能优化的更多细节。**

## **性能优化 - 代码分离**

**代码分离（Code Splitting）是webpack一个非常重要的特性：**

它主要的目的是将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件；

比如默认情况下，所有的JavaScript代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载，就会影响首页

的加载速度；

代码分离可以分出更小的bundle，以及控制资源加载优先级，提供代码的加载性能；

分包处理的优势和必要性：

![image-20240527230421235](http://139.196.79.103:9001/myimages/imgs/image-20240527230421235.png)

**Webpack中常用的代码分离有三种：**

入口起点：使用entry配置手动分离代码；

防止重复：使用Entry Dependencies或者SplitChunksPlugin去重和分离代码；

动态导入：通过模块的内联函数调用来分离代码；

## **多入口起点**

**入口起点的含义非常简单，就是配置多入口：**

比如配置一个index.js和main.js的入口；

正常情况下，如果我们只配置一个入口文件，那么只会打包一个，配置如下：

webapck.config.js

```javascript
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
}
```

可以看到执行npm run build打包之后的index.html只会引入bundle.js，并没有对我们的main.js进行引入

![image-20240527231324802](http://139.196.79.103:9001/myimages/imgs/image-20240527231324802.png)

如果想要对main.js也进行打包，就需要进行多入口的配置，配置如下：

webpack.config.js

```javascript
module.exports = {
  entry: {
    index: {
      import: './src/index.js',
    },
    main: {
      import: './src/main.js',
    },
  },
  output: {
    path: path.resolve(__dirname, './build'),
    // placeholder
    filename: '[name]-bundle.js',
  },
}
```

![image-20240527231625477](http://139.196.79.103:9001/myimages/imgs/image-20240527231625477.png)

![image-20240527231653531](http://139.196.79.103:9001/myimages/imgs/image-20240527231653531.png)