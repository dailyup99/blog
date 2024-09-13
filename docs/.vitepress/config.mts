import { defineConfig } from "vitepress";
import nav from "./nav.mts";
import sidebar from "./sidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  title: "DailyUp",
  description: "一个记录学习的博客",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,
    outlineTitle: "页面导航",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            displayDetails: "显示详细列表",
            resetButtonTitle: "重制搜索",
            backButtonTitle: "关闭搜索",
            noResultsText: "没有找到相关结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "enter",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "上方向键",
              navigateDownKeyAriaLabel: "下方向键",
              closeText: "关闭",
              closeKeyAriaLabel: "esc",
            },
          },
        },
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
