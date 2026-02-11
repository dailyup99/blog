---
outline: deep
---

## **嵌套路由**

Nuxt 和 Vue 一样，也是支持嵌套路由的，只不过在 Nuxt 中，嵌套路由也是根据目录结构和文件的名称自动生成。

编写嵌套路由步骤：

- 1.创建一个一级路由，如：parent.vue
- 2.创建一个与一级路由同名同级的文件夹，如： parent
- 3.在 parent 文件夹下，创建一个嵌套的二级路由
  - 如：parent/child.vue， 则为一个二级路由页面
  - 如： parent/index.vue 则为二级路由默认的页面
- 4.需要在 parent.vue 中添加 NuxtPage 路由占位

pages/parent.vue

```html
<script lang="ts" setup></script>

<template>
  <div>
    <div>Page: Parent</div>
    <div>
      <NuxtLink to="/parent">
        <button>default child1</button>
      </NuxtLink>
      <NuxtLink to="/parent/child1">
        <button>child1</button>
      </NuxtLink>
      <NuxtLink to="/parent/child2">
        <button>child2</button>
      </NuxtLink>
    </div>
    <!-- 嵌套二级路由 -->
    <NuxtPage></NuxtPage>
  </div>
</template>

<style scoped></style>
```

然后分别创建 pages/parent/index.vue，pages/parent/child1.vue，pages/parent/child2.vue

## **路由中间件（middleware）**

Nuxt 提供了一个可定制的 路由中间件，用来监听路由的导航，包括：局部和全局监听（支持再服务器和客户端执行）

路由中间件分为三种：

匿名（或内联）路由中间件

- 在页面中使用 definePageMeta 函数定义，可监听局部路由。当注册多个中间件时，会按照注册顺序来执行。

```html
<template>
  <div>Page: Index</div>
</template>
<script lang="ts" setup>
  definePageMeta({
    // 路由中间件( 监听路由 )
    middleware: [
      // 第一个中间件
      function (to, from) {
        // console.log(from);
        // console.log(to);
        console.log("index 第一个中间件");

        // 如果返回的是 "" null, 或 没有返回语句,那么就会执行下一个中间件
        // 如果返回的是 navigateTo, 直接导航到新的页面
        // return navigateTo("/detail02");
      },
      // 第二个中间件
      function (to, from) {
        // console.log(from);
        // console.log(to);
        console.log("index 第二个中间件");
      },
      // 第三个中间件
      // 专门用来判断用户是否已登录
      function (to, from) {
        console.log("index 第三个中间件");
      },
    ],
  });
</script>
<style scoped></style>
```

命名路由中间件

- 在 middleware 目录下定义，并会自动加载中间件。命名规范 kebab-case）

根目录下创建 middleware/home.ts

```typescript
// server: 刷新浏览器器的会在服务器端执行
// client:在客户端切换路由, 只会在客户端执行
export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(from);
  // console.log(to);
  console.log("home.ts 第二个中间件");
});
```

第二个中间件，就可以使用 home

```html
<template>
  <div>Page: Index</div>
</template>
<script lang="ts" setup>
  definePageMeta({
    // 路由中间件( 监听路由 )
    middleware: [
      // 第一个中间件
      function (to, from) {
        // console.log(from);
        // console.log(to);
        console.log("index 第一个中间件");

        // 如果返回的是 "" null, 或 没有返回语句,那么就会执行下一个中间件
        // 如果返回的是 navigateTo, 直接导航到新的页面
        // return navigateTo("/detail02");
      },
      "home",
      // 第三个中间件
      // 专门用来判断用户是否已登录
      function (to, from) {
        console.log("index 第三个中间件");
      },
    ],
  });
</script>
<style scoped></style>
```

全局路由中间件（优先级比前面的高，支持两端）

- 在 middleware 目录中，需带.global 后缀的文件，每次路由更改都会自动运行。

根目录下创建 middleware/auth.global.ts

```typescript
// 这个优先级别是比较高的
export default defineNuxtRouteMiddleware((to, from) => {
  const isLogin = false;
  console.log("index 第三个中间件 auth.global.ts");
  console.log(to);
  // if (!isLogin && to.fullPath !== "/login") {
  //   return navigateTo("/login");
  // }
});
```

## **路由验证( validate )**

