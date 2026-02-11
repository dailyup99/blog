---
outline: deep
---

## 创建自己的 Loader

Loader 是用于对模块的源代码进行转换（处理），之前我们已经使用过很多 Loader，比如 css-loader、style-
loader、babel-loader 等。

这里我们来学习如何自定义自己的 Loader：

Loader 本质上是一个导出为函数的 JavaScript 模块；

loader runner 库会调用这个函数，然后将上一个 loader 产生的结果或者资源文件传入进去；

编写一个 hy-loader01.js 模块这个函数会接收三个参数：

- content：资源文件的内容；
- map：sourcemap 相关的数据；
- meta：一些元数据；

hy-loaders/hy-loader01.js

```javascript
module.exports = function (content, map, meta) {
  console.log(content, "哈哈哈, 这是我的loader01");
  return content;
};
```

## 在加载某个模块时，引入 loader

注意：传入的路径和 context 是有关系的，在前面我们讲入口的相对路径时有讲过。

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: "./hy-loaders/hy-loader01.js",
      },
    ],
  },
};
```

## resolveLoader 属性

但是，如果我们依然希望可以直接去加载自己的 loader 文件夹，有没有更加简洁的办法呢？

配置 resolveLoader 属性；

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: "hy-loader01.js", // 这里就可以简写，.js可写可不写
      },
    ],
  },
  resolveLoader: {
    modules: ["node_modules", "./hy-loaders"], // 先从node_modules目录找，找不到再从hy-loaders找
  },
};
```

之前使用 css-loader 之类的 loader 的时候，是因为 resolveLoader 默认配置了 node_modules，会去 node_modules 中查找。

## loader 的执行顺序

创建多个 Loader 使用，它的执行顺序是什么呢？

从后向前、从右向左的

<img src="..\..\images\image-20240609110627688.png" />

## pitch-loader 和 enforce

事实上还有另一种 Loader，称之为 PitchLoader

hy-loaders/hy-loader01.js

```javascript
// NormalLoader
module.exports = function (content) {
  console.log(content, "哈哈哈, 这是我的loader01");
};
// PitchLoader
module.exports.pitch = function () {
  console.log("loader pitch 01");
};
```

## 执行顺序和 enforce

其实这也是为什么 loader 的执行顺序是相反的

run-loader 先优先执行 PitchLoader，在执行 PitchLoader 时进行 loaderIndex++；

run-loader 之后会执行 NormalLoader，在执行 NormalLoader 时进行 loaderIndex--；

那么，能不能改变它们的执行顺序呢？

我们可以拆分成多个 Rule 对象，通过 enforce 来改变它们的顺序；

enforce 一共有四种方式：

默认所有的 loader 都是 normal；

在行内设置的 loader 是 inline（在前面将 css 加载时讲过，import 'loader1!loader2!./test.js'）；

也可以通过 enforce 设置 pre 和 post；

在 Pitching 和 Normal 它们的执行顺序分别是：

- post, inline, normal, pre；

