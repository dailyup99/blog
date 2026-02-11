---
outline: deep
---

## **扩展组件（uni-ui）**

**什么是 uni-ui？**

uni-ui 是 DCloud 提供的一个 UI 组件库，一套基于 Vue 组件、flex 布局的跨全端 UI 框架。

uni-ui 不包括 uni-app 框架提供的基础组件，而是基础组件的补充。

详情：https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html

**uni-ui 特点**

高性能

- 目前为止，在小程序和混合 app 领域，uni-ui 是性能的标杆。
- 自动差量更新数据。uni-app 引擎底层会自动用 diff 算法更新数据。
- 优化逻辑层和视图层通讯折损。 比如，需要跟手式操作的 UI 组件，底层使用了 wxs、bindingx 等技术，实现了高性能的交互体验
  - WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。
  - bindingx 技术提供了一种称之为表达式绑定(Expression Binding) 的机制，在 weex 上让手势等复杂交互操作以 60fps 的帧率流畅执行，而不会导致卡顿。

全端

- uni-ui 的组件都是多端自适应的，底层会抹平很多小程序平台的差异或 bug。
- uni-ui 还支持 nvue 原生渲染、以及 PC 宽屏设备

风格扩展

- uni-ui 的默认风格是中型的，与 uni-app 基础组件风格一致。
- 支持 uni.scss ，可以方便的扩展和切换应用的风格。

## **安装 uni-ui 组件库**

**方式一（推荐）：通过 uni_modules（插件模块化规范）单独安装组件**，通过 uni_modules 按需安装某个组件：

步骤 1：官网找到扩展组件清单，然后将所需要的组件导入到项目，导入后直接使用，无需 import 和注册。

步骤 2：通常我们还想切换应用风格，这时可以在 uni.scss 导入 uni-ui 提供的内置 scss 变量，然后重启应用。

注意：需要登录 DCloud 账号才能安装

https://uniapp.dcloud.net.cn/component/uniui/quickstart.html

点击要使用的组件，然后下载插件并导入 HBuilderX

```javascript
<template>
	<view class="content">
		<uni-badge text="100" type="primary"></uni-badge>
		<uni-badge text="90" type="success"></uni-badge>

		<uni-badge text="90" type="info" absolute="rightTop">
			<button>button</button>
		</uni-badge>

		<uni-countdown color="white" background-color="#cdcdcd" :day="0" :showDay="false" :hour="6" :minute="12"
			:second="20">
		</uni-countdown>


		<uni-goods-nav
			:fill="true"
			:options="options"
			:buttonGroup="buttonGroup"
			@click="onClick"
			@buttonClick="buttonClick" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					// infoBackgroundColor: '#007aff',
					// infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 20
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			onClick(e) {
				console.log(e);
				uni.showToast({
					title: e.content.text
				})
			},
			buttonClick(e) {
				uni.showToast({
					title: e.content.text
				})
				console.log(e);
			}
		}
	}
</script>

<style>
	.content {
		padding: 20rpx;
	}
</style>
```

重写 uni-ui 组件库内置的样式变量，需要修改的变量从下面地址找

https://uniapp.dcloud.net.cn/component/uniui/uni-sass.html

uni.scss

```scss
/* 需要放到文件最上面 */
@import "@/uni_modules/uni-scss/variables.scss";
// 1.重写uni-ui组件库内置的样式变量
$uni-primary: purple;
$uni-success: pink;

// 2.重写uni-app框架内置的样式变量
$uni-color-primary: #007aff;

// 3.自定义的全局变量
```

**方式二（推荐） ：通过 uni_modules 导入全部组件**

如想把所有 uni-ui 组件导入到项目，可以借用 Hbuilder X 插件导入。

如没自动导入其他组件，可在 uni-ui 组件目录上右键选择 安装三方插件依赖 即可。

https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#%E9%80%9A%E8%BF%87-uni-modules-%E5%AF%BC%E5%85%A5%E5%85%A8%E9%83%A8%E7%BB%84%E4%BB%B6

**方式三：在 HBuilderX 新建 uni-app 项目时，在模板中选择 uni-ui 模板来创建项目**

由于 uni-app 独特的 easycom（自动导包）技术，可以免引入、注册，就直接使用符合规则的 vue 组件。

**方式四：npm 安装**

在 vue-cli 项目中可用 npm 安装 uni-ui 库

或直接在 HBuilderX 项目中用 npm 安装 。

## **uni-froms** **组件**

**uni-froms 组件使用步骤（类似 Element Plus 的表单组件用法）：**

https://uniapp.dcloud.net.cn/component/uniui/uni-forms.html

安装 uni-froms 等组件

uni-froms 搭建表单布局

编写表单项的验证规则

提交表单时验证表单项

重置表单

pages/login/login.vue

```javascript
<template>
	<view class="login">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<!-- 第一个表单向 -->
			<uni-forms-item label="账号" name="username" required>
				<!-- <input type="text" v-model="formData.username" placeholder="请输入账号" /> -->
				<uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号" />
			</uni-forms-item>

			<!-- 第一个表单向 -->
			<uni-forms-item label="密码" name="password" required>
				<!-- <input type="password" v-model="formData.password" placeholder="请输入密码" /> -->
				<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
			</uni-forms-item>

		</uni-forms>

		<button type="default" @click="submit">提交表单</button>
		<button type="default" @click="reset">重置</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: null,
					password: null
				},
				rules: {
					username: {
						rules: [
							{
								required: true,
								errorMessage: '请输入账号'
							}
						]
					},
					password: {
						rules: [
							{
								required: true,
								errorMessage: '请输入密码'
							},
							{
								minLength: 6,
								maxLength: 8,
								errorMessage: '请输入6-8位的密码'
							}
						]
					}
				}
			};
		},
		methods: {
			submit() {
				console.log('submit');
				this.$refs.form.validate().then((value) => {
					// 表单验证成功
					console.log(value);
				}).catch((err) => {
					// 表单验证失败
					console.error(err);
				} )
			},
			reset() {
				console.log('reset');
				// 清除表单验证的结果
				this.$refs.form.clearValidate()
				// 重置表单的值
				Object.keys(this.formData).forEach((key) => {
					this.formData[key] = null
				})
			}
		}
	}
</script>
```

