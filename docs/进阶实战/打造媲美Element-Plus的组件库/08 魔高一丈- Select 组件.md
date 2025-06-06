---
outline: deep
---

## Select组件需求分析

* 类似原生的Select，不过有着更强大的功能

* 最基本的功能：

  * 点击展开下拉选项菜单
  * 点击菜单中的某一项，下拉菜单关闭
  * Select获取选中状态，并且填充对应的选项

* 组件的本质：进阶版本的Dropdown，Input组件Tooltip组件的组合

* 高级功能：

  * 可清空选项：当hover的时候，在组件右侧显示以后可清空的按钮，点击以后清空选中的值
  * 自定义模板：可以自定义，下拉菜单的选项的格式
  * 可筛选选项：Input允许输入，输入后可以根据输入字符自动过滤下拉菜单的选项
  * 支持远程搜索（难点）：类似自动联想，可以根据输入的字符发送请求，渲染返回的内容作为选项列表
  * 扩展支持：比如键盘移动

  ### Select.vue

  ```html
  <template>
  <div
    class="vk-select"
    :class="{'is-disabled': disabled }"
    @click="toggleDropdown"
  >
    <Tooltip
      placement="bottom-start"
      ref="tooltipRef"
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
      manual
    >
      <Input 
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        ref="inputRef"
        readonly
      >
        <template #suffix>
          <Icon icon="angle-down" class="header-angle" :class="{ 'is-active': isDropdownShow }"/>
        </template>
      </Input>
      <template #content>
        <ul class="vk-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li 
              class="vk-select__menu-item"
              :class="{'is-disabled': item.disabled, 'is-selected': states.selectedOption?.value === item.value }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{item.label}}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>  
  </template>
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import type { Ref } from 'vue'
  import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
  import Tooltip from '../Tooltip/Tooltip.vue'
  import type { TooltipInstance } from '../Tooltip/types'
  import Input from '../Input/Input.vue'
  import Icon from '../Icon/Icon.vue'
  import type { InputInstance } from '../Input/types'
  
  const findOption = (value: string) => {
    const option = props.options.find(option => option.value === value)
    return option ? option : null
  }
  defineOptions({
    name: 'VkSelect'
  })
  const props = defineProps<SelectProps>()
  const emits = defineEmits<SelectEmits>()
  const initialOption = findOption(props.modelValue)
  const tooltipRef = ref() as Ref<TooltipInstance>
  const inputRef = ref() as Ref<InputInstance>
  const states = reactive<SelectStates>({
    inputValue: initialOption ? initialOption.label : '',
    selectedOption: initialOption
  })
  const isDropdownShow = ref(false)
  const popperOptions: any = {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
      {
        name: "sameWidth",
        enabled: true,
        fn: ({ state }: { state: any }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        phase: "beforeWrite",
        requires: ["computeStyles"],
      }
    ],
  }
  const controlDropdown = (show: boolean) => {
    if (show) {
      tooltipRef.value.show()
    } else {
      tooltipRef.value.hide()
    }
    isDropdownShow.value = show
    emits('visible-change', show)
  }
  const toggleDropdown = () => {
    if (props.disabled) return
    if (isDropdownShow.value) {
      controlDropdown(false)
    } else {
      controlDropdown(true)
    }
  }
  const itemSelect = (e: SelectOption) => {
    if (e.disabled) return
    states.inputValue = e.label
    states.selectedOption = e
    emits('change', e.value)
    emits('update:modelValue', e.value)
    controlDropdown(false)
    inputRef.value.ref.focus()
  }
  </script>
  ```

  ### style.css

  ```css
  .vk-select {
    --vk-select-item-hover-bg-color: var(--vk-fill-color-light);
    --vk-select-item-font-size: var(--vk-font-size-base);
    --vk-select-item-font-color: var(--vk-text-color-regular);
    --vk-select-item-selected-font-color: var(--vk-color-primary);
    --vk-select-item-disabled-font-color: var(--vk-text-color-placeholder);
    --vk-select-input-focus-border-color: var(--vk-color-primary);
  }
  
  .vk-select {
    display: inline-block;
    vertical-align: middle;
    line-height: 32px;
    .vk-tooltip .vk-tooltip__popper {
      padding: 0;
    }
    .vk-input.is-focus .vk-input__wrapper {
      box-shadow: 0 0 0 1px var(--vk-select-input-focus-border-color) inset!important
    }
    .vk-input {
      .header-angle {
        transition: transform var(--vk-transition-duration);
        &.is-active {
          transform: rotate(180deg);
        }
      }
    }
  
    .vk-input__inner {
      cursor: pointer;
    }
    .vk-select__menu {
      list-style: none;
      margin: 6px 0;
      padding: 0;
      box-sizing: border-box;
    }
    .vk-select__menu-item { 
      margin: 0;
      font-size: var(--vk-select-item-font-size);
      padding: 0 32px 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--vk-select-item-font-color);
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: var(--vk-select-item-hover-bg-color);
      }
      &.is-selected {
        color: var(--vk-select-item-selected-font-color);
        font-weight: 700;    
      }
      &.is-disabled {
        color: var(--vk-select-item-disabled-font-color);
        cursor: not-allowed;
        &:hover {
          background-color: transparent;
        }
      }
  
    }
  }
  ```

  ### types.ts

  ```typescript
  export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
  }
  
  export interface SelectProps {
    // v-model
    modelValue: string;
    // 选项
    options: SelectOption[];
    // 一些基本表单属性
    placeholder: string;
    disabled: boolean;
  }
  export interface SelectStates {
    inputValue: string;
    selectedOption: null | SelectOption;
  }
  export interface SelectEmits {
    (e:'change', value: string) : void;
    (e:'update:modelValue', value: string) : void;
    (e: 'visible-change', value:boolean): void;
  }
  ```

  

