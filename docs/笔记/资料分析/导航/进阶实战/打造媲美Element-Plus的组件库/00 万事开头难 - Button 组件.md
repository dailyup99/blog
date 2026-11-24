---
outline: deep
---

## Button按钮组件

### 任务

* 需求分析
* 初始化项目
* 确定项目文件结构
* 规范基础写法
* 样式解决方案以及色彩系统

### 需求分析

Button组件大部分关注样式，没有交互。

根据分析可以得到具体的属性列表：

* type：不同的样式（Primary、Danger、Info、Success、Warning）
* plain：样式的不同展现模式boolean
* round：圆角boolean
* circle：圆形按钮，适合图标boolean
* disabled：禁用boolean
* 图标：后面再添加
* loading：后面再添加

### Button组件的本质

```html
// 就是class名称的组合
class="vk-button vk-button--primary vk-button--large is-plain is-round is-disabled"
```

### 初始化项目

* vue官方基于vite的封装工具 create-vue

* https://github.com/vuejs/create-vue

* ```
  npm create vue@3
  ```

* Vite + Vue3 + TypeScript + Eslint

### 确定项目文件结构

* 从简单入手
* 没有必要过度设计
* components
  * Button
    * Button.vue-组件
    * style.css-样式
    * types.ts-一些辅助的typescript类型
    * Button.test.ts-测试文件
* hooks
  * useMousePosition.ts
  * ...

### Button.vue

```html
<template>
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'
// import { buttonProps } from './types'
defineOptions({
  name: 'VkButton'
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```

Button.vue中组件名是button，只有一个名字，会报错。

.eslintrc.cjs进行如下配置

```javascript
module.exports = {
  ...
  rules: {
    'vue/multi-word-component-names': 0
  },
}
```

### style.css

```css
.vk-button {
  --vk-button-font-weight: var(--vk-font-weight-primary);
  --vk-button-border-color: var(--vk-border-color);
  --vk-button-bg-color: var(--vk-fill-color-blank);
  --vk-button-text-color: var(--vk-text-color-regular);
  --vk-button-disabled-text-color: var(--vk-disabled-text-color);
  --vk-button-disabled-bg-color: var(--vk-fill-color-blank);
  --vk-button-disabled-border-color: var(--vk-border-color-light);
  --vk-button-hover-text-color: var(--vk-color-primary);
  --vk-button-hover-bg-color: var(--vk-color-primary-light-9);
  --vk-button-hover-border-color: var(--vk-color-primary-light-7);
  --vk-button-active-text-color: var(--vk-button-hover-text-color);
  --vk-button-active-border-color: var(--vk-color-primary);
  --vk-button-active-bg-color: var(--vk-button-hover-bg-color);
  --vk-button-outline-color: var(--vk-color-primary-light-5);
  --vk-button-active-color: var(--vk-text-color-primary);
}
.vk-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: var(--vk-button-text-color);
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: var(--vk-button-font-weight);
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: var(--vk-button-bg-color);
  border: var(--vk-border);
  border-color: var(--vk-button-border-color);
  padding: 8px 15px;
  font-size: var(--vk-font-size-base);
  border-radius: var(--vk-border-radius-base);
  & + & {
    margin-left: 12px;
  }
  &:hover,
  &:focus {
    color: var(--vk-button-hover-text-color);
    border-color: var(--vk-button-hover-border-color);
    background-color: var(--vk-button-hover-bg-color);
    outline: none;    
  }
  &:active {
    color: var(--vk-button-active-text-color);
    border-color: var(--vk-button-active-border-color);
    background-color: var(--vk-button-active-bg-color);
    outline: none;
  }
  &.is-plain {
    --vk-button-hover-text-color: var(--vk-color-primary);
    --vk-button-hover-bg-color: var(--vk-fill-color-blank);
    --vk-button-hover-border-color: var(--vk-color-primary);    
  }
  /*round*/
  &.is-round {
    border-radius: var(--vk-border-radius-round);
  }
  /*circle*/
  &.is-circle {
    border-radius: 50%;
    padding: 8px;
  }
  /*disabled*/
  &.is-disabled, &.is-disabled:hover, &.is-disabled:focus, 
  &[disabled], &[disabled]:hover, &[disabled]:focus 
  {
    color: var(--vk-button-disabled-text-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--vk-button-disabled-bg-color);
    border-color: var(--vk-button-disabled-border-color);
  }
  [class*=vk-icon] + span {
    margin-left: 6px;
  }
}
@each $val in primary,success,warning,info,danger {
  .vk-button--$(val) {
    --vk-button-text-color: var(--vk-color-white);
    --vk-button-bg-color: var(--vk-color-$(val));
    --vk-button-border-color: var(--vk-color-$(val));
    --vk-button-outline-color: var(--vk-color-$(val)-light-5);
    --vk-button-active-color: var(--vk-color-$(val)-dark-2);
    --vk-button-hover-text-color: var(--vk-color-white);
    --vk-button-hover-bg-color: var(--vk-color-$(val)-light-3);
    --vk-button-hover-border-color: var(--vk-color-$(val)-light-3);
    --vk-button-active-bg-color: var(--vk-color-$(val)-dark-2);
    --vk-button-active-border-color: var(--vk-color-$(val)-dark-2);
    --vk-button-disabled-text-color: var(--vk-color-white);
    --vk-button-disabled-bg-color: var(--vk-color-$(val)-light-5);
    --vk-button-disabled-border-color: var(--vk-color-$(val)-light-5);
  }
  .vk-button--$(val).is-plain {
    --vk-button-text-color: var(--vk-color-$(val));
    --vk-button-bg-color: var(--vk-color-$(val)-light-9);
    --vk-button-border-color: var(--vk-color-$(val)-light-5);
    --vk-button-hover-text-color: var(--vk-color-white);
    --vk-button-hover-bg-color: var(--vk-color-$(val));
    --vk-button-hover-border-color: var(--vk-color-$(val));
    --vk-button-active-text-color: var(--vk-color-white);
  }
}
.vk-button--large {
  --vk-button-size: 40px;
  height: var(--vk-button-size);
  padding: 12px 19px;
  font-size: var(--vk-font-size-base);
  border-radius: var(--vk-border-radius-base);
}
.vk-button--small {
  --vk-button-size: 24px;
  height: var(--vk-button-size);
  padding: 5px 11px;
  font-size: 12px;
  border-radius: calc(var(--vk-border-radius-base) - 1px);
}
```