## **重写** **uni-froms** **组件样式**

小程序、App 直接重写，需要添加 important

H5、App 和小程序使用：global( selector ) ，需要添加 important

H5 、App 和小程序使用：deep( selector ) ，需要添加 important

pages/login/login.vue

```css
<!-- 属于局部样式 -->
<style lang="scss">

	// 方案一: weapp app
	// .uni-forms-item__label{
	// 	color: red !important;
	// 	padding-left: 10rpx;
	// }


	// 方案二: weapp  h5  app
	// :deep(.uni-forms-item__label){
	// 	color: pink !important;
	// }

	// 方案三: weapp h5 app
	// :global(.uni-forms-item__label){
	// 	color: purple !important;
	// }


</style>
```

## **跨平台兼容**

uni-app 能实现一套代码、多端运行，核心是通过编译器 + 运行时实现的：

编译器：将 uni-app 统一代码编译生成每个平台支持的特有代码；如在小程序平台，编译器将.vue 文件拆分生成 wxml、wxss、js 等。

运行时：动态处理数据绑定、事件代理，保证 Vue 和对应宿主平台 数据的一致性；

跨平台存在的问题：

uni-app 已将常用的组件、JS API 封装到框架中，开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。

但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。

大量写 if else，会造成代码执行性能低下和管理混乱。

编译到不同的工程后二次修改，会让后续升级变的很麻烦。

跨平台兼容解决方案：

在 C 语言中，通过 #ifdef、#ifndef 的方式，为 windows、mac 等不同 os 编译不同的代码。

uni-app 参考这个思路，为 uni-app 提供了条件编译手段，在一个工程里优雅的完成了平台个性化实现。

![image-20230624163311808](../../images/image-20230624163311808.png)

## **条件编译**

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

具体的语法：以 #ifdef 或 #ifndef 加 **%PLATFORM%** 开头，以 #endif 结尾。

- \#ifdef：if defined 仅在某平台存在

- #ifndef：if not defined 除了某平台均存在

- **%PLATFORM%**：平台名称

支持条件编译的文件

- .vue（template 、script 、style）

- .js、.css、pages.json

- 各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug

例如：设置页面的标题

H5 专有 API：document.title = ""

微信小程序专有 API：wx.setNavigationBarTitle(Object)

![image-20230624163528179](../../images/image-20230624163528179.png)

```javascript
<template>
	<view class="content">

		<!-- #ifdef H5 -->
		<view class="h5">
			<view>show H5</view>
			<img src="@/static/logo.png" alt="">
		</view>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<view class="weapp">
			<view>show weapp</view>
			<image src="@/static/logo.png"/>
		</view>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		<view class="app">
			<view>show app</view>
			<image src="@/static/logo.png"/>
		</view>
		<!-- #endif -->


		<view class="box">我是一个View</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// #ifdef H5
			document.title = 'H5'
			// window.xxx
			// #endif

			// #ifdef MP-WEIXIN
			wx.setNavigationBarTitle({
				title: "WeApp"
			})
			// wx.login()
			// #endif
		},
		onReady() {
			// #ifdef APP-PLUS
			uni.setNavigationBarTitle({
				title: 'App'
			})
			uni.setNavigationBarColor({
				frontColor:'#ffffff',
				backgroundColor: '#ff8198'
			})
			console.log('App ========> ');
			// #endif
		},
		methods: {

		}
	}
</script>

<style>
	.box{
		/* #ifdef H5 */
		color: red;
		/* #endif */

		/* #ifdef MP-WEIXIN */
		color: green;
		/* #endif */

		/* #ifdef APP-PLUS */
		color: blue;
		/* #endif */
	}

</style>
```

## **注意事项**

条件编译是利用注释实现的，在不同语法里注释写法不一样

js 使用 // 注释

css 使用 /_ 注释 _/

vue/nvue 模板里使用 `<!-- 注释 -->`

条件编译 APP-PLUS 包含 ：APP-NVUE 和 APP-VUE

APP-PLUS-NVUE 和 APP-NVUE 没什么区别，为了简写后面出了 APP-NVUE

使用条件编译请保证编译前和编译后文件的正确性，比如 json 文件中不能有多余的逗号

Android 和 iOS 平台不支持条件编译，如需区分 Android、iOS 平台，请通过调用 uni.getSystemInfo 来获取平台信息

微信小程序主题色是绿色，而百度支付宝小程序是蓝色，应用想分平台适配颜色，条件编译是代码量最低、最容易维护的

## **新建 Page 页面**

uni-app 页面是编写在 pages 目录下：

可直接在 uni-app 项目上右键“新建页面”，HBuilderX 会自动在 pages.json 中完成页面注册。

HBuilderX 还内置了常用的页面模板（如图文列表、商品列表等），这些模板可以大幅提升你的开发效率。

注意事项：

每次新建页面，需在 pages.json 中配置 pages 列表（手动才需配置）

未在 pages.json -> pages 中配置的页面，uni-app 会在编译阶段进行忽略。

删除页面：

删除.vue 文件 和 pages.json 中对应的配置

配置 tabBar

color

selectedColor

list -> pagePath、text、iconPath、selectedIconPath

pages.json

