---
outline: deep
---

## Collapse组件需求分析

### 为什么选择这个组件

* 静态展示
* 简单的交互
* 多种解决方案
* 涉及一些新的知识点
  * Provide/Inject
  * v-model实现
  * slots
  * Transition

### 了解功能

* 展示多个Item，有标题和内容两部分
* 点击标题可以关闭和展开内容
* 特有的手风琴模式

### Collapse.vue

```html
<template>
  <div
    class="vk-collapse"
  >
    <slot/>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
  name: 'VkCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}
const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value ]
  if (props.accordion) {
    _activeNames = [ activeNames.value[0] === item ? '' : item ]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      // 存在，删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      // 不存在，插入对应的name
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

```

types.ts

```typescript
import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

export interface CollapseEmits {
  (e:'update:modelValue', values: NameType[]) : void;
  (e:'change', values: NameType[]) : void;
}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
```

### style.css

```css
.vk-collapse {
  --vk-collapse-border-color: var(--vk-border-color-light);
  --vk-collapse-header-height: 48px;
  --vk-collapse-header-bg-color: var(--vk-fill-color-blank);
  --vk-collapse-header-text-color: var(--vk-text-color-primary);
  --vk-collapse-header-font-size: 13px;
  --vk-collapse-content-bg-color: var(--vk-fill-color-blank);
  --vk-collapse-content-font-size: 13px;
  --vk-collapse-content-text-color: var(--vk-text-color-primary);
  --vk-collapse-disabled-text-color: var(--vk-disabled-text-color);
  --vk-collapse-disabled-border-color: var(--vk-border-color-lighter);
  border-top: 1px solid var(--vk-collapse-border-color);
  border-bottom: 1px solid var(--vk-collapse-border-color);
}
.vk-collapse-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--vk-collapse-header-height);
  line-height: var(--vk-collapse-header-height);
  background-color: var(--vk-collapse-header-bg-color);
  color: var(--vk-collapse-header-text-color);
  cursor: pointer;
  font-size: var(--vk-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--vk-transition-duration);
  outline: none;
  border-bottom: 1px solid var(--vk-collapse-border-color);
  &.is-disabled {
    color: var(--vk-collapse-disabled-text-color);
    cursor: not-allowed;
    background-image: none;
  }
  &.is-active {
    border-bottom-color: transparent;
    .header-angle {
      transform: rotate(90deg);
    }
  }
  .header-angle {
    transition: transform var(--vk-transition-duration);
  }
}
.vk-collapse-item__content {
  will-change: height;
  background-color: var(--vk-collapse-content-bg-color);
  overflow: hidden;
  box-sizing: border-box;
  font-size: var(--vk-collapse-content-font-size);
  color: var(--vk-collapse-content-text-color);
  border-bottom: 1px solid var(--vk-collapse-border-color);
  padding-bottom: 25px;
}
.slide-enter-active, .slide-leave-active {
  transition: height var(--vk-transition-duration);
}
```

### CollapseItem.vue

```html
<template>
<div
  class="vk-collapse-item"
  :class="{
    'is-disabled': disabled
  }"
>
  <div 
    class="vk-collapse-item__header"
    :class="{
      'is-disabled': disabled,
      'is-active': isActive
    }"
    :id="`item-header-${name}`" 
    @click="handleClick"
  >
    <slot name="title">{{title}}</slot>
    <Icon icon="angle-right" class="header-angle" />
  </div>
  <Transition name="slide" v-on="transitionEvents">
    <div class="vk-collapse-item__wrapper" v-show="isActive">
      <div class="vk-collapse-item__content" :id="`item-content-${name}`">
        <slot/>
      </div>
    </div>
  </Transition>
</div>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue'
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'VkCollapseItem'
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
  if (props.disabled) { return }
  collapseContext?.handleItemClick(props.name)
}
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) { 
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }

}
</script>
```

Collapse.test.tsx

```typescript
import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(() => 
      <Collapse modelValue={['a']} onChange={onChange}>
        <CollapseItem name="a" title="title a">
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c" disabled>
          content c
        </CollapseItem>
      </Collapse>
    , {
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })
    headers = wrapper.findAll('.vk-collapse-item__header')
    contents = wrapper.findAll('.vk-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })
  test('测试基础结构以及对应文本', () => {
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    //文本
    expect(firstHeader.text()).toBe('title a')
    // 内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')   

  })
  test('点击标题展开/关闭内容', async () => {
    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  test('发送正确的事件', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  test('disabled 的内容应该没有反应', async () => {
    onChange.mockClear()
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
})
```

Collapse2.test.tsx

```typescript
import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
describe('Collapse.vue', () => { 
  test('basic collapse', async () => {
    const wrapper = mount(Collapse, {
      props: {
        'modelValue': ['a']
      },
      slots: {
        default: 
        (<>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </>)
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })
    const headers = wrapper.findAll('.vk-collapse-item__header')
    const contents = wrapper.findAll('.vk-collapse-item__wrapper')

    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    //文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    // 内容
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
    console.table(changeEvent)
    expect(changeEvent).toHaveLength(2)

    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])
   // disabled
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
   
  })
})
```

