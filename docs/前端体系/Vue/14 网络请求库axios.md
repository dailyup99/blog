---
outline: deep
---

## 为什么不用原生的网络请求

1.需要自己来封装原生

2.原生某些功能不具备，需要自己来完成，比如：请求拦截和响应拦截

3.原生的网络请求在浏览器（使用fetch）能用，在Node（使用http）不能用

## **认识axios**

**为什么选择axios? 作者推荐和功能特点**

<img src="..\..\images\image-20230530232953609.png" />

**功能特点:**

在浏览器中发送 XMLHttpRequests 请求

在 node.js 中发送 http请求

支持 Promise API

拦截请求和响应

转换请求和响应数据

等等

## **axios请求方式**

**支持多种请求方式:**

axios(config)

axios.request(config)

axios.get(url[, config])

axios.delete(url[, config])

axios.head(url[, config])

axios.post(url[, data[, config]])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])

**有时候, 我们可能需求同时发送两个请求**

使用axios.all, 可以放入多个请求的数组.

axios.all([]) 返回的结果是一个数组，使用 axios.spread 可将数组 [res1,res2] 展开为 res1, res2

## **常见的配置选项**

1.请求地址

url: '/user',

2.请求类型

method: 'get',

3.请根路径

baseURL: 'http://www.mt.com/api',

4.请求前的数据处理

transformRequest:[function(data){}], 不常用，可以用请求拦截出来

5.请求后的数据处理

transformResponse: [function(data){}], 不常用可以用响应拦截处理

6.自定义的请求头

headers:{'x-Requested-With':'XMLHttpRequest'},

7.URL查询对象

params:{ id: 12 }, get请求使用

8.查询对象序列化函数

paramsSerializer: function(params){ }，不常用

9.request body

data: { key: 'aa'}, post请求使用

10.超时设置

timeout: 1000

```javascript
// 1.发送request请求
// axios.request({
//   url: "http://123.207.32.32:8000/home/multidata",
//   method: "get"
// }).then(res => {
//   console.log("res:", res.data)
// })

// 2.发送get请求
// axios.get(`http://123.207.32.32:9001/lyric?id=500665346`).then(res => {
//   console.log("res:", res.data.lrc)
// })
// get请求使用下面这种阅读性比较好
// axios.get("http://123.207.32.32:9001/lyric", {
//   params: {
//     id: 500665346
//   }
// }).then(res => {
//   console.log("res:", res.data.lrc)
// })


// 3.发送post请求，第一个参数是url，第二个参数是data，第三个参数是config
// axios.post("http://123.207.32.32:1888/02_param/postjson", {
//   name: "coderwhy",
//   password: 123456
// }).then(res => {
//   console.log("res", res.data)
// })

// 也支持这种写法，第2个参数就是config，里面放data
axios.post("http://123.207.32.32:1888/02_param/postjson", {
  data: {
    name: "coderwhy",
    password: 123456
  }
}).then(res => {
  console.log("res", res.data)
})
```

## axios配置选项和all方法使用

```javascript
// 1.baseURL
const baseURL = "http://123.207.32.32:8000"

// 给axios实例配置公共的基础配置
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 10000
axios.defaults.headers = {}

// 1.1.get: /home/multidata
axios.get("/home/multidata").then(res => {
  console.log("res:", res.data)
})

// 1.2.get: /home/data

// 2.axios发送多个请求
// Promise.all
axios.all([
  axios.get("/home/multidata"),
  axios.get("http://123.207.32.32:9001/lyric?id=500665346")
]).then(res => {
  console.log("res:", res) // 返回一个数组
})
```

## **axios的创建实例**

**为什么要创建axios的实例呢?**

当我们从axios模块中导入对象时, 使用的实例是默认的实例；

当给该实例设置一些默认配置时, 这些配置就被固定下来了.

但是后续开发中, 某些配置可能会不太一样；

比如某些请求需要使用特定的baseURL或者timeout等.

这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息.

```javascript

// axios默认库提供给我们的实例对象
axios.get("http://123.207.32.32:9001/lyric?id=500665346")

// 创建其他的实例发送网络请求
const instance1 = axios.create({
  baseURL: "http://123.207.32.32:9001",
  timeout: 6000,
  headers: {}
})

instance1.get("/lyric", {
  params: {
    id: 500665346
  }
}).then(res => {
  console.log("res:", res.data)
})

const instance2 = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 10000,
  headers: {}
})
```

## **请求和响应拦截器**

**axios的也可以设置拦截器：拦截每次请求和响应**

axios.interceptors.request.use(请求成功拦截, 请求失败拦截)

axios.interceptors.response.use(响应成功拦截, 响应失败拦截)

```javascript

// 对实例配置拦截器
axios.interceptors.request.use((config) => {
  console.log("请求成功的拦截")
  // 1.开始loading的动画

  // 2.对原来的配置进行一些修改
  // 2.1. header
  // 2.2. 认证登录: token/cookie
  // 2.3. 请求参数进行某些转化

  return config
}, (err) => {
  console.log("请求失败的拦截")
  return err
})

axios.interceptors.response.use((res) => {
  console.log("响应成功的拦截")

  // 1.结束loading的动画

  // 2.对数据进行转化, 再返回数据
  return res.data
}, (err) => {
  console.log("响应失败的拦截:", err)
  return err
})

axios.get("http://123.207.32.32:9001/lyric?id=500665346").then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
})
```

## **axios请求库封装（简洁版）**

service/index.js

```javascript
import axios from 'axios'

class HYRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest("http://123.207.32.32:9001")
```

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import hyRequest from './service'

createApp(App).mount('#app')

hyRequest.request({
  url: "/lyric?id=500665346"
}).then(res => {
  console.log("res:", res)
})

hyRequest.get({
  url: "/lyric",
  params: {
    id: 500665346
  }
}).then(res => {
  console.log("res:", res)
})
```

