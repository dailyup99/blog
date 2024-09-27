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
    title: "实用网站",
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
        title: "Patterns",
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
        title: "计算机编程类中文书籍",
        desc: "免费的计算机编程类中文书籍",
        icon,
        link: "https://github.com/justjavac/free-programming-books-zh_CN?tab=readme-ov-file",
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
    ],
  },
  {
    title: "大佬博客",
    items: [
      {
        title: "张鑫旭",
        desc: "前端CSS大佬",
        icon,
        link: "http://www.zhangxinxu.com/",
      },
      {
        title: "阮一峰",
        desc: "前端大佬",
        icon,
        link: "https://www.ruanyifeng.com/",
      },
      {
        title: "廖雪峰",
        desc: "全栈大佬",
        icon,
        link: "https://liaoxuefeng.com/",
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
    ],
  },
];