```json
{
  "pages": [
    //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      "path": "pages/home/home",
      "style": {
        "navigationBarTitleText": "uni-app"
      }
    },
    {
      "path": "pages/category/category"
    },
    {
      "path": "pages/cart/cart"
    },
    {
      "path": "pages/profile/profile"
    },
    {
      "path": "pages/detail01/detail01"
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
    "color": "#666",
    "selectedColor": "#ff8198",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/home/home",
        "iconPath": "static/images/tabbar/home.png",
        "selectedIconPath": "static/images/tabbar/home_active.png"
      },
      {
        "text": "分类",
        "pagePath": "pages/category/category",
        "iconPath": "static/images/tabbar/category.png",
        "selectedIconPath": "static/images/tabbar/category_active.png"
      },
      {
        "text": "购物车",
        "pagePath": "pages/cart/cart",
        "iconPath": "static/images/tabbar/cart.png",
        "selectedIconPath": "static/images/tabbar/cart_active.png"
      },
      {
        "text": "我的",
        "pagePath": "pages/profile/profile",
        "iconPath": "static/images/tabbar/profile.png",
        "selectedIconPath": "static/images/tabbar/profile_active.png"
      }
    ]
  }
}
```

## **页面路由**

uni-app 有两种页面路由跳转方式：使用 navigator 组件跳转、调用 API 跳转（类似小程序，与 vue-router 不同）。

组件：navigator

API：navigateTo、redirectTo、navigateBack、switchTab

![image-20230625195029700](../../images/image-20230625195029700.png)

pages/home/home.vue

```javascript
<template>
	<view class="content">
		<view class="">1.路由(组件)</view>
		<navigator url="/pages/detail01/detail01" open-type="navigate">
			<button type="default">01-detail navigate</button>
		</navigator>

		<navigator url="/pages/detail01/detail01" open-type="redirect">
			<button type="default">02-detail redirect</button>
		</navigator>

		<navigator url="/pages/category/category" open-type="switchTab">
			<button type="default">03-category</button>
		</navigator>

		<view class="">2.路由(API)</view>
		<button type="default" @click="goToDetail01()">04-detail navigate</button>
		<button type="default" @click="goToDetail02()">04-detail redirect</button>
		<button type="default" @click="goToDetail03()">04-detail switchTab</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {
			acceptDataFromDetail03(value) {
				console.log('这是从detail03传递过来的数据:', value);
			},
			goToDetail01() {
				uni.navigateTo({
					url: "/pages/detail01/detail01"
				})
			},
			goToDetail02() {
				uni.redirectTo({
					url: "/pages/detail01/detail01"
				})
			},
			goToDetail03() {
				uni.switchTab({
					url: "/pages/category/category"
				})
			},
		}
	}
</script>

<style>

</style>
```

## **页面间通讯**

**在 uni-app 中，常见页面通讯方式：**

方式一：url 查询字符串和 EventChannel

方式二：使用事件总线

方式三：全局数据 globalData

方式四：本地数据存储

方式五：Vuex 和 Pinia，状态管理库。

**方式一：url 和 EventChannel(兼容 h5、weapp、app)**

直接在 url 后面通过查询字符串的方式拼接

如 url 查询字符串出现特殊字符等格式，需编码

然后可在 onLoad 生命周期中获取 url 传递的参数

EventChannel 对象的获取方式

Options 语法：this.getOpenerEventChannel()

Composition 语法：getCurrentInstance().proxy. getOpenerEventChannel()

pages/home/home.vue

```javascript
<template>

    <view class="">3.页面传递参数(正向)</view>
    <navigator url="/pages/detail01/detail01?name=liujun&id=100" open-type="navigate">
        <button type="default">01-detail navigate</button>
    </navigator>
    <button type="default" @click="goToDetail04()">04-detail navigate</button>
    <view class="">4.页面传递参数(逆向)</view>
    <button type="default" @click="goToDetail05()">01-detail02 eventchannel</button>

</template>

...
goToDetail04() {
    uni.navigateTo({
        url: "/pages/detail01/detail01?name=liujun&id=200",
        success(res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromHomePage', {
                data: '我是从Home Page 传递过来的数据' ,
            })
        }
    })
},
goToDetail05() {
        uni.navigateTo({
            url: "/pages/detail02/detail02?name=liujun&id=400",
            events: {
                acceptDataFromDetail02(data) {
                    console.log("home page 拿到detail02传递过来的数据:", data);
                }
            }
        })
 },
...
```

pages/detail02/detail02.vue

```javascript
<template>
	<view>
		<navigator :delta="1" open-type="navigateBack">
			<button type="default" >返回(组件)</button>
		</navigator>
		<button type="default" @click="goBackHome">返回(API)</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {
			console.log('接受url传递过来的数据:', options);
            const eventChannel = this.getOpenerEventChannel();
            eventChannel.on("acceptDataFromHomePage", (data) => {
                console.log("接收到eventChannel的参数：", data)
            })
		},
		methods: {
			goBackHome() {
				uni.navigateBack({
					delta: 1
				})

				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('acceptDataFromDetail02', {
					data: '将detail02页面的数据传递给Home页面'
				})
			}
		}

	}
</script>

<style lang="scss">

</style>
```

## **事件总线**

**方式二：事件总线**

**uni.$emit( eventName, OBJECT )** 触发全局的自定义事件。

**uni.$on( eventName, callback )** 监听全局的自定义事件。由 uni.$emit 触发。

**uni.$once( eventName, callback )** 只监听一次全局的自定义事件。由 uni.$emit 触发

**uni.$off( eventName, callback )** 移除全局自定义事件监听器。

如果没有提供参数，则移除所有的事件监听器；

**注意事项：**

