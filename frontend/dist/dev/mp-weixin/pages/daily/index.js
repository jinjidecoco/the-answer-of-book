"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const quote = common_vendor.ref({
      id: null,
      content: "",
      author: "",
      source: "",
      date: ""
    });
    const formattedDate = common_vendor.computed(() => {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}年${month}月${day}日`;
    });
    const fetchDailyQuote = () => {
      const quotes = [
        { id: 1, content: "生活中最重要的不是你所处的位置，而是你所朝的方向。", author: "奥利弗·温德尔·霍姆斯", source: "" },
        { id: 2, content: "不要等待机会，而要创造机会。", author: "林肯", source: "" },
        { id: 3, content: "人生就像骑自行车，为了保持平衡，你必须保持运动。", author: "爱因斯坦", source: "" },
        { id: 4, content: "世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。", author: "罗曼·罗兰", source: "《巨人三传》" },
        { id: 5, content: "如果你不给自己烦恼，别人也永远不可能给你烦恼。", author: "佚名", source: "" }
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quote.value = quotes[randomIndex];
    };
    const refreshQuote = () => {
      fetchDailyQuote();
    };
    const shareQuote = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.index.onShareAppMessage(() => {
      return {
        title: `今日一言：${quote.value.content}`,
        path: `/pages/daily/index`,
        imageUrl: "/static/images/daily-share.png"
        // 分享图片
      };
    });
    common_vendor.onMounted(() => {
      fetchDailyQuote();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(quote.value.content),
        b: quote.value.author
      }, quote.value.author ? {
        c: common_vendor.t(quote.value.author)
      } : {}, {
        d: quote.value.source
      }, quote.value.source ? {
        e: common_vendor.t(quote.value.source)
      } : {}, {
        f: common_vendor.t(formattedDate.value),
        g: common_vendor.o(refreshQuote),
        h: common_vendor.o(shareQuote),
        i: common_vendor.o(goBack)
      });
    };
  }
};
_sfc_main.__runtimeHooks = 2;
wx.createPage(_sfc_main);
