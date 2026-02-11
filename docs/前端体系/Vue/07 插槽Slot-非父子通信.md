---
outline: deep
---

## **认识插槽 Slot**

**在开发中，我们会经常封装一个个可复用的组件：**

前面我们会通过 props 传递给组件一些数据，让组件来进行展示；

但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的 div、span 等等这些元素；

比如某种情况下我们使用组件，希望组件显示的是一个按钮，某种情况下我们使用组件希望显示的是一张图片；

我们应该让使用者可以决定某一块区域到底存放什么内容和元素；

**举个栗子：假如我们定制一个通用的导航组件 - NavBar**

这个组件分成三块区域：左边-中间-右边，每块区域的内容是不固定；

左边区域可能显示一个菜单图标，也可能显示一个返回按钮，可能什么都不显示；

中间区域可能显示一个搜索框，也可能是一个列表，也可能是一个标题，等等；

右边可能是一个文字，也可能是一个图标，也可能什么都不显示；

![image-20230508200451131](../../images/image-20230508200451131.png)

## **如何使用插槽 slot？**

**这个时候我们就可以来定义插槽 slot：**

插槽的使用过程其实是抽取共性、预留不同；

我们会将共同的元素、内容依然在组件内进行封装；

同时会将不同的元素使用 slot 作为占位，让外部决定到底显示什么样的元素；

**如何使用 slot 呢？**

Vue 中将 `<slot> `元素作为承载分发内容的出口；

在封装组件中，使用特殊的元素`<slot>`就可以为封装组件开启一个插槽；

该插槽插入什么内容取决于父组件如何使用；

![image-20230508200610217](../../images/image-20230508200610217.png)

## **插槽的默认内容**

有时候我们希望在使用插槽时，如果**没有插入对应的内容，那么我们需要显示一个默认的内容**：

当然这个默认的内容只会在没有提供插入的内容时，才会显示；

App.vue

```javascript
<template>
  <div class="app">
    <!-- 1.内容是button -->
    <show-message title="哈哈哈">
      <button>我是按钮元素</button>
    </show-message>

    <!-- 2.内容是超链接 -->
    <show-message>
      <a href="#">百度一下</a>
    </show-message>

    <!-- 3.内容是一张图片 -->
    <show-message>
      <img src="@/img/kobe02.png" alt="">
    </show-message>

    <!-- 4.内容没有传递 -->
    <show-message></show-message>
  </div>
</template>

<script>
  import ShowMessage from './ShowMessage.vue'

  export default {
    components: {
      ShowMessage
    }
  }
</script>

<style scoped>
</style>
```

ShowMessage.vue

```javascript
<template>
  <h2>{{ title }}</h2>
  <div class="content">
    <slot>
      <p>我是默认内容, 哈哈哈</p>
    </slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "我是title默认值"
      }
    }
  }
</script>

<style scoped>
</style>
```

## **多个插槽的效果**

我们先测试一个知识点：如果一个组件中**含有多个插槽，我们插入多个内容时是什么效果？**

我们会发现默认情况下每个插槽都会获取到我们插入的内容来显示；

![image-20230508202556485](../../images/image-20230508202556485.png)

## **插槽的基本使用**

**我们一个组件 MySlotCpn.vue：该组件中有一个插槽，我们可以在插槽中放入需要显示的内容；**

**我们在 App.vue 中使用它们：**

我们可以插入普通的内容、html 元素、组件，都可以是可以的；

![image-20230508202724602](../../images/image-20230508202724602.png)

## **具名插槽的使用**

事实上，我们希望达到的效果是插槽对应的显示，这个时候我们就可以使用 **具名插槽：**

具名插槽顾名思义就是给插槽起一个名字，`<slot>` 元素有一个特殊的 attribute：name；

一个不带 name 的 slot，会带有隐含的名字 default；

![image-20230508202847100](../../images/image-20230508202847100.png)

## **动态插槽名**

**什么是动态插槽名呢？**

目前我们使用的插槽名称都是固定的；

比如 v-slot:left、v-slot:center 等等；

我们可以通过 v-slot:[dynamicSlotName]方式动态绑定一个名称；

![image-20230508202942255](../../images/image-20230508202942255.png)

## **具名插槽使用的时候缩写**

**具名插槽使用的时候缩写：**