需先监听，再触发事件，比如：你在 A 界面触发，然后跳转到 B 页面后才监听是不行的。

通常 on 和 off 是同时使用，可以避免多次重复监听

适合页面返回传递参数、适合跨组件通讯，不适合界面跳转传递参数

```javascript
<button type="default" @click="goToDetail06()">01-detail03 事件总线</button>

onLoad() {
    // 通过事件总线在拿到详情传递回来的数据
    uni.$on('acceptDataFromDetail03', this.acceptDataFromDetail03)
},
onUnload() {
    uni.$off('acceptDataFromDetail03', this.acceptDataFromDetail03)
},
methods: {
  acceptDataFromDetail03(value) {
      console.log('这是从detail03传递过来的数据:', value);
  },
  goToDetail06() {
    uni.navigateTo({
        url:'/pages/detail03/detail03'
    })
	},
}
```

pages/detail03/detail03.vue

```javascript
<template>
	<view>
		<navigator :delta="1" open-type="navigateBack">
			<button type="default" >返回(组件)</button>
		</navigator>
		<button type="default" @click="goBackHome">返回(API)</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {
			console.log('接受url传递过来的数据:', options);
		},
		methods: {
			goBackHome() {
				uni.navigateBack({
					delta: 1
				})

				// 触发一个全局的事件( 在触发事件之前一定要先监听 )
				uni.$emit('acceptDataFromDetail03', {
					data: {
						desc: '这是在detail03传递到Home页面的数据'
					}
				})


			}
		}

	}
</script>

<style lang="scss">

</style>
```

## **页面生命周期(Options API)**

uni-app 常用的页面生命周期函数：

- onLoad(options) -> onLoad
- onShow -> onShow
- onReady -> onReady
- onHide -> onHide
- onUnload -> onUnload
- onPullDownRefresh -> onPullDownRefresh
- onReachBottom -> onReachBottom
- 更多： https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle

注意事项：

页面可以使用 Vue 组件生命周期吗？ 可以的

页面滚动才会触发 onReachBottom 回调，如果自行通过 overflow 实现的滚动不会触发 onReachBottom 回调

pages/detail04/detail04.vue

```javascript
<template>
	<view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item8</view>
		<view class="item1">item9</view>
		<view class="item1">item10</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '我是data定义的数据'
			};
		},
		// 1.页面的生命周期
		onLoad(options) {
			console.log('detail04 onLoad');
		},
		onShow() {
			console.log('detail04 onShow');
			console.log(this);
		},
		onReady() {
			console.log('detail04 onReady');
		},
		onHide() {
			console.log('detail04 onHide');
		},
		onUnload() {
			console.log('detail04 onUnload');
		},
		onPullDownRefresh() {
			console.log('detail04 onPullDownRefresh');
			setTimeout(() => {
				// 关闭下拉刷新的图标
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom() {
			console.log('detail04 onReachBottom');
		},
		// 2.Vue组件的生命周期
		beforeCreate() {
			console.log('detail04 beforeCreate');
		},
		created() {
			console.log('detail04 created');
		},
		beforeMount() {
			console.log('detail04 beforeMount');
		},
		mounted() {
			console.log('detail04 mounted');
		},
		beforeDestroy() {
			console.log('detail04 beforeDestroy');
		},
		destroyed() {
			console.log('detail04 destroyed');
		}
	}
</script>

<style lang="scss">

.item1{
	height: 200rpx;
	border-bottom: 2rpx solid red;
}
</style>
```

下拉刷新需要在 pages.json 中配置

```javascript
{
        "path" : "pages/detail04/detail04",
        "style" :
        {
            "navigationBarTitleText": "",
             "enablePullDownRefresh": true // 开启下拉刷新
        }

}
```

## **页面生命周期(Composition API)**

uni-app 常用的页面生命周期函数：

- onLoad -> onLoad
- onShow -> onShow
- onReady -> onReady
- onHide -> onHide
- onUnload -> onUnload
- onResize -> onResize
- onPullDownRefresh -> onPullDownRefresh
- onReachBottom -> onReachBottom
- 更多： https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle

pages/detail05/detail05.vue

```javascript
<template>
	<view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item1</view>
		<view class="item1">item8</view>
		<view class="item1">item9</view>
		<view class="item1">item10</view>
	</view>
</template>

<script setup>
	import { ref, onBeforeMount, onMounted } from 'vue'
	import {
		onLoad,
		onShow,
		onReady,
		onHide,
		onUnload,
		onPullDownRefresh,
		onReachBottom
	} from '@dcloudio/uni-app'

	// 1.页面的生命周期
	onLoad(() => {
		console.log('detail05 onLoad');
	})

	onShow(() => {
		console.log('detail05 onShow');
	})

	onReady(() => {
		console.log('detail05 onReady');
	})

	onHide(() => {
		console.log('detail05 onHide');
	})

	onUnload(() => {
		console.log('detail05 onUnload');
	})

	onPullDownRefresh(() => {
		console.log('detail05 onPullDownRefresh');
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 1000)
	})

	onReachBottom(() => {
		console.log('detail05 onReachBottom');
	})

	// 2.Vue组件的生命周期
	onBeforeMount(() => {
		console.log('detail05 onBeforeMount');
	})
	onMounted(() => {
		console.log('detail05 onMounted');
	})

</script>

<style lang="scss">
	.item1{
		height: 200rpx;
		border-bottom: 2rpx solid red;
	}
</style>
```

## **网络请求**

**uni.request(OBJECT)** 发起网络请求。

登录各个小程序管理后台，给网络相关的 API 配置合法域名（域名白名单）

微信小程序开发工具，在开发阶段可以配置：不校验合法域名

运行到手机时，资源没有出来时可以打开手机的调试模式

