---
outline: deep
---

上一节封装图标组件 SvgIcon 时，用到了 defineProps，因为它在开发中的重要性，这里简单看一下它的用法，已熟知用法的此节可跳过。

在 Vue3 的组件化开发体系里，组件间通信是构建高效、可维护应用程序的核心环节。`defineProps `作为 Vue3 框架中专门用于接收父组件传递数据的关键函数，在整个组件通信机制中发挥着不可或缺的作用。它不仅极大地简化了组件间数据传递的流程，使其更加简洁高效，还严格遵循 Vue 框架倡导的单向数据流原则，确保了数据流动的清晰性和可预测性。可以说，`defineProps `就像组件之间沟通的桥梁，让父组件能够将数据准确无误地传递给子组件，实现数据的 “按需分配”。

## **defineProps 基本用法解析**

### **1.1 运行时声明方式**

#### **1.1.1 基本声明语法**

在 Vue3 中，`defineProps `最基础的使用方式是通过字符串数组来声明接收的属性。如下代码展示了一个简单组件如何接收 `title `和 `content `属性：

```html
<template>
  <div>
    <h2>{{ props.title }}</h2>
    <p>{{ props.content }}</p>
  </div>
</template>
<script setup>
// 字符串数组形式声明
const props = defineProps(['title', 'content'])
</script>
```

这种方式简单直接，适用于快速搭建原型或对属性类型要求不高的场景。但它的局限性在于缺乏类型检查，在复杂项目中可能导致潜在的错误。

#### **1.1.2 类型声明语法（推荐）**

在不使用 TypeScript 类型注解时，我们可以利用 JavaScript 对象来声明`defineProps`，并通过 `type `字段明确 `props `的数据类型。这种方式在运行时进行类型检查，虽然不如 TypeScript 的静态类型检查严格，但对于简单项目或对强类型依赖不高的场景而言，十分便捷。

例如，创建一个展示文章基本信息的子组件：

```html
<template>
  <div>
    <h2>{{ props.title }}</h2>
    <p>{{ props.content }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: '暂无内容摘要'
  }
})
</script>
```

在这段代码中，`title `被声明为必需的字符串类型，`content `同样是字符串类型并设置了默认值。当父组件传递数据时，若未提供 `content`，子组件会使用默认值展示。这种运行时声明方式符合 JavaScript 编程习惯，易于理解和维护。

### **1.2 基于类型的声明方式**

当项目使用 TypeScript 时，`defineProps `借助类型注解实现了强大的静态类型检查功能。这能在编码阶段就发现类型错误，大大提升了代码的可靠性和可维护性。

例如，创建一个展示用户列表的组件：

```html
<template>
  <ul>
    <li v-for="user in props.users" :key="user.id">
      {{ user.name }} - {{ user.age }}岁
    </li>
  </ul>
</template>
<script setup lang="ts">
interface User {
  id: number;
  name: string;
  age: number;
}
const props = defineProps<{
  users: User[];
}>()
</script>
```

在这个示例中，首先定义了 `User `接口明确用户对象的结构和属性类型。然后，通过 `<{ users: User[]; }> `这种类型注解方式，告知 `defineProps `该组件期望接收名为 `users `的 `props`，其值是 `User `类型的数组。这样，在父组件传递数据时，TypeScript 会严格检查数据类型是否匹配，若不匹配，编辑器会立即给出错误提示，帮助开发者及时发现并修复问题。

## **props 的类型与验证**

### **2.1 支持的类型**

`defineProps `支持多种数据类型声明，为处理不同类型数据提供了极大的灵活性。

#### **2.1.1 基础类型**

常见的基础类型包括 String、Number、Boolean ，用于接收简单的文本、数值和布尔值数据。

例如，在展示商品价格的组件中：

```html
<template>
  <div>
    <p>商品价格：{{ props.price }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  price: {
    type: Number,
    required: true
  }
})
</script>
```

这里，`price `被声明为必需的 `Number `类型，确保组件接收的数据中 `price`一定是有效的数值。

#### **2.1.2 Object 和 Array 类型**

