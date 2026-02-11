---
outline: deep
---

## **认识 Koa**

**前面我们已经学习了 express，另外一个非常流行的 Node Web 服务器框架就是 Koa。**

**Koa 官方的介绍：**

koa：next generation web framework for node.js；

koa：node.js 的下一代 web 框架；

**事实上，koa 是 express 同一个团队开发的一个新的 Web 框架：**

目前团队的核心开发者 TJ 的主要精力也在维护 Koa，express 已经交给团队维护了；

Koa 旨在为 Web 应用程序和 API 提供更小、更丰富和更强大的能力；

相对于 express 具有更强的异步处理能力（后续我们再对比）；

Koa 的核心代码只有 1600+行，是一个更加轻量级的框架；

我们可以根据需要安装和使用中间件；

**事实上学习了 express 之后，学习 koa 的过程是很简单的；**

## **Koa 初体验**

**我们来体验一下 koa 的 Web 服务器，创建一个接口。**

koa 也是通过注册中间件来完成请求操作的；

**koa 注册的中间件提供了两个参数：**

**ctx：上下文（Context）对象；**

- koa 并没有像 express 一样，将 req 和 res 分开，而是将它们作为 ctx 的属性；
- ctx 代表一次请求的上下文对象；
- ctx.request：获取请求对象；
- ctx.response：获取响应对象；

**next：本质上是一个 dispatch，类似于之前的 next；**

后续我们学习 Koa 的源码，来看一下它是一个怎么样的函数；

<img src="..\..\images\202407141043482.png" />

```javascript
const Koa = require("koa");

// 创建app对象
const app = new Koa();

// 注册中间件(middleware)
// koa的中间件有两个参数: ctx/next
app.use((ctx, next) => {
  console.log("匹配到koa的中间件");
  ctx.body = "哈哈哈哈哈";
});

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

## ctx 参数的解析

```javascript
const Koa = require("koa");

// 创建app
const app = new Koa();

// 中间件
app.use((ctx, next) => {
  // 1.请求对象
  console.log(ctx.request); // 请求对象: Koa封装的请求对象
  console.log(ctx.req); // 请求对象: Node封装的请求对象

  // 2.响应对象
  console.log(ctx.response); // 响应对象: Koa封装的响应对象
  console.log(ctx.res); // 响应对象: Node封装的响应对象

  // 3.其他属性
  console.log(ctx.query);
  // console.log(ctx.params)

  next();
});

app.use((ctx, next) => {
  console.log("second middleware~");
});

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

## **Koa 中间件**

**koa 通过创建的 app 对象，注册中间件只能通过 use 方法：**

Koa 并没有提供 methods 的方式来注册中间件；

也没有提供 path 中间件来匹配路径；

**但是真实开发中我们如何将路径和 method 分离呢？**

方式一：根据 request 自己来判断；

方式二：使用第三方路由中间件；

<img src="..\..\images\202407141055435.png" />

```javascript
const Koa = require("koa");

// 创建app
const app = new Koa();

// 中间件: path/method使用路由
app.use((ctx, next) => {
  if (ctx.path === "/users") {
    if (ctx.method === "GET") {
      ctx.body = "user data list";
    } else if (ctx.method === "POST") {
      ctx.body = "create user success~";
    }
  } else if (ctx.path === "/home") {
    ctx.body = "home data list~";
  } else if (ctx.path === "/login") {
    ctx.body = "登录成功, 欢迎回来~";
  }
});

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

## **路由的使用**

koa 官方并没有给我们提供路由的库，我们可以选择第三方库：koa-router

```json
npm install @koa/router
```

**我们可以先封装一个 user.router.js 的文件：**

**在 app 中将 router.routes()注册为中间件：**

**注意：allowedMethods 用于判断某一个 method 是否支持：**

如果我们请求 get，那么是正常的请求，因为我们有实现 get；

如果我们请求 put、delete、patch，那么就自动报错：Method Not Allowed，状态码：405；

如果我们请求 link、copy、lock，那么久自动报错：Not Implemented，状态码：501；

简单来说，如果没有使用 allowedMethods，就只会报 Not found，使用了之后报错信息更加明确。

```javascript
const Koa = require("koa");
const userRouter = require("./router/userRouter");
// const KoaRouter = require('@koa/router')

