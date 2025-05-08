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
        title: "沉浸式翻译",
        desc: "一款免费的（原文/译文）双语对照网页翻译插件，同时支持PDF翻译等",
        icon: "https://immersivetranslate.cn/img/logo.png",
        link: "https://immersivetranslate.cn/",
      },
      {
        title: "Qwerty Learner",
        desc: "一款程序员必备的练习英语的神器",
        icon: "https://qwerty.liumingye.cn/assets/logo-95f41da4.svg",
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