除了基础类型，defineProps 还支持 Object 和 Array 类型，用于处理复杂的数据结构。比如，在一个展示用户列表的组件中，我们可以接收一个包含用户信息的对象数组：

```html
<template>
  <ul>
    <li v-for="user in props.users" :key="user.id">
      {{ user.name }} - {{ user.age }}岁
    </li>
  </ul>
</template>
<script setup>
const props = defineProps({
  users: {
    type: Array,
    default: () => []
  }
})
</script>
```

这里的 users 是一个 Array 类型的 props ，并且设置了默认值为空数组，以防止在父组件未传递数据时出现错误。

#### **2.1.3 Function 类型**

defineProps 还支持 Function 类型，用于接收函数作为 props ，这在一些需要传递回调函数的场景中非常有用。

例如，在一个按钮组件中，我们可以接收一个点击事件的回调函数：

```html
<template>
  <button @click="props.clickHandler">点击我</button>
</template>
<script setup>
const props = defineProps({
  clickHandler: {
    type: Function,
    required: true
  }
})
</script>
```

在这个例子中，父组件可以传递一个函数给 clickHandler ，当按钮被点击时，就会执行这个回调函数。

#### **2.1.4 其他类型**

除了上述常见类型，defineProps 还支持许多高级类型，如枚举类型、对象类型、联合类型等。以联合类型为例，假设我们有一个组件，它可以接收字符串或者数字类型的 id ：

```html
<template>
  <div>
    <p>ID: {{ props.id }}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: string | number;
}>()
</script>
```

在这个示例中，id 被声明为 string 或 number 类型的联合类型，这意味着父组件可以传递字符串类型的 id ，也可以传递数字类型的id ，组件都能正确处理。

### **2.2 验证方式**

为了确保组件接收到的数据符合预期，我们可以对 props 进行验证。defineProps 提供了多种验证方式，包括 type、required、default 和 validator 。

#### **2.2.1 type**

type 用于定义数据的类型，这是最基本的验证方式。通过明确指定 props 的类型，Vue 在运行时会检查传入的数据是否符合类型要求，如果不符合，会在控制台抛出警告。例如：

```html
<template>
  <div>
    <p>姓名：{{ props.name }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String
  }
})
</script>
```

在这个例子中，name 被定义为 String 类型，如果父组件传递的 name 不是字符串类型，Vue 就会发出警告。

#### **2.2.2 required**

required 用于指定 props 是否为必需。当设置为 true 时，如果父组件没有传递该 props ，Vue 同样会在控制台抛出警告。比如：

```html
<template>
  <div>
    <p>订单编号：{{ props.orderId }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
})
</script>
```

在这个场景中，orderId 是必需的字符串类型 props ，如果父组件没有传递 orderId ，则会触发警告，提醒开发者检查数据传递是否完整。

#### **2.2.3 default**

default 用于设置 props 的默认值。当父组件没有传递该 props 时，组件会使用默认值。默认值的设置方式根据 props 的类型而有所不同。对于简单类型，如字符串、数字、布尔值等，可以直接设置默认值；对于对象和数组类型，需要通过函数返回默认值，以确保每次使用默认值时都是一个新的实例，避免引用类型数据的共享问题。例如：

```html
<template>
  <div>
    <p>提示信息：{{ props.tip }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  tip: {
    type: String,
    default: '暂无提示信息'
  },
  userInfo: {
    type: Object,
    default: () => ({})
  }
})
</script>
```

在这个例子中，tip的默认值是一个字符串，而 userInfo 的默认值是一个空对象，通过函数返回，保证了每次使用默认值时都是一个新的空对象。

#### **2.2.4 validator**

validator 是一个自定义验证函数，用于对 props 进行更复杂的验证逻辑。该函数接收一个参数，即父组件传递过来的 props 值，函数返回 true 表示验证通过，返回 false 则表示验证失败，验证失败时 Vue 会在控制台抛出警告。比如，我们要验证一个表示年龄的 props ，要求年龄必须在 18 到 100 之间：