Nuxt 支持对每个页面路由进行验证，我们可以通过 definePageMeta 中的 validate 属性来对路由进行验证。

validate 属性接受一个回调函数，回调函数中以 route 作为参数

回调函数的返回值支持：

- 返回 bool 值来确定是否放行路由
  - true 放行路由
  - false 默认重定向到内置的 404 页面
- 返回对象
  - \{ statusCode:401 } // 返回自定义的 401 页面，验证失败

路由验证失败，可以自定义错误页面：

在项目根目录（不是 pages 目录）新建 error.vue

pages/detail03/[id].vue

```html
<template>
  <div>Page: detail03 id={{ id }}</div>
</template>
<script lang="ts" setup>
  // 拿到动态路由的参数
  const route = useRoute();
  const { id } = route.params;

  definePageMeta({
    // 路由参数的验证
    validate: (route) => {
      console.log(route.params.id);
      // return /^\d+$/.test(route.params.id as string);

      // return false  // 404 -> 500  401 ...
      return {
        statusCode: 401, // 路由验证失败
        statusMessage: "validata router error",
      };
    },
  });
</script>
<style scoped></style>
```

error.vue

```html
<template>
  <div>
    Error Page {{ error }}
    <div>
      <button @click="goHome">Home</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    error: Object,
  });

  function goHome() {
    clearError({ redirect: "/" }); // 清除错误，返回首页
  }
</script>
<style scoped></style>
```

## **布局（Layout）**

Layout 布局是页面的包装器，可以将多个页面共性东西抽取到 Layout 布局 中。

- 例如：每个页面的页眉和页脚组件，这些具有共性的组件我们是可以写到一个 Layout 布局中。

Layout 布局是使用\<slot>组件来显示**页面中的**内容

Layout 布局有两种使用方式：

方式一：默认布局

- 在 layouts 目录下新建默认的布局组件，比如：layouts/default.vue
- 然后在 app.vue 中通过\<NuxtLayout>内置组件来使用

方式二：自定义布局（Custom Layout）

- 继续在 layouts 文件夹下新建 Layout 布局组件，比如: layouts/custom-layout.vue
- 然后在 app.vue 中给\<NuxtLayout>内置组件 指定 name 属性 的值为：custom-layout
  - 也支持在页面中使用 definePageMeta 宏函数来指定 layout 布局

app.vue

所有页面都使用默认布局

```html
<template>
  <!-- 布局 -->
  <NuxtLayout>
    <!-- 页面 -->
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
```

layouts/default.vue

```html
<template>
  <div class="layout">
    <div class="header">
      <div>我是Header</div>
      <div>
        <NuxtLink to="/">
          <button>Home</button>
        </NuxtLink>
        <NuxtLink to="/category">
          <button>category</button>
        </NuxtLink>
        <NuxtLink to="/cart">
          <button>cart</button>
        </NuxtLink>
        <NuxtLink to="/profile">
          <button>profile</button>
        </NuxtLink>
        <NuxtLink to="/login">
          <button>login</button>
        </NuxtLink>
      </div>
    </div>
    <!-- 页面的内容 -->
    <slot></slot>
    <div class="footer">我是footer</div>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped>
  .header {
    text-align: center;
    /* line-height: 80px; */
    font-size: 30px;
    background-color: red;
  }

  .footer {
    border: 1px solid green;
    text-align: center;
    /* line-height: 80px; */
    font-size: 30px;
    background-color: #cdcdcd;
  }
</style>
```

有些页面不想使用默认布局，那么就可以自定义布局

layouts/custom-layout.vue

```html
<template>
  <div class="custom-layout">
    <slot></slot>
    <!-- 页面的内容 -->
  </div>
</template>
```

比如登录页

pages/login.vue

```html
<template>
  <div>Page: login</div>
</template>
<script lang="ts" setup>
  // 该页面重新定义使用的 layout
  definePageMeta({
    layout: "custom-layout",
  });
</script>
<style scoped></style>
```

## **渲染模式**

浏览器 和 服务器都可以解释 JavaScript 代码，都可以将 Vue.js 组件呈现为 HTML 元素。此过程称为渲染。

- 在客户端将 Vue.js 组件呈现为 HTML 元素，称为：客户端渲染模式
- 在服务器将 Vue.js 组件呈现为 HTML 元素，称为：服务器渲染模式

