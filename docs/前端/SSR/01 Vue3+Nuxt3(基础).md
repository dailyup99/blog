---
outline: deep
---

## **什么是Nuxt？**

在了解 Nuxt 之前，我们先来了解一下创建一个现代应用程序，所需的技术：

* 支持数据双向绑定 和 组件化（ Nuxt 选择了Vue.js ）。
* 处理客户端的导航（ Nuxt 选择了vue-router ）。
* 支持开发中热模块替换和生产环境代码打包（ Nuxt支持webpack 5和Vite ）。
* 兼容旧版浏览器，支持最新的 JavaScript 语法转译（ Nuxt使用esbuild ）。
* 应用程序支持开发环境服务器，也支持服务器端渲染 或 API接口开发。
* Nuxt 使用 h3来实现部署可移植性（h3是一个极小的高性能的http框架）
  * 如：支持在 Serverless、Workers 和 Node.js 环境中运行。

Nuxt 是一个 **直观的 Web 框架**

* 自 2016 年 10 月以来，Nuxt专门负责集成上述所描述的事情 ，并提供前端和后端的功能。
* Nuxt 框架可以用来快速构建下一个 Vue.js 应用程序，如支持 CSR 、SSR、SSG 渲染模式的应用等。

## **Nuxt 发展史**

Nuxt.js

诞生于 2016 年 10 月 25号，由 Sebastien Chopin 创建，主要是基于Vue2 、Webpack2 、Node 和 Express。

在2018 年 1 月 9 日， Sebastien Chopin 正式宣布，发布 Nuxt.js 1.0 版本。

* 重要的变化是**放弃了对 node < 8 的支持**

2018 年 9 月 21 日， ， Sebastien Chopin 正式宣布，发布 Nuxt.js 2.0 版本。

* 开始使用 Webpack 4 及其技术栈， 其它的并没有做出重大更改。

2021年8月12日至今，Nuxt.js 最新的版本为：Nuxt.js 2.15.8

Nuxt3版本：

* 经过 16 个月的工作，Nuxt 3 beta 于 2021 年 10 月 12 日发布，引入了基于 Vue 3、Vite 和 Nitro( 服务引擎 ) 。
* 六个月后， 2022 年 4 月 20 日，Pooya Parsa 宣布 Nuxt 3 的第一个候选版本，代号为“Mount Hope”
* 在2022年11月16号， Pooya Parsa 再次宣布 Nuxt3 发布为第一个正式稳定版本。

官网地址： https://nuxt.com/

## **Nuxt3 特点**

Vue技术栈

* Nuxt3 是基于 Vue3 + Vue Router + Vite 等技术栈，全程 Vue3+Vite 开发体验（Fast）。

自动导包

* Nuxt 会自动导入辅助函数、组合 API和 Vue API ，无需手动导入。
* 基于规范的目录结构，Nuxt 还可以对自己的组件、 插件使用自动导入。

约定式路由（目录结构即路由）

* Nuxt 路由基于vue-router，在 pages/ 目录中创建的每个页面，都会根据目录结构和文件名来自动生成路由

渲染模式：Nuxt 支持多种渲染模式（SSR、CSR、SSG等）

利于搜索引擎优化：服务器端渲染模式，不但可以提高首屏渲染速度，还利于SEO

服务器引擎

* 在开发环境中，它使用 Rollup 和 Node.js 。
* 在生产环境中，使用 Nitro 将您的应用程序和服务器构建到一个通用.output目录中。
  * Nitro服务引擎提供了跨平台部署的支持，包括 Node、Deno、Serverless、Workers等平台上部署。

## **Nuxt.js VS Nuxt3**

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240504184037189.png" alt="image-20240504184037189" style="zoom:67%;" />

## **Nuxt3 环境搭建**

在开始之前，请确保您已安装推荐的设置**：**

* Node.js （最新 LTS 版本，或 16.11以上）
* VS Code 
  * Volar、ESLint、Prettier

命令行工具，新建项目（hello-nuxt )

* 方式一：npx nuxi init hello-nuxt
* 方式二：pnpm dlx nuxi init hello-nuxt
* 方式三：npm install –g nuxi && nuxi init hello-nuxt

运行项目: cd hello-nuxt

* yarn install
* pnpm install --shamefully-hoist（创建一个扁平的 node_modules 目录结构，类似npm 和 yarn）
  * 或者在项目根目录下创建一个.npmrc文件，然后输入shamefully-hoist=true
* yarn dev

## **创建项目报错**

执行 npx nuxi init 01-hello-nuxt 报如下错误，主要是网络不通导致：

![image-20240504184754768](http://139.196.79.103:9001/myimages/imgs/image-20240504184754768.png)

解决方案：

* 第一步：ping raw.githubusercontent.com 检查是否通
* 第二步：如果访问不通，代表是网络不通
* 第三步：配置 host，本地解析域名
  * Mac电脑 host 配置路径： /etc/hosts
  * Win 电脑 host 配置路由：c:/Windows/System32/drivers/etc/hosts
* 第四步：在host文件中新增一行 ，编写如下配置：
  * 185.199.108.133 raw.githubusercontent.com
  * 前面配置的IP可使用如下：
  * ![image-20240504184946703](http://139.196.79.103:9001/myimages/imgs/image-20240504184946703.png)
* 第五步：重新ping域名，如果通了就可以用了
* 第六步：重新开一个终端创建项目即可

## **Nuxt3 目录结构**

![image-20240504232751989](http://139.196.79.103:9001/myimages/imgs/image-20240504232751989.png)

package.json

![image-20240504232113244](http://139.196.79.103:9001/myimages/imgs/image-20240504232113244.png)

.nuxt目录下的types下会生成很多类型，这些类型是什么时候生成的呢？

<img src="http://139.196.79.103:9001/myimages/imgs/image-20240504232257105.png" alt="image-20240504232257105" style="zoom:67%;" />

是在执行nuxt prepare的时候生成的。

## **应用入口（App.vue）**

默认情况下，Nuxt 会将此文件视为**入口**点，并为应用程序的每个路由呈现其内容，常用于：

* 定义页面布局Layout 或 自定义布局，如：NuxtLayout
* 定义路由的占位，如：NuxtPage，对router-view做了一层包装
* 编写全局样式
* 全局监听路由 等等

![image-20240504232918632](http://139.196.79.103:9001/myimages/imgs/image-20240504232918632.png)

app.vue

```html
<template>
  <div>
    <!-- 组件库的组件 nuxt/ui -->
    <NuxtWelcome />
  </div>
</template>
<script setup>
// 监听全局路由
//  let router = useRouter()
//  router.beforeEach((to, form)=>{

//  })
</script>
<style></style>
```

