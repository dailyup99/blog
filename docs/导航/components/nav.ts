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
    title: "好用工具",
    items: [
      {
        title: "GitHub中文排行榜",
        desc: "帮助你发现优秀中文项目，可以无语言障碍地、更高效地吸收优秀经验成果",
        icon,
        link: "https://github.com/GrowingGit/GitHub-Chinese-Top-Charts?tab=readme-ov-file",
      },
      {
        title: "Vue.js 挑战",
        desc: "一个 Vue.js 在线挑战平台",
        icon: "https://cn-vuejs-challenges.netlify.app/logo.png",
        link: "https://cn-vuejs-challenges.netlify.app/",
      },
      {
        title: "patterns",
        desc: "一个能学习前端设计模式的网站",
        icon: "https://www.patterns.dev/_astro/patterns-cover-site_16s3HF.webp",
        link: "https://www.patterns.dev/#patterns",
      },
      {
        title: "沉浸式翻译",
        desc: "一款免费的（原文/译文）双语对照网页翻译插件，同时支持PDF翻译等",
        icon: "https://immersivetranslate.cn/img/logo.png",
        link: "https://immersivetranslate.cn/",
      },
      {
        title: "Vue3 One Piece",
        desc: "一个网站，涵盖所有Vue相关知识",
        icon: "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
        link: "https://vue3js.cn/",
      },
      {
        title: "He3",
        desc: "一款开发者工具箱",
        icon: "https://he3app.com/section/logo.png",
        link: "https://he3app.com/zh/",
      },
      {
        title: "project-based-learning",
        desc: "基于项目的教程整理列表",
        icon,
        link: "https://github.com/practical-tutorials/project-based-learning",
      },
      {
        title: "Variant Form",
        desc: "一款高效的低代码表单",
        icon: "https://www.vform666.com/mini-logo.png",
        link: "https://www.vform666.com/",
      },
      {
        title: "Hello 算法",
        desc: "动画图解、一键运行的数据结构与算法教程",
        icon,
        link: "https://github.com/krahets/hello-algo",
      },
      {
        title: "LeetCode-Book",
        desc: "LeetBook《图解算法数据结构》配套代码仓",
        icon,
        link: "https://github.com/krahets/LeetCode-Book",
      },
      {
        title: "Qwerty Learner",
        desc: "一款程序员必备的练习英语的神器",
        icon: "https://qwerty.liumingye.cn/assets/logo-95f41da4.svg",
        link: "https://qwerty.liumingye.cn/",
      },
      {
        title: "free-programming-books-zh_CN",
        desc: "免费的计算机编程类中文书籍",
        icon,
        link: "https://github.com/justjavac/free-programming-books-zh_CN?tab=readme-ov-file",
      },
      {
        title: "AI Colors",
        desc: "一款ai自动化配色工具",
        icon,
        link: "https://aicolors.co/?ref=pidoutv.com",
      },
      {
        title: "iCSS",
        desc: "CSS 奇技淫巧",
        icon,
        link: "https://github.com/chokcoco/iCSS",
      },
      {
        title: "AIEditor",
        desc: "一个面向 AI 的下一代富文本编辑器",
        icon: "https://aieditor.dev/assets/image/logo.png",
        link: "https://aieditor.dev/zh/",
      },
      {
        title: "handsontable",
        desc: "让你的网页快速支持excel表格编辑",
        icon,
        link: "https://github.com/handsontable/handsontable",
      },
      {
        title: "tui.calendar",
        desc: "一款可拖拽日历组件",
        icon: "https://avatars.githubusercontent.com/u/7907400?s=48&v=4",
        link: "https://github.com/nhn/tui.calendar",
      },
      {
        title: "type-challenges",
        desc: "一个TypeScript挑战平台",
        icon,
        link: "https://github.com/type-challenges/type-challenges",
      },
      {
        title: "VueHook Plus",
        desc: "一个高性能且简单的Vue 3 Hooks库",
        icon,
        link: "https://inhiblabcore.github.io/docs/hooks/",
      },
      {
        title: "css-loaders",
        desc: "一个专门展示和提供CSS加载动画样式的网站",
        icon,
        link: "https://css-loaders.com/",
      },
      {
        title: "vxe-table",
        desc: "一个高度可定制化的开源表格插件",
        icon,
        link: "https://gitee.com/xuliangzhan/vxe-table",
      },
      {
        title: "screenshot-to-code",
        desc: "一个通过截图即可生成代码的网站",
        icon,
        link: "https://github.com/abi/screenshot-to-code",
      },
      {
        title: "CSS可视化",
        desc: "一个CSS可视化的网站",
        icon,
        link: "https://css.bqrdh.com/safety-color",
      },
      {
        title: "CSS-Inspiration",
        desc: "在这里找到写 CSS 的灵感",
        icon,
        link: "https://github.com/chokcoco/CSS-Inspiration",
      },
    ],
  },
];