请求的 header 中 content-type 默认为 application/json

service/index.js

```javascript
const TIME_OUT = 60000;
const BASE_URL = "http://152.136.185.210:7878/api/hy66";

class HYRequest {
  request(url, method, data) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BASE_URL + url,
        method: method || "GET",
        timeout: TIME_OUT,
        data: data,
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  get(url, params) {
    return this.request(url, "GET", params);
  }

  post(url, data) {
    return this.request(url, "POST", data);
  }
}
export default new HYRequest();
```

service/home.js

```javascript
import hyRequest from "./index.js";

export const getHomeMutidata = () => {
  return hyRequest.get("/home/multidata", {});
};
```

pages/index/index.vue

```javascript
<view class="">1.封装网络请求</view>
<button type="primary" @click="fetchData()">发起一个get请求</button>

...
import { getHomeMutidata } from '@/service/home.js'

fetchData() {
    getHomeMutidata().then((res) => {
        console.log('res=>', res);
        this.homeData = res.data
    })
}
...
```

## **数据缓存**

**uni.setStorage(OBJECT)**

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

**uni.setStorageSync(KEY, DATA)**

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**uni.getStorage(OBJECT)**

从本地缓存中异步获取指定 key 对应的内容。

**uni.getStorageSync(KEY)**

从本地缓存中同步获取指定 key 对应的内容。

**uni.removeStorage(OBJECT)**

从本地缓存中异步移除指定 key。

**uni.removeStorageSync(KEY)**

从本地缓存中同步移除指定 key。

![image-20230625220019374](../../images/image-20230625220019374.png)

```javascript
<template>
	<view class="content">
		<view class="">2.数据的存储</view>
		<button type="default" @click="setStorage">setStorage</button>
		<button type="default" @click="getStorage">getStorage</button>
	</view>
</template>

<script>
	import { getHomeMutidata } from '@/service/home.js'
	export default {
		data() {
			return {
				title: 'Hello',
				homeData: ''
			}
		},
		methods: {
			setStorage() {
				// 将数据存到本地
				uni.setStorage({
					key: 'userinfo',
					data: {
						name: 'liujun',
						id: '100100',
						token: 'asdfxdfgjksiada'
					}
				})
				uni.setStorageSync('token', 'bssdsfsdfccvd')
			},
			getStorage(){
				uni.getStorage({
					key: 'userinfo',
					success(res) {
						console.log(res.data);
					}
				})
				const token = uni.getStorageSync('token')
				console.log(token);
			},
		}
	}
</script>

<style>

</style>
```

## **组件（Component）**

uni-app 组件 Vue 标准组件基本相同，但是也有一点区别，比如：

传统 vue 组件，需要创建组件、引用、注册，三个步骤后才能使用组件， easycom 组件模式可以将其精简为一步。

easycom 组件规范：

- 组件需符合 components/组件名称/组件名称.vue 的目录结构。
- 符合以上目录结构的就可不用引用、注册，直接在页面中使用该组件了。

只要在根目录下创建 components 文件夹，就可以右键新建组件了。

![image-20230625221728715](../../images/image-20230625221728715.png)

## **组件生命周期**

uni-app 组件支持的生命周期，与 Vue 组件的生命周期相同。

组件中可以使用页面的生命周期吗？

- 在 Options API 语法：组件中不支持使用页面生命周期。
- 在 Composition API 语法：组件中支持页面生命周期，不同端支持情况有差异。

![image-20230625221524564](../../images/image-20230625221524564.png)

components/hy-button/hy-button.vue

```javascript
<template>
	<view :class="['hy-btn', type]" @click="handleBtnClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"hy-button",
		props: {
			type: {
				type: String,
				default: 'default' // default  primary
			}
		},
		emits:['onBtnClick'],
		data() {
			return {

			};
		},
		computed: {},
		watch: {},
		// 1.组件的生命周期函数
		beforeCreate() {
			console.log('hy-btn beforeCreate');
		},
		created() {
			console.log('hy-btn created');
			console.log(this);
		},
		mounted() {
			console.log('hy-btn mounted');
		},
		// 2.页面的生命周期(在options api 中是不会执行)
		onLoad() {
			console.log('hy-btn onLoad');
		},
		onShow() {
			console.log('hy-btn onShow');
		},
		methods: {
			handleBtnClick() {
				this.$emit('onBtnClick')
			}
		}
	}
</script>

<style lang="scss">
	.hy-btn{
		padding: 20rpx 0;
		font-size: 40rpx;
		color: white;
		text-align: center;
		border-radius: 10rpx;
	}

	.default {
		background-color: #cdcdcd;
	}

	.primary{
		background-color: green;
	}
</style>
```

pages/index/index.vue

```javascript
<view class="">3.easycom组件规范</view>
<hy-button type="primary" @onBtnClick="onBtnClick">HYButon</hy-button>

...
methods:{
    onBtnClick() {
        console.log('hy-btn click');
    },
}
...
```

components/hy-button-setup/hy-button-setup.vue