### types.ts

```typescript
import type { PropType } from 'vue'
export type ButtonType = 'primary'| 'success'| 'warning'| 'danger'| 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  icon?: string;
  loading?: boolean;
}
export interface ButtonInstance {
  ref: HTMLButtonElement
}
export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>
  },
  size: {
    type: String as PropType<ButtonSize>,
  },
  plain: {
    type: Boolean
  },
  round: {
    type: Boolean
  },
  circle: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
}
```

### Button.test.ts

```typescript
import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'

describe('Button.vue', () => { 
  test('basic button', () => {
    // mount 将组件挂载到DOM
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper.html())
    // 拿到所有的class，判断是否包含vk-button--primary
    expect(wrapper.classes()).toContain('vk-button--primary')
    // slot
    // get, find
    // 遍历wrapper，可以使用get或find
    expect(wrapper.get('button').text()).toBe('button')
    // events
    // 判断events是否被触发过
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    // wrapper.emitted()获取所有被触发的事件
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    // attributes
    // 所有所有属性
    expect(wrapper.attributes('disabled')).toBeDefined()
    // attributes
    // 获取真实dom通过.element
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        // 使用第三方组件库，的时候可以使用stubs
        stubs: ['FontAwesomeIcon']
      }
    })
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
```

main.ts

```typescript
import './styles/index.css'
```

styles/index.css

```css
@import './vars.css';
@import './reset.css';
@import '../components/Button/style.css';
```

vars.css

```css
:root {
  /* colors */
  --vk-color-white: #ffffff;
  --vk-color-black: #000000;
  --colors: (
    primary: #409eff,
    success: #67c23a,
    warning: #e6a23c,
    danger: #f56c6c,
    info: #909399
  );

  @each $val, $color in var(--colors) {
    --vk-color-$(val): $(color);
    @for $i from 3 to 9 by 2 {
      --vk-color-$(val)-light-$(i): mix(#fff, $(color), .$(i))
    }
    --vk-color-$(val)-light-8: mix(#fff, $(color), .8);
    --vk-color-$(val)-dark-2: mix(#000, $(color), .2);
  }

  --vk-bg-color: #ffffff;
  --vk-bg-color-page: #f2f3f5;
  --vk-bg-color-overlay: #ffffff;
  --vk-text-color-primary: #303133;
  --vk-text-color-regular: #606266;
  --vk-text-color-secondary: #909399;
  --vk-text-color-placeholder: #a8abb2;
  --vk-text-color-disabled: #c0c4cc;
  --vk-border-color: #dcdfe6;
  --vk-border-color-light: #e4e7ed;
  --vk-border-color-lighter: #ebeef5;
  --vk-border-color-extra-light: #f2f6fc;
  --vk-border-color-dark: #d4d7de;
  --vk-border-color-darker: #cdd0d6;
  --vk-fill-color: #f0f2f5;
  --vk-fill-color-light: #f5f7fa;
  --vk-fill-color-lighter: #fafafa;
  --vk-fill-color-extra-light: #fafcff;
  --vk-fill-color-dark: #ebedf0;
  --vk-fill-color-darker: #e6e8eb;
  --vk-fill-color-blank: #ffffff;

  /* border */
  --vk-border-width: 1px;
  --vk-border-style: solid;
  --vk-border-color-hover: var(--vk-text-color-disabled);
  --vk-border: var(--vk-border-width) var(--vk-border-style) var(--vk-border-color);
  --vk-border-radius-base: 4px;
  --vk-border-radius-small: 2px;
  --vk-border-radius-round: 20px;
  --vk-border-radius-circle: 100%;

  /*font*/
  --vk-font-size-extra-large: 20px;
  --vk-font-size-large: 18px;
  --vk-font-size-medium: 16px;
  --vk-font-size-base: 14px;
  --vk-font-size-small: 13px;
  --vk-font-size-extra-small: 12px;
  --vk-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5fae\8f6f\96c5\9ed1", Arial, sans-serif;
  --vk-font-weight-primary: 500;

  /*disabled*/
  --vk-disabled-bg-color: var(--vk-fill-color-light);
  --vk-disabled-text-color: var(--vk-text-color-placeholder);
  --vk-disabled-border-color: var(--vk-border-color-light);
  
  /*animation*/
  --vk-transition-duration: .3s;
  --vk-transition-duration-fast: .2s;

}
```