- pre, normal, inline, post；

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: "hy-loader01",
      },
      {
        test: /\.js$/i,
        use: "hy-loader02",
        enforce: "pre", // pre会最先执行,post是最后执行
      },
      {
        test: /\.js$/i,
        use: "hy-loader03",
      },
    ],
  },
};
```

## 同步的 Loader

什么是同步的 Loader 呢？

- 默认创建的 Loader 就是同步的 Loader；

- 这个 Loader 必须通过 return 或者 this.callback 来返回结果，交给下一个 loader 来处理；

- 通常在有错误的情况下，我们会使用 this.callback；

this.callback 的用法如下：

- 第一个参数必须是 Error 或者 null；

- 第二个参数是一个 string 或者 Buffer；

```javascript
// 同步Loader
module.exports = function (content) {
  console.log(content, "哈哈哈, 这是我的loader01");
  // 同步的loader, 两种方法返回数据
  // return content;
  this.callback(null, content); // 第一个参数是错误信息
};
```

## 异步的 Loader

什么是异步的 Loader 呢？

有时候我们使用 Loader 时会进行一些异步的操作；

我们希望在异步操作完成后，再返回这个 loader 处理的结果；

这个时候我们就要使用异步的 Loader 了；

loader-runner 已经在执行 loader 时给我们提供了方法，让 loader 变成一个异步的 loader：

```javascript
// 异步Loader: this.async()
module.exports = function (content) {
  console.log(content, "哈哈哈, 这是我的loader01");
  const callback = this.async();

  setTimeout(() => {
    callback(null, content);
  }, 2000);
};
```

## 传入和获取参数

在使用 loader 时，传入参数。

我们可以通过一个 webpack 官方提供的一个解析库 loader-utils，安装对应的库。

```json
npm install loader-utils -D
```

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      // Rule对象
      {
        test: /\.js$/i,
        use: {
          loader: "hy-loader01",
          options: {
            name: "why",
            age: 18,
          },
        },
      },
    ],
  },
};
```

hy-loader01.js

```javascript
const { getOptions } = require("loader-utils");

module.exports = function (content) {
  console.log(content, "哈哈哈, 这是我的loader01");

  // 获取传入的参数:
  const options = getOptions(this);
  console.log("传入的参数是:", options);

  const callback = this.async();

  setTimeout(() => {
    callback(null, content);
  }, 2000);
};
```

## 校验参数

我们可以通过一个 webpack 官方提供的校验库 schema-utils，安装对应的库：

```json
npm install schema-utils -D
```

hy-schema/loader01-schema.json

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "请输入您的名字"
    },
    "age": {
      "type": "number",
      "description": "请输入您的年龄"
    }
  }
}
```

hy-loader01.js

```javascript
const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");

const schema = require("../hy-schema/loader01-schema.json");

// NormalLoader
// 异步Loader: this.async()
module.exports = function (content) {
  console.log(content, "哈哈哈, 这是我的loader01");

  // 获取传入的参数:
  const options = getOptions(this);
  console.log("传入的参数是:", options);

  validate(schema, options, {
    name: "hy-loader01",
  });

  const callback = this.async();

  setTimeout(() => {
    callback(null, content);
  }, 2000);
};
```

假如 age 传入的是字符串，就会提示要输入 number 类型。

## babel-loader 案例

我们知道 babel-loader 可以帮助我们对 JavaScript 的代码进行转换，这里我们定义一个自己的 babel-loader：

需要安装@babel/core 和@babel/preset-env，

hybable-loader.js

```javascript
const babel = require("@babel/core");
const { getOptions } = require("loader-utils");