```javascript
<template>
	<view :class="['hy-btn', type]" @click="handleBtnClick">
		<slot></slot>
	</view>
</template>

<script setup>
	// 是组件的生命周期
	import { onBeforeMount, onMounted, ref, watch, computed } from 'vue'
	// 页面的生命周期
	import {
		onLoad,
		onShow,
		onReady
	} from '@dcloudio/uni-app'

	const props = defineProps({
		type: {
			type: String,
			default: 'default'
		}
	})

	const emit = defineEmits(['onBtnClick'])

	function handleBtnClick() {
		emit('onBtnClick')
	}
	// 1.是组件的生命周期
	onBeforeMount(() => {
		console.log('hy-buton-setup onBeforeMount');
	})

	onMounted(() => {
		console.log('hy-buton-setup onMounted');
	})

	// 2.页面的生命周期
	// 执行
	onLoad(() => {
		console.log('hy-buton-setup onLoad');
	})
	// 执行
	onShow(() => {
		console.log('hy-buton-setup onShow');
	})
	// 这个在App H5没有执行, weapp有执行
	onReady(() => {
		console.log('hy-buton-setup onReady');
	})

</script>

<style lang="scss">
	.hy-btn{
		padding: 20rpx 0;
		font-size: 40rpx;
		color: white;
		text-align: center;
		border-radius: 10rpx;
	}

	.default {
		background-color: #cdcdcd;
	}

	.primary{
		background-color: green;
	}

	.info{
		background-color: orange;
	}
</style>
```

pages/index/index.vue

```javascript
<hy-button-setup
	type="info"
	@onBtnClick="onBtnSetupClick">
    HYButtonSetup
</hy-button-setup>

...
onBtnSetupClick() {
    console.log('hy-btn-setup click');
},
...
```

## Composition API 的页面间通信

pages/home/home.vue

```javascript
<template>
	<view>
		<view class="">1.页面传递数据(正向)</view>
		<button type="default" @click="goToDetail01">01-detail01 navigate</button>

		<view class="">2.页面传递数据(逆向)</view>
		<button type="default" @click="goToDetail02">01-detail02 navigate</button>

		<view class="">3.页面逆向传递数据(全局事件总线)</view>
		<button type="default" @click="goToDetail03">01-detail03 navigate</button>

	</view>
</template>

<script setup>

	import {
		onLoad,
		onUnload
	} from '@dcloudio/uni-app'

	onLoad(() => {
		uni.$on('acceptDataFormDetail03', acceptDataFormDetail03)
	})
	onUnload(() => {
		uni.$off('acceptDataFormDetail03', acceptDataFormDetail03)
	})

	function acceptDataFormDetail03(value) {
		console.log('接收到detail03传递给home页面的数据:', value);
	}

	function goToDetail01() {
		console.log('goToDetail01');
		uni.navigateTo({
			url: '/pages/detail01/detail01?name=liujun&id=100',
			success(res) {
				res.eventChannel.emit('acceptDataFormHomePage', {
					data: '我是home页面传递给detail01的数据'
				})
			},
		})
	}

	function goToDetail02() {
		uni.navigateTo({
			url: '/pages/detail02/detail02?name=liujun&id=200',
			events: {
				acceptDataFormDetail02(value) {
					console.log('接收到detail02传递过来的数据', value);
				}
			}
		})
	}

	function goToDetail03() {
		uni.navigateTo({
			url: '/pages/detail03/detail03?name=liujun&id=300'
		})
	}

</script>

<style lang="scss">

</style>
```

pages/detail01/detail01.vue

```javascript
<template>
	<view>

	</view>
</template>

<script setup>
	import { ref , getCurrentInstance } from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	// 2.方式二: ?name=liujun&id=100
	const props = defineProps({
		name: String,
		id: String
	})

	// $instance => this
	const $instance = ref(getCurrentInstance().proxy)
	console.log('在props中接受home传递过来url的数据:', props.name, props.id);

	// 1.方式一: ?name=liujun&id=100
	onLoad((options) => {
		console.log('接受到home传递过来url的数据:', options);
		// const eventChannel = this.getOpenerEventChannel();
		const eventChannel = $instance.value.getOpenerEventChannel();
		eventChannel.on('acceptDataFormHomePage', (value) => {
			console.log('接收到home页面eventchannel传递过来的数据:', value);
		})

	})
</script>

<style lang="scss">

</style>
```

pages/detail02/detail02.vue

```javascript
<template>
	<view>
		<button type="default" @click="goBack">返回</button>
	</view>
</template>

<script setup>
	import {
		getCurrentInstance,
		ref
	} from 'vue'

	const $instance = ref(getCurrentInstance().proxy) // this

	function goBack() {
		uni.navigateBack({
			delta: 1
		})
		const eventChannel = $instance.value.getOpenerEventChannel()
		// 触发事件, 将detail02的数据传递给Home页面
		eventChannel.emit('acceptDataFormDetail02', {
			data: '这里是detail02传递给Home页面的数据'
		})
	}
</script>

<style lang="scss">

</style>
```

pages/detail03/detail03.vue

```javascript
<template>
	<view>
		<button type="default" @click="goBack">返回</button>
	</view>
</template>

<script setup>

	function goBack() {
		uni.navigateBack({
			delta: 1
		})

		// 触发事件( 通过事件总线 )
		uni.$emit('acceptDataFormDetail03', {
			data: '这里的数据是从detail03传递到home页面'
		})
	}

</script>

<style lang="scss">

</style>
```

## **Pinia**

认识 Pinia

Pinia（发音为 /piːnjʌ/，如英语中的 peenya） 是 Vue 的存储库，它允许跨组件、页面共享状态。

uni-app 内置了 Pinia，使用 HBuilder X 不需要手动安装，直接使用即可。

使用 CLI 需要手动安装，执行 yarn add pinia 或 npm install pinia。

Pinia 的初体验，步骤如下：

第一步：在 main.js 中安装 Pinia 插件

app.use(Pinia.createPinia());

第二步：接着创建一个 store

第三步：然后在组件中就可以直接使用了

![image-20230626221535771](../../images/image-20230626221535771.png)

main.js

```javascript
import App from "./App";
import * as Pinia from "pinia";

import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);

  app.use(Pinia.createPinia());
  return {
    app,
    Pinia,
  };
}
```

store/counter.js