// 创建服务器app
const app = new Koa();

// 路由的使用
// // 1.创建路由对象
// const userRouter = new KoaRouter({ prefix: '/users' })

// // 2.在路由中注册中间件: path/method
// userRouter.get('/', (ctx, next) => {
//   ctx.body = 'users list data~'
// })
// userRouter.get('/:id', (ctx, next) => {
//   const id = ctx.params.id
//   ctx.body = '获取某一个用户' + id
// })
// userRouter.post('/', (ctx, next) => {
//   ctx.body = '创建用户成功~'
// })
// userRouter.delete('/:id', (ctx, next) => {
//   const id = ctx.params.id
//   ctx.body = '删除某一个用户' + id
// })
// userRouter.patch('/:id', (ctx, next) => {
//   const id = ctx.params.id
//   ctx.body = '修改某一个用户' + id
// })

// 3.让路由中的中间件生效
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

router/userRouter.js

```javascript
const KoaRouter = require("@koa/router");

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

// 2.在路由中注册中间件: path/method
userRouter.get("/", (ctx, next) => {
  ctx.body = "users list data~";
});
userRouter.get("/:id", (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = "获取某一个用户" + id;
});
userRouter.post("/", (ctx, next) => {
  ctx.body = "创建用户成功~";
});
userRouter.delete("/:id", (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = "删除某一个用户" + id;
});

module.exports = userRouter;
```

## **参数解析：params - query**

**请求地址：`http://localhost:8000/users/123`**

获取 params：

<img src="..\..\images\202407141124377.png" />

**请求地址：`http://localhost:8000/login?username=why&password=123`**

获取 query：

<img src="..\..\images\202407141125819.png" />

## **参数解析：json**

**请求地址：`http://localhost:8000/login`**

**body 是 json 格式：**

<img src="..\..\images\202407141125397.png" />

**获取 json 数据：**

安装依赖： npm install koa-bodyparser;

使用 koa-bodyparser 的中间件；

<img src="..\..\images\202407141126285.png" />

## **参数解析：x-www-form-urlencoded**

**请求地址：`http://localhost:8000/login`**

body 是 x-www-form-urlencoded 格式：

![image-20240714112655164](../../images/202407141126210.png)

**获取 json 数据：(和 json 是一致的)**

安装依赖： npm install koa-bodyparser;

使用 koa-bodyparser 的中间件；

<img src="..\..\images\202407141127266.png" />

## **参数解析：form-data**

请求地址：`http://localhost:8000/login`

body 是 form-data 格式

![image-20240714112752620](../../images/202407141127668.png)

解析 body 中的数据，我们需要使用 multer

安装依赖：npm install koa-multer multer;

使用 multer 中间件；

<img src="..\..\images\202407141128809.png" />

```javascript
const Koa = require("koa");
const KoaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const multer = require("@koa/multer");

// 创建app对象
const app = new Koa();

// 使用第三方中间件解析body数据
app.use(bodyParser());
const formParser = multer();

// 注册路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

/**
 * 1.get: params方式, 例子:/:id
 * 2.get: query方式, 例子: ?name=why&age=18
 * 3.post: json方式, 例子: { "name": "why", "age": 18 }
 * 4.post: x-www-form-urlencoded
 * 5.post: form-data
 */
// 1.get/params
userRouter.get("/:id", (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = "user list data~:" + id;
});

// 2.get/query
userRouter.get("/", (ctx, next) => {
  const query = ctx.query;
  console.log(query);
  ctx.body = "用户的query信息" + JSON.stringify(query);
});

// 3.post/json(使用最多)
userRouter.post("/json", (ctx, next) => {
  // 注意事项: 不能从ctx.body中获取数据
  console.log(ctx.request.body, ctx.req.body);

  // ctx.body用于向客户端返回数据
  ctx.body = "用户的json信息";
});

// 4.post/urlencoded
userRouter.post("/urlencoded", (ctx, next) => {
  console.log(ctx.request.body);

  ctx.body = "用户的urlencoded信息";
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// 5.post/form-data
userRouter.post("/formdata", formParser.any(), (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = "用户的formdata信息";
});

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

## **Multer 上传文件**

```javascript
const Koa = require("koa");
const KoaRouter = require("@koa/router");
const multer = require("@koa/multer");

