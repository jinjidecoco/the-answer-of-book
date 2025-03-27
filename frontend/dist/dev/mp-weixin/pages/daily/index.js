"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props, { expose: __expose }) {
    const quote = common_vendor.ref({
      id: null,
      content: "",
      author: "",
      source: "",
      date: ""
    });
    const isLoading = common_vendor.ref(false);
    const showError = common_vendor.ref(false);
    const errorMessage = common_vendor.ref("");
    const formattedDate = common_vendor.computed(() => {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}年${month}月${day}日`;
    });
    const showErrorMessage = (message) => {
      errorMessage.value = message;
      showError.value = true;
      setTimeout(() => {
        showError.value = false;
      }, 3e3);
    };
    const fetchDailyQuote = async () => {
      isLoading.value = true;
      try {
        const result = await utils_request.request.get("/quotes/daily");
        if (result) {
          quote.value = result;
        } else {
          throw new Error("未获取到数据");
        }
      } catch (error) {
        console.error("获取每日一言失败:", error);
        const quotes = [
          { id: 1, content: "生活中最重要的不是你所处的位置，而是你所朝的方向。", author: "奥利弗·温德尔·霍姆斯", source: "" },
          { id: 2, content: "不要等待机会，而要创造机会。", author: "林肯", source: "" },
          { id: 3, content: "人生就像骑自行车，为了保持平衡，你必须保持运动。", author: "爱因斯坦", source: "" },
          { id: 4, content: "世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。", author: "罗曼·罗兰", source: "《巨人三传》" },
          { id: 5, content: "如果你不给自己烦恼，别人也永远不可能给你烦恼。", author: "佚名", source: "" },
          { id: 6, content: "成功不是最终的，失败也不是最糟糕的，关键是你是否还在努力。", author: "约翰·肯尼迪", source: "" },
          { id: 8, content: "生命就像一把刀，用它来切割一切。", author: "佚名", source: "" },
          { id: 9, content: "生命的意义在于体验，而不是等待结果。", author: "约翰·冯·诺依曼", source: "" },
          { id: 10, content: "生命的意义在于享受，而不是等待。", author: "佚名", source: "" },
          { id: 11, content: "生命就像一把刀，用它来切割一切。", author: "佚名", source: "" }
        ];
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quote.value = quotes[randomIndex];
      } finally {
        isLoading.value = false;
      }
    };
    const refreshQuote = () => {
      if (isLoading.value)
        return;
      fetchDailyQuote();
    };
    const shareQuote = () => {
      if (isLoading.value)
        return;
      try {
        common_vendor.index.showShareMenu({
          withShareTicket: true,
          menus: ["shareAppMessage", "shareTimeline"]
        });
      } catch (error) {
        console.error("分享功能调用失败:", error);
        showErrorMessage("分享功能调用失败，请重试");
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        fail: () => {
          common_vendor.index.redirectTo({
            url: "/pages/index/index"
          });
        }
      });
    };
    __expose({
      onShareAppMessage() {
        return {
          title: `今日一言：${quote.value.content}`,
          path: `/pages/daily/index`,
          imageUrl: "/static/images/daily-share.png",
          // 分享图片
          success: function() {
            common_vendor.index.showToast({
              title: "分享成功",
              icon: "success"
            });
          },
          fail: function() {
            showErrorMessage("分享失败，请重试");
          }
        };
      },
      onShareTimeline() {
        return {
          title: `今日一言：${quote.value.content}`,
          query: "",
          imageUrl: "/static/images/daily-share.png"
        };
      }
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
        i: common_vendor.o(goBack),
        j: showError.value
      }, showError.value ? {
        k: common_vendor.t(errorMessage.value)
      } : {});
    };
  }
};
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