而 Nuxt3 是支持多种渲染模式，比如：

- 客户端渲染模式（CSR）： 只需将 ssr 设置为 false
- 服务器端渲染模式（SSR）：只需将 ssr 设置为 true
- 混合渲染模式（SSR | CSR | SSG | SWR）：需在 routeRules 根据每个路由动态配置渲染模式（beta 版本）

nuxt.config.ts

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  routeRules: {
    "/": { ssr: true }, // ssr
    "/category": { ssr: false }, // spa 应用
    // 3.0.0-12rc -> NetLify
    "/cart": { static: true }, // 只会在构建时生成一次静态页面
    "/profile": { swr: true }, // 会生成多次静态页面( 会自动重新验证页面时候需要重新生成 )
  },
});
```

## **Nuxt 插件（Plugins）**

Nuxt3 支持自定义插件进行扩展，创建插件有两种方式：

方式一：直接使用 useNuxtApp() 中的 provide(name, vlaue) 方法直接创建，比如：可在 App.vue 中创建

- useNuxtApp 提供了访问 Nuxt 共享运行时上下文的方法和属性（两端可用）：provide、hooks、callhook、vueApp 等

方式二：在 plugins 目录中创建插件（推荐）

- 顶级和子目录 index 文件写的插件会在创建 Vue 应用程序时会自动加载和注册
- .server 或 .client 后缀名插件，可区分服务器端或客户端，用时需区分环境

在 plugins 目录中创建插件

- 1.在 plugins 目录下创建 plugins/price.ts 插件
- 2.接着 defineNuxtPlugin 函数创建插件，参数是一个回调函数
- 3.然后在组件中使用 useNuxtApp() 来拿到插件中的方法

注意事项：

插件注册顺序可以通过在文件名前加上一个数字来控制插件注册的顺序

- 比如：plugins/1.price.ts 、plugins/2.string.ts、plugins/3.date.ts

```html
<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
  // 方式一:创建插件
  const nuxtApp = useNuxtApp();
  nuxtApp.provide("formData", () => {
    return "2020-12-14";
  });
  nuxtApp.provide("version", "1.0.0");

  // 使用插件
  console.log(nuxtApp.$formData());
  console.log(nuxtApp.$version);
  if (process.client) {
    console.log(nuxtApp.$formPrice(1000.78987));
  }
</script>
```

plugins/1.price.client.ts

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      // 自定义的插件，格式化价格的插件 （创建Vue实例时就会自动注册好）
      formPrice: (price: number) => {
        return price.toFixed(2);
      },
      // ....
      // key: string ; value: any
    },
  };
});
```

## **App Lifecycle Hooks**

监听 App 的生命周期的 Hooks：

App Hooks 主要可由 Nuxt 插件 使用 hooks 来监听 生命周期，也可用于 Vue 组合 API 。

但是，如在组件中编写 hooks 来监听，那 create 和 setup hooks 就监听不了，因为这些 hooks 已经触发完了监听。

语法：nuxtApp.hook(app:created, func)

![image-20240505204418488](../../images/image-20240505204418488.png)

plugins/lifecycle.ts

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  // 监听App的生命周期
  // Server & Client
  nuxtApp.hook("app:created", (vueApp) => {
    console.log("app:created");
  });
  // Client
  nuxtApp.hook("app:beforeMount", (vueApp) => {
    console.log("app:beforeMount");
  });
  // Server & Client
  nuxtApp.hook("vue:setup", () => {
    console.log("vue:setup");
  });
  // Server
  nuxtApp.hook("app:rendered", (renderContext) => {
    console.log("app:rendered");
  });
  // Client
  nuxtApp.hook("app:mounted", (vueApp) => {
    console.log("app:mounted");
  });
});
```

app.vue

如果写在 app.vue 中，只能监听到 setup 之后的生命周期，客户端只有 app:mounted，服务端只有 app:rendered，官方建议我们放在插件中监听

```html
<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
<script setup>
  const nuxtApp = useNuxtApp();
  // Server & Client
  nuxtApp.hook("app:created", (vueApp) => {
    // console.log("app:created");
  });
  // Client
  nuxtApp.hook("app:beforeMount", (vueApp) => {
    // console.log("app:beforeMount");
  });

  // Server & Client
  nuxtApp.hook("vue:setup", () => {
    // console.log("vue:setup");
  });

  // Server
  nuxtApp.hook("app:rendered", (renderContext) => {
    // console.log("app:rendered");
  });

  // Client
  nuxtApp.hook("app:mounted", (vueApp) => {
    // console.log("app:mounted");
  });
