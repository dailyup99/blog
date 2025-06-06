---
outline: deep
---

## Message组件需求分析

### 功能分析

* 在特定的行为的时候，弹出一个对应的提示（支持普通文本以及VNode）
* 提示在一定时间后可以消失
* 可以手动关闭
* 可以弹出多个提示
* 有多种类型（default,primary,danger...）

### 难点

* 使用函数式的方式来创建组件

```javascript
createMessage('hello world'm props)
// 怎样将一个组件函数式的渲染到一个节点上呢？
// 也许可以采用createApp
// 它是我们现在唯一熟知的可以完成这个任务的api
```

* 可以弹出多个提示，并且旧提示可以根据新的提示向下移动位置

```js
// 创建多个实例，应该没问题，那么怎样调整是个难题，看起来我们需要动态调整组件的属性
const component1 = createApp(Message)
const component2 = createApp(Message)
// component2能够感知component1的位置，然后动态的进行调整
```

### Message.vue

```html
<template>
  <Transition
    :name="transitionName"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      class="vk-message"
      v-show="visible"
      :class="{
        [`vk-message--${type}`]: type,
        'is-close': showClose,
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="vk-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="vk-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from "vue";
import type { MessageProps } from "./types";
import RenderVnode from "../Common/RenderVnode";
import Icon from "../Icon/Icon.vue";
import { getLastBottomOffset } from "./method";
import useEventListener from "../../hooks/useEventListener";
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
  transitionName: "fade-up",
});
const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
// const instance = getCurrentInstance()
// console.log('inner instance', instance)
// 计算偏移高度
// 这个 div 的高度
const height = ref(0);
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id));
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value);
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => height.value + topOffset.value);
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));
let timer: any;
function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
function clearTimer() {
  clearTimeout(timer);
}
onMounted(async () => {
  visible.value = true;
  startTimer();
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
});
function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    visible.value = false;
  }
}
useEventListener(document, "keydown", keydown);
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestory()
//   }
// })
function destroyComponent() {
  props.onDestory();
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}
defineExpose({
  bottomOffset,
  visible,
});
</script>
```

method.ts

```typescript
import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'
let seed = 1
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }
  // 手动调用删除，其实就是手动的调整组件中 visible 的值
  // visible 是通过 expose 传出来的
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  //非空断言操作符
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestroy
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  console.log('idx', id, idx, instances.length)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach(instance => {
    instance.destory()
  })
}
```

### style.css

```css
.vk-message {
  --vk-message-bg-color: var(--vk-color-info-light-9);
  --vk-message-border-color: var(--vk-border-color-lighter);
  --vk-message-padding: 15px 19px;
  --vk-message-close-size: 16px;
  --vk-message-close-icon-color: var(--vk-text-color-placeholder);
  --vk-message-close-hover-color: var(--vk-text-color-secondary);
}
.vk-message {
  width: fit-content;
  max-width: calc(100% - 32px);
  box-sizing: border-box;
  border-radius: var(--vk-border-radius-base);
  border-width: var(--vk-border-width);
  border-style: var(--vk-border-style);
  border-color: var(--vk-message-border-color);
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: var(--vk-message-bg-color);
  padding: var(--vk-message-padding);
  display: flex;
  align-items: center;
  transition: top var(--vk-transition-duration), opacity var(--vk-transition-duration), transform var(--vk-transition-duration);
  .vk-message__content {
    color: var(--vk-message-text-color);
    overflow-wrap: anywhere;
  }
  &.is-close .vk-message__content {
    padding-right: 30px;
  }
  .vk-message__close {
    display: flex;
    align-items: center;
  }
  .vk-message__close svg {
    cursor: pointer;
  }
}
@each $val in info,success,warning,danger { 
  .vk-message--$(val) {
    --vk-message-bg-color: var(--vk-color-$(val)-light-9);
    --vk-message-border-color: var(--vk-color-$(val)-light-8);
    --vk-message-text-color: var(--vk-color-$(val));
    .vk-message__close {
      --vk-icon-color: var(--vk-color-$(val));
    }
  }
}
.vk-message.fade-up-enter-from,
.vk-message.fade-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
```

### types.ts

```typescript
import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success'| 'info'| 'warning'| 'danger';
  onDestory: () => void;
  id: string;
  zIndex: number;
  offset?: number;
  transitionName?: string;
}
export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}
export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>
```

### useEventListener.ts

```typescript
import {  onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'
export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      value?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
```

### useZindex.ts

```typescript
import { computed, ref } from 'vue'

const zIndex = ref(0)
const useZIndex = (initialValue = 2000) => {
  const initialZIndex = ref(initialValue)
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value)
  const nextZIndex = () => {
    zIndex.value ++
    return currentZIndex.value
  }
  return {
    currentZIndex,
    nextZIndex,
    initialZIndex
  }
}

export default useZIndex
```