reset.css

```css
body {
  font-family: var(--vk-font-family);
  font-weight: 400;
  font-size: var(--vk-font-size-base);
  color: var(--vk-text-color-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

a {
  color: var(--vk-color-primary);
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--vk-color-primary-light-3);
  }

  &:active {
    color: var(--vk-color-primary-dark-2);
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--vk-text-color-regular);
  font-weight: inherit;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

h1 {
  font-size: calc(var(--vk-font-size-base) + 6px);
}

h2 {
  font-size: calc(var(--vk-font-size-base) + 4px);
}

h3 {
  font-size: calc(var(--vk-font-size-base) + 2px);
}

h4,
h5,
h6,
p {
  font-size: inherit;
}

p {
  line-height: 1.8;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

sup,
sub {
  font-size: calc(var(--vk-font-size-base) - 1px);
}

small {
  font-size: calc(var(--vk-font-size-base) - 2px);
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid var(--vk-border-color-lighter);
}
```

### 遇到的问题

* 问题一：不能导入外部文件的类型，也就是不能

```typescript
import type { ButtonProps } from './types'
```

* 问题二：组件属性需要单独写一个script

也就是想给组件单独取个name，需要采用下面这种写法，否则默认使用文件名Button

```typescript
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VButton'
})
```

### 大补药-Vue Macros

文档地址：https://github.com/sxzz/unplugin-vue-macros

vite.config.ts

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import VueMacros from 'unplugin-vue-macros'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 把vue和vueJsx包裹起来
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
      },
    }),
    eslint()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

接着支持Volar，

```
npm i -D @vue-marcros/volar
```

tsconfig.json

```json
{
  ...
  "vueCompilerOptions": {
    "plugins": [
      "@vue-macros/volar/define-model",
      "@vue-macros/volar/define-props",
      "@vue-macros/volar/define-props-refs",
      "@vue-macros/volar/short-vmodel",
      "@vue-macros/volar/define-slots",
      "@vue-macros/volar/export-props"
    ]
  },
  ...
}
```

### BetterDefine

可以从外部文件导入类型

https://vue-macros.dev/zh-CN/features/better-define.html

### DefineOptions

可以在setup中定义一些组件属性

https://vue-macros.dev/zh-CN/macros/define-options.html

```typescript
defineOptions({
  name: 'VkButton'
})
```

eslint会报错，在.eslintrc.cjs进行配置

```javascript
module.exports = {
  ...
  globals: {
    "defineOptions": "readonly"
  }
}
```

就可以不用写

```typescript
export default defineComponent({
  name: 'VButton'
})
```

### button的原生属性

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button

## CSS解决方案

Postcss-https://postcss.org/

### Postcss each插件

https://github.com/madyankin/postcss-each

### Postcss for

https://github.com/antyakushev/postcss-for

### Postcss mixin

https://github.com/iamstarkov/postcss-color-mix

### Postcss each variables

https://github.com/awcross/postcss-each-variables

### Postcss插件

https://github.com/postcss/postcss-nested

postcss.config.cjs

```javascript
/* eslint-env node */
module.exports = {
  plugins: [
    require('postcss-each-variables'),
    require('postcss-nested'),
    require('postcss-each')({
      plugins: {
        beforeEach: [
          require('postcss-for'),
          require('postcss-color-mix')
        ]
      }
    }),
  ]
}
```

### 色彩系统

参考： https://ant.design/docs/spec/colors-cn

系统色板

* 基础色板
* 中性色板

产品色板

* 品牌色
* 功能色

