---
outline: deep
---

## **什么是Pinia呢？**

**Pinia（发音为/pi:njʌ/，如英语中的“peenya”）是最接近piña（西班牙语中的菠萝）的词；**

Pinia开始于大概2019年，最初是作为一个实验为Vue重新设计状态管理，让它用起来像组合式API（Composition API）。

从那时到现在，最初的设计原则依然是相同的，并且目前同时兼容Vue2、Vue3，也并不要求你使用Composition API；

Pinia本质上依然是一个状态管理的库，用于跨组件、页面进行状态共享（这点和Vuex、Redux一样）；

<img src="..\..\images\image-20230530210434429.png" />

## **Pinia和Vuex的区别**

**那么我们不是已经有Vuex了吗？为什么还要用Pinia呢？**

Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法；

最终，团队意识到Pinia已经实现了Vuex5中大部分内容，所以最终决定用Pinia来替代Vuex；

与 Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的仪式，提供了 Composition-API 风格的 API；

最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持；

**和Vuex相比，Pinia有很多的优势：**

**比如**mutations 不再存在：

他们经常被认为是 **非常** **冗长**；

他们最初带来了 devtools 集成，但这不再是问题；

**更友好的TypeScript支持，Vuex之前对TS的支持很不友好；**

**不再有modules的嵌套结构：**

你可以灵活使用每一个store，它们是通过扁平化的方式来相互使用的；

**也不再有命名空间的概念，不需要记住它们的复杂关系；**

<img src="..\..\images\image-20230530210709523.png" />

## **如何使用Pinia？**

**使用Pinia之前，我们需要先对其进行安装：**

```javascript
yarn add pinia 
## or with npm
npm install pinia
```

**创建一个pinia并且将其传递给应用程序：**

stores/index.js

```javascript
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'

createApp(App).use(pinia).mount('#app')
```

## **认识Store**

**什么是Store？**

一个 Store （如 Pinia）是一个实体，它会持有为绑定到你组件树的状态和业务逻辑，也就是保存了全局的状态；

它有点像始终存在，并且每个人都可以读取和写入的组件；

你可以在你的应用程序中定义任意数量的Store来管理你的状态；

**Store有三个核心概念：**

state、getters、actions；

等同于组件的data、computed、methods；

一旦 store 被实例化，你就可以直接在 store 上访问 state、getters 和 actions 中定义的任何属性；

## **定义一个Store**

**定义一个Store：**

我们需要知道 Store 是使用 defineStore() 定义的，

并且它需要一个唯一名称，作为第一个参数传递；

**这个name，也称为id，是必要的，Pinia 使用它来将 store 连接到devtools。**

**返回的函数统一使用useX作为命名方案，这是约定的规范；**

stores/counter.js

```javascript
// 定义关于counter的store
import { defineStore } from 'pinia'

const useCounter = defineStore("counter", { // counter是id
  state: () => ({
    count: 99,
  }),
})

export default useCounter
```

## **使用定义的Store**

**Store在它被使用之前是不会创建的，我们可以通过调用use函数来使用Store：**

 ```javascript
 <template>
   <div class="home">
     <h2>Home View</h2>
     <h2>count: {{ counterStore.count }}</h2>
   </div>
 </template>
 
 <script setup>
   import useCounter from '@/stores/counter';
 
   const counterStore = useCounter()
 </script>
 
 <style scoped>
 </style>
 ```

**注意Store获取到后不能被解构，那么会失去响应式：**

为了从 Store 中提取属性同时保持其响应式，您需要使用storeToRefs()。

```javascript
<template>
  <div class="home">
    <h2>Home View</h2>
    <h2>count: {{ counterStore.count }}</h2>
    <h2>count: {{ count }}</h2>
    <button @click="incrementCount">count+1</button>
  </div>
</template>

<script setup>
  import { toRefs } from 'vue'
  import { storeToRefs } from 'pinia'
  import useCounter from '@/stores/counter';

  const counterStore = useCounter()

  // const { count } = counterStore // 不是响应式的
  // const { count } = toRefs(counterStore) // 是响应式的
  const { count } = storeToRefs(counterStore) // 是响应式的


  function incrementCount() {
    counterStore.count++
  }

</script>

<style scoped>
</style>
```

## **认识和定义State**

**state** **是** **store** **的核心部分，因为store是用来帮助我们管理状态的。**

在 Pinia 中，状态被定义为返回初始状态的函数；

<img src="..\..\images\image-20230530214558145.png" />

## **操作State（一）**

**读取和写入 state：**

默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态；

<img src="..\..\images\image-20230530214653467.png" />

**重置 State：**

你可以通过调用 store 上的 $reset() 方法将状态 重置 到其初始值；

<img src="..\..\images\image-20230530214715296.png" />

## **操作State（二）**

**改变State：**

除了直接用 store.counter++ 修改 store，你还可以调用 $patch 方法；

它允许您使用部分“state”对象同时应用多个更改；

<img src="..\..\images\image-20230530214749416.png" />

**替换State：**

您可以通过将其 $state 属性设置为新对象来替换 Store 的整个状态：

但是，原先有的属性，新对象没有的属性还是会被保留下来

<img src="..\..\images\image-20230530214845677.png" />

