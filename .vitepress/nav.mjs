export default [
  { text: "首页", link: "/" },
  {
    text: "前端",
    items: [
      { text: "HTML", link: "/前端/HTML/00 邂逅Web开发" },
      { text: "CSS", link: "/前端/CSS/00 CSS预处理器SASS从入门到高级进阶" },
      {
        text: "JavaScript",
        items: [
          { text: "基础", link: "前端/JS基础/00 邂逅JavaScript" },
          { text: "高级", link: "前端/JS高级/00 this指向" },
        ],
      },
      { text: "Vue", link: "/前端/Vue/00 邂逅Vue.js开发" },
      { text: "React", link: "/前端/React/00 邂逅React开发" },
      { text: "TypeScript", link: "/前端/TS/00 邂逅TypeScript语法" },
      { text: "NodeJs", link: "/前端/Node/00 邂逅NodeJs开发" },
      { text: "SSR", link: "/前端/SSR/00 Node后端渲染+Vue3 SSR" },
      { text: "微前端", link: "/前端/微前端/微前端实战" },
      { text: "工程化", link: "/前端/工程化/00 JavaScript模块化" },
      { text: "可视化", link: "/前端/可视化/00 CSS3" },
      { text: "数据结构与算法", link: "/前端/数据结构与算法/00 邂逅数据结构与算法" },
      {
        text: "跨端",
        items: [
          { text: "UniApp", link: "前端/UniApp/00 uni-app-基础语法" },
          { text: "微信小程序", link: "前端/wx/00 邂逅小程序开发" },
        ],
      },
      { text: "JQuery", link: "/前端/JQuery/00 邂逅jQuery" },
      { text: "学习资源", link: "/前端/学习资源/学习资源.md" },
    ],
  },
  {
    text: "软技能",
    items: [
      // { text: "职场", link: "/软技能/职场/00 易缘职场避坑晋升指南108招" },
      { text: "学习方法", link: "/软技能/学习方法/00 一通百通，搞定各领域的全能自学法" },
    ]
  },
  {
    text: "副业",
    items: [
      { text: "指南", link: "/副业/指南/00 互联网人副业指南 传授思维与方法 启动你的首个项目" },
    ]
  },
];
