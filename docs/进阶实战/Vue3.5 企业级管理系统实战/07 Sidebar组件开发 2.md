---
outline: deep
---

本篇通过 Pinia 实现侧边栏（Sidebar）的展开收起功能，并通过 Pinia 实现展开状态的持久化。

## **安装 Pinia Persistedstate**

Pinia 是 Vue.js 的状态管理库，而 pinia-plugin-persistedstate 是一个针对 Pinia 的插件，它能让 Pinia 管理的状态实现持久化存储。在前端开发中，持久化状态意味着即使页面刷新或用户关闭浏览器重新打开，某些关键状态依然能保持不变，极大提升用户体验。比如侧边栏的展开或收起状态，用户设置后希望再次访问页面时依然保持之前的设置。使用以下命令进行安装：

```json
pnpm install pinia-plugin-persistedstate
```

![图片](http://139.196.79.103:9001/myimages/imgs/202506270134892.webp)

## **在 main.ts 中使用**

在 main.ts 中引入持久化插件 pinia-plugin-persistedstate，通过pinia.use(piniaPluginPersistedstate) 这行代码，将该插件应用到 Pinia 实例中。这样，后续定义的 Store 中的状态，只要按照插件规则配置，就能实现持久化存储。代码如下：

```typescript
//main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css/normalize.css";
import { createPinia } from "pinia";
import element from "./plugins/element";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import "@/style/index.scss";
import "uno.css";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 安装持久化插件
app.use(router);
app.use(pinia);
app.use(element);
// app.use(ElementPlus);
app.mount("#app");
```

## **配置 Pinia 和持久化插件**

在 src 目录下创建 stores 文件夹，并在其中创建 app.ts 文件，代码如下：

```typescript
//src/stores/app.ts
// 使用defineStore定义名为'app'的store
export const useAppStore = defineStore(
  "app",
  () => {
    
    //定义响应式状态
    const state = reactive({
      sidebar: {
        opened: true
      }
      // ...
      // theme
    });
    //计算属性，方便获取sidebar状态
    const sidebar = computed(() => state.sidebar);
    //切换侧边栏展开状态的函数
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened;
    };
    return { state, sidebar, toggleSidebar };
  },
  {
    //持久化配置
    persist: {
      storage: window.localStorage,//使用window.localStorage存储状态
      pick: ["state.sidebar"]//只持久化state.sidebar这个属性
    }
  }
);
```

注：state 必须导出，否则无法使用

在 Store 的定义中，通过 persist 选项来配置持久化相关参数。storage 指定了存储方式，这里使用window.localStorage，意味着状态会存储在浏览器的本地存储中。pick 数组指定了要持久化的具体状态属性，这里只选择了state.sidebar，即只对侧边栏的展开状态进行持久化。如果有多个状态需要持久化，可以在pick数组中添加更多属性路径。

## **创建 Hamburger 组件**

在 src/components 下创建 Hamburger 文件夹，其下创建 index.vue 文件，代码如下：

```html
//src/components/Hamburger/index.vue
<template>
  <div class="hamburger-container">
    <!-- svg-icon组件，用于显示菜单图标，根据collapse状态添加旋转类名 -->
    <svg-icon
      icon-name="ant-design:bars-outlined"
      custom-class="hamburger"
      :class="{ 'rotate-180': collapse }"
      @click="handleClick"
    ></svg-icon>
  </div>
</template>
<style scoped lang="scss">
.hamburger-container {
  @apply leading-[50px] float-left cursor-pointer px-10px hover:(bg-black/5);
}
.hamburger {
  @apply w-30px h-30px transition-transform duration-300;
}
</style>
<script lang="ts" setup>
// 定义组件props，接收collapse状态
const { collapse } = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});
// 定义组件事件emit，用于触发toggleCollapse事件
const emit = defineEmits<{ (e: "toggleCollapse"): void }>();
// 点击处理函数，触发toggleCollapse事件
const handleClick = () => {
  emit("toggleCollapse");
};
</script>
```

## **创建 Navbar 组件**

在 src/layout/components  文件夹下创建 Navbar.vue，代码如下：

```html
//src/layout/components/Navbar.vue
<template>
  <div class="navbar" flex>
    <!-- hamburger组件，绑定toggleCollapse事件和collapse状态 -->
    <hamburger
      @toggleCollapse="toggleSidebar"
      :collapse="sidebar.opened"
    ></hamburger>
  </div>
</template>
<style scoped lang="scss">
.navbar {
  @apply h-[var(--navbar-height)];
}
</style>
<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
// 获取app store中的toggleSidebar和sidebar状态
// 在解构的时候要考虑值是不是对象，如果非对象解构出来就 丧失响应式了
const { toggleSidebar, sidebar } = useAppStore();
</script>
```

## **修改 Sidebar 组件**

修改 src/layout/components/Sidebar/index.vue，使用 pinia 存储的值，代码如下：

```html
//src/layout/components/Sidebar/index.vue
<template>
  <el-menu
    router
    class="sidebar-container-menu"
    :default-active="defaultActive"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
    :collapse="sidebar.opened"
  >
    <el-menu-item index="/dashboard">
      <el-icon><setting /></el-icon>
      <template #title>Navigator</template>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import variables from "@/style/variables.module.scss";
const route = useRoute();
const { sidebar } = useAppStore();
const defaultActive = computed(() => {
  return route.path;
});
</script>
<style scoped></style>
```

## **修改 layout**

修改 layout/index.vue，代码如下：

```html
//src/layout/index.vue
<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <!--  上边包含收缩的导航条 -->
        <navbar></navbar>
      </div>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-wrapper {
  @apply flex w-full h-full;
  .sidebar-container {
    // 跨组件设置样式
    @apply bg-[var(--menu-bg)];
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }
  .main-container {
    @apply flex flex-col flex-1;
  }
  .header {
    @apply h-84px;
    .navbar {
      @apply h-[var(--navbar-height)] bg-yellow;
    }
    .tags-view {
      @apply h-[var(--tagsview-height)] bg-blue;
    }
  }
  .app-main {
    @apply bg-cyan;
    min-height: calc(100vh - var(--tagsview-height) - var(--navbar-height));
  }
}
</style>
```

至此，就实现了侧边栏的展开收起及展开收起状态的持久化，页面效果如下：

![图片](http://139.196.79.103:9001/myimages/imgs/202506270143922.webp)