// 创建app对象
const app = new Koa();

// const upload = multer({
//   dest: './uploads'
// })

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./uploads");
    },
    filename(req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

// 注册路由对象
const uploadRouter = new KoaRouter({ prefix: "/upload" });
// 单个文件上传
uploadRouter.post("/avatar", upload.single("avatar"), (ctx, next) => {
  console.log(ctx.request.file);
  ctx.body = "文件上传成功~";
});
// 多个文件上传
uploadRouter.post("/photos", upload.array("photos"), (ctx, next) => {
  console.log(ctx.request.files);
  ctx.body = "文件上传成功~";
});

app.use(uploadRouter.routes());
app.use(uploadRouter.allowedMethods());

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

## **静态服务器**

koa 并没有内置部署相关的功能，所以我们需要使用第三方库：

```json
npm install koa-static
```

部署的过程类似于 express：

<img src="..\..\images\202407141205348.png" />

```javascript
const Koa = require("koa");
const static = require("koa-static");

const app = new Koa();

// app.use((ctx, next) => {
//   ctx.body = "哈哈哈哈"
// })

app.use(static("./uploads"));
app.use(static("./build"));

app.listen(8000, () => {
  console.log("koa服务器启动成功~");
});
```

## **数据的响应**

**输出结果：body**将响应主体设置为以下之一：

- string ：字符串数据
- Buffer ：Buffer 数据
- Stream ：流数据
- Object|| Array：对象或者数组
- null ：不输出任何内容
- 如果 response.status 尚未设置，Koa 会自动将状态设置为 200 或 204。

上面返回 null 状态是 204，其他的状态是 200。

**请求状态：status**

```javascript
const fs = require("fs");
const Koa = require("koa");
const KoaRouter = require("@koa/router");

// 创建app对象
const app = new Koa();

// 注册路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

userRouter.get("/", (ctx, next) => {
  // 1.body的类型是string
  // ctx.body = 'user list data~'

  // 2.body的类型是Buffer
  // ctx.body = Buffer.from('你好啊, 李银河~')

  // 3.body的类型是Stream
  // const readStream = fs.createReadStream('./uploads/1668331072032_kobe02.png')
  // ctx.type = 'image/jpeg'
  // ctx.body = readStream

  // 4.body的类型是数据(array/object) => 使用最多
  ctx.status = 201; // 也可以设置状态码，默认200或204
  ctx.body = {
    code: 0,
    data: [
      { id: 111, name: "iphone", price: 100 },
      { id: 112, name: "xiaomi", price: 990 },
    ],
  };

  // 5.body的值是null, 自动设置http status code为204
  // ctx.body = null
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

## **错误处理**

通过 EventEmitter 的方式处理错误

```javascript
const Koa = require("koa");
const KoaRouter = require("@koa/router");

// 创建app对象
const app = new Koa();

// 注册路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

userRouter.get("/", (ctx, next) => {
  const isAuth = false;
  if (isAuth) {
    ctx.body = "user list data~";
  } else {
    // ctx.body = {
    //   code: -1003,
    //   message: '未授权的token, 请检测你的token'
    // }
    // EventEmitter
    ctx.app.emit("error", -1003, ctx);
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// 独立的文件: error-handle.js
app.on("error", (code, ctx) => {
  const errCode = code;
  let message = "";
  switch (errCode) {
    case -1001:
      message = "账号或者密码错误~";
      break;
    case -1002:
      message = "请求参数不正确~";
      break;
    case -1003:
      message = "未授权, 请检查你的token信息";
      break;
  }

  const body = {
    code: errCode,
    message,
  };

  ctx.body = body;
});

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

## **和 express 对比**

在学习了两个框架之后，我们应该已经可以发现 koa 和 express 的区别：

**从架构设计上来说：**

express 是完整和强大的，其中帮助我们内置了非常多好用的功能；

koa 是简洁和自由的，它只包含最核心的功能，并不会对我们使用其他中间件进行任何的限制。

甚至是在 app 中连最基本的 get、post 都没有给我们提供；

我们需要通过自己或者路由来判断请求方式或者其他功能；

**因为 express 和 koa 框架他们的核心其实都是中间件：**

但是他们的中间件事实上，它们的中间件的执行机制是不同的，特别是针对某个中间件中包含异步操作时；

所以，接下来，我们再来研究一下 express 和 koa 中间件的执行顺序问题；

## express 中间件-执行同步

```javascript
const express = require("express");

// 创建app对象
const app = express();

// 编写中间件
app.use((req, res, next) => {
  console.log("express middleware01");
  req.msg = "aaa";
  next();
  // 返回值结果
  res.json(req.msg); // aaabbbccc
});

app.use((req, res, next) => {
  console.log("express middleware02");
  req.msg += "bbb";
  next();
});

app.use((req, res, next) => {
  console.log("express middleware03");
  req.msg += "ccc";
});

// 启动服务器
app.listen(9000, () => {
  console.log("express服务器启动成功~");
});
```

## koa 中间件-执行同步

```javascript
const Koa = require("koa");
const KoaRouter = require("@koa/router");

// 创建app对象
const app = new Koa();

// 注册中间件
app.use((ctx, next) => {
  console.log("koa middleware01");
  ctx.msg = "aaa";
  next();

  // 返回结果
  ctx.body = ctx.msg; // aaabbbccc
});

app.use((ctx, next) => {
  console.log("koa middleware02");
  ctx.msg += "bbb";
  next();
});

app.use((ctx, next) => {
  console.log("koa middleware03");
  ctx.msg += "ccc";
});

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

<img src="..\..\images\202407141607089.png" />

## koa 中间件-执行异步

```javascript
const Koa = require("koa");
const axios = require("axios");

// 创建app对象
const app = new Koa();

// 注册中间件
// 1.koa的中间件1
app.use(async (ctx, next) => {
  console.log("koa middleware01");
  ctx.msg = "aaa";
  await next();

  // 返回结果
  ctx.body = ctx.msg;
});

// 2.koa的中间件2
app.use(async (ctx, next) => {
  console.log("koa middleware02");
  ctx.msg += "bbb";
  // 如果执行的下一个中间件是一个异步函数, 那么next默认不会等到中间件的结果, 就会执行下一步操作
  // 如果我们希望等待下一个异步函数的执行结果, 那么需要在next函数前面加await
  await next();
  console.log("----");
});

// 3.koa的中间件3
app.use(async (ctx, next) => {
  console.log("koa middleware03");
  // 网络请求
  const res = await axios.get("http://123.207.32.32:8000/home/multidata");
  ctx.msg += res.data.data.banner.list[0].title;
});

// 启动服务器
app.listen(6000, () => {
  console.log("koa服务器启动成功~");
});
```

如果想把第 3 个中间件的 msg 拼接上去，就要把第 1 和第 2 个中间件也变成异步。

## express 中间件-执行异步

```javascript
const express = require("express");
const axios = require("axios");

// 创建app对象
const app = express();

// 编写中间件
app.use(async (req, res, next) => {
  console.log("express middleware01");
  req.msg = "aaa";
  await next();
  // 返回值结果
  // res.json(req.msg)
});

app.use(async (req, res, next) => {
  console.log("express middleware02");
  req.msg += "bbb";
  await next();
});

// 执行异步代码
app.use(async (req, res, next) => {
  console.log("express middleware03");
  const resData = await axios.get("http://123.207.32.32:8000/home/multidata");
  req.msg += resData.data.data.banner.list[0].title;

  // 只能在这里返回结果
  res.json(req.msg);
});

// 启动服务器
app.listen(9000, () => {
  console.log("express服务器启动成功~");
});
```

express 和 koa 同步执行顺序是一样的。

express 中间件的 next 返回的是一个函数，而 koa 的 next 返回的是一个 Promise，所以 koa 可以通过 async 和 await 把之前的中间件变成异步的，顺序是从上到下，再从下到上，但是 express 不行，只能从上到下按顺序执行，已经回不去了。

## **koa 洋葱模型**

两层理解含义：

中间件处理代码的过程；

Response 返回 body 执行；

<img src="..\..\images\202407141631544.png" />
