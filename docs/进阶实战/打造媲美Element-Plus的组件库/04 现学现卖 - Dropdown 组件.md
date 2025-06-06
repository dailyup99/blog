---
outline: deep
---

## Dropdown组件需求分析

* 根据Tooltip二次开发的组件
* 显示/隐藏一个具体的，有多个选项的菜单
* 菜单中有各种选项，用户可以自定义
  * 使用语义化结构
  * 使用javascript数据结构

### Dropdown.vue

```html
<template>
  <div
    class="vk-dropdown"
  >
  <Tooltip 
    :trigger="trigger" 
    :placement="placement"
    :popper-options="popperOptions"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :manual="manual"
    @visible-change="visibleChange"
    ref="tooltipRef"
  >
    <slot />
    <template #content>
      <ul class="vk-dropdown__menu">
        <template v-for="item in menuOptions" :key="item.key">
          <li     
            v-if="item.divided"
            role="separator"
            class="divided-placeholder"
          />
          <li
            class="vk-dropdown__item"
            @click="itemClick(item)"
            :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"
            :id="`dropdown-item-${item.key}`"
          >
            <RenderVnode :vNode="item.label"/>
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVnode from '../Common/RenderVnode'
import type { TooltipInstance } from '../Tooltip/types'
defineOptions({
  name: 'VkDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>
```

### RenderVnode.ts

```typescript
import { defineComponent } from 'vue'
const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    return () => props.vNode
  }
})

export default RenderVnode
```

### Dropdown.tsx

使用tsx实现

slots：插槽，expose：导出实例

```tsx
import { computed, defineComponent, Fragment, ref } from 'vue'
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
export default defineComponent({
  name: 'VkDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)
    const itemClick = (e: MenuOption) => {
      if (e.disabled) {
        return
      }
      emit('select', e)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }
    const visibleChange = (e:boolean) => {
      emit('visible-change', e)
    }
    const options = computed(() => {
      return props.menuOptions.map(item => {
        return (
          <Fragment key={item.key}>
            { item.divided ? <li role="separator" class="divided-placeholder"/> : '' }
            <li 
              class={{'vk-dropdown__item': true, 'is-disabled': item.disabled, 'is-divided': item.divided }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              { item.label }
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })
    return () => (
      <div
        class="vk-dropdown"
      >
        <Tooltip 
          trigger={props.trigger} 
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          manual={props.manual}
          ref={tooltipRef}
          onVisibleChange={visibleChange}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => (
              <ul class="vk-dropdown__menu">
                { options.value }
              </ul>
            )
          }}
        </Tooltip>
      </div>
    )
  }
})
```

### style.css

```css
.vk-dropdown .vk-dropdown__menu {
  --vk-dropdown-menuItem-hover-fill: var(--vk-color-primary-light-9);
  --vk-dropdown-menuItem-hover-color: var(--vk-color-primary);
  --vk-dropdown-menuItem-disabled-color: var(--vk-border-color-lighter);
  --vk-dropdown-menuItem-divided-color: var(--vk-border-color-lighter);
}
.vk-dropdown {
  display: inline-block;
  .vk-tooltip {
    --vk-popover-padding: 5px 0;
  }
}
.vk-dropdown__menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .vk-dropdown__item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    list-style: none;
    line-height: 22px;
    padding: 5px 16px;
    margin: 0;
    font-size: var(--vk-font-size-base);
    color: var(--vk-text-color-regular);
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: var(--vk-dropdown-menuItem-hover-fill);
      color: var(--vk-dropdown-menuItem-hover-color);
    }
    &.is-disabled {
      color: var(--vk-dropdown-menuItem-disabled-color);
      cursor: not-allowed;
      background-image: none;
    }
  }
  .divided-placeholder {
    margin: 6px 0;
    border-top: 1px solid var(--vk-dropdown-menuItem-divided-color);
  }
}

```

### types.ts

```typescript
import type { VNode } from 'vue'
import type { TooltipProps } from '../Tooltip/types'

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[];
  hideAfterClick?: boolean;
}
export interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

export interface DropdownEmits {
  (e:'visible-change', value: boolean) : void;
  (e:'select', value: MenuOption) : void;
}

export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}
```