```html
<template>
  <div>
    <p>年龄：{{ props.age }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  age: {
    type: Number,
    validator: (value) => {
      return value >= 18 && value <= 100
    }
  }
})
</script>
```

在这个示例中，validator 函数会检查 age 的值是否在 18 到 100 之间，如果不在这个范围内，就会验证失败，提示开发者传入的年龄不符合要求。

通过 type、required、default 和 validator 这些验证方式的结合使用，我们可以确保组件接收到的数据的有效性和完整性，提高应用的稳定性和可靠性。

## **Vue3.5 中 defineProps 的新特性**

Vue 3.5 的发布为 defineProps 带来了一些令人欣喜的新特性，这些特性进一步提升了开发的便利性和效率，让我们一起来深入了解一下。

### **3.1 响应式 Props 解构**

在 Vue3.5 之前，如果我们直接对 props 进行解构赋值，会失去响应式，需要配合使用 toRefs 或者 toRef 解构才会有响应式 ，这无疑增加了开发的工序和代码的复杂性。

例如，在一个简单的计数器组件中，假设父组件传递一个 count 属性给子组件 ：

```html
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>
<script setup lang="ts">
import { toRef } from 'vue'
const props = defineProps<{
  count: number
}>()
const count = toRef(props, 'count')
const increment = () => {
  count.value++
}
</script>
```

在这段代码中，为了保持 count 的响应式，我们不得不使用 toRef 将 props.count 转换为一个响应式的 ref ，这使得代码显得有些繁琐。

而在 Vue3.5 中，我们可以直接进行响应式解构，无需借助额外的工具函数 。同样是上述计数器组件，代码可以简化为：

```html
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>
<script setup lang="ts">
const { count } = defineProps<{
  count: number
}>()
const increment = () => {
  count++
}
</script>
```

可以看到，直接解构 defineProps 返回的值，count 依然保持着响应式，当父组件的 count 值发生变化时，子组件会自动更新，反之亦然。这种方式极大地简化了代码，提高了开发效率，让我们的代码更加简洁、直观。Vue 3.5 对解构变量（例如count）的访问会被编译器自动编译成props.count，因此访问时会对其进行跟踪，确保了响应式的正常工作。 这一特性在处理复杂的props 结构时，优势更加明显。比如，当我们需要从一个包含多个属性的对象中解构出多个响应式属性时，Vue3.5 之前的写法会非常冗长，而现在则可以轻松实现。

### **3.2 新的默认值写法**

在 Vue3.5 之前，设置 props的默认值需要使用 default 选项，例如：

```html
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  message: {
    type: String,
    default: '默认消息'
  }
})
</script>
```

这种写法在定义简单的 props 默认值时还不算复杂，但当props较多或者默认值的逻辑较为复杂时，代码会显得比较臃肿。

#### **3.2.1 使用 JavaScript 原生默认值语法**

Vue3.5 中，可使用 JavaScript 原生默认值语法设置 `props `默认值，使代码更简洁。例如：

```html
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>
<script setup>
const { message = '默认消息' } = defineProps({
  message: String
})
</script>
```

在这个例子中，我们直接在解构时为 message 设置了默认值，这种写法更接近 JavaScript 的常规语法，大大降低了开发者的学习成本和心智负担 。特别是在使用基于类型的 props 声明时，这种新的默认值写法更加简洁高效。例如，在 TypeScript 中：

```html
<template>
  <div>
    <p>{{ count }}</p>
  </div>
</template>
<script setup lang="ts">
const { count = 0 } = defineProps<{
  count?: number
}>()
</script>
```

通过这种方式，我们可以清晰地看到 count 的类型和默认值，代码的可读性和可维护性都得到了显著提升。 新的默认值写法不仅适用于简单类型，对于对象和数组等复杂类型同样适用。比如，当我们需要为一个包含多个属性的对象设置默认值时，可以这样写：

```html
<template>
  <div>
    <p>{{ user.name }}</p>
    <p>{{ user.age }}</p>
  </div>
</template>
<script setup lang="ts">
const { user = { name: '张三', age: 18 } } = defineProps<{
  user?: {
    name: string
    age: number
  }
}>()
</script>
```