</script>
```

## **组件生命周期**

客户端渲染

![image-20240505204441739](../../images/image-20240505204441739.png)

服务器端渲染

- beforeCreate -> setup
- created

## **获取数据**

在 Nuxt 中数据的获取主要是通过下面 4 个函数来实现（支持 Server 和 Client ）：

1.useAsyncData(key, func):专门解决异步获取数据的函数，会阻止页面导航。

- 发起异步请求需用到 $fetch 全局函数（类似 Fetch API）

  - $fetch(url, opts)是一个类原生 fetch 的跨平台请求库

  2.useFetch(url, opts)：用于获取任意的 URL 地址的数据，会阻止页面导航

- 本质是 useAsyncData(key, () => $fetch(url, opts)) 的语法糖。

  3.useLazyFetch(url, opts):用于获取任意 URL 数据，不会阻止页面导航

- 本质和 useFetch 的 lazy 属性设置为 true 一样

  4.useLazyAsyncData(key, func):专门解决异步获取数据的函数。 不会阻止页面导航

- 本质和 useAsyncData 的 lazy 属性设置为 true 一样

注意事项：

这些函数只能用在 setup or Lifecycle Hooks 中。

## **useFetch vs axios**

获取数据 Nuxt 推荐使用 useFetch 函数，为什么不是 axios ?

useFetch 底层调用的是$fetch 函数，该函数是基于 unjs/ohmyfetch 请求库，并与原生的 Fetch API 有者相同 API

unjs/ohmyfetch 是一个跨端请求库： A better fetch API. Works on node, browser and workers

- 如果运行在服务器上，它可以智能的处理对 API 接口的直接调用
- 如果运行在客户端行，它可以对后台提供的 API 接口 正常的调用（类似 axios），当然也支持第三方接口的调用
- 会自动解析响应和对数据进行字符串化

useFetch 支持智能的类型提示和智能的推断 API 响应类型

在 setup 中用 useFetch 获取数据，会减去客户端重复发起的请求

useFetch（url, options）语法

参数

- url: 请求的路径
- options：请求配置选项
  - method、query ( 别名 params )、body、headers、baseURL
  - onRequest、 onResponse、lazy....

返回值： data, pending, error, refresh

```html
<template>
  <div class="home">home</div>
</template>

<script setup lang="ts">
  const BASE_URL = "http://codercba.com:9060/juanpi/api";
  interface IResultData {
    code: number;
    data: any;
  }
  // 1.使用 $fetch 来发起网络请求
  // server and client
  // $fetch(BASE_URL + "/homeInfo", {
  //   method: "GET",
  // }).then((res) => {
  //   console.log(res);
  // });

  // 2.使用官方提供的 hooks API ( 在刷新页面时, 可以减少客户端发起的一次请求 )
  const { data } = await useAsyncData<IResultData>("homeInfo", () => {
    return $fetch(BASE_URL + "/homeInfo", { method: "GET" });
  });
  console.log(data.value?.data);
  console.log("ppppppppppppppppp");

  // const { data: newData } = await useAsyncData<IResultData>("homeInfo", () => {
  //   return $fetch(BASE_URL + "/goods", { method: "POST" });
  // });
  // console.log(newData.value?.data);

  // 3.useAsyncData的简写 useFetch
  // const { data } = await useFetch<IResultData>(BASE_URL + "/homeInfo", {
  //   method: "GET",
  // });
  // console.log(data.value?.data);

  // 4. useFetch 的 options GET
  // const { data } = await useFetch<IResultData>("/homeInfo", {
  //   method: "GET",
  //   baseURL: BASE_URL,
  //   query: {
  //     name: "liujun",
  //   },
  //   // params:  这个是 query的别名
  //   // body: {}
  //   // headers: {}
  // });
  // console.log(data.value?.data);

  // 5. useFetch 的 options POST
  // const { data } = await useFetch<IResultData>("/goods", {
  //   method: "POST",
  //   baseURL: BASE_URL,
  //   body: {
  //     count: 6,
  //   },
  // });
  // console.log(data.value?.data);

  // 5.拦截器
  // const { data } = await useFetch<IResultData>("/goods", {
  //   method: "POST",
  //   baseURL: BASE_URL,
  //   body: {
  //     count: 1,
  //   },
  //   // 请求的拦截 ( server and client )
  //   onRequest({ request, options }) {
  //     // console.log(options);
  //     // options.headers = {
  //     //   token: "xxxx",
  //     // };
  //   },
  //   onRequestError({ request, options, error }) {
  //     console.log("onRequestError");
  //   },
  //   onResponse({ request, response, options }) {
  //     console.log("onResponse");
  //     console.log(response._data.data.server_jsonstr);
  //     response._data.data = {
  //       name: "liujun",
  //     };
  //     // return response._data.data.server_jsonstr;
  //   },
  //   onResponseError({ request, response, options, error }) {
  //     console.log("onResponseError");
  //   },
  // });
  // console.log(data.value?.data);

  // // server and client
  // const cookie = useCookie("token");
  // console.log(cookie.value);