跟 v-on 和 v-bind 一样，v-slot 也有缩写；

即把参数之前的所有内容 (v-slot:) 替换为字符 #；

![image-20230508203014362](../../images/image-20230508203014362.png)

App.vue

```javascript
<template>
  <nav-bar>
    <template #left>
      <button>{{ leftText }}</button>
    </template>

    <template #center>
      <span>内容</span>
    </template>

    <template v-slot:right>
      <a href="#">登录</a>
    </template>
  </nav-bar>

  <!-- nav-bar只给一个插槽传入数据 -->
  <nav-bar>
    <template v-slot:[position]>
      <a href="#">注册</a>
    </template>
  </nav-bar>
  <button @click=" position = 'left' ">左边</button>
  <button @click=" position = 'center' ">中间</button>
  <button @click=" position = 'right' ">右边</button>
</template>

<script>
  import NavBar from './NavBar.vue'

  export default {
    components: {
      NavBar
    },
    data() {
      return {
        position: "center",
        leftText: "返回"
      }
    }
  }
</script>

<style scoped>
</style>
```

NavBar.vue

```javascript
<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left">left</slot>
    </div>
    <div class="center">
      <slot name="center">center</slot>
    </div>
    <div class="right">
      <slot name="right">right</slot>
    </div>
  </div>

  <div class="other">
    <slot name="default"></slot>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .left {
    width: 80px;
    background-color: orange;
  }

  .center {
    flex: 1;
    background-color: skyblue;
  }

  .right {
    width: 80px;
    background-color: aquamarine;
  }
</style>
```

## **渲染作用域**

**在 Vue 中有渲染作用域的概念：**

父级模板里的所有内容都是在父级作用域中编译的；

子模板里的所有内容都是在子作用域中编译的

**如何理解这句话呢？我们来看一个案例：**

在我们的案例中 ChildCpn 自然是可以让问自己作用域中的 title 内容的；

但是在 App 中，是访问不了 ChildCpn 中的内容的，因为它们是跨作用域的访问；

## **渲染作用域案例**

![image-20230508203911110](../../images/image-20230508203911110.png)

## **认识作用域插槽**

但是有时候我们希望插槽**可以访问到子组件中的内容**是非常重要的：

当一个组件被用来渲染一个数组元素时，我们使用插槽，并且希望插槽中没有显示每项的内容；

这个 Vue 给我们提供了作用域插槽；

**我们来看下面的一个案例：**

1.在 App.vue 中定义好数据

2.传递给 ShowNames 组件中

3.ShowNames 组件中遍历 names 数据

4.定义插槽的 prop

5.通过 v-slot:default 的方式获取到 slot 的 props

6.使用 slotProps 中的 item 和 index

## **作用域插槽的案例**

![image-20230508204825260](../../images/image-20230508204825260.png)

## **独占默认插槽的缩写**

**如果我们的插槽是默认插槽 default，那么在使用的时候 v-slot:default="slotProps"可以简写为 v-slot="slotProps"：**

![image-20240502132948360](../../images/image-20240502132948360.png)

**并且如果我们的插槽只有默认插槽时，组件的标签可以被当做插槽的模板来使用，这样，我们就可以将 v-slot 直接用在组件上：**

![image-20230508205432822](../../images/image-20230508205432822.png)

## **默认插槽和具名插槽混合**

**但是，如果我们有默认插槽和具名插槽，那么按照完整的 template 来编写。**

![image-20230508205459761](../../images/image-20230508205459761.png)

**只要出现多个插槽，请始终为所有的插槽使用完整的基于 `<template>` 的语法：**

![image-20230508205558444](../../images/image-20230508205558444.png)

App.vue

