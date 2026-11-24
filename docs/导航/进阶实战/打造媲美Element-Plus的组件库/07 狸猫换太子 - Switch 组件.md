---
outline: deep
---

## Switch组件需求分析

Switch，并不是一个标准Form组件，而是被手机端的一种交互发扬光大的结构。

**Switch的不同寻常的要点**

* 功能类似checkbox，所以内部有可能是一个checkbox在工作，狸猫换太子
* 样式非常独特，是我们面对样式的一个挑战

### Switch.vue

```html
<template>
<div
  class="vk-switch"
  :class="{
    [`vk-switch--${size}`]: size,
    'is-disabled': disabled,
    'is-checked': checked
  }"
  @click="switchValue"
>
  <input 
    class="vk-swtich__input"
    type="checkbox"
    role="switch"
    ref="input"
    :name="name"
    :disabled="disabled"
    @keydown.enter="switchValue"
  />
  <div class="vk-switch__core">
    <div class="vk-switch__core-inner">
      <span v-if="activeText || inactiveText" class="vk-switch__core-inner-text">
        {{checked ? activeText : inactiveText}}
      </span>
    </div>
    <div class="vk-switch__core-action">
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { SwtichProps, SwtichEmits } from './types'

defineOptions({
  name: 'VkSwtich',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwtichProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwtichEmits>()

const innerValue = ref(props.modelValue)
const input = ref<HTMLInputElement>()
// 现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}
onMounted(() => {
  input.value!.checked = checked.value
})
watch(checked, (val) => {
  input.value!.checked = val 
})
watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})
</script>
```

### style.css

```css
.vk-switch {
  --vk-switch-on-color: var(--vk-color-primary);
  --vk-switch-off-color: var(--vk-border-color);
  --vk-switch-on-border-color: var(--vk-color-primary);
  --vk-switch-off-border-color: var(--vk-border-color);
}

.vk-switch {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  height: 32px;
  .vk-swtich__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
    &:focus-visible {
      & ~ .vk-switch__core {
        outline: 2px solid var(--vk-switch-on-color);
        outline-offset: 1px;
      }
    }
  }
  &.is-disabled {
    opacity: .6;
    .vk-switch__core {
      cursor: not-allowed;
    }
  }
  &.is-checked {
    .vk-switch__core {
      border-color:var(--vk-switch-on-border-color);
      background-color: var(--vk-switch-on-color);
      .vk-switch__core-action {
        left: calc(100% - 17px);
      }
      .vk-switch__core-inner {
        padding: 0 18px 0 4px;
      }
    }
  }
}
.vk-switch--large {
  font-size: 14px;
  line-height: 24px;
  height: 40px;
  .vk-switch__core {
    min-width: 50px;
    height: 24px;
    border-radius: 12px;
    .vk-switch__core-action {
      width: 20px;
      height: 20px;
    }
  }
  &.is-checked {
    .vk-switch__core .vk-switch__core-action {
      left: calc(100% - 21px);
      color: var(--vk-switch-on-color);
    }
  }
}
.vk-switch--small {
  font-size: 12px;
  line-height: 16px;
  height: 24px;
  .vk-switch__core {
    min-width: 30px;
    height: 16px;
    border-radius: 8px;
    .vk-switch__core-action {
      width: 12px;
      height: 12px;
    }
  }
  &.is-checked {
    .vk-switch__core .vk-switch-core-action {
      left: calc(100% - 13px);
      color: var(--vk-switch-on-color);
    }
  }
}
.vk-switch__core {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 20px;
  min-width: 40px;
  border: 1px solid var(--vk-switch-off-border-color);
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: var(--vk-switch-off-color);
  cursor: pointer;
  transition: border-color var(--vk-transition-duration),background-color var(--vk-transition-duration);
  .vk-switch__core-action {
    position: absolute;
    left: 1px;
    border-radius: var(--vk-border-radius-circle);
    width: 16px;
    height: 16px;
    background-color: var(--vk-color-white);
    transition: all var(--vk-transition-duration);
  }
  .vk-switch__core-inner {
    width: 100%;
    transition: all var(--vk-transition-duration);
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0 4px 0 18px;
    .vk-switch__core-inner-text {
      font-size: 12px;
      color: var(--vk-color-white);
      user-select: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
```

### types.ts

```typescript
export type SwitchValueType = boolean | string | number;
export interface SwtichProps {
  modelValue: SwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  name?: string;
  id?: string;
  size?: 'small' | 'large';
}

export interface SwtichEmits {
  (e: 'update:modelValue', value: SwitchValueType) : void;
  (e: 'change', value: SwitchValueType): void;
}
```

### 总结

Switch组件，我们也分析出来和它很相似的应该是checkbox，所以它是个内部包裹着checkbox，用DOM模拟对应的外貌的组件。