这样，当父组件没有传递 user 属性时，子组件会使用默认的 user 对象，并且代码结构更加紧凑，易于理解。

#### **3.2.2 使用 `withDefaults` 函数**

`withDefaults` 是 Vue 3.5 引入的新特性，专门用于设置 `props` 的默认值，同时能提供良好的类型支持。

```html
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
const props = withDefaults(defineProps<{
  message?: string;
}>(), {
  message: () => '默认消息'
});
const { message } = props;
</script>
```

`defineProps `定义 `props `类型，`withDefaults `设置默认值，两者结合使代码结构更清晰，类型检查更严格。

## **综合展示**

为全面展示 Vue3.5 中 `defineProps `的用法，来看一个完整的父子组件通信示例。假设开发一个简单电商应用，有父组件 `ProductList `展示商品列表，子组件 `ProductItem `展示单个商品详细信息。

首先，创建父组件 `ProductList.vue`：

```html
<template>
  <div>
    <h1>商品列表</h1>
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @addToCart="addToCart"
    />
  </div>
</template>
<script setup lang="ts">
import ProductItem from './ProductItem.vue'
import { ref } from 'vue'
// 模拟商品数据
const products = ref([
  {
    id: 1,
    name: 'Vue.js 实战指南',
    price: 59.99,
    description: '一本深入学习Vue.js的书籍'
  },
  {
    id: 2,
    name: '智能手表',
    price: 199.99,
    description: '具备多种健康监测功能的智能手表'
  }
])
// 模拟添加商品到购物车的方法
const addToCart = (product) => {
  console.log(`已将 ${product.name} 添加到购物车`)
}
</script>
```

父组件定义了 `products `数组，包含两个商品对象。通过 `v-for `指令将每个商品对象传递给`ProductItem `子组件，并绑定 `product `属性。同时定义 `addToCart `方法处理添加商品到购物车的逻辑，作为事件监听器传递给子组件。

接下来，创建子组件 `ProductItem.vue`：

```html
<template>
  <div class="product-item">
    <h2>{{ product.name }}</h2>
    <p>价格: {{ product.price }}</p>
    <p>描述: {{ product.description }}</p>
    <button @click="handleAddToCart">添加到购物车</button>
  </div>
</template>
<script setup lang="ts">
const { product } = defineProps<{
  product: {
    id: number
    name: string
    price: number
    description: string
  }
}>()
const emit = defineEmits(['addToCart'])
const handleAddToCart = () => {
  emit('addToCart', product)
}
</script>
<style scoped>
.product-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
```

子组件使用 Vue3.5 新特性，直接对 `defineProps `进行响应式解构获取 `product `对象。定义`handleAddToCart `方法，用户点击 “添加到购物车” 按钮时，触发 `addToCart `事件，并将当前商品对象传递给父组件。

通过这个综合示例，能清晰看到 Vue3.5 中`defineProps`在父子组件通信中的实际应用。利用响应式 Props 解构，子组件可以更便捷地访问和使用从父组件传递过来的数据，代码简洁且直观。同时，结合`defineEmits`实现了子组件向父组件传递数据和事件的功能，完整地展示了 Vue 组件间通信的双向流程。这不仅提升了开发效率，还增强了代码的可读性和可维护性，使得整个组件化开发过程更加流畅。

在实际项目开发中，`defineProps`的这些特性能够帮助开发者更高效地构建大型应用程序。无论是简单的展示组件，还是复杂的业务逻辑组件，都可以根据具体需求灵活运用 `defineProps `的不同声明方式和验证机制，确保组件间数据传递的准确性和稳定性。而 Vue3.5 引入的新特性，更是为开发者在处理响应式数据和设置默认值等常见场景下，提供了更为简洁、强大的工具，进一步降低了开发成本，推动 Vue 应用开发迈向更高的效率和质量水平。随着 Vue 框架的不断发展和更新，相信`defineProps`以及相关功能还会持续优化，为广大前端开发者带来更多便利和惊喜 。
