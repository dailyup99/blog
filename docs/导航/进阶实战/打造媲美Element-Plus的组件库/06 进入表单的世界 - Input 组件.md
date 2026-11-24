---
outline: deep
---

## Input需求分析

* 支持Input/Textarea
* 支持不同大小
* 支持一键清空（有值的时候显示一个按钮，点击清空）
* 支持切换是否密码显示（有值的时候显示一个按钮，点击切换密码可见/不可见）
* 支持自定义前缀/后缀/slot（prefix/suffix），一般用于图标
* 支持复合型输入框自定义前缀或者后缀（prepend/append），一般用于说明和按钮
* 一些原生属性的支持

### Input.vue

```html
<template>
<div
  class="vk-input"
  :class="{
    [`vk-input--${type}`]: type,
    [`vk-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus': isFocus
  }"
>
  <!-- input -->
  <template v-if="type !== 'textarea'">
    <!-- prepend slot -->
    <div v-if="$slots.prepend" class="vk-input__prepend">
      <slot name="prepend" />
    </div>
    <div class="vk-input__wrapper">
      <!-- prefix slot -->
      <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
      </span>
      <input
        class="vk-input__inner"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        ref="inputRef"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <!-- suffix slot -->
      <span v-if="$slots.suffix || showClear || showPasswordArea" class="vk-input__suffix" @click="keepFocus">
          <slot name="suffix" />
          <Icon 
            icon="circle-xmark"
            v-if="showClear"
            class="vk-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <Icon 
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
          <Icon 
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
      </span>
    </div>
    <!-- append slot -->
    <div v-if="$slots.append" class="vk-input__append">
      <slot name="append" />
    </div>
  </template>
  <!-- textarea -->
  <template v-else>
    <textarea
      class="vk-textarea__wrapper"
      v-bind="attrs"
      ref="inputRef"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :form="form"
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </template>
</div>
</template>
<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { InputProps, InputEmits } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'VkInput',
  inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>

const showClear = computed(() => 
  props.clearable &&
  !props.disabled &&
  !!innerValue.value &&
  isFocus.value
)
const showPasswordArea = computed(() => 
  props.showPassword &&
  !props.disabled &&
  !!innerValue.value
)
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
const NOOP = () => {}
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
const handleChange = () => {
  emits('change', innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  console.log('blur triggered')
  isFocus.value = false
  emits('blur', event)
}
const clear = () => {
  console.log('clear triggered')
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}
watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})
defineExpose({
  ref: inputRef
})
</script>
```

### style.css

```css
.vk-input {
  --vk-input-text-color: var(--vk-text-color-regular);
  --vk-input-border: var(--vk-border);
  --vk-input-hover-border: var(--vk-border-color-hover);
  --vk-input-focus-border: var(--vk-color-primary);
  --vk-input-transparent-border: 0 0 0 1px transparent inset;
  --vk-input-border-color: var(--vk-border-color);
  --vk-input-border-radius: var(--vk-border-radius-base);
  --vk-input-bg-color: var(--vk-fill-color-blank);
  --vk-input-icon-color: var(--vk-text-color-placeholder);
  --vk-input-placeholder-color: var(--vk-text-color-placeholder);
  --vk-input-hover-border-color: var(--vk-border-color-hover);
  --vk-input-clear-hover-color: var(--vk-text-color-secondary);
  --vk-input-focus-border-color: var(--vk-color-primary);
}

