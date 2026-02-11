---
outline: deep
---

## **为什么需要登录凭证呢？**

**web 开发中，我们使用最多的协议是 http，但是 http 是一个无状态的协议。**

无状态的协议？什么叫做无状态协议呢？

**举个例子：**

**我们登录了一个网站** **`www.coderhub.com`;**

**登录的时候我们需要输入用户名和密码：比如用户名 coderwhy，密码：Coderwhy666.;**

**登录成功之后，我们要以 coderwhy 的身份去访问其他的数据和资源，还是通过 http 请求去访问。**

coderhub 的服务器会问：你谁呀？

coderwhy 说：我是 coderwhy 呀，刚刚登录过呀；

coderhub：怎么证明你刚刚登录过呀？

coderwhy 说：这。。。，http 没有告诉你吗？

coderhub：http 的每次请求对我来说都是一个单独的请求，和之前请求过什么没有关系。

**看到了吧？这就是 http 的无状态，也就是服务器不知道你上一步做了什么，我们必须得有一个办法可以证明我们登录过。**

## **认识 cookie**

**Cookie（复数形态 Cookies），又称为“小甜饼”。类型为“小型文本文件”，某些网站为了辨别用户身份而存储在用户本地**

**终端（Client Side）上的数据。**

浏览器会在特定的情况下携带上 cookie 来发送请求，我们可以通过 cookie 来获取一些信息；

**Cookie 总是保存在客户端中，按在客户端中的存储位置，Cookie 可以分为内存 Cookie 和硬盘 Cookie。**

内存 Cookie 由浏览器维护，保存在内存中，浏览器关闭时 Cookie 就会消失，其存在时间是短暂的；

硬盘 Cookie 保存在硬盘中，有一个过期时间，用户手动清理或者过期时间到时，才会被清理；

**如果判断一个 cookie 是内存 cookie 还是硬盘 cookie 呢？**

没有设置过期时间，默认情况下 cookie 是内存 cookie，在关闭浏览器时会自动删除；

有设置过期时间，并且过期时间不为 0 或者负数的 cookie，是硬盘 cookie，需要手动或者到期时，才会删除；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>客户端的网站</h2>

    <button>设置cookie</button>

    <script>
      const btnEl = document.querySelector("button");
      btnEl.onclick = function () {
        // 在浏览器中通过js设置cookie(在开发中很少使用)
        // 没有设置max-age时, 是一个内存cookie, 浏览器关闭时会消失
        // 设置max-age时, 是一个硬盘cookie, 只能等到过期时间到达的时候, 才会销毁
        document.cookie = "name=why;max-age=30;";
        document.cookie = "age=18;max-age=60;";
      };
    </script>
  </body>
</html>
```

## **cookie 常见的属性**

**cookie 的生命周期：**

**默认情况下的 cookie 是内存 cookie，也称之为会话 cookie，也就是在浏览器关闭时会自动被删除；**

**我们可以通过设置 expires 或者 max-age 来设置过期的时间；**

- expires：设置的是 Date.toUTCString()，设置格式是;expires=date-in-GMTString-format；
- max-age：设置过期的秒钟，;max-age=max-age-in-seconds (例如一年为`60*60*24*365`)；

**cookie 的作用域：（允许 cookie 发送给哪些 URL）**

**Domain：指定哪些主机可以接受 cookie**

- 如果不指定，那么默认是 origin，不包括子域名。
- 如果指定 Domain，则包含子域名。例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如 developer.mozilla.org）。

**Path：指定主机下哪些路径可以接受 cookie**

例如，设置 Path=/docs，则以下地址都会匹配：

- /docs
- /docs/Web/
- /docs/Web/HTTP

如果没有设置 Domain，那么子域名发送网络请求不会携带 cookie。

如何清除 cookie 呢？比如清除 key 为 age 的 cookie

```javascript
document.cookie = "age=18;max-age=0;";
```

## **客户端设置 cookie**

**js 直接设置和获取 cookie：**

```javascript
console.log(document.cookie);
```

**这个 cookie 会在会话关闭时被删除掉；**

```javascript
document.cookie = "name=why;";
document.cookie = "age=18;";
```

**设置 cookie，同时设置过期时间（默认单位是秒钟）**

```javascript
document.cookie = "name=why;max-age=30;";
```

## **服务器设置 cookie**

**Koa 中默认支持直接操作 cookie**

/test 请求中设置 cookie

/demo 请求中获取 cookie

<img src="../../images/202407202029024.png" />

```javascript
const Koa = require("koa");
const KoaRouter = require("@koa/router");