```javascript
<template>
  <div class="home">
    <h2>Home View</h2>
    <h2>name: {{ name }}</h2>
    <h2>age: {{ age }}</h2>
    <h2>level: {{ level }}</h2>
    <button @click="changeState">修改state</button>
    <button @click="resetState">重置state</button>
  </div>
</template>

<script setup>
  import useUser from '@/stores/user'
  import { storeToRefs } from 'pinia';

  const userStore = useUser()
  const { name, age, level } = storeToRefs(userStore)

  function changeState() {
    // 1.一个个修改状态 掌握这个即可，其他了解
    // userStore.name = "kobe"
    // userStore.age = 20
    // userStore.level = 200

    // 2.一次性修改多个状态
    // userStore.$patch({
    //   name: "james",
    //   age: 35
    // })

    // 3.替换state为新的对象
    const oldState = userStore.$state
    userStore.$state = {
      name: "curry",
      level: 200
    }
    console.log(oldState === userStore.$state) // true
  }

  function resetState() {
    userStore.$reset()
  }

</script>

<style scoped>
</style>
```

stores/user.js

```javascript
import { defineStore } from 'pinia'

const useUser = defineStore("user", {
  state: () => ({
    name: "why",
    age: 18,
    level: 100
  })
})

export default useUser
```

## **认识和使用Getters**

**Getters相当于Store的计算属性：**

它们可以用 defineStore() 中的 getters 属性定义；

getters中可以定义接受一个state作为参数的函数；

```javascript
// 定义关于counter的store
import { defineStore } from 'pinia'

import useUser from './user'

const useCounter = defineStore("counter", {
  state: () => ({
    count: 99,
    friends: [
      { id: 111, name: "why" },
      { id: 112, name: "kobe" },
      { id: 113, name: "james" },
    ]
  }),
  getters: {
    // 1.基本使用
    doubleCount(state) {
      return state.count * 2
    },
    // 2.一个getter引入另外一个getter
    doubleCountAddOne() {
      // this是store实例
      return this.doubleCount + 1
    },
    // 3.getters也支持返回一个函数
    getFriendById(state) {
      return function(id) {
        for (let i = 0; i < state.friends.length; i++) {
          const friend = state.friends[i]
          if (friend.id === id) {
            return friend
          }
        }
      }
    },
    // 4.getters中用到别的store中的数据
    showMessage(state) {
      // 1.获取user信息
      const userStore = useUser()

      // 2.获取自己的信息

      // 3.拼接信息
      return `name:${userStore.name}-count:${state.count}`
    }
  },
})

export default useCounter
```

```javascript
<template>
  <div class="home">
    <h2>Home View</h2>
    <h2>doubleCount: {{ counterStore.doubleCount }}</h2>
    <h2>doubleCountAddOne: {{ counterStore.doubleCountAddOne }}</h2>
    <h2>friend-111: {{ counterStore.getFriendById(111) }}</h2>
    <h2>friend-112: {{ counterStore.getFriendById(112) }}</h2>
    <h2>showMessage: {{ counterStore.showMessage }}</h2>
  </div>
</template>

<script setup>
  import useCounter from '@/stores/counter';

  const counterStore = useCounter()

</script>

<style scoped>
</style>
```

## **认识和使用Actions**

**Actions 相当于组件中的 methods。**

可以使用 defineStore() 中的 actions 属性定义，并且它们非常适合定义业务逻辑；

**和getters一样，在action中可以通过this访问整个store实例的所有操作；**

**并且Actions中是支持异步操作的，并且我们可以编写异步函数，在函数中使用await；**

stores/counter.js

```javascript
// 定义关于counter的store
import { defineStore } from 'pinia'

const useCounter = defineStore("counter", {
  state: () => ({
    count: 99,
  }),
  actions: {
    increment() {
      this.count++
    },
    incrementNum(num) {
      this.count += num
    }
  }
})

export default useCounter
```

stores/home.js

```javascript
import { defineStore } from 'pinia'

const useHome = defineStore("home", {
  state: () => ({
    banners: [],
    recommends: []
  }),
  actions: {
    async fetchHomeMultidata() {
      const res = await fetch("http://123.207.32.32:8000/home/multidata")
      const data = await res.json()

      this.banners = data.data.banner.list
      this.recommends = data.data.recommend.list
      
      // return new Promise(async (resolve, reject) => {
      //   const res = await fetch("http://123.207.32.32:8000/home/multidata")
      //   const data = await res.json()

      //   this.banners = data.data.banner.list
      //   this.recommends = data.data.recommend.list

      //   resolve("bbb")
      // })
    }
  }
})

export default useHome
```

```javascript
<template>
  <div class="home">
    <h2>Home View</h2>
    <h2>doubleCount: {{ counterStore.count }}</h2>
    <button @click="changeState">修改state</button>

    <!-- 展示数据 -->
    <h2>轮播的数据</h2>
    <ul>
      <template v-for="item in homeStore.banners">
        <li>{{ item.title }}</li>
      </template>
    </ul>
  </div>
</template>

<script setup>
  import useCounter from '@/stores/counter';
  import useHome from '@/stores/home';

  const counterStore = useCounter()

  function changeState() {
    // counterStore.increment()
    counterStore.incrementNum(10)
  }

  const homeStore = useHome()
  homeStore.fetchHomeMultidata().then(res => {
    console.log("fetchHomeMultidata的action已经完成了:", res)
  })

</script>

<style scoped>
</style>
```

