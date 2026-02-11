---
outline: deep
---

## **为什么要搭建本地服务器？**

**目前我们开发的代码，为了运行需要有两个操作：**

操作一：npm run build，编译相关的代码；

操作二：通过 live server 或者直接通过浏览器，打开 index.html 代码，查看效果；

**这个过程经常操作会影响我们的开发效率，我们希望可以做到，当文件发生变化时，可以自动的完成** **编译** **和** **展示；**

**为了完成自动编译，webpack 提供了几种可选的方式：**

webpack watch mode；

webpack-dev-server（常用）；

webpack-dev-middleware；

## **webpack-dev-server**

**上面的方式可以监听到文件的变化，但是事实上它本身是没有自动刷新浏览器的功能的：**

当然，目前我们可以在 VSCode 中使用 live-server 来完成这样的功能；

但是，我们希望在不使用 live-server 的情况下，可以具备 live reloading（实时重新加载）的功能；

**安装 webpack-dev-server**

```json
npm install webpack-dev-server -D
```

**修改配置文件，启动时加上 serve 参数：**

package.json

```json
{
  "scripts": {
    "serve": "webpack serve"
  }
}
```

**webpack-dev-server 在编译之后不会写入到任何输出文件，而是将 bundle 文件保留在内存中：**

事实上 webpack-dev-server 使用了一个库叫 memfs（memory-fs webpack 自己写的）

## **devServer 的 static**

**devServer 中 static 对于我们直接访问打包后的资源其实并没有太大的作用，它的主要作用是如果我们打包后的资源，又依赖于**

**其他的一些资源，那么就需要指定从哪里来查找这个内容：**

比如在 index.html 中，我们需要依赖一个 abc.js 文件，这个文件我们存放在 public 文件 中；

public 目录下可以放一些静态资源，比如 js/css/img/font 等

在 index.html 中，我们应该如何去引入这个文件呢？

<img src="..\..\images\image-20240526152230257.png" />

webpack.config.js 中设置 static 即可，但是注意，使用的时候要用相对路径

```javascript
module.exports = {
  devServer: {
    static: ["public", "content"],
  },
};
```

public 是默认进行配置的，也可以不写。

## **hotOnly、host 配置**

**hotOnly 是当代码编译失败时，是否刷新整个页面：**

默认情况下当代码编译失败修复后，我们会重新刷新整个页面；

如果不希望重新刷新整个页面，可以设置 hotOnly 为 true；

**host 设置主机地址：**

默认值是 localhost；

如果希望其他地方也可以访问，可以设置为 0.0.0.0；

**localhost 和 0.0.0.0 的区别：**

localhost：本质上是一个域名，通常情况下会被解析成 127.0.0.1;

127.0.0.1：回环地址(Loop Back Address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收;

- 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ;
- 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的;
- 比如我们监听 127.0.0.1 时，在同一个网段下的主机中，通过 ip 地址是不能访问的;

  0.0.0.0：监听 IPV4 上所有的地址，再根据端口找到不同的应用程序;

- 比如我们监听 0.0.0.0 时，在同一个网段下的主机中，通过 ip 地址是可以访问的;

## **port、open、compress**

**port 设置监听的端口，默认情况下是 8080**

**open 是否打开浏览器：**

- 默认值是 false，设置为 true 会打开浏览器；
- 也可以设置为类似于 Google Chrome 等值；

**compress 是否为静态文件开启 gzip compression：**

默认值是 false，可以设置为 true；

![image-20240526153633182](../../images/image-20240526153633182.png)

webpack.config.js

```javascript
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    compress: true,
  },
};
```

## **Proxy 代理**

**proxy 是我们开发中非常常用的一个配置选项，它的目的设置代理来解决跨域访问的问题：**

比如我们的一个 api 请求是 `http://localhost:8888`，但是本地启动服务器的域名是 `http://localhost:8080`，这个时候发送网

络请求就会出现跨域的问题；

那么我们可以将请求先发送到一个代理服务器，代理服务器和 API 服务器没有跨域的问题，就可以解决我们的跨域问题了；

**我们可以进行如下的设置：**

target：表示的是代理到的目标地址，比如 /api-hy/moment 会被代理到 `http://localhost:8888/api-hy/moment`；

pathRewrite：默认情况下，我们的 /api-hy 也会被写入到 URL 中，如果希望删除，可以使用 pathRewrite；

changeOrigin：它表示是否更新代理后请求的 headers 中 host 地址；

```javascript
module.exports = {
  proxy: {
    "/api": {
      target: "http://localhost:9000",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    },
  },
};
```

## **changeOrigin 的解析**

**这个 changeOrigin 官方说的非常模糊，通过查看源码我发现其实是要修改代理请求中的 headers 中的 host 属性：**

首先，我们 koa 代码搭建 api 的服务器

```javascript
// koa代码搭建api的服务器
const Koa = require("koa");
const KoaRouter = require("@koa/router");

const app = new Koa();

const userRouter = new KoaRouter({ prefix: "/users" });
userRouter.get("/list", (ctx, next) => {
  console.log(ctx.headers); // 查看host

  ctx.body = [
    { name: "why", age: 18, score: 99 },
    { name: "kobe", age: 30, score: 100 },
    { name: "james", age: 25, score: 100 },
  ];
});
app.use(userRouter.routes());

app.listen(9000, () => {
  console.log("api服务器启动成功~");
});
```

src/index.js

```javascript
// 8.发送网络请求获取数据
axios.get("/api/users/list").then((res) => {
  console.log(res.data);
});
```

目前 webpack.config.js 的配置如下：

```javascript
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8888,
    open: true,
    compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
```

发送/api/users/list 这个请求本质上访问的是`http://localhost:8888//users/list`，然后将这个请求发送给代理服务器 devServer，devServer 再发送给 koa 服务器，koa 服务器 header 中的 host 属性是`http://localhost:8888`，但是因为服务器的地址是`http://localhost:9000`，如果服务器有判断 host 不是 localhost:9000 就不返回数据（防止数据被爬），那么接口访问就不能拿到数据。

所以，我们需要设置 changeOrigin 为 true，设置之后会怎么样呢？

```javascript
module.exports = {
  devServer: {
    ...
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true // changeOrigin设置为true
      }
   },
  }
}
```

设置 changeOrigin 为 true 之后代理服务器发送给 koa 服务器就是`http://localhost:9000/users/list`，这样就能返回数据。

<img src="..\..\images\image-20240526160657024.png" />

在源码中有判断如果 changeOrigin 为 true，就会使用 target 的地址

![image-20240526161111354](../../images/image-20240526161111354.png)

## **historyApiFallback**

**historyApiFallback 是开发中一个非常常见的属性，它主要的作用是解决 SPA 页面在路由跳转之后，进行页面刷新时，返回 404**

**的错误。**

**boolean 值：默认是 false**

如果设置为 true，那么在刷新时，返回 404 错误时，会自动返回 index.html 的内容；

**object 类型的值，可以配置 rewrites 属性：**

可以配置 from 来匹配路径，决定要跳转到哪一个页面；

**事实上 devServer 中实现 historyApiFallback 功能是通过 connect-history-api-fallback 库的**：

可以查看 connect-history-api-fallback 文档，地址：https://github.com/bripkens/connect-history-api-fallback
