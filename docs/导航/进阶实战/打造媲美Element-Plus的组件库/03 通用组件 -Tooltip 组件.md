---
outline: deep
---

## Tooltip组件需求分析

* 通用组件
* Tooltip
* Dropdown
* Select等等

### 功能分析

* 最根本功能，两块区域
  * 触发区
  * 展示区
* 触发方式
  * hover
  * 点击
  * 手动
* 重点就是触发区发生特定事件的时候，展示区的展示与隐藏

### Tooltip.vue

```html
<template>
<div
  class="vk-tooltip"
  ref="popperContainerNode"
  v-on="outerEvents"
>
  <div
    class="vk-tooltip__trigger"
    ref="triggerNode"
    v-on="events"
  >
    <slot />
  </div>
  <Transition :name="transition">
    <div
      v-if="isOpen"
      class="vk-tooltip__popper"
      ref="popperNode"
    >
      <slot name="content">
        {{content}}
      </slot>
      <div id="arrow" data-popper-arrow></div>
    </div>
  </Transition>
</div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import { debounce } from 'lodash-es'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import useClickOutside from '../../hooks/useClickOutside'
defineOptions({
  name: 'VkTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      }
    ],
    ...props.popperOptions
  }
})

const open = () => {
  openTimes++
  console.log('open times', openTimes)
  isOpen.value = true
  emits('visible-change', true)

}
const close = () => {
  closeTimes++
  console.log('close times', closeTimes)
  isOpen.value = false
  emits('visible-change', false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
  if (isOpen.value) {
    emits('click-outside', true)
  }
})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}    
  } else {
    attachEvents()
  }
})
watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    // clear the events
    events = {}
    outerEvents = {}
    attachEvents()
  }
})
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post'})

onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>
```

### style.css

```css
.vk-tooltip {
  --vk-popover-bg-color: var(--vk-bg-color-overlay);
  --vk-popover-font-size: var(--vk-font-size-base);
  --vk-popover-border-color: var(--vk-border-color);
  --vk-popover-padding: 12px;
  --vk-popover-border-radius: 4px;
  display: inline-block;
}

.vk-tooltip {
  .vk-tooltip__popper {
    background: var(--vk-popover-bg-color);
    border-radius: var(--vk-popover-border-radius);
    border: 1px solid var(--vk-popover-border-color);
    padding: var(--vk-popover-padding);
    color: var(--vk-text-color-regular);
    line-height: 1.4;
    text-align: justify;
    font-size: var(--vk-popover-font-size);
    box-shadow: var(--vk-box-shadow-light);
    word-break: break-all;
    box-sizing: border-box;
    z-index: 1000;
    #arrow,
    #arrow::before {
      position: absolute;
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      background: var(--vk-popover-bg-color);
    }
    #arrow {
      visibility: hidden;
    }
    #arrow::before {
      visibility: visible;
      content: "";
      transform: rotate(45deg);
    }
    &[data-popper-placement^='top'] > #arrow {
      bottom: -5px;
    }
    
    &[data-popper-placement^='bottom'] > #arrow {
      top: -5px;
    }
    
    &[data-popper-placement^='left'] > #arrow {
      right: -5px;
    }
    
    &[data-popper-placement^='right'] > #arrow {
      left: -5px;
    }
    &[data-popper-placement^="top"] > #arrow::before {
      border-right: 1px solid var(--vk-popover-border-color);
      border-bottom: 1px solid var(--vk-popover-border-color);
    }
    &[data-popper-placement^="bottom"] > #arrow::before {
      border-left: 1px solid var(--vk-popover-border-color);
      border-top: 1px solid var(--vk-popover-border-color);
    }
    &[data-popper-placement^="left"] > #arrow::before {
      border-right: 1px solid var(--vk-popover-border-color);
      border-top: 1px solid var(--vk-popover-border-color);
    }
    &[data-popper-placement^="right"] > #arrow::before {
      border-left: 1px solid var(--vk-popover-border-color);
      border-bottom: 1px solid var(--vk-popover-border-color);
    }
  }  

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity var(--vk-transition-duration);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
```

### types.ts

```typescript
import type { Placement, Options } from '@popperjs/core'
export interface TooltipProps {
  content? : string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  manual?: boolean;
  popperOptions?: Partial<Options>;
  transition?: string;
  openDelay?: number;
  closeDelay?: number;
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean) : void;
  (e: 'click-outside', value: boolean) : void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}
```

### Tooltip.test.tsx

```typescript
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
vi.mock('@popperjs/core')
const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() => 
    <div>
      <div id="outside"></div>
      <Tooltip content="hello tooltip" trigger='click' onVisibleChange={onVisibleChange}>
        <button id="trigger">Trigger</button>
      </Tooltip>
    </div>
    , {
      attachTo: document.body
    })
    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.vk-tooltip__popper').exists()).toBeFalsy()
    console.log('before', wrapper.html())
    // 测试点击行为
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.vk-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.vk-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    console.log('after', wrapper.html())
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.vk-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
```

### useClickOutside.ts

```typescript
import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
```

### 总结

Tooltip分析

* 基础组件
  * 触发层
  * 展示层
* 开发复杂组件的时候
  * 需求分析
  * 设立开发计划

Tooltip开发

* 使用popper.js来完成位置的展示
* 动态事件的添加
  * 使用v-on
* 使用外侧点击的功能
  * useClickOutside
* 手动触发的功能
  * 组件实例实现对应的方法
* 支持Poper参数
  * 使用第三方库的时候必不可少的功能
* 添加延时
  * 使用debounce来整合短事件内多次触发的回调
  * debounce可以使用cancel方法来取消

* 添加样式
  * 三角箭头的实现
  * 正方形选择45度，加特定的位移，再加边框
* 添加测试
  * 注意定时器的影响
    * vi.useFakeTimers()
    * vi.runAlltimers()
  * 注意点击到外侧区域的测试