const app = new Koa();

const userRouter = new KoaRouter({ prefix: "/users" });

/**
 * 1.服务器设置cookie
 * 2.客户端(浏览器)保存cookie
 * 3.在同一个作用域下访问服务器, 自动携带cookie
 * 4.服务器验证客户端携带的cookie
 */
userRouter.get("/login", (ctx, next) => {
  // 在服务器中为登录的客户端, 设置一个cookie
  ctx.cookies.set("slogan", "ikun", {
    maxAge: 60 * 1000 * 5,
  });

  ctx.body = "登录成功~";
});

userRouter.get("/list", (ctx, next) => {
  // 验证用户的登录凭证: 携带口号 ikun
  const value = ctx.cookies.get("slogan");
  console.log(value);
  if (value === "ikun") {
    ctx.body = `user list data~`;
  } else {
    ctx.body = `没有权限访问用户列表, 请先登录~`;
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务器启动成功~");
});
```

![image-20240720203014042](../../images/202407202030094.png)

## **Session 是基于 cookie 实现机制**

**在 koa 中，我们可以借助于 koa-session 来实现 session 认证：**

![image-20240720205320215](../../images/202407202053302.png)

```javascript
const Koa = require("koa");
const KoaRouter = require("@koa/router");
const koaSession = require("koa-session");

const app = new Koa();

const userRouter = new KoaRouter({ prefix: "/users" });

const session = koaSession(
  {
    key: "sessionid",
    signed: true,
    maxAge: 60 * 1000 * 5,
    // httpOnly: true
  },
  app
);
// 加盐操作
app.keys = ["aaa", "bbb", "why", "kobe"];
app.use(session);

userRouter.get("/login", (ctx, next) => {
  // 在服务器中为登录的客户端, 设置一个cookie
  ctx.session.slogan = "ikun";

  ctx.body = "登录成功~";
});

userRouter.get("/list", (ctx, next) => {
  // 验证用户的登录凭证: 携带口号 ikun
  const value = ctx.session.slogan;
  console.log(value);
  if (value === "ikun") {
    ctx.body = `user list data~`;
  } else {
    ctx.body = `没有权限访问用户列表, 请先登录~`;
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务器启动成功~");
});
```

![image-20240720205658691](../../images/202407202056751.png)

sessionid 可以伪造，但是加盐的内容很难伪造，加盐操作相当于进行了双重验证。

## **认识 token**

**cookie 和 session 的方式有很多的缺点：**

Cookie 会被附加在每个 HTTP 请求中，所以无形中增加了流量（事实上某些请求是不需要的）；

Cookie 是明文传递的，所以存在安全性的问题；

Cookie 的大小限制是 4KB，对于复杂的需求来说是不够的；

对于浏览器外的其他客户端（比如 iOS、Android），必须手动的设置 cookie 和 session；

对于分布式系统和服务器集群中如何可以保证其他系统也可以正确的解析 session？

**所以，在目前的前后端分离的开发过程中，使用 token 来进行身份验证的是最多的情况：**

token 可以翻译为令牌；

也就是在验证了用户账号和密码正确的情况，给用户颁发一个令牌；

这个令牌作为后续用户访问一些接口或者资源的凭证；

我们可以根据这个凭证来判断用户是否有权限来访问；

**所以 token 的使用应该分成两个重要的步骤：**

生成 token：登录的时候，颁发 token；

验证 token：访问某些资源或者接口时，验证 token；

## **JWT 实现 Token 机制**

**JWT 生成的 Token 由三部分组成：**

**header**

- alg：采用的加密算法，默认是 HMAC SHA256（HS256），采用同一个密钥进行加密和解密；
- typ：JWT，固定值，通常都写成 JWT 即可；
- 会通过 base64Url 算法进行编码；

**payload**

- 携带的数据，比如我们可以将用户的 id 和 name 放到 payload 中；
- 默认也会携带 iat（issued at），令牌的签发时间；
- 我们也可以设置过期时间：exp（expiration time）；
- 会通过 base64Url 算法进行编码

**signature**

- 设置一个 secretKey，通过将前两个的结果合并后进行 HMACSHA256 的算法；
- HMACSHA256(base64Url(header)+.+base64Url(payload), secretKey);
- 但是如果 secretKey 暴露是一件非常危险的事情，因为之后就可以模拟颁发 token，也可以解密 token；

<img src="../../images/202407202151932.png" />

## **Token 的使用**

**当然，在真实开发中，我们可以直接使用一个库来完成： jsonwebtoken；**

<img src="../../images/202407202152924.png" />

```javascript
const Koa = require("koa");
const KoaRouter = require("@koa/router");
const jwt = require("jsonwebtoken");

const app = new Koa();

const userRouter = new KoaRouter({ prefix: "/users" });

const secretkey = "aaabbbccxxxx";

userRouter.get("/login", (ctx, next) => {
  // 1.颁发token
  const payload = { id: 111, name: "why" };
  const token = jwt.sign(payload, secretkey, {
    expiresIn: 60,
  });

  ctx.body = {
    code: 0,
    token,
    message: "登录成功, 可以进行其他的操作",
  };
});

userRouter.get("/list", (ctx, next) => {
  // 1.获取客户端携带过来的token
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  console.log(token);

  // 2.验证token
  try {
    const result = jwt.verify(token, secretkey);

    ctx.body = {
      code: 0,
      data: [
        { id: 111, name: "why" },
        { id: 111, name: "why" },
        { id: 111, name: "why" },
      ],
    };
  } catch (error) {
    ctx.body = {
      code: -1010,
      message: "token过期或者无效的token~",
    };
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务器启动成功~");
});
```

## **非对称加密**

**前面我们说过，HS256 加密算法一单密钥暴露就是非常危险的事情：**

比如在分布式系统中，每一个子系统都需要获取到密钥；

那么拿到这个密钥后这个子系统既可以发布另外，也可以验证令牌；

但是对于一些资源服务器来说，它们只需要有验证令牌的能力就可以了；

HS256 加密算法是对称加密的算法

**这个时候我们可以使用非对称加密，RS256：**

私钥（private key）：用于发布令牌；

公钥（public key）：用于验证令牌；

**我们可以使用 openssl 来生成一对私钥和公钥：**

Mac 直接使用 terminal 终端即可；

Windows 默认的 cmd 终端是不能直接使用的，建议直接使用 git bash 终端；

```javascript
openssl
> genrsa -out private.key 1024
> rsa -in private.key -pubout -out public.key
```

## **使用公钥和私钥签发和验证签名**

<img src="../../images/202407202207110.png" />

## **派发令牌和验证令牌**

<img src="../../images/202407202207100.png" />

非对称加密-token 颁发和验证.js

```javascript
const fs = require("fs");
const Koa = require("koa");
const KoaRouter = require("@koa/router");
const jwt = require("jsonwebtoken");

const app = new Koa();

const userRouter = new KoaRouter({ prefix: "/users" });

const privateKey = fs.readFileSync("./keys/private.key");
const publicKey = fs.readFileSync("./keys/public.key");

userRouter.get("/login", (ctx, next) => {
  // 1.颁发token
  const payload = { id: 111, name: "why" };
  const token = jwt.sign(payload, privateKey, {
    expiresIn: 60,
    algorithm: "RS256",
  });

  ctx.body = {
    code: 0,
    token,
    message: "登录成功, 可以进行其他的操作",
  };
});

userRouter.get("/list", (ctx, next) => {
  // 1.获取客户端携带过来的token
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  console.log(token);

  // 2.验证token
  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });

    ctx.body = {
      code: 0,
      data: [
        { id: 111, name: "why" },
        { id: 111, name: "why" },
        { id: 111, name: "why" },
      ],
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: -1010,
      message: "token过期或者无效的token~",
    };
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务器启动成功~");
});
```

![image-20240720221012117](../../images/202407202210165.png)

进入到 keys 目录，然后执行

```javascript
openssl
> genrsa -out private.key 1024
> rsa -in private.key -pubout -out public.key
```

生成私钥和公钥