</script>
```

lazy

```html
<template>
  <div class="lazy">lazy</div>
</template>

<script setup lang="ts">
  const BASE_URL = "http://codercba.com:9060/juanpi/api";
  interface IResultData {
    code: number;
    data: any;
  }
  // 1. useFetch 默认会阻塞 页面的导航
  // const { data } = await useFetch<IResultData>(BASE_URL + "/homeInfo", {
  //   method: "GET",
  //   lazy: true, // 不会阻塞页面的导航
  // });
  // console.log(data.value?.data);

  // // 确保一定可以拿到这个data的数据
  // watch(data, (newData) => {
  //   console.log("data=>", data);
  // });

  // onMounted(() => {
  //   console.log("onMounted");
  // });

  // 2.简写
  const { data } = await useLazyFetch<IResultData>(BASE_URL + "/homeInfo", {
    method: "GET",
  });
  console.log(data.value?.data);

  // 确保一定可以拿到这个data的数据 ( client )
  watch(data, (newData) => {
    console.log("data=>", data);
  });

  onMounted(() => {
    console.log("onMounted");
  });
</script>
```

refresh

```html
<template>
  <div class="refresh">
    refresh {{ pending }}
    <div>
      <button @click="refreshPage">点击刷新</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const BASE_URL = "http://codercba.com:9060/juanpi/api";
  interface IResultData {
    code: number;
    data: any;
  }

  const count = ref(1);

  // 1.点击刷新时, 是在server端发起网络请求, 客户端不会发起网络请求,水合之后客户端是可以当前数据
  const { data, refresh, pending } = await useFetch<IResultData>(
    BASE_URL + "/goods",
    {
      method: "POST",
      body: {
        count,
      },
    }
  );
  console.log(data.value?.data);

  function refreshPage() {
    count.value++; // 会自动从新发起网络请求
    // refresh(); // client 刷新请求
  }
</script>
```

## **useFetch 的封装**

封装 useFetch 步骤

1.定义 HYRequest 类，并导出

2.在类中定义 request、get、post 方法

3.在 request 中使用 useFetch 发起网络请求

4.添加 TypeScript 类型声明

service/index.ts

```typescript
import type { AsyncData, UseFetchOptions } from "nuxt/dist/app/composables";

const BASE_URL = "http://codercba.com:9060/juanpi/api/";
type Methods = "GET" | "POST";

export interface IResultData<T> {
  code: number;
  data: T;
}

class HYRequest {
  request<T = any>(
    url: string,
    method: Methods,
    data?: any,
    options?: UseFetchOptions<T>
  ): Promise<AsyncData<T, Error>> {
    return new Promise((resolve, reject) => {
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method: method,
        ...options,
      };

      if (method === "GET") {
        newOptions.query = data; // query -> params
      }
      if (method === "POST") {
        newOptions.body = data;
      }
      useFetch<T>(url, newOptions as any)
        .then((res) => {
          // res => { data:T, pending, refresh, error ... } => AsyncData
          resolve(res as AsyncData<T, Error>);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "GET", params, options);
  }

  post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "POST", data, options);
  }
}