```javascript
<template>
  <div class="app">
    <!-- 1.tab-control -->
    <tab-control :titles="['衣服', '鞋子', '裤子']"
                 @tab-item-click="tabItemClick"/>

    <!-- <tab-control :titles="['流行', '最新', '优选']"/> -->

    <!-- 2.展示内容 -->
    <h1>{{ pageContents[currentIndex] }}</h1>

    <!-- 1.tab-control: button -->
    <tab-control :titles="['衣服', '鞋子', '裤子']"
                 @tab-item-click="tabItemClick">
      <template v-slot:default="props">
        <button>{{ props.item }}</button>
      </template>
    </tab-control>


    <!-- 2.tab-control: a元素(重要) -->
    <tab-control :titles="['衣服', '鞋子', '裤子']"
                 @tab-item-click="tabItemClick">
      <template #default="props">
        <a href="#">{{ props.item }}</a>
      </template>
    </tab-control>

    <!-- 3.独占默认插槽的简写(了解) -->
    <tab-control :titles="['衣服', '鞋子', '裤子']"
                 @tab-item-click="tabItemClick">
      <template v-slot="props">
        <button>{{ props.item }}</button>
      </template>
    </tab-control>

    <!-- 4.如果只有一个默认插槽, 那么template可以省略 -->
    <tab-control :titles="['衣服', '鞋子', '裤子']"
                 @tab-item-click="tabItemClick"
                 v-slot="props">
      <button>{{ props.item }}</button>
    </tab-control>
  </div>
</template>

<script>
  import TabControl from './TabControl.vue'

  export default {
    components: {
      TabControl
    },
    data() {
      return {
        pageContents: [ "衣服列表", "鞋子列表", "裤子列表" ],
        currentIndex: 0
      }
    },
    methods: {
      tabItemClick(index) {
        console.log("app:", index)
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
</style>
```

TabControl.vue

```javascript
<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div class="tab-control-item"
           :class="{ active: index === currentIndex }"
           @click="itemClick(index)">
        <slot :item="item" abc="cba">
          <span>{{ item }}</span>
        </slot>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      titles: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    emits: ["tabItemClick"],
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit("tabItemClick", index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item.active {
    color: red;
    font-weight: 700;
  }

  .tab-control-item.active span {
    border-bottom: 3px solid red;
    padding: 8px;
  }
</style>
```

## **非父子组件的通信**

在开发中，我们构建了组件树之后，除了**父子组件之间的通信**之外，还会有**非父子组件之间**的通信。

**这里我们主要讲两种方式：**

全局事件总线；

Provide/Inject；

## **Provide 和 Inject**

Provide/Inject 用于**非父子组件之间共享数据**：

比如有一些深度嵌套的组件，子组件想要获取父组件的部分内容；

在这种情况下，如果我们仍然将 props 沿着组件链逐级传递下去，就会非常的麻烦；

对于这种情况下，**我们可以使用 Provide 和 Inject ：**

无论层级结构有多深，父组件都可以作为其所有子组件的依赖提供者；

父组件有一个 provide 选项来提供数据；

子组件有一个 inject 选项来开始使用这些数据；

实际上，你可以将依赖注入看作是“**long range props”**，除了：

父组件不需要知道哪些子组件使用它 provide 的 property

子组件不需要知道 inject 的 property 来自哪里

![image-20230511081149188](../../images/image-20230511081149188.png)

## **Provide 和 Inject 基本使用**

我们开发一个这样的结构：

![image-20230511081242872](../../images/image-20230511081242872.png)

## **Provide 和 Inject 函数的写法**

如果 Provide 中提供的一些数据是**来自 data**，那么我们可能会想要**通过 this 来获取**：

**这个时候会报错：**

如果 provide 想使用 data 里面的数据，就要写成函数的形式，像下面这样

![image-20230511081354500](../../images/image-20230511081354500.png)

## **处理响应式数据**

我们先来验证一个结果：**如果我们修改了 this.names 的内容，那么使用 length 的子组件会不会是响应式的？**

我们会发现对应的子组件中是**没有反应的**：

这是因为当我们修改了 names 之后，之前在 provide 中引入的 this.names.length 本身并不是响应式的；

**那么怎么样可以让我们的数据变成响应式的呢？**

非常的简单，我们可以使用响应式的一些 API 来完成这些功能，比如说 computed 函数；

当然，这个 computed 是 vue3 的新特性，在后面我会专门讲解，这里大家可以先直接使用一下；

**注意：我们在使用 length 的时候需要获取其中的 value**

这是因为 computed 返回的是一个 ref 对象，需要取出其中的 value 来使用；

![image-20230511081609954](../../images/image-20230511081609954.png)

下面是另外一个示例

App.vue

```javascript
<template>
  <div class="app">
    <home></home>
    <h2>App: {{ message }}</h2>
    <button @click="message = 'hello world'">修改message</button>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import Home from './Home.vue'

  export default {
    components: {
      Home
    },
    created() {

    },
    data() {
      return {
        message: "Hello App"
      }
    },
    // provide一般都是写成函数
    provide() {
      return {
        name: "why",
        age: 18,
        message: computed(() => this.message)
      }
    }
  }
</script>

<style scoped>
</style>
```

