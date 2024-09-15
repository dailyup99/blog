export default [
  { text: "首页", link: "/" },
  {
    text: "前端体系",
    items: [
      { text: "HTML", link: "/前端体系/HTML/00 邂逅Web开发" },
      { text: "CSS", link: "/前端体系/CSS/00 CSS预处理器SASS从入门到高级进阶" },
      {
        text: "JavaScript",
        items: [
          { text: "基础", link: "前端体系/JS基础/00 邂逅JavaScript" },
          { text: "高级", link: "前端体系/JS高级/00 this指向" },
        ],
      },
      { text: "Vue", link: "/前端体系/Vue/00 邂逅Vue.js开发" },
      { text: "React", link: "/前端体系/React/00 邂逅React开发" },
      { text: "TypeScript", link: "/前端体系/TS/00 邂逅TS语法" },
      { text: "NodeJs", link: "/前端体系/Node/00 邂逅NodeJs开发" },
      { text: "SSR", link: "/前端体系/SSR/00 Node后端渲染+Vue3 SSR" },
      { text: "工程化", link: "/前端体系/工程化/00 JavaScript模块化" },
      { text: "可视化", link: "/前端体系/可视化/00 CSS3" },
      {
        text: "数据结构与算法",
        link: "/前端体系/数据结构与算法/00 邂逅数据结构与算法",
      },
      {
        text: "跨端",
        items: [
          { text: "UniApp", link: "前端体系/UniApp/00 uni-app-基础语法" },
          { text: "微信小程序", link: "前端体系/wx/00 邂逅小程序开发" },
        ],
      },
      { text: "JQuery", link: "/前端体系/JQuery/00 邂逅jQuery" },
      { text: "学习资源", link: "/前端体系/学习资源/学习资源.md" },
    ],
  },
  {
    text: "进阶",
    items: [
      {
        text: "性能优化",
        link: "/进阶/性能优化/00 Web性能指标",
      },
      {
        text: "技术解决方案",
        link: "/进阶/技术解决方案/00 前端权限设计与实现",
      },
    ],
  },
  {
    text: "实战",
    items: [
      { text: "AI", link: "/实战/AI/00 AI 启蒙课" },
      {
        text: "Vue3+TS",
        link: "/实战/Vue3+TS/00 项目架构-代码规范-集成第三库",
      },
      {
        text: "Element-Plus",
        link: "/实战/二次封装Element-Plus组件/00 封装组件初级篇（上）",
      },
    ],
  },
];