export default new HYRequest();
```

## **Server API**

Nuxt3 提供了编写后端服务接口的功能，编写服务接口可以在 server/api 目录下编写

比如：编写一个 /api/homeinfo 接口

- 1.在 server/api 目录下新建 homeinfo.ts
- 2.接在在该文件中使用 defineEventHandler 函数来定义接口（支持 async）
- 3.然后就可以用 useFetch 函数轻松调用： /api/homeinfo 接口了

server/api/homeInfo.ts

```typescript
export default defineEventHandler((event) => {
  let { req, res } = event.node;

  console.log(req.method);
  console.log(req.url);

  return {
    code: 200,
    data: {
      name: "liujun",
      age: 18,
    },
  };
});
```

当然也可以在 server/api 目录下定义 login.get.ts 和 login.post.ts 分别表示的是 get 和 post 请求

![image-20240505214611688](../../images/image-20240505214611688.png)

server/api/login.get.ts

```typescript
export default defineEventHandler((event) => {
  let { req, res } = event.node;
  console.log(req.method);
  console.log(req.url);
  // 连接数据库 ...
  return {
    code: 200,
    data: {
      name: "liujun",
      age: 18,
      token: "aabbcc",
    },
  };
});
```

server/api/login.post.ts

```typescript
/**
 * 登录的 API 接口: /api/login
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const method = getMethod(event);
  const body = await readBody(event);
  const bodyRaw = await readRawBody(event);

  console.log(query);
  console.log(method);
  console.log(body);
  console.log(bodyRaw);

  // 连接数据库 ...
  // mock
  return {
    code: 200,
    data: {
      name: "liujun",
      age: 18,
      token: "aabbcc",
    },
  };
});
```

在 pages/login.vue 中使用

```html
<template>
  <div class="login">
    login

    <div><button @click="login">login</button></div>
  </div>
</template>

<script setup lang="ts">
  // const { data } = await useFetch("/api/homeInfo", { method: "POST" });
  // console.log(data.value?.data);

  async function login() {
    const { data } = await useFetch("/api/login?id=100", {
      method: "POST",
      body: {
        usename: "admin",
        password: 123456,
      },
    });
    console.log(data.value?.data);
    const cookie = useCookie("token", {
      maxAge: 10, // 10 s 之后移除cookie中的token
    });
    cookie.value = data.value?.data.token as string;
    return navigateTo("/"); // 回到home
  }
</script>
```

## **全局状态共享**

Nuxt 跨页面、跨组件全局状态共享可使用 useState（支持 Server 和 Client ）：

- useState\<T>(init?: () => T | Ref\<T>): Ref\<T>
- useState\<T>(key: string, init?: () => T | Ref\<T>): Ref\<T>

参数:

- init：为状态提供初始值的函数，该函数也支持返回一个 Ref 类型
- key: 唯一 key，确保在跨请求获取该数据时，保证数据的唯一性。为空时会根据文件和行号自动生成唯一 key

返回值：Ref 响应式对象

useState 具体使用步骤如下：

- 1.在 composables 目录下创建一个模块，如： composables/states.ts
- 2.在 states.ts 中使用 useState 定义需全局共享状态，并导出
- 3.在组件中导入 states.ts 导出的全局状态

useState 注意事项:

- useState 只能用在 setup 函数 和 Lifecycle Hooks 中
- useState 不支持 classes, functions or symbols 类型，因为这些类型不支持序列化

composables/useCounter.ts

```typescript
export default function () {
  return useState("counter", () => 100); // Ref
}

// export const useCounter = () => {
//   return useState("counter", () => 100);
// };
```

composables/useLoginInfo.ts

```typescript
export default function () {
  return useState("loginInfo", () => {
    return {
      name: "liujun",
      age: 18,
      token: "aabbcc",
    };
  }); // Ref
}
```

app.vue 和 pages/profile.vue 中使用

```html
<template>
  <div class="home">
    home
    <div>{{ counter }}</div>
    <div>{{ loginInfo }}</div>
    <button @click="addCounter">+1</button>
  </div>
</template>

<script setup>
  // counter -> Ref
  const counter = useCounter();
  const loginInfo = useLoginInfo();
  if (process.server) {
    console.log("counter=>", counter);
  }
  function addCounter() {
    counter.value++;
    loginInfo.value.age++;
  }
</script>
```

## **Nuxt3 集成 Pinia**

安装依赖

npm install @pinia/nuxt –-save

- @pinia/nuxt 会处理 state 同步问题，比如不需要关心序列化或 XSS 攻击等问题

npm install pinia –-save

- 如有遇到 pinia 安装失败，可以添加 --legacy-peer-deps 告诉 NPM 忽略对等依赖并继续安装。或使用 yarn

Nuxt 应用接入 Pinia

在 nuxt.config 文件中添加： modules: [‘@pinia/nuxt‘]

nuxt.config.ts

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 这里是配置Nuxt3的扩展的库
  modules: ["@pinia/nuxt"],
});
```

## **Pinia 使用步骤**

Pinia 使用步骤：

1.在 store 文件夹中定义一个模块，比如：store/counter.ts

2.在 store/counter.ts 中使用 defineStore 函数来定义 store 对象

3.在组件中使用定义好的 store 对象

store/home.ts

```typescript
import { defineStore } from "pinia";

export interface IState {
  counter: number;
  homeInfo: any;
}

export const useHomeStore = defineStore("home", {
  state: (): IState => {
    return {
      counter: 0,
      homeInfo: {},
    };
  },
  actions: {
    increment() {
      this.counter++;
    },
    async fetchHomeData() {
      const url = "http://codercba.com:9060/juanpi/api/homeInfo";
      const { data } = await useFetch<any>(url);
      console.log(data.value.data);
      this.homeInfo = data.value.data;
    },
  },
});
```

pages/cart.vue

```html
<template>
  <div class="cart">
    cart
    <div>{{ counter }}</div>
    <button @click="addCounter">+1</button>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useHomeStore } from "~/store/home";

  const homeStore = useHomeStore();
  const { counter } = storeToRefs(homeStore);
  function addCounter() {
    homeStore.increment();
  }
</script>
```

也可以异步调用

pages/category.vue

```html
<template>
  <div class="category">
    category

    <div>{{ counter }}</div>
    <button @click="addCounter">+1</button>
    <button @click="getHomeInfo">fetchHomeInfoData</button>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useHomeStore } from "~/store/home";

  const homeStore = useHomeStore();
  const { counter, homeInfo } = storeToRefs(homeStore);
  function addCounter() {
    homeStore.increment();
  }

  if (process.server) {
    homeStore.fetchHomeData();
  }
  function getHomeInfo() {
    homeStore.fetchHomeData();
  }
</script>
```

## **useState vs Pinia**

Nuxt 跨页面、跨组件全局状态共享，既可以使用 useState，也可以使用 Pinia，那么他们有什么异同呢？

它们的共同点：

- 都支持全局状态共享，共享的数据都是响应式数据
- 都支持服务器端和客户端共享

但是 Pinia 比 useState 有更多的优势，比如：

开发工具支持（Devtools）

- 跟踪动作，更容易调试
- store 可以出现在使用它的组件中
- ...

模块热更换

- 无需重新加载页面即可修改 store 数据
- 在开发时保持任何现有状态

插件：可以使用插件扩展 Pinia 功能

提供适当的 TypeScript 支持或自动完成

## **安装 Element Plus 2**

Element Plus 官网：https://element-plus.org/zh-CN/guide/quickstart.html

安装 Element Plus 的具体步骤：

第一步：

- npm install element-plus --save
- npm install unplugin-element-plus --save-dev

第二步：

- 配置 Babel 对 EP 的转译
- 配置自动导入样式

第三步：

- 在组件中导入组件，并使用

注意事项：目前 Nuxt3 暂时还不支持 EP 组件自动导包，等后续 EP 的 module

nuxt.config.ts

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
import ElementPlus from "unplugin-element-plus/vite";
export default defineNuxtConfig({
  // dev build
  build: {
    // 使用 Babel 进行语法转换
    transpile: ["element-plus/es"],
  },
  vite: {
    // 配置自动导入样式
    plugins: [ElementPlus()],
  },
});
```

app.vue 中使用

```html
<template>
  <div>
    <el-button>我是button</el-button>
    <el-button type="success">我是button</el-button>
    <el-button type="danger" size="large">我是button</el-button>
  </div>
</template>

<script setup lang="ts">
  import { ElButton } from "element-plus";
</script>
```
