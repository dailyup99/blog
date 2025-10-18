export interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string };
  /** 站点名称 */
  title: string;
  /** 站点描述 */
  desc?: string;
  /** 站点链接 */
  link?: string;
}
type NavData = {
  items: NavLink[];
  title: string;
};

const icon = "http://139.196.79.103:9001/myimages/imgs/202409222118480.webp";

export const NAV_DATA: NavData[] = [
  {
    title: "Vue生态",
    items: [
      {
        title: "Vue",
        desc: "渐进式JavaScript框架",
        icon,
        link: "https://cn.vuejs.org/",
      },
      {
        title: "Vue Router",
        desc: "Vue.js 的官方路由",
        icon,
        link: "https://router.vuejs.org/zh/",
      },
      {
        title: "Pinia",
        desc: "您将喜欢使用的 Vue 存储库",
        icon,
        link: "https://pinia.web3doc.top/",
      },
      {
        title: "Vuex",
        desc: "一个专为 Vue.js 应用程序开发的状态管理模式 + 库",
        icon,
        link: "https://vuex.vuejs.org/zh/",
      },
      {
        title: "Nuxt3",
        desc: "Vue的SSR框架",
        icon,
        link: "https://nuxt.com/",
      },
      {
        title: "Uniapp",
        desc: "一个使用 Vue.js 开发所有前端应用的框架",
        icon,
        link: "https://uniapp.dcloud.net.cn/",
      },

      {
        title: "Element Plus",
        desc: "基于 Vue 3，面向设计师和开发者的组件库",
        icon,
        link: "https://cn.element-plus.org/zh-CN/component/overview.html",
      },
      {
        title: "Vant",
        desc: "轻量、可定制的移动端 Vue 组件库",
        icon,
        link: "https://vant-ui.github.io/vant/#/zh-CN",
      },
      {
        title: "Tailwindcss",
        desc: "一个原子化CSS框架",
        icon,
        link: "https://www.tailwindcss.cn/",
      },
      {
        title: "UnoCSS",
        desc: "即时按需原子化 CSS 引擎",
        icon,
        link: "https://www.unocss.cn/",
      },
      {
        title: "TypeScript",
        desc: "一种基于 JavaScript 构建的强类型编程语言",
        icon,
        link: "https://www.typescriptlang.org/zh/",
      },
      {
        title: "VueUse",
        desc: "一个基于Vue组合式API的函数工具集",
        icon,
        link: "https://vueuse.org/",
      },
      {
        title: "Vite",
        desc: "一个超快的前端构建工具",
        icon,
        link: "https://cn.vitejs.dev/",
      },
      {
        title: "Webpack",
        desc: "一个用于现代 JavaScript 应用程序的 静态模块打包工具",
        icon,
        link: "https://webpack.docschina.org/",
      },
      {
        title: "Rollup",
        desc: "一个用于 JavaScript 的模块打包工具",
        icon,
        link: "https://rollupjs.org/",
      },
      {
        title: "Vue I18n",
        desc: "Vue.js 的国际化插件",
        icon,
        link: "https://vue-i18n.intlify.dev/",
      },
      {
        title: "Sass",
        desc: "世界上最成熟、最稳定、最强大的专业级CSS扩展语言！",
        icon,
        link: "https://www.sass.hk/",
      },
      {
        title: "Less",
        desc: "一门向后兼容的 CSS 扩展语言",
        icon,
        link: "https://less.bootcss.com/",
      },
      {
        title: "Vitest",
        desc: "一个原生支持 Vite 的测试框架。非常快速！",
        icon,
        link: "https://cn.vitest.dev/",
      },
      {
        title: "Jest",
        desc: "一个令人愉快的 JavaScript 测试框架",
        icon,
        link: "https://jestjs.io/",
      },
      {
        title: "Mocha",
        desc: "一个功能丰富的 JavaScript 测试框架",
        icon,
        link: "https://mochajs.org/",
      },
    ],
  },
  {
    title: "好用的库",
    items: [
      {
        title: "Lodash",
        desc: "一个一致性、模块化、高性能的 JavaScript 实用工具库",
        icon,
        link: "https://www.lodashjs.com/",
      },
      {
        title: "Axios",
        desc: "一个基于 promise 的网络请求库",
        icon,
        link: "https://www.axios-http.cn/",
      },
      {
        title: "Echarts",
        desc: "一个基于 JavaScript 的开源可视化图表库",
        icon,
        link: "https://echarts.apache.org/zh/index.html",
      },
      {
        title: "Day.js",
        desc: "一个轻量的处理时间和日期的 JavaScript 库",
        icon,
        link: "https://day.js.org/zh-CN/",
      },
      {
        title: "Swiper",
        desc: "Swiper 是网络上最受欢迎的适合移动设备的滑块库",
        icon,
        link: "https://swiperjs.com/",
      },
    ],
  },
  {
    title: "配置相关",
    items: [
      {
        title: "Jenkins",
        desc: "一款开源 CI&CD 软件",
        icon,
        link: "https://www.jenkins.io/zh/doc/",
      },
      {
        title: "Eslint",
        desc: "检测并修复 JavaScript 代码中的问题",
        icon,
        link: "https://eslint.org/",
      },
      {
        title: "Prettier",
        desc: "一个代码格式化程序",
        icon,
        link: "https://prettier.io/",
      },
      {
        title: "PostCSS",
        desc: "一个用 JavaScript 工具和插件转换 CSS 代码的工具",
        icon,
        link: "https://www.postcss.com.cn/",
      },
    ],
  },
  {
    title: "实用网站",
    items: [
      {
        title: "沉浸式翻译",
        desc: "一款免费的（原文/译文）双语对照网页翻译插件，同时支持PDF翻译等",
        icon,
        link: "https://immersivetranslate.com/zh-Hans/",
      },
      {
        title: "Qwerty Learner",
        desc: "一款程序员必备的练习英语的神器",
        icon,
        link: "https://qwerty.liumingye.cn/",
      },
      {
        title: "iCSS",
        desc: "CSS 奇技淫巧",
        icon,
        link: "https://github.com/chokcoco/iCSS",
      },
      {
        title: "Type-Challenges",
        desc: "一个TypeScript挑战平台",
        icon,
        link: "https://github.com/type-challenges/type-challenges",
      },
      {
        title: "CSS-Inspiration",
        desc: "在这里找到写 CSS 的灵感",
        icon,
        link: "https://github.com/chokcoco/CSS-Inspiration",
      },
      {
        title: "Clash",
        desc: "一个使用 Go 语言编写，基于规则的跨平台代理软件核心程序",
        icon,
        link: "https://doc.miyun.app/app/clash-win/",
      },
      {
        title: "Tinypng",
        desc: "一个图片压缩网站",
        icon,
        link: "https://tinypng.com/",
      },
      {
        title: "Spritecow",
        desc: "获取精灵图的位置",
        icon,
        link: "http://www.spritecow.com/",
      },
      {
        title: "Gitkraken",
        desc: "Gitkraken激活教程",
        icon,
        link: "https://github.com/wanZzz6/Modules-Learn/blob/master/%E6%8A%80%E6%9C%AF/Gitkraken%20%E6%9C%80%E6%96%B0%E7%89%88v9%E3%80%81v10%E7%A0%B4%E8%A7%A3%E6%95%99%E7%A8%8B.md",
      },
      {
        title: "Fiddler",
        desc: "调试抓包",
        icon,
        link: "https://www.telerik.com/fiddler",
      },
      {
        title: "CanIUse",
        desc: "浏览器兼容性查询",
        icon,
        link: "https://caniuse.com/",
      },
      {
        title: "CodePen",
        desc: "前端在线测试和演示工具",
        icon,
        link: "https://codepen.io/",
      },
      {
        title: "Carbon",
        desc: "代码转图片",
        icon,
        link: "https://carbon.now.sh/",
      },
      {
        title: "Imgcook",
        desc: "设计稿智能生成代码",
        icon,
        link: "https://www.imgcook.com/",
      },
    ],
  },
  {
    title: "实用工具",
    items: [
      {
        title: "在线正则表达式调试工具",
        desc: "",
        icon,
        link: "https://regexr.com/",
      },
      {
        title: "常用正则表达式大全",
        desc: "",
        icon,
        link: "https://any86.github.io/any-rule/",
      },
      {
        title: "在线JSON解析",
        desc: "",
        icon,
        link: "https://www.json.cn/",
      },
      {
        title: "在线文本对比",
        desc: "",
        icon,
        link: "https://fly63.com/tool/textdiff/",
      },
    ],
  },
  {
    title: "面试刷题",
    items: [
      {
        title: "面试官系列",
        desc: "由(JS每日一题)维护的前端面试题库",
        icon,
        link: "https://vue3js.cn/interview/",
      },
      {
        title: "前端充电宝",
        desc: "前端面试题汇总",
        icon,
        link: "https://www.yuque.com/cuggz/interview",
      },
      {
        title: "面试鸭",
        desc: "程序员求职面试刷题神器",
        icon,
        link: "https://www.mianshiya.com/",
      },
    ],
  },
  {
    title: "技术博客",
    items: [
      {
        title: "阮一峰",
        desc: "全栈大佬",
        icon,
        link: "https://www.ruanyifeng.com/blog/",
      },
      {
        title: "张鑫旭",
        desc: "CSS大佬",
        icon,
        link: "https://www.zhangxinxu.com/wordpress/",
      },
      {
        title: "冴羽",
        desc: "前端大佬",
        icon,
        link: "https://github.com/mqyqingfeng/Blog",
      },
    ],
  },
  {
    title: "技术社区",
    items: [
      {
        title: "GitHub",
        desc: "高质量的内容创作和分享平台",
        icon,
        link: "https://github.com/",
      },
      {
        title: "Stackoverflow",
        desc: "遇到技术问题请先Google，很多答案都能在 stackoverflow 上找到",
        icon,
        link: "https://stackoverflow.com/",
      },
    ],
  },
  {
    title: "前端综合",
    items: [
      {
        title: "开发流程",
        desc: "开发流程",
        icon,
        link: "https://web.qianguyihao.com/16-%E5%89%8D%E7%AB%AF%E7%BB%BC%E5%90%88/01-2022%E5%B9%B4Web%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B%E5%92%8C%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF%EF%BC%88%E8%AF%A6%E5%B0%BD%E7%89%88%EF%BC%89.html#%E5%89%8D%E8%A8%80",
      },
      {
        title: "学会提问",
        desc: "学会提问",
        icon,
        link: "https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way",
      },
    ],
  },
];
