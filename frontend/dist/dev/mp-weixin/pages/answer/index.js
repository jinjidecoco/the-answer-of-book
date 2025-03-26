"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isPageFlipped = common_vendor.ref(false);
    const answer = common_vendor.ref({
      id: null,
      content: "",
      created_at: ""
    });
    common_vendor.onLoad((options) => {
      if (options.question) {
        decodeURIComponent(options.question);
      }
      fetchRandomAnswer();
    });
    const fetchRandomAnswer = () => {
      isPageFlipped.value = false;
      const answers = [
        { id: 1, content: "是的" },
        { id: 2, content: "不是" },
        { id: 3, content: "也许吧" },
        { id: 4, content: "绝对不是" },
        { id: 5, content: "毫无疑问" },
        { id: 6, content: "不要犹豫" },
        { id: 7, content: "再等等看" },
        { id: 8, content: "相信你的直觉" },
        { id: 9, content: "现在不是时候" },
        { id: 10, content: "放手去做" }
      ];
      const randomIndex = Math.floor(Math.random() * answers.length);
      setTimeout(() => {
        answer.value = answers[randomIndex];
        setTimeout(() => {
          isPageFlipped.value = true;
        }, 500);
      }, 2e3);
    };
    const tryAgain = () => {
      isPageFlipped.value = false;
      fetchRandomAnswer();
    };
    const shareAnswer = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
      common_vendor.index.showToast({
        title: "已生成分享海报",
        icon: "success",
        duration: 2e3
      });
    };
    common_vendor.index.onShareAppMessage(() => {
      return {
        title: `答案之书告诉我：${answer.value.content}`,
        path: `/pages/index/index`,
        imageUrl: "/static/images/share-image.png",
        // 分享图片
        success: function() {
          common_vendor.index.showToast({
            title: "分享成功",
            icon: "success"
          });
        }
      };
    });
    common_vendor.index.onShareTimeline(() => {
      return {
        title: `答案之书告诉我：${answer.value.content}`,
        query: "",
        imageUrl: "/static/images/share-image.png"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(answer.value.content),
        b: common_vendor.o(tryAgain),
        c: common_vendor.o(shareAnswer),
        d: isPageFlipped.value ? 1 : ""
      };
    };
  }
};
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