```javascript
import { defineStore } from "pinia";

// name : counter, 是store的名称，需要保证唯一性，或者是唯一的id
export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 800,
    };
  },
  actions: {
    // 同步的action
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },

    // 异步的action
    // async getHomeData() {
    // 	const res = await getHomeData()
    // }
  },
});
```

pages/index/index.vue

```javascript
<template>
	<view class="content">
		<navigator url="/pages/detail/detail" open-type="navigate">
			<button type="default">GoToDetail</button>
		</navigator>
		<button type="default" @click="addNumber">addNumber</button>
		<button type="default" @click="subNumber">subNumber</button>
		<view class="">{{count}}</view>
	</view>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { useCounterStore } from '@/store/counter.js'
	const counterStore = useCounterStore()

	const { count } = storeToRefs(counterStore)
	function addNumber() {
		// 触发一个action -> increment
		counterStore.increment()
	}

	function subNumber() {
		// 触发一个action -> decrement
		counterStore.decrement()
	}
</script>

<style>

</style>
```

pages/detail/detail.vue

```javascript
<template>
	<view>
		<button type="default" @click="addNumber">addNumber</button>
		<view class="">{{count}}</view>
	</view>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { useCounterStore } from '@/store/counter.js'
	const counterStore = useCounterStore()
	const { count } = storeToRefs(counterStore)

	function addNumber() {
		counterStore.increment()
	}
</script>

<style lang="scss">

</style>
```

## **微信小程序-打包配置**

1.注册一个小程序账号： https://mp.weixin.qq.com/wxopen/waregister?action=step1

2.登录已注册好的账号，拿到小程序 APPID： wxbc30134b589795b0（需要用你自己申请的）

3.修改一下 manifest.json 的配置（比如：appid、es6-es5、压缩）

4.发行->小程序-微信

5.在微信开发者工具中点击 上传 代码

<img src="..\..\images\image-20230627212001229.png" />

## **H5-打包配置（一）**

![image-20230627212322029](../../images/image-20230627212322029.png)

一般只需要填页面标题和路由模式（一般选 hash）。

发行->网站-PC 或手机 H5，打完的包在项目根目录下的 unpackage/dist/build/h5。

## **H5-打包配置（二）**

1.购买阿里云服务器

2.连接阿里云服务器（VSCode 安装 Remove SSH 插件）

3.安装 Nginx 服务器

