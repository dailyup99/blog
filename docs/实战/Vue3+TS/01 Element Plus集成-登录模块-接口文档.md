---
outline: deep
---

## 集成ElementPlus

首先，安装element-plus

```json
yarn add element-plus
```

其次，在main.ts中引入使用

完整引入

```typescript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
```

这种方式的引入会造成打包之后的体积比较大，所以比较推荐使用另外一种方式：按需导入。

目前，我们使用element-plus是无法知道这些UI组件具体的类型

<img src="http://139.196.79.103:9001/myimages/imgs/202407281754745.png" alt="image-20240728175425695" style="zoom:67%;" />

如果使用Volar插件，在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

现在鼠标放入就会有类型提示

<img src="http://139.196.79.103:9001/myimages/imgs/202407281805291.png" alt="image-20240728180502243" style="zoom:67%;" />

## 按需导入

```json
yarn add -D unplugin-vue-components unplugin-auto-import
```

然后在vite.config.ts中加入以下配置：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

再次执行yarn dev，会发现根目录多出2个文件，一个是.auto-imports.d.ts，另外一个是.components.d.ts，需要将这两个配置到ts.config.json中才会有类型提示。

```json
"include": [
  ...
  "auto-imports.d.ts",
  "components.d.ts"
]
```