.vk-input {
  --vk-input-height: var(--vk-component-size);
  position: relative;
  font-size: var(--vk-font-size-base);
  display: inline-flex;
  width: 100%;
  line-height: var(--vk-input-height);
  box-sizing: border-box;
  vertical-align: middle;
  &.is-disabled {
    cursor: not-allowed;
    .vk-input__wrapper {
      background-color: var(--vk-disabled-bg-color);
      box-shadow: 0 0 0 1px var(--vk-disabled-border-color) inset;
    }
    .vk-input__inner {
      color: var(--vk-disabled-text-color);
      -webkit-text-fill-color: var(--vk-disabled-text-color);
      cursor: not-allowed;
    }
    .vk-textarea__inner {
      background-color: var(--vk-disabled-bg-color);
      box-shadow: 0 0 0 1px var(--vk-disabled-border-color) inset;
      color: var(--vk-disabled-text-color);
      -webkit-text-fill-color: var(--vk-disabled-text-color);
      cursor: not-allowed;
    }
  }
  &.is-prepend {
    >.vk-input__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &.is-append {
    >.vk-input__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

.vk-input--large {
  --vk-input-height: var(--vk-component-size-large);
  font-size: 14px;
  .vk-input__wrapper {
    padding: 1px 15px;
    .vk-input__inner {
      --vk-input-inner-height: calc(var(--vk-input-height, 40px) - 2px);
    }
  }

}
.vk-input--small {
  --vk-input-height: var(--vk-component-size-small);
  font-size: 12px;
  .vk-input__wrapper {
    padding: 1px 7px;
    .vk-input__inner {
      --vk-input-inner-height: calc(var(--vk-input-height, 24px) - 2px);
    } 
  }
}
.vk-input__prefix, .vk-input__suffix {
  display: inline-flex;
  white-space: nowrap;
  flex-shrink: 0;
  flex-wrap: nowrap;
  height: 100%;
  text-align: center;
  color: var(--vk-input-icon-color, var(--vk-text-color-placeholder));
  transition: all var(--vk-transition-duration);
}
.vk-input__prefix {
  >:first-child {
    margin-left: 0px !important;
  }
  >:last-child {
    margin-right: 8px !important;
  }
}
.vk-input__suffix {
  >:first-child {
    margin-left: 8px !important;
  }
  >:last-child {
    margin-right: 0px !important;
  }
}
.vk-input__prepend, .vk-input__append {
  background-color: var(--vk-fill-color-light);
  color: var(--vk-color-info);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  border-radius: var(--vk-input-border-radius);
  padding: 0 20px;
  white-space: nowrap;
}
.vk-input__prepend {
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 1px 0 0 0 var(--vk-input-border-color) inset,0 1px 0 0 var(--vk-input-border-color) inset,0 -1px 0 0 var(--vk-input-border-color) inset;

}
.vk-input__append {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 0 1px 0 0 var(--vk-input-border-color) inset,0 -1px 0 0 var(--vk-input-border-color) inset,-1px 0 0 0 var(--vk-input-border-color) inset;
  & >.vk-input__wrapper {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.vk-input--textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: var(--vk-font-size-base);
}
.vk-textarea__wrapper {
  position: relative;
  display: block;
  resize: vertical;
  padding: 5px 11px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  font-family: inherit;
  color: var(--vk-input-text-color, var(--vk-text-color-regular));
  background-color: var(--vk-input-bg-color, var(--vk-fill-color-blank));
  background-image: none;
  -webkit-appearance: none;
  box-shadow: 0 0 0 1px var(--vk-input-border-color, var(--vk-border-color)) inset;
  border-radius: var(--vk-input-border-radius, var(--vk-border-radius-base));
  transition: var(--vk-transition-box-shadow);
  border: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--vk-input-focus-border-color) inset;
  }
  &::placeholder {
    color: var(--vk-input-placeholder-color);
  }
}
.vk-input__wrapper {
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 1px 11px;
  background-color: var(--vk-input-bg-color, var(--vk-fill-color-blank));
  background-image: none;
  border-radius: var(--vk-input-border-radius, var(--vk-border-radius-base));
  transition: var(--vk-transition-box-shadow);
  box-shadow: 0 0 0 1px var(--vk-input-border-color, var(--vk-border-color)) inset;
  &:hover {
    box-shadow: 0 0 0 1px var(--vk-input-hover-border-color) inset;
  }
  &.is-focus {
    box-shadow: 0 0 0 1px var(--vk-input-focus-border-color) inset;
  }
  .vk-input__inner {
    --vk-input-inner-height: calc(var(--vk-input-height, 32px) - 2px);
    width: 100%;
    flex-grow: 1;
    -webkit-appearance: none;
    color: var(--vk-input-text-color, var(--vk-text-color-regular));
    font-size: inherit;
    height: var(--vk-input-inner-height);
    line-height: var(--vk-input-inner-height);
    padding: 0;
    outline: none;
    border: none;
    background: none;
    box-sizing: border-box;
    &::placeholder {
      color: var(--vk-input-placeholder-color);
    }
  }  
  .vk-icon {
    height: inherit;
    line-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all var(--vk-transition-duration);
    margin-left: 8px;
  }
  .vk-input__clear, .vk-input__password {
    color: var(--vk-input-icon-color);
    font-size: 14px;
    cursor: pointer;
    &:hover {
     color: var(--vk-input-clear-hover-color);
    }
  }
}
```

### types.ts

```typescript
export interface InputProps {
  type?: string;
  modelValue: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
}
export interface InputEmits {
  (e: 'update:modelValue', value: string) : void;
  // input 的 input事件指的是值有变化就算    
  (e: 'input', value: string): void;
  // input 的 change事件指的是修改了值，并且失去了 focus
  (e: 'change', value: string): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'blur', value: FocusEvent): void;
  (e: 'clear'): void;
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement;
}
```

### Input.test.ts

```typescript
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态 class，查看 classes 是否正确
    // 针对 v-if 是否渲染正确的标签以及内容
    // 针对 slots，是否渲染对应的 slots 内容
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html())
    // classes
    expect(wrapper.classes()).toContain('vk-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.vk-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prefix').text()).toBe('prefix')

    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })
  it('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        type: 'text'
      }
    })
    // 初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // 更新值
    // 注意 setValue 是组合事件会触发 input 以及 change
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    console.log('the events', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    // [ [ 'update' ], ...更多事件 ]
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])
    // v-model 的异步更新
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(input.element.value).toBe('prop update')
  })
  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对应的 Icon 区域
    expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    //  出现 Icon 区域
    expect(wrapper.find('.vk-input__clear').exists()).toBeTruthy()
    // 点击值变为空并且消失
    await wrapper.get('.vk-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    // 点击值变为空并且消失，特别注意这里不仅仅会触发 clear 事件，对应的 input 以及 change 应该都会被触发，因为对应的值发生了变化
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })
  it('支持切换密码显示', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对应的 Icon 区域, 因为当前值为空
    expect(wrapper.find('.vk-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    //  出现 Icon 区域，并且 Icon 为特点的图标
    await input.setValue('123')
    const eyeIcon = wrapper.find('.vk-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击值变会切换input 类型，并且图标的 Icon 会切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.vk-input__password').attributes('icon')).toBe('eye')
  })
})
```