module.exports = function (content) {
  // 0.设置为异步的loader
  const callback = this.async();

  // 1.获取传入的参数
  const options = getOptions(this);

  // 2.对源代码进行转换
  babel.transform(content, options, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
};
```

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: "hybabel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

如果想要校验参数，

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "请输入您的名字"
    },
    "age": {
      "type": "number",
      "description": "请输入您的年龄"
    }
  },
  "additionalProperties": true // 传入额外的参数
}
```

## hymd-loader

实现一个 loader，用来转换 markdown 语法。

首先，我们先要有 markdown.md 的文件

src/doc.md

````json
# 学习webpack
## 一. 邂逅Webpack以及原理
* 认识webpack
* webpack的执行流程
* webpack的启动源码
* webpack的源码阅读


## 二. 学习Webpack基本配置
* 学习入口的配置
* 学习出口的配置
* 学习Loader

```js
console.log("Hello Loader");

const message = "Hello World";
console.log(message);

const foo = () => {
  console.log("foo");
}

foo();
```
````

然后在 main.js 中引入

```javascript
import "./doc.md";
```

然后，执行 npm run build 进行打包，必然会报错，因为没有处理 markdown 语法的 loader。

那么，就可以自定义自己的 loader，hymd-loader。

hymd-loader.js

```javascript
module.exports = function (content) {
  return content;
};
```

在 webpack.config.js 中使用自定义的 hymd-loader

```javascript
...
{
  test: /\.md$/i,
  use: [
    "hymd-loader"
  ]
},
...
```

自定义 loader 里面，我们需要对 markdown 语法进行转换，这里使用一个叫 markd 的库，安装一下，然后使用

```javascript
const marked = require("marked");

module.exports = function (content) {
  const htmlContent = marked(content);
  console.log(htmlContent);
  return content;
};
```

执行 npm run build，控制台可以看到 markdown 语法都被转换成了 html。

<img src="..\..\images\image-20240609150336259.png" />

我们找到自定义的 hymd-loader，将转换后的 htmlContent 返回。

```javascript
const marked = require("marked");

module.exports = function (content) {
  const htmlContent = marked(content);
  console.log(htmlContent);
  return htmlContent; // 返回htmlContent
};
```

但是发现，执行 npm run build，依然会报错，没办法对 htmlContent 进行解析，这是因为返回值是一个 string，但是 webpack 识别的 loader 只有两种格式，一种是 buffer，比如视频，字体之类的；另外一种是 javascript string，目前是 string，所以没有办法识别。

那么怎么样才能识别呢？

下面提供两种方案，

方案一，借助 html-loader，这个 loader 用来专门处理 html

webpack.config.js

```javascript
...
devtool: "source-map",
{
  test: /\.md$/i,
  use: [
    "html-loader",
    "hymd-loader"
  ]
},
...
```

然后，执行 npm run build 再次打包（devtool 为 source-map 的情况下），会发现打包出来的结果长下面这样。

![image-20240609151112653](../../images/image-20240609151112653.png)

那么我们就可以在 main.js 中引入这个 code，

```javascript
import code from "./doc.md";

document.body.innerHTML = code;
```

再次打包，浏览器运行就可以看到 markdown 语法被转化了。

![image-20240609151331514](../../images/image-20240609151331514.png)

除了借助 hltml-loader，还有另外一种方案，我们自己拼接成 javascript 的格式。

```javascript
const marked = require("marked");

module.exports = function (content) {
  const htmlContent = marked(content);
  const innerContent = "`" + htmlContent + "`";
  const moduleCode = `var code=${innerContent}; export default code;`;
  return moduleCode;
};
```

上面两种方案都能实现，另外发现运行在浏览器上的 js 代码，如果想要加个背景或者高亮什么的，就需要使用到其他的一些库。

上面的 js 代码是用 pre 标签包裹，我们可以写一些 css 样式

style.css

```css
pre {
  background-color: #f2f2f2;
  padding: 10px;
}
```

main.js

```javascript
import "./style.css";
```

另外，还需要 webpack.config.js 中处理 css

```javascript
...
{
  test: /\.css$/i,
  use: [
    "style-loader",
    "css-loader"
  ]
}
...
```

打包之后，就可以看到 js 代码被加了背景，除此之外，我们还想要一些关键字高亮，这里使用到一个库，叫 highlight.js

```javascript
const marked = require("marked");
const hljs = require("highlight.js");

module.exports = function (content) {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(lang, code).value;
    },
  });

  const htmlContent = marked(content);
  const innerContent = "`" + htmlContent + "`";
  const moduleCode = `var code=${innerContent}; export default code;`;
  return moduleCode;
};
```

再次打包发现标签都被加上了一些样式

<img src="..\..\images\image-20240609152253876.png" />

那么，我们就可以根据这些 class 名来自定义样式，

style.css

```css
.hljs-built_in {
  color: red;
}
```

但是，我们一般不会一个个去自定义，可以使用 highlight.js 这个库提供的默认样式。

main.js

```javascript
import "highlight.js/styles/default.css";
```

再次打包，发现代码已经高亮

<img src="..\..\images\image-20240609152533265.png" />