- sudo yum install nginx # 安装 nginx
- sudo systemctl enable nginx # 设置开机启动

  4.启动 Nginx 服务器( http://8.134.149.197 )

- sudo service nginx start # 启动 nginx 服务
- sudo service nginx restart # 重启 nginx 服务

  5.修改 Nginx 的配置( /etc/nginx/nginx.conf )

切换为 root 用户，修改部署路径

6.打包和部署项目

## **Android-云打包配置**

1.注册一个 Dcloud 账号： https://dev.dcloud.net.cn/ 或在 HBuilder X 中注册

2.HBuilder X 登录已注册好的账号，然后在 manifest.json 中配置应用基本信息

3.云打包 Android 时，会自动生成证书（也可以手动生成）

4.开始执行云打包

App 图标配置，选一个图标，然后点击自动生成所有图标并替换

![image-20230627215221540](../../images/image-20230627215221540.png)

支持 CPU 类型全选上，minSdkVersion 为 21，targetSdkVersion 为 29。

![image-20230627215334228](../../images/image-20230627215334228.png)

发行-原生 App-云打包->使用云端证书

打包好之后在 unpackage/release/apk 目录下有个.apk 的文件，放到 mumu 模拟器进行安装即可。

## **Android** **环境搭建-window10**

### 1.安装前的准备

下载 JDK ⼯具

- https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html

- jdk-17.0.4.1_windows-x64_bin.exe

下载 Android Studio 开发⼯具

- https://developer.android.google.cn/studio
- android-studio-2021.3.1.16-windows.exe

### 2.安装 JDK

#### **2.1** **双击 jdk 安装**

双击 jdk-17.0.4.1_windows-x64_bin.exe 安装

![image-20230628211604353](../../images/image-20230628211604353.png)

#### 2.2 选择安装路径

D:\Program Files\Java\jdk-17.0.4.1 该路径后⾯需要⽤到配置环境变量

![image-20230628211709177](../../images/image-20230628211709177.png)

#### 2.3 显示安装完成

点击关闭

![image-20230628211746901](../../images/image-20230628211746901.png)

### 3. 配置 JDK 环境变量

安装好了 jdk 软件，打开 cmd 发现 jdk 的指令⽤不了.

![image-20230628211825498](../../images/image-20230628211825498.png)

这个时候就要开始配置 jdk 的环境变量了。

⼀旦配置好 jdk 环境变量，随意打开 cmd 都可以执⾏ jdk 的指令。

#### 3.1 打开设置面板

![image-20230628211857021](../../images/image-20230628211857021.png)

#### 3.2 点击高级设置

![image-20230628211935272](..\..\images\image-20230628211935272.png)

#### 3.3 点击环境变量

![image-20230628211956455](../../images/image-20230628211956455.png)

#### 3.4 新建 JAVA_HOME 环境变量

下⾯你 JDK 的安装路径 , 需要对应你电脑中的 jdk

```javascript
JAVA_HOME
D:\Program Files\Java\jdk-17.0.4.1 //你JDK的安装路径
```

![image-20230628212057591](../../images/image-20230628212057591.png)

#### 3.5 新建 CLASSPATH 环境变量

下⾯的直接拷⻉进去

```javascript
CLASSPATH
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar
```

![image-20230628212144655](../../images/image-20230628212144655.png)

#### 3.6 编辑 PATH

删除安装 jdk 时默认添加的这个

```javascript
C:\Program Files\Common Files\Oracle\Java\javapath
```

![image-20230628212223164](../../images/image-20230628212223164.png)

新建 下⾯两个值

```javascript
%JAVA_HOME%\bin
%JAVA_HOME%\jre\bin
```

![image-20230628212247604](../../images/image-20230628212247604.png)

编辑完成之后点击确认保存

#### 3.7 测试 jdk 是否配置好

打开 cmd 命令⾏⻚⾯,输⼊ java --version , 如下代表安装和配置完成

![image-20230628212326412](../../images/image-20230628212326412.png)

### 4. 安装 Android Studio

**第一步：双击 Android Studio**

![image-20230628212426533](../../images/image-20230628212426533.png)

**第⼆步: Android Studio Setup**

安装: **Android Studio** **和** **AVD**

![image-20230628212520206](../../images/image-20230628212520206.png)

**第三步:选安装路径**

![image-20230628212608806](..\..\images\image-20230628212608806.png)

**第四步:点击安装**

![image-20230628212630972](../../images/image-20230628212630972.png)

**第五步:等待安装完成**

**需要等待⽐较⻓⻓的⼀段时间,慢慢等待**

![image-20230628212704987](../../images/image-20230628212704987.png)

**第六步:安装完成**

![image-20230628212725246](..\..\images\image-20230628212725246.png)

**第七步:启动 Android Studio**

![image-20230628212746649](../../images/image-20230628212746649.png)

### **5.第⼀次启动 Android Studio**

**第⼀步:提示否是导⼊以前的配置**

以前没有安装过的直接选择不导⼊

![image-20230628212831883](../../images/image-20230628212831883.png)

**第⼆步:点击取消**

在第⼀次安装 AS，启动后，检测到电脑没有 SDK ,就会提示下⾯的弹出,**点击取消**就可以

http://blog.csdn.net/xx326664162/article/details/50563122

![image-20230628212857686](../../images/image-20230628212857686.png)

**第三步:Next**

![image-20230628212955367](..\..\images\image-20230628212955367.png)

**第四步:Standard ⽅案**

![image-20230628213018276](../../images/image-20230628213018276.png)

**第五步:选择主题**

![image-20230628213038446](..\..\images\image-20230628213038446.png)

**第六步:确认安装配置**

**注意：记住下⾯的 SDK Folder 对应的路径**

![image-20230628213117235](../../images/image-20230628213117235.png)

**第七步:下载相关的组件**

这⾥下载相关的组件需要⽐较久的时间

![image-20230628213149891](../../images/image-20230628213149891.png)

**第⼋步:安装完成**

![image-20230628213345607](..\..\images\image-20230628213345607.png)

### **6.配置 SDK 环境变量（终端已有 adb 了就不⽤配）**

安装好 android studio 和 sdk 后， sdk 中有⼀些⼯具不能直接在 cmd 中使⽤，例如：adb 指令。

要想让 sdk 中的⼯具能直接在 cmd 中使⽤，就要配置 sdk 的环境变量。

提示 : android 开发的环境需要⽤到 jdk 中的⼯具和 sdk 中的⼯具，因此这两个软件都要配置环境变量。

**第⼀步:新建 ANDROID_HOME 环境变量**

```javascript
ANDROID_HOME
C:\Users\DELL\AppData\Local\Android\Sdk // 你电脑Android SDK的路径
```

![image-20230628213608922](../../images/image-20230628213608922.png)

**第二步:编辑 Path**

```javascript
Path
%ANDROID_HOME%\tools // 在path后⾯追加
%ANDROID_HOME%\platform-tools // 在path后⾯追加
```

![image-20230628213723801](../../images/image-20230628213723801.png)

**第三步:测试 SDK 环境**

测试环境变量是否配置好

![image-20230628213801294](../../images/image-20230628213801294.png)

### **7.新建⼀个 Android 项⽬**

新建⼀个 Android 项⽬

**第一步：新建项目**

![image-20230628213854580](../../images/image-20230628213854580.png)

**第二步：新建 Android 移动项目**

![image-20230628213928939](../../images/image-20230628213928939.png)

**第三步：填写项目名称**

![image-20230628214002933](..\..\images\image-20230628214002933.png)

**第四步：打开项目**

第⼀次创建项⽬, Gradle 构建 可能需要⽐较 久

![image-20230628214044923](../../images/image-20230628214044923.png)

### 8. 新建 Android 模拟器

**第一步：启动模拟器**

![image-20230628214123455](../../images/image-20230628214123455.png)

**第二步：启动成功**

![image-20230628214155300](..\..\images\image-20230628214155300.png)

### 9.Android 项目的打包

**第一步：生成签包名**

![image-20230628214355481](../../images/image-20230628214355481.png)

**第二步：选择生成 apk**

![image-20230628214423509](..\..\images\image-20230628214423509.png)

**第三步：创建签名文件**

![image-20230628214451147](../../images/image-20230628214451147.png)

填写签名⽂件的信息, 按照实际情况填写

这⾥需要记住填写的两个密码:

key store path 的 password

key 的 password

![image-20230628214530010](../../images/image-20230628214530010.png)

点击 OK 之后，就可以关闭弹窗了。

打开 HBuilderX 工具，发行->原生 App-云打包，选择使用自有证书

![image-20230628214917609](../../images/image-20230628214917609.png)

证书别名要和上面 Key 的 Alias 一致，证书私钥密码就是 key 的 password，证书文件选择和 key store path 一样的路径，就可以打包了。

打包之后，在项目根目录下的 unpackage/release/apk 下有新生成的.apk 文件

打开 mumu 模拟器，点击 APK 安装，选中刚才新生成的.apk 文件

![image-20230628215240598](../../images/image-20230628215240598.png)

在模拟器的首页可以看到一个新的基座，点击即可进去体验。