Home.vue

```javascript
<template>
  <div class="home">
    <home-banner></home-banner>
  </div>
</template>

<script>
  import HomeBanner from './HomeBanner.vue'

  export default {
    components: {
      HomeBanner
    }
  }
</script>

<style scoped>
</style>
```

HomeBanner.vue

```javascript
<template>
  <div class="banner">
    <h2>HomeBanner: {{ name }} - {{ age }} - {{message.value}}</h2>
  </div>
</template>

<script>
  export default {
    inject: ["name", "age", "message"]
  }
</script>

<style scoped>
</style>
```

## **全局事件总线 mitt 库**

**Vue3 从实例中移除了 $on、$off 和 $once 方法，所以我们如果希望继续使用全局事件总线，要通过第三方的库**：

Vue3 官方有推荐一些库，例如 mitt 或 tiny-emitter；

这里我们主要讲解一下 hy-event-store 的使用；

**首先，我们需要先安装这个库：**

```javascript
npm install hy-event-bus
```

**其次，我们可以封装一个工具 eventbus.js：**

```javascript
import { HYEventBus } from "hy-event-store";

const eventBus = new HYEventBus();

export default eventBus;
```

## **使用事件总线工具**

**在项目中可以使用它们：**

在 HomeBanner.vue 中触发事件

在 App.vue 中监听事件

HomeBanner.vue

```javascript
<template>
  <div class="banner">
    <button @click="bannerBtnClick">banner按钮</button>
  </div>
</template>

<script>
  import eventBus from './utils/event-bus'

  export default {
    methods: {
      bannerBtnClick() {
        console.log("bannerBtnClick")
        eventBus.emit("whyEvent", "why", 18, 1.88)
      }
    }
  }
</script>

<style scoped>
</style>
```

App.vue

```javascript
<template>
  <div class="app">
    <h2>App Message: {{ message }}</h2>
    <home></home>
  </div>
</template>

<script>
  import eventBus from './utils/event-bus'
  import Home from './Home.vue'

  export default {
    components: {
      Home,
    },
    data() {
      return {
        message: "Hello App",
      }
    },
    created() {
      // fetch()

      // 事件监听
      eventBus.on("whyEvent", (name, age, height) => {
        console.log("whyEvent事件在app中监听", name, age, height)
        this.message = `name:${name}, age:${age}, height:${height}`
      })
    }
  }
</script>

<style scoped>
</style>
```

utils/event-bus.js

```javascript
import { HYEventBus } from "hy-event-store";

const eventBus = new HYEventBus();

export default eventBus;
```

## **Mitt 的事件取消**

在某些情况下我们可能希望**取消掉之前注册的函数监听**：

在 App.vue，加个按钮控制是否展示 category 组件

```javascript
<template>
  <div class="app">
    <h2>App Message: {{ message }}</h2>
    <home></home>
    <button @click="isShowCategory = false">是否显示category</button>
    <category v-if="isShowCategory"></category>
  </div>
</template>

<script>
  import eventBus from './utils/event-bus'
  import Home from './Home.vue'
  import Category from './Category.vue'

  export default {
    components: {
      Home,
      Category
    },
    data() {
      return {
        message: "Hello App",
        isShowCategory: true
      }
    },
    created() {
      // fetch()

      // 事件监听
      eventBus.on("whyEvent", (name, age, height) => {
        console.log("whyEvent事件在app中监听", name, age, height)
        this.message = `name:${name}, age:${age}, height:${height}`
      })
    }
  }
</script>

<style scoped>
</style>
```

Category.vue

```javascript
<template>
  <div>
    <h2>Category</h2>
  </div>
</template>

<script>
  import eventBus from './utils/event-bus'

  export default {
    methods: {
      whyEventHandler() {
        console.log("whyEvent在category中监听")
      }
    },
    created() {
      eventBus.on("whyEvent", this.whyEventHandler)
    },
    // 取消监听
    unmounted() {
      console.log("category unmounted")
      eventBus.off("whyEvent", this.whyEventHandler)
    }
  }
</script>

<style scoped>
</style>
```
