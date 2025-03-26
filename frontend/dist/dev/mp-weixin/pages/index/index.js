"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (ThemeSwitcher + QuickHelp + FloatingWindow)();
}
const ThemeSwitcher = () => "../../components/ThemeSwitcher.js";
const FloatingWindow = () => "../../components/FloatingWindow.js";
const QuickHelp = () => "../../components/QuickHelp.js";
const pressTime = 3e3;
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isBookOpen = common_vendor.ref(false);
    const isTotemVisible = common_vendor.ref(false);
    const isTotemActive = common_vendor.ref(false);
    const isHelpVisible = common_vendor.ref(false);
    const pageHint = common_vendor.ref('点击"寻找答案"开始');
    const dailyQuote = common_vendor.ref({
      content: "加载中...",
      author: ""
    });
    let pressTimer = null;
    const openBook = () => {
      isBookOpen.value = true;
    };
    const showTotem = () => {
      isTotemVisible.value = true;
      pageHint.value = "长按图腾3秒钟寻找答案";
    };
    const activateTotem = () => {
      isTotemActive.value = true;
      pageHint.value = "正在寻找你的答案...";
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/answer/index"
        });
        setTimeout(() => {
          isTotemActive.value = false;
          isTotemVisible.value = false;
          pageHint.value = '点击"寻找答案"开始';
        }, 500);
      }, pressTime);
    };
    const handleTouchStart = () => {
      if (!isBookOpen.value) {
        pressTimer = setTimeout(() => {
          openBook();
        }, 500);
      }
    };
    const handleTouchEnd = () => {
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    const navigateToDaily = () => {
      common_vendor.index.navigateTo({
        url: "/pages/daily/index"
      });
    };
    const showHelp = () => {
      isHelpVisible.value = true;
    };
    const fetchDailyQuote = () => {
      const quotes = [
        { content: "生活中最重要的不是你所处的位置，而是你所朝的方向。", author: "奥利弗·温德尔·霍姆斯" },
        { content: "不要等待机会，而要创造机会。", author: "林肯" },
        { content: "人生就像骑自行车，为了保持平衡，你必须保持运动。", author: "爱因斯坦" },
        { content: "世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。", author: "罗曼·罗兰" },
        { content: "如果你不给自己烦恼，别人也永远不可能给你烦恼。", author: "佚名" }
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      dailyQuote.value = quotes[randomIndex];
    };
    common_vendor.onMounted(() => {
      setTimeout(() => {
        openBook();
      }, 1e3);
      fetchDailyQuote();
    });
    common_vendor.onShow(() => {
      isTotemActive.value = false;
      isTotemVisible.value = false;
      pageHint.value = '点击"寻找答案"开始';
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(pageHint.value),
        b: !isTotemVisible.value
      }, !isTotemVisible.value ? {
        c: common_vendor.o(showTotem)
      } : {}, {
        d: isTotemVisible.value
      }, isTotemVisible.value ? {
        e: common_assets._imports_0,
        f: isTotemActive.value ? 1 : "",
        g: common_vendor.o(activateTotem)
      } : {}, {
        h: isBookOpen.value ? 1 : "",
        i: common_vendor.o(handleTouchStart),
        j: common_vendor.o(handleTouchEnd),
        k: common_vendor.t(dailyQuote.value.content),
        l: dailyQuote.value.author
      }, dailyQuote.value.author ? {
        m: common_vendor.t(dailyQuote.value.author)
      } : {}, {
        n: common_vendor.o(navigateToDaily),
        o: common_vendor.o(showHelp),
        p: common_vendor.o(($event) => isHelpVisible.value = $event),
        q: common_vendor.o(($event) => isHelpVisible.value = false),
        r: common_vendor.p({
          title: "使用帮助",
          visible: isHelpVisible.value
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
